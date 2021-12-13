import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuggestImagesService } from './suggest-images.service';
import { LocalMessageService } from '../local-message.service';

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

  constructor(
    private service: SuggestImagesService,
    private localMessageService: LocalMessageService
  ) {}

  suggestImages() {
    if (this.query === '') {
      this.localMessageService.addToastMessage({
        detail: 'Search term cannot be empty!',
        severity: 'error',
      });
    }
    this.showSuggestions = true;
    this.loading = true;
    this.service.getImages(this.query, this.offset).subscribe((res) => {
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

  onFileRemoved() {
    this.uploadedFiles = [];
    this.uploadedFiles = [...this.uploadedFiles];
  }

  acceptImage(url: string) {
    this.service.convertImageToFile(url).subscribe((file) => {
      this.uploadedFiles = [];
      this.uploadedFiles.push(file);
      this.uploadedFiles = [...this.uploadedFiles];
      this.onFileUpload.emit(this.uploadedFiles[0]);
    });
  }

  clear() {
    this.uploadedFiles = [];
    this.uploadedFiles = [...this.uploadedFiles];
    this.onFileUpload.emit(null);
  }

  onFileSelected(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.uploadedFiles = [...this.uploadedFiles];
    this.onFileUpload.emit(this.uploadedFiles[0]);
  }
}
