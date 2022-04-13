import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../user/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { EditProfilePicComponent } from 'src/app/shared/sidebar/edit-profile-pic.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [DialogService],
})
export class SidebarComponent implements OnInit {
  user: any;
  profilePic: string;

  constructor(
    private navbarComponent: NavbarComponent,
    private auth: AuthService,
    private dialogService: DialogService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
      this.profilePic = `${environment.serverUrl}${user?._id}?${Date.now()}`;
    });
  }

  editProfilePicture() {
    const dialogRef = this.dialogService.open(EditProfilePicComponent, {
      header: 'Edit Profile Picture',
      dismissableMask: true,
      data: {
        image: this.user.image,
      },
    });

    dialogRef.onClose.subscribe(async (image: any) => {
      if (image) {
        const res = await fetch(image);
        const blob = await res.blob();
        this.userService.updateProfilePicture(blob).subscribe(() => {
          this.profilePic = `${environment.serverUrl}${
            this.user._id
          }?${Date.now()}`;
        });
      }
    });
  }

  closeSidebar() {
    this.navbarComponent.isMobileSidebarOpen = false;
  }
}
