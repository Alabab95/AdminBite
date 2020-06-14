import { Component, AfterViewInit,OnInit } from '@angular/core';
import * as c3 from 'c3';
import {Dashboard2} from "../../../shared/dashboard2.service"
@Component({
  selector: 'app-device-visits',
  templateUrl: './device-visits.component.html'
})

export class DeviceVisitsComponent implements AfterViewInit{
  
  constructor(private Dashboard : Dashboard2) { }
  paye;
  nonpaye;
  refuse;
  somme;
  ngAfterViewInit() {
    this.Dashboard.ventesFournisseur().subscribe(res=>{
      console.log(res);
      this.paye = res['etat'].paye;
      this.nonpaye = res['etat'].nonpaye;
      this.refuse = res['etat'].refuse;
      this.somme = this.paye+this.nonpaye+this.refuse
      const chart = c3.generate({
      bindto: '#visitor',
      data: {
        columns: [['Payés', this.paye], ['Non payés', this.nonpaye], ['Réfusés', this.refuse]],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'Ventes',
        width: 25
      },

      legend: {
        hide: true
        // or hide: 'data1'
        // or hide: ['data1', 'data2']
      },
      color: {
        pattern: ['#4798e8', '#ff7676', '#f6f6f6']
      }
    });
    })
    
  }
  
}
