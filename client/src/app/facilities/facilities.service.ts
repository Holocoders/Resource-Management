import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  constructor(private apollo: Apollo, private http: HttpClient) {}

  getFacilities() {
    return this.apollo.watchQuery({
      query: gql`
        {
          facilities {
            node {
              _id
              categoryCount
              type
              itemCount
            }
            name
            description
          }
        }
      `,
      fetchPolicy: 'cache-and-network',
    });
  }

  addFacility(name: string, desc: string, file: any) {
    const formData = new FormData();
    formData.append(
      'operations',
      `{ "query": "mutation ($createFacilityInput: CreateFacilityInput!, $file: Upload!) { createFacility(file: $file, createFacilityInput: $createFacilityInput) { node { _id itemCount categoryCount } name description } }", "variables": { "file": null, "createFacilityInput": {"name": "${name}", "description": "${desc}"} } }`,
    );
    formData.append('map', '{ "nfile": ["variables.file"] }');
    formData.append('nfile', file);
    return this.http.post(environment.apiUrl, formData);
  }

  updateFacility(updateFacilityInput: any, file: any) {
    const operations = {
      query: `
        mutation updateFacility ($updateFacilityInput: UpdateFacilityInput!, $file: Upload!) {
          updateFacility (updateFacilityInput: $updateFacilityInput, file: $file) {
              node {
                _id
                createdBy {
                  _id
                  email
                  name
                }
                type
                itemCount
                categoryCount
              }
              description
              name
          }
      }`,
      variables: {
        file: file,
        updateFacilityInput,
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
}
