/**
 * useIdleTimer Hook
 * 
 * Detects user inactivity for ASD-friendly hint system.
 * After `timeout` ms of no interaction, sets `isIdle = true`.
 * Resets on any mouse, touch, or keyboard event.
 * 
 * Usage:
 *   const isIdle = useIdleTimer(10000); // 10 seconds
 *   // When isIdle → gently wiggle the correct orb
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export default function useIdleTimer(timeout = 10000, enabled = true) {
    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef(null);

    const resetTimer = useCallback(() => {
        if (!enabled) return;

        setIsIdle(false);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, timeout);
    }, [timeout, enabled]);

    // Manual reset (e.g., when a new question loads)
    const forceReset = useCallback(() => {
        setIsIdle(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, timeout);
    }, [timeout]);

    useEffect(() => {
        if (!enabled) {
            setIsIdle(false);
            return;
        }

        // Events that count as "user activity"
        const events = ['mousemove', 'mousedown', 'touchstart', 'touchmove', 'keydown'];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer, { passive: true });
        });

        // Start the initial timer
        resetTimer();

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [resetTimer, enabled]);

    return { isIdle, forceReset };
}
