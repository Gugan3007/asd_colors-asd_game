/**
 * InteractiveBarChart — Build-a-Bar-Chart for ASD Learners
 *
 * CRA Approach Implementation:
 *   Concrete  → Icons are counted in grouped rows above (GroupedIcons)
 *   Representational → This interactive chart (building bars)
 *   Abstract  → Numbers shown on Y-axis and as count labels
 *
 * Interactions:
 *   onKeyDown  → ArrowUp/Down adjusts bar, ArrowLeft/Right switches bars,
 *                Enter/Space submits, number keys set height directly
 *   onClick    → Click grid cells to set bar height
 *   onMouseEnter → Glow preview on hovered cells
 *   onBlur/onFocus → Managed by parent (GameApp) for attention detection
 *
 * Accessibility (ASD-specific):
 *   - tabIndex="0" for keyboard focus
 *   - aria-labels on all interactive elements
 *   - High contrast neon-on-dark from ASD palette
 *   - Predictable grid layout, no surprise animations
 *   - Errorless learning: heights clamped to [0, maxCount]
 *   - Ghost bars (dashed outlines) show target height as scaffolding
 *   - Green checkmarks confirm each correct bar (immediate feedback)
 *
 * Research:
 *   - Errorless learning (Terrace, 1963; Mueller et al., 2007)
 *   - Scaffolding via ghost bars (Vygotsky's Zone of Proximal Development)
 *   - Digital anchoring — familiar space-theme icons (Shane & Albert, 2008)
 *   - One-to-one correspondence in concrete counting (Gelman & Gallistel, 1978)
 */

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScreenCapture from '../hooks/useScreenCapture';

// ─── Color constants (matches EquationDisplay BAR_COLOR_MAP) ─── //
const BAR_COLORS = {
    cyan:    { bar: '#22d3ee', bg: 'rgba(34, 211, 238, 0.12)',  border: 'rgba(34, 211, 238, 0.4)',  glow: 'rgba(34, 211, 238, 0.25)' },
    magenta: { bar: '#e879f9', bg: 'rgba(232, 121, 249, 0.12)', border: 'rgba(232, 121, 249, 0.4)', glow: 'rgba(232, 121, 249, 0.25)' },
    lime:    { bar: '#a3e635', bg: 'rgba(163, 230, 53, 0.12)',  border: 'rgba(163, 230, 53, 0.4)',  glow: 'rgba(163, 230, 53, 0.25)' },
    amber:   { bar: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)',  border: 'rgba(251, 191, 36, 0.4)',  glow: 'rgba(251, 191, 36, 0.25)' },
    rose:    { bar: '#fb7185', bg: 'rgba(251, 113, 133, 0.12)', border: 'rgba(251, 113, 133, 0.4)', glow: 'rgba(251, 113, 133, 0.25)' },
};

const CELL_SIZE = 38;       // px per grid unit
const COLUMN_WIDTH = 54;    // px per bar column

