import { IEvent } from '../interface/IEvent';
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
  @Input() message = '';
  title = '';
  startDate: any;
  startDateT: any;
  endDate: any;
  endDateT: any;
  show: boolean = false;
  events: any;
  userId = null;
  eventId=null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(protected eventService: EventSesrvice, protected userService: UserService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
   
    this.eventService.getUserEvents(this.userId).then((res) => {
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

  loadEvents() {
    this.eventService.getUserEvents(this.userId).then((res) => {
      this.events = res;
      console.log(JSON.stringify(this.events))
    }).catch(e=>{
      console.log("Error loading event data.")
    });
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }


  /**
   * obtem dados do evento selecionado no calendario.
   * Faz set das variaveis por forma a preencher o formulario de edicao.
   * @param model
   */
  eventClick(model: any) {
    this.show = true;
    this.title = model.event.title
    this.startDate = model.event.start.format('YYYY-MM-DD');
    this.startDateT = model.event.start.format("hh:mm");
    this.endDate = model.event.end.format('YYYY-MM-DD');
    this.endDateT = model.event.end.format("hh:mm");
    this.eventId=model.event._id;
    
  }

  /**
   * Empty form fields and hide buttons
   */
  cancelEditEvent() {
    this.show = false;
    this.title = ''
    this.startDate = '';
    this.startDateT = '';
    this.endDate = '';
    this.endDateT = '';
    this.eventId=null;
  }


  /**
   * create new event
   * @param data 
   */
  newEvent(data) {

    const ievent: IEvent = {
      title: data.title,
      start: data.startDate + 'T' + data.startDateT,
      end: data.endDate + 'T' + data.endDateT,
      userId: this.userId
    }

    this.eventService.createEvent(ievent).then((result) => {
      this.message = 'Evento criado com sucesso';
      this.loadEvents();
    }, (err) => {
      this.message = "Error creating Event!";
      console.log(err);
    });
  }


  updateEvent(data) {
      this.eventService.updateEvent(this.eventId).then(res => {
      this.message = 'Event successfully updated!';
      
      this.cancelEditEvent();
      this.loadEvents();
    }).catch(e => {
      this.message = 'Error deleting event!';
    })
  }




  /**
   * delete event;
   */
  deleteEvent() {
    this.eventService.deleteEvent(this.eventId).then(res => {
      this.message = 'Event successfully deleted!';
      
      this.cancelEditEvent();
      this.loadEvents();
    }).catch(e => {
      this.message = 'Error deleting event!';
    })
  }

}