export class MeetingModel {
  MeetingId: Number;
  Title : string;
  Description : string;
  DatumStart: Date;
  OriginaleDatumEind : Date;
  DatumEind : Date;
  MeetingroomId : Number;

  constructor(meetingId: Number, Title : string, description : string, datumStart : Date, origineleDatumEind : Date, datumeind : Date, meetingroomId : Number){
    this.MeetingId = meetingId;
    this.Title = Title;
    this.Description = description;
    this.DatumStart = datumStart;
    this.OriginaleDatumEind = origineleDatumEind;
    this.DatumEind = datumeind;
    this.MeetingroomId = meetingroomId;
  }
}
