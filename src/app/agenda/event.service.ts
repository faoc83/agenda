import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http} from '@angular/http';
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
        var userId = "5b45e33a673c3612a493aa02";
        return new Promise((resolve, reject) => {
            this.http.get(API_URL + '/api/user/events/'+userId).pipe(map(res => res.json())).subscribe(res => {
              console.log("eventos: "+JSON.stringify(res))
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }

      getUserTodayEvents() {
        var userId = "5b45e33a673c3612a493aa02";
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + ("0" + (dateObj.getUTCMonth() + 1)).slice(-2)
                            + '-' + ("0" + dateObj.getDate()).slice(-2);

        return new Promise((resolve, reject) => {
            this.http.get(API_URL + '/api/event/todayEventByUser/'+ userId +'/'+ yearMonth).pipe(map(res => res.json())).subscribe(res => {
                resolve(res);
                const data: any = res
              }, (err) => {
                reject(err);
              });
        });
      }

      createEvent(data) {
  
        const ev = {title: 'small',
    start:'2018-07-10T10:00',
    endDate:'2018-07-10T11:00'};

         
        return new Promise((resolve, reject) => {
            this.http.post(API_URL + '/api/event/create', data)
              .pipe(map(res => res.json()))
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
      }
    
    


       /* 
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

     const data: any = [{
            title: 'All Day Event',
            start: yearMonth + '-01'
        },
        {
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-16T16:00:00'
        },
        {
            title: 'Conference',
            start: yearMonth + '-11',
            end: yearMonth + '-13'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T10:30:00',
            end: yearMonth + '-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: yearMonth + '-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T14:30:00'
        },
        {
            title: 'Happy Hour',
            start: yearMonth + '-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: yearMonth + '-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: yearMonth + '-13T07:00:00'
        }];
        return of(data); 
    }*/
};
