import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Produto } from '../../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: Produto[] = [];
  totalValor = 0;
  cep = '';
  pagamento = 'dinheiro';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // pega os produtos do carrinho
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalValor = this.cartService.totalValor();
    });
  }

  confirmarCompra(): void {
    if (!this.cep) {
      alert('Informe o CEP antes de finalizar a compra!');
      return;
    }

    alert(`Compra confirmada!\nTotal: R$ ${this.totalValor.toFixed(2)}\nPagamento: ${this.pagamento}\nCEP: ${this.cep}`);

    // opcional: limpar carrinho (precisa criar método em CartService)
    this.cartService['cartItems'] = []; // hack rápido, depois podemos criar método limparCarrinho()
    this.cartService['cartSubject'].next([]);

    this.router.navigate(['/home']);
  }
}
