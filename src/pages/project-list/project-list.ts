import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProjectDetailsPage} from '../project-details/project-details';

/**
 * Generated class for the ProjectOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {

  organization: any;
  imgUrl = '';
  image = '';
  listDataR: any;
  listDataA: any;
  listDataG: any;

  constructor(public navCtrl: NavController, public _navParam: NavParams) {
    this.organization = this._navParam.get('organization');
    if (this.organization === "atos") {
      this.imgUrl = "assets/imgs/atos.png"
    }
    else if (this.organization === "vodafone") {
      this.imgUrl = "assets/imgs/vodafone.png"
    }
    this.image = "assets/imgs/vodafoneebg.png";


    this.listDataR = [{ "Name": "Project 1", "O": "1", "T": "1", "B": "2", "Q": "3" }, { "Name": "Project 2", "O": "1", "T": "1", "B": "3", "Q": "2" }, { "Name": "Project 3", "O": "1", "T": "1", "B": "1", "Q": "2" }];
    this.listDataA = [{ "Name": "Project 4", "O": "2", "T": "2", "B": "2", "Q": "3" }];
    this.listDataG = [{ "Name": "Project 5", "O": "3", "T": "3", "B": "2", "Q": "1" }, { "Name": "Project 6", "O": "3", "T": "3", "B": "3", "Q": "2" }, { "Name": "Project 7", "O": "3", "T": "3", "B": "1", "Q": "2" },
    { "Name": "Project 8", "O": "3", "T": "3", "B": "1", "Q": "1" }, { "Name": "Project 9", "O": "3", "T": "3", "B": "3", "Q": "1" }, { "Name": "Project 10", "O": "3", "T": "3", "B": "1", "Q": "3" },
    { "Name": "Project 11", "O": "3", "T": "3", "B": "2", "Q": "1" }, { "Name": "Project 12", "O": "3", "T": "3", "B": "3", "Q": "2" }, { "Name": "Project 13", "O": "3", "T": "3", "B": "1", "Q": "2" },
    { "Name": "Project 14", "O": "3", "T": "3", "B": "1", "Q": "1" }, { "Name": "Project 15", "O": "3", "T": "3", "B": "3", "Q": "1" }, { "Name": "Project 16", "O": "3", "T": "3", "B": "1", "Q": "3" },
    { "Name": "Project 17", "O": "3", "T": "3", "B": "2", "Q": "1" }, { "Name": "Project 18", "O": "3", "T": "3", "B": "3", "Q": "2" }, { "Name": "Project 19", "O": "3", "T": "3", "B": "1", "Q": "2" },
    { "Name": "Project 20", "O": "3", "T": "3", "B": "1", "Q": "1" }, { "Name": "Project 21", "O": "3", "T": "3", "B": "3", "Q": "1" }, { "Name": "Project 22", "O": "3", "T": "3", "B": "1", "Q": "3" }];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectListPage');
  }

  loadProjectDetails(data,trafficColor,colorcount){
  this.navCtrl.push(ProjectDetailsPage,{
    dataDetail:data,trafficSign:trafficColor,colorCount:colorcount
    });
  }
}
