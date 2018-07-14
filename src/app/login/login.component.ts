import { AuthService } from './../services/auth.service';
import { AlertService } from '../services/alert.service';

import { UserService } from '../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup} from '@angular/forms';
import { IUser } from '../interface/IUser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
@Input() message='';


  constructor(private route: ActivatedRoute,private userService: UserService,
              private router: Router,private authService: AuthService,private alertService:AlertService) { }
  
  ngOnInit() {
  }
  

  /**
   * get data from login form and do login
   * @param data
   */
 doLogin(data) {
     this.userService.doLogin(data).then(u =>{
       
       this.authService.login();
      localStorage.setItem('userId', u.id);
     }).catch(e=> {
       this.alertService.error("Erro ao fazer login. Tente de novo");
       console.log("Error: "+e)
    })
 }





}
