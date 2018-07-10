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

  
  getUsersList() {
    this.userService.getAllUsers().then((res) => {
      this.users = res;
    })
  }

  doLogin(data) {
    if (true) {
      sessionStorage.setItem('userId','5b43d7d6f844183ef00480fd')
      this.router.navigate(['/agenda']);
    }
   // alert("Entered Email id : " + data.username);
 }

}
