import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from './item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  activities: any[] = [
    {
      name: 'Luigi',
      image: 'https://bityl.co/9Reu',
      activity: 'rented',
      quantity: 10,
      severity: 'warning',
      activityDate: '6 Oct 2021',
      dueDate: '14 Oct 2021',
    },
    {
      name: 'Toad',
      image: 'https://bityl.co/9Reu',
      activity: 'added',
      quantity: 4,
      severity: 'success',
      activityDate: '2 Oct 2021',
      dueDate: '14 Oct 2021',
    },
    {
      name: 'Pauline',
      image: 'https://bityl.co/9Reu',
      activity: 'overdue',
      quantity: 5,
      severity: 'danger',
      rentedDate: '28 Oct 2021',
      dueDate: '4 Oct 2021',
    },
    {
      name: 'Pauline',
      image: 'https://bityl.co/9Reu',
      activity: 'overdue',
      quantity: 5,
      severity: 'danger',
      rentedDate: '28 Oct 2021',
      dueDate: '4 Oct 2021',
    },
    {
      name: 'Pauline',
      image: 'https://bityl.co/9Reu',
      activity: 'overdue',
      quantity: 5,
      severity: 'danger',
      rentedDate: '28 Oct 2021',
      dueDate: '4 Oct 2021',
    },
    {
      name: 'Pauline',
      image: 'https://bityl.co/9Reu',
      activity: 'overdue',
      quantity: 5,
      severity: 'danger',
      rentedDate: '28 Oct 2021',
      dueDate: '4 Oct 2021',
    },
    {
      name: 'Pauline',
      image: 'https://bityl.co/9Reu',
      activity: 'overdue',
      quantity: 5,
      severity: 'danger',
      rentedDate: '28 Oct 2021',
      dueDate: '4 Oct 2021',
    },
    {
      name: 'Pauline',
      image: 'https://bityl.co/9Reu',
      activity: 'overdue',
      quantity: 5,
      severity: 'danger',
      rentedDate: '28 Oct 2021',
      dueDate: '4 Oct 2021',
    },
  ];
  item: Item;
  inventoryHistory: any[] = [];
  isLoading: boolean;

  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params.id),
        mergeMap((id) => this.itemService.getItemDetails(id)),
        mergeMap((result: any) => {
          this.item = result?.data?.item;
          return this.itemService.inventoryHistoryByItem(this.item.node._id);
        })
      )
      .subscribe((result: any) => {
        this.isLoading = result.loading;
        this.inventoryHistory = result?.data?.inventoryHistoryByItem;
        this.inventoryHistory = [...this.inventoryHistory];
      });
  }

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }
}
