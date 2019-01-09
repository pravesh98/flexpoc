export class Request {

  name: string;
  requesterName: string;
  typeOfService: string;
  startDate: string;
  endDate: string;
  suggestion: string;
  comment: string;
  duration: number;
  requestId: string;

  constructor(name: string,requesterName:string, typeOfService: string,startDate: string, endDate:string,suggestion:string,comment:string,duration:number,requestId: string) {
    this.name = name;
    this.requesterName= requesterName;
    this.typeOfService = typeOfService;
    this.startDate = startDate;
    this.endDate = endDate;
    this.suggestion = suggestion;
    this.comment = comment;
    this.duration = duration;
    this.requestId = requestId;
  }
}