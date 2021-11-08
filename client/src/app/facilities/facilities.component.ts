// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { FacilitiesService } from './facilities.service';
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-facilities',
//   templateUrl: './facilities.component.html',
//   styleUrls: ['./facilities.component.scss'],
// })
// export class FacilitiesComponent implements OnInit {
//   facilities: any;
//   loading = true;
//   error: any;
//   display = false;
//
//   fileAdded = false;
//   newFacilityName = '';
//   newFacilityImage: any;
//
//   constructor(
//     private service: FacilitiesService,
//     private router: Router
//   ) {}
//
//   ngOnInit(): void {
//     this.service.getFacilities().subscribe((result: any) => {
//       this.facilities = result?.data?.facilities;
//       this.loading = result.loading;
//       this.error = result.error;
//     });
//   }
//
//   removeFacility(id: string): void {
//     this.service.removeFacility(id).subscribe(() => {
//       this.facilities = this.facilities.filter(
//         (item: any) => item._id._id != id
//       );
//       console.log(this.facilities);
//     });
//   }
//
//   uploadImage(event: any) {
//     this.newFacilityImage = event.files[0];
//     this.fileAdded = true;
//   }
//
//   removeImage() {
//     this.fileAdded = false;
//     this.newFacilityImage = undefined;
//   }
//
//   addFacility() {
//     this.service
//       .addFacility(this.newFacilityName, this.newFacilityImage, this.newFacilityImage)
//       .subscribe((result: any) => {
//         const facility = result?.data?.createFacility;
//         this.loading = result.loading;
//         this.error = result.error;
//         this.facilities = Object.assign([], this.facilities);
//         this.facilities.push(facility);
//         this.facilities = [...this.facilities];
//         this.display = false;
//       });
//   }
//
//   goToNode(id: string, isItem: boolean) {
//     if (isItem) {
//       this.router.navigate(["/item"], {queryParams: {id}})
//       return
//     }
//     this.router.navigate(["/node"], {queryParams: {id}})
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from './facilities.service';
import {Router} from "@angular/router";
import {NodeService} from "../node/node.service";

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
  newFacilityDesc = '';
  newFacilityImage: any;

  selectedFacility = { name: '', description: '' };
  infoDisplay = false;

  constructor(
    private service: FacilitiesService,
    private nodeService: NodeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getFacilities().subscribe((result: any) => {
      this.facilities = result?.data?.facilities;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  removeFacility(id: string): void {
    this.nodeService.removeNode(id)
      .subscribe((res) => {
        this.facilities = this.facilities.filter(
          (item: any) => item._id._id != id
        );
      });
  }

  addFacility() {
    this.service
      .addFacility(
        this.newFacilityName,
        this.newFacilityDesc,
        this.newFacilityImage
      )
      .subscribe((result: any) => {
        const facility = result?.data?.createFacility;
        this.loading = result.loading;
        this.error = result.error;
        this.facilities = Object.assign([], this.facilities);
        this.facilities.push(facility);
        this.facilities = [...this.facilities];
        this.display = false;
      });
  }

  openInfo(facility: any) {
    this.selectedFacility = facility;
    this.infoDisplay = true;
  }

  goToNode(id: string, isItem: boolean) {
    if (isItem) {
      this.router.navigate(["/item"], {queryParams: {id}})
      return
    }
    this.router.navigate(["/node"], {queryParams: {id}})
  }
}
