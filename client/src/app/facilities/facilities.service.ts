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
}
