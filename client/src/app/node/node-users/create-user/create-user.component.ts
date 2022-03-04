import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LocalMessageService } from '../../../shared/local-message.service';
import { NodeService } from '../../node.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  @Input() nodeId: string;
  @Output() userCreated = new EventEmitter<boolean>();
  showPassword = false;
  signUpForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private nodeService: NodeService,
    private messageService: LocalMessageService,
  ) {}

  ngOnInit(): void {}

  addPermission() {
    if (!this.signUpForm.valid) {
      this.messageService.addToastMessage({
        detail: 'Data entered is invalid!',
        severity: 'error',
      });
      return;
    }
    const email = this.signUpForm.value.email;
    this.nodeService.addPermission(email, this.nodeId).subscribe(
      (res) => {
        this.userCreated.emit(true);
        this.messageService.addToastMessage({
          detail: 'Successfully registered!',
          severity: 'success',
        });
      },
      (err) => {
        this.messageService.addToastMessage({
          detail: 'User already exists!',
          severity: 'error',
        });
      },
    );
  }
}
