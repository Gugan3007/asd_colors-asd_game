/**
 * useMouseParallax Hook
 * 
 * Tracks mouse position and returns framer-motion MotionValues
 * that can drive parallax offsets on layered elements.
 * 
 * Returns { mouseX, mouseY } as MotionValues in the range [-1, 1]
 * where (0, 0) is the center of the viewport.
 * 
 * Usage:
 *   const { mouseX, mouseY } = useMouseParallax();
 *   const layerX = useTransform(mouseX, [-1, 1], [-20, 20]);
 *   // Apply layerX to a motion.div's `x` prop for parallax
 */

import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export default function useMouseParallax(springConfig = {}) {
    // Raw mouse values: -1 (left/top) to 1 (right/bottom)
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    // Smoothed with spring physics for buttery parallax
    const mouseX = useSpring(rawX, {
        stiffness: springConfig.stiffness ?? 50,
        damping: springConfig.damping ?? 20,
        mass: springConfig.mass ?? 0.5,
    });

    const mouseY = useSpring(rawY, {
        stiffness: springConfig.stiffness ?? 50,
        damping: springConfig.damping ?? 20,
        mass: springConfig.mass ?? 0.5,
    });

    useEffect(() => {
        const handleMouse = (e) => {
            // Normalize to [-1, 1] range centered on viewport
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            rawX.set(x);
            rawY.set(y);
        };

        window.addEventListener('mousemove', handleMouse, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [rawX, rawY]);

    return { mouseX, mouseY };
}
