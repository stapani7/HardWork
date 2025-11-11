import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Produto } from '../../services/produto.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: Produto[] = [];
  totalValor = 0;

  // Campos do formulário
  nome = '';
  cep = '';
  logradouro = '';
  bairro = '';
  cidade = '';
  uf = '';
  numero = '';
  complemento = '';

  // UI state
  buscandoCep = false;
  cepErro = '';
  geralErro = '';

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalValor = this.cartService.totalValor();
    });
  }

  removerDoCarrinho(index: number) {
  this.cartService.removerItem(index);
  this.totalValor = this.cartService.totalValor(); // pra atualizar o total
}


  // Normaliza e valida CEP (só números, 8 dígitos)
  private formatarCep(raw: string): string {
    return (raw || '').replace(/\D/g, '').slice(0, 8);
  }

  // Chamar quando o usuário clicar em "Buscar CEP" ou ao sair do campo (blur)
  buscarCep(): void {
    this.cepErro = '';
    const cepNum = this.formatarCep(this.cep);

    if (cepNum.length !== 8) {
      this.cepErro = 'Informe um CEP válido com 8 dígitos.';
      return;
    }

    this.buscandoCep = true;
    this.http.get<any>(`https://viacep.com.br/ws/${cepNum}/json/`).subscribe({
      next: (res) => {
        this.buscandoCep = false;
        if (res && !res.erro) {
          // popular campos
          this.logradouro = res.logradouro || '';
          this.bairro = res.bairro || '';
          this.cidade = res.localidade || '';
          this.uf = res.uf || '';
          this.cep = cepNum; // formata sem traço
          this.cepErro = '';
        } else {
          this.cepErro = 'CEP não encontrado.';
          this.logradouro = this.bairro = this.cidade = this.uf = '';
        }
      },
      error: (err) => {
        console.error('Erro ViaCEP', err);
        this.buscandoCep = false;
        this.cepErro = 'Erro ao buscar CEP. Tente novamente.';
        this.logradouro = this.bairro = this.cidade = this.uf = '';
      }
    });
  }

  confirmarCompra(): void {
    this.geralErro = '';

    // validações simples
    if (!this.nome.trim()) {
      this.geralErro = 'Informe o nome do destinatário.';
      return;
    }

    const cepNum = this.formatarCep(this.cep);
    if (cepNum.length !== 8 || !this.logradouro) {
      this.geralErro = 'Informe um CEP válido e busque o endereço.';
      return;
    }

    if (!this.numero.trim()) {
      this.geralErro = 'Informe o número do endereço.';
      return;
    }

    // Simulação de envio / confirmação
    const resumo = {
      nome: this.nome,
      endereco: `${this.logradouro}, ${this.numero}${this.complemento ? ' - ' + this.complemento : ''}`,
      bairro: this.bairro,
      cidade: this.cidade,
      uf: this.uf,
      cep: cepNum,
      total: this.totalValor,
      pagamento: 'Dinheiro (Pagar na entrega)'
    };

    alert(`Compra confirmada!\n\nResumo:\nNome: ${resumo.nome}\nEndereço: ${resumo.endereco}\n${resumo.bairro} - ${resumo.cidade}/${resumo.uf}\nCEP: ${resumo.cep}\n\nTotal: R$ ${resumo.total.toFixed(2)}\nPagamento: ${resumo.pagamento}`);

    // limpa carrinho e redireciona para home
    if (this.cartService && typeof this.cartService.limparCarrinho === 'function') {
      this.cartService.limparCarrinho();
    }
    this.router.navigate(['/home']);
  }
}
