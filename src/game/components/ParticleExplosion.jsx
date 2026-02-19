import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ParticleExplosion Component — Lightweight
 * Reduced to 18 burst-only particles for smooth performance.
 */

const PARTICLE_COLORS = [
    '#22d3ee', '#e879f9', '#a3e635', '#fbbf24', '#fb7185',
];

function generateParticles(count = 18) {
    return Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const velocity = 80 + Math.random() * 160;
        return {
            id: i,
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity + 80,
            rotation: Math.random() * 360 - 180,
            size: 6 + Math.random() * 6,
            color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
            isCircle: Math.random() > 0.5,
            delay: Math.random() * 0.08,
            duration: 0.7 + Math.random() * 0.4,
        };
    });
}

export default function ParticleExplosion({ isActive, onComplete }) {
    const particles = useMemo(() => (isActive ? generateParticles(18) : []), [isActive]);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isActive && (
                <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute"
                            style={{ top: '50%', left: '50%' }}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{
                                x: p.x,
                                y: p.y,
                                scale: [0, 1, 0.6],
                                rotate: p.rotation,
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                        >
                            <div style={{
                                width: p.size,
                                height: p.size,
                                borderRadius: p.isCircle ? '50%' : '2px',
                                background: p.color,
                                transform: p.isCircle ? undefined : 'rotate(45deg)',
                            }} />
                        </motion.div>
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
}
