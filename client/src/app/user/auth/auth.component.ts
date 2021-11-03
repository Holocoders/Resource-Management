import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: User;
  rememberUser: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => this.user = user);
  }

  loginUser() {
    this.authService.login(this.user)
      .subscribe(() => {
        if (this.rememberUser) {
          localStorage.setItem("user", JSON.stringify(this.user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(this.user));
        }
        this.router.navigateByUrl("/facilities");
      });
  }

}
