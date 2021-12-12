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
  @ViewChild('formPassword') formPassword: any;
  user: User;
  showPassword = false;
  signInForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: LocalMessageService
  ) {}

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
    const { email, password, rememberMe } = this.signInForm.value;
    this.authService.signIn(email, password, rememberMe).subscribe({
      next: () => {
        this.router.navigateByUrl('/facilities');
        this.messageService.addToastMessage({
          detail: 'Welcome back!',
          severity: 'success',
        });
      },
      error: () => {
        this.messageService.addToastMessage({
          detail: 'Invalid username or password!',
          severity: 'error',
        });
      },
    });
  }

  showHidePassword() {
    const isVisible = this.formPassword.input.nativeElement.type == 'text';
    this.showPassword = !isVisible;
    this.formPassword.input.nativeElement.type = !isVisible
      ? 'text'
      : 'password';
  }
}
