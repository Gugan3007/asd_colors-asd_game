import { motion } from 'framer-motion';

/**
 * Spaceship Component
 * The hero visual element. Features:
 * - Idle floating animation (gentle bob)
 * - Boost/glow state on correct answer
 * - Engine exhaust particle trail
 * - SVG-based for crisp rendering at any size
 */

// Framer Motion variants for the ship states
const shipVariants = {
    idle: {
        y: [0, -8, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
    boost: {
        y: -30,
        scale: 1.08,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 15,
        },
    },
};

// Engine exhaust glow variants
const exhaustVariants = {
    idle: {
        scaleY: [1, 1.3, 1],
        opacity: [0.6, 0.9, 0.6],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
    boost: {
        scaleY: 2.2,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 10,
        },
    },
};

export default function Spaceship({ isBoosting = false }) {
    return (
        <motion.div
            className="relative flex flex-col items-center"
            variants={shipVariants}
            animate={isBoosting ? 'boost' : 'idle'}
        >
            {/* Glow halo behind ship during boost */}
            <motion.div
                className="absolute -inset-8 rounded-full"
                animate={{
                    opacity: isBoosting ? 0.5 : 0,
                    scale: isBoosting ? 1.3 : 0.8,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(163, 230, 53, 0.1) 50%, transparent 70%)',
                }}
            />

            {/* Ship SVG */}
            <svg
                width="120"
                height="140"
                viewBox="0 0 120 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            >
                {/* Ship body */}
                <defs>
                    <linearGradient id="shipBody" x1="60" y1="0" x2="60" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="50%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="shipAccent" x1="60" y1="20" x2="60" y2="80" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                    <linearGradient id="cockpit" x1="60" y1="15" x2="60" y2="50" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <filter id="shipGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Main hull */}
                <path
                    d="M60 5 L85 50 L90 85 L80 95 L40 95 L30 85 L35 50 Z"
                    fill="url(#shipBody)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                />

                {/* Wing left */}
                <path
                    d="M35 55 L10 90 L15 95 L35 80 Z"
                    fill="url(#shipBody)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.8"
                />

                {/* Wing right */}
                <path
                    d="M85 55 L110 90 L105 95 L85 80 Z"
                    fill="url(#shipBody)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.8"
                />

                {/* Accent stripes */}
                <path
                    d="M50 30 L48 70 L52 70 Z"
                    fill="url(#shipAccent)"
                    opacity="0.8"
                />
                <path
                    d="M70 30 L72 70 L68 70 Z"
                    fill="url(#shipAccent)"
                    opacity="0.8"
                />

                {/* Cockpit window */}
                <ellipse
                    cx="60"
                    cy="35"
                    rx="12"
                    ry="15"
                    fill="url(#cockpit)"
                    opacity="0.9"
                    filter="url(#shipGlow)"
                />
                <ellipse
                    cx="60"
                    cy="33"
                    rx="7"
                    ry="8"
                    fill="rgba(255,255,255,0.3)"
                />

                {/* Engine pods */}
                <rect x="38" y="90" width="10" height="12" rx="2" fill="#334155" stroke="#22d3ee" strokeWidth="0.8" />
                <rect x="72" y="90" width="10" height="12" rx="2" fill="#334155" stroke="#22d3ee" strokeWidth="0.8" />
                <rect x="55" y="92" width="10" height="10" rx="2" fill="#334155" stroke="#22d3ee" strokeWidth="0.8" />
            </svg>

            {/* Engine exhaust flames */}
            <motion.div
                className="flex gap-2 -mt-2 relative z-0"
                variants={exhaustVariants}
                animate={isBoosting ? 'boost' : 'idle'}
                style={{ originY: 0 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="rounded-full"
                        style={{
                            width: i === 1 ? 12 : 8,
                            height: i === 1 ? 28 : 20,
                            background: `linear-gradient(to bottom, #22d3ee, #0891b2, transparent)`,
                            filter: 'blur(2px)',
                        }}
                        animate={{
                            height: isBoosting
                                ? [i === 1 ? 45 : 35, i === 1 ? 55 : 42, i === 1 ? 45 : 35]
                                : [i === 1 ? 28 : 20, i === 1 ? 35 : 25, i === 1 ? 28 : 20],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 0.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}