export default function InteractiveBarChart({ dataset = [], maxCount = 1, onComplete, isAnswered }) {
    // ─── Safety: bail early if no data ─── //
    const safeDataset = Array.isArray(dataset) && dataset.length > 0 ? dataset : [];
    const safeMaxCount = Math.max(1, maxCount || 1);

    // ─── State ─── //
    const [heights, setHeights] = useState(() => safeDataset.map(() => 0));
    const [selectedBar, setSelectedBar] = useState(0);
    const [hoveredCell, setHoveredCell] = useState(null); // { col, row }
    const [showCaptureUI, setShowCaptureUI] = useState(false);

    // ─── Refs ─── //
    const containerRef = useRef(null);
    const chartRef = useRef(null);

    // ─── Screen capture hook (html2canvas per Medium article pattern) ─── //
    const { captureAndDownload, isCapturing } = useScreenCapture();

    // ─── Derived ─── //
    const rows = safeMaxCount;
    const cols = safeDataset.length;

    const allCorrect = useMemo(
        () => safeDataset.length > 0 && safeDataset.every((d, i) => heights[i] === d.count),
        [safeDataset, heights]
    );

    const matchCount = useMemo(
        () => safeDataset.filter((d, i) => heights[i] === d.count).length,
        [safeDataset, heights]
    );

    // Show capture UI after answer is confirmed
    useEffect(() => {
        if (isAnswered && allCorrect) {
            const t = setTimeout(() => setShowCaptureUI(true), 800);
            return () => clearTimeout(t);
        }
    }, [isAnswered, allCorrect]);

    // Reset heights when dataset changes (new question)
    useEffect(() => {
        setHeights(safeDataset.map(() => 0));
        setSelectedBar(0);
        setShowCaptureUI(false);
    }, [safeDataset]);

    // ─── Helpers ─── //
    const setBarHeight = useCallback((colIdx, newHeight) => {
        const clamped = Math.max(0, Math.min(safeMaxCount, newHeight));
        setHeights(prev => {
            const next = [...prev];
            next[colIdx] = clamped;
            return next;
        });
    }, [safeMaxCount]);

    // ─── Mouse: Click cell to set height ─── //
    const handleCellClick = useCallback((colIdx, rowFromBottom) => {
        if (isAnswered) return;
        setSelectedBar(colIdx);
        const targetHeight = rowFromBottom + 1;
        // Toggle: if already at this height, decrease by 1
        if (heights[colIdx] === targetHeight) {
            setBarHeight(colIdx, targetHeight - 1);
        } else {
            setBarHeight(colIdx, targetHeight);
        }
    }, [heights, isAnswered, setBarHeight]);

    // ─── Keyboard navigation ─── //
    const handleKeyDown = useCallback((e) => {
        if (isAnswered) return;
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                setBarHeight(selectedBar, heights[selectedBar] + 1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                setBarHeight(selectedBar, heights[selectedBar] - 1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                setSelectedBar(prev => Math.max(0, prev - 1));
                break;
            case 'ArrowRight':
                e.preventDefault();
                setSelectedBar(prev => Math.min(cols - 1, prev + 1));
                break;
            case 'Tab':
                e.preventDefault();
                setSelectedBar(prev => (prev + 1) % cols);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (allCorrect && onComplete) {
                    onComplete(heights);
                }
                break;
            default: {
                // Number keys 0–9 to set height directly
                const num = parseInt(e.key);
                if (!isNaN(num) && num >= 0 && num <= safeMaxCount) {
                    setBarHeight(selectedBar, num);
                }
                break;
            }
        }
    }, [selectedBar, heights, cols, safeMaxCount, isAnswered, allCorrect, onComplete, setBarHeight]);

    // ─── Auto-focus on mount ─── //
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, []);

    // ─── Submit handler ─── //
    const handleSubmit = useCallback(() => {
        if (onComplete) onComplete(heights);
    }, [heights, onComplete]);

    // ─── Screen capture handler (html2canvas pattern from Medium article) ─── //
    const handleCapture = useCallback(async () => {
        if (!chartRef.current) return;
        await captureAndDownload(chartRef.current, `space-chart-${Date.now()}.png`);
    }, [captureAndDownload]);

    // ─── Render ─── //
    if (safeDataset.length === 0) {
        return <div className="text-slate-400 text-center py-4">Loading chart data...</div>;
    }

    return (
        <div
            ref={containerRef}
            className="interactive-bar-chart"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="application"
            aria-label="Build a bar chart. Use arrow keys to adjust bars, Enter to submit."
        >
            {/* Instructions */}
            {!isAnswered && (
                <motion.div
                    className="build-chart-instructions"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="text-lg">🏗️</span>
                    <span>Click cells or use <kbd>↑</kbd><kbd>↓</kbd> to build each bar! Press <kbd>←</kbd><kbd>→</kbd> to switch.</span>
                </motion.div>
            )}

            {/* Chart grid */}
            <div className="chart-grid-wrapper" ref={chartRef}>
                <div className="chart-grid-container">
                    {/* Y-axis labels */}
                    <div className="chart-y-axis">
                        {Array.from({ length: rows }, (_, i) => (
                            <div key={i} className="chart-y-label" style={{ height: CELL_SIZE }}>
                                {rows - i}
                            </div>
                        ))}
                        <div className="chart-y-label chart-y-zero">0</div>
                    </div>

                    {/* Grid area */}
                    <div className="chart-grid">
                        {safeDataset.map((item, colIdx) => {
                            const colors = BAR_COLORS[item.color] || BAR_COLORS.cyan;
                            const isSelected = selectedBar === colIdx;
                            const barHeight = heights[colIdx] || 0;
                            const targetHeight = item.count || 0;
                            const isMatch = barHeight === targetHeight;

                            return (
                                <div
                                    key={item.icon}
                                    className={`chart-column ${isSelected ? 'chart-column-selected' : ''}`}
                                    aria-label={`${item.label || item.icon} bar, height ${barHeight} of ${targetHeight}`}
                                >
                                    {/* Grid cells — top to bottom */}
                                    {Array.from({ length: rows }, (_, rowFromTop) => {
                                        const rowFromBottom = rows - 1 - rowFromTop;
                                        const isFilled = rowFromBottom < barHeight;
                                        const isGhost = rowFromBottom < targetHeight && !isFilled;
                                        const isHoverTarget =
                                            hoveredCell?.col === colIdx &&
                                            hoveredCell?.row === rowFromBottom;
                                        const isPreview =
                                            !isAnswered &&
                                            hoveredCell?.col === colIdx &&
                                            rowFromBottom <= (hoveredCell?.row ?? -1) &&
                                            !isFilled;

                                        let cellBg = 'transparent';
                                        let cellBorder = '2px solid rgba(255,255,255,0.06)';
                                        let cellShadow = 'none';

                                        if (isFilled) {
                                            cellBg = `linear-gradient(180deg, ${colors.bar}, ${colors.border})`;
                                            cellBorder = `2px solid ${colors.border}`;
                                            if (isSelected) cellShadow = `0 0 12px ${colors.glow}`;
                                        } else if (isPreview) {
                                            cellBg = colors.bg;
                                            cellBorder = `2px solid ${colors.border}50`;
                                        } else if (isGhost) {
                                            cellBorder = `2px dashed ${colors.border}40`;
                                        }

                                        return (
                                            <motion.div
                                                key={rowFromTop}
                                                className={`chart-cell ${isFilled ? 'chart-cell-filled' : ''} ${isGhost ? 'chart-cell-ghost' : ''} ${isHoverTarget ? 'chart-cell-hover' : ''}`}
                                                style={{
                                                    height: CELL_SIZE,
                                                    width: COLUMN_WIDTH,
                                                    background: cellBg,
                                                    border: cellBorder,
                                                    boxShadow: cellShadow,
                                                }}
                                                onClick={() => handleCellClick(colIdx, rowFromBottom)}
                                                onMouseEnter={() => !isAnswered && setHoveredCell({ col: colIdx, row: rowFromBottom })}
                                                onMouseLeave={() => setHoveredCell(null)}
                                                whileHover={!isAnswered ? { scale: 1.06 } : {}}
                                                whileTap={!isAnswered ? { scale: 0.94 } : {}}
                                                role="gridcell"
                                                aria-label={`Row ${rowFromBottom + 1}, ${isFilled ? 'filled' : isGhost ? 'target' : 'empty'}`}
                                            />
                                        );
                                    })}

                                    {/* Icon label below column */}
                                    <div className={`chart-icon-label ${isSelected ? 'chart-icon-selected' : ''}`}>
                                        <span style={{ fontSize: 26 }}>{item.icon}</span>
                                        <span
                                            className="chart-height-badge"
                                            style={{
                                                color: isMatch ? '#4ade80' : colors.bar,
                                                background: isMatch ? 'rgba(74, 222, 128, 0.15)' : colors.bg,
                                                border: `2px solid ${isMatch ? '#4ade80' : colors.border}`,
                                            }}
                                        >
                                            {barHeight}
                                        </span>
                                    </div>

                                    {/* ✓ Match indicator */}
                                    <AnimatePresence>
                                        {isMatch && barHeight > 0 && (
                                            <motion.div
                                                className="chart-match-indicator"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                            >
                                                ✓
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Completed overlay with capture */}
                <AnimatePresence>
                    {showCaptureUI && isAnswered && (
                        <motion.div
                            className="chart-capture-overlay"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div className="chart-complete-badge">
                                🌟 Perfect Chart! 🌟
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress pips & Submit */}
            <div className="build-chart-footer">
                {/* Progress pips */}
                <div className="build-chart-progress">
                    {safeDataset.map((item, i) => {
                        const isOK = heights[i] === item.count;
                        return (
                            <motion.div
                                key={item.icon}
                                className={`progress-pip ${isOK ? 'progress-pip-complete' : ''}`}
                                animate={isOK ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 0.3 }}
                            >
                                {isOK ? '✓' : item.icon}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Submit / Capture button */}
                {!isAnswered ? (
                    <motion.button
                        className={`build-chart-submit ${allCorrect ? 'build-chart-submit-ready' : ''}`}
                        onClick={handleSubmit}
                        disabled={!allCorrect}
                        whileHover={allCorrect ? { scale: 1.05 } : {}}
                        whileTap={allCorrect ? { scale: 0.95 } : {}}
                        animate={allCorrect ? {
                            boxShadow: [
                                '0 0 20px rgba(74, 222, 128, 0.3)',
                                '0 0 40px rgba(74, 222, 128, 0.6)',
                                '0 0 20px rgba(74, 222, 128, 0.3)',
                            ],
                        } : {}}
                        transition={allCorrect ? { duration: 1.5, repeat: Infinity } : {}}
                    >
                        {allCorrect ? '✓ Check Answer!' : `${matchCount}/${cols} bars matched`}
                    </motion.button>
                ) : (
                    <motion.button
                        className="build-chart-capture"
                        onClick={handleCapture}
                        disabled={isCapturing}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {isCapturing ? '⏳ Saving...' : '📸 Save My Chart!'}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
