# Explicação do Código - Battle Five Stats

## 📋 Visão Geral do Projeto

Este é um site de estatísticas do jogo Battle Five desenvolvido com **React**, seguindo o estilo do SofaScore. O projeto implementa todas as especificações solicitadas: React, MockAPI, Responsividade, CSS, JavaScript, LocalStorage e Jornada de Login.

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
battlefive-stats/
├── public/
│   └── index.html          # HTML base do React
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Button.js       # Botão customizado
│   │   ├── Input.js        # Input customizado
│   │   └── PrivateRoute.js # Proteção de rotas
│   ├── pages/              # Páginas da aplicação
│   │   ├── Login.js        # Página de login
│   │   ├── Register.js     # Página de registro
│   │   ├── Dashboard.js    # Dashboard principal
│   │   └── PlayerProfile.js # Perfil do jogador
│   ├── services/           # Serviços e APIs
│   │   ├── mockAPI.js      # API simulada
│   │   └── authService.js  # Serviço de autenticação
│   ├── App.js              # Componente raiz
│   ├── App.css             # Estilos do App
│   ├── index.js            # Ponto de entrada
│   └── index.css           # Estilos globais
├── package.json            # Dependências e scripts
└── README.md              # Documentação
```

---

## 🔑 Componentes Principais

### 1. **App.js** - Componente Raiz

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```

**Função**: Define todas as rotas da aplicação usando React Router.

**Rotas**:
- `/login` - Página de login
- `/register` - Página de registro
- `/dashboard` - Dashboard principal (protegida)
- `/player/:id` - Perfil do jogador (protegida)

**Proteção de Rotas**: Usa o componente `PrivateRoute` para proteger rotas que exigem autenticação.

---

### 2. **services/mockAPI.js** - API Simulada

**Função**: Simula um backend completo sem precisar de servidor real.

**Principais Métodos**:

#### `login(email, password)`
- Simula autenticação de usuário
- Retorna token e dados do usuário
- Delay de 800ms para simular rede

#### `register(name, email, password)`
- Cria novo usuário
- Valida se email já existe
- Retorna token automaticamente

#### `getRanking(limit)`
- Retorna lista de jogadores ordenados por rating
- Dados mockados com 8 jogadores

#### `getPlayerStats(playerId)`
- Retorna estatísticas completas de um jogador
- Inclui: rating, wins, losses, K/D, etc.

#### `getRecentMatches(limit)`
- Retorna partidas recentes
- Inclui: times, placares, mapas, datas

#### `getGeneralStats()`
- Estatísticas gerais da plataforma
- Total de jogadores, partidas, eliminações, K/D médio

**Dados Mockados**:
- 8 jogadores com estatísticas completas
- 5 partidas recentes
- Sistema de armazenamento em memória

---

### 3. **services/authService.js** - Serviço de Autenticação

**Função**: Gerencia autenticação usando LocalStorage.

**Principais Métodos**:

#### `login(email, password)`
- Chama mockAPI.login()
- Salva token e usuário no LocalStorage
- Chaves: `guizin_auth` (token) e `guizin_user` (dados)

#### `logout()`
- Remove token e dados do LocalStorage
- Limpa sessão do usuário

#### `isAuthenticated()`
- Verifica se existe token no LocalStorage
- Retorna true/false

#### `getCurrentUser()`
- Retorna dados do usuário logado
- Lê do LocalStorage e faz parse do JSON

#### `validateToken()`
- Valida token com o backend
- Atualiza dados do usuário se válido

**LocalStorage**:
```javascript
localStorage.setItem('guizin_auth', token);
localStorage.setItem('guizin_user', JSON.stringify(user));
```

---

### 4. **components/PrivateRoute.js** - Proteção de Rotas

**Função**: Componente que protege rotas privadas.

**Como Funciona**:
1. Verifica se usuário está autenticado
2. Valida token com o backend
3. Se válido: renderiza o componente filho
4. Se inválido: redireciona para `/login`

**Estado**:
- `isAuthenticated`: null/true/false
- `loading`: true/false (mostra spinner)

---

### 5. **pages/Login.js** - Página de Login

**Função**: Permite usuário fazer login.

**Estados**:
- `email`: email do usuário
- `password`: senha
- `error`: mensagem de erro
- `loading`: estado de carregamento

**Fluxo**:
1. Usuário preenche formulário
2. Valida campos obrigatórios
3. Chama `authService.login()`
4. Se sucesso: redireciona para `/dashboard`
5. Se erro: mostra mensagem

**Validação**:
- Campos obrigatórios
- Feedback visual de erros

---

### 6. **pages/Register.js** - Página de Registro

**Função**: Permite criar nova conta.

