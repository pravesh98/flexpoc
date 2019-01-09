import { AuthenticationServiceProvider } from './../../providers/authentication-service/authentication-service';
import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../../model/user';
import { Demorequest } from "../../model/demorequest";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-place-request',
  templateUrl: 'place-request.html',
})

export class PlaceRequestPage {
  results: any;
  userMock: Observable<any>;
  error: boolean = false;
  /**
    * Create reference for FormGroup object
    */
  public form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder, private http: HttpClient, public authService: AuthenticationServiceProvider) {

    this.form = this._FB.group({
      'requesterName': ['', Validators.required],
      'serviceType': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'suggestion': ['', Validators.required],
      'comment': ['', Validators.required],
    });

  }
  placeRequest() {
    let requesterName: any = this.form.controls['requesterName'].value,
      serviceType: any = this.form.controls['serviceType'].value,
      startDate: any = this.form.controls['startDate'].value,
      endDate: any = this.form.controls['endDate'].value,
      suggestion: any = this.form.controls['suggestion'].value,
      comment: any = this.form.controls['comment'].value;
      var requestId: any = Math.floor(Math.random()*(10000-1000));
   
    let demorequest;
    demorequest = new Demorequest('',requesterName,serviceType,startDate,endDate,suggestion,comment,1,requestId);
    

    var openRequest = indexedDB.open("vodafone", 1);
   
    openRequest.onupgradeneeded = function () {
      console.info("Upgrading...");
     var db = openRequest.result;
      if (!db.objectStoreNames.contains("requestObjectStore")) {
        var store = db.createObjectStore("requestObjectStore", { keyPath: "requestId" }/*{autoIncrement:true}*/);
      }

    }

    openRequest.onsuccess = function (e) {
       var db = openRequest.result;
      console.info("Success!");
      var tx = db.transaction("requestObjectStore", "readwrite");
      var store = tx.objectStore("requestObjectStore");
      var request = store.put(demorequest);

      request.onerror = function (e) {
        console.info("Error !!!!!!!!!", e.target.error.name);
        //some type of error handler
      }

      request.onsuccess = function (e) {
        console.info("Woot! Did it");
              //retrieve this data
      //console.info("Data from db >>>>>>>>>" + store.get(demorequest.requestId).result); 

      }

      tx.oncomplete = function() {
        console.info("tx complete closing db..");
            db.close();
        };
    }

    openRequest.onerror = function (e) {
      console.info("Error");
      console.dir(e);
    }
  }
}
