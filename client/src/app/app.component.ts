import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { NavbarComponent } from "./shared/navbar/navbar.component";

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
export class AppComponent {
  title = 'client';
  isDesktopSidebarOpen: boolean = false;
  constructor(public navbar: NavbarComponent) {
  }

  test(){
    this.isDesktopSidebarOpen = !this.isDesktopSidebarOpen;
  }

}
