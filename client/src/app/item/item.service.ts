import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getItemDetails(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query item ($id: String!) {
          item (id: $id) {
            _id {
              _id
              createdBy {
                _id
                name
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
        id
      }
    }).valueChanges;
  }

  addItem(createItemInput: any, file: any) {
    const operations = {
      query: `
        mutation createItem ($createItemInput: CreateItemInput!, $file: Upload!) {
          createItem (createItemInput: $createItemInput, file: $file) {
              _id {
                  _id
              }
          }
      }`,
      variables: {
        file: file,
        createItemInput
      }
    };
    const _map = {
      file: ["variables.file"]
    };
    const formData = new FormData();
    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify(_map));
    formData.append('file', file, file.name);
    return this.http.post('http://localhost:3000/graphql', formData);
  }

}
