/**
 * NumberOrb Component — Fixed & Polished
 * 
 * Fixes:
 *   - Removed magnetic hover (was fighting with drag causing shaking)
 *   - Smoother drag with increased dragElastic
 *   - Reduced shake intensity for wrong answers
 *   - Cleaner hover/tap states
 *   - Idle hint is a gentle glow pulse (no scale jitter)
 */

import { motion } from 'framer-motion';

const ORB_COLORS = {
    cyan: {
        bg: 'linear-gradient(135deg, rgba(34, 211, 238, 0.25), rgba(34, 211, 238, 0.08))',
        border: '#22d3ee',
        text: '#22d3ee',
        glow: 'rgba(34, 211, 238, 0.4)',
    },
    magenta: {
        bg: 'linear-gradient(135deg, rgba(232, 121, 249, 0.25), rgba(232, 121, 249, 0.08))',
        border: '#e879f9',
        text: '#e879f9',
        glow: 'rgba(232, 121, 249, 0.4)',
    },
    lime: {
        bg: 'linear-gradient(135deg, rgba(163, 230, 53, 0.25), rgba(163, 230, 53, 0.08))',
        border: '#a3e635',
        text: '#a3e635',
        glow: 'rgba(163, 230, 53, 0.4)',
    },
    amber: {
        bg: 'linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(251, 191, 36, 0.08))',
        border: '#fbbf24',
        text: '#fbbf24',
        glow: 'rgba(251, 191, 36, 0.4)',
    },
    rose: {
        bg: 'linear-gradient(135deg, rgba(251, 113, 133, 0.25), rgba(251, 113, 133, 0.08))',
        border: '#fb7185',
        text: '#fb7185',
        glow: 'rgba(251, 113, 133, 0.4)',
    },
};

// Stagger variant for orbs container
export const orbContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.6,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.08,
            staggerDirection: -1,
        },
    },
};

// Individual orb entrance
export const orbVariants = {
    hidden: {
        y: 60,
        opacity: 0,
        scale: 0.6,
    },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 22,
        },
    },
    exit: {
        y: 40,
        opacity: 0,
        scale: 0.6,
        transition: { duration: 0.25 },
    },
};

// Gentle shake for wrong answers (reduced intensity)
const shakeVariants = {
    shake: {
        x: [0, -8, 8, -5, 5, -2, 0],
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

export default function NumberOrb({
    number,
    color = 'cyan',
    isCorrect,
    onDragEnd,
    isWrong,
    isHinted,
    dragConstraints,
    index,
    isOperatorMode = false,
}) {
    const orbColor = ORB_COLORS[color] || ORB_COLORS.cyan;

    return (
        <motion.div
            className="relative"
            variants={orbVariants}
            layout
        >
            {/* Outer glow ring — static, no animation */}
            <div
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${orbColor.glow} 0%, transparent 70%)`,
                    opacity: isHinted ? 0.5 : 0.25,
                }}
            />

            {/* Hint ring — only when idle hinted */}
            {isHinted && (
                <div
                    className="absolute -inset-1 rounded-full pointer-events-none"
                    style={{
                        border: `2px solid ${orbColor.border}`,
                        opacity: 0.5,
                        animation: 'pulse-glow 1.5s ease-in-out infinite',
                    }}
                />
            )}

            {/* Draggable orb */}
            <motion.div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
          select-none touch-none cursor-grab active:cursor-grabbing overflow-hidden"
                style={{
                    background: orbColor.bg,
                    border: `2px solid ${orbColor.border}`,
                    boxShadow: `0 0 18px ${orbColor.glow}, inset 0 0 12px ${orbColor.glow}`,
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                }}
                drag
                dragConstraints={dragConstraints}
                dragElastic={0.1}
                dragSnapToOrigin
                dragMomentum={false}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                onDragEnd={(event, info) => onDragEnd?.(event, info, number)}
                whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 35px ${orbColor.glow}, inset 0 0 25px ${orbColor.glow}`,
                    zIndex: 10,
                }}
                whileTap={{ scale: 0.9 }}
                whileDrag={{
                    scale: 1.15,
                    boxShadow: `0 0 50px ${orbColor.glow}, inset 0 0 30px ${orbColor.glow}`,
                    zIndex: 50,
                    cursor: 'grabbing',
                }}
                animate={isWrong ? 'shake' : undefined}
                variants={shakeVariants}
                role="button"
                tabIndex={0}
                id={`orb-${number}-${index}`}
            >
                {/* 3D Depth Highlight */}
                <div className="orb-depth-highlight" />

                {/* Inner shimmer ring */}
                <div
                    className="absolute inset-1.5 rounded-full pointer-events-none"
                    style={{
                        border: `1px solid ${orbColor.border}`,
                        opacity: 0.2,
                    }}
                />

                {/* Number/Operator text */}
                <span
                    className="relative z-10"
                    style={{
                        color: orbColor.text,
                        textShadow: `0 0 8px ${orbColor.glow}`,
                        fontSize: isOperatorMode ? '1.75rem' : '1.5rem',
                        fontWeight: 700,
                    }}
                >
                    {number}
                </span>
            </motion.div>
        </motion.div>
    );
}
