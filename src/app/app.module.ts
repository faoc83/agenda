import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AgendaComponent } from './agenda/agenda.component';
import { EventSesrvice } from './agenda/event.service';
import { FullCalendarModule } from 'ng-fullcalendar';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'agenda', component: AgendaComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FullCalendarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, EventSesrvice, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
