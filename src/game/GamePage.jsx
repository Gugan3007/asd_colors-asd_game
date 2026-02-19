/**
 * GamePage — Wrapper that renders the Math Game
 * Applies game-specific styles and provides a back button to return home.
 */

import { useNavigate } from 'react-router-dom';
import GameApp from './GameApp';
import './game.css';

export default function GamePage() {
  const navigate = useNavigate();

  return (
    <div className="game-wrapper">
      {/* Back to Home button — always visible above game */}
      <button
        className="game-back-btn"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>

      {/* The actual game */}
      <GameApp />
    </div>
  );
}
