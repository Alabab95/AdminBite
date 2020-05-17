import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls : ['./signup.component.css'],
  styles: [`
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
        }
    `],
  providers:[UserService,MessageService]
})
export class SignupComponent implements OnInit {
  constructor(private messageService: MessageService,private userService : UserService,private router : Router) {}

  ngOnInit(){
    if (this.userService.isLoggedIn())
    this.router.navigateByUrl('/dashboard/dashboard');
    console.log(this.userService.selectedUser);
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Inscription', detail:'s\'inscrire avec succès'});
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log("success");
        this.showSuccess();
        this.router.navigateByUrl('/dashboard/dashboard');
      },
      err => {
        console.log("fail",err.message);
      }
    );
  }
}
