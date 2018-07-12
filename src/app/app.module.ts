//import { AuthService } from './auth.service';

import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AgendaComponent } from './agenda/agenda.component';
import { EventSesrvice } from './agenda/event.service';
import { FullCalendarModule } from 'ng-fullcalendar';
import { HeaderComponent } from './header/header.component';
//import { AuthGuard } from './authguard.service';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  //{ path: 'agenda', component: AgendaComponent,canActivate: [AuthGuard]},
  { path: 'agenda', component: AgendaComponent},
  { path: '**', redirectTo: '' }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendaComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,EventSesrvice, {provide: LocationStrategy, useClass: HashLocationStrategy}],

   // UserService, AuthService, AuthGuard,EventSesrvice, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
