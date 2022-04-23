import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
            allowedItemActivities
          }
        }
      `,
      variables: {
        id,
      },
    }).valueChanges;
  }

  getPackDetails(id: string) {
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
            packItems {
              item {
                node {
                  _id
                }
                name
                description
                price
                quantity
                allowedItemActivities
              }
              quantity
            }
            allowedItemActivities
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
        mutation createItem(
          $createItemInput: CreateItemInput!
          $file: Upload!
        ) {
          createItem(createItemInput: $createItemInput, file: $file) {
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
              type
            }
            description
            name
            price
            quantity
            allowedItemActivities
          }
        }
      `,
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

  addPack(createItemInput: any, file: any) {
    const operations = {
      query: `
        mutation createPack ($createItemInput: CreateItemInput!, $file: Upload!) {
          createPack (createItemInput: $createItemInput, file: $file) {
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
              type
            }
            description
            name
            price
            quantity
            packItems {
              item {
                node {
                  _id
                }
              }
              quantity
            }
            allowedItemActivities
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

  updateItem(updateItemInput: any, file: any) {
    const operations = {
      query: `
        mutation updateItem ($updateItemInput: UpdateItemInput!, $file: Upload!) {
          updateItem (updateItemInput: $updateItemInput, file: $file) {
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
              type
            }
            description
            name
            price
            quantity
            allowedItemActivities
          }
      }`,
      variables: {
        file: file,
        updateItemInput,
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

  updatePack(updateItemInput: any, file: any) {
    const operations = {
      query: `
        mutation updatePack ($updateItemInput: UpdateItemInput!, $file: Upload!) {
          updatePack (updateItemInput: $updateItemInput, file: $file) {
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
              type
            }
            description
            name
            price
            quantity
            packItems {
              item {
                node {
                  _id
                }
              }
              quantity
            }
            allowedItemActivities
          }
      }`,
      variables: {
        file: file,
        updateItemInput,
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

  getAllItems() {
    const query = gql`
      query items {
        items {
          node {
            _id
          }
          description
          name
          price
          quantity
          allowedItemActivities
        }
      }
    `;
    return this.apollo.watchQuery({
      query,
      fetchPolicy: 'cache-and-network',
    }).valueChanges;
  }

  getAllItemChildren(id: string) {
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
            type
          }
          description
          name
          price
          quantity
          allowedItemActivities
        }
      }
    `;
    return this.apollo.watchQuery({
      query,
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });
  }

  getAllPackChildren(id: string) {
    const query = gql`
      query childPacks($id: String!) {
        childPacks(id: $id) {
          node {
            _id
            parent {
              _id
            }
            categoryCount
            itemCount
            type
          }
          description
          name
          price
          quantity
          packItems {
            item {
              node {
                _id
              }
              name
              quantity
            }
            quantity
          }
          allowedItemActivities
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
              type
            }
            description
            name
            price
            quantity
            allowedItemActivities
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
