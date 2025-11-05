import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}
