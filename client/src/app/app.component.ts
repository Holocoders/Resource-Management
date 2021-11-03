import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AuthService } from "./user/auth/auth.service";
import { Router } from "@angular/router";
import { User } from "./user/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NavbarComponent],
  animations: [
  trigger('slideInOutContent', [
    state('in', style({
      transform: 'translateX(0)',
      'margin-left': '0'
    })),
    state('out', style({
      transform: 'translateX(0)',
      'margin-left': '20rem'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]),
]
})
export class AppComponent implements OnInit{
  title = 'client';
  isDesktopSidebarOpen: boolean = false;
  user: User = new User();
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    const loggedIn = this.authService.autoLogin();
    if (loggedIn) {
      this.router.navigateByUrl("/facilities");
    } else {
      this.router.navigateByUrl("/user/login");
    }
  }

  toggleSidebar(){
    this.isDesktopSidebarOpen = !this.isDesktopSidebarOpen;
  }

}
