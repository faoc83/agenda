import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
import { UserService } from '../user.service';
import { JSDocCommentStmt } from '../../../node_modules/@angular/compiler';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  isUserLoggedIn:true;
  calendarOptions: Options;
  displayEvent: any;
  todayEvents:any;
  contacts:any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(protected eventService: EventSesrvice, protected userService:UserService) { }

  ngOnInit() {
    this.eventService.getUserEvents().then((res) => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        selectable: true,
       events: res,
       
      };
    });

    this.userService.getAllUsers().then((res)=>{
      this.contacts=res;
    })


  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
   
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }



  newEvent(data) {

     console.log(JSON.stringify(data))
     
     this.eventService.createEvent(data).then((result) => {
     this.todayEvents.push(result);
      }, (err) => {
        console.log(err);
      });  
 }


}