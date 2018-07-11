import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
users:any;
isUserLoggedIn:false;
  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit() {
    this.getUsersList();
  }

  /**
   * load users
   */
  getUsersList() {
    this.userService.getAllUsers().then((res) => {
      this.users = res;
    });
  }

  /**
   * get data from login form and do login
   * @param data 
   */
  doLogin(data) {
    this.userService.doLogin(data).then(id => {
      sessionStorage.setItem('userId',id.toString());

    }).catch(e=> {
      console.log("Error: "+e)
    })

 }

}
