import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';

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
            _id {
              _id
            }
            name
            description
          }
        }
      `,
    }).valueChanges;
  }

  addFacility(name: string, desc: string, file: any) {
    const formData = new FormData();
    formData.append(
      'operations',
      `{ "query": "mutation ($createFacilityInput: CreateFacilityInput!, $file: Upload!) { createFacility(file: $file, createFacilityInput: $createFacilityInput) { _id { _id } name description } }", "variables": { "file": null, "createFacilityInput": {"name": "${name}", "description": "${desc}"} } }`
    );
    formData.append('map', '{ "nfile": ["variables.file"] }');
    formData.append('nfile', file);
    return this.http.post('http://localhost:3000/graphql', formData);
  }

  removeFacility(id: string) {
    const REMOVE = gql`
      mutation removeFacility($id: String!) {
        removeFacility(id: $id) {
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
