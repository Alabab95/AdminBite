import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import {MessageService} from 'primeng/api';

import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService,MessageService],
  styles : [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-message div {
            color: #ffffff;
        }

        :host ::ng-deep .custom-toast .ui-toast-message.ui-toast-message-info .ui-toast-close-icon {
            color: #ffffff;
        }`]
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
            this.router.navigateByUrl('/dashboard/dashboard');
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
