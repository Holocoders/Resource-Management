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
}
