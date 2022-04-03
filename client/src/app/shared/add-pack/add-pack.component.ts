import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/item/item.service';

@Component({
  selector: 'app-add-pack',
  templateUrl: './add-pack.component.html',
  styleUrls: ['./add-pack.component.scss'],
})
export class AddPackComponent implements OnChanges, OnInit {
  @Output() onDialogClose = new EventEmitter();
  @Input() parent: string;
  @Input() item?: any = null;

  file: any;
  items: any[];
  packItems: any[];
  addPackForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    quantity: new FormControl(0, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    packItems: new FormControl([]),
    allowedItemActivities: new FormControl([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
  ) {}

  ngOnInit() {
    this.itemService.getAllItems().subscribe((response) => {
      const packItems: any[] = [];
      this.items = (response?.data as any).items.map((item: any) => {
        const items = this.packItems;
        const itemIdx = items.findIndex(
          (val: any) => val.item.node._id === item.node._id,
        );
        let packItem;
        if (itemIdx === -1) {
          packItem = {
            item,
            quantity: 0,
          };
        } else {
          packItem = {
            item,
            quantity: items[itemIdx].quantity,
          };
          packItems.push(packItem);
        }
        return packItem;
      });
      this.addPackForm.patchValue({
        packItems: packItems,
      });
    });
  }

  onQuantityChange(item: any, event: any) {
    const items = this.addPackForm.value['packItems'];
    const itemIdx = items.findIndex((val: any) => val.item === item.item);
    if (itemIdx === -1) return;
    items[itemIdx].quantity = parseFloat(event.target.value);
    this.addPackForm.patchValue({ packItems: items });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.item && changes.item.currentValue) {
      this.addPackForm.patchValue(changes.item.currentValue);
      this.packItems = changes.item.currentValue.packItems;
      if (changes.item.currentValue.allowedItemActivities == 'BOTH') {
        this.addPackForm.patchValue({
          allowedItemActivities: ['BUY', 'RENT'],
        });
      } else {
        this.addPackForm.patchValue({
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

  savePack() {
    let activity = 'BOTH';
    if (!this.addPackForm.valid) {
      return;
    }
    if (this.addPackForm.value['allowedItemActivities'].length === 1) {
      activity = this.addPackForm.value['allowedItemActivities'][0];
    }
    const itemObj = this.addPackForm.value;
    itemObj.packItems = itemObj.packItems.map((item: any) => {
      return {
        item: item.item.node._id,
        quantity: item.quantity,
      };
    });
    itemObj.parent = this.parent;
    itemObj.allowedItemActivities = activity;
    this.addPackForm.reset();
    this.addPackForm.clearValidators();
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
