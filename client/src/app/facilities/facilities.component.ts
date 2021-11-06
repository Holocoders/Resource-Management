import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FacilitiesService } from './facilities.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent implements OnInit {
  facilities: any;
  loading = true;
  error: any;
  display = false;

  fileAdded = false;
  newFacilityName = '';
  newFacilityImage: any;

  constructor(
    private service: FacilitiesService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.getFacilities().subscribe((result: any) => {
      this.facilities = result?.data?.facilities;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  removeFacility(id: string): void {
    this.service.removeFacility(id).subscribe(() => {
      this.facilities = this.facilities.filter((item: any) => item._id != id);
    });
  }

  uploadImage(event: any) {
    this.newFacilityImage = event.files[0];
    this.fileAdded = true;
  }

  removeImage() {
    this.fileAdded = false;
    this.newFacilityImage = undefined;
  }

  addFacility() {
    this.service
      .addFacility(this.newFacilityName, this.newFacilityImage)
      .subscribe((result: any) => {
        const facility = result?.data?.createFacility;
        this.loading = result.loading;
        this.error = result.error;
        this.facilities.push(facility);
        this.facilities = [...this.facilities];
        this.display = false;
      });
  }
}
