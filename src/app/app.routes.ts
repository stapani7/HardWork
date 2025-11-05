import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { Login } from './pages/login/login';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'admin-panel', component: AdminPanel },
  { path: 'checkout', component: Checkout }, 
];
