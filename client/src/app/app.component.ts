import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './user/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { LocalMessageService } from './shared/local-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  isDesktopSidebarOpen = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private localMessageService: LocalMessageService
  ) {}

  ngOnInit() {
    this.localMessageService.toastMessage.subscribe((message) =>
      this.messageService.add(message)
    );
    this.authService.autoLogin();
  }

  toggleSidebar() {
    this.isDesktopSidebarOpen = !this.isDesktopSidebarOpen;
  }
}
