import { Component, OnInit } from '@angular/core';
import {MeetingModel} from "../../models/meeting.model";
import {ActivatedRoute, Params} from "@angular/router";
import {MeetingService} from "../../services/meeting.service";
import {ODataService } from "angular2-odata";
import {MeetingroomModel} from "../../models/meetingroom.model";
import {MeetingroomService} from "../../services/meetingroom.service";
import {MeetingdatumModel} from "../../models/meetingdatum.model";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  private odata:ODataService<MeetingModel>;

  private meeting:  MeetingModel;
  private room : MeetingroomModel;
  private datums : MeetingdatumModel[];
  private id: number;
  public sub : ISubscription;

  constructor(private meetingService:MeetingService,private route:ActivatedRoute, private meetingroomService: MeetingroomService){

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.sub = this.meetingService.getMeetingOnId(this.id).subscribe(meeting =>{
        this.meeting = meeting;
        this.meetingroomService.getMeetingroomById(this.meeting.MeetingroomId).subscribe(meetingroom => {
          this.room = meetingroom;
        });
      });
      console.log(this.sub);
    });

    setInterval(() =>{this.refreshMeeting()},1000);
  }

  toDateString(datum: string){
    let date = new Date(datum);
    var uur = "" +date.getHours();
    var minuten ="" + date.getMinutes();

    if(date.getHours() < 10){
      uur = "0" + date.getHours();
    }

    if(date.getMinutes() < 10){
      minuten = "0" + date.getMinutes();
    }

    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " - " + uur + ":" + minuten;
  }

  refreshMeeting() {
    console.log('interval');
    this.sub.unsubscribe();
    this.meeting = null;
    this.sub = this.meetingService.getMeetingOnId(this.id).subscribe(meeting =>{
      this.meeting = meeting;
      this.meetingroomService.getMeetingroomById(this.meeting.MeetingroomId).subscribe(meetingroom => {
        this.room = meetingroom;
      });
    });
  }

}
