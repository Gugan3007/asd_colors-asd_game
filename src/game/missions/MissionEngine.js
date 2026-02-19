/**
 * MissionEngine — Dynamic Mission Type Rotation
 * 
 * Manages the 3 mission types that rotate every 3 questions:
 *   A) FUEL_ENGINE    — Classic addition/subtraction
 *   B) CRACK_CODE     — Sequence completion (2, 4, ?, 8)
 *   C) BALANCE_CARGO  — Comparison (5 ? 3 → drag <, >, =)
 * 
 * Each mission type has its own question generator.
 * All generators ensure no negative results for subtraction.
 */

// ─── Mission Types ─── //
export const MISSION_TYPES = {
    FUEL_ENGINE: 'FUEL_ENGINE',
    CRACK_CODE: 'CRACK_CODE',
    BALANCE_CARGO: 'BALANCE_CARGO',
    SCAN_DATA: 'SCAN_DATA',
};

export const MISSION_META = {
    [MISSION_TYPES.FUEL_ENGINE]: {
        title: 'Fuel the Engine',
        icon: '⚡',
        description: 'Solve the equation to fuel up!',
        color: 'cyan',
    },
    [MISSION_TYPES.CRACK_CODE]: {
        title: 'Crack the Code',
        icon: '🔐',
        description: 'Find the missing number!',
        color: 'magenta',
    },
    [MISSION_TYPES.BALANCE_CARGO]: {
        title: 'Balance the Cargo',
        icon: '⚖️',
        description: 'Compare the numbers!',
        color: 'lime',
    },
    [MISSION_TYPES.SCAN_DATA]: {
        title: 'Scan Data',
        icon: '📊',
        description: 'Analyze the chart data!',
        color: 'amber',
    },
};

// ─── Rotation Order ─── //
const MISSION_ROTATION = [
    MISSION_TYPES.SCAN_DATA,
];

/**
 * Get the current mission type based on the question index (0-based).
 * Rotates every 3 questions.
 */
export function getMissionType(questionIndex) {
    const cycleIndex = Math.floor(questionIndex / 3) % MISSION_ROTATION.length;
    return MISSION_ROTATION[cycleIndex];
}

// ─── Helpers ─── //
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const ORB_COLORS = ['cyan', 'magenta', 'lime', 'amber', 'rose'];

function randomColor() {
    return ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)];
}

/**
 * Generate wrong answers that are close to the correct answer
 * but never negative and never duplicate the correct answer.
 */
function generateWrongAnswers(correct, count = 2, maxOffset = 3) {
    const wrongs = new Set();
    let attempts = 0;
    while (wrongs.size < count && attempts < 50) {
        const offset = randomInt(1, maxOffset) * (Math.random() > 0.5 ? 1 : -1);
        const wrong = correct + offset;
        if (wrong > 0 && wrong !== correct) {
            wrongs.add(wrong);
        }
        attempts++;
    }
    // Fallback if we couldn't generate enough
    while (wrongs.size < count) {
        wrongs.add(correct + wrongs.size + 1);
    }
    return Array.from(wrongs);
}

// ══════════════════════════════════════════
//   MISSION A: FUEL THE ENGINE
//   Classic Addition/Subtraction
// ══════════════════════════════════════════

