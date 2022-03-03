import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnChanges {
  @Output() onDialogClose = new EventEmitter();
  @Input() parent: string;
  @Input() category?: any = null;

  file: any;
  addCategoryForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.category && changes.category.currentValue) {
      this.addCategoryForm.patchValue(changes.category.currentValue);
      const response = await (
        await fetch(
          `http://localhost:3000/${changes.category.currentValue.node._id}`,
        )
      ).blob();
      this.file = new File([response], 'image.jpg', {
        type: 'image/jpeg',
      });
    }
  }

  saveCategory() {
    if (!this.addCategoryForm.valid) {
      return;
    }
    const obj = this.addCategoryForm.value;
    obj.parent = this.parent;
    this.addCategoryForm.reset();
    this.addCategoryForm.clearValidators();
    this.onDialogClose.emit({
      submit: true,
      data: obj,
      file: this.file,
    });
  }

  closeDialog() {
    this.onDialogClose.emit({
      submit: false,
    });
  }
}
