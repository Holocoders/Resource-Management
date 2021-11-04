import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "../user.model";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { LocalMessageService } from "../../shared/local-message.service";

@Component({
  selector: 'app-local-signin',
  templateUrl: './local-signin.component.html',
  styleUrls: ['./local-signin.component.scss']
})
export class LocalSigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: LocalMessageService
  ) { }

  @ViewChild('formPassword') formPassword: any;
  user: User;
  rememberUser: boolean = false;
  showPassword: boolean = false;

  signInForm = this.formBuilder.group({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'rememberMe': new FormControl(false)
  })

  ngOnInit(): void {
    this.authService.user.subscribe(user => this.user = user);
  }

  signIn() {
    if (!this.signInForm.valid) {
      this.messageService.addToastMessage({detail: "Data entered is invalid!", severity: "error"});
      return;
    }
    this.user.email = this.signInForm.value.email;
    this.user.password = this.signInForm.value.password;
    this.authService.signIn(this.user)
      .subscribe(() => {
        if (this.rememberUser) {
          localStorage.setItem("user", JSON.stringify(this.user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(this.user));
        }
        this.router.navigateByUrl("/facilities");
        this.messageService.addToastMessage({detail: "Welcome back!", severity: "success"});
      }, () => {
        this.messageService.addToastMessage({detail: "Invalid username or password!", severity: "error"});
      });
  }

  showHidePassword() {
    const isVisible = this.formPassword.input.nativeElement.type == "text";
    this.showPassword = !isVisible;
    this.formPassword.input.nativeElement.type = !isVisible ? "text" : "password";
  }

}

