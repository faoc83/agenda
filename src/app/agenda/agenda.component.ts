import { AlertService } from '../services/alert.service';
import { IEvent } from '../interface/IEvent';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from '../services/event.service';
import { UserService } from '../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

/**
 * AgendaComponent where the main goals are obtain a list of events for logged user and
 * fill the calendar with these events. 
 * Is possible as well, do all the crud events operations.
 */
export class AgendaComponent implements OnInit {
  calendarOptions: Options;
  friendsList = [];
  eventUsers: any;
  title = '';
  description= '';
  startDate: any;
  startDateT: any;
  timeS: any;
  timeE: any;
  dateS: any;
  dateE: any;
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
    this.eventService.getUserEvents(this.userId).subscribe(uEvents => {
      this.calendarOptions = {
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,listMonth'
        },
        selectable: true,
        events: uEvents
      };
    });

    this.loadContacts();

  }


  /**
   * get all other users
   */
  loadContacts() {
    this.eventService.getUserFriends(this.userId).subscribe(uList => {
      for (var key in uList) {
        var u = {
          id: uList[key]._id,
          name: uList[key].username,
          checked: false
        }
        this.friendsList.push(u);
      }
    }, err => {
      this.alertService.error(err);
      console.log("Error: " + err)
    });

  }

  /**
   * get all events from loged user
   */
  loadEvents() {
    this.eventService.getUserEvents(this.userId).subscribe(events => {
      this.events = events;
    }, err => {
      this.alertService.error(err);
      console.log("Error loading event data.")
    });
  }


  /**
   * get the event click in calendar and obtain all the data of this event.
   * @param model
   */
  eventClick(eventData: any) {
    try {
      for (var f in this.friendsList) {
        this.friendsList[f].checked = false
      } 
      this.show = true;
      this.title = eventData.event.title
      this.description=eventData.event.description
      this.dateS = { year: eventData.event.start.year(), month: eventData.event.start.month() +1, day: eventData.event.start.date() };
      this.timeS = eventData.event.allDay ? '' : { hour: eventData.event.start.hours(), minute: eventData.event.start.minutes() };
      this.dateE = eventData.event.allDay ? '' : { year: eventData.event.end.year(), month: eventData.event.end.month()+1, day: eventData.event.end.date() };
      this.timeE = eventData.event.allDay ? '' : { hour: eventData.event.end.hours(), minute: eventData.event.end.minutes() };
      this.eventId = eventData.event._id;
      this.allDay = eventData.event.allDay;
      this.eventUsers = eventData.event.user;
      if (eventData.event.user) {
        const uEvents = eventData.event.user
        for (var e in uEvents) {
          for (var f in this.friendsList) {
            if (uEvents[e] === this.friendsList[f].id) {
              this.friendsList[f].checked = true
            }
          }
        }
      }

    } catch (error) {
      this.alertService.error(error)
    }

  }

  /**
   * change event of friends checkbox;
   * @param i 
   */
  changeInviteFriends(i) {
    this.friendsList[i].checked ? this.friendsList[i].checked = false : this.friendsList[i].checked = true
  }
  /**
   * 
   * create new event
   * @param data 
   */
  onSubmitEvent(data) {
    try {
      let initDate;
      let endDate;
   
      if (!data.timeS) {    
        initDate = this.setDateString(data.dateS,null, false);
        endDate = '';
        this.allDay = true    
      } else { 
        initDate = this.setDateString(data.dateS, data.timeS,true)
        endDate = this.setDateString(data.dateE, data.timeE,true)
      }


      if (new Date(initDate) > new Date(endDate)) {
        throw 'End Date must be after Initial Date!'
      }

      var checkedUsers = this.friendsList.filter(function (friends) {
        if (friends.checked)
          return friends.id
      });

      const eventObj: IEvent = {
        title: data.title,
        description:data.description,
        start: initDate,
        end: endDate,
        userId: this.userId,
        allDay: this.allDay,
        users: checkedUsers.map((cUser) => cUser.id)
        
      }

      this.allDay = false
      if (this.eventId) {
          this.editEvent(this.eventId, eventObj)
      } else {
          this.createNewEvent(eventObj)
      }
    } catch (error) {
      this.alertService.error(error)
    }

  }


  /**
   * create new Event
   * @param eventObj 
   */
  createNewEvent(eventObj) {

    this.eventService.createEvent(eventObj).subscribe(event => {
      this.alertService.success('Event ' + eventObj.title + ' created!')
      this.loadEvents();
      this.cancelEditEvent();
    }, (err) => {
      this.alertService.error("Error creating Event!")
      console.log(err);
    });
  }

  /**
   * edit event
   * @param eventId 
   * @param eventObj 
   */
  editEvent(eventId, eventObj) {
 
    this.eventService.updateEvent(eventId, eventObj).subscribe(event => {
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
    this.eventService.deleteEvent(this.eventId).subscribe(events => {
      this.alertService.success("Event deleted!")
      this.cancelEditEvent();
      this.loadEvents();
    }, err => {
      this.alertService.error("Error deleting Event!")
    });

  }

  /**
 * Empty form fields and hide buttons
 */
  cancelEditEvent() {

    this.show = false;
    this.title = '';
    this.description='';
    this.startDate = '';
    this.startDateT = '';
    this.endDate = '';
    this.endDateT = '';
    this.eventId = '';
    this.allDay = false;
    this.dateS = {}
    this.dateE = {}
    this.timeS = {}
    this.timeE = {}
    for (var f in this.friendsList) {
      this.friendsList[f].checked = false
    }
  }

  /**
   * 
   * @param jsonDate 
   * @param jsonTime 
   * @param d 
   */
  setDateString(jsonDate,jsonTime, d) {
    let str, dateObj
   if (d) {
    str= jsonDate.year+"-"+ ((jsonDate.month < 10 ? '0' : '') + jsonDate.month)+"-"+((jsonDate.day < 10 ? '0' : '') + jsonDate.day)+" "+((jsonTime.hour < 10 ? '0' : '') + jsonTime.hour)+":"+((jsonTime.minute < 10 ? '0' : '') + jsonTime.minute)

      dateObj= moment(str).zone('+0100').format("YYYY-MM-DD HH:mm")
  
     } else {
      str= jsonDate.year+"-"+ ((jsonDate.month < 10 ? '0' : '') + jsonDate.month)+"-"+((jsonDate.day < 10 ? '0' : '') + jsonDate.day)

      dateObj= moment(str).zone('+0100').format("YYYY-MM-DD")

    }    

    return dateObj
  }
 

}