import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private navbarComponent: NavbarComponent) {}

  ngOnInit(): void {}

  closeSidebar() {
    this.navbarComponent.isMobileSidebarOpen = false;
  }
}
