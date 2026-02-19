/**
 * EquationDisplay Component — Upgraded
 * 
 * Supports 3 display modes:
 *   FUEL_ENGINE:    Standard equation (3 + 5 = ?)
 *   CRACK_CODE:     Sequence (2, 4, ?, 8)
 *   BALANCE_CARGO:  Comparison (5 ? 3)
 * 
 * New Features:
 *   - Visual Math Dots: Small stars under numbers for Level 1
 *   - Sequence layout with commas
 *   - Comparison layout without equals sign
 */

import { motion } from 'framer-motion';
import { MISSION_TYPES } from '../missions/MissionEngine';
import InteractiveBarChart from './InteractiveBarChart';

// Staggered container — children animate in sequence
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
};

// Each element springs in from below
const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.8 },
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

const COLOR_MAP = {
    cyan: { bg: 'rgba(34, 211, 238, 0.15)', border: '#22d3ee', text: '#22d3ee', shadow: 'rgba(34, 211, 238, 0.3)' },
    magenta: { bg: 'rgba(232, 121, 249, 0.15)', border: '#e879f9', text: '#e879f9', shadow: 'rgba(232, 121, 249, 0.3)' },
    lime: { bg: 'rgba(163, 230, 53, 0.15)', border: '#a3e635', text: '#a3e635', shadow: 'rgba(163, 230, 53, 0.3)' },
    amber: { bg: 'rgba(251, 191, 36, 0.15)', border: '#fbbf24', text: '#fbbf24', shadow: 'rgba(251, 191, 36, 0.3)' },
    rose: { bg: 'rgba(251, 113, 133, 0.15)', border: '#fb7185', text: '#fb7185', shadow: 'rgba(251, 113, 133, 0.3)' },
};

/**
 * VisualDots — Renders small stars under a number for visual counting
 * Only shown for Level 1 to help ASD learners connect numbers to quantities
 */
function VisualDots({ count, color = '#22d3ee' }) {
    if (count > 12) return null; // Don't show for large numbers
    const dots = Array.from({ length: count }, (_, i) => i);

    return (
        <div className="flex flex-wrap justify-center gap-0.5 mt-1 max-w-16">
            {dots.map((i) => (
                <motion.div
                    key={i}
                    className="rounded-full"
                    style={{
                        width: 5,
                        height: 5,
                        backgroundColor: color,
                        opacity: 0.7,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05, type: 'spring', stiffness: 400 }}
                />
            ))}
        </div>
    );
}

/**
 * AnswerSlot — The pulsing "?" drop target
 */
