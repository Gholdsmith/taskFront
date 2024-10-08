import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  onSubmit() {
    this.authService
      .login(this.email, this.password)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          console.log('connexion réussie');

          this.router.navigate(['/dashboard']);
        } else console.log('échec');
      });
  }
}
