import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-suggest-images',
  templateUrl: './suggest-images.component.html',
  styleUrls: ['./suggest-images.component.scss']
})
export class SuggestImagesComponent implements OnInit {

  uploadedFiles: any[] = [];

  products: any[] = [
    {
      image: "https://amz.run/52RL"
    },
    {
      image: "https://bityl.co/9Txp"
    },
    {
      image: "https://bityl.co/9Txv"
    },
    {
      image: "https://bityl.co/9Txy"
    }
  ]

  @Output() onFileUpload = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.onFileUpload.emit(this.uploadedFiles[0]);
  }

}
