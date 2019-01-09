import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationServiceProvider {

  data_selection:any;
  data_order:any;

  constructor(public http: HttpClient) {
    
  }

  getOrder(){
    this.data_order=[   
      {
        "req_id":1,
        "req_name":"requested order name first",
        "req_status_date":"24/04/2018",
        "req_department":"T1"
      },
      {
          "req_id":2,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
          "req_id":3,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
          "req_id":4,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
          "req_id":5,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        }
      ];
    return this.data_order;
  }

  getSelection() {
    this.data_selection=[   
      {
        "req_id":10,
        "req_name":"requested order name first",
        "req_status_date":"24/04/2018",
        "req_department":"T1"
      },
      {
          "req_id":11,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
          "req_id":12,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
          "req_id":13,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
          "req_id":14,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
          "req_id":15,
          "req_name":"requested order name first",
          "req_status_date":"24/04/2018",
          "req_department":"T1"
        },
        {
            "req_id":16,
            "req_name":"requested order name first",
            "req_status_date":"24/04/2018",
            "req_department":"T1"
          },
          {
            "req_id":17,
            "req_name":"requested order name first",
            "req_status_date":"24/04/2018",
            "req_department":"T1"
          },
          {
            "req_id":18,
            "req_name":"requested order name first",
            "req_status_date":"24/04/2018",
            "req_department":"T1"
          },
          {
            "req_id":19,
            "req_name":"requested order name first",
            "req_status_date":"24/04/2018",
            "req_department":"T1"
          }
      ];
      return this.data_selection;
  }

}
