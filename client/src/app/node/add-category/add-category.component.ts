import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) {}


  @Output() onDialogClose = new EventEmitter();
  @Input() parent: string;
  file: any;

  addCategoryForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  })

  ngOnInit(): void {

  }

  saveCategory() {
    const obj = this.addCategoryForm.value;
    obj.parent = this.parent;
    this.onDialogClose.emit({
      submit: true,
      data: obj,
      file: this.file
    })
  }

  closeDialog() {
    this.onDialogClose.emit({
      submit: false
    });
  }
}
