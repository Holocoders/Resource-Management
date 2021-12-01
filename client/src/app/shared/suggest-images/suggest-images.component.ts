import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuggestImagesService } from './suggest-images.service';

@Component({
  selector: 'app-suggest-images',
  templateUrl: './suggest-images.component.html',
  styleUrls: ['./suggest-images.component.scss'],
})
export class SuggestImagesComponent implements OnInit {
  uploadedFiles: any[] = [];

  products: any[] = [
    {
      image: 'https://www.bls.gov/ooh/images/15279.jpg',
    },
    {
      image: 'https://bityl.co/9Txp',
    },
    {
      image: 'https://bityl.co/9Txv',
    },
    {
      image: 'https://bityl.co/9Txy',
    },
  ];

  @Output() onFileUpload = new EventEmitter();

  constructor(private service: SuggestImagesService) {}

  ngOnInit(): void {
    this.service.get_images('Library').subscribe((res) => {
      console.log(res);
    });
  }

  onFileSelected(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.onFileUpload.emit(this.uploadedFiles[0]);
  }
}
