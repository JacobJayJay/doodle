import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {MeetingService} from './services/meeting.service';
import { MeetingComponent } from './components/meeting/meeting.component';
import {routing} from "./app.routing";
import {ODataConfiguration, ODataServiceFactory} from "angular2-odata";
import {MeetingroomService} from "./services/meetingroom.service";
import {MeetingdatumService} from "./services/meetingdatum.service";
import { MeetingdatumComponent } from './components/meetingdatum/meetingdatum.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MeetinguserService} from "./services/meetinguser.service";
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    MeetingdatumComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule,
    routing
  ],
  providers: [MeetingService, MeetingroomService, MeetingdatumService, MeetinguserService, ODataConfiguration, ODataServiceFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
