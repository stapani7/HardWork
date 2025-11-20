// MockAPI - Simula chamadas de API para Battle Five Stats
class MockAPI {
  constructor() {
    // Simula delay de rede
    this.delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Dados mockados de usuários
    this.users = [
      { id: 1, email: 'admin@battlefive.com', password: 'admin123', name: 'Admin', steamId: 'STEAM_76561198012345678' },
      { id: 2, email: 'user@battlefive.com', password: 'user123', name: 'Usuário', steamId: 'STEAM_76561198087654321' },
    ];

    // Gera nomes de times
    this.teamNames = this.generateTeamNames(1200);
    
    // Gera times (cada time tem 4 jogadores)
    this.teams = this.generateTeams(1200);
    
    // Gera 5000 jogadores
    this.players = this.generatePlayers(5000);
    
    // Atualiza ranks após gerar todos os jogadores
    this.updateRanks();

    // Partidas mockadas
    this.matches = [
      {
        id: 1,
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        team1: { name: 'Elite Squad', players: ['ProGamerBR', 'ShadowHunter', 'FrostBite', 'ThunderStrike'], score: 16 },
        team2: { name: 'Dark Legion', players: ['NightCrawler', 'VenomShot', 'SteelFist', 'FireBlade'], score: 8 },
        map: 'Arena Central',
        duration: '18:45',
        status: 'finished',
      },
      {
        id: 2,
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        team1: { name: 'Ice Warriors', players: ['FrostBite', 'ThunderStrike', 'FireBlade', 'NightCrawler'], score: 12 },
        team2: { name: 'Storm Riders', players: ['ProGamerBR', 'ShadowHunter', 'VenomShot', 'SteelFist'], score: 16 },
        map: 'Ruínas Antigas',
        duration: '22:30',
        status: 'finished',
      },
      {
        id: 3,
        date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        team1: { name: 'Flame Guard', players: ['FireBlade', 'NightCrawler', 'VenomShot', 'SteelFist'], score: 14 },
        team2: { name: 'Elite Squad', players: ['ProGamerBR', 'ShadowHunter', 'FrostBite', 'ThunderStrike'], score: 16 },
        map: 'Base Militar',
        duration: '20:15',
        status: 'finished',
      },
      {
        id: 4,
        date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        team1: { name: 'Midnight Pack', players: ['NightCrawler', 'VenomShot', 'SteelFist', 'ProGamerBR'], score: 10 },
        team2: { name: 'Toxic Squad', players: ['VenomShot', 'SteelFist', 'FireBlade', 'ThunderStrike'], score: 16 },
        map: 'Arena Central',
        duration: '16:20',
        status: 'finished',
      },
      {
        id: 5,
        date: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        team1: { name: 'Iron Guard', players: ['SteelFist', 'ProGamerBR', 'ShadowHunter', 'FrostBite'], score: 16 },
        team2: { name: 'Elite Squad', players: ['ProGamerBR', 'ShadowHunter', 'FrostBite', 'ThunderStrike'], score: 9 },
        map: 'Ruínas Antigas',
        duration: '19:45',
        status: 'finished',
      },
    ];
  }

