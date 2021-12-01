import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuggestImagesService {
  constructor(private http: HttpClient) {
  }

  get_images(query: string) {
    return this.http
      .get('https://www.googleapis.com/customsearch/v1', {
        params: {
          cx: '2a19407fe11bf8f19',
          key: 'AIzaSyDF-BdL1tyC66wHpJ1vIRpNsFWVISLlPJ0',
          searchType: 'image',
          imgSize: 'medium',
          start: '1',
          num: '4',
          q: query,
        },
      })
      .pipe(
        map((data) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return data.items;
        })
      );
  }
}
