import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AuthService } from "./user/auth/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MessageService } from "primeng/api";
import { LocalMessageService } from "./shared/local-message.service";

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private localMessageService: LocalMessageService
  ) {
  }

  loggedIn$: Observable<boolean> = this.authService.user.pipe(map(user => user.loggedIn));

  ngOnInit() {
    this.localMessageService.toastMessage.subscribe(message => this.messageService.add(message));
    this.authService.autoLogin();
  }

  toggleSidebar(){
    this.isDesktopSidebarOpen = !this.isDesktopSidebarOpen;
  }

}