export function generateFuelEngineQuestion(level) {
    let num1, num2, operator, answer;

    if (level === 1) {
        // Level 1: Simple Addition (Sum <= 10)
        num1 = randomInt(1, 5);
        num2 = randomInt(1, 5);
        operator = '+';
        answer = num1 + num2;
    } else if (level === 2) {
        // Level 2: Addition (Sum <= 20) & Subtraction
        if (Math.random() > 0.5) {
            num1 = randomInt(5, 12);
            num2 = randomInt(2, 8);
            operator = '+';
            answer = num1 + num2;
        } else {
            num1 = randomInt(8, 20);
            num2 = randomInt(2, 7);
            operator = '-';
            answer = num1 - num2;
        }
    } else if (level <= 4) {
        // Levels 3-4: Intro to Multiplication & Larger +/-
        const roll = Math.random();
        if (roll < 0.4) {
            // Intro Multiplication (2x to 5x tables)
            num1 = randomInt(2, 5);
            num2 = randomInt(2, 9);
            operator = '×';
            answer = num1 * num2;
        } else {
            // Harder Add/Sub
            operator = Math.random() > 0.5 ? '+' : '-';
            if (operator === '+') {
                num1 = randomInt(15, 30);
                num2 = randomInt(5, 20);
                answer = num1 + num2;
            } else {
                num1 = randomInt(20, 50);
                num2 = randomInt(5, 15);
                answer = num1 - num2;
            }
        }
    } else {
        // Level 5+: Full Challenge (Add/Sub/Mul/Div)
        const roll = Math.random();
        if (roll < 0.25) {
            // Division (Integer result)
            const divisor = randomInt(2, 9);
            const quotient = randomInt(2, 9);
            num1 = divisor * quotient;
            num2 = divisor;
            operator = '÷';
            answer = quotient;
        } else if (roll < 0.5) {
            // Multiplication (up to 12x12)
            num1 = randomInt(3, 12);
            num2 = randomInt(3, 12);
            operator = '×';
            answer = num1 * num2;
        } else {
            // Large Add/Sub
            if (Math.random() > 0.5) {
                num1 = randomInt(20, 100);
                num2 = randomInt(10, 50);
                operator = '+';
                answer = num1 + num2;
            } else {
                num1 = randomInt(50, 150);
                num2 = randomInt(10, 50);
                operator = '-';
                answer = num1 - num2;
            }
        }
    }

    const answerColor = randomColor();
    // Use wider wrong answers for harder levels to avoid obvious guesses
    const maxOffset = level <= 2 ? 3 : randomInt(3, 8);
    const wrongs = generateWrongAnswers(answer, 2, maxOffset);

    const choices = shuffleArray([
        { value: answer, color: answerColor, isCorrect: true },
        ...wrongs.map((w) => ({ value: w, color: randomColor(), isCorrect: false })),
    ]);

    return {
        type: MISSION_TYPES.FUEL_ENGINE,
        num1,
        num2,
        operator,
        answer,
        answerColor,
        choices,
        // Visual math dots only for level 1
        showDots: level === 1,
    };
}

// ══════════════════════════════════════════
//   MISSION B: CRACK THE CODE
//   Sequence Completion
// ══════════════════════════════════════════

export function generateCrackCodeQuestion(level) {
    // Generate an arithmetic sequence with a missing element
    const step = level <= 2 ? randomInt(1, 3) : randomInt(2, 5);
    const isAddition = Math.random() > 0.3; // Mostly addition sequences
    const actualStep = isAddition ? step : -step;

    // Sequence length: 4 numbers
    const start = isAddition ? randomInt(1, 10) : randomInt(step * 4, step * 4 + 10);

    const sequence = [];
    for (let i = 0; i < 4; i++) {
        sequence.push(start + actualStep * i);
    }

    // Ensure no negative numbers in the sequence
    if (sequence.some((n) => n < 0)) {
        // Fallback to simple addition sequence
        const safeStart = randomInt(1, 5);
        const safeStep = randomInt(1, 3);
        for (let i = 0; i < 4; i++) {
            sequence[i] = safeStart + safeStep * i;
        }
    }

    // Pick which position is the "?" (index 1 or 2 to avoid trivial start/end)
    const missingIndex = randomInt(1, 2);
    const answer = sequence[missingIndex];

    const answerColor = randomColor();
    const wrongs = generateWrongAnswers(answer, 2, step + 1);

    const choices = shuffleArray([
        { value: answer, color: answerColor, isCorrect: true },
        ...wrongs.map((w) => ({ value: w, color: randomColor(), isCorrect: false })),
    ]);

    return {
        type: MISSION_TYPES.CRACK_CODE,
        sequence,
        missingIndex,
        answer,
        answerColor,
        choices,
        step: Math.abs(actualStep),
        direction: isAddition ? 'ascending' : 'descending',
    };
}

// ══════════════════════════════════════════
//   MISSION C: BALANCE THE CARGO
//   Number Comparison
// ══════════════════════════════════════════

