import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private apollo: Apollo, private http: HttpClient) {}

  getItemDetails(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query item($id: String!) {
          item(id: $id) {
            node {
              _id
              createdBy {
                _id
                name
              }
              parent {
                _id
              }
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

  addItem(createItemInput: any, file: any) {
    const operations = {
      query: `
        mutation createItem ($createItemInput: CreateItemInput!, $file: Upload!) {
          createItem (createItemInput: $createItemInput, file: $file) {
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
      }`,
      variables: {
        file: file,
        createItemInput,
      },
    };
    const _map = {
      file: ['variables.file'],
    };
    const formData = new FormData();
    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify(_map));
    formData.append('file', file, file.name);
    return this.http.post(environment.apiUrl, formData);
  }

  getAllChildren(id: string) {
    const query = gql`
      query childItems($id: String!) {
        childItems(id: $id) {
          node {
            _id
            parent {
              _id
            }
            categoryCount
            itemCount
            isItem
          }
          description
          name
          price
          quantity
        }
      }
    `;
    return this.apollo.watchQuery({
      query,
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });
  }

  inventoryHistoryByItem(item: string) {
    const query = gql`
      query inventoryHistoryByItem($item: String!) {
        inventoryHistoryByItem(item: $item) {
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
    const variables = { item };
    return this.apollo.watchQuery({ query, variables }).valueChanges;
  }
}
