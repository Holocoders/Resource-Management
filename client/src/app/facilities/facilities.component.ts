import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from './facilities.service';
import { Router } from '@angular/router';
import { NodeService } from '../node/node.service';
import { BreadcrumbsService } from '../breadcrumbs/breadcrumbs.service';
import { NavbarService } from '../shared/navbar/navbar.service';

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
    private router: Router,
    private breadCrumbService: BreadcrumbsService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.breadCrumbService.popAll();
    this.navbarService.header.next('Facilities');
    this.service.getFacilities().subscribe((result: any) => {
      this.facilities = result?.data?.facilities;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  removeFacility(id: string): void {
    this.nodeService.removeNode(id).subscribe((res) => {
      this.facilities = this.facilities.filter(
        (item: any) => item.node._id != id
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

  goToNode(facility: any) {
    const id = facility?.node?._id;
    this.breadCrumbService.push({
      label: facility.name,
      routerLink: '/node',
      queryParams: { id },
    });
    this.router.navigate(['/node'], { queryParams: { id } });
  }
}
