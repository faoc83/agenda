import { AuthService } from './../services/auth.service';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading=false;
  @Input() message = '';


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService,
    private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  /**
   * get data from login form and do login
   * @param data
   */
  doLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.doLogin(this.f.username.value, this.f.password.value).subscribe(u => {
      this.authService.login();
      localStorage.setItem('userId', u.id);
      localStorage.setItem('username', u.username);
    }, err => {
       this.alertService.error(err);
      this.loading = false;
      console.log("Error: " + err)
    });

  }
}