**Estados**:
- `name`, `email`, `password`, `confirmPassword`
- `error`, `loading`

**Validações**:
- Todos os campos obrigatórios
- Senhas devem coincidir
- Senha mínimo 6 caracteres
- Email não pode estar cadastrado

**Fluxo**:
1. Valida formulário
2. Chama `authService.register()`
3. Se sucesso: redireciona para `/dashboard`
4. Se erro: mostra mensagem

---

### 7. **pages/Dashboard.js** - Dashboard Principal

**Função**: Página principal com estatísticas e rankings.

**Estados**:
- `user`: dados do usuário logado
- `userData`: dados completos do usuário
- `ranking`: lista de jogadores
- `generalStats`: estatísticas gerais
- `recentMatches`: partidas recentes
- `loading`: estado de carregamento

**useEffect**:
```javascript
useEffect(() => {
  // Carrega todos os dados ao montar componente
  loadUserData();
  loadRanking();
  loadGeneralStats();
  loadRecentMatches();
}, []);
```

**Seções**:

1. **Estatísticas Gerais** (Cards):
   - Total de jogadores
   - Total de partidas
   - Total de eliminações
   - K/D médio

2. **Ranking Top 10** (Tabela):
   - Posição, jogador, rating, vitórias, K/D
   - Links clicáveis para perfis
   - Badges de medalha (ouro, prata, bronze)

3. **Partidas Recentes**:
   - Times e placares
   - Mapas jogados
   - Tempo relativo (ex: "2h atrás")

4. **Meu Perfil** (se disponível):
   - Estatísticas do jogador logado
   - Link para perfil completo

**Responsividade**:
- Grid adaptável
- Tabelas responsivas
- Cards que se reorganizam

---

### 8. **pages/PlayerProfile.js** - Perfil do Jogador

**Função**: Mostra estatísticas detalhadas de um jogador.

**useParams**:
```javascript
const { id } = useParams(); // Pega ID da URL
```

**Estados**:
- `player`: dados do jogador
- `loading`: estado de carregamento

**useEffect**:
```javascript
useEffect(() => {
  loadPlayer(); // Carrega dados do jogador
}, [id]); // Recarrega quando ID muda
```

**Seções**:

1. **Header do Perfil**:
   - Avatar grande
   - Nome do jogador
   - Rank, time, nível

2. **Cards de Estatísticas**:
   - Rating
   - Vitórias
   - Eliminações
   - K/D Ratio
   - Win Rate
   - Partidas

3. **Tabela Detalhada**:
   - Todas as métricas organizadas
   - Cores diferentes para wins/losses
   - Destaque para K/D e Rating

---

### 9. **components/Button.js** - Componente de Botão

**Função**: Botão reutilizável com variantes.

**Props**:
- `children`: conteúdo do botão
- `onClick`: função ao clicar
- `type`: tipo do botão (button/submit)
- `variant`: primary/secondary/danger
- `disabled`: desabilitado ou não

**Variantes CSS**:
- `primary`: gradiente roxo (padrão)
- `secondary`: borda roxa, fundo transparente
- `danger`: vermelho para ações destrutivas

---

### 10. **components/Input.js** - Componente de Input

**Função**: Input reutilizável com label e validação.

**Props**:
- `label`: texto do label
- `type`: tipo do input (text/email/password)
- `value`: valor controlado
- `onChange`: função de mudança
- `placeholder`: texto placeholder
- `error`: mensagem de erro
- `required`: campo obrigatório

**Validação Visual**:
- Borda vermelha se houver erro
- Mensagem de erro abaixo do input
- Asterisco (*) para campos obrigatórios

---

## 🎨 Sistema de Estilos

### CSS Modules e Classes

**Estrutura**:
- Cada componente tem seu arquivo CSS
- Classes específicas para cada elemento
- Design system consistente

**Cores Principais**:
- `#1a1a2e` - Azul escuro (headers)
- `#667eea` - Roxo (destaques)
- `#f5f5f5` - Cinza claro (fundo)
- `#ffffff` - Branco (cards)

**Responsividade**:
```css
@media (max-width: 768px) {
  /* Estilos para mobile */
}
```

**Animações**:
- Hover effects
- Transições suaves
- Loading spinners

---

## 🔄 Fluxo de Dados

### 1. Login Flow

```
Usuário preenche formulário
    ↓
Login.js valida campos
    ↓
authService.login() chama mockAPI.login()
    ↓
MockAPI retorna token e user
    ↓
authService salva no LocalStorage
    ↓
Redireciona para /dashboard
```

### 2. Dashboard Flow

