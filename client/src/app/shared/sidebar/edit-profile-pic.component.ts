import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  template: `
    <div class="flex flex-column align-items-center justify-content-center">
      <p-fileUpload
        name="demo[]"
        mode="basic"
        [showCancelButton]="false"
        [showUploadButton]="false"
        (onSelect)="onUpload($event)"
        accept="image/*"
        [chooseIcon]="'pi pi-upload'"
        chooseLabel="Browse"
        [maxFileSize]="1000000"
      >
      </p-fileUpload>
      <image-cropper
        style="max-height: 600px; max-width: 600px;"
        [imageURL]="config.data.image"
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
    </div>
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
