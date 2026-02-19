/**
 * Nebula Number Navigator — Main Game Controller (AAA Upgrade)
 * 
 * Architecture:
 *   - State machine: TITLE → PLAYING → CELEBRATING/WRONG_FEEDBACK → LEVEL_COMPLETE → PROGRESS_MAP
 *   - Mission rotation every 3 questions (FuelEngine → CrackCode → BalanceCargo)
 *   - Combo system triggers Warp Speed stars
 *   - Idle timer triggers hint wiggle on correct orb
 *   - RoboCompanion emotional states mirroring game events
 *   - Sound hooks wired to all interaction points
 *   - CSS Grid layout for responsive game board
 * 
 * Hooks used:
 *   useSound, useMouseParallax, useIdleTimer, useCombo
 */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Components ─── //
import ParallaxStarfield from './components/Starfield';
import Spaceship from './components/Spaceship';
import EquationDisplay from './components/EquationDisplay';
import NumberOrb, { orbContainerVariants, orbVariants } from './components/NumberOrb';
import CockpitHUD from './components/CockpitHUD';
import ParticleExplosion from './components/ParticleExplosion';
import LevelComplete from './components/LevelComplete';
import RoboCompanion from './components/RoboCompanion';
import ProgressMap from './components/ProgressMap';
import MissionBanner from './missions/MissionBanner';
import WarpTransition from './components/WarpTransition';

// ─── Hooks ─── //
import useSound from './hooks/useSound';
import useMouseParallax from './hooks/useMouseParallax';
import useIdleTimer from './hooks/useIdleTimer';
import useCombo from './hooks/useCombo';

// ─── Mission Engine ─── //
import { getMissionType, generateQuestion, MISSION_TYPES } from './missions/MissionEngine';

// ─── Constants ─── //
const QUESTIONS_PER_LEVEL = 6; // Divisible by 3 → exactly 2 full mission rotations
const CELEBRATION_DURATION = 1800;
const WRONG_FEEDBACK_DURATION = 800;
const MISSION_BANNER_DURATION = 1800;

// ─── Game States ─── //
const GAME_STATES = {
  TITLE: 'TITLE',
  MISSION_INTRO: 'MISSION_INTRO',
  PLAYING: 'PLAYING',
  CELEBRATING: 'CELEBRATING',
  WRONG_FEEDBACK: 'WRONG_FEEDBACK',
  LEVEL_COMPLETE: 'LEVEL_COMPLETE',
  PROGRESS_MAP: 'PROGRESS_MAP',
};

// ══════════════════════════════════════════
//   TITLE SCREEN COMPONENT
// ══════════════════════════════════════════

