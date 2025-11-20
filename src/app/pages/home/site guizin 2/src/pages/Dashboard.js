import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import mockAPI from '../services/mockAPI';
import Button from '../components/Button';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [generalStats, setGeneralStats] = useState(null);
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        navigate('/login');
        return;
      }

      setUser(currentUser);

      try {
        // Carrega dados do usuário
        const userResponse = await mockAPI.getUserData(currentUser.id);
        if (userResponse.success) {
          setUserData(userResponse.data);
        }

        // Carrega ranking
        const rankingResponse = await mockAPI.getRanking(10);
        if (rankingResponse.success && rankingResponse.ranking) {
          setRanking(rankingResponse.ranking);
        } else {
          console.error('Erro ao carregar ranking:', rankingResponse);
        }

        // Carrega estatísticas gerais
        const statsResponse = await mockAPI.getGeneralStats();
        if (statsResponse.success) {
          setGeneralStats(statsResponse.stats);
        }

        // Carrega partidas recentes
        const matchesResponse = await mockAPI.getRecentMatches(5);
        if (matchesResponse.success) {
          setRecentMatches(matchesResponse.matches);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) {
      return `${diffMins} min atrás`;
    } else if (diffHours < 24) {
      return `${diffHours}h atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  const playerStats = userData?.playerStats;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1>Battle Five Stats</h1>
            <p>Estatísticas e Rankings</p>
          </div>
          <div className="header-actions">
            <Link to="/teams" className="header-link">
              Ranking de Times
            </Link>
            {playerStats && (
              <Link to={`/player/${playerStats.id}`} className="header-link">
                Meu Perfil
              </Link>
            )}
            <Button variant="danger" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Estatísticas Gerais */}
        {generalStats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-value">{generalStats.totalPlayers}</div>
                <div className="stat-label">Jogadores</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎮</div>
              <div className="stat-info">
                <div className="stat-value">{generalStats.totalMatches}</div>
                <div className="stat-label">Partidas</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💀</div>
              <div className="stat-info">
                <div className="stat-value">{generalStats.totalKills.toLocaleString()}</div>
                <div className="stat-label">Eliminações</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{generalStats.avgKd}</div>
                <div className="stat-label">K/D Médio</div>
              </div>
            </div>
          </div>
        )}

        <div className="content-grid">
          {/* Ranking */}
          <div className="content-card">
            <div className="card-header">
              <h2>🏆 Ranking Top 10</h2>
              <Link to="/ranking" className="view-all-link">Ver Todos</Link>
            </div>
            <div className="ranking-table">
              <div className="table-header">
                <div className="col-rank">#</div>
                <div className="col-player">Jogador</div>
                <div className="col-rating">Rating</div>
                <div className="col-wins">Vitórias</div>
                <div className="col-kd">K/D</div>
              </div>
              {ranking && ranking.length > 0 ? (
                ranking.map((player) => (
                  <Link key={player.id} to={`/player/${player.id}`} className="table-row">
                    <div className="col-rank">
                      <span className={`rank-badge ${player.rank <= 3 ? `rank-${player.rank}` : 'rank-other'}`}>
                        {player.rank}
                      </span>
                    </div>
                    <div className="col-player">
                      <span className="player-avatar">{player.avatar}</span>
                      <span className="player-name">{player.name}</span>
                    </div>
                    <div className="col-rating">{player.rating}</div>
                    <div className="col-wins">{player.wins}</div>
                    <div className="col-kd">{player.kd.toFixed(2)}</div>
                  </Link>
                ))
              ) : (
                <div className="no-ranking-data">
                  <p>Carregando ranking...</p>
                </div>
              )}
            </div>
          </div>

          {/* Partidas Recentes */}
          <div className="content-card">
            <div className="card-header">
              <h2>⚔️ Partidas Recentes</h2>
              <Link to="/matches" className="view-all-link">Ver Todas</Link>
            </div>
            <div className="matches-list">
              {recentMatches.map((match) => (
                <div key={match.id} className="match-item">
                  <div className="match-teams">
                    <div className={`team ${match.team1.score > match.team2.score ? 'winner' : ''}`}>
                      <div className="team-name">{match.team1.name}</div>
                      <div className="team-score">{match.team1.score}</div>
                    </div>
                    <div className="match-vs">vs</div>
                    <div className={`team ${match.team2.score > match.team1.score ? 'winner' : ''}`}>
                      <div className="team-score">{match.team2.score}</div>
                      <div className="team-name">{match.team2.name}</div>
                    </div>
                  </div>
                  <div className="match-info">
                    <span className="match-map">🗺️ {match.map}</span>
                    <span className="match-time">{formatDate(match.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meu Perfil (se tiver stats) */}
        {playerStats && (
          <div className="content-card">
            <div className="card-header">
              <h2>📈 Meu Perfil</h2>
            </div>
            <div className="player-stats-grid">
              <div className="stat-item">
                <div className="stat-label">Rank</div>
                <div className="stat-value-large">#{playerStats.rank}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Rating</div>
                <div className="stat-value-large">{playerStats.rating}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Win Rate</div>
                <div className="stat-value-large">{playerStats.winRate}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">K/D</div>
                <div className="stat-value-large">{playerStats.kd.toFixed(2)}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Vitórias</div>
                <div className="stat-value-large">{playerStats.wins}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Partidas</div>
                <div className="stat-value-large">{playerStats.matches}</div>
              </div>
            </div>
            <Link to={`/player/${playerStats.id}`}>
              <Button>Ver Perfil Completo</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
