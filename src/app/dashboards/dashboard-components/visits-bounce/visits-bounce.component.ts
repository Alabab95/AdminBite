import { Component, AfterViewInit,OnInit } from '@angular/core';
import {Dashboard2} from "../../../shared/dashboard2.service"
@Component({
  selector: 'app-visits-bounce',
  templateUrl: './visits-bounce.component.html'
})
export class VisitsBounceComponent implements OnInit {
  constructor(private Dashboard : Dashboard2) { }
  paye;
  nonpaye;
  refuse;
  somme;
  nbpacks;
  ngOnInit(){
    this.Dashboard.ventesFournisseur().subscribe(res=>{
      console.log(res);
      this.paye = res['etat'].paye;
      this.nonpaye = res['etat'].nonpaye;
      this.refuse = res['etat'].refuse;
      this.somme = this.paye+this.nonpaye+this.refuse
    })
    this.Dashboard.nbPackages().subscribe(res=>{
      console.log(res)
      this.nbpacks = res['count'];
    })
  }
}
