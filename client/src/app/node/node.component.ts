import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Category} from "../models/category.model";
import {Item} from "../models/item.model";
import {ItemService} from "../item/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {combineAll, exhaustMap, map, mergeMap, switchMap} from "rxjs/operators";
import {combineLatest, forkJoin, merge, of} from "rxjs";
import {CategoryService} from "../category/category.service";
import {NodeService} from "./node.service";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private nodeService: NodeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  nodes: (Category | Item)[] = [];
  id: string = "";
  displayAddDialog: boolean = false;

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        mergeMap((params) => {
          this.id = params.id;
          this.nodes = [];
          return this.id;
        }),
        switchMap(() => combineLatest({
          items: this.itemService.getAllChildren(this.id),
          categories: this.categoryService.getAllChildren(this.id)
        }))
      ).subscribe((result) => {
      const {items, categories} = result as any;
      for (const category of categories.data.childCategories) {
        let temp = new Category();
        this.nodes.push(Object.assign(temp, category));
      }
      for (const item of items.data.childItems) {
        let temp = new Item();
        this.nodes.push(Object.assign(temp, item));
      }
      this.nodes = [...this.nodes]
    })
  }

  closeDialogCategory(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
    }
    this.categoryService.addCategory(event.data, event.file)
      .subscribe((res: any) => {
        this.displayAddDialog = false;
        this.nodes.unshift(res.data.createCategory);
        this.nodes = [...this.nodes];
      })
  }

  closeDialogItem(event: any) {
    if (!event.submit) {
      this.displayAddDialog = false;
      return;
    }
    this.itemService.addItem(event.data, event.file)
      .subscribe((res: any) => {
        this.displayAddDialog = false;
        this.nodes.push(res.data.createItem);
        this.nodes = [...this.nodes];
      })
  }

  goToNode(id: string, isItem: boolean) {
    if (isItem) {
      this.router.navigate(["/item"], {queryParams: {id}})
      return
    }
    this.router.navigate(["/node"], {queryParams: {id}})
  }

  removeNode(event: any, id: string) {
    this.nodeService.removeNode(id)
      .subscribe((res) => {
        this.nodes = this.nodes.filter(val => val.node._id != id);
      })
  }

}
