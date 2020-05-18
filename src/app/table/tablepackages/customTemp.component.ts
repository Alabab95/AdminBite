import { Component, OnInit,Input, ViewChild,AfterViewInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { PackageService } from '../../shared/package.service';
import { ServicesService } from '../../shared/services.service';
import {SelectItem} from 'primeng/api';

import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { Package } from 'src/app/shared/package.model';
import { Service } from 'src/app/shared/service.model';
import { Cell, DefaultEditor, Editor,ViewCell} from 'ng2-smart-table';

import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './CustomTemp.component.html',
  styles : [`
  :host ::ng-deep .ui-multiselected-item-token,
  :host ::ng-deep .ui-multiselected-empty-token {
      padding: 2px 4px;
      margin: 0 0.286em 0 0;
      display: inline-block;
      vertical-align:middle;
      height: 1.857em;
  }

  :host ::ng-deep .ui-multiselected-item-token {
      background: #007ad9;
      color: #ffffff;
  }

  :host ::ng-deep .ui-multiselected-empty-token {
      background: #d95f00;
      color: #ffffff;
  }
  `],
  providers:[PackageService]
})
export class CustomTemp extends DefaultEditor implements ViewCell,AfterViewInit,OnInit {

    @Input() value;
    @Input() rowData:any;
    constructor(private ServicesService:ServicesService){
        super();
    }
    values :SelectItem[] = [];
    async ngOnInit(){
      console.log(this.cell);
      await this.ServicesService.getServiceList().subscribe((res) => {
        //this.ServicesService.Service = res['services'] as Service[];
        res['services'].forEach(element => {
          console.log('servie : ' + element.name);
          let obj = {
            label : element.name,
            value : element._id
          }
          this.values.push(obj);
        });
      });
    }
    ngAfterViewInit(){

    }
}
