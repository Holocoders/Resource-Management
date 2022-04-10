import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-node-users',
  templateUrl: './node-users.component.html',
  styleUrls: ['./node-users.component.scss'],
})
export class NodeUsersComponent implements OnInit {
  nodeId: string;
  users: any;
  display = false;

  @Input() editable: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private nodeService: NodeService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        mergeMap((params) => {
          this.nodeId = params.id;
          return of(params.id);
        }),
        mergeMap((id) => this.nodeService.getUsers(id)),
      )
      .subscribe((result) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.users = result.data.getUsersWithPermission;
      });
  }

  addUser() {}
}
