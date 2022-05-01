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
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.scss'],
})
export class AddFacilityComponent implements OnChanges {
  @Output() onDialogClose = new EventEmitter();
  @Input() parent: string | null;
  @Input() facility?: any = null;

  file: any;
  addFacilityForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.facility && changes.facility.currentValue) {
      this.addFacilityForm.patchValue(changes.facility.currentValue);
      const response = await (
        await fetch(
          `http://localhost:3000/${changes.facility.currentValue.node._id}`,
        )
      ).blob();
      this.file = new File([response], 'image.jpg', {
        type: 'image/jpeg',
      });
    }
  }

  saveCategory() {
    if (!this.addFacilityForm.valid) {
      return;
    }
    const obj = this.addFacilityForm.value;
    obj.parent = this.parent;
    this.addFacilityForm.reset();
    this.addFacilityForm.clearValidators();
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