function TitleScreen({ onStart }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(34, 211, 238, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(232, 121, 249, 0.06) 0%, transparent 60%)',
        }}
      />

      {/* Version Badge */}
      <motion.div
        className="absolute top-4 right-4 glass-panel px-3 py-1.5 text-[10px] font-medium text-slate-400 tracking-wider"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        v2.0 ✦ PREMIUM
      </motion.div>

      {/* Logo / Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
      >
        {/* Ship Icon with Orbit Rings */}
        <motion.div
          className="mx-auto mb-6 relative"
          style={{ width: 140, height: 140 }}
        >
          {/* Orbit Ring 1 */}
          <div className="orbit-ring" style={{ inset: 0 }}>
            <div className="orbit-dot" />
          </div>
          {/* Orbit Ring 2 (reverse, smaller) */}
          <div className="orbit-ring" style={{ inset: 15, animationDirection: 'reverse', animationDuration: '12s', borderColor: 'rgba(232, 121, 249, 0.12)' }}>
            <div className="orbit-dot" style={{ background: '#e879f9', boxShadow: '0 0 8px rgba(232, 121, 249, 0.8)' }} />
          </div>

          {/* Ship Container */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: 30,
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(232, 121, 249, 0.1))',
              border: '2px solid rgba(34, 211, 238, 0.3)',
              boxShadow: '0 0 40px rgba(34, 211, 238, 0.2)',
            }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(34, 211, 238, 0.2)',
                '0 0 60px rgba(34, 211, 238, 0.4)',
                '0 0 40px rgba(34, 211, 238, 0.2)',
              ],
              y: [0, -6, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="42" height="42" viewBox="0 0 120 140" fill="none">
              <path d="M60 5 L85 50 L90 85 L80 95 L40 95 L30 85 L35 50 Z" fill="url(#tb)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M35 55 L10 90 L15 95 L35 80 Z" fill="#64748b" />
              <path d="M85 55 L110 90 L105 95 L85 80 Z" fill="#64748b" />
              <ellipse cx="60" cy="35" rx="12" ry="15" fill="#22d3ee" opacity="0.7" />
              <defs>
                <linearGradient id="tb" x1="60" y1="0" x2="60" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
          <span className="title-gradient">
            Nebula Number
          </span>
          <br />
          <span className="text-white">Navigator</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto">
          Count space objects and read charts to explore the galaxy!
        </p>
      </motion.div>

      {/* Mission Types Preview */}
      <motion.div
        className="flex gap-6 mb-12 justify-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { icon: '📊', label: 'Data Charts', color: '#fbbf24' },
        ].map((mission, i) => (
          <motion.div
            key={mission.label}
            className="glass-panel px-5 py-3 flex flex-col items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
          >
            <span className="text-lg">{mission.icon}</span>
            <span className="text-[10px] font-medium" style={{ color: mission.color }}>
              {mission.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Start Button — Pulsing Glow */}
      <motion.button
        className="px-8 py-4 rounded-2xl font-bold text-lg text-white cursor-pointer
                   flex items-center gap-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #22d3ee, #0891b2)',
          boxShadow: '0 0 30px rgba(34, 211, 238, 0.3), 0 4px 15px rgba(0,0,0,0.3)',
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: [
            '0 0 30px rgba(34, 211, 238, 0.3), 0 4px 15px rgba(0,0,0,0.3)',
            '0 0 50px rgba(34, 211, 238, 0.6), 0 4px 20px rgba(0,0,0,0.4)',
            '0 0 30px rgba(34, 211, 238, 0.3), 0 4px 15px rgba(0,0,0,0.3)',
          ],
        }}
        transition={{
          y: { type: 'spring', stiffness: 200, damping: 20, delay: 0.7 },
          opacity: { delay: 0.7 },
          boxShadow: { delay: 1.5, duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 60px rgba(34, 211, 238, 0.6), 0 4px 25px rgba(0,0,0,0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        id="start-game-btn"
      >
        {/* Button shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            transform: 'translateX(-100%)',
          }}
          animate={{ transform: ['translateX(-100%)', 'translateX(200%)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        Launch Mission
      </motion.button>

      {/* Instructions */}
      <motion.div
        className="mt-12 glass-panel px-6 py-4 max-w-sm text-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.9 }}
      >
        <p className="text-sm text-slate-400">
          <span className="text-cyan-400 font-semibold">How to play:</span> Count the space
          objects, read the chart, then drag the correct number orb!
        </p>
      </motion.div>

      {/* Robo greeting on title */}
      <motion.div
        className="fixed bottom-6 left-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 150 }}
      >
        <RoboCompanion emotion="idle" />
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════
//   MAIN APP COMPONENT
// ══════════════════════════════════════════

export default function GameApp() {
  // ─── Hooks ─── //
  const { play } = useSound();
  const { mouseX, mouseY } = useMouseParallax();
  const { combo, isWarpSpeed, registerCorrect, registerWrong, reset: resetCombo } = useCombo();

  // ─── Core Game State ─── //
  const [gameState, setGameState] = useState(GAME_STATES.TITLE);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0); // Tracks within-level question count

  // ─── Mission State ─── //
  const currentMissionType = useMemo(() => getMissionType(questionIndex), [questionIndex]);
  const [question, setQuestion] = useState(() => generateQuestion(currentMissionType, 1));
  const [prevMissionType, setPrevMissionType] = useState(currentMissionType);

  // ─── Animation State ─── //
  const [isAnswered, setIsAnswered] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [wrongOrbIndex, setWrongOrbIndex] = useState(null);
  const [showMissionBanner, setShowMissionBanner] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // ─── Companion State ─── //
  const [roboEmotion, setRoboEmotion] = useState('idle');
  const [roboMessage, setRoboMessage] = useState(null);
  const [showWarp, setShowWarp] = useState(false);

  // ─── Refs ─── //
  const gameAreaRef = useRef(null);
  const celebrationTimerRef = useRef(null);
  const wrongTimerRef = useRef(null);

  // ─── Idle Timer (only active during PLAYING) ─── //
  // ─── Helper: Show temporary message ─── //
  const showRoboMessage = useCallback((msg, duration = 2500) => {
    setRoboMessage(msg);
    setTimeout(() => setRoboMessage(null), duration);
  }, []);

  const { isIdle, forceReset: resetIdleTimer } = useIdleTimer(
    10000,
    gameState === GAME_STATES.PLAYING
  );

  useEffect(() => {
    if (isIdle && gameState === GAME_STATES.PLAYING) {
      setRoboEmotion('sleeping');
      showRoboMessage("Zzz... systems in standby... 😴");
      play('hint');
    }
  }, [isIdle, gameState, play, showRoboMessage]);

  // ─── Handle drag start (for companion) ─── //
  const handleDragStart = useCallback(() => {
    if (gameState === GAME_STATES.PLAYING) {
      setRoboEmotion('excited');
      showRoboMessage("Calculating trajectory... 📐");
      play('whoosh');
    }
  }, [gameState, play, showRoboMessage]);

  // Wake up robot when dragging starts
  useEffect(() => {
    if (!isIdle && gameState === GAME_STATES.PLAYING) {
      setRoboEmotion('idle');
    }
  }, [isIdle, gameState]);

  // ─── Window Blur/Focus Detection (Attention Management for ASD) ─── //
  useEffect(() => {
    const handleWindowBlur = () => {
      if (gameState === GAME_STATES.PLAYING) {
        setRoboEmotion('confused');
        showRoboMessage('Come back, navigator! 🛸', 4000);
      }
    };
    const handleWindowFocus = () => {
      if (gameState === GAME_STATES.PLAYING) {
        setRoboEmotion('excited');
        showRoboMessage('Welcome back! Let\'s continue! 🌟', 2500);
        setTimeout(() => {
          if (gameState === GAME_STATES.PLAYING) setRoboEmotion('idle');
        }, 2500);
      }
    };
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [gameState, showRoboMessage]);

  // ─── Generate Next Question ─── //
  const nextQuestion = useCallback((newLevel, newQuestionIndex) => {
    const mType = getMissionType(newQuestionIndex);
    const q = generateQuestion(mType, newLevel);
    setQuestion(q);
    setIsAnswered(false);
    setIsBoosting(false);
    setShowParticles(false);
    setWrongOrbIndex(null);
    resetIdleTimer();

    // Check if mission type changed → show banner
    if (mType !== getMissionType(newQuestionIndex - 1) && newQuestionIndex > 0) {
      setPrevMissionType(mType);
      setShowMissionBanner(true);
      setGameState(GAME_STATES.MISSION_INTRO);
      play('whoosh');
      setTimeout(() => {
        setShowMissionBanner(false);
        setGameState(GAME_STATES.PLAYING);
        setRoboEmotion('idle');
      }, MISSION_BANNER_DURATION);
    } else {
      setGameState(GAME_STATES.PLAYING);
      setRoboEmotion('idle');
    }
  }, [play, resetIdleTimer]);

  // ─── Start Game ─── //
  const handleStart = useCallback(() => {
    play('click');
    setLevel(1);
    setScore(0);
    setProgress(0);
    setQuestionIndex(0);
    resetCombo();

    // Show first mission banner
    const firstMission = getMissionType(0);
    setPrevMissionType(firstMission);
    setShowMissionBanner(true);
    setGameState(GAME_STATES.MISSION_INTRO);
    setRoboEmotion('excited');

    const q = generateQuestion(firstMission, 1);
    setQuestion(q);
    setIsAnswered(false);

    setTimeout(() => {
      setShowMissionBanner(false);
      setGameState(GAME_STATES.PLAYING);
      setRoboEmotion('idle');
    }, MISSION_BANNER_DURATION);
  }, [play, resetCombo]);

  // ─── Handle Answer Drop ─── //
  const handleDragEnd = useCallback((event, info, value) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    const dropZone = document.getElementById('answer-drop-zone');
    if (!dropZone) return;

    const dropRect = dropZone.getBoundingClientRect();
    const { point } = info;

    const isInDropZone =
      point.x >= dropRect.left - 30 &&
      point.x <= dropRect.right + 30 &&
      point.y >= dropRect.top - 30 &&
      point.y <= dropRect.bottom + 30;

    if (!isInDropZone) return;

    // ── Compare values (supports both numbers and strings like '<') ── //
    const isCorrect = String(value) === String(question.answer);

    if (isCorrect) {
      // ✅ CORRECT ANSWER
      play('success');
      registerCorrect();
      setIsAnswered(true);
      setIsBoosting(true);
      setShowParticles(true);
      setRoboEmotion('cheering');
      setScore((prev) => prev + level * 10);
      setScore((prev) => prev + level * 10);
      setGameState(GAME_STATES.CELEBRATING);
      showRoboMessage(combo > 1 ? `Combo x${combo}! Epic! 🔥` : "Target neutralized! 🎯");

      // Screen flash
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 600);

      // Check for combo sound
      if (combo + 1 >= 2) {
        setTimeout(() => play('combo'), 300);
      }

      celebrationTimerRef.current = setTimeout(() => {
        setShowParticles(false);
        setIsBoosting(false);

        const newProgress = progress + 1;
        setProgress(newProgress);

        if (newProgress >= QUESTIONS_PER_LEVEL) {
          // Level complete!
          play('levelUp');
          setGameState(GAME_STATES.LEVEL_COMPLETE);
          // Level complete!
          play('levelUp');
          setGameState(GAME_STATES.LEVEL_COMPLETE);
          setRoboEmotion('cheering');
          showRoboMessage("Sector cleared! Warping out! 🌌");
        } else {
          const newIdx = questionIndex + 1;
          setQuestionIndex(newIdx);
          nextQuestion(level, newIdx);
        }
      }, CELEBRATION_DURATION);
    } else {
      // ❌ WRONG ANSWER — gentle feedback
      play('error');
      registerWrong();
      const orbIdx = question.choices.findIndex((c) => String(c.value) === String(value));
      setWrongOrbIndex(orbIdx);
      setGameState(GAME_STATES.WRONG_FEEDBACK);
      setGameState(GAME_STATES.WRONG_FEEDBACK);
      setRoboEmotion('confused');
      showRoboMessage("Hull breach risk! Try again! ⚠️");

      // Screen shake
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      wrongTimerRef.current = setTimeout(() => {
        setWrongOrbIndex(null);
        setGameState(GAME_STATES.PLAYING);
        setRoboEmotion('idle');
      }, WRONG_FEEDBACK_DURATION);
    }
  }, [gameState, question, level, progress, questionIndex, combo, play, registerCorrect, registerWrong, nextQuestion]);

  // ─── Handle BUILD_CHART Submission (Interactive Bar Chart) ─── //
  const handleBuildChartSubmit = useCallback((builtHeights) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    // Compare each built height to the dataset target
    const isCorrect = question.dataset.every((d, i) => builtHeights[i] === d.count);

    if (isCorrect) {
      play('success');
      registerCorrect();
      setIsAnswered(true);
      setIsBoosting(true);
      setShowParticles(true);
      setRoboEmotion('cheering');
      setScore((prev) => prev + level * 15); // Bonus points for chart building
      setGameState(GAME_STATES.CELEBRATING);
      showRoboMessage(combo > 1 ? `Combo x${combo}! Chart Master! 🔥` : 'Perfect chart! 📊🎯');

      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 600);

      if (combo + 1 >= 2) {
        setTimeout(() => play('combo'), 300);
      }

      celebrationTimerRef.current = setTimeout(() => {
        setShowParticles(false);
        setIsBoosting(false);

        const newProgress = progress + 1;
        setProgress(newProgress);

        if (newProgress >= QUESTIONS_PER_LEVEL) {
          play('levelUp');
          setGameState(GAME_STATES.LEVEL_COMPLETE);
          setRoboEmotion('cheering');
          showRoboMessage('Sector cleared! Warping out! 🌌');
        } else {
          const newIdx = questionIndex + 1;
          setQuestionIndex(newIdx);
          nextQuestion(level, newIdx);
        }
      }, CELEBRATION_DURATION + 500); // Extra time for chart appreciation
    } else {
      play('error');
      registerWrong();
      setGameState(GAME_STATES.WRONG_FEEDBACK);
      setRoboEmotion('confused');
      showRoboMessage('Almost there! Check your bars! ⚠️');

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      wrongTimerRef.current = setTimeout(() => {
        setGameState(GAME_STATES.PLAYING);
        setRoboEmotion('idle');
      }, WRONG_FEEDBACK_DURATION);
    }
  }, [gameState, question, level, progress, questionIndex, combo, play, registerCorrect, registerWrong, nextQuestion, showRoboMessage]);

  // ─── Handle Next Level ─── //
  const handleNextLevel = useCallback(() => {
    play('warp');
    setShowWarp(true);
    setTimeout(() => {
      setGameState(GAME_STATES.PROGRESS_MAP);
      setShowWarp(false);
    }, 1500);
  }, [play]);

  // ─── Handle Progress Map Continue ─── //
  const handleContinueFromMap = useCallback(() => {
    play('click');
    const newLevel = level + 1;
    setLevel(newLevel);
    setProgress(0);
    // Keep questionIndex rolling globally so all 4 mission types rotate across levels
    const nextIdx = questionIndex + 1;
    setQuestionIndex(nextIdx);
    resetCombo();
    nextQuestion(newLevel, nextIdx);
  }, [level, questionIndex, play, resetCombo, nextQuestion]);

  // ─── Cleanup timers ─── //
  useEffect(() => {
    return () => {
      if (celebrationTimerRef.current) clearTimeout(celebrationTimerRef.current);
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
    };
  }, []);

  // ─── Determine which orb to hint ─── //
  const hintedOrbIndex = useMemo(() => {
    if (!isIdle || gameState !== GAME_STATES.PLAYING) return -1;
    return question.choices.findIndex((c) => c.isCorrect);
  }, [isIdle, gameState, question]);

  // Set robo to sleeping when idle
  useEffect(() => {
    if (isIdle && gameState === GAME_STATES.PLAYING) {
      setRoboEmotion('sleeping');
      play('hint');
    }
  }, [isIdle, gameState, play]);

  // ─── Render ─── //
  const isGameActive = gameState !== GAME_STATES.TITLE;

  // ─── Floating dust particles (generated once) ─── //
  const dustParticles = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 12 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.15 + 0.05,
      width: Math.random() * 2 + 1,
    })), []);

  return (
    <div className={`w-full h-full relative overflow-hidden ${isShaking ? 'screen-shake' : ''}`}>
      <WarpTransition isActive={showWarp} />

      {/* ── Aurora Borealis Effect ── */}
      <div className="aurora" />

      {/* ── Parallax Starfield ── */}
      <ParallaxStarfield
        mouseX={mouseX}
        mouseY={mouseY}
        isWarpSpeed={isWarpSpeed}
      />

      {/* ── Floating Dust Particles ── */}
      {dustParticles.map((p, i) => (
        <div
          key={`dust-${i}`}
          className="dust-particle"
          style={{
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
            width: p.width,
            height: p.width,
          }}
        />
      ))}

      {/* ── Cinematic Vignette ── */}
      <div className="vignette" />

      {/* ── Screen Flash (correct answer) ── */}
      {showFlash && <div className="screen-flash" key={Date.now()} />}

      {/* ── Title Screen ── */}
      <AnimatePresence>
        {gameState === GAME_STATES.TITLE && (
          <TitleScreen onStart={handleStart} />
        )}
      </AnimatePresence>

      {/* ── Mission Banner ── */}
      <MissionBanner
        missionType={prevMissionType}
        isVisible={showMissionBanner}
      />

      {/* ── Game Board (CSS Grid Layout) ── */}
      <AnimatePresence>
        {isGameActive && gameState !== GAME_STATES.TITLE && (
          <motion.div
            className="game-board"
            ref={gameAreaRef}
            onPointerDown={handleDragStart}
            initial={{ opacity: 0 }}
            animate={{ opacity: gameState === GAME_STATES.MISSION_INTRO ? 0.3 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Companion Area ── */}
            <div className="companion-area">
              <RoboCompanion emotion={roboEmotion} message={roboMessage} />
            </div>

            {/* ── Ship Area ── */}
            <div className="ship-area flex justify-center">
              <Spaceship isBoosting={isBoosting} />
            </div>

            {/* ── Equation Area ── */}
            <div className="equation-area w-full flex justify-center items-start" style={{ overflow: 'auto', minHeight: 0 }}>
              <EquationDisplay
                question={question}
                isAnswered={isAnswered}
                onBuildChartSubmit={handleBuildChartSubmit}
              />
            </div>

            {/* ── Orbs Area (hidden for BUILD_CHART — uses InteractiveBarChart instead) ── */}
            {!question.isBuildChart && (
            <div className="orbs-area w-full flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`orbs-${questionIndex}`}
                  className="flex gap-4 md:gap-6 justify-center"
                  variants={orbContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {question.choices.map((choice, i) => (
                    <NumberOrb
                      key={`${choice.value}-${i}`}
                      number={choice.value}
                      color={choice.color}
                      isCorrect={choice.isCorrect}
                      onDragEnd={handleDragEnd}
                      isWrong={wrongOrbIndex === i}
                      isHinted={hintedOrbIndex === i}
                      dragConstraints={gameAreaRef}
                      index={i}
                      isOperatorMode={question.isOperatorMode || question.isIconChoice}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HUD ── */}
      {isGameActive && gameState !== GAME_STATES.TITLE && (
        <CockpitHUD
          score={score}
          level={level}
          progress={progress}
          totalQuestions={QUESTIONS_PER_LEVEL}
          combo={combo}
          isWarpSpeed={isWarpSpeed}
          missionType={currentMissionType}
        />
      )}

      {/* ── Particle Explosion ── */}
      <ParticleExplosion isActive={showParticles} />

      {/* ── Level Complete Overlay ── */}
      <LevelComplete
        isVisible={gameState === GAME_STATES.LEVEL_COMPLETE}
        score={score}
        level={level}
        onNextLevel={handleNextLevel}
      />

      {/* ── Progress Map ── */}
      <ProgressMap
        isVisible={gameState === GAME_STATES.PROGRESS_MAP}
        currentLevel={level}
        onContinue={handleContinueFromMap}
      />
    </div>
  );
}
