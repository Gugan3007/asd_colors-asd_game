import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Trophy } from 'lucide-react';

/**
 * LevelComplete Overlay
 * Displays when all questions in a level are answered correctly.
 * 
 * Framer Motion Features:
 * - AnimatePresence: handles mount/unmount transitions
 * - High-damping spring: smooth, satisfying entrance
 * - Staggered children: elements cascade in
 * - Scale + rotate for playful feel
 */

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3, delay: 0.2 },
    },
};

const cardVariants = {
    hidden: {
        scale: 0.5,
        opacity: 0,
        y: 60,
        rotate: -5,
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 18,   // High damping for smooth, satisfying settle
            mass: 1.2,
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        y: -40,
        transition: { duration: 0.3 },
    },
};

const childVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    },
};

// Continuous confetti rain
const ConfettiRain = () => {
    // Generate static random values for 30 particles
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
        color: ['#22d3ee', '#e879f9', '#a3e635'][i % 3],
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute top-0 w-2 h-2 rounded-sm"
                    style={{ left: `${p.x}%`, background: p.color }}
                    animate={{ y: '110vh', rotate: 360 }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

export default function LevelComplete({ isVisible, score, level, onNextLevel }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Confetti Rain Background */}
                    <ConfettiRain />

                    {/* Card */}
                    <motion.div
                        className="relative glass-panel-strong p-8 md:p-12 max-w-sm w-full text-center overflow-hidden"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        id="level-complete-card"
                    >
                        {/* Decorative glow */}
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-30 blur-xl -z-10"
                            style={{
                                background: 'linear-gradient(135deg, #22d3ee, #e879f9, #a3e635)',
                            }}
                        />

                        {/* Trophy icon */}
                        <div className="w-full flex justify-center mb-6 relative z-10">
                            <motion.div
                                className="w-24 h-24 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05))',
                                    border: '2px solid rgba(251, 191, 36, 0.4)',
                                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
                                }}
                                variants={childVariants}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, -5, 5, 0],
                                    boxShadow: [
                                        '0 0 30px rgba(251, 191, 36, 0.3)',
                                        '0 0 50px rgba(251, 191, 36, 0.5)',
                                        '0 0 30px rgba(251, 191, 36, 0.3)',
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Trophy className="w-12 h-12 text-amber-400" fill="currentColor" />
                            </motion.div>
                        </div>

                        {/* Star Rating (Animated) */}
                        <div className="flex justify-center gap-2 mb-4 relative z-10">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    transition={{
                                        type: 'spring', stiffness: 200, damping: 12,
                                        delay: 0.8 + (i * 0.2)
                                    }}
                                >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </motion.div>
                            ))}
                        </div>

                        {/* Title */}
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-lime-400 bg-clip-text text-transparent mb-1 relative z-10"
                            variants={childVariants}
                        >
                            Amazing!
                        </motion.h2>

                        <motion.p
                            className="text-slate-400 text-lg mb-6 relative z-10"
                            variants={childVariants}
                        >
                            Level {level} Complete!
                        </motion.p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                            {/* Score */}
                            <motion.div className="glass-panel py-4 px-4 flex flex-col items-center justify-center gap-1" variants={childVariants}>
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Score</span>
                                <span className="text-2xl font-black text-amber-400 drop-shadow-md">{score}</span>
                            </motion.div>
                            {/* Accuracy (Mock) */}
                            <motion.div className="glass-panel py-4 px-4 flex flex-col items-center justify-center gap-1" variants={childVariants}>
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Accuracy</span>
                                <span className="text-2xl font-black text-lime-400 drop-shadow-md">100%</span>
                            </motion.div>
                        </div>

                        {/* Next Level button with squish effect */}
                        <motion.button
                            className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-white
                         flex items-center justify-center gap-3 cursor-pointer
                         transition-colors"
                            style={{
                                background: 'linear-gradient(135deg, #22d3ee, #0891b2)',
                                boxShadow: '0 0 25px rgba(34, 211, 238, 0.3)',
                            }}
                            variants={childVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)',
                            }}
                            whileTap={{ scale: 0.95 }}  // Squish on click
                            onClick={onNextLevel}
                            id="next-level-btn"
                        >
                            <span>Warp to Next Planet</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