  // Gera nomes de times únicos
  generateTeamNames(count) {
    const prefixes = ['Elite', 'Dark', 'Ice', 'Storm', 'Flame', 'Midnight', 'Toxic', 'Iron', 'Shadow', 'Thunder', 'Fire', 'Night', 'Steel', 'Venom', 'Frost', 'Crimson', 'Azure', 'Golden', 'Silver', 'Platinum', 'Diamond', 'Mythic', 'Legend', 'Apex', 'Prime', 'Ultra', 'Nova', 'Alpha', 'Omega', 'Phoenix', 'Dragon', 'Tiger', 'Wolf', 'Eagle', 'Lion', 'Shark', 'Cobra', 'Viper', 'Raven', 'Hawk'];
    const suffixes = ['Squad', 'Legion', 'Warriors', 'Riders', 'Guard', 'Pack', 'Squad', 'Force', 'Unit', 'Team', 'Clan', 'Guild', 'Alliance', 'Brotherhood', 'Order', 'Knights', 'Elite', 'Legends', 'Masters', 'Champions', 'Heroes', 'Titans', 'Giants', 'Wolves', 'Eagles', 'Lions', 'Sharks', 'Dragons', 'Phoenix', 'Thunder', 'Storm', 'Blaze', 'Frost', 'Shadow', 'Light', 'Dark', 'Fire', 'Ice', 'Wind', 'Earth'];
    
    const names = new Set();
    while (names.size < count) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const name = `${prefix} ${suffix}`;
      if (!names.has(name)) {
        names.add(name);
      }
    }
    return Array.from(names);
  }

  // Gera times
  generateTeams(count) {
    const teams = [];
    for (let i = 0; i < count; i++) {
      teams.push({
        id: i + 1,
        name: this.teamNames[i],
        wins: Math.floor(Math.random() * 500) + 50,
        losses: Math.floor(Math.random() * 400) + 30,
        rating: Math.floor(Math.random() * 2000) + 1000,
        playerIds: [], // Será preenchido quando gerarmos os jogadores
      });
    }
    return teams;
  }

  // Gera jogadores
  generatePlayers(count) {
    const avatars = ['👑', '🎯', '❄️', '⚡', '🔥', '🌙', '💀', '🛡️', '⚔️', '🏹', '🗡️', '🛡️', '🎮', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧', '🎸', '🎺', '🎻', '🥁', '🎹', '🎵', '🎶', '🌟', '⭐', '✨', '💫', '🌠', '🌌', '🌍', '🌎', '🌏', '🌑', '🌒', '🌓', '🌔', '🌕'];
    const firstNames = ['Pro', 'Shadow', 'Frost', 'Thunder', 'Fire', 'Night', 'Venom', 'Steel', 'Dark', 'Light', 'Ice', 'Storm', 'Flame', 'Midnight', 'Toxic', 'Iron', 'Crimson', 'Azure', 'Golden', 'Silver', 'Platinum', 'Diamond', 'Mythic', 'Legend', 'Apex', 'Prime', 'Ultra', 'Nova', 'Alpha', 'Omega', 'Phoenix', 'Dragon', 'Tiger', 'Wolf', 'Eagle', 'Lion', 'Shark', 'Cobra', 'Viper', 'Raven', 'Hawk', 'Falcon', 'Bear', 'Fox', 'Panther', 'Jaguar', 'Leopard', 'Cheetah', 'Lynx', 'Puma'];
    const lastNames = ['Gamer', 'Hunter', 'Bite', 'Strike', 'Blade', 'Crawler', 'Shot', 'Fist', 'Knight', 'Warrior', 'Guard', 'Rider', 'Master', 'Champion', 'Hero', 'Titan', 'Giant', 'Legend', 'Elite', 'Pro', 'Ace', 'King', 'Queen', 'Prince', 'Duke', 'Lord', 'Sir', 'Captain', 'Commander', 'General', 'Admiral', 'Marshal', 'Chief', 'Boss', 'Leader', 'Star', 'Nova', 'Super', 'Ultra', 'Mega', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta', 'Omega', 'Alpha', 'Beta', 'Gamma'];
    
    const players = [];
    let playerId = 1;
    let teamIndex = 0;

    for (let i = 0; i < count; i++) {
      // Gera nome único
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName}${lastName}${Math.floor(Math.random() * 999) + 1}`;
      
      // Gera estatísticas realistas
      const matches = Math.floor(Math.random() * 500) + 50;
      const wins = Math.floor(matches * (Math.random() * 0.7 + 0.15)); // 15% a 85% winrate
      const losses = matches - wins;
      const winRate = ((wins / matches) * 100).toFixed(1);
      
      const kills = Math.floor(Math.random() * 5000) + 100;
      const deaths = Math.floor(kills / (Math.random() * 2 + 0.5)); // K/D entre 0.5 e 2.5
      const kd = (kills / deaths).toFixed(2);
      
      const rating = Math.floor(Math.random() * 2000) + 1000;
      const level = Math.floor(Math.random() * 50) + 1;
      const headshot = Math.floor(Math.random() * 60) + 20; // 20% a 80%
      
      // Associa jogador a um time (4 jogadores por time)
      const team = this.teams[teamIndex];
      const teamId = team.id;
      const teamName = team.name;
      
      // Adiciona o jogador ao time
      if (!team.playerIds) {
        team.playerIds = [];
      }
      team.playerIds.push(playerId);
      
      // Avança para o próximo time a cada 4 jogadores
      if ((i + 1) % 4 === 0) {
        teamIndex++;
        if (teamIndex >= this.teams.length) {
          teamIndex = 0; // Reinicia se acabarem os times
        }
      }

      players.push({
        id: playerId,
        name,
        steamId: `STEAM_${Math.floor(Math.random() * 90000000000000000) + 10000000000000000}`,
        rank: 0, // Será atualizado depois
        rating,
        wins,
        losses,
        winRate: parseFloat(winRate),
        kills,
        deaths,
        kd: parseFloat(kd),
        matches,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        team: teamName,
        teamId,
        level,
        headshot,
        assists: Math.floor(kills * (Math.random() * 0.5 + 0.3)), // 30% a 80% dos kills
      });

      playerId++;
    }

    return players;
  }

  // Atualiza ranks baseado no rating
  updateRanks() {
    const sorted = [...this.players].sort((a, b) => b.rating - a.rating);
    sorted.forEach((player, index) => {
      const originalPlayer = this.players.find(p => p.id === player.id);
      if (originalPlayer) {
        originalPlayer.rank = index + 1;
      }
    });
  }

  // Simula login
  async login(email, password) {
    await this.delay(800);
    
    const user = this.users.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          steamId: user.steamId,
        },
        token: `mock_token_${user.id}_${Date.now()}`,
      };
    }

    return {
      success: false,
      message: 'Email ou senha incorretos',
    };
  }

  // Simula registro
  async register(name, email, password) {
    await this.delay(800);

    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return {
        success: false,
        message: 'Email já cadastrado',
      };
    }

    const newUser = {
      id: this.users.length + 1,
      email,
      password,
      name,
      steamId: `STEAM_${Math.random().toString().substring(2, 11)}`,
    };

    this.users.push(newUser);

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        steamId: newUser.steamId,
      },
      token: `mock_token_${newUser.id}_${Date.now()}`,
    };
  }

  // Simula verificação de token
  async verifyToken(token) {
    await this.delay(500);
    
    if (token && token.startsWith('mock_token_')) {
      const userId = parseInt(token.split('_')[2]);
      const user = this.users.find(u => u.id === userId);
      
      if (user) {
        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            steamId: user.steamId,
          },
        };
      }
    }

    return {
      success: false,
      message: 'Token inválido',
    };
  }

  // Simula busca de dados do usuário
  async getUserData(userId) {
    await this.delay(500);
    
    const user = this.users.find(u => u.id === userId);
    
    if (user) {
      // Encontra o jogador correspondente
      const player = this.players.find(p => p.steamId === user.steamId) || null;
      
      return {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          steamId: user.steamId,
          createdAt: new Date().toISOString(),
          playerStats: player,
        },
      };
    }

    return {
      success: false,
      message: 'Usuário não encontrado',
    };
  }

  // Obtém ranking de jogadores
  async getRanking(limit = 50) {
    await this.delay(500);
    
    // Garante que os ranks estão atualizados
    if (this.players.length > 0) {
      const hasInvalidRanks = this.players.some(p => !p.rank || p.rank === 0);
      if (hasInvalidRanks) {
        this.updateRanks();
      }
    }
    
    const sorted = [...this.players].sort((a, b) => {
      // Ordena por rank, se rank for igual, ordena por rating
      if (a.rank !== b.rank) {
        return a.rank - b.rank;
      }
      return b.rating - a.rating;
    });
    
    const result = sorted.slice(0, limit);
    
    return {
      success: true,
      ranking: result,
    };
  }

  // Obtém estatísticas de um jogador
  async getPlayerStats(playerId) {
    await this.delay(500);
    const player = this.players.find(p => p.id === playerId);
    
    if (player) {
      return {
        success: true,
        player,
      };
    }

    return {
      success: false,
      message: 'Jogador não encontrado',
    };
  }

  // Obtém partidas recentes
  async getRecentMatches(limit = 10) {
    await this.delay(500);
    return {
      success: true,
      matches: this.matches.slice(0, limit),
    };
  }

  // Obtém estatísticas gerais
  async getGeneralStats() {
    await this.delay(500);
    
    const totalPlayers = this.players.length;
    const totalMatches = this.matches.length;
    const totalKills = this.players.reduce((sum, p) => sum + p.kills, 0);
    const avgKd = this.players.reduce((sum, p) => sum + p.kd, 0) / totalPlayers;
    
    return {
      success: true,
      stats: {
        totalPlayers,
        totalMatches,
        totalKills,
        avgKd: avgKd.toFixed(2),
        activePlayers: Math.floor(totalPlayers * 0.75),
      },
    };
  }

  // Atualiza estatísticas dos times baseado nos jogadores
  updateTeamStats() {
    this.teams.forEach(team => {
      const teamPlayers = this.players.filter(p => p.teamId === team.id);
      if (teamPlayers.length > 0) {
        team.totalKills = teamPlayers.reduce((sum, p) => sum + p.kills, 0);
        team.totalDeaths = teamPlayers.reduce((sum, p) => sum + p.deaths, 0);
        team.totalWins = teamPlayers.reduce((sum, p) => sum + p.wins, 0);
        team.totalLosses = teamPlayers.reduce((sum, p) => sum + p.losses, 0);
        team.totalMatches = team.totalWins + team.totalLosses;
        team.winRate = team.totalMatches > 0 ? ((team.totalWins / team.totalMatches) * 100).toFixed(1) : 0;
        team.avgKd = teamPlayers.length > 0 
          ? (teamPlayers.reduce((sum, p) => sum + p.kd, 0) / teamPlayers.length).toFixed(2)
          : 0;
        team.players = teamPlayers;
      }
    });
    
    // Ordena times por rating
    this.teams.sort((a, b) => b.rating - a.rating);
    this.teams.forEach((team, index) => {
      team.rank = index + 1;
    });
  }

  // Obtém ranking de times
  async getTeamRanking(limit = 100) {
    await this.delay(500);
    this.updateTeamStats();
    return {
      success: true,
      ranking: this.teams.slice(0, limit),
    };
  }

  // Obtém dados de um time específico
  async getTeamStats(teamId) {
    await this.delay(500);
    this.updateTeamStats();
    const team = this.teams.find(t => t.id === teamId);
    
    if (team) {
      return {
        success: true,
        team,
      };
    }

    return {
      success: false,
      message: 'Time não encontrado',
    };
  }

  // Busca jogadores por time
  async getPlayersByTeam(teamId) {
    await this.delay(500);
    const players = this.players.filter(p => p.teamId === teamId);
    return {
      success: true,
      players,
    };
  }
}

export default new MockAPI();