export function generateBalanceCargoQuestion(level) {
    let num1, num2;

    if (level <= 2) {
        num1 = randomInt(1, 10);
        num2 = randomInt(1, 10);
    } else if (level <= 4) {
        num1 = randomInt(10, 50);
        num2 = randomInt(10, 50);
    } else {
        num1 = randomInt(20, 100);
        num2 = randomInt(20, 100);
    }

    // Determine correct answer
    let answer;
    if (num1 > num2) answer = '>';
    else if (num1 < num2) answer = '<';
    else answer = '=';

    const answerColor = randomColor();

    // Choices are always the three comparison operators
    const allOperators = ['<', '>', '='];
    const choices = shuffleArray(
        allOperators.map((op) => ({
            value: op,
            color: op === answer ? answerColor : randomColor(),
            isCorrect: op === answer,
        }))
    );

    return {
        type: MISSION_TYPES.BALANCE_CARGO,
        num1,
        num2,
        answer,
        answerColor,
        choices,
        isOperatorMode: true, // Tells NumberOrb to render symbols
    };
}

// ══════════════════════════════════════════
//   MISSION D: SCAN DATA
//   Counting & Simple Bar Charts (5 subtypes)
// ══════════════════════════════════════════

const SPACE_ICONS = [
    { icon: '⭐', color: 'cyan',    label: 'Stars' },
    { icon: '🌙', color: 'magenta', label: 'Moons' },
    { icon: '🪐', color: 'lime',    label: 'Planets' },
    { icon: '☄️', color: 'amber',   label: 'Comets' },
    { icon: '🚀', color: 'rose',    label: 'Rockets' },
];

/**
 * Question subtypes for data handling variety:
 *   COUNT         — "How many ⭐?"
 *   MOST          — "Which has the most?"  (answer is an icon)
 *   LEAST         — "Which has the least?" (answer is an icon)
 *   TOTAL         — "How many objects in total?"
 *   COMPARE_BARS  — "⭐ has ___ more than 🌙"
 *
 * Chart types rotated for visual variety:
 *   BAR           — Vertical bar chart with unit blocks
 *   PICTOGRAPH    — Rows of icons (each icon = 1 unit)
 *   DOT_PLOT      — Colored dots stacked in columns
 */
const SCAN_SUBTYPES = ['COUNT', 'MOST', 'LEAST', 'TOTAL', 'COMPARE_BARS'];
const CHART_TYPES = ['BAR', 'PICTOGRAPH', 'DOT_PLOT', 'PIE_CHART'];

