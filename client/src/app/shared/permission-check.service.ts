import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../user/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionCheckService {
  constructor(private apollo: Apollo, private authService: AuthService) {}

  getFacilities(nodeId: string) {
    const query = gql`
      query checkPermission($userId: String!, $nodeId: String!) {
        checkPermission(userId: $userId, nodeId: $nodeId)
      }
    `;
    return this.apollo.watchQuery({
      query: query,
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: this.authService.user.getValue()._id,
        nodeId: nodeId,
      },
    });
  }
}
