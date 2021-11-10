import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  header = new BehaviorSubject<string>("Facilities");

  constructor() { }
}
