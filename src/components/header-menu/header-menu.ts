import { LoginPage } from './../../pages/login/login';
import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;

  constructor(public menuCtrl: MenuController,
              public app: App, private alertCtrl:AlertController) {
      }

  logout() {

    let confirm = this.alertCtrl.create({
      title:"Logout",
      message:"Sure you want to logout ?",
      buttons:[{
        text:"Ok",
        handler:() => {
          this.menuCtrl.close();
        var nav = this.app.getRootNav();
        nav.setRoot(LoginPage);
        }
      },{
        text:"Cancel",
        handler:()=>{
          console.error("==Logout cancel==");
        }
      }   
        ],
      cssClass: 'alertDanger'
    });
    confirm.present();
  }

}
