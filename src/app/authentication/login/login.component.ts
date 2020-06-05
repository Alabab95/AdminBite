import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import {MessageService} from 'primeng/api';

import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls :["login.component.css"],
  providers: [UserService,MessageService],
  
})
export class LoginComponent implements OnInit {
  userDetails;
  erreur = false;
  constructor(private messageService: MessageService,private userService: UserService,private router : Router) { }

  model ={
    login:'',
    password:''
  }


  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  ngOnInit(){
    if (this.userService.isLoggedIn())
    this.router.navigateByUrl('/dashboard/dashboard');
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Connecté', detail:'Connecté avec succés'});
}
  showError() {
    this.messageService.add({severity:'error', summary: 'échec de la connexion', detail:'Login ou mot de passe incorrecte'});
  }
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.erreur=false;
        this.userService.setToken(res['token']);
        this.userService.getUserProfile().subscribe(
          res => {
            this.showSuccess();
            this.userDetails = res['user'];
            let url ='/dashboard/dashboard';
            if(this.userDetails.role == 'fournisseur') url = '/dashboard/dashboard2'
             this.router.navigateByUrl(url);
            console.log("login clicked")
            this.userService.selectedUser = res['user'];
            console.log(this.userService.selectedUser);
          },
          err => {
            console.log('1234564',err);
            this.erreur = true;
          }
        )
      },
      err => {
        console.log('error',err.error.message);
        this.showError();
        this.model.login = '';
        this.model.password = '';
      }
    );

  }
}
