import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  userDetails;
  erreur = false;
  constructor(private userService: UserService,private router : Router) { }

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
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.erreur=false;
        this.userService.setToken(res['token']);
        this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res['user'];
              this.router.navigateByUrl('/dashboard/dashboard');
              console.log("login clicked")
          
          },
          err => {
            console.log('1234564',err);
            this.erreur = true;
          }
        );

      },
      err => {
        console.log('error',err.error.message);
      }
    );

  }
}
