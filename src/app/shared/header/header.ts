import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  totalProdutos = 0;

  faShoppingCart = faCartShopping;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.totalProdutos = items.length;
    });
  }

  abrirCarrinho() {
    this.cartService.abrirModal();
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
