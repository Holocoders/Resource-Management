import { Component, OnInit } from '@angular/core';
import { combineLatest, mergeMap, of } from 'rxjs';
import { Category } from '../../models/category.model';
import { Item } from '../../models/item.model';
import { CategoryService } from '../../category/category.service';
import { ItemService } from '../../item/item.service';
import { NodeService } from '../node.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';
import { NodeType } from 'src/app/models/node.model';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.scss'],
})
export class NodeViewComponent implements OnInit {
  nodes: (Category | Item)[] = [];
  id = '';
  loading = false;
  displayAddDialog = false;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private nodeService: NodeService,
    private router: Router,
    private route: ActivatedRoute,
    private breadCrumbService: BreadcrumbsService,
  ) {}

  getNodes(id: string) {
    const items = this.itemService.getAllItemChildren(id);
    const packs = this.itemService.getAllPackChildren(id);
    const categories = this.categoryService.getAllChildren(id);
    return combineLatest(
      items.valueChanges,
      categories.valueChanges,
      packs.valueChanges,
    );
  }

  ngOnInit() {
    this.loading = true;
    this.route.queryParams
      .pipe(
        mergeMap((params) => {
          this.id = params.id;
          return of(params.id);
        }),
        mergeMap((id) => this.getNodes(id)),
      )
      .subscribe((result) => {
        const [items, categories, packs] = result as any;
        this.loading = items.loading || categories.loading || packs.loading;
        this.nodes = [
          ...categories.data.childCategories,
          ...items.data.childItems,
          ...packs.data.childPacks,
        ];
      });
  }

  closeDialogCategory(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
    }
    this.categoryService
      .addCategory(event.data, event.file)
      .subscribe((res: any) => {
        this.displayAddDialog = false;
        this.nodes.unshift(res.data.createCategory);
        this.nodes = [...this.nodes];
      });
  }

  closeDialogItem(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
    }
    this.itemService.addItem(event.data, event.file).subscribe((res: any) => {
      this.displayAddDialog = false;
      this.nodes.push(res.data.createItem);
      this.nodes = [...this.nodes];
    });
  }

  closeDialogPack(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
    }
    this.itemService.addPack(event.data, event.file).subscribe((res: any) => {
      this.displayAddDialog = false;
      this.nodes.push(res.data.createPack);
      this.nodes = [...this.nodes];
    });
  }

  removeNode(event: any, id: string) {
    this.nodeService.removeNode(id).subscribe(() => {
      this.nodes = this.nodes.filter((val) => val.node._id != id);
      this.nodes = [...this.nodes];
    });
  }

  goToNode(node: any, type: NodeType) {
    const id = node?.node?._id;
    if (type === NodeType.ITEM) {
      this.breadCrumbService.push({
        label: node.name,
        routerLink: '/item',
        queryParams: { id },
      });
      this.router.navigate(['/item'], { queryParams: { id } });
      return;
    } else if (type === NodeType.CATEGORY) {
      this.breadCrumbService.push({
        label: node.name,
        routerLink: '/node',
        queryParams: { id },
      });
      this.router.navigate(['/node'], { queryParams: { id } });
    } else if (type === NodeType.PACK) {
      this.breadCrumbService.push({
        label: node.name,
        routerLink: '/pack',
        queryParams: { id },
      });
      this.router.navigate(['/pack'], { queryParams: { id } });
      return;
    }
  }
}
