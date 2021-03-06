import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  constructor(private apollo: Apollo) {}

  removeNode(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation removeNode($id: String!) {
          removeNode(id: $id) {
            _id
          }
        }
      `,
      variables: { id },
    });
  }

  getUsers(nodeId: string) {
    return this.apollo.watchQuery({
      query: gql`
        query getUsersWithPermission($nodeId: String!) {
          getUsersWithPermission(nodeId: $nodeId) {
            userId {
              _id
              name
              email
            }
          }
        }
      `,
      variables: {
        nodeId,
      },
    }).valueChanges;
  }

  addPermission(email: string, nodeId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation addPermission($createPermissionInput: CreatePermissionInput!) {
          addPermission(createPermissionInput: $createPermissionInput)
        }
      `,
      variables: {
        createPermissionInput: {
          email,
          nodeId,
        },
      },
    });
  }
}
