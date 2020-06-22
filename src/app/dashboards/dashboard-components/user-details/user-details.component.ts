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
  occurance=[]
  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].client._id == obj) {
            return true;
        }
    }

    return false;
}
  ngOnInit(){
    this.Dashboard.detailsClients().subscribe(res=>{
      //console.log("res",res)
      //this.clients=res['clients']
      //console.log("clients",res['clients']);
      let tableSource =res['clients']
      let tableClients = []
      let occ = []
      let count =1
      tableSource.map(item => {
        if(this.containsObject(item.client._id,tableClients)){
          occ.map(item2=>{
            if(item2.id==item.client._id)[
              item2.count++
            ]
          })
        }else{
          tableClients.push(item)
          occ.push({'id':item.client._id,'count':count})
        }
      })
      let i=0
      tableClients.map(item=>{
        item['occ']=occ[i].count
        //item.push(occ[i].count)
        i++
      })
      console.log("clients",tableClients);
      console.log('occcccccccc',occ)
      this.clients=tableClients 
      this.occurance=occ
    })
 
  }
}
