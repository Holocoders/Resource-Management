import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "../user.model";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { LocalMessageService } from "../../shared/local-message.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: LocalMessageService
  ) {
  }

  @ViewChild('formPassword') formPassword: any;
  @ViewChild('formConfPassword') formConfPassword: any;

  user: User;
  showPassword: boolean = false;
  signUpForm = this.formBuilder.group({
    'name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
    'confPassword': new FormControl('', [Validators.required]),
    'rememberMe': new FormControl(false)
  })

  ngOnInit(): void {
    this.authService.user.subscribe(user => this.user = user);
  }

  signUp() {
    if (!this.signUpForm.valid) {
      this.messageService.addToastMessage({detail: "Data entered is invalid!", severity: "error"});
      return;
    }
    this.user.name = this.signUpForm.value.name;
    this.user.email = this.signUpForm.value.email;
    this.user.password = this.signUpForm.value.password;
    this.authService.signup(this.user)
      .subscribe(() => {
        if (this.signUpForm.value.rememberMe) {
          localStorage.setItem("user", JSON.stringify(this.user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(this.user));
        }
        this.router.navigateByUrl("/facilities");
        this.messageService.addToastMessage({detail: "Successfully registered!", severity: "success"});
      }, () => {
        this.messageService.addToastMessage({detail: "User already exists!", severity: "error"});
      });
  }

  showHidePassword() {
    const isVisible = this.formPassword.input.nativeElement.type=="text";
    this.showPassword = !isVisible;
    this.formPassword.input.nativeElement.type = !isVisible ? "text":"password";
    this.formConfPassword.input.nativeElement.type = !isVisible ? "text":"password";
  }

}
