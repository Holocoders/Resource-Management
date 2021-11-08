import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Output() onDialogClose = new EventEmitter();
  file: any;

  addItemForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    quantity: new FormControl(0, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    parent: new FormControl('6188e9003c7fe446189a1aba'),
  });

  ngOnInit(): void {}

  saveItem() {
    this.onDialogClose.emit({
      submit: true,
      data: this.addItemForm.value,
      file: this.file,
    });
  }

  closeDialog() {
    this.onDialogClose.emit({
      submit: false,
    });
  }
}
