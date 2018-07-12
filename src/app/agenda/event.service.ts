import { IEvent } from './IEvent';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http'
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class EventSesrvice {

    constructor(private http: Http) { }
  
    getEvents() {
        return new Promise((resolve, reject) => {
            this.http.get(API_URL + '/api/event').pipe(map(res => res.json())).subscribe(res => {
            console.log(res)
            const data: any = res
                resolve(res);
             
              }, (err) => {
                reject(err);
              });
        });
      }

      getUserEvents() {
        var userId = "5b47c63680b3d45c5c971c01";
        return new Promise((resolve, reject) => {
            this.http.get(API_URL + '/api/user/events/'+userId).pipe(map(res => res.json())).subscribe(res => {
              console.log("eventos: "+JSON.stringify(res))
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }


      createEvent(data) {        

          var ievent:IEvent = { 
            title:data.title,
            start:data.startDate,
            end:data.endDate,
            userId: "5b47c63680b3d45c5c971c01"
         } 

    
        return new Promise((resolve, reject) => {
            this.http.post(API_URL + '/api/event/create',ievent).pipe(map(res => res.json())).subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }


      deleteEvent(eventId){
        console.log("-----"+eventId)
        return new Promise((resolve, reject) => {
            this.http.delete(API_URL + '/api/event/delete/'+eventId)
              .pipe(map(res => res.json()))
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }
};
