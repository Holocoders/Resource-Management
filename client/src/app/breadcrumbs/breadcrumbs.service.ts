import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { NavbarService } from '../shared/navbar/navbar.service';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  items = new BehaviorSubject<MenuItem[]>([]);

  constructor(private navBarService: NavbarService) {}

  push(obj: MenuItem) {
    if (obj.label != null) {
      this.navBarService.header.next(obj.label);
    }
    const arr = this.oper(obj.queryParams?.id);
    arr.push(obj);
    this.items.next(arr);
  }

  popAll() {
    this.items.next([]);
  }

  oper(id: any) {
    const arr = this.items.getValue();
    const ind = arr.findIndex((obj) => obj.queryParams?.id == id);
    if (ind != -1) {
      arr.splice(ind, arr.length - ind);
    }
    return arr;
  }
}
