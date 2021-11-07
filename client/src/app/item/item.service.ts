import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private apollo: Apollo) {}

  getItemDetails(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query item($id: String!) {
          item(id: $id) {
            _id
            createdBy {
              _id
              name
            }
            description
            name
            price
            quantity
          }
        }
      `,
      variables: {
        id,
      },
    }).valueChanges;
  }
}
