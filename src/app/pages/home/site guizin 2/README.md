# Battle Five Stats

Plataforma de estatísticas e rankings do jogo Battle Five, desenvolvida com React no estilo SofaScore.

## 🚀 Recursos Implementados

- ✅ **React** - Framework JavaScript moderno
- ✅ **MockAPI** - API simulada para desenvolvimento
- ✅ **Responsividade** - Design adaptável para todos os dispositivos
- ✅ **CSS** - Estilização moderna no estilo SofaScore
- ✅ **JavaScript** - Lógica de negócio implementada
- ✅ **LocalStorage** - Persistência de dados no navegador
- ✅ **Jornada de Login** - Sistema completo de autenticação (Login e Registro)
- ✅ **Rankings** - Tabela de classificação dos melhores jogadores
- ✅ **Estatísticas de Jogadores** - Perfis detalhados com todas as métricas
- ✅ **Partidas Recentes** - Histórico de partidas jogadas

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
```

3. Acesse `http://localhost:3000` no navegador

## 🔐 Credenciais de Teste

### Usuário Admin
- **Email:** admin@battlefive.com
- **Senha:** admin123

### Usuário Comum
- **Email:** user@battlefive.com
- **Senha:** user123

Ou crie uma nova conta através da página de registro!

## 📁 Estrutura do Projeto

```
battlefive-stats/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── PrivateRoute.js
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js     # Dashboard principal com rankings
│   │   └── PlayerProfile.js # Perfil detalhado do jogador
│   ├── services/            # Serviços e APIs
│   │   ├── mockAPI.js       # MockAPI com dados do Battle Five
│   │   └── authService.js   # Serviço de autenticação
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Funcionalidades

### Autenticação
- Login com email e senha
- Registro de novos usuários
- Validação de formulários
- Proteção de rotas privadas
- Logout

### Dashboard
- **Estatísticas Gerais**: Total de jogadores, partidas, eliminações e K/D médio
- **Ranking Top 10**: Tabela com os melhores jogadores
- **Partidas Recentes**: Últimas partidas jogadas com resultados
- **Meu Perfil**: Estatísticas do jogador logado (se disponível)

### Perfil do Jogador
- Informações completas do jogador
- Rating e ranking
- Estatísticas detalhadas (vitórias, derrotas, K/D, etc.)
- Visualização clara e organizada

### MockAPI
- Simula chamadas de API com delay realista
- Endpoints disponíveis:
  - `login(email, password)` - Autenticação
  - `register(name, email, password)` - Registro
  - `verifyToken(token)` - Validação de token
  - `getUserData(userId)` - Busca dados do usuário
  - `getRanking(limit)` - Obtém ranking de jogadores
  - `getPlayerStats(playerId)` - Estatísticas de um jogador
  - `getRecentMatches(limit)` - Partidas recentes
  - `getGeneralStats()` - Estatísticas gerais da plataforma

### LocalStorage
- Armazena token de autenticação
- Armazena dados do usuário logado
- Persistência entre sessões do navegador

### Design Responsivo
- Layout adaptável para desktop, tablet e mobile
- Interface moderna inspirada no SofaScore
- Cards limpos e organizados
- Tabelas responsivas
- Cores escuras e claras para melhor legibilidade

## 🎮 Sobre o Battle Five

Battle Five é um jogo competitivo 4x4 onde você monta seu squad, customiza seu estilo e disputa partidas insanas. Esta plataforma oferece estatísticas detalhadas, rankings e análises de performance dos jogadores.

## 🛠️ Tecnologias Utilizadas

- React 18.2.0
- React Router DOM 6.20.0
- CSS3 (Grid, Flexbox, Animations)
- LocalStorage API
- JavaScript ES6+

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🔒 Segurança

- Rotas protegidas com componente `PrivateRoute`
- Validação de token antes de acessar páginas privadas
- Limpeza de dados ao fazer logout

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria build de produção
- `npm test` - Executa testes

## 🎨 Estilo SofaScore

O design foi inspirado no SofaScore, com:
- Cards brancos sobre fundo cinza claro
- Tabelas limpas e organizadas
- Cores escuras para headers
- Tipografia clara e legível
- Espaçamento generoso
- Animações sutis

## 🚀 Como Usar

1. **Criar Conta ou Fazer Login**
   - Acesse a página de registro ou login
   - Crie uma conta ou use as credenciais de teste

2. **Acessar o Dashboard**
   - Após o login, você será redirecionado para o dashboard
   - Veja estatísticas gerais, ranking e partidas recentes

3. **Explorar Rankings**
   - Visualize o top 10 jogadores
   - Clique em qualquer jogador para ver seu perfil completo

4. **Ver Perfil do Jogador**
   - Acesse estatísticas detalhadas
   - Veja rating, K/D, win rate e muito mais

---

Desenvolvido com ❤️ usando React
