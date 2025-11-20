import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import authService from '../services/authService';
import mockAPI from '../services/mockAPI';
import Button from '../components/Button';
import './PlayerProfile.css';

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlayer = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      try {
        const response = await mockAPI.getPlayerStats(parseInt(id));
        if (response.success) {
          setPlayer(response.player);
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Erro ao carregar jogador:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadPlayer();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!player) {
    return null;
  }

  return (
    <div className="player-profile-container">
      <div className="profile-header">
        <div className="profile-header-content">
          <Link to="/dashboard" className="back-link">← Voltar</Link>
          <div className="profile-main">
            <div className="profile-avatar-large">{player.avatar}</div>
            <div className="profile-info">
              <h1>{player.name}</h1>
              <div className="profile-meta">
                <span className="profile-rank">Rank #{player.rank}</span>
                <span className="profile-team">{player.team}</span>
                <span className="profile-level">Nível {player.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="global-stats-container">
          <div className="stats-left">
            <h2 className="stats-title">ESTATÍSTICAS GLOBAIS</h2>
            <div className="stats-grid-global">
              <div className="stat-card-global">
                <div className="stat-label-global">ABATES</div>
                <div className="stat-value-global">{player.kills}</div>
              </div>
              <div className="stat-card-global">
                <div className="stat-label-global">MORTES</div>
                <div className="stat-value-global">{player.deaths}</div>
              </div>
              <div className="stat-card-global">
                <div className="stat-label-global">ASSISTÊNCIAS</div>
                <div className="stat-value-global">{player.assists || 0}</div>
              </div>
              <div className="stat-card-global">
                <div className="stat-label-global">SEU K/D</div>
                <div className="stat-value-global">{player.kd.toFixed(2)}</div>
              </div>
              <div className="stat-card-global">
                <div className="stat-label-global">HEADSHOT</div>
                <div className="stat-value-global">{player.headshot || 0}%</div>
              </div>
              <div className="stat-card-global">
                <div className="stat-label-global">% VITÓRIAS</div>
                <div className="stat-value-global">{player.winRate}%</div>
              </div>
            </div>
            <div className="stats-footer">
              <span className="footer-icon">⚠️</span>
              <span className="footer-text">As estatísticas são redefinidas às segundas-feiras.</span>
            </div>
          </div>
          <div className="stats-right">
            <div className="human-figure">
              <div className="figure-head"></div>
              <div className="figure-torso"></div>
              <div className="figure-arms">
                <div className="arm arm-left"></div>
                <div className="arm arm-right"></div>
              </div>
              <div className="figure-legs">
                <div className="leg leg-left"></div>
                <div className="leg leg-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;


