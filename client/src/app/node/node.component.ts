import { Component, OnInit } from '@angular/core';
import { PermissionCheckService } from '../shared/permission-check.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  editable = false;
  id = '';

  constructor(
    private permissionCheckService: PermissionCheckService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
    });
    this.permissionCheckService
      .getPermission(this.id)
      .valueChanges.subscribe((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.editable = res.data?.['checkPermission'];
        console.log('NODE ID = ' + this.id + ' EDITABLE = ' + this.editable);
      });
  }
}
