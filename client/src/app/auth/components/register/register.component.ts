import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordsDoNotMatch } from '../../validators/passwords-do-not-match.validators';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, 
    {
      validators: PasswordsDoNotMatch,
    }
  );

  get email() {
    return this.form.get('email');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  register() {
    if (this.form.valid) {
      this.userService.register({
        username: this.username?.value,
        email: this.email?.value,
        password: this.password?.value,
      }).pipe(tap(() => this.router.navigate(['../login']))).subscribe();
    } else {
      console.log('Form is invalid', this.form.errors);
    }
  }
}
