import { AuthService } from './services/auth.service';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AgendaComponent } from './agenda/agenda.component';
import { EventSesrvice } from './services/event.service';
import { FullCalendarModule } from 'ng-fullcalendar';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './services/authguard.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard]},
  { path: '*', component:LoginComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendaComponent,
    HeaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
   UserService, AuthService,AlertService, AuthGuard,EventSesrvice, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
