import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item/item.service';
import { NodeService } from 'src/app/node/node.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.scss'],
})
export class PackComponent implements OnInit {
  pack: any;
  itemHistory: any[] = [];
  isLoading: boolean;
  displayAddDialog: boolean;

  constructor(
    private readonly itemService: ItemService,
    private readonly nodeService: NodeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params.id),
        mergeMap((id) => this.itemService.getPackDetails(id)),
        mergeMap((result: any) => {
          this.pack = JSON.parse(JSON.stringify(result?.data?.item));
          return this.itemService.inventoryHistoryByItem(this.pack.node._id);
        }),
      )
      .subscribe((result: any) => {
        this.isLoading = result.loading;
        this.itemHistory = result?.data?.inventoryHistoryByItem;
        this.itemHistory = [...this.itemHistory];
      });
  }

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  closeDialogItem(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
    }
    event.data._id = this.pack.node._id;
    this.itemService
      .updatePack(event.data, event.file)
      .subscribe((res: any) => {
        this.pack = { ...this.pack, ...res.data.updatePack };
        this.displayAddDialog = false;
      });
  }
}
