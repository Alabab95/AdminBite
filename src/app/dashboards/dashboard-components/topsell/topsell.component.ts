import { Component, AfterViewInit,OnInit } from '@angular/core';
import {Dashboard} from "../../../shared/dashboard.service"

@Component({
  selector: 'app-topsell',
  templateUrl: './topsell.component.html'
})
export class TopsellComponent {
  constructor(private Dashboard : Dashboard) {}
  details=[]
  ngOnInit(){
    this.Dashboard.detailsVente().subscribe(res =>{
      console.log("res ",res)
      this.details=res['detail'];
      console.log("detais",this.details)
      this.details.sort(function(a, b){
        return b.price-a.price
    })
    console.log("after sort ",this.details)
    });
 
  }

  
}
