import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  constructor() {}

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

  ngOnInit(): void {}

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }
}
