import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LocalMessageService } from '../../shared/local-message.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: LocalMessageService
  ) {}

  @ViewChild('formPassword') formPassword: any;
  user: User;
  showPassword = false;

  signInForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  signIn() {
    if (!this.signInForm.valid) {
      this.messageService.addToastMessage({
        detail: 'Data entered is invalid!',
        severity: 'error',
      });
      return;
    }
    this.user.email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.signIn(this.user, password).subscribe(
      () => {
        if (this.signInForm.value.rememberMe) {
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
        sessionStorage.setItem('user', JSON.stringify(this.user));
        }
        this.router.navigateByUrl('/facilities');
        this.messageService.addToastMessage({
          detail: 'Welcome back!',
          severity: 'success',
        });
      },
      () => {
        this.messageService.addToastMessage({
          detail: 'Invalid username or password!',
          severity: 'error',
        });
      }
    );
  }

  showHidePassword() {
    const isVisible = this.formPassword.input.nativeElement.type == 'text';
    this.showPassword = !isVisible;
    this.formPassword.input.nativeElement.type = !isVisible
      ? 'text'
      : 'password';
  }
}
