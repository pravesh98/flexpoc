import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../model/user";
import { OrderListingPage } from '../order-listing/order-listing';
import * as papa from 'papaparse';
import { Http } from '@angular/http';
import { ProjectOverviewPage } from '../project-overview/project-overview';
import { CsvToJsonProvider } from '../../providers/csv-to-json/csv-to-json';
import { PlaceRequestPage } from '../place-request/place-request';
import { OfferCreationPage } from "../offer-creation/offer-creation";
/**
 * Generated class for the OrderingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ordering',
  templateUrl: 'ordering.html',
})
export class OrderingPage {
  
  user: User = null;
  imgUrl = '';
  csvData: any[] = [];
  headerRow: any[] = [];
  whereIndex: any[] = [30, 31];
  whereValue: any[] = ["E) Project", "Won"];
  oko = false;
  traffic = {
    countoffer: 0,
    countselection: 0,
    countorder: 0,
    countproject: 0
  }
  testvar:any;

  constructor(public navCtrl: NavController, public _navParam: NavParams, public http: Http,
    public CsvToJson:CsvToJsonProvider ) {

      this.traffic.countoffer = 0;
      this.traffic.countorder = 0;
      this.traffic.countproject = 0;
      this.traffic.countproject = 0;

   // this.readCsvDataActualProject([8], ["TI"]);
       this.user  = this._navParam.get('user');
    if(this.user.organization === "atos"){
       this.imgUrl = "assets/imgs/atosw.png"
    }
    else if(this.user.organization === "vodafone"){
      this.imgUrl = "assets/imgs/vodafone.png"
    }                

    CsvToJson.selectDataFromIndexedDB({"RequestDepartment":"TI"}).then(data => {

      // console.log('SelectDataFromCsv ',data);
      //  this.testvar = data;
      //  var obj = JSON.parse(this.testvar);
      //  this.testvar=Object.keys(obj).length;

      //  console.log('SelectDataFromCsv ',Object.keys(obj).length);
      //  for (var j = 0; j < Object.keys(obj).length; j++) {

      //    console.log(obj[j]);    
      //  }
        this.testvar = data;
  var obj = JSON.parse(this.testvar);
  this.testvar=Object.keys(obj).length;

  for (var j = 0; j < Object.keys(obj).length; j++) {

    console.log(obj[j].RequestPhase);    

    switch (obj[j].RequestPhase) {
      case "A) Offer":
        this.traffic.countoffer++;
        console.log('Red ', "Red");
        break;
      case "B) Selection":
        this.traffic.countselection++;
        //   console.log('something went wrong: ', "Green");
        break;
      case "C) Order no SC":
        this.traffic.countorder++;
        //  console.log('something went wrong: ', "Amber");
        break;
      case "E) Project":
        this.traffic.countproject++;
        //   console.log('something went wrong: ', "Green");
        break;
      default:
        //     console.log('something went wrong: ', "default");
        break;

    }

  }

 
     });  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderingPage');
  }

  selectedlist(selected) {
    console.log(selected);


    this.navCtrl.push(OrderListingPage, {
      selected: selected,
      });
  }
    showOffer(){
 this.navCtrl.push(OfferCreationPage, {
      });

    }

  goToProjectoveview() {
    this.navCtrl.parent.select(2);
  }

  goToRequest() {
    console.log("request list");
  }
  placeRequest(){
    this.navCtrl.push(PlaceRequestPage, {
         });
   
       }
}
