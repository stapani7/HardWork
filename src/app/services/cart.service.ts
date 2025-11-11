import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Produto[] = [];
  
  private cartSubject = new BehaviorSubject<Produto[]>([]);
  cart$ = this.cartSubject.asObservable();

  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  // Adiciona produto ao carrinho
  adicionarProduto(produto: Produto) {
    this.cartItems.push(produto);
    this.cartSubject.next(this.cartItems);
    this.abrirModal(); // abre automaticamente ao adicionar
  }

  // Remove produto do carrinho pelo id
  removerProduto(id?: number) {
    if (!id) return;
    this.cartItems = this.cartItems.filter(p => p.id !== id);
    this.cartSubject.next(this.cartItems);
  }

  // Retorna valor total
  totalValor(): number {
    return this.cartItems.reduce((acc, p) => acc + p.preco, 0);
  }

  // Abre/fecha modal
  abrirModal() {
    this.modalOpenSubject.next(true);
  }

  fecharModal() {
    this.modalOpenSubject.next(false);
  }

  toggleModal() {
    this.modalOpenSubject.next(!this.modalOpenSubject.value);
  }

  // ✅ Limpa todo o carrinho
  limparCarrinho() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  // remove item pelo index
  removerItem(index: number) {
  this.cartItems.splice(index, 1);
  this.cartSubject.next([...this.cartItems]);
}

}
