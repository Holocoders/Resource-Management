import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Item } from './item.model';
import { ItemService } from './item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { subscribe } from 'graphql';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

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
  isLoading: boolean;
  displayPosition = false;
  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params.id),
        mergeMap((id) => this.itemService.getItemDetails(id))
      )
      .subscribe((result: any) => {
        this.isLoading = result.loading;
        this.item = result?.data?.item;
      });
  }

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  closeDialog(event: any) {
    if (!event.submit) {
      this.displayPosition = false;
      return;
    }
    this.itemService.addItem(event.data, event.file).subscribe((res: any) => {
      this.router.navigate(['/item'], {
        queryParams: { id: res.data.createItem._id._id },
      });
      this.displayPosition = false;
    });
  }
}
