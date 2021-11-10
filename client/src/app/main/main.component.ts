import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthService } from '../user/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [NavbarComponent],
  animations: [
    trigger('slideInOutContent', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          'margin-left': '0',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(0)',
          'margin-left': '20rem',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class MainComponent implements OnInit {
  title = 'client';
  isDesktopSidebarOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  toggleSidebar() {
    this.isDesktopSidebarOpen = !this.isDesktopSidebarOpen;
  }
}
