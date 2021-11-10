import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  items = new BehaviorSubject<MenuItem[]>([]);

  push(obj: MenuItem) {
    const arr = this.oper(obj.label);
    arr.push(obj);
    this.items.next(arr);
  }

  popAll() {
    this.items.next([]);
  }

  oper(label: any) {
    const arr = this.items.getValue();
    const ind = arr.findIndex((obj) => obj.label == label);
    if (ind != -1) {
      arr.splice(ind, arr.length - ind);
    }
    return arr;
  }
}
