/**
 * ProgressMap Component
 * 
 * Shown between levels: a dotted path from Planet to Planet.
 * Ship icon slides to the current planet position.
 * 
 * Planets have names, colors, and visual variety.
 * Uses spring animation for smooth ship movement.
 */

import { motion, AnimatePresence } from 'framer-motion';

// ─── Planet Definitions ─── //
const PLANETS = [
    { name: 'Luna Station', color: '#22d3ee', size: 32, emoji: '🌙' },
    { name: 'Nova Prime', color: '#e879f9', size: 36, emoji: '🪐' },
    { name: 'Emerald Nebula', color: '#a3e635', size: 34, emoji: '💚' },
    { name: 'Solar Forge', color: '#fbbf24', size: 38, emoji: '☀️' },
    { name: 'Crimson Drift', color: '#fb7185', size: 35, emoji: '🔴' },
    { name: 'Deep Void', color: '#c084fc', size: 40, emoji: '🌌' },
    { name: 'Starweave', color: '#67e8f9', size: 33, emoji: '⭐' },
    { name: 'Infinity Gate', color: '#f9a8d4', size: 42, emoji: '🌀' },
];

export default function ProgressMap({ isVisible, currentLevel, onContinue }) {
    const fromIndex = Math.max(0, currentLevel - 2); // Previous planet
    const toIndex = Math.max(0, currentLevel - 1);   // Current planet

    // Show 4 planets at a time centered around current position
    const startIdx = Math.max(0, toIndex - 1);
    const visiblePlanets = PLANETS.slice(startIdx, startIdx + 4).map((p, i) => ({
        ...p,
        index: startIdx + i,
    }));

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 w-full max-w-lg"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                    >
                        {/* Title */}
                        <motion.h2
                            className="text-center text-2xl md:text-3xl font-bold text-white mb-8"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Charting Course...
                            </span>
                        </motion.h2>

                        {/* Planet Path */}
                        <div className="relative flex items-center justify-between px-4 mb-10">
                            {/* Connection Line */}
                            <div
                                className="absolute top-1/2 left-8 right-8 h-0.5 -translate-y-1/2"
                                style={{
                                    background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 8px, transparent 8px, transparent 16px)',
                                }}
                            />

                            {/* Planets */}
                            {visiblePlanets.map((planet, i) => {
                                const isPast = planet.index < toIndex;
                                const isCurrent = planet.index === toIndex;
                                const isFuture = planet.index > toIndex;

                                return (
                                    <motion.div
                                        key={planet.name}
                                        className="relative z-10 flex flex-col items-center"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                            delay: 0.4 + i * 0.15,
                                        }}
                                    >
                                        {/* Ship indicator on current planet */}
                                        {isCurrent && (
                                            <motion.div
                                                className="absolute -top-10 text-2xl"
                                                initial={{ y: -30, opacity: 0 }}
                                                animate={{ y: [0, -6, 0], opacity: 1 }}
                                                transition={{
                                                    y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                                                    opacity: { delay: 0.8 },
                                                }}
                                            >
                                                🚀
                                            </motion.div>
                                        )}

                                        {/* Planet orb */}
                                        <motion.div
                                            className="rounded-full flex items-center justify-center text-lg"
                                            style={{
                                                width: planet.size,
                                                height: planet.size,
                                                background: isFuture
                                                    ? 'rgba(255,255,255,0.08)'
                                                    : `radial-gradient(circle at 35% 35%, ${planet.color}88, ${planet.color}44)`,
                                                border: `2px solid ${isFuture ? 'rgba(255,255,255,0.15)' : planet.color}`,
                                                boxShadow: isCurrent
                                                    ? `0 0 20px ${planet.color}66, 0 0 40px ${planet.color}22`
                                                    : 'none',
                                                opacity: isFuture ? 0.5 : 1,
                                            }}
                                            animate={isCurrent ? {
                                                boxShadow: [
                                                    `0 0 20px ${planet.color}66, 0 0 40px ${planet.color}22`,
                                                    `0 0 30px ${planet.color}88, 0 0 60px ${planet.color}44`,
                                                    `0 0 20px ${planet.color}66, 0 0 40px ${planet.color}22`,
                                                ],
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {!isFuture && planet.emoji}
                                        </motion.div>

                                        {/* Planet name */}
                                        <p
                                            className="text-[10px] mt-2 text-center max-w-16 leading-tight font-medium"
                                            style={{
                                                color: isFuture ? 'rgba(255,255,255,0.3)' : isPast ? 'rgba(255,255,255,0.5)' : planet.color,
                                            }}
                                        >
                                            {planet.name}
                                        </p>

                                        {/* Checkmark for completed planets */}
                                        {isPast && (
                                            <motion.div
                                                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-lime-500 flex items-center justify-center"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.6 + i * 0.1 }}
                                            >
                                                <span className="text-[8px] text-white font-bold">✓</span>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Continue Button */}
                        <motion.div
                            className="flex justify-center"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <motion.button
                                className="px-8 py-4 rounded-2xl font-bold text-lg text-white cursor-pointer
                           flex items-center gap-3"
                                style={{
                                    background: 'linear-gradient(135deg, #22d3ee, #0891b2)',
                                    boxShadow: '0 0 25px rgba(34, 211, 238, 0.3)',
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)',
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onContinue}
                                id="progress-continue-btn"
                            >
                                <span>Continue to {PLANETS[toIndex]?.name || 'Next Planet'}</span>
                                <span>→</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
