import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SuggestImagesService} from './suggest-images.service';

@Component({
  selector: 'app-suggest-images',
  templateUrl: './suggest-images.component.html',
  styleUrls: ['./suggest-images.component.scss'],
})
export class SuggestImagesComponent {
  uploadedFiles: any[] = [];

  products: any[] = [];

  @Output() onFileUpload = new EventEmitter();
  @Input() query: string;

  constructor(private service: SuggestImagesService) {
  }

  suggestImages() {
    this.service.get_images(this.query).subscribe((res) => {
      for (const image of res) {
        this.products.push({
          image: image.link,
        });
      }
      this.products = [...this.products];
    });
  }

  onFileSelected(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.onFileUpload.emit(this.uploadedFiles[0]);
  }
}
