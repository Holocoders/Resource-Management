import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';
import { ItemService } from '../item/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { NodeService } from './node.service';
import { BreadcrumbsService } from '../breadcrumbs/breadcrumbs.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  nodes: (Category | Item)[] = [];
  id = '';
  displayAddDialog = false;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private nodeService: NodeService,
    private router: Router,
    private route: ActivatedRoute,
    private breadCrumbService: BreadcrumbsService
  ) {}

  getNodes(id: string) {
    const items = this.itemService.getAllChildren(id);
    const categories = this.categoryService.getAllChildren(id);
    items.refetch();
    categories.refetch();
    return combineLatest(items.valueChanges, categories.valueChanges);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      const observable = this.getNodes(this.id);
      observable.subscribe((result) => {
        const [items, categories] = result as any;
        this.nodes = [];
        for (const category of categories.data.childCategories) {
          const temp = new Category();
          this.nodes.push(Object.assign(temp, category));
        }
        for (const item of items.data.childItems) {
          const temp = new Item();
          this.nodes.push(Object.assign(temp, item));
        }
        this.nodes = [...this.nodes];
      });
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

  removeNode(event: any, id: string) {
    this.nodeService.removeNode(id).subscribe(() => {
      this.nodes = this.nodes.filter((val) => val.node._id != id);
      this.nodes = [...this.nodes];
    });
  }

  goToNode(node: any, isItem: boolean) {
    const id = node?.node?._id;
    if (isItem) {
      this.breadCrumbService.push({
        label: node.name,
        routerLink: '/item',
        queryParams: { id },
      });
      this.router.navigate(['/item'], { queryParams: { id } });
      return;
    }
    this.breadCrumbService.push({
      label: node.name,
      routerLink: '/node',
      queryParams: { id },
    });
    this.router.navigate(['/node'], { queryParams: { id } });
  }
}
