import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {MeetinguserModel} from "../models/meetinguser.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MeetinguserService {
  meetingUsers: MeetinguserModel[] = [];
  constructor(private http: Http) {}

  getUsersByMeeting(meetingId: Number){
    return this.http.get('http://lab03.ometa.net:50558/odata/runtime/SmartMeeting/Meetings2Users?$filter=Meeting_x0020_Id eq ' + meetingId)
      .map((response : Response) => {
        const users = response.json();
        let userlist : MeetinguserModel[] = [];

        for(let user of users.value){
          userlist.push(new MeetinguserModel(
            user["Meeting User Id"],
            user["Meeting Id"],
            user["Email"]
          ));
        }

        this.meetingUsers = userlist;
        return userlist;
      })
      .catch((error: Response) => Observable.throw(console.log(error)));
  }
}
