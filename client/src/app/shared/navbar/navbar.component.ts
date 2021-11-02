import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOutSidebar', [
      state('in', style({
        transform: 'translateX(0)',
        'visibility': 'visible'
      })),
      state('out', style({
        transform: 'translateX(-100%)',
        'visibility': 'hidden',
        'position': 'absolute'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOutNavbar', [
      state('in', style({
        'margin-left': '0'
      })),
      state('out', style({
        'margin-left': '20rem'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class NavbarComponent implements OnInit {
  isDesktopSidebarOpen: boolean = false;
  isMobileSidebarOpen: boolean = false;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.isMobileSidebarOpen) this.isMobileSidebarOpen = false;
  }

  @Output() onMenuClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
