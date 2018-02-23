export class MeetinguserModel {
  meetingUserId: Number;
  meetingId: Number;
  email: string;

  constructor(meetingUserId: Number, meetingId: Number, email:string){
    this.meetingUserId = meetingUserId;
    this.meetingId = meetingId;
    this.email = email;
  }
}
