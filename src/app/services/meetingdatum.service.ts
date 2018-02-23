import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {MeetingdatumModel} from "../models/meetingdatum.model";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MeetingdatumService {
  datums: MeetingdatumModel[] = [];
  constructor(private http : Http) { }

  getMeetingdatumOnMeetingId(meetingId: Number){
    return this.http.get('http://lab03.ometa.net:50558/odata/runtime/SmartMeeting/MeetingDatums?$filter=MeetingId eq ' + meetingId)
      .map((response : Response) => {
        const meetingdatums = response.json();
        let transformedDatums : MeetingdatumModel[] = [];

        for(let meetingdatum of meetingdatums.value){
          transformedDatums.push(new MeetingdatumModel(
            meetingdatum["Meeting Datum Id"],
            meetingdatum["Datum Start"],
            meetingdatum["Datum Eind"],
            meetingdatum["Aantal Stemmen"],
            meetingdatum["MeetingId"]
          ));
        }

        this.datums = transformedDatums;
        return transformedDatums;
      })
      .catch((error: Response) => Observable.throw(console.log(error)));
  }

  getMeetingdatumById(meetingDatumId : Number){
    return this.http.get('http://lab03.ometa.net:50558/odata/runtime/SmartMeeting/MeetingDatums('+ meetingDatumId +')')
      .map((response : Response) => {
        const meetingdatum = response.json();

          return new MeetingdatumModel(
            meetingdatum["Meeting Datum Id"],
            meetingdatum["Datum Start"],
            meetingdatum["Datum Eind"],
            meetingdatum["Aantal Stemmen"],
            meetingdatum["MeetingId"]
          );
        })
      .catch((error: Response) => Observable.throw(console.log(error)));
  }

  updateMeetingDatum(meetingDatum:MeetingdatumModel){

    const headers = new Headers({'Content-Type' : 'application/json'});
    console.log(meetingDatum);
    return this.http.patch('http://lab03.ometa.net:50558/odata/runtime/SmartMeeting/MeetingDatums(' + meetingDatum.MeetingDatumId + ')',
      {
        "Aantal Stemmen": meetingDatum.AantalStemmen
      }
      , {headers: headers}).toPromise()
      .then((response: any) => console.log(response))
      .catch((error: any) => {console.log(error);});
  }

}
