import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';
import { ItemService } from '../item/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineAll,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { combineLatest, forkJoin, merge, of } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { NodeService } from './node.service';
import { BreadcrumbsService } from '../breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private nodeService: NodeService,
    private router: Router,
    private route: ActivatedRoute,
    private breadCrumbService: BreadcrumbsService
  ) {}

  nodes: (Category | Item)[] = [];
  id = '';
  displayAddDialog = false;

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        mergeMap((params) => {
          this.id = params.id;
          this.nodes = [];
          return this.id;
        }),
        switchMap(() =>
          combineLatest({
            items: this.itemService.getAllChildren(this.id),
            categories: this.categoryService.getAllChildren(this.id),
          })
        )
      )
      .subscribe((result) => {
        const { items, categories } = result as any;
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
        this.router.navigate(['/node'], {
          queryParams: { id: res.data.createItem._id._id },
        });
      });
  }

  closeDialogItem(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
    }
    this.itemService.addItem(event.data, event.file).subscribe((res: any) => {
      this.displayAddDialog = false;
      this.router.navigate(['/item'], {
        queryParams: { id: res.data.createItem._id._id },
      });
    });
  }

  removeNode(event: any, id: string) {
    this.nodeService.removeNode(id).subscribe((res) => {
      console.log(res);
    });
  }

  goToNode(node: any, isItem: boolean) {
    const id = node?.node?._id;
    if (isItem) {
      this.breadCrumbService.push({
        label: node.name,
        url: '/item' + `?id=${id}`,
      });
      this.router.navigate(['/item'], { queryParams: { id } });
      return;
    }
    this.breadCrumbService.push({
      label: node.name,
      url: '/node' + `?id=${id}`,
    });
    this.router.navigate(['/node'], { queryParams: { id } });
  }
}
