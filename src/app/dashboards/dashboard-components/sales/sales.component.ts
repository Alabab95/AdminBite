import { Component, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';

import{AbonementService } from "../../../shared/abonement.service"

declare var require: any;

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements AfterViewInit {
  constructor(private AbonementService:AbonementService) { }

  // Barchart
  barChart: Chart = {
    type: 'Bar',
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[50, 40, 30, 70, 50, 20, 30]]
    },
    options: {
      chartPadding: {
        top: 15,
        left: -25
      },
      axisX: {
        showLabel: true,
        showGrid: false
      },
      axisY: {
        showLabel: false,
        showGrid: false
      },
      fullWidth: true
    }
  };

  // Line chart
  lineChart: Chart = {
    type: 'Line',
    data: {
      labels: ['1PM', '2PM', '3PM', '4PM', '5PM', '6PM'],
      /* series: [[2, 0, 5, 2, 5, 2]] */
      series: [[0, 1, 2, 3, 4, 5]]
    },
    options: {
      showArea: true,
      showPoint: false,

      chartPadding: {
        left: -35
      },
      axisX: {
        showLabel: true,
        showGrid: false
      },
      axisY: {
        showLabel: false,
        showGrid: true
      },
      fullWidth: true
    }
  };

  ngAfterViewInit() {
    let tab=["Abonnements"];
    let tab2 = ["Packages"]
    this.AbonementService.getgroupe().subscribe(res=>{
      let tosort = res['groupe']
      tosort.sort((a,b)=>{
        return new Date(a._id)-new Date(b._id);
      })
      tosort.map(e=>{
        tab.push(e.myCount);
      })
      console.log(tab);
      this.AbonementService.getpackgroupe().subscribe(res=>{
        let packsort = res['groupe']
      packsort.sort((a,b)=>{
        return new Date(a._id)-new Date(b._id);
      })
      console.log(packsort)
      packsort.map(e=>{
        tab2.push(e.myCount);
      })
      console.log(tab2);
          const chart2 = c3.generate({
          bindto: '#product-sales',
          data: {
            columns: [
              tab,
              tab2
            ],
            type: 'spline'
          },
          axis: {
            y: {
              show: true,
              tick: {
                count: 0,
                
              }
            },
            x: {

              show: true,
              tick: {
                count: 0,
            },
            }
          },
          padding: {
            top: 40,
            right: 10,
            bottom: 40,
            left: 20
          },
          point: {
            r: 2
          },
          legend: {
            hide: false
          },
          color: {
            pattern: ['#4798e8', '#ccc']
          }
        });
      }) 
      
    })
  }
}
