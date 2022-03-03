import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnChanges {
  @Output() onDialogClose = new EventEmitter();
  @Input() parent: string;
  @Input() item?: any = null;

  file: any;
  addItemForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    quantity: new FormControl(0, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    allowedItemActivities: new FormControl([]),
  });

  constructor(private formBuilder: FormBuilder) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.item && changes.item.currentValue) {
      this.addItemForm.patchValue(changes.item.currentValue);
      if (changes.item.currentValue.allowedItemActivities == 'BOTH') {
        this.addItemForm.patchValue({
          allowedItemActivities: ['BUY', 'RENT'],
        });
      } else {
        this.addItemForm.patchValue({
          allowedItemActivities: [
            changes.item.currentValue.allowedItemActivities,
          ],
        });
      }
      const response = await (
        await fetch(
          `http://localhost:3000/${changes.item.currentValue.node._id}`,
        )
      ).blob();
      this.file = new File([response], 'image.jpg', {
        type: 'image/jpeg',
      });
    }
  }

  saveItem() {
    let activity = 'BOTH';
    if (!this.addItemForm.valid) {
      return;
    }
    if (this.addItemForm.value['allowedItemActivities'].length === 1) {
      activity = this.addItemForm.value['allowedItemActivities'][0];
    }
    const itemObj = this.addItemForm.value;
    itemObj.parent = this.parent;
    itemObj.allowedItemActivities = activity;
    this.addItemForm.reset();
    this.addItemForm.clearValidators();
    this.onDialogClose.emit({
      submit: true,
      data: itemObj,
      file: this.file,
    });
  }

  closeDialog() {
    this.onDialogClose.emit({
      submit: false,
    });
  }
}
