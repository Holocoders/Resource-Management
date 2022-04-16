import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from '../../user/auth/auth.service';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOutSidebar', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
          visibility: 'hidden',
          position: 'absolute',
        }),
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
    trigger('slideInOutNavbar', [
      state(
        'in',
        style({
          'margin-left': '0',
        }),
      ),
      state(
        'out',
        style({
          'margin-left': '20rem',
        }),
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  isDesktopSidebarOpen = false;
  isMobileSidebarOpen = false;
  isMobileSearchOpen = false;
  user: User | null = null;

  header = 'Facilities';

  searchResults = [];
  searchData: any;

  @Output() onMenuClick = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    private service: NavbarService,
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => (this.user = user));
    this.service.header.subscribe((header) => (this.header = header));
  }

  closeMobileSearch() {
    this.isMobileSearchOpen = false;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/user/signin');
  }

  search(event: any) {
    this.service.searchQuery(event.query).subscribe((results) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.searchResults = results;
      console.log(results);
    });
  }

  selectedNode() {
    this.closeMobileSearch();
    const name = this.searchData.name;
    const id = this.searchData._id['_id'];
    this.service.header.next(name);
    this.router.navigate(['/node'], { queryParams: { id } });
  }
}
