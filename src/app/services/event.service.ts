import { IEvent } from '../interface/IEvent';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class EventSesrvice {

  constructor(private http: Http) { }

  /**
   * load user events list;
   * @param userId 
   */
  getUserEvents(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL + '/api/user/events/' + userId).pipe(map(res => res.json())).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  /**
   * create new event
   * @param data 
   */
  createEvent(data) {
    return new Promise((resolve, reject) => {
      this.http.post(API_URL + '/api/event/create', data).pipe(map(res => res.json())).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  /**
   * delete event by id;
   */
  deleteEvent(eventId) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL + '/api/event/delete/' + eventId).pipe(map(res => res)).subscribe(res => {
          
          resolve(res);
        }, (err) => {
   
          reject(err);
        });
    });
  }


  /**
   * update event
   * @param eventId 
   */
  updateEvent(eventId,data) {
    return new Promise((resolve, reject) => {
      this.http.put(API_URL + '/api/event/update/' + eventId,data)
        .pipe().subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
};
