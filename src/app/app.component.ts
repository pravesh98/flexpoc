import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { AccountAndSettingPage } from "../pages/account-and-setting/account-and-setting";
import { OrderingPage } from "../pages/ordering/ordering";
import { ContactPage } from "../pages/contact/contact";
import { ProjectOverviewPage } from "../pages/project-overview/project-overview";
import { LoginServiceProvider } from "../providers/login-service/login-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  activePage: any;
  pages: Array<{ title: string, component: any,index:string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public loginService: LoginServiceProvider) {
    this.initializeApp();
    
    this.pages = [
      { title: 'Account & Setting', component: AccountAndSettingPage, index:'1'},
      { title: 'Ordering', component: OrderingPage, index:'2' },
      { title: 'Project Overview', component: ProjectOverviewPage, index:'3' },
      { title: 'Contact', component: ContactPage, index:'4' },
      { title: 'LOGOUT', component: null, index:'5' }
    ];
    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  servePage(page) {
    if (page.component) {
      this.nav.setRoot(page.component, { user: this.loginService.loggedUser });
      this.activePage = page;
    }
    else {
      //logout flow
      this.loginService.loggedUser = null;
      this.nav.setRoot(LoginPage);
    }
  }

  isActive(page){
    return page == this.activePage;
  }
  
  getIcon(index){
   var pIndex:string = index; 
switch(pIndex) { 
   case "1": { 
     return "construct";
       } 
   case "2": { 
      return "cart"
   } 
   case "3": {
    return "eye"
  } 
   case "4": { 
     return "contact"
   } 
    case "5": { 
     return "power"
   }  
}
  }
}
