import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/demo/service/user.service';
import { NgForm } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styles: [`
    :host ::ng-deep .p-password input {
      width: 100%;
      padding:1rem;
    }

    :host ::ng-deep .pi-eye {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class RegisterComponent {
  valCheck: string[] = ['remember'];
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, public layoutService: LayoutService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.register(this.username ,this.email, this.password).subscribe(
        response => {
          console.log('Register successful');
          this.errorMessage = '';
          localStorage.setItem('access_token', response.access_token);
          this.router.navigateByUrl('phones');
        },
        error => {
          //console.error('Login error:', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or email or password';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      );
    }
  }
}
