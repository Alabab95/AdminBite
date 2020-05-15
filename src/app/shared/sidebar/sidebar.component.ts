import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES_SA, ROUTES_A, ROUTES_F } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  Admin = false;
  userDetails;

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
          console.log("azeaze"+this.userDetails.role);
          if(this.userDetails.role == "admin"){
            this.sidebarnavItems = ROUTES_A.filter(sidebarnavItem => sidebarnavItem);
          }else if(this.userDetails.role == "superadmin"){
            this.sidebarnavItems = ROUTES_SA.filter(sidebarnavItem => sidebarnavItem);
          }
          else{
            this.sidebarnavItems = ROUTES_F.filter(sidebarnavItem => sidebarnavItem);

          }
          console.log(this.userDetails.society);

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
}
