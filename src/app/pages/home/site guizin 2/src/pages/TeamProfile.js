import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import authService from '../services/authService';
import mockAPI from '../services/mockAPI';
import Button from '../components/Button';
import './TeamProfile.css';

const TeamProfile = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeam = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      try {
        const teamResponse = await mockAPI.getTeamStats(parseInt(id));
        if (teamResponse.success) {
          setTeam(teamResponse.team);
          
          const playersResponse = await mockAPI.getPlayersByTeam(parseInt(id));
          if (playersResponse.success) {
            setPlayers(playersResponse.players);
          }
        } else {
          navigate('/teams');
        }
      } catch (error) {
        console.error('Erro ao carregar time:', error);
        navigate('/teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando perfil do time...</p>
      </div>
    );
  }

  if (!team) {
    return null;
  }

  return (
    <div className="team-profile-container">
      <div className="team-profile-header">
        <div className="team-profile-header-content">
          <Link to="/teams" className="back-link">← Voltar</Link>
          <div className="team-profile-main">
            <div className="team-profile-info">
              <h1>{team.name}</h1>
              <div className="team-profile-meta">
                <span className="team-profile-rank">Rank #{team.rank}</span>
                <span className="team-profile-rating">Rating: {team.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-profile-content">
        <div className="team-stats-section">
          <h2>Estatísticas do Time</h2>
          <div className="team-stats-grid">
            <div className="team-stat-card">
              <div className="team-stat-label">Vitórias</div>
              <div className="team-stat-value-large">{team.totalWins || team.wins}</div>
            </div>
            <div className="team-stat-card">
              <div className="team-stat-label">Derrotas</div>
              <div className="team-stat-value-large">{team.totalLosses || team.losses}</div>
            </div>
            <div className="team-stat-card">
              <div className="team-stat-label">Win Rate</div>
              <div className="team-stat-value-large">{team.winRate}%</div>
            </div>
            <div className="team-stat-card">
              <div className="team-stat-label">K/D Médio</div>
              <div className="team-stat-value-large">{team.avgKd || '0.00'}</div>
            </div>
            <div className="team-stat-card">
              <div className="team-stat-label">Total de Kills</div>
              <div className="team-stat-value-large">{team.totalKills?.toLocaleString() || '0'}</div>
            </div>
            <div className="team-stat-card">
              <div className="team-stat-label">Total de Mortes</div>
              <div className="team-stat-value-large">{team.totalDeaths?.toLocaleString() || '0'}</div>
            </div>
          </div>
        </div>

        <div className="team-players-section">
          <h2>Jogadores do Time ({players.length})</h2>
          <div className="team-players-grid">
            {players.map((player) => (
              <Link
                key={player.id}
                to={`/player/${player.id}`}
                className="team-player-card"
              >
                <div className="team-player-avatar">{player.avatar}</div>
                <div className="team-player-info">
                  <div className="team-player-name">{player.name}</div>
                  <div className="team-player-stats">
                    <span>K/D: {player.kd.toFixed(2)}</span>
                    <span>Win Rate: {player.winRate}%</span>
                  </div>
                </div>
                <div className="team-player-rank">#{player.rank}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;

