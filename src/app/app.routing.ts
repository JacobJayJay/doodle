import {RouterModule, Routes} from "@angular/router";
import {MeetingComponent} from "./components/meeting/meeting.component";
import {HomeComponent} from "./components/home/home.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'meeting/:id', component: MeetingComponent}
]

export const routing = RouterModule.forRoot(APP_ROUTES);
