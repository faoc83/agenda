import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot) {
    
    return this.authService.isLoggedIn.then((isLoggedIn)=>{
      if (!isLoggedIn){
    
        return false;
      }
      return true;
    });
    }
}
