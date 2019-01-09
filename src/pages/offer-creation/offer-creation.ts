import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { ChartSelectEvent } from 'ng2-google-charts';
import { Request } from "../../model/request";



declare var google;
@Component({
  selector: 'page-offer-creation',
  templateUrl: 'offer-creation.html',
})
export class OfferCreationPage {
  timelineChartData: any;
  @ViewChild('cchart') cchart;
  selectedReq: Request;
  requestList: any;
  offerList: any;
  offers: any;
  requestMock: Observable<any>;
  offerMock: Observable<any>;
  error: boolean = false;
  ready: boolean = false;
  showOffers: boolean = false;
  showReqDetails: boolean = false;
  chartReady: boolean = false;
  reqList = new Array();
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    console.info('!sts is ..' + this);
      // google chart - start
   this.timelineChartData = {
    chartType: 'Timeline',
    dataTable: [],
    options: {
      width: "100 px",
      timeline: { colorByRowLabel: true },
      backgroundColor: '#F7FFFD',
      hAxis: {
        format: 'dd/M/yy',
        gridlines: { count: 2 }
      }
    }
  }
  // google chart - end
    this.timelineChartData.dataTable = [];
    this.timelineChartData.dataTable.push(['Name', 'From', 'To']);
    // // get mock data for req -start
    // this.requestMock = this.http.get('assets/mock-data/request-data-mock.json');
    // this.requestMock
    //   .subscribe(data => {
    //     console.info("itaaaaaaaaaaaa " + this.timelineChartData.dataTable);
    //     this.requestList = data;
    //     this.timelineChartData.dataTable.push(['Name', 'From', 'To']);
    //     for (var req of this.requestList.requests) {
    //       var aa = [req.name, new Date(req.startDate), new Date(req.endDate)]
    //       this.timelineChartData.dataTable.push(aa);
    //       this.chartReady = true;
    //     }
    //   })
    // // get mock data for req - end
   let that: any = this;
    var openRequest = indexedDB.open("vodafone", 1);

    openRequest.onupgradeneeded = function () {
      console.info("Should not end here....");
    }

    openRequest.onsuccess = function (e) {
      var db = openRequest.result;
      var tx = db.transaction("requestObjectStore", "readonly");
      var store = tx.objectStore("requestObjectStore");
      var request = store.openCursor();

      request.onsuccess = function (event) {
        let cursor = request.result;
        if (cursor) {
          let key = cursor.primaryKey;
          let value = cursor.value;
          var req: Request = value;
          var aa = [req.typeOfService, new Date(req.startDate), new Date(req.endDate)]
           that.timelineChartData.dataTable.push(aa);
           that.reqList.push(req);
           cursor.continue();
        }
        else {
          // no more results
           that.chartReady = true;
        }
      };

      request.onerror = function (e) {
        console.info("Error in request cursor !!!!!!!!!", e.target.error.name);
      }

      tx.oncomplete = function () {
        console.info("tx complete closing db..");
        db.close();
      };
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferCreationPage');
  }

  public createOffer() {
    this.offerMock = this.http.get('assets/mock-data/offer-data-mock.json');
    this.offerMock
      .subscribe(data => {
        this.offerList = data;
        this.showOffers = true;
      })

  }
  public select(event: ChartSelectEvent) {

    for (var req of this.reqList) {
      if (req.typeOfService === event.selectedRowValues[0]) {
        var duration: number = moment(event.selectedRowValues[2]).diff(moment(event.selectedRowValues[1]), 'days');
        this.selectedReq = new Request(req.name, req.requesterName, req.typeOfService, req.startDate, req.endDate, req.suggestion, req.comment, duration, '');
        this.showReqDetails = true;
        this.showOffers = false;
        break
      }
    }

  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cchart.redraw();
  }
}
