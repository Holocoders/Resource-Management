import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { NodeService } from 'src/app/node/node.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {
  @Input() item: any;
  @Output() onDisplayDialog = new EventEmitter();

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly nodeService: NodeService,
    private readonly router: Router,
  ) {}

  deleteItem(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nodeService.removeNode(this.item.node._id).subscribe(() => {
          this.router.navigate(['/node'], {
            queryParams: {
              id: this.item.node.parent._id,
            },
          });
        });
      },
    });
  }
}
