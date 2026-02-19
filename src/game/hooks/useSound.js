/**
 * useSound Hook — Sound Architecture Placeholder
 * 
 * Provides a consistent API for triggering sound effects throughout the game.
 * Currently logs to console; designed for easy drop-in replacement with
 * actual audio files (Howler.js, useSound, or native Audio API).
 * 
 * Usage:
 *   const { play } = useSound();
 *   play('success');   // On correct answer
 *   play('whoosh');    // On drag start
 *   play('warp');      // On combo/warp speed
 * 
 * To add real sounds later:
 *   1. Import audio files
 *   2. Create Audio objects in the SOUNDS map
 *   3. Call .play() instead of console.log
 */

import { useCallback, useRef } from 'react';

// ─── Sound Registry ─── //
// Replace console.log with actual Audio() objects to enable sound
const SOUND_CONFIG = {
    click: { label: '🔊 Click', volume: 0.5 },
    whoosh: { label: '🔊 Whoosh', volume: 0.6 },
    success: { label: '🔊 Success', volume: 0.8 },
    error: { label: '🔊 Error', volume: 0.4 },
    warp: { label: '🔊 Warp', volume: 0.7 },
    combo: { label: '🔊 Combo', volume: 0.9 },
    levelUp: { label: '🔊 LevelUp', volume: 0.8 },
    hint: { label: '🔊 Hint', volume: 0.3 },
};

export default function useSound() {
    // Ref to track if sounds are enabled (future setting toggle)
    const enabledRef = useRef(true);

    /**
     * Play a named sound effect
     * @param {string} name - Key from SOUND_CONFIG
     * @param {object} options - Override options { volume }
     */
    const play = useCallback((name, options = {}) => {
        if (!enabledRef.current) return;

        const config = SOUND_CONFIG[name];
        if (!config) {
            console.warn(`[Sound] Unknown sound: "${name}"`);
            return;
        }

        // ── PLACEHOLDER: Replace with actual audio playback ──
        // Example with Howler.js:
        //   const sound = new Howl({ src: [`/sounds/${name}.mp3`], volume: config.volume });
        //   sound.play();
        //
        // Example with native Audio:
        //   const audio = new Audio(`/sounds/${name}.mp3`);
        //   audio.volume = options.volume ?? config.volume;
        //   audio.play().catch(() => {});

        if (process.env.NODE_ENV === 'development') {
            console.log(`${config.label} (vol: ${options.volume ?? config.volume})`);
        }
    }, []);

    /**
     * Stop all currently playing sounds
     */
    const stopAll = useCallback(() => {
        // Placeholder — would call .stop() on all active Audio instances
    }, []);

    /**
     * Toggle sound on/off
     */
    const toggle = useCallback(() => {
        enabledRef.current = !enabledRef.current;
        return enabledRef.current;
    }, []);

    return { play, stopAll, toggle };
}
