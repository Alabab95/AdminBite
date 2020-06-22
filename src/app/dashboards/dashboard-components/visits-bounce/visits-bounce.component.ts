import { Component, AfterViewInit,OnInit } from '@angular/core';
import {Dashboard2} from "../../../shared/dashboard2.service";
import {ServicesService} from "../../../shared/services.service"
@Component({
  selector: 'app-visits-bounce',
  templateUrl: './visits-bounce.component.html'
})
export class VisitsBounceComponent implements OnInit {
  constructor(private Dashboard : Dashboard2,private ServicesService:ServicesService) { }
  paye;
  nonpaye;
  refuse;
  somme;
  nbpacks;
  nbclients;
  nbservices;
  ngOnInit(){
    this.Dashboard.ventesFournisseur().subscribe(res=>{
      //console.log("test",res['etat'].paye);
      this.paye = res['etat'].paye;
      this.nonpaye = res['etat'].nonpaye;
      this.refuse = res['etat'].refuse;
      this.somme = this.paye+this.nonpaye+this.refuse
    })
    this.Dashboard.nbPackages().subscribe(res=>{
      console.log(res)
      this.nbpacks = res['count'];
    })
    this.Dashboard.detailsClients().subscribe(res=>{
      console.log("details clientsss ",res['clients'])
      let tableClients =[]
      let tableTotale = res['clients']
      tableTotale.map(item=>{
        if(tableClients.indexOf(item.client.login)<0){
          tableClients.push(item.client.login)
        }
      })
      this.nbclients=tableClients.length

      //console.log("clients count ",tableClients.length)
    })
    this.ServicesService.getServiceList().subscribe(res => {
      console.log("resssss ",res['services'])
      this.nbservices = res['services'].length
    })
  }
}
