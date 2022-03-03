import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../../../user/user.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../user/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalMessageService } from '../../../shared/local-message.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  @ViewChild('formPassword') formPassword: any;
  @ViewChild('formConfPassword') formConfPassword: any;
  @Output() userCreated = new EventEmitter<boolean>();
  user: User;
  showPassword = false;
  signUpForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', [Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: LocalMessageService,
  ) {}

  ngOnInit(): void {}

  signUp() {
    if (!this.signUpForm.valid) {
      this.messageService.addToastMessage({
        detail: 'Data entered is invalid!',
        severity: 'error',
      });
      return;
    }
    this.user = new User(
      this.signUpForm.value.email,
      this.signUpForm.value.name,
    );
    this.user.name = this.signUpForm.value.name;
    this.user.email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.authService.signup(this.user, password).subscribe(
      () => {
        this.userCreated.emit(true);
        this.messageService.addToastMessage({
          detail: 'Successfully registered!',
          severity: 'success',
        });
      },
      () => {
        this.messageService.addToastMessage({
          detail: 'User already exists!',
          severity: 'error',
        });
      },
    );
  }

  showHidePassword() {
    const isVisible = this.formPassword.input.nativeElement.type == 'text';
    this.showPassword = !isVisible;
    this.formPassword.input.nativeElement.type = !isVisible
      ? 'text'
      : 'password';
    this.formConfPassword.input.nativeElement.type = !isVisible
      ? 'text'
      : 'password';
  }
}
