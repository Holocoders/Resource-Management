import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuggestImagesService } from './suggest-images.service';

@Component({
  selector: 'app-suggest-images',
  templateUrl: './suggest-images.component.html',
  styleUrls: ['./suggest-images.component.scss'],
})
export class SuggestImagesComponent {
  uploadedFiles: any[] = [];
  products: any[] = [];
  showSuggestions = false;
  loading = false;

  @Output() onFileUpload = new EventEmitter();
  @Input() query: string;

  offset = 1;

  constructor(private service: SuggestImagesService) {
  }

  suggestImages() {
    this.showSuggestions = true;
    this.loading = true;
    this.service.get_images(this.query, this.offset).subscribe((res) => {
      this.products = [];
      for (const image of res) {
        this.products.push({
          image: image.link,
        });
      }
      this.offset += this.products.length;
      this.products = [...this.products];
      this.loading = false;
    });
  }

  onFileSelected(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.onFileUpload.emit(this.uploadedFiles[0]);
  }
}
