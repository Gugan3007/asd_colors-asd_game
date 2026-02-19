/**
 * ParallaxStarfield — Lightweight Background
 * Optimized: reduced element counts, removed blur filters, simplified animations
 */

import { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

export default function ParallaxStarfield({ mouseX, mouseY, isWarpSpeed = false }) {
    // ─── Background Stars (reduced counts) ─── //
    const stars = useMemo(() => ({
        far: Array.from({ length: 15 }, () => ({
            x: Math.random() * 100, y: Math.random() * 100,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
            dur: (Math.random() * 4 + 3).toFixed(1),
            delay: (Math.random() * 5).toFixed(1),
        })),
        mid: Array.from({ length: 10 }, () => ({
            x: Math.random() * 100, y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.3,
            dur: (Math.random() * 3 + 2).toFixed(1),
            delay: (Math.random() * 4).toFixed(1),
        })),
        near: Array.from({ length: 6 }, () => ({
            x: Math.random() * 100, y: Math.random() * 100,
            size: Math.random() * 3 + 2,
            opacity: Math.random() * 0.3 + 0.6,
            dur: (Math.random() * 2 + 1.5).toFixed(1),
            delay: (Math.random() * 3).toFixed(1),
            hue: Math.random() > 0.6 ? '190, 100%, 80%' : '0, 0%, 100%',
        })),
    }), []);

    // ─── Rain Streaks (reduced from 50 → 10) ─── //
    const rainStreaks = useMemo(() =>
        Array.from({ length: 10 }, () => ({
            x: Math.random() * 100,
            width: Math.random() * 1.5 + 0.8,
            height: Math.random() * 80 + 40,
            opacity: Math.random() * 0.18 + 0.08,
            dur: (Math.random() * 3 + 1.5).toFixed(1),
            delay: (Math.random() * 5).toFixed(1),
            isCyan: Math.random() > 0.6,
        }))
        , []);

    // ─── Shooting Stars (reduced from 4 → 2) ─── //
    const shootingStars = useMemo(() =>
        Array.from({ length: 2 }, (_, i) => ({
            top: Math.random() * 40 + 5,
            left: Math.random() * 30,
            angle: Math.random() * 20 + 15,
            duration: (Math.random() * 2 + 1.5).toFixed(1),
            delay: (Math.random() * 12 + 4 + i * 5).toFixed(1),
            length: Math.random() * 80 + 60,
        }))
        , []);

    // ─── Feature Stars (reduced from 6 → 3) ─── //
    const featureStars = useMemo(() => [
        { x: 15, y: 12, size: 5, color: '#22d3ee', delay: '0s' },
        { x: 82, y: 25, size: 4, color: '#e879f9', delay: '1s' },
        { x: 45, y: 8, size: 6, color: '#fbbf24', delay: '2s' },
    ], []);

    // ─── Parallax offsets ─── //
    const farX = useTransform(mouseX, [-1, 1], [-6, 6]);
    const farY = useTransform(mouseY, [-1, 1], [-6, 6]);
    const midX = useTransform(mouseX, [-1, 1], [-14, 14]);
    const midY = useTransform(mouseY, [-1, 1], [-14, 14]);
    const nearX = useTransform(mouseX, [-1, 1], [-28, 28]);
    const nearY = useTransform(mouseY, [-1, 1], [-28, 28]);

    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
        >
            {/* ═══════ 0. SCI-FI GRID ═══════ */}
            <div className="grid-overlay" />

            {/* ═══════ 1. NEBULA CLOUDS (2 only, no blur) ═══════ */}
            <div className="absolute inset-0">
                <div className="absolute nebula-cloud" style={{
                    left: '10%', top: '15%', width: 400, height: 400,
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 65%)',
                }} />
                <div className="absolute nebula-cloud" style={{
                    left: '65%', top: '50%', width: 350, height: 350,
                    background: 'radial-gradient(circle, rgba(232, 121, 249, 0.05) 0%, transparent 65%)',
                    animationDelay: '3s',
                }} />
            </div>

            {/* ═══════ 2. FAR STARS ═══════ */}
            <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
                {stars.far.map((s, i) => (
                    <div key={`f${i}`} className="absolute rounded-full" style={{
                        left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size,
                        backgroundColor: 'white',
                        opacity: s.opacity,
                        animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                    }} />
                ))}
            </motion.div>

            {/* ═══════ 3. MID STARS ═══════ */}
            <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
                {stars.mid.map((s, i) => (
                    <div key={`m${i}`} className="absolute rounded-full" style={{
                        left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size,
                        backgroundColor: 'white',
                        opacity: s.opacity,
                        animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                    }} />
                ))}
            </motion.div>

            {/* ═══════ 4. RAIN STREAKS ═══════ */}
            <div className="absolute inset-0">
                {rainStreaks.map((r, i) => (
                    <div key={`rain-${i}`} className="rain-streak" style={{
                        left: `${r.x}%`,
                        width: isWarpSpeed ? r.width * 2 : r.width,
                        height: isWarpSpeed ? r.height * 2 : r.height,
                        opacity: isWarpSpeed ? r.opacity * 3 : r.opacity,
                        background: `linear-gradient(to bottom, transparent 0%, ${r.isCyan ? 'rgba(103, 232, 249, 0.7)' : 'rgba(255, 255, 255, 0.5)'
                            } 30%, ${r.isCyan ? 'rgba(103, 232, 249, 0.7)' : 'rgba(255, 255, 255, 0.5)'
                            } 70%, transparent 100%)`,
                        animationDuration: isWarpSpeed ? `${(parseFloat(r.dur) * 0.3).toFixed(1)}s` : `${r.dur}s`,
                        animationDelay: `${r.delay}s`,
                    }} />
                ))}
            </div>

            {/* ═══════ 5. NEAR STARS ═══════ */}
            <motion.div className="absolute inset-0" style={{ x: nearX, y: nearY }}>
                {stars.near.map((s, i) => (
                    <div key={`n${i}`} className="absolute rounded-full" style={{
                        left: `${s.x}%`, top: `${s.y}%`,
                        width: s.size, height: s.size,
                        backgroundColor: `hsl(${s.hue})`,
                        opacity: s.opacity,
                        animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                    }} />
                ))}
            </motion.div>

            {/* ═══════ 6. SHOOTING STARS ═══════ */}
            {shootingStars.map((ss, i) => (
                <div key={`shoot-${i}`} className="shooting-star" style={{
                    top: `${ss.top}%`,
                    left: `${ss.left}%`,
                    width: ss.length,
                    transform: `rotate(${ss.angle}deg)`,
                    animationDuration: `${ss.duration}s`,
                    animationDelay: `${ss.delay}s`,
                }} />
            ))}

            {/* ═══════ 7. FEATURE STARS ═══════ */}
            {featureStars.map((fs, i) => (
                <div key={`fs-${i}`} className="feature-star" style={{
                    left: `${fs.x}%`, top: `${fs.y}%`,
                    width: fs.size, height: fs.size,
                    backgroundColor: fs.color,
                    color: fs.color,
                    animationDelay: fs.delay,
                }} />
            ))}

            {/* ═══════ 8. WARP OVERLAY ═══════ */}
            <div className="absolute inset-0 transition-opacity duration-500" style={{
                opacity: isWarpSpeed ? 1 : 0,
                background: `
                    radial-gradient(ellipse at 50% 0%, rgba(34, 211, 238, 0.06) 0%, transparent 40%),
                    radial-gradient(ellipse at 50% 100%, rgba(34, 211, 238, 0.1) 0%, transparent 40%)
                `,
            }} />
        </div>
    );
}
