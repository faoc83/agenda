import { AlertService } from '../services/alert.service';
import { IEvent } from '../interface/IEvent';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from '../services/event.service';
import { UserService } from '../services/user.service';


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
  eventId = null;
  @Input() allDay = false;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(protected eventService: EventSesrvice, protected userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

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
    }).catch(e => {
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
    this.startDateT =model.event.allDay?'': model.event.start.format("hh:mm");
    this.endDate =model.event.allDay?'': model.event.end.format('YYYY-MM-DD');
    this.endDateT = model.event.allDay?'':model.event.end.format("hh:mm");
    this.eventId = model.event._id;
    this.allDay=model.event.allDay

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
    this.eventId = null;
    this.allDay=false;
  }


  /**
   * create new event
   * @param data 
   */
  onSubmitEvent(data) {
    try {
      let initDate;
      let endDate;
      
      if (data.startDateT && data.startDateT != '') {
       
        initDate = data.startDate + 'T' + data.startDateT;
        endDate = data.endDate + 'T' + data.endDateT;
      } else {
        console.log("entra data ok n ok")
        initDate = data.startDate;
        endDate ='';
        this.allDay = true
      }

      if (new Date(initDate) > new Date(endDate)) {
        throw 'End Date must be after Initial Date!'
      }

      const eventObj: IEvent = {
        title: data.title,
        start: initDate,
        end: endDate,
        userId: this.userId,
        allDay: this.allDay
      }

      if(this.eventId){
        this.editEvent(this.eventId,eventObj)
      }else{
        this.createNewEvent(eventObj)
      }
    } catch (error) {
      this.alertService.error(error)
    }

  }


  createNewEvent(eventObj){
    console.log('create new event')
    this.eventService.createEvent(eventObj).then((result) => {
      this.alertService.success('Event ' + eventObj.title + ' created!')
      this.loadEvents();
      this.cancelEditEvent();
    }, (err) => {
      this.alertService.error("Error creating Event!")
      console.log(err);
    });
  }

  editEvent(eventId,eventObj){
    console.log('edit event')
    this.eventService.updateEvent(eventId,eventObj).then((result) => {
      this.alertService.success('Event ' + eventObj.title + ' edited!')
      this.loadEvents();
      this.cancelEditEvent();
    }, (err) => {
      this.alertService.error("Error creating Event!")
      console.log(err);
    });
  }

  /**
   * delete event;
   */
  deleteEvent() {
    this.eventService.deleteEvent(this.eventId).then(res => {
      this.alertService.success("Event deleted!")
      this.cancelEditEvent();
      this.loadEvents();
    }).catch(e => {
      this.alertService.error("Error deleting Event!")
    })
  }

}