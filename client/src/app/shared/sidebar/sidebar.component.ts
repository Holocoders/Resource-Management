import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';
import { mergeMap, Observable, of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private navbarComponent: NavbarComponent,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.userService
      .currentUser()
      .pipe(mergeMap((result) => of((result.data as any).currentUser as User)));
  }

  closeSidebar() {
    this.navbarComponent.isMobileSidebarOpen = false;
  }
}
