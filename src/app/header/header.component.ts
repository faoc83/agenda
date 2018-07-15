import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()username = null;
  title = 'Cocus Agenda';
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  doLogout(){
    this.authService.logout();
    
  }

}
