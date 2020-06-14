import { Component, AfterViewInit,OnInit } from '@angular/core';
import * as c3 from 'c3';
import {Dashboard2} from "../../../shared/dashboard2.service"
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements AfterViewInit,OnInit {
  constructor(private Dashboard : Dashboard2) { }
  clients=[]

  ngOnInit(){
    this.Dashboard.detailsClients().subscribe(res=>{
      this.clients=res.client
      console.log(res);
     
    })
 
  }
}
