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
  imagePreview;
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
    form.value.image = this.userService.selectedUser.image;
    console.log(form.value.image);
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log("success");
        this.showSuccess();
        setTimeout(()=> { this.router.navigateByUrl('/authentication/login');}, 2500);
       
      },
      err => {
        console.log("fail",err.message);
      }
    );
  }
  onImagePick(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.userService.selectedUser.image = file;
    console.log(file);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }
  onUpload(event) {
    console.log(event);
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
}
