import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as papa from 'papaparse';
import { Http } from '@angular/http';
import { User } from "../../model/user";
import { ProjectListPage } from '../project-list/project-list';
import { CsvToJsonProvider } from '../../providers/csv-to-json/csv-to-json';

@Component({
  selector: 'page-project-overview',
  templateUrl: 'project-overview.html',
})
export class ProjectOverviewPage {

  csvData: any[] = [];
  headerRow: any[] = [];
  whereIndex: any[] = [30, 31];
  whereValue: any[] = ["E) Project", "Won"];
  oko = false;

  organization: any;
  user : User = null;
  imgUrl = '';
  image = '';
  traffic = {
    countred: 0,
    countamber: 0,
    countgreen: 0,
    countNextProject: 0,
    countPastProject: 0
  }

  trafficValvar:any;

  constructor(public navCtrl: NavController, public _navParam: NavParams, private http: Http,
    public CsvToJson:CsvToJsonProvider) {

      this.traffic.countred = 0;
      this.traffic.countamber = 0;
      this.traffic.countgreen = 0;
  

   this.user  = this._navParam.get('user');
    if(this.user.organization === "atos"){
       this.imgUrl = "assets/imgs/atosw.png"
    }
    else if(this.user.organization === "vodafone"){
      this.imgUrl = "assets/imgs/vodafone.png"
    }
    /// 
    // readCsvDataActualProject
    CsvToJson.selectDataFromIndexedDB({"RequestDepartment":"TI"}).then(data => {
      this.trafficValvar = data;
      var obj = JSON.parse(this.trafficValvar);
      this.trafficValvar=Object.keys(obj).length;

      for (var j = 0; j < Object.keys(obj).length; j++) {

        console.log(obj[j].TrafficLight);    
  
        switch (obj[j].TrafficLight) {
          case "Red":
          this.traffic.countred++;
          console.log('Red ', "Red");
          break;
        case "Green":
          this.traffic.countgreen++;
          //   console.log('something went wrong: ', "Green");
          break;
        case "Amber":
          this.traffic.countamber++;
          //  console.log('something went wrong: ', "Amber");
          break;
        default:
          //     console.log('something went wrong: ', "default");
          break;
  
        }
  
      }

    });      


   // {"RequestPhase":"E) Project","RequestStatus":"Won"}
    CsvToJson.selectDataFromIndexedDB({"RequestPhase":"E) Project","RequestStatus":"Won"}).then(data => {
      this.trafficValvar = data;
      var obj = JSON.parse(this.trafficValvar);
      this.trafficValvar=Object.keys(obj).length;
      this.traffic .countNextProject = Object.keys(obj).length;

    });   

   
    CsvToJson.selectDataFromIndexedDB({"RequestDepartment":"TI","RequestPhase":"F) Finished"}).then(data => {
      this.trafficValvar = data;
      var obj = JSON.parse(this.trafficValvar);
      this.trafficValvar=Object.keys(obj).length;
      this.traffic .countPastProject = Object.keys(obj).length;

    });  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectOverviewPage');
  }

  trackByFn(index: any, item: any) {
    return index;
  }



  goToProjectList() {
  this.navCtrl.push(ProjectListPage);
  } 
   
}
