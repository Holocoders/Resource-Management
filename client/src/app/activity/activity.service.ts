import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private apollo: Apollo) {}

  getAllActivities() {
    const query = gql`
      {
        inventoryHistory {
          activityDate
          activityType
          item {
            node {
              _id
              createdBy {
                _id
                email
                name
              }
              parent {
                _id
              }
              isItem
            }
            description
            name
            price
            quantity
          }
          quantity
          user {
            _id
            email
            name
          }
        }
        itemHistory {
          activityDate
          activityType
          item {
            node {
              _id
              createdBy {
                _id
                email
                name
              }
              parent {
                _id
              }
              isItem
            }
            description
            name
            price
            quantity
          }
          quantity
          user {
            _id
            email
            name
          }
        }
      }
    `;
    return this.apollo.watchQuery({ query, fetchPolicy: 'cache-and-network' });
  }
}
