import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly apollo: Apollo,
    private readonly http: HttpClient
  ) { }

  addCategory(createCategoryInput: any, file: any) {
    const operations = {
      query: `
        mutation createCategory ($createCategoryInput: CreateCategoryInput!, $file: Upload!) {
          createCategory (createCategoryInput: $createCategoryInput, file: $file) {
              _id {
                  _id
              }
          }
      }`,
      variables: {
        file: file,
        createCategoryInput
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

  getAllChildren(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query childCategories ($id: String!) {
          childCategories (id: $id) {
            _id {
              _id
              createdBy {
                _id
                email
                name
              }
              isItem
            }
            description
            name
          }
        }
      `,
      variables: {id}
    }).valueChanges;
  }
}
