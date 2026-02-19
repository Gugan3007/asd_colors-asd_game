/**
 * useScreenCapture — Screen capture hook using html2canvas
 *
 * Implementation follows the React screenshot pattern from:
 *   Grumberg, R. (2023). "How to ScreenShot in Reactjs — Step-by-Step Guide"
 *   https://medium.com/@pro.grb.studio/how-to-screencapture-in-reactjs-step-by-step-guide-b435e8b53e11
 *
 * Steps (per the article):
 *   1. Install html2canvas
 *   2. Create a ref to the element to capture (React.useRef)
 *   3. Call html2canvas(ref.current, { useCORS: true }) → returns Promise<canvas>
 *   4. Convert canvas to dataURL → create <a> link → trigger download
 *
 * Used as a reward mechanism: kids can save their built charts as "stickers."
 *
 * Research basis:
 *   - Tangible rewards increase motivation in ASD learners
 *     (Koegel et al., 2010 — Pivotal Response Treatment)
 *   - Digital artefact creation reinforces ownership and pride
 *     (Mechling, 2011 — Technology-based instruction for ASD)
 */

import { useCallback, useState, useRef } from 'react';

export default function useScreenCapture() {
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const captureRef = useRef(null); // Ref for the element to capture

    /**
     * Capture a DOM element as a PNG data URL.
     * Follows Medium article pattern: html2canvas(ref.current, {useCORS:true})
     * Uses dynamic import so html2canvas is only loaded when the user clicks capture.
     *
     * @param {HTMLElement} [element] - DOM element to capture (falls back to captureRef.current)
     */
    const capture = useCallback(async (element) => {
        const target = element || captureRef.current;
        if (!target) {
            console.warn('useScreenCapture: No element to capture');
            return null;
        }
        setIsCapturing(true);
        try {
            // Dynamic import — html2canvas only loaded on demand
            const html2canvas = (await import('html2canvas')).default;

            // Step 3 from article: html2canvas returns a Promise<canvas>
            const canvas = await html2canvas(target, {
                useCORS: true,           // Handle cross-origin images
                backgroundColor: '#0f1729', // Game dark background
                scale: 2,                // Retina quality
                logging: false,
            });

            // Step 4 from article: canvas → dataURL
            const dataURL = canvas.toDataURL('image/png');
            setCapturedImage(dataURL);
            return dataURL;
        } catch (err) {
            console.error('Screen capture failed:', err);
            return null;
        } finally {
            setIsCapturing(false);
        }
    }, []);

    /**
     * Download a data URL as a PNG file.
     * Follows article pattern: create <a>, set href + download, click, remove.
     */
    const download = useCallback((dataUrl, filename = 'my-space-chart.png') => {
        if (!dataUrl) return;
        // Create an image element from the data URL (article step 4)
        const img = new Image();
        img.src = dataUrl;

        // Create a link element
        const a = document.createElement('a');
        a.target = '_blank';
        a.href = img.src;
        a.download = filename;

        // Append, click, and remove
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, []);

    /**
     * Capture and immediately download in one step.
     */
    const captureAndDownload = useCallback(async (element, filename) => {
        const dataUrl = await capture(element);
        if (dataUrl) {
            download(dataUrl, filename);
        }
        return dataUrl;
    }, [capture, download]);

    /**
     * Reset captured image state.
     */
    const reset = useCallback(() => {
        setCapturedImage(null);
    }, []);

    return {
        captureRef,
        capture,
        download,
        captureAndDownload,
        reset,
        isCapturing,
        capturedImage,
    };
}
