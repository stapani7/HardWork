import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import mockAPI from '../services/mockAPI';
import Button from '../components/Button';
import './PlayerRanking.css';

const PlayerRanking = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlayers = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      try {
        const response = await mockAPI.getRanking(5000);
        if (response.success) {
          setPlayers(response.ranking);
        }
      } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [navigate]);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando ranking completo...</p>
      </div>
    );
  }

  return (
    <div className="player-ranking-container">
      <div className="player-ranking-header">
        <div className="player-ranking-header-content">
          <div>
            <h1>🏆 Ranking Completo de Jogadores</h1>
            <p>Top {players.length} jogadores do Battle Five</p>
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

      <div className="player-ranking-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar jogador ou time..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="ranking-table-full">
          <div className="table-header">
            <div className="col-rank">#</div>
            <div className="col-player">Jogador</div>
            <div className="col-team">Time</div>
            <div className="col-rating">Rating</div>
            <div className="col-wins">Vitórias</div>
            <div className="col-kd">K/D</div>
            <div className="col-winrate">Win Rate</div>
          </div>
          {filteredPlayers.map((player) => (
            <Link key={player.id} to={`/player/${player.id}`} className="table-row">
              <div className="col-rank">
                <span className={`rank-badge rank-${player.rank <= 3 ? player.rank : 'other'}`}>
                  {player.rank}
                </span>
              </div>
              <div className="col-player">
                <span className="player-avatar">{player.avatar}</span>
                <span className="player-name">{player.name}</span>
              </div>
              <div className="col-team">
                <Link 
                  to={`/team/${player.teamId}`} 
                  className="team-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {player.team}
                </Link>
              </div>
              <div className="col-rating">{player.rating}</div>
              <div className="col-wins">{player.wins}</div>
              <div className="col-kd">{player.kd.toFixed(2)}</div>
              <div className="col-winrate">{player.winRate}%</div>
            </Link>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="no-results">
            <p>Nenhum jogador encontrado com "{searchTerm}"</p>
          </div>
        )}

        {filteredPlayers.length > 0 && (
          <div className="results-count">
            Mostrando {filteredPlayers.length} de {players.length} jogadores
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerRanking;

