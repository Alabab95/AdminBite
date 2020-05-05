import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls : ['./signup.component.css'],
  providers:[UserService]
})
export class SignupComponent implements OnInit {
  constructor(private userService : UserService,private router : Router) {}

  ngOnInit(){
    if (this.userService.isLoggedIn())
    this.router.navigateByUrl('/dashboard/dashboard');

  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log("success");
        this.router.navigateByUrl('/dashboard/dashboard');
      },
      err => {
        console.log("fail",err.message);
      }
    );
  }
}
