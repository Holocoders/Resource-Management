import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LocalMessageService {
  toastMessage = new BehaviorSubject<Message>({});

  constructor() {}

  addToastMessage(message: Message) {
    this.toastMessage.next(message);
  }
}
