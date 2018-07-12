
import { UserService } from '../user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup} from '@angular/forms';
//import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
@Input() message='';

  constructor(private route: ActivatedRoute,private userService: UserService,
              private router: Router) { }
  
  ngOnInit() {
  }
  

  /**
   * get data from login form and do login
   * @param data
   */
 doLogin(data) {
  sessionStorage.setItem('userId','5b47c63680b3d45c5c971c01');
    //  this.userService.doLogin(data).then(u => {
    //   // sessionStorage.setItem('userId',u);
    //    this.authService.login();
    //  }).catch(e=> {
    //    this.message="Erro ao fazer login. Tente de novo"
    //    console.log("Error: "+e)
    // })
 }





}
