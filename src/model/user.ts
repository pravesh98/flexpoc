export class User {

  fname: string;
  lname: string;
  email: string;
  organization: string;
  department: string;
  functions: string;

  constructor(fname: string,lname:string, email: string, organization: string,department: string, functions:string) {
    this.fname = fname;
    this.lname = lname
    this.email = email;
    this.organization = organization;
    this.department = department;
    this.functions= functions;
  }
}