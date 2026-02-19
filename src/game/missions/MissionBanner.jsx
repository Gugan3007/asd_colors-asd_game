/**
 * MissionBanner Component
 * 
 * Animated mission-type indicator that springs in when the mission changes.
 * Shows the mission name + icon + description, then auto-fades.
 * 
 * Uses AnimatePresence for clean mount/unmount transitions.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { MISSION_META } from './MissionEngine';

const COLOR_MAP = {
    cyan: { text: '#22d3ee', glow: 'rgba(34, 211, 238, 0.3)', bg: 'rgba(34, 211, 238, 0.08)' },
    magenta: { text: '#e879f9', glow: 'rgba(232, 121, 249, 0.3)', bg: 'rgba(232, 121, 249, 0.08)' },
    lime: { text: '#a3e635', glow: 'rgba(163, 230, 53, 0.3)', bg: 'rgba(163, 230, 53, 0.08)' },
    amber: { text: '#fbbf24', glow: 'rgba(251, 191, 36, 0.3)', bg: 'rgba(251, 191, 36, 0.08)' },
};

export default function MissionBanner({ missionType, isVisible }) {
    const meta = MISSION_META[missionType];
    if (!meta) return null;

    const colors = COLOR_MAP[meta.color] || COLOR_MAP.cyan;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="text-center"
                        initial={{ scale: 0.5, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 1.2, y: -30, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 250,
                            damping: 20,
                            mass: 0.8,
                        }}
                    >
                        {/* Mission Icon */}
                        <motion.div
                            className="text-6xl mb-4"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {meta.icon}
                        </motion.div>

                        {/* Mission Title */}
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold mb-2 uppercase tracking-wider"
                            style={{
                                color: colors.text,
                                textShadow: `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow}`,
                            }}
                            initial={{ letterSpacing: '0.5em', opacity: 0 }}
                            animate={{ letterSpacing: '0.15em', opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {meta.title}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className="text-slate-400 text-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {meta.description}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
