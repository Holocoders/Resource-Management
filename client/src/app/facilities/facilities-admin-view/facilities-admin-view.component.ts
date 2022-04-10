import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from '../../node/node.service';

@Component({
  selector: 'app-facilities-admin-view',
  templateUrl: './facilities-admin-view.component.html',
  styleUrls: ['./facilities-admin-view.component.scss'],
})
export class FacilitiesAdminViewComponent implements OnInit {
  users: any;
  display: boolean;
  @Input() editable: boolean;

  constructor(private nodeService: NodeService) {}

  ngOnInit() {
    this.nodeService.getUsers('-1').subscribe(
      (data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.users = data.data.getUsersWithPermission;
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
