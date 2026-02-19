import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * InteractiveCursor Component
 * Replaces the default system cursor with a sci-fi reticle.
 * 
 * Features:
 * - Smooth spring-based following
 * - Hover state detection for interactive elements
 * - Click feedback ripple
 */
export default function InteractiveCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth catch-up using spring physics
    const springConfig = { damping: 25, stiffness: 400 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            // Check if hovering over clickable elements
            if (e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A' ||
                e.target.closest('[role="button"]') ||
                e.target.closest('.interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.style.cursor = 'auto';
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-screen"
            style={{
                x: springX,
                y: springY,
                width: 32,
                height: 32,
            }}
        >
            {/* Main Ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    borderColor: isClicking ? '#a3e635' : isHovering ? '#e879f9' : '#22d3ee',
                    rotate: isHovering ? 90 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Inner Dot */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 0 : 1,
                }}
            />

            {/* Hover Crosshairs */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.5,
                    rotate: isHovering ? 45 : 0
                }}
            >
                <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-cyan-400 -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-cyan-400 -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-cyan-400 -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-cyan-400 -translate-y-1/2" />
            </motion.div>
        </motion.div>
    );
}
