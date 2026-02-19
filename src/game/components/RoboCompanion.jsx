/**
 * RoboCompanion Component — Fixed & Polished
 * 
 * Fixes:
 *   - Arms are now positioned properly (not using motion.g with broken transform-origin)
 *   - Arms use individual rects with correct pivot via translate+rotate
 *   - Cheering animation simplified (no conflicting variants)
 *   - Smoother transitions between emotional states
 *   - Removed animated SVG `r` attribute (causes errors)
 * 
 * Emotional States:
 *   sleeping  — Closed eyes, gentle breathing
 *   idle      — Blinking, subtle float
 *   excited   — Bouncing, open mouth  
 *   cheering  — Arms up, starry eyes, star above head
 *   confused  — Tilted head, "?" bubble
 */

import { motion, AnimatePresence } from 'framer-motion';

// ─── Body Animation Variants ─── //
const bodyVariants = {
    sleeping: {
        y: [0, -3, 0],
        rotate: 0,
        scale: 0.95,
        transition: {
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.5 },
        },
    },
    idle: {
        y: [0, -6, 0],
        rotate: 0,
        scale: 1,
        transition: {
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 200, damping: 15 },
        },
    },
    excited: {
        y: [0, -10, 0, -6, 0],
        rotate: [0, -2, 2, -1, 0],
        scale: 1.02,
        transition: {
            y: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 0.6, repeat: Infinity },
        },
    },
    cheering: {
        y: [0, -14, 0, -10, 0],
        rotate: [0, -3, 3, -2, 0],
        scale: 1.05,
        transition: {
            y: { duration: 0.5, repeat: 3, ease: 'easeInOut' },
            rotate: { duration: 0.5, repeat: 3 },
        },
    },
    confused: {
        y: 0,
        rotate: 12,
        scale: 1,
        transition: {
            rotate: { type: 'spring', stiffness: 200, damping: 12 },
        },
    },
};

export default function RoboCompanion({ emotion = 'idle', message }) {
    // Arm rotation based on emotion
    const getLeftArmRotation = () => {
        switch (emotion) {
            case 'cheering': return -40;
            case 'excited': return -20;
            case 'confused': return 10;
            case 'sleeping': return 0;
            default: return 0;
        }
    };

    const getRightArmRotation = () => {
        switch (emotion) {
            case 'cheering': return 40;
            case 'excited': return 20;
            case 'confused': return -10;
            case 'sleeping': return 0;
            default: return 0;
        }
    };

    return (
        <motion.div
            className="relative select-none"
            style={{ width: 90, height: 110 }}
            variants={bodyVariants}
            animate={emotion}
        >
            {/* ─── Floating Indicators & Speech Bubble ─── */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        key="msg-bubble"
                        className="speech-bubble"
                        style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 12 }}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {message}
                    </motion.div>
                )}

                {emotion === 'cheering' && (
                    <motion.div
                        key="star"
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-xl"
                        initial={{ scale: 0, y: 10, opacity: 0 }}
                        animate={{ scale: [1, 1.3, 1], y: 0, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    >
                        ⭐
                    </motion.div>
                )}
                {emotion === 'confused' && (
                    <motion.div
                        key="question"
                        className="absolute -top-6 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                            background: 'rgba(251, 191, 36, 0.2)',
                            border: '1.5px solid rgba(251, 191, 36, 0.4)',
                            color: '#fbbf24',
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: [0, 8, -8, 0] }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    >
                        ?
                    </motion.div>
                )}
            </AnimatePresence>

            <svg
                width="90"
                height="110"
                viewBox="0 0 90 110"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="roboBodyGrad" x1="45" y1="20" x2="45" y2="85" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="roboHeadGrad" x1="45" y1="5" x2="45" y2="42" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <radialGradient id="eyeGlowGrad">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </radialGradient>
                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* ── Antenna ── */}
                <line x1="45" y1="10" x2="45" y2="3" stroke="#94a3b8" strokeWidth="2" />
                <motion.circle
                    cx="45"
                    cy="3"
                    r="3"
                    fill="#22d3ee"
                    filter="url(#softGlow)"
                    animate={{
                        opacity: emotion === 'sleeping' ? [0.3, 0.5, 0.3] : [0.6, 1, 0.6],
                        scale: emotion === 'cheering' ? [1, 1.4, 1] : 1,
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* ── Head ── */}
                <rect x="20" y="8" width="50" height="34" rx="10" fill="url(#roboHeadGrad)" stroke="#94a3b8" strokeWidth="0.8" />

                {/* ── Eyes ── */}
                {emotion === 'sleeping' ? (
                    <>
                        <path d="M30 25 Q35 21 40 25" stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M50 25 Q55 21 60 25" stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </>
                ) : emotion === 'cheering' ? (
                    <>
                        <text x="35" y="28" fontSize="10" textAnchor="middle" fill="#22d3ee">✦</text>
                        <text x="55" y="28" fontSize="10" textAnchor="middle" fill="#22d3ee">✦</text>
                    </>
                ) : (
                    <>
                        <motion.ellipse
                            cx="35"
                            cy="24"
                            rx={emotion === 'excited' ? 4.5 : 3.5}
                            ry={emotion === 'excited' ? 5.5 : 4.5}
                            fill="url(#eyeGlowGrad)"
                            animate={{ scaleY: emotion === 'confused' ? [1, 0.6, 1] : [1, 1, 0.15, 1] }}
                            transition={{
                                duration: emotion === 'confused' ? 2 : 4,
                                repeat: Infinity,
                                repeatDelay: emotion === 'confused' ? 0 : 2,
                            }}
                        />
                        <motion.ellipse
                            cx="55"
                            cy="24"
                            rx={emotion === 'excited' ? 4.5 : 3.5}
                            ry={emotion === 'excited' ? 5.5 : 4.5}
                            fill="url(#eyeGlowGrad)"
                            animate={{ scaleY: emotion === 'confused' ? [1, 0.6, 1] : [1, 1, 0.15, 1] }}
                            transition={{
                                duration: emotion === 'confused' ? 2 : 4,
                                repeat: Infinity,
                                repeatDelay: emotion === 'confused' ? 0 : 2,
                                delay: 0.1,
                            }}
                        />
                        {/* Eye highlights */}
                        <circle cx="37" cy="22" r="1.2" fill="rgba(255,255,255,0.6)" />
                        <circle cx="57" cy="22" r="1.2" fill="rgba(255,255,255,0.6)" />
                    </>
                )}

                {/* ── Mouth ── */}
                {emotion === 'cheering' || emotion === 'excited' ? (
                    <ellipse cx="45" cy="35" rx="5" ry="3.5" fill="#0f172a" stroke="#22d3ee" strokeWidth="0.6" />
                ) : emotion === 'confused' ? (
                    <path d="M39 35 Q42 32 45 35 Q48 38 51 35" stroke="#64748b" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                ) : (
                    <path d="M39 34 Q45 39 51 34" stroke="#64748b" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                )}

                {/* ── LEFT ARM — Properly positioned ── */}
                <motion.rect
                    x="8"
                    y="48"
                    width="10"
                    height="20"
                    rx="5"
                    fill="#64748b"
                    stroke="#94a3b8"
                    strokeWidth="0.5"
                    animate={{ rotate: getLeftArmRotation() }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ transformOrigin: '18px 48px' }}
                />
                {/* Left Hand */}
                <motion.circle
                    cx="13"
                    cy="70"
                    r="4"
                    fill="#94a3b8"
                    animate={{
                        cy: emotion === 'cheering' ? 56 : emotion === 'excited' ? 62 : 70,
                        cx: emotion === 'cheering' ? 8 : emotion === 'excited' ? 10 : 13,
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                />

                {/* ── RIGHT ARM — Properly positioned ── */}
                <motion.rect
                    x="72"
                    y="48"
                    width="10"
                    height="20"
                    rx="5"
                    fill="#64748b"
                    stroke="#94a3b8"
                    strokeWidth="0.5"
                    animate={{ rotate: getRightArmRotation() }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ transformOrigin: '72px 48px' }}
                />
                {/* Right Hand */}
                <motion.circle
                    cx="77"
                    cy="70"
                    r="4"
                    fill="#94a3b8"
                    animate={{
                        cy: emotion === 'cheering' ? 56 : emotion === 'excited' ? 62 : 70,
                        cx: emotion === 'cheering' ? 82 : emotion === 'excited' ? 80 : 77,
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                />

                {/* ── Body ── */}
                <rect x="25" y="44" width="40" height="32" rx="8" fill="url(#roboBodyGrad)" stroke="#64748b" strokeWidth="0.6" />

                {/* Chest light */}
                <motion.circle
                    cx="45"
                    cy="55"
                    r="3.5"
                    fill={emotion === 'cheering' ? '#a3e635' : emotion === 'confused' ? '#fbbf24' : '#22d3ee'}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                {/* Chest panel lines */}
                <rect x="35" y="63" width="20" height="1.5" rx="0.75" fill="#334155" />
                <rect x="37" y="67" width="16" height="1.5" rx="0.75" fill="#334155" />

                {/* ── Legs ── */}
                <rect x="30" y="78" width="11" height="14" rx="4" fill="#475569" />
                <rect x="49" y="78" width="11" height="14" rx="4" fill="#475569" />

                {/* Feet glow */}
                <motion.rect
                    x="30" y="89" width="11" height="3" rx="1.5"
                    fill="#22d3ee" opacity={0.3}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.rect
                    x="49" y="89" width="11" height="3" rx="1.5"
                    fill="#22d3ee" opacity={0.3}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
            </svg>
        </motion.div>
    );
}
