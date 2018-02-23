import { Component, OnInit } from '@angular/core';
import {MeetingdatumModel} from "../../models/meetingdatum.model";
import {MeetingdatumService} from "../../services/meetingdatum.service";
import {ActivatedRoute, Params} from "@angular/router";
import {forEach} from "@angular-devkit/schematics";
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ISubscription} from "rxjs/Subscription";
import {MeetingService} from "../../services/meeting.service";
import {MeetingComponent} from "../meeting/meeting.component";
import {MeetinguserModel} from "../../models/meetinguser.model";
import {MeetinguserService} from "../../services/meetinguser.service";

@Component({
  providers:[MeetingComponent],
  selector: 'app-meetingdatum',
  templateUrl: './meetingdatum.component.html',
  styleUrls: ['./meetingdatum.component.css']
})
export class MeetingdatumComponent implements OnInit {
  private datums : MeetingdatumModel[];
  private id : Number;
  private voorkeurDatum : MeetingdatumModel;
  private subber: ISubscription;
  private users : MeetinguserModel[];

  constructor(private meetingdatumService: MeetingdatumService, private route: ActivatedRoute, private meetingService: MeetingService, private userService: MeetinguserService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.subber = this.meetingdatumService.getMeetingdatumOnMeetingId(this.id).subscribe((datums: MeetingdatumModel[]) => {
        this.datums = datums;

        console.log(this.voorkeurDatum);

        this.datums.forEach((datum) => {
          if(this.voorkeurDatum == null){
            this.voorkeurDatum = datum;
          }

          if(datum.AantalStemmen > this.voorkeurDatum.AantalStemmen){
            this.voorkeurDatum = datum;
          }

        });
        console.log(this.voorkeurDatum);
      });

      this.userService.getUsersByMeeting(this.id).subscribe((users: MeetinguserModel[])=>{
        this.users = users;
      });
    });

    setInterval(() =>{this.refreshDatums()},1000);
  }

  onSubmit(f:NgForm){
    var checkMail = this.checkEmailValidation(JSON.stringify(f.value.email));
    alert(checkMail);
    if(checkMail) {
      this.datums.forEach((datum) => {
        if (datum.checked) {
          datum.AantalStemmen += 1;

          this.meetingdatumService.updateMeetingDatum(datum);

          if (this.voorkeurDatum.AantalStemmen < datum.AantalStemmen) {
            this.voorkeurDatum = datum;
            this.meetingService.updateMeetingOnId(this.id, datum.DatumStart, datum.DatumEind);
          }
        }
      });
    }

    f.resetForm();

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


  checkEmailValidation(email: string){
    var emailchecker = false;
    this.users.forEach((mail) =>{
      var mailadres = mail.email.toString() +"";
      if("\"" + mailadres + "\"" == email && email != "\"\""){
        emailchecker = true;
      }
    });

    return emailchecker;
  }

  refreshDatums(){
    this.subber.unsubscribe();
    this.subber = this.meetingdatumService.getMeetingdatumOnMeetingId(this.id).subscribe((datums: MeetingdatumModel[]) => {
      this.datums = datums;

      console.log(this.voorkeurDatum);

      this.datums.forEach((datum) => {
        if(this.voorkeurDatum == null){
          this.voorkeurDatum = datum;
        }

        if(datum.AantalStemmen > this.voorkeurDatum.AantalStemmen){
          this.voorkeurDatum = datum;
        }
      });
      console.log(this.voorkeurDatum);
    });
  }
}
