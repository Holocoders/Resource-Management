import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private readonly apollo: Apollo,
    private readonly http: HttpClient,
  ) {}

  addCategory(createCategoryInput: any, file: any) {
    const operations = {
      query: `
        mutation createCategory ($createCategoryInput: CreateCategoryInput!, $file: Upload!) {
          createCategory (createCategoryInput: $createCategoryInput, file: $file) {
              node {
                _id
                createdBy {
                  _id
                  email
                  name
                }
                isItem
                itemCount
                categoryCount
              }
              description
              name
          }
      }`,
      variables: {
        file: file,
        createCategoryInput,
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

  updateCategory(updateCategoryInput: any, file: any) {
    const operations = {
      query: `
        mutation updateCategory ($updateCategoryInput: UpdateCategoryInput!, $file: Upload!) {
          updateCategory (updateCategoryInput: $updateCategoryInput, file: $file) {
              node {
                _id
                createdBy {
                  _id
                  email
                  name
                }
                isItem
                itemCount
                categoryCount
              }
              description
              name
          }
      }`,
      variables: {
        file: file,
        updateCategoryInput,
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
      query childCategories($id: String!) {
        childCategories(id: $id) {
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
            categoryCount
            itemCount
            isItem
          }
          description
          name
        }
      }
    `;
    return this.apollo.watchQuery({
      query,
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });
  }
}
