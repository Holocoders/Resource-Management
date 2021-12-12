import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../user/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user: any;

  constructor(
    private navbarComponent: NavbarComponent,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  closeSidebar() {
    this.navbarComponent.isMobileSidebarOpen = false;
  }
}
