import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
import { UserService } from '../user.service';
import { JSDocCommentStmt } from '@angular/compiler';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  events = null;
@Input() message='';
title='';
startDate:any;
endDate:any;
show: boolean = false;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(protected eventService: EventSesrvice, protected userService:UserService) { }

  ngOnInit() {
    
    this.eventService.getUserEvents().then((res) => {
    this.calendarOptions = {
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,listMonth'
      },
      selectable: true,
      events: res
     
    };
  });
  }

 
  clickButton(model: any) {
    this.displayEvent = model;
  }


  eventClick(model: any) {
    this.show=true;
  this.title=model.event.title
    this.startDate=model.event.start._i
    this.endDate=model.event.end._i
    model = {
      event: {
        id: model.event._id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
      }
    }
    this.displayEvent = model;
  }

  newEvent(data) {   
     this.eventService.createEvent(data).then((result) => {
        this.message='Evento criado com sucesso';
       
      }, (err) => {
        this.message="Erro ao criar evento";
        console.log(err);
      });  
 }


 deleteEvent(data){
this.eventService.deleteEvent(data).then(res=>{
  this.message='Evento apagado com sucesso';
}).catch(e=>{
  this.message='Erro ao apagar evento';
})
 }

}