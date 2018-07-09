import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
users:any;
  constructor(private userService: UserService) { }
  ngOnInit() {
    console.log("entra")
    this.getUsersList();
  }

  
  getUsersList() {
    this.userService.getAllUsers().then((res) => {
      this.users = res;
      console.log("--------------Z"+this.users);
    }, (err) => {
      console.log("erro-----Z"+err);
    });
  }

}
