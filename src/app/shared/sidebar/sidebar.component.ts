import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES_SA, ROUTES_A, ROUTES_F } from './menu-items';
import { NgForm } from '@angular/forms';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    "node_modules/primeflex/primeflex.css"
  ]
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  Admin = false;
  userDetails;
  showpass = 'text';
  displayModal : boolean;

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

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userService.selectedUser=res['user'];
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
    console.log(this.Admin);

  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/authentication/login']);
  }
  testt(){
    console.log("hhhh");
  }
  showModalDialog() {
    this.displayModal = true;
}
updateProfile(form: NgForm){
  console.log(form.value);
   let user = {
     _id : this.userDetails._id,
    ...form.value
  }
  console.log(user);
  this.userService.putUser(user).subscribe(res=>{
    console.log("done");
  });
}
}
