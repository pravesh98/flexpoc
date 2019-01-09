import { HeaderMenuComponent } from './../components/header-menu/header-menu';
//import { LoginPageModule } from './../pages/login/login.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AccountAndSettingPage } from '../pages/account-and-setting/account-and-setting';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password'
import { OrderingPage } from '../pages/ordering/ordering'
import { ProjectOverviewPage } from '../pages/project-overview/project-overview';
import { ContactPage } from '../pages/contact/contact';
import { SelectionListPage } from '../pages/selection-list/selection-list';
import { DetailsPage } from '../pages/details/details';
import { OrderListingPage } from '../pages/order-listing/order-listing';
import { ProjectListPage } from '../pages/project-list/project-list';
import { ProjectDetailsPage } from '../pages/project-details/project-details';
import { OfferDetailsPage } from '../pages/offer-details/offer-details'
import { OfferCreationPage } from "../pages/offer-creation/offer-creation";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';
import { CsvToJsonProvider } from '../providers/csv-to-json/csv-to-json';
import { PlaceRequestPage } from '../pages/place-request/place-request';
import { LoginServiceProvider } from '../providers/login-service/login-service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AccountAndSettingPage,
    ForgotPasswordPage,
    OrderingPage,
    ContactPage,
    OrderListingPage,
    DetailsPage,
    SelectionListPage,
    ProjectListPage,
    ProjectDetailsPage,
    OfferDetailsPage,
    OfferCreationPage,
    ProjectOverviewPage,
    PlaceRequestPage,
    HeaderMenuComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ng2GoogleChartsModule,
    HttpModule, HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    OfferDetailsPage,
    AccountAndSettingPage,
    ForgotPasswordPage,
    OrderingPage,
    ProjectOverviewPage,
    ContactPage,
    SelectionListPage,
    OrderListingPage,
    DetailsPage,
    ProjectListPage,
    ProjectDetailsPage,
    OfferCreationPage,
    PlaceRequestPage
  ],
  providers: [
    StatusBar,
    HttpClient,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationServiceProvider,
    CsvToJsonProvider,
    LoginServiceProvider,

  ]
})
export class AppModule { }