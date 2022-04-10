import { Component, OnInit } from '@angular/core';
import { PermissionCheckService } from '../shared/permission-check.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent implements OnInit {
  _editable = false;

  constructor(private permissionCheckService: PermissionCheckService) {}

  ngOnInit() {
    this.permissionCheckService
      .getFacilities('-1')
      .valueChanges.subscribe((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._editable = res.data?.['checkPermission'];
      });
  }
}
