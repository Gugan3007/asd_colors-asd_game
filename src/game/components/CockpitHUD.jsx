/**
 * CockpitHUD Component — Glassmorphism 2.0
 * 
 * Diegetic-style heads-up display with:
 * - Holographic pulsing border glow (animated conic-gradient)
 * - Combo counter display
 * - Mission type indicator
 * - Score / Level / Fuel gauge
 * 
 * ASD Considerations:
 * - Anchored to screen edges to keep center clear
 * - Consistent positioning (no layout shifts)
 * - Large readable numbers
 * - Color-coded information
 */

import { motion } from 'framer-motion';
import { Fuel, Star, Zap, Gauge, Rocket, Flame } from 'lucide-react';
import { MISSION_META } from '../missions/MissionEngine';

const hudVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 25,
            delay: 0.2,
        },
    },
};

const fuelBarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 25,
            delay: 0.4,
        },
    },
};

/**
 * HoloPanel — Glassmorphic panel with animated holographic border
 */
function HoloPanel({ children, className = '', id }) {
    return (
        <motion.div
            className={`relative ${className}`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 }}
            id={id}
        >
            {/* Animated holographic border glow */}
            <div className="holo-border absolute -inset-[1px] rounded-2xl opacity-60 -z-10" />
            {/* Glass panel */}
            <div className="glass-panel px-4 py-3 relative z-10 flex items-center gap-3">
                {children}
            </div>
        </motion.div>
    );
}

export default function CockpitHUD({
    score,
    level,
    progress,
    totalQuestions,
    combo = 0,
    isWarpSpeed = false,
    missionType,
}) {
    const fuelPercent = (progress / totalQuestions) * 100;
    const missionMeta = missionType ? MISSION_META[missionType] : null;

    return (
        <>
            {/* ─── Top-left: Score ─── */}
            <HoloPanel className="fixed top-4 left-4 z-[60]" id="hud-score">
                <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                        background: 'rgba(251, 191, 36, 0.15)',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                    }}
                    animate={{}}
                    transition={{}}
                >
                    <Star className="w-5 h-5 text-amber-400" fill="currentColor" />
                </motion.div>
                <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Score</p>
                    <motion.p
                        className="text-2xl font-bold text-amber-400 leading-none"
                        key={score}
                        initial={{ scale: 1.5, color: '#fef08a' }}
                        animate={{ scale: 1, color: '#fbbf24' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        {score}
                    </motion.p>
                </div>
            </HoloPanel>

            {/* ─── Top-right: Level ─── */}
            <HoloPanel className="fixed top-4 right-4 z-[60]" id="hud-level">
                <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Level</p>
                    <motion.p
                        className="text-2xl font-bold text-cyan-400 leading-none"
                        key={level}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        {level}
                    </motion.p>
                </div>
                <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                        background: 'rgba(34, 211, 238, 0.15)',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                    }}
                >
                    <Rocket className="w-5 h-5 text-cyan-400" />
                </motion.div>
            </HoloPanel>

            {/* ─── Top-center: Combo Counter (when active) ─── */}
            {combo >= 2 && (
                <motion.div
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-40"
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                    <div className="relative">
                        <div className="holo-border absolute -inset-[1px] rounded-2xl opacity-80 -z-10" />
                        <div className="glass-panel px-5 py-2 flex items-center gap-2">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <Flame className="w-5 h-5 text-orange-400" fill="currentColor" />
                            </motion.div>
                            <motion.span
                                className="text-xl font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                                key={combo}
                                initial={{ scale: 2 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                            >
                                x{combo}
                            </motion.span>
                            {isWarpSpeed && (
                                <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold">
                                    WARP!
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ─── Bottom: Fuel Gauge with Mission Indicator ─── */}
            <motion.div
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md"
                variants={fuelBarVariants}
                initial="hidden"
                animate="visible"
                id="hud-fuel"
            >
                <div className="relative">
                    <div className="holo-border absolute -inset-[1px] rounded-2xl opacity-50 -z-10" />
                    <div className="glass-panel px-5 py-3">
                        {/* Mission type + fuel header */}
                        <div className="flex items-center gap-3 mb-2">
                            {/* Mission badge */}
                            {missionMeta && (
                                <motion.div
                                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                    key={missionType}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <span className="text-sm">{missionMeta.icon}</span>
                                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                                        {missionMeta.title}
                                    </span>
                                </motion.div>
                            )}

                            <div className="flex-1" />

                            <Fuel className="w-4 h-4 text-lime-400" />
                            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                                Warp Fuel
                            </p>
                            <span className="text-xs font-medium text-lime-400">
                                {progress}/{totalQuestions}
                            </span>
                        </div>

                        {/* Fuel bar track */}
                        <div className="fuel-gauge-track h-3 w-full">
                            <motion.div
                                className="fuel-gauge-fill h-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${fuelPercent}%` }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 80,
                                    damping: 15,
                                }}
                            />
                        </div>

                        {/* Status text */}
                        <div className="flex items-center justify-between mt-1.5">
                            <div className="flex items-center gap-1">
                                <Zap className="w-3 h-3 text-cyan-400" />
                                <span className="text-[10px] text-slate-500">
                                    {fuelPercent < 100 ? 'Charging...' : 'READY TO WARP!'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Gauge className="w-3 h-3 text-slate-500" />
                                <span className="text-[10px] text-slate-500">
                                    {Math.round(fuelPercent)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
