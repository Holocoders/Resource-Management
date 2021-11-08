import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor() {}


  @Output() onDialogClose = new EventEmitter();

  ngOnInit(): void {

  }

  closeDialog() {
    this.onDialogClose.emit({
      submit: false
    });
  }
}
