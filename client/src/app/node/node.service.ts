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
          removeNode(id: $id)
        }
      `,
      variables: { id },
    });
  }
}
