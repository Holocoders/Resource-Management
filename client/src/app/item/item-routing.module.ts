import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';
import { ItemComponent } from './item/item.component';
import { PackComponent } from 'src/app/item/pack/pack.component';

function isItem(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('item')
    ? { consumed: url }
    : null;
}

function isPack(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('pack')
    ? { consumed: url }
    : null;
}

const routes: Routes = [
  { component: ItemComponent, matcher: isItem },
  { component: PackComponent, matcher: isPack },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
