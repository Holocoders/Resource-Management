import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  header = new BehaviorSubject<string>('Facilities');

  facilityQuery = gql`
    query facilitySearch($name: String!) {
      facilitySearch(name: $name) {
        name
        _id {
          _id
        }
      }
    }
  `;

  categoryQuery = gql`
    query categorySearch($name: String!) {
      categorySearch(name: $name) {
        name
        _id {
          _id
        }
      }
    }
  `;

  itemQuery = gql`
    query itemSearch($name: String!) {
      itemSearch(name: $name) {
        name
        _id {
          _id
        }
      }
    }
  `;

  constructor(private apollo: Apollo, private http: HttpClient) {}

  searchQuery(name: string) {
    const facility = this.apollo.watchQuery<any>({
      query: this.facilityQuery,
      variables: { name },
      fetchPolicy: 'cache-and-network',
    }).valueChanges;
    const category = this.apollo.watchQuery<any>({
      query: this.categoryQuery,
      variables: { name },
      fetchPolicy: 'cache-and-network',
    }).valueChanges;

    const item = this.apollo.watchQuery<any>({
      query: this.itemQuery,
      variables: { name },
      fetchPolicy: 'cache-and-network',
    }).valueChanges;

    return facility.pipe(
      map(({ data }) => data.facilitySearch),
      exhaustMap((facility) => {
        return category.pipe(
          map(({ data }) => data.categorySearch),
          exhaustMap((category) => {
            return item.pipe(
              map(({ data }) => data.itemSearch),
              map((items) => {
                return [...facility, ...category, ...items];
              }),
            );
          }),
        );
      }),
    );
  }
}
