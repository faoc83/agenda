import { Injectable } from '@angular/core';
import { Http} from '@angular/http'
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private http: Http) { }
 
  getAllUsers() {
    return new Promise((resolve, reject) => {
        this.http.get(API_URL + '/api/user').pipe(map(res => res)).subscribe(res => {
            resolve(res);
     
          }, (err) => {
            reject(err);
          });
    });
  }

 /*  showBook(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/user/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveBook(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/book', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateBook(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/book/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteBook(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/book/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  } */

}
