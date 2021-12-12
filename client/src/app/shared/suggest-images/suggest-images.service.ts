import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuggestImagesService {
  constructor(private http: HttpClient) {}

  convertImageToFile(url: string) {
    return this.http
      .get('https://cors-anywhere.herokuapp.com/' + url, {
        responseType: 'blob',
        headers: { skip: 'true' },
      })
      .pipe(
        map((data) => {
          const blob = new Blob([data], { type: 'image/jpeg' });
          return new File([blob], 'image.jpg', { type: 'image/jpeg' });
        })
      );
  }

  getImages(query: string, offset = 1, limit = 5) {
    return this.http
      .get('https://www.googleapis.com/customsearch/v1', {
        params: {
          cx: '2a19407fe11bf8f19',
          key: 'AIzaSyDF-BdL1tyC66wHpJ1vIRpNsFWVISLlPJ0',
          searchType: 'image',
          imgSize: 'medium',
          start: offset,
          num: limit,
          q: query,
        },
      })
      .pipe(
        map((data: any) => {
          return data.items;
        })
      );
  }
}
