import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  constructor(private apollo: Apollo) {}

  getFacilities() {
    return this.apollo.watchQuery({
      query: gql`
        {
          facilities {
            _id
            name
          }
        }
      `,
    }).valueChanges;
  }

  removeFacility(id: string) {
    const REMOVE = gql`
      mutation removeFacility($id: String!) {
        removeFacility(id: $id) {
          _id
          name
        }
      }
    `;

    return this.apollo.mutate({
      mutation: REMOVE,
      variables: {
        id,
      },
    });
  }
}
