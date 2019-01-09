import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from "../../model/user";

/**
 * Generated class for the AccountAndSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-and-setting',
  templateUrl: 'account-and-setting.html',
})
export class AccountAndSettingPage {
  organization: any;
  imgUrl = '';
  user: User = null;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public _navParam: NavParams) {
    this.menuCtrl.enable(true);
    this.user = this._navParam.get('user');
    if (this.user.organization === "atos") {
      this.imgUrl = "assets/imgs/atosw.png"
    }
    else if (this.user.organization === "vodafone") {
      this.imgUrl = "assets/imgs/vodafone.png"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountAndSettingPage');
  }

}