```
Dashboard monta
    ↓
useEffect executa
    ↓
Carrega dados em paralelo:
  - getUserData()
  - getRanking()
  - getGeneralStats()
  - getRecentMatches()
    ↓
Atualiza estados
    ↓
Renderiza componentes
```

### 3. Proteção de Rotas Flow

```
Usuário tenta acessar /dashboard
    ↓
PrivateRoute verifica autenticação
    ↓
Se não autenticado → /login
    ↓
Se autenticado → valida token
    ↓
Se token válido → renderiza Dashboard
    ↓
Se token inválido → /login
```

---

## 💾 LocalStorage

### Dados Armazenados

**Chaves**:
- `guizin_auth`: Token de autenticação
- `guizin_user`: Dados do usuário (JSON)

**Exemplo**:
```javascript
localStorage.setItem('guizin_auth', 'mock_token_1_1234567890');
localStorage.setItem('guizin_user', JSON.stringify({
  id: 1,
  email: 'admin@battlefive.com',
  name: 'Admin'
}));
```

**Persistência**:
- Dados permanecem após fechar navegador
- Limpos apenas no logout
- Lidos automaticamente no login

---

## 🎯 Funcionalidades Implementadas

### ✅ React
- Componentes funcionais com hooks
- JSX para renderização
- Estado com useState
- Efeitos com useEffect
- React Router para navegação

### ✅ MockAPI
- API completa simulada
- Delay realista (500-1500ms)
- Dados mockados realistas
- Endpoints RESTful

### ✅ Responsividade
- Mobile-first approach
- Media queries
- Grid flexível
- Tabelas responsivas

### ✅ CSS
- Design moderno
- Animações suaves
- Sistema de cores consistente
- Cards e tabelas estilizados

### ✅ JavaScript
- ES6+ (arrow functions, destructuring, etc.)
- Async/await
- Promises
- Manipulação de arrays/objetos

### ✅ LocalStorage
- Persistência de dados
- Gerenciamento de sessão
- Armazenamento de token

### ✅ Jornada de Login
- Login completo
- Registro de usuários
- Validação de formulários
- Proteção de rotas
- Logout

---

## 📊 Dados Mockados

### Jogadores (8 jogadores)
- Nome, avatar, rank, rating
- Wins, losses, win rate
- Kills, deaths, K/D
- Matches, team, level

### Partidas (5 partidas)
- Times e jogadores
- Placares
- Mapas
- Datas e durações

### Estatísticas Gerais
- Total de jogadores: 8
- Total de partidas: 5
- Total de eliminações: calculado
- K/D médio: calculado

---

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Servidor
```bash
npm start
```

### 3. Acessar
```
http://localhost:3000
```

### 4. Login
- Email: `admin@battlefive.com`
- Senha: `admin123`

---

## 🎓 Pontos Importantes para o Vídeo

### 1. Arquitetura
- Explicar estrutura de pastas
- Separação de responsabilidades
- Componentes reutilizáveis

### 2. React Hooks
- useState para estado
- useEffect para efeitos colaterais
- useParams para rotas dinâmicas
- useNavigate para navegação

### 3. React Router
- BrowserRouter
- Routes e Route
- Navigate para redirecionamento
- Rotas protegidas

### 4. LocalStorage
- Como salvar dados
- Como ler dados
- Como limpar dados
- Persistência de sessão

### 5. MockAPI
- Simulação de backend
- Delay realista
- Estrutura de dados
- Endpoints RESTful

### 6. Design Responsivo
- Media queries
- Grid flexível
- Adaptação mobile/desktop

### 7. Validação e Segurança
- Validação de formulários
- Proteção de rotas
- Autenticação

---

## 🔍 Código Destacado para Explicar

### 1. Hook useEffect com Dependências
```javascript
useEffect(() => {
  loadData();
}, [navigate]); // Executa quando navigate muda
```

### 2. Async/Await
```javascript
const response = await mockAPI.getRanking();
if (response.success) {
  setRanking(response.ranking);
}
```

### 3. Destructuring
```javascript
const { id } = useParams();
const { scores } = results;
```

### 4. Conditional Rendering
```javascript
{loading ? (
  <div>Carregando...</div>
) : (
  <div>Conteúdo</div>
)}
```

### 5. Map para Listas
```javascript
{ranking.map((player) => (
  <div key={player.id}>{player.name}</div>
))}
```

---

## 📝 Conclusão

Este projeto demonstra:
- Uso completo do React
- Arquitetura bem organizada
- Boas práticas de desenvolvimento
- Design responsivo
- Integração com LocalStorage
- Sistema de autenticação completo

Todas as especificações foram implementadas e o código está pronto para produção (após conectar com backend real).

---

**Boa sorte com o vídeo! 🎥**