export function generateScanDataQuestion(level) {
    // Pick 2-4 icon types depending on level
    const iconCount = level <= 1 ? 2 : level <= 3 ? 3 : 4;
    const shuffledIcons = shuffleArray([...SPACE_ICONS]).slice(0, iconCount);

    // Assign counts (1-6) scaled by level
    const maxCount = Math.min(6, 2 + level);
    const dataset = shuffledIcons.map((item) => ({
        icon: item.icon,
        color: item.color,
        label: item.label,
        count: randomInt(1, maxCount),
    }));

    // Ensure no ties for MOST/LEAST by nudging if needed
    const counts = dataset.map(d => d.count);
    const uniqueCounts = new Set(counts);
    if (uniqueCounts.size < dataset.length) {
        // Spread counts apart slightly
        dataset.forEach((d, i) => {
            d.count = Math.max(1, d.count + i);
        });
    }

    // Choose subtype based on level — beginners get COUNT/TOTAL, advanced get all
    let availableSubtypes;
    if (level <= 1) {
        availableSubtypes = ['COUNT', 'TOTAL'];
    } else if (level <= 3) {
        availableSubtypes = ['COUNT', 'MOST', 'LEAST', 'TOTAL'];
    } else {
        availableSubtypes = [...SCAN_SUBTYPES];
    }
    const subtype = availableSubtypes[randomInt(0, availableSubtypes.length - 1)];

    let answer, answerColor, targetIcon, questionText, highlightIcon;
    let choices;

    switch (subtype) {
        case 'COUNT': {
            const idx = randomInt(0, dataset.length - 1);
            targetIcon = dataset[idx].icon;
            highlightIcon = targetIcon;
            answer = dataset[idx].count;
            answerColor = dataset[idx].color;
            questionText = `How many ${targetIcon} ?`;
            const wrongs = generateWrongAnswers(answer, 2, 2);
            choices = shuffleArray([
                { value: answer, color: answerColor, isCorrect: true },
                ...wrongs.map((w) => ({ value: w, color: randomColor(), isCorrect: false })),
            ]);
            break;
        }
        case 'MOST': {
            const sorted = [...dataset].sort((a, b) => b.count - a.count);
            targetIcon = sorted[0].icon;
            highlightIcon = null;
            answer = sorted[0].icon;
            answerColor = sorted[0].color;
            questionText = 'Which has the MOST?';
            // Choices are icons
            choices = shuffleArray(
                dataset.map((d) => ({
                    value: d.icon,
                    color: d.color,
                    isCorrect: d.icon === answer,
                    isIconChoice: true,
                }))
            );
            break;
        }
        case 'LEAST': {
            const sorted = [...dataset].sort((a, b) => a.count - b.count);
            targetIcon = sorted[0].icon;
            highlightIcon = null;
            answer = sorted[0].icon;
            answerColor = sorted[0].color;
            questionText = 'Which has the LEAST?';
            choices = shuffleArray(
                dataset.map((d) => ({
                    value: d.icon,
                    color: d.color,
                    isCorrect: d.icon === answer,
                    isIconChoice: true,
                }))
            );
            break;
        }
        case 'TOTAL': {
            targetIcon = null;
            highlightIcon = null;
            const total = dataset.reduce((sum, d) => sum + d.count, 0);
            answer = total;
            answerColor = 'cyan';
            questionText = 'How many objects in TOTAL?';
            const wrongs = generateWrongAnswers(answer, 2, 3);
            choices = shuffleArray([
                { value: answer, color: answerColor, isCorrect: true },
                ...wrongs.map((w) => ({ value: w, color: randomColor(), isCorrect: false })),
            ]);
            break;
        }
        case 'COMPARE_BARS': {
            // Pick two items, ask the difference
            const pair = shuffleArray([...dataset]).slice(0, 2);
            const bigger = pair[0].count >= pair[1].count ? pair[0] : pair[1];
            const smaller = pair[0].count >= pair[1].count ? pair[1] : pair[0];
            targetIcon = bigger.icon;
            highlightIcon = bigger.icon;
            const diff = bigger.count - smaller.count;
            answer = diff;
            answerColor = bigger.color;
            questionText = `${bigger.icon} has ___ more than ${smaller.icon}`;
            const wrongs = generateWrongAnswers(answer, 2, 2);
            choices = shuffleArray([
                { value: answer, color: answerColor, isCorrect: true },
                ...wrongs.map((w) => ({ value: w, color: randomColor(), isCorrect: false })),
            ]);
            break;
        }
        default: {
            // Fallback to COUNT
            const idx = 0;
            targetIcon = dataset[idx].icon;
            highlightIcon = targetIcon;
            answer = dataset[idx].count;
            answerColor = dataset[idx].color;
            questionText = `How many ${targetIcon} ?`;
            const wrongs = generateWrongAnswers(answer, 2, 2);
            choices = shuffleArray([
                { value: answer, color: answerColor, isCorrect: true },
                ...wrongs.map((w) => ({ value: w, color: randomColor(), isCorrect: false })),
            ]);
        }
    }

    // Pick a random chart type for visual variety
    const chartType = CHART_TYPES[randomInt(0, CHART_TYPES.length - 1)];

    return {
        type: MISSION_TYPES.SCAN_DATA,
        subtype,
        chartType,
        dataset,
        targetIcon,
        highlightIcon,
        answer,
        answerColor,
        choices,
        questionText,
        isIconChoice: subtype === 'MOST' || subtype === 'LEAST',
    };
}

// ══════════════════════════════════════════
//   UNIFIED QUESTION GENERATOR
// ══════════════════════════════════════════

/**
 * Generate a question based on the current mission type and level.
 * @param {string} missionType - One of MISSION_TYPES
 * @param {number} level - Current game level
 * @returns {object} Question object
 */
export function generateQuestion(missionType, level) {
    switch (missionType) {
        case MISSION_TYPES.CRACK_CODE:
            return generateCrackCodeQuestion(level);
        case MISSION_TYPES.BALANCE_CARGO:
            return generateBalanceCargoQuestion(level);
        case MISSION_TYPES.SCAN_DATA:
            return generateScanDataQuestion(level);
        case MISSION_TYPES.FUEL_ENGINE:
        default:
            return generateFuelEngineQuestion(level);
    }
}
