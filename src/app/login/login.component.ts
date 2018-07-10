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
  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit() {
    this.getUsersList();
  }

  
  getUsersList() {
    this.userService.getAllUsers().then((res) => {
      this.users = res;
    })
  }

  doLogin(data) {
    if (true) {
      this.router.navigate(['/agenda']);
    }
   // alert("Entered Email id : " + data.username);
 }

}
