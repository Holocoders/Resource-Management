import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {BreadcrumbsService} from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'};
  items: MenuItem[] = [];

  constructor(private service: BreadcrumbsService) {
  }

  ngOnInit(): void {
    this.service.items.subscribe((arr: MenuItem[]) => {
      this.items = arr;
      this.items = [...this.items];
    });
  }

  operation(event: any) {
    const item = event.item;
    if (item.routerLink != '/') {
      this.service.push(item);
    }
  }
}
