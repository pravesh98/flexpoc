import { Component,HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewChild} from '@angular/core';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
@ViewChild('cchart') cchart;

  dataReceived:any;
  title:"sample";

constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataReceived=this.navParams.get("dataDetail");
    console.log(this.dataReceived.ID);
  }
chartType = 'Timeline';

            

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.info("--------- Size changed--------------");
    this.cchart.redraw();
  }

}
