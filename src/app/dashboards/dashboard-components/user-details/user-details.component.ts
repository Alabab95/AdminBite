import { Component, AfterViewInit,OnInit } from '@angular/core';
import * as c3 from 'c3';
import {Dashboard2} from "../../../shared/dashboard2.service"
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  constructor(private Dashboard : Dashboard2) { }
  clients=[]

  ngOnInit(){
    this.Dashboard.detailsClients().subscribe(res=>{
      console.log("res",res)
      this.clients=res['clients']
      console.log(this.clients);
     
    })
 
  }
}