function AnswerSlot({ answer, answerColor, isAnswered }) {
    const color = COLOR_MAP[answerColor] || COLOR_MAP.cyan;

    if (isAnswered) {
        return (
            <motion.span
                className="text-4xl md:text-5xl font-bold"
                style={{ color: color.text }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
                {answer}
            </motion.span>
        );
    }

    return (
        <div
            className="w-18 h-18 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl font-bold"
            style={{
                width: 72,
                height: 72,
                background: color.bg,
                border: `2.5px dashed ${color.border}`,
                color: color.text,
                boxShadow: `0 0 20px ${color.shadow}`,
            }}
            id="answer-drop-zone"
        >
            ?
        </div>
    );
}

/**
 * NumberWithDots — A number with optional visual counting dots
 */
function NumberWithDots({ num, showDots, color }) {
    return (
        <motion.div className="flex flex-col items-center" variants={itemVariants}>
            <span className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">{num}</span>
            {showDots && <VisualDots count={num} color={color} />}
        </motion.div>
    );
}

// ══════════════════════════════════════════
//   MAIN COMPONENT
// ══════════════════════════════════════════

export default function EquationDisplay({ question, isAnswered, onBuildChartSubmit }) {
    const { type } = question;

    // Route to the correct layout based on mission type
    switch (type) {
        case MISSION_TYPES.CRACK_CODE:
            return <SequenceLayout question={question} isAnswered={isAnswered} />;
        case MISSION_TYPES.BALANCE_CARGO:
            return <ComparisonLayout question={question} isAnswered={isAnswered} />;
        case MISSION_TYPES.SCAN_DATA:
            return <ScanDataLayout question={question} isAnswered={isAnswered} onBuildChartSubmit={onBuildChartSubmit} />;
        case MISSION_TYPES.FUEL_ENGINE:
        default:
            return <EquationLayout question={question} isAnswered={isAnswered} />;
    }
}

/**
 * EquationLayout — Standard math: 3 + 5 = ?
 */
function EquationLayout({ question, isAnswered }) {
    const { num1, num2, operator, answer, answerColor, showDots } = question;
    const color = COLOR_MAP[answerColor] || COLOR_MAP.cyan;

    return (
        <motion.div
            className="glass-panel-strong px-6 py-5 md:px-8 md:py-6 flex items-center justify-center gap-3 md:gap-5 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`equation-${num1}-${operator}-${num2}`}
        >
            {/* Holographic scan line */}
            <div className="scan-line" />
            {/* Number 1 */}
            <NumberWithDots num={num1} showDots={showDots} color={color.text} />

            {/* Operator */}
            <motion.span
                className="text-3xl md:text-5xl font-bold"
                style={{ color: color.text }}
                variants={itemVariants}
            >
                {operator}
            </motion.span>

            {/* Number 2 */}
            <NumberWithDots num={num2} showDots={showDots} color={color.text} />

            {/* Equals */}
            <motion.span
                className="text-3xl md:text-5xl font-bold text-slate-400"
                variants={itemVariants}
            >
                =
            </motion.span>

            {/* Answer Slot */}
            <motion.div className="relative" variants={itemVariants}>
                <AnswerSlot answer={answer} answerColor={answerColor} isAnswered={isAnswered} />
            </motion.div>
        </motion.div>
    );
}

/**
 * SequenceLayout — Sequence: 2, 4, ?, 8
 */
function SequenceLayout({ question, isAnswered }) {
    const { sequence, missingIndex, answer, answerColor } = question;

    return (
        <motion.div
            className="glass-panel-strong px-6 py-5 md:px-8 md:py-6 flex items-center justify-center gap-2 md:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`sequence-${sequence.join('-')}`}
        >
            {sequence.map((num, i) => (
                <motion.div key={i} className="flex items-center gap-2 md:gap-4" variants={itemVariants}>
                    {i === missingIndex ? (
                        <AnswerSlot answer={answer} answerColor={answerColor} isAnswered={isAnswered} />
                    ) : (
                        <span className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">{num}</span>
                    )}

                    {/* Comma separator (except last) */}
                    {i < sequence.length - 1 && (
                        <span className="text-2xl md:text-4xl text-slate-500 font-bold">,</span>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
}

/**
 * ComparisonLayout — Comparison: 5 ? 3
 */
function ComparisonLayout({ question, isAnswered }) {
    const { num1, num2, answer, answerColor } = question;

    return (
        <motion.div
            className="glass-panel-strong px-6 py-5 md:px-8 md:py-6 flex items-center justify-center gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`compare-${num1}-${num2}`}
        >
            {/* Number 1 */}
            <motion.span
                className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
                variants={itemVariants}
            >
                {num1}
            </motion.span>

            {/* Comparison Slot */}
            <motion.div className="relative" variants={itemVariants}>
                <AnswerSlot answer={answer} answerColor={answerColor} isAnswered={isAnswered} />
            </motion.div>

            {/* Number 2 */}
            <motion.span
                className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
                variants={itemVariants}
            >
                {num2}
            </motion.span>
        </motion.div>
    );
}

// ══════════════════════════════════════════
//   SCAN DATA LAYOUT — Multi-Chart Data Handling
//   Bar Chart · Pictograph · Dot Plot
// ══════════════════════════════════════════

const BAR_COLOR_MAP = {
    cyan: { bar: '#22d3ee', barBg: 'rgba(34, 211, 238, 0.12)', border: 'rgba(34, 211, 238, 0.4)', glow: 'rgba(34, 211, 238, 0.25)' },
    magenta: { bar: '#e879f9', barBg: 'rgba(232, 121, 249, 0.12)', border: 'rgba(232, 121, 249, 0.4)', glow: 'rgba(232, 121, 249, 0.25)' },
    lime: { bar: '#a3e635', barBg: 'rgba(163, 230, 53, 0.12)', border: 'rgba(163, 230, 53, 0.4)', glow: 'rgba(163, 230, 53, 0.25)' },
    amber: { bar: '#fbbf24', barBg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.4)', glow: 'rgba(251, 191, 36, 0.25)' },
    rose: { bar: '#fb7185', barBg: 'rgba(251, 113, 133, 0.12)', border: 'rgba(251, 113, 133, 0.4)', glow: 'rgba(251, 113, 133, 0.25)' },
};

const CHART_LABELS = { BAR: '📊 Bar Chart', PICTOGRAPH: '🖼️ Pictograph', DOT_PLOT: '🔵 Dot Plot', PIE_CHART: '🥧 Pie Chart' };

/**
 * GroupedIcons — Renders icons in grouped rows per type for easy counting
 * Large, clear rows with color-coded labels and one-to-one icons
 */
function GroupedIcons({ dataset, highlightIcon }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {dataset.map((item, rowIdx) => {
                const colors = BAR_COLOR_MAP[item.color] || BAR_COLOR_MAP.cyan;
                const isTarget = item.icon === highlightIcon;
                return (
                    <motion.div
                        key={item.icon}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl"
                        style={{
                            background: isTarget ? colors.barBg : 'rgba(255,255,255,0.03)',
                            border: isTarget ? `2.5px solid ${colors.border}` : '2.5px solid transparent',
                            boxShadow: isTarget ? `0 0 18px ${colors.glow}` : 'none',
                        }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 + rowIdx * 0.1, type: 'spring', stiffness: 250, damping: 20 }}
                    >
                        <div className="flex gap-2 flex-wrap items-center flex-1">
                            {Array.from({ length: item.count }, (_, i) => (
                                <span
                                    key={i}
                                    style={{
                                        fontSize: 32,
                                        lineHeight: 1,
                                    }}
                                >
                                    {item.icon}
                                </span>
                            ))}
                        </div>
                        <span className="font-extrabold text-base" style={{ color: colors.bar, minWidth: 20, textAlign: 'center' }}>
                            {item.count}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
}

/**
 * BarChart — Large CSS bar chart with thick unit blocks, gridlines, and glow
 * Each unit is a clearly visible stacked block for physical counting
 */
function BarChart({ dataset, highlightIcon }) {
    const maxCount = Math.max(...dataset.map((d) => d.count));
    const UNIT_SIZE = 32;
    const BAR_WIDTH = 56;
    const chartHeight = maxCount * UNIT_SIZE + 14;

    return (
        <div className="flex flex-col items-center w-full">
            <div
                className="relative flex items-end justify-center w-full"
                style={{ height: chartHeight, paddingLeft: 30 }}
            >
                {/* Horizontal gridlines */}
                {Array.from({ length: maxCount + 1 }, (_, i) => (
                    <div
                        key={`grid-${i}`}
                        className="absolute right-0"
                        style={{
                            left: 28,
                            bottom: i * UNIT_SIZE,
                            height: 1,
                            background: i === 0
                                ? 'rgba(255,255,255,0.25)'
                                : 'rgba(255,255,255,0.06)',
                        }}
                    />
                ))}

                {/* Y-axis labels */}
                {Array.from({ length: maxCount + 1 }, (_, i) => (
                    <motion.span
                        key={`label-${i}`}
                        className="absolute font-bold text-slate-400"
                        style={{
                            fontSize: 14,
                            left: 2,
                            bottom: i * UNIT_SIZE - 8,
                            width: 20,
                            textAlign: 'right',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: i === 0 ? 0 : 0.8 }}
                        transition={{ delay: 0.6 + i * 0.05 }}
                    >
                        {i > 0 ? i : ''}
                    </motion.span>
                ))}

                {/* Bars container — evenly spaced */}
                <div className="flex items-end justify-evenly flex-1" style={{ marginLeft: 8 }}>
                    {dataset.map((item, colIdx) => {
                        const colors = BAR_COLOR_MAP[item.color] || BAR_COLOR_MAP.cyan;
                        const isTarget = item.icon === highlightIcon;
                        const barHeight = item.count * UNIT_SIZE;

                        return (
                            <motion.div
                                key={item.icon}
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + colIdx * 0.15 }}
                            >
                                {/* Count badge above bar */}
                                <motion.div
                                    className="rounded-full px-2.5 py-0.5 mb-1.5 font-extrabold"
                                    style={{
                                        fontSize: 15,
                                        background: isTarget ? colors.bar : colors.barBg,
                                        color: isTarget ? '#0a0e1a' : colors.bar,
                                        boxShadow: isTarget ? `0 0 14px ${colors.glow}` : 'none',
                                        minWidth: 28,
                                        textAlign: 'center',
                                    }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.0 + colIdx * 0.15, type: 'spring', stiffness: 400 }}
                                >
                                    {item.count}
                                </motion.div>

                                {/* Stacked unit blocks */}
                                <div
                                    className="relative rounded-xl overflow-hidden"
                                    style={{
                                        width: BAR_WIDTH,
                                        height: barHeight,
                                        background: colors.barBg,
                                        border: `2px solid ${colors.border}`,
                                        boxShadow: isTarget
                                            ? `0 0 24px ${colors.glow}, inset 0 0 16px ${colors.glow}`
                                            : `0 0 10px ${colors.barBg}`,
                                    }}
                                >
                                    {/* Individual unit blocks stacked from bottom */}
                                    {Array.from({ length: item.count }, (_, blockIdx) => (
                                        <motion.div
                                            key={blockIdx}
                                            className="absolute"
                                            style={{
                                                left: 3,
                                                right: 3,
                                                bottom: blockIdx * UNIT_SIZE + 2,
                                                height: UNIT_SIZE - 4,
                                                background: `linear-gradient(180deg, ${colors.bar}, ${colors.border})`,
                                                borderRadius: 6,
                                                opacity: isTarget ? 1 : 0.75,
                                            }}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{
                                                delay: 0.7 + colIdx * 0.15 + blockIdx * 0.1,
                                                duration: 0.3,
                                                ease: 'easeOut',
                                            }}
                                        />
                                    ))}

                                    {/* Highlight effect on target bar (static) */}
                                    {isTarget && (
                                        <div
                                            className="absolute inset-0 rounded-xl"
                                            style={{ background: colors.glow, opacity: 0.2 }}
                                        />
                                    )}
                                </div>

                                {/* Icon label below bar */}
                                <span
                                    className="mt-1.5"
                                    style={{
                                        fontSize: 26,
                                        transform: isTarget ? 'scale(1.1)' : undefined,
                                    }}
                                >
                                    {item.icon}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ── CHART TYPE 2: PICTOGRAPH ──────────────────
// Horizontal rows: icon label → colored blocks (1 block = 1 unit) → count

function Pictograph({ dataset, highlightIcon }) {
    const maxCount = Math.max(...dataset.map((d) => d.count));
    const BLOCK = 40;

    return (
        <div className="w-full flex flex-col gap-2">
            {/* Column header numbers */}
            <div className="flex items-end" style={{ paddingLeft: 44 }}>
                {Array.from({ length: maxCount }, (_, i) => (
                    <span
                        key={i}
                        className="font-bold text-slate-500 text-center"
                        style={{ width: BLOCK + 3, fontSize: 13 }}
                    >
                        {i + 1}
                    </span>
                ))}
            </div>

            {/* Data rows */}
            {dataset.map((item, rowIdx) => {
                const c = BAR_COLOR_MAP[item.color] || BAR_COLOR_MAP.cyan;
                const t = item.icon === highlightIcon;
                return (
                    <motion.div
                        key={item.icon}
                        className="flex items-center gap-1.5"
                        initial={{ x: -15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.25 + rowIdx * 0.1, type: 'spring', stiffness: 250, damping: 20 }}
                    >
                        {/* Row label */}
                        <span style={{ fontSize: 28, width: 36, textAlign: 'center', flexShrink: 0 }}>
                            {item.icon}
                        </span>

                        {/* Blocks row */}
                        <div className="flex items-center" style={{ gap: 3 }}>
                            {Array.from({ length: maxCount }, (_, i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        width: BLOCK,
                                        height: BLOCK,
                                        borderRadius: 8,
                                        background: i < item.count
                                            ? `linear-gradient(135deg, ${c.bar}, ${c.border})`
                                            : 'rgba(255,255,255,0.04)',
                                        border: i < item.count
                                            ? `2px solid ${c.border}`
                                            : '2px solid rgba(255,255,255,0.06)',
                                        boxShadow: i < item.count && t ? `0 0 10px ${c.glow}` : 'none',
                                    }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + rowIdx * 0.1 + i * 0.06, type: 'spring', stiffness: 350, damping: 16 }}
                                />
                            ))}
                        </div>

                        {/* Count */}
                        <motion.span
                            className="font-extrabold"
                            style={{ fontSize: 16, color: c.bar, minWidth: 22, textAlign: 'center' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 + rowIdx * 0.1 }}
                        >
                            {item.count}
                        </motion.span>
                    </motion.div>
                );
            })}

            {/* Legend */}
            <div className="flex justify-center mt-2">
                <div className="flex items-center gap-2">
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: 'linear-gradient(135deg, #22d3ee, rgba(34,211,238,0.4))' }} />
                    <span className="text-slate-400 font-bold" style={{ fontSize: 13 }}>= 1 object</span>
                </div>
            </div>
        </div>
    );
}

// ── CHART TYPE 3: DOT PLOT ──────────────────
// Colored dots stacked vertically in columns

function DotPlot({ dataset, highlightIcon }) {
    const maxCount = Math.max(...dataset.map((d) => d.count));
    const DOT_SIZE = 28;
    const DOT_GAP = 5;
    const CELL = DOT_SIZE + DOT_GAP;
    const plotHeight = maxCount * CELL + 10;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="relative flex items-end justify-evenly w-full" style={{ height: plotHeight, paddingLeft: 28 }}>
                {/* Gridlines */}
                {Array.from({ length: maxCount + 1 }, (_, i) => (
                    <div key={`dg${i}`} className="absolute right-0" style={{ left: 26, bottom: i * CELL, height: 1, background: i === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.04)' }} />
                ))}
                {/* Y-axis */}
                {Array.from({ length: maxCount + 1 }, (_, i) => (
                    <motion.span key={`dl${i}`} className="absolute font-bold text-slate-400" style={{ fontSize: 14, left: 0, bottom: i * CELL - 7, width: 20, textAlign: 'right' }} initial={{ opacity: 0 }} animate={{ opacity: i === 0 ? 0 : 0.8 }} transition={{ delay: 0.5 + i * 0.04 }}>
                        {i > 0 ? i : ''}
                    </motion.span>
                ))}

                {/* Dot columns */}
                <div className="flex items-end justify-evenly flex-1" style={{ marginLeft: 4 }}>
                    {dataset.map((item, colIdx) => {
                        const c = BAR_COLOR_MAP[item.color] || BAR_COLOR_MAP.cyan;
                        const t = item.icon === highlightIcon;
                        return (
                            <motion.div
                                key={item.icon}
                                className="flex flex-col-reverse items-center"
                                style={{ gap: DOT_GAP }}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + colIdx * 0.12 }}
                            >
                                {Array.from({ length: item.count }, (_, dotIdx) => (
                                    <motion.div
                                        key={dotIdx}
                                        className="rounded-full"
                                        style={{
                                            width: DOT_SIZE,
                                            height: DOT_SIZE,
                                            background: `radial-gradient(circle at 35% 35%, ${c.bar}, ${c.border})`,
                                            boxShadow: t ? `0 0 10px ${c.glow}` : `0 0 4px ${c.barBg}`,
                                            border: `1.5px solid ${c.border}`,
                                        }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            delay: 0.6 + colIdx * 0.1 + dotIdx * 0.08,
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 15,
                                        }}
                                    />
                                ))}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* X-axis icon labels */}
            <div className="flex items-center justify-evenly w-full" style={{ paddingLeft: 28, marginTop: 6 }}>
                <div className="flex items-center justify-evenly flex-1" style={{ marginLeft: 4 }}>
                    {dataset.map((item) => {
                        const c = BAR_COLOR_MAP[item.color] || BAR_COLOR_MAP.cyan;
                        const t = item.icon === highlightIcon;
                        return (
                            <div
                                key={item.icon}
                                className="flex flex-col items-center"
                                style={{ transform: t ? 'scale(1.1)' : undefined }}
                            >
                                <span style={{ fontSize: 26 }}>
                                    {item.icon}
                                </span>
                                <motion.span
                                    className="font-extrabold"
                                    style={{ fontSize: 14, color: c.bar }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.0 }}
                                >
                                    {item.count}
                                </motion.span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ── CHART TYPE 4: PIE CHART ──────────────────
// SVG donut chart with labeled slices

function PieChart({ dataset, highlightIcon }) {
    const total = dataset.reduce((s, d) => s + d.count, 0);
    const R = 95;        // outer radius
    const IR = 52;       // inner radius (donut hole)
    const CX = 130;
    const CY = 115;
    const SIZE = 260;

    // Build arcs
    let cumAngle = -90; // start at 12 o'clock
    const slices = dataset.map((item) => {
        const angle = (item.count / total) * 360;
        const startAngle = cumAngle;
        cumAngle += angle;
        return { ...item, startAngle, angle };
    });

    function polarToXY(cx, cy, r, angleDeg) {
        const rad = (angleDeg * Math.PI) / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }

    function arcPath(cx, cy, r, ir, startDeg, sweepDeg) {
        const large = sweepDeg > 180 ? 1 : 0;
        const outerStart = polarToXY(cx, cy, r, startDeg);
        const outerEnd = polarToXY(cx, cy, r, startDeg + sweepDeg);
        const innerEnd = polarToXY(cx, cy, ir, startDeg + sweepDeg);
        const innerStart = polarToXY(cx, cy, ir, startDeg);
        return [
            `M ${outerStart.x} ${outerStart.y}`,
            `A ${r} ${r} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
            `L ${innerEnd.x} ${innerEnd.y}`,
            `A ${ir} ${ir} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
            'Z',
        ].join(' ');
    }

    return (
        <div className="w-full flex flex-col items-center">
            <svg width={SIZE} height={SIZE - 10} viewBox={`0 0 ${SIZE} ${SIZE - 10}`}>
                {slices.map((s, i) => {
                    const c = BAR_COLOR_MAP[s.color] || BAR_COLOR_MAP.cyan;
                    const t = s.icon === highlightIcon;
                    // Clamp minimum sweep to 0.5° to avoid rendering glitch
                    const sweep = Math.max(s.angle - 1, 0.5);
                    const midAngle = s.startAngle + s.angle / 2;
                    const labelR = R + 22;
                    const labelPos = polarToXY(CX, CY, labelR, midAngle);

                    return (
                        <g key={s.icon}>
                            <motion.path
                                d={arcPath(CX, CY, R, IR, s.startAngle + 0.5, sweep)}
                                fill={c.bar}
                                fillOpacity={t ? 1 : 0.65}
                                stroke="#0a0e1a"
                                strokeWidth={2}
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: 'none',
                                }}
                                transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200, damping: 18 }}
                                style={{ transformOrigin: `${CX}px ${CY}px` }}
                            />
                            {/* Slice label */}
                            <motion.text
                                x={labelPos.x}
                                y={labelPos.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                style={{ fontSize: 24 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 + i * 0.15 }}
                            >
                                {s.icon}
                            </motion.text>
                        </g>
                    );
                })}

                {/* Center total */}
                <motion.text
                    x={CX}
                    y={CY - 8}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="rgba(255,255,255,0.5)"
                    style={{ fontSize: 13, fontWeight: 700 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Total
                </motion.text>
                <motion.text
                    x={CX}
                    y={CY + 10}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="rgba(255,255,255,0.85)"
                    style={{ fontSize: 22, fontWeight: 800 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    {total}
                </motion.text>
            </svg>

            {/* Legend below */}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
                {dataset.map((item) => {
                    const c = BAR_COLOR_MAP[item.color] || BAR_COLOR_MAP.cyan;
                    const t = item.icon === highlightIcon;
                    return (
                        <motion.div
                            key={item.icon}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                            style={{
                                background: t ? c.barBg : 'transparent',
                                border: t ? `2px solid ${c.border}` : '2px solid transparent',
                            }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: c.bar }} />
                            <span style={{ fontSize: 20 }}>{item.icon}</span>
                            <span className="font-bold" style={{ fontSize: 16, color: c.bar }}>{item.count}</span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// ── CHART ROUTER ──────────────────

function ChartDisplay({ chartType, dataset, highlightIcon }) {
    switch (chartType) {
        case 'PICTOGRAPH':
            return <Pictograph dataset={dataset} highlightIcon={highlightIcon} />;
        case 'DOT_PLOT':
            return <DotPlot dataset={dataset} highlightIcon={highlightIcon} />;
        case 'PIE_CHART':
            return <PieChart dataset={dataset} highlightIcon={highlightIcon} />;
        case 'BAR':
        default:
            return <BarChart dataset={dataset} highlightIcon={highlightIcon} />;
    }
}

/**
 * QuestionPrompt — Dynamic question text based on subtype
 * Large, bold, and impossible to miss
 */
function QuestionPrompt({ question, isAnswered }) {
    const { questionText, answer, answerColor, highlightIcon, dataset } = question;
    const targetItem = highlightIcon ? dataset.find((d) => d.icon === highlightIcon) : null;
    const targetColor = targetItem
        ? (BAR_COLOR_MAP[targetItem.color] || BAR_COLOR_MAP.cyan).bar
        : '#fbbf24';

    return (
        <div className="flex items-center gap-3 flex-wrap justify-center">
            <div
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl"
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1.5px solid ${targetColor}30`,
                }}
            >
                <span style={{ fontSize: 22 }}>🔍</span>
                <span
                    className="font-bold"
                    style={{ color: targetColor, fontSize: 20 }}
                >
                    {questionText}
                </span>
            </div>

            <span className="text-2xl font-bold text-slate-500">=</span>

            <AnswerSlot answer={answer} answerColor={answerColor} isAnswered={isAnswered} />
        </div>
    );
}

/**
 * ScanDataLayout — Full layout for Data Handling mission
 *
 * Vertical layout:
 *   1. Grouped icon rows (counting area)
 *   2. Chart (Bar / Pictograph / Dot Plot) — auto-selected
 *   3. Question prompt with answer drop zone
 */
function ScanDataLayout({ question, isAnswered, onBuildChartSubmit }) {
    const { dataset, highlightIcon, chartType, subtype } = question;
    const isBuildChart = subtype === 'BUILD_CHART';
    const chartLabel = isBuildChart ? '🏗️ Build Chart' : (CHART_LABELS[chartType] || CHART_LABELS.BAR);

    return (
        <motion.div
            className="glass-panel-strong px-5 py-5 md:px-7 md:py-6 flex flex-col items-center gap-4 w-full"
            style={{ maxWidth: 680, minWidth: 340, maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`scandata-${chartType}-${question.questionText}-${question.answer}`}
        >
            {/* Holographic scan line */}
            <div className="scan-line" />

            {/* Section 1 — Grouped Countable Icons (Concrete stage of CRA) */}
            <motion.div variants={itemVariants} className="w-full">
                <GroupedIcons dataset={dataset} highlightIcon={highlightIcon} />
            </motion.div>

            {/* Divider with chart type label */}
            <div className="w-full flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                <span className="text-sm uppercase tracking-widest text-slate-500 font-bold whitespace-nowrap">{chartLabel}</span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            </div>

            {isBuildChart ? (
                /* BUILD_CHART — Interactive bar building (Representational stage of CRA) */
                <motion.div variants={itemVariants} className="w-full">
                    <InteractiveBarChart
                        dataset={dataset}
                        maxCount={Math.max(...dataset.map(d => d.count))}
                        onComplete={onBuildChartSubmit}
                        isAnswered={isAnswered}
                    />
                </motion.div>
            ) : (
                /* Standard passive chart + question prompt */
                <>
                    <motion.div variants={itemVariants} className="w-full flex justify-center">
                        <ChartDisplay chartType={chartType} dataset={dataset} highlightIcon={highlightIcon} />
                    </motion.div>

                    <div className="w-full flex items-center gap-3">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                        <span className="text-sm uppercase tracking-widest text-slate-500 font-bold">🎯 mission</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    </div>

                    <QuestionPrompt question={question} isAnswered={isAnswered} />
                </>
            )}
        </motion.div>
    );
}
