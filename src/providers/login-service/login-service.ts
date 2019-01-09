import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../../model/user";

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
 loggedUser : User;
  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
  }

}
