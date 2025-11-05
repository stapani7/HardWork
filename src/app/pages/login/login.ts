import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  fazerLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/admin-panel']);
    } else if (this.username === 'cliente' && this.password === 'cliente') {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Usuário ou senha inválidos';
    }
  }
}
