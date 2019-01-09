import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild, HostListener } from '@angular/core';

/**
 * Generated class for the OfferDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetailsPage {
  @ViewChild('cchart') cchart;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // google chart - start
public timelineChartData: any = {
    chartType: 'Timeline',
    dataTable: [
      ['Name', 'From', 'To'],
      ['PPM-ID 238647_342911', new Date(2017, 0, 1), new Date(2017, 8, 30)],
      ['PPM-ID 238647_342922', new Date(2017,7,1), new Date(2018, 0, 10)],
      ['PPM-ID 238647_342933', new Date(2018, 2, 12), new Date(2018, 6, 25)]
    ],
    options: {'backgroundColor': 'white'}
  }
  // google chart - end

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferDetailsPage');
  }

    @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.info("--------- Size changed--------------");
    this.cchart.redraw();
  }

}
