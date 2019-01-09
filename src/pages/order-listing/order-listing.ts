import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DetailsPage } from '../details/details';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';

import * as papa from 'papaparse';
import { Http } from '@angular/http';
import { User } from "../../model/user";
import { CsvToJsonProvider } from '../../providers/csv-to-json/csv-to-json';

/**
 * Generated class for the OrderListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-listing',
  templateUrl: 'order-listing.html',
})
export class OrderListingPage {

  user: User = null;
  imgUrl = '';

  csvData: any[] = [];
  headerRow: any[] = [];
  whereIndex: any[] = [30, 31];
  whereValue: any[] = ["E) Project", "Won"];
  oko = false;
  groceries: any;

  title: string;
  link: string;
  dataReceived: Observable<any>;
  result: any;
  testvar:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: AuthenticationServiceProvider,
    private http: Http,public CsvToJson:CsvToJsonProvider ) {
    // this.user  = this.navParams.get('user');
    // if(this.user.organization === "atos"){
    //    this.imgUrl = "assets/imgs/atosw.png"
    // }
    // else if(this.user.organization === "vodafone"){
    //   this.imgUrl = "assets/imgs/vodafone.png"
    // }
    this.title = navParams.get('selected');
    console.log(this.title);

    switch (this.title) {
      case "Offer":
      //  this.readCsvData([8, 30], ["TI", "A) Offer"]);

      CsvToJson.selectDataFromIndexedDB({"RequestDepartment":"TI","RequestPhase":"A) Offer"}).then(data => {

        // console.log('SelectDataFromCsv ',data);
        //  this.testvar = data;
        //  var obj = JSON.parse(this.testvar);
        //  this.testvar=Object.keys(obj).length;

        //  console.log('SelectDataFromCsv ',Object.keys(obj).length);
        //  for (var j = 0; j < Object.keys(obj).length; j++) {

        //    console.log(obj[j]);    
        //  }
        this.testvar = data;
        this.result = JSON.parse(this.testvar);
        //this.result = JSON.parse(JSON.stringify(jsonAarray, undefined, 2));
       });  

        break;

      case "Selection":
       // this.readCsvData([8, 30], ["TI", "B) Selection"]);

       CsvToJson.selectDataFromIndexedDB({"RequestDepartment":"TI","RequestPhase":"B) Selection","RequestIDFieldglass":"VFSWRX00000986"}).then(data => {

        // console.log('SelectDataFromCsv ',data);
        //  this.testvar = data;
        //  var obj = JSON.parse(this.testvar);
        //  this.testvar=Object.keys(obj).length;

        //  console.log('SelectDataFromCsv ',Object.keys(obj).length);
        //  for (var j = 0; j < Object.keys(obj).length; j++) {

        //    console.log(obj[j]);    
        //  }
        this.testvar = data;
        this.result = JSON.parse(this.testvar);
        //this.result = JSON.parse(JSON.stringify(jsonAarray, undefined, 2));
       });  
        break;

      case "Order":
       // this.readCsvData([8, 30], ["TI", "C) Order no SC"]);
       CsvToJson.selectDataFromIndexedDB({"RequestDepartment":"TI","RequestPhase":"C) Order no SC"}).then(data => {

        // console.log('SelectDataFromCsv ',data);
        //  this.testvar = data;
        //  var obj = JSON.parse(this.testvar);
        //  this.testvar=Object.keys(obj).length;

        //  console.log('SelectDataFromCsv ',Object.keys(obj).length);
        //  for (var j = 0; j < Object.keys(obj).length; j++) {

        //    console.log(obj[j]);    
        //  }
        this.testvar = data;
        this.result = JSON.parse(this.testvar);
        //this.result = JSON.parse(JSON.stringify(jsonAarray, undefined, 2));
       });  
        break;

      case "Project":
       // this.readCsvData([8, 30], ["TI", "E) Project"]);
         CsvToJson.selectDataFromIndexedDB({"RequestDepartment":"TI","RequestPhase":"E) Project"}).then(data => {

        // console.log('SelectDataFromCsv ',data);
        //  this.testvar = data;
        //  var obj = JSON.parse(this.testvar);
        //  this.testvar=Object.keys(obj).length;

        //  console.log('SelectDataFromCsv ',Object.keys(obj).length);
        //  for (var j = 0; j < Object.keys(obj).length; j++) {

        //    console.log(obj[j]);    
        //  }
        this.testvar = data;
        this.result = JSON.parse(this.testvar);
        //this.result = JSON.parse(JSON.stringify(jsonAarray, undefined, 2));
       });  
        break;

      default:
        break;
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListingPage');
    switch (this.title) {
      case "order":
        this.link = "assets/mock-data/list-order.json";
        this.result = this.service.getOrder();
        console.log(this.result);
        break;
      case "selection":
        this.link = "assets/mock-data/list-selection.json";
        // this.result=this.service.getSelection();
        break;
    }

    console.log(this.result);

    console.log(this.link);
  }

  detail(data) {
    console.log(data);
    this.navCtrl.push(DetailsPage, {
      dataDetail: data
    });
  }
  private readCsvData(whereIndex, whereValue) {



    this.http.get('assets/ExportCSV.csv')
      .subscribe(
        data => this.extractDataActualProject(data, whereIndex, whereValue),
        err => this.handleError(err)

      );

  }

  private extractDataActualProject(res, whereIndexRes, whereValueRes) {


    var whereIndex = whereIndexRes;
    var whereValue = whereValueRes;

    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    let parsedData1 = papa.parse(csvData).data;

    this.headerRow = parsedData[0];

    parsedData.splice(0, 1);
    this.csvData = parsedData;

    // console.log(parsedData1);

    var myData = [];
    var fieldValue = [];
    var valuesArray = parsedData;
    var fieldNames = this.headerRow;
    var objectsArray = valuesArray.map(function (values) {
      //    var object = {};

      var temp = false;
      for (var j = 0; j < whereIndex.length; j++) {

        if (typeof values[whereIndex[j]] !== 'undefined') {

          if (values[whereIndex[j]]
            == (whereValue[j])) {
            // console.log(whereValue[j]);
            temp = true;
            //  console.log(temp);
          }
          else {
            console.log(j);
            temp = false;
            break;
          }
        }

        // temp=false;
      }
      if (temp)
        console.log(temp);

      if (temp) {
        for (var i = 0; i < values.length; i++) {

          //  object[fieldNames[i]] = values[i]; 
          myData.push(values[i]);

        };
        console.log(myData);
        fieldValue.push(myData);
        myData = [];
        //   return object;
      }
      temp = false;

    });

    var onlyField = [0, 1, 2, 3, 4, 8, 13, 30, 80];

    var jsonObject = {};
    var jsonAarray = [];

    for (var j = 0; j < fieldValue.length; j++) {
      var testdata = fieldValue[j];


      for (var i = 0; i < fieldNames.length; i++) {
        if (onlyField.indexOf(i) > -1) // if exists
          //  jsonObject[fieldNames[i]] = testdata[i];
          jsonObject[((((fieldNames[i].replace(/ /g, "")).replace("(", "")).replace(")", ""))).replace(/\//g, "")]
            = testdata[i];


      }
      jsonAarray.push(jsonObject);
      jsonObject = {};
    }
    console.log(JSON.stringify(jsonAarray, undefined, 2)); // prints [1] 
    //this.service.setSelection(JSON.stringify(jsonAarray, undefined, 2));
    this.result = JSON.parse(JSON.stringify(jsonAarray, undefined, 2));
    this.oko = true;

  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }

}
