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
  @Input() pack?: any = null;

  file: any;
  allItems: any[] = [];
  curItems: any[] = [];
  originalPackPrice: number;
  maxQty: number = Number.MAX_SAFE_INTEGER;
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
    this.addPackForm.get('packItems')?.valueChanges.subscribe((items: any) => {
      this.maxQty = Number.MAX_SAFE_INTEGER;
      this.originalPackPrice = 0;
      if (!items) {
        return;
      }
      for (const item of items) {
        this.originalPackPrice += item.price * item.packQty;
        const maxItemQty = item.totQty / item.packQty;
        if (maxItemQty < this.maxQty) {
          this.maxQty = maxItemQty;
        }
      }
      const curQty = this.addPackForm.get('quantity')?.value;
      if (curQty > this.maxQty) {
        this.addPackForm.patchValue({ quantity: this.maxQty });
      }
    });
    this.itemService.getAllItems().subscribe((response) => {
      const items = (response?.data as any).items;
      this.curItems = this.curItems.map(({ item, quantity }: any) => {
        return {
          _id: item.node._id,
          name: item.name,
          price: item.price,
          totQty: item.quantity,
          packQty: quantity,
          allowedItemActivities: item.allowedItemActivities,
        };
      });
      this.allItems = items.map((item: any) => {
        let packQty = 1;
        const packItem = this.curItems.find((curItem: any) => {
          return curItem._id === item.node._id;
        });
        if (packItem) {
          packQty = packItem.packQty;
        }
        return {
          _id: item.node._id,
          name: item.name,
          price: item.price,
          totQty: item.quantity,
          packQty: packQty,
          allowedItemActivities: item.allowedItemActivities,
        };
      });
      this.addPackForm.patchValue({
        packItems: this.curItems,
      });
    });
  }

  onQuantityChange(item: any, event: any) {
    const items = this.addPackForm.value['packItems'];
    const itemIdx = items.findIndex((val: any) => val._id === item._id);
    if (itemIdx === -1) return;
    items[itemIdx].packQty = parseInt(event.target.value);
    this.addPackForm.patchValue({ packItems: items });
  }

  onItemChange(event: any) {
    this.addPackForm.patchValue({ packItems: event.value });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.pack && changes.pack.currentValue) {
      this.addPackForm.patchValue(changes.pack.currentValue);
      this.curItems = changes.pack.currentValue.packItems;
      if (changes.pack.currentValue.allowedItemActivities == 'BOTH') {
        this.addPackForm.patchValue({
          allowedItemActivities: ['BUY', 'RENT'],
        });
      } else {
        this.addPackForm.patchValue({
          allowedItemActivities: [
            changes.pack.currentValue.allowedItemActivities,
          ],
        });
      }
      const response = await (
        await fetch(
          `http://localhost:3000/${changes.pack.currentValue.node._id}`,
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
        item: item._id,
        quantity: item.packQty,
      };
    });
    itemObj.parent = this.parent;
    itemObj.allowedItemActivities = activity;
    this.addPackForm.reset();
    this.addPackForm.clearValidators();
    console.log(itemObj);
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
