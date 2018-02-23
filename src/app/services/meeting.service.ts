import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {MeetingModel} from "../models/meeting.model";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MeetingService {
  constructor(private http : Http) { }

  getMeetingOnId(meetingId: Number){
    return this.http.get('http://lab03.ometa.net:50558/odata/runtime/SmartMeeting/Meetings(' + meetingId + ')')
      .map((response : Response) => {
        const meeting = response.json();

        return new MeetingModel(
            meeting["Meeting Id"],
            meeting["Title"],
            meeting["Description"],
            meeting["Datum Start"],
            meeting["Orginele Datum Eind"],
            meeting["Datum Eind"],
            meeting["Meetingroom Id"]
            );
      })
      .catch((error: Response) => Observable.throw(console.log(error)));
  }

  updateMeetingOnId(meetingId: Number, datumStart: Date, datumEind: Date){
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.patch('http://lab03.ometa.net:50558/odata/runtime/SmartMeeting/Meetings(' + meetingId + ')',
      {
        "Datum Start": datumStart,
        "Datum Eind": datumEind
      }
      , {headers: headers}).toPromise()
      .then((response: any) => console.log(response))
      .catch((error: any) => {console.log(error);});
  }
}
