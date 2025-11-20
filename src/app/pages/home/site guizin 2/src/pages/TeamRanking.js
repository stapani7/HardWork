import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import mockAPI from '../services/mockAPI';
import Button from '../components/Button';
import './TeamRanking.css';

const TeamRanking = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      try {
        const response = await mockAPI.getTeamRanking(1200);
        if (response.success) {
          setTeams(response.ranking);
        }
      } catch (error) {
        console.error('Erro ao carregar times:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, [navigate]);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando ranking de times...</p>
      </div>
    );
  }

  return (
    <div className="team-ranking-container">
      <div className="team-ranking-header">
        <div className="team-ranking-header-content">
          <div>
            <h1>🏆 Ranking de Times</h1>
            <p>Top {teams.length} times do Battle Five</p>
          </div>
          <div className="header-actions">
            <Link to="/dashboard" className="header-link">
              ← Voltar
            </Link>
            <Button variant="danger" onClick={() => {
              authService.logout();
              navigate('/login');
            }}>
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="team-ranking-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar time..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="teams-grid">
          {filteredTeams.map((team) => (
            <Link
              key={team.id}
              to={`/team/${team.id}`}
              className="team-card"
            >
              <div className="team-card-header">
                <div className="team-rank-badge">#{team.rank}</div>
                <h3 className="team-name">{team.name}</h3>
              </div>
              <div className="team-stats">
                <div className="team-stat-item">
                  <span className="team-stat-label">Rating</span>
                  <span className="team-stat-value">{team.rating}</span>
                </div>
                <div className="team-stat-item">
                  <span className="team-stat-label">Win Rate</span>
                  <span className="team-stat-value">{team.winRate}%</span>
                </div>
                <div className="team-stat-item">
                  <span className="team-stat-label">Vitórias</span>
                  <span className="team-stat-value">{team.totalWins || team.wins}</span>
                </div>
                <div className="team-stat-item">
                  <span className="team-stat-label">K/D Médio</span>
                  <span className="team-stat-value">{team.avgKd || '0.00'}</span>
                </div>
              </div>
              <div className="team-players-count">
                {team.players?.length || 4} jogadores
              </div>
            </Link>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="no-results">
            <p>Nenhum time encontrado com "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamRanking;

