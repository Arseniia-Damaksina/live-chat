import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })

    get email() {
      return this.form.get('email');
    }
  
    get password() {
      return this.form.get('password');
    }

    login() {
      if (this.form.valid) {
        this.authService.login({
          email: this.email?.value,
          password: this.password?.value
        }).pipe(
          tap(() => this.router.navigate(['../../chats/chatrooms']))
        ).subscribe()
      }
    }
}
