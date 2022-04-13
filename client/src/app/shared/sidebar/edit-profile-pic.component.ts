import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  template: `
    <p-fileUpload
      name="demo[]"
      mode="basic"
      [showCancelButton]="false"
      [showUploadButton]="false"
      (onSelect)="onUpload($event)"
      accept="image/*"
      chooseLabel="Browse"
      [maxFileSize]="1000000"
    >
    </p-fileUpload>
    <image-cropper
      style="max-height: 600px; max-width: 600px;"
      [imageFile]="uploadedFiles"
      [maintainAspectRatio]="true"
      [roundCropper]="true"
      format="png"
      (imageCropped)="imageCropped($event)"
    ></image-cropper>
    <p-button
      label="Submit"
      icon="pi pi-check"
      (onClick)="closeDialog()"
    ></p-button>
  `,
})
export class EditProfilePicComponent {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  imageChangedEvent: any = null;
  uploadedFiles: any = null;
  croppedImage: any = '';

  onUpload(event: any) {
    this.imageChangedEvent = event.originalEvent;
    this.uploadedFiles = event.currentFiles[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  closeDialog() {
    this.ref.close(this.croppedImage);
  }
}
