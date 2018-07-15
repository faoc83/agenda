import { Injectable } from '@angular/core';
import { Http} from '@angular/http'
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../interface/IUser';
import { Observable } from '../../../node_modules/rxjs';
const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private http: Http) { }
 

  doLogin(username,password): Observable<any> {
    return this.http.post(API_URL + '/api/user/login',{ username: username, password: password })
      .pipe(map(res => {     
        const u= res.json()
       
        const iuser: IUser = {
          id:u._id,
          name:u.name,
          username:u.username
        };
        return iuser
      })
      );
  }
 
}
