import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {MeetingroomModel} from "../models/meetingroom.model";

@Injectable()
export class MeetingroomService {
  constructor(private http : Http) { }

  getMeetingroomById(meetingroomId: Number){
    return this.http.get('http://lab03.ometa.net:50558/odata/runtime/SmartMeeting/Meetingrooms(' + meetingroomId + ')')
      .map((response : Response) => {
        const meetingroom = response.json();

        return new MeetingroomModel(
          meetingroom["Meetingroom Id"],
          meetingroom["Meetingroom naam"],
          meetingroom["adres"],
          meetingroom["Beschikbaar"],
          meetingroom["Betalend"],
          meetingroom["Betalend"],
          meetingroom["Prijs"],
          meetingroom["Publiek"],
          meetingroom["Facility Id"],
          meetingroom["Facility Naam"],
        );
      })
      .catch((error: Response) => Observable.throw(console.log(error)));
  }
}
