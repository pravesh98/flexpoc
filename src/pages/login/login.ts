import { AuthenticationServiceProvider } from './../../providers/authentication-service/authentication-service';
import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../../model/user';
import { AccountAndSettingPage } from "../account-and-setting/account-and-setting";
import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { CsvToJsonProvider } from '../../providers/csv-to-json/csv-to-json'; 

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  results: any;
  userMock: Observable<any>;
  error: boolean = false;

  /**
    * Create reference for FormGroup object
    */
  public form: FormGroup;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams, private _FB: FormBuilder, private http: HttpClient, public authService: AuthenticationServiceProvider, public loginService: LoginServiceProvider,public CsvToJson:CsvToJsonProvider  
) {
    CsvToJson.insertDatafromCsvtoDB().then(data => {  

});  


    this.menuCtrl.enable(false);
    this.form = this._FB.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

  }
  //TODO Use authentication service inside providers once details are finalized.
  logIn(): void {
    let username: any = this.form.controls['username'].value,
      password: any = this.form.controls['password'].value;
    let logUser: User;

    this.userMock = this.http.get('assets/mock-data/user-data-mock.json');
    this.userMock
      .subscribe(data => {
        this.results = data;

        if (username === password) {
          for (var user of this.results.users) {
            if (username === user.fname) {
              logUser = new User(user.fname, user.lname, user.email, user.organization, user.department, user.functions);
              this.loginService.loggedUser = logUser;
              break;
            }
          }

          this.navCtrl.setRoot(AccountAndSettingPage, { user: logUser });
        }
        else {
          console.log('Authentication Failed');
          //this.forgotPassword();
          this.error = true;
        }

      })

  }


  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
