import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn = false;
  constructor(
    private router: Router
  ) {}


  get isLoggedIn() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }

 
  login(){
      this.loggedIn = true;
      this.router.navigate(['/agenda']);
  }

  logout() {
    this.loggedIn=false;
    this.router.navigate(['/login']);
  }
}