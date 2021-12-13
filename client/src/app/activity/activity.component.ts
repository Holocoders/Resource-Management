import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  activities: any[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    const activityQuery = this.activityService.getAllActivities();
    activityQuery.refetch();
    activityQuery.valueChanges.subscribe((result: any) => {
      this.activities = [
        ...result.data.inventoryHistory,
        ...result.data.itemHistory,
      ];
    });
  }

  search(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }
}
