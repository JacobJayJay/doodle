export class MeetingroomModel{
  MeetingroomId: Number;
  MeetingroomNaam: string;
  adres: string;
  Beschikbaar: boolean;
  Betalend: boolean;
  Grootte: Number;
  Prijs: Number;
  Publiek: boolean;
  FacilityId: Number;
  FacilityNaam: string

  constructor(MeetingroomId : Number, MeetingroomNaam: string, adres : string, Beschikbaar : boolean, Betalend : boolean, Grootte : Number,
  Prijs : Number, Publiek : boolean, FacilityId : Number, FacilityNaam : string){
    this.MeetingroomId = MeetingroomId;
    this.MeetingroomNaam = MeetingroomNaam;
    this.adres = adres;
    this.Beschikbaar = Beschikbaar;
    this.Betalend = Betalend;
    this.Grootte = Grootte;
    this.Prijs = Prijs;
    this.Publiek = Publiek;
    this.FacilityId = FacilityId;
    this.FacilityNaam = FacilityNaam;
  }

}
