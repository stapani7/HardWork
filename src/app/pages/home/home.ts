import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProdutoService, Produto } from '../../services/produto.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgForOf, AsyncPipe, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  produtos: Produto[] = [];
  cartItems: Produto[] = [];
  totalValor = 0;
  modalAberto = false;

  constructor(
    private produtoService: ProdutoService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();

    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalValor = this.cartService.totalValor();
    });

    this.cartService.modalOpen$.subscribe(open => this.modalAberto = open);
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (data: Produto[]) => this.produtos = data,
      error: (err: any) => console.error('Erro ao carregar produtos:', err)
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.cartService.adicionarProduto(produto);
  }

  removerDoCarrinho(id?: number): void {
    this.cartService.removerProduto(id);
  }

  toggleModal(): void {
    this.cartService.toggleModal();
  }

  finalizarCompra(): void {
    // Fecha o modal do carrinho
    this.cartService.fecharModal();

    // Navega para a página de checkout
    this.router.navigate(['/checkout']);
  }
}
