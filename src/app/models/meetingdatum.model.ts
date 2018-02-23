export class MeetingdatumModel{
  MeetingDatumId : Number;
  DatumStart : Date;
  DatumEind : Date;
  AantalStemmen : number;
  MeetingId : Number;
  checked : boolean = false;

  constructor(MeetingDatumId: Number, DatumStart: Date, DatumEind: Date, AantalStemmen: number, MeetingId: Number){
    this.MeetingDatumId = MeetingDatumId;
    this.DatumStart = DatumStart;
    this.DatumEind = DatumEind;
    this.AantalStemmen = AantalStemmen;
    this.MeetingId = MeetingId;
  }
}
