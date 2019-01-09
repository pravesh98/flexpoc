import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as papa from 'papaparse';
import { Http } from '@angular/http';
import { OrderListingPage } from '../order-listing/order-listing';
import {  ProjectOverviewPage } from '../project-overview/project-overview';

@Component({
  selector: 'page-selection-list',
  templateUrl: 'selection-list.html',
})
export class SelectionListPage {
  csvData: any[] = [];
  headerRow: any[] = [];
  whereIndex: any[] = [8, 30];
  whereValue: any[] = ["TI", "B) Project"];
  oko = false;
  parsedjsonArrayForNextProj : any;
  organization: any;
  imgUrl = '';
  image = '';
  list = {
    nessie: [],
    requestid: [],
    name: [],
  }
  constructor(public navCtrl: NavController, public _navParam: NavParams, private http: Http) {
    // this.organization = this._navParam.get('organization');
    // if (this.organization === "atos") {
    //   this.imgUrl = "/assets/imgs/atos.png"
    // }
    // else if (this.organization === "vodafone") {
    //   this.imgUrl = "../../assets/imgs/vodafone.png"
    // }
    //this.image = "../../assets/imgs/vodafone.png ";
    this.readCsvListView([8], ["TI"]);
    console.log('First one completed ', 'First one completed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectionListPage');
  }

  private readCsvListView(whereIndex, whereValue) {

    this.http.get('../../assets/ExportCSV.csv')
      .subscribe(
        data => this.extractCsv(data, whereIndex, whereValue),
        err => this.handleError(err)

      );

  }

  private extractCsv(res, whereIndexRes, whereValueRes) {


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

    var onlyField = [0, 3, 4, 8];

    var jsonObject = {};
    var jsonAarray = [];

    for (var j = 0; j < fieldValue.length; j++) {
      var testdata = fieldValue[j];
      console.log("testdata: " + fieldValue[j])

      for (var i = 0; i < fieldNames.length; i++) {
        if (onlyField.indexOf(i) > -1) // if exists
          jsonObject[fieldNames[i]] = testdata[i];


      }
      jsonAarray.push(jsonObject);
      //jsonObject = {};
    }
    this.parsedjsonArrayForNextProj  =  JSON.parse(JSON.stringify(jsonAarray,  undefined,  2));

    console.log(JSON.stringify(jsonAarray, undefined, 2)); // prints [1] 

    this.oko = true;
  }
  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  downloadCSV() {
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });

    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  CsvToJsonConvert() {
    // Let take strData  as csv string
    var strData: string = "head1, head2, head3\nval1, val2, val3\nval4, val5, val6";
    console.log(strData);

    var strDelimiter: string = ",";

    var objPattern = new RegExp(
      (
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );
    // Convert To Array as split of Row from .csv string    
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
      var strMatchedDelimiter = arrMatches[1];
      if (
        strMatchedDelimiter.length &&
        (strMatchedDelimiter != strDelimiter)
      ) {
        arrData.push([]);
      }
      if (arrMatches[2]) {
        var strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
        );
      } else {
        // tslint:disable-next-line:no-duplicate-variable
        var strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue.trim());
    }
    // Convert done To Array as split of Row from .csv string
    console.log(arrData);

    // Convert To Json from Array of split Row from .csv string
    var valuesArray = arrData;
    var fieldNames = valuesArray.splice(0, 1)[0];
    var objectsArray = valuesArray.map(function (values) {
      var object = {};
      for (var i = 0; i < values.length; i++) {
        object[fieldNames[i]] = values[i];
      };
      return object;
    });
    var json: String = JSON.stringify(objectsArray, undefined, 4);

    // Required json string
    console.log(json);

  }
  sendorderlisting() {
    this.navCtrl.push(OrderListingPage);
  }

}
