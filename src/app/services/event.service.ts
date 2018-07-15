import { IEvent } from '../interface/IEvent';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';
const API_URL = environment.apiUrl;

@Injectable()
export class EventSesrvice {

  constructor(private http: Http) { }

  /**
   * Given UserId, load user events list;
   * @param userId 
   */
  getUserEvents(userId): Observable<any> {
     return this.http.get(API_URL + '/api/events/user/' + userId).pipe(map(res => res.json()))
  }


  getUserFriends(userId): Observable<any> {
    return this.http.get(API_URL + '/api/user/friends/'+userId).pipe(map(res => res.json()))
  }
  


  /**
   * create new event
   * @param data 
   */
  createEvent(data): Observable<any> {
    return  this.http.post(API_URL + '/api/event/create', data).pipe(map(res => res.json()));
  }


  /**
   * Given Event Id, delete the Event.
   * @param eventId 
   */
  deleteEvent(eventId): Observable<any> { 
      return this.http.delete(API_URL + '/api/event/delete/' + eventId).pipe(map(res => res));
  }


  /**
   * given Event Id, update event
   * @param eventId 
   */
  updateEvent(eventId,data): Observable<any> {
    return this.http.put(API_URL + '/api/event/update/' + eventId,data).pipe(map(res => res)) 
 
  }
};
