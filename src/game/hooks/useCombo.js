/**
 * useCombo Hook
 * 
 * Tracks consecutive correct answers for the "Warp Speed" effect.
 * - combo: current streak count
 * - isWarpSpeed: true when combo >= WARP_THRESHOLD (2)
 * - maxCombo: highest streak achieved this session
 * 
 * Usage:
 *   const { combo, isWarpSpeed, registerCorrect, registerWrong, reset } = useCombo();
 *   // On correct: registerCorrect()
 *   // On wrong:   registerWrong() — resets streak to 0
 */

import { useState, useCallback } from 'react';

const WARP_THRESHOLD = 2; // Consecutive correct answers to trigger warp

export default function useCombo() {
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);

    const isWarpSpeed = combo >= WARP_THRESHOLD;

    const registerCorrect = useCallback(() => {
        setCombo((prev) => {
            const next = prev + 1;
            setMaxCombo((max) => Math.max(max, next));
            return next;
        });
    }, []);

    const registerWrong = useCallback(() => {
        setCombo(0);
    }, []);

    const reset = useCallback(() => {
        setCombo(0);
    }, []);

    return {
        combo,
        maxCombo,
        isWarpSpeed,
        registerCorrect,
        registerWrong,
        reset,
    };
}
