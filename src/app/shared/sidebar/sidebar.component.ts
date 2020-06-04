import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES_SA, ROUTES_A, ROUTES_F } from './menu-items';
import { NgForm } from '@angular/forms';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user.service';
import {MessageService} from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls : ['./sidebar.component.scss'],
  styles: [
    "node_modules/primeflex/primeflex.css"
  ],
  providers: [MessageService]
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  Admin = false;
  userDetails;
  imagePreview;
  showpass = 'text';
  displayModal : boolean;
  displayModalpass: boolean;
  imagePath;
  userpass = {
    password : "",
    newpassword:"",
    confirmnewpassword : ""
  }

  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }
  showSuccess(summary,detail) {
    this.messageService.add({severity:'success', summary: summary, detail:detail});
  }
  showWarn() {
    this.messageService.add({severity:'warn', summary: 'erreur', detail:'Données invalides'});
}
showWarnpass(detail) {
  this.messageService.add({severity:'warn', summary: 'erreur', detail:detail});
}

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  // End open close
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userService.selectedUser=res['user'];
        this.imagePath = this.userService.selectedUser.image;
        console.log(this.userDetails);
          if(this.userDetails.role == "admin"){
            this.sidebarnavItems = ROUTES_A.filter(sidebarnavItem => sidebarnavItem);
          }else if(this.userDetails.role == "superadmin"){
            this.sidebarnavItems = ROUTES_SA.filter(sidebarnavItem => sidebarnavItem);
          }
          else{
            this.sidebarnavItems = ROUTES_F.filter(sidebarnavItem => sidebarnavItem);
          }
      },
      err => {
        console.log('1234564',err);

      }
    );

  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/authentication/login']);
  }
  testt(){
    console.log("hhhh");
  }
  showModalDialog() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userService.selectedUser=res['user'];
        this.displayModal = true;
      });
}
showModalDialog2() {
  this.userService.getUserProfile().subscribe(
    res => {
      this.userService.selectedUser=res['user'];
      this.displayModalpass = true;
    });
}
updateProfile(form: NgForm){
  form.value.image = this.userService.selectedUser.image;
  console.log(form.value);
   let user = {
     _id : this.userDetails._id,
    ...form.value
  }
  console.log(user);
  this.userService.putUser(user).subscribe(res=>{
    console.log(res);
    this.imagePath = res.image;
    this.showSuccess('mettre à jour l\'utilisateur','mettre à jour l\'utilisateur avec succès')
    this.displayModal = false;
  },
  err =>{
    this.showWarn();
  }
  );
}
changerpassword(form: NgForm){
  console.log(form.value);
  let user = {
    id : this.userService.selectedUser._id,
    ...form.value
  }
  this.userService.resetpass(user).subscribe(res =>{
    console.log(res);
  },
  err=>{
    this.showWarnpass(err.error['message']);
  })
   
}
cancel(){
  this.displayModal = false;
}
cancelpassform(){
  this.displayModalpass = false;
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
}
