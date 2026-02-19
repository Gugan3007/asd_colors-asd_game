# Nebula Number Navigator — Lab2 Report

---

**Name:** Gugan S S
**Roll No:** CB.SC.U4CSE23416

---

## 1. Roll Number & Name

| Field | Details |
|:------|:--------|
| **Student Name** | Gugan S S |
| **Roll Number** | CB.SC.U4CSE23416 |
| **Project Title** | Nebula Number Navigator — An Accessible Math Learning Portal for Children with Autism Spectrum Disorder (ASD) |
| **Technology Stack** | React 19.2.0, Vite 7.3.1, Tailwind CSS 4.1.18, Framer Motion 12.34.0, html2canvas 1.4.1, React Router DOM 7.13.0, Lucide React 0.564.0 |
| **GitHub Repository** | https://github.com/Gugan3007/asd_colors-asd_game |
| **Live Deployment** | https://asd-colors-asd-game.vercel.app |

---

## 2. About the Use Case

### 2.1 Why This Portal Is Required for Autism Kids

Children with Autism Spectrum Disorder (ASD) face significant barriers in mainstream educational software. Most math learning apps are designed for neurotypical users and employ rapid-fire stimuli, unpredictable animations, competitive timers, and harsh error feedback — all of which can trigger sensory overload, meltdowns, and task avoidance in autistic children.

**Nebula Number Navigator** is purpose-built to address this gap. It is a sensory-safe, distraction-minimized, space-themed math learning portal that transforms abstract mathematics into a concrete, visual, and emotionally safe experience. The portal is required because:

1. **Sensory Processing Disorder (SPD)** affects 69–95% of autistic children (Marco et al., 2011). Standard educational apps with bright flashing colours, abrupt sounds, and busy layouts cause physical discomfort and cognitive shutdown.
2. **Math anxiety** is amplified in ASD learners due to fear of failure and difficulty with abstract concepts. Errorless learning techniques dramatically reduce anxiety (Mueller et al., 2007).
3. **Attention regulation challenges** mean autistic children need structured, predictable interfaces with clear visual cues and natural break points (Ozonoff et al., 2005).
4. **Communication barriers** prevent many ASD children from asking for help. The robot companion provides non-verbal emotional scaffolding and contextual hints without requiring social interaction.
5. **Screen time concerns** are addressed by providing structured, educational content with built-in transition points — community research from 100+ ASD parents confirms that structured screen time with clear endpoints is beneficial (r/Autism_Parenting, 2024).

### 2.2 Challenges in Autism Kids That Need Improvement Using This Portal

| Challenge | How The Portal Addresses It |
|:----------|:----------------------------|
| **Sensory Overload** | Low-stimulation space theme with muted neon-on-dark palette; no harsh colours; `#F4F7F6` anti-glare background in Lab1; gentle CSS animations without flashing |
| **Abstract Math Difficulty** | CRA (Concrete–Representational–Abstract) methodology — icons counted first (concrete), bar charts built interactively (representational), numbers shown last (abstract) |
| **Fear of Failure / Math Anxiety** | Errorless learning — ghost bars scaffold correct answers; clamped inputs prevent impossible states; gentle "Almost there!" feedback instead of punitive "Wrong!" messages |
| **Short Attention Span** | Idle timer detects 10s of inactivity → hints the correct answer with a gentle glow; robot companion re-engages with "Zzz… systems in standby… 😴" |
| **Difficulty with Transitions** | 6 questions per level provide natural break points; level-complete celebrations are transition markers; warp animation signals context change |
| **Weak Central Coherence** | Tunnel-vision layout (max 680px width); consistent grid placement; predictable left-to-right, bottom-to-top chart structure |
| **Communication Barriers** | Robot companion models emotions (idle, excited, cheering, confused, sleeping) using simple language and emojis |
| **Photophobia / Visual Snow** | Cool grey-green backgrounds reduce luminance; no pure white (`#FFFFFF`) surfaces; "Low Stim Mode" flattens all visual complexity |
| **Distractibility / Tab-Switching** | Window blur detection — when the child leaves the tab, the robot gently says "Come back, navigator! 🛸" without punitive consequences |

### 2.3 Highlights and Novelty Proposed in This Portal

1. **CRA-Based Interactive Bar Chart Builder** — The first ASD-focused math game to implement the full Concrete–Representational–Abstract methodology digitally. Children count real icons, build bars by clicking grid cells, and see numerical abstractions emerge.

2. **Errorless Learning with Ghost Bar Scaffolding** — Dashed-outline "ghost bars" show the target height without revealing the answer, providing just-enough scaffolding. Height inputs are clamped to valid ranges, making it impossible to enter nonsensical values.

3. **Multi-Chart Data Handling Engine** — A single mission type renders four distinct chart visualizations (Bar Chart, Pictograph, Dot Plot, Pie Chart) with six question subtypes (COUNT, MOST, LEAST, TOTAL, COMPARE_BARS, BUILD_CHART), providing variety without increasing cognitive load.

4. **Emotionally Responsive Robot Companion** — An SVG-based animated companion with five emotional states (sleeping, idle, excited, cheering, confused) that mirrors game events in real-time, providing non-verbal emotional scaffolding.

5. **Screen Capture as Tangible Reward** — After building a correct chart, children can press "📸 Save My Chart!" to download their creation as a PNG sticker using html2canvas. This bridges digital interaction with real-world output.

6. **Adaptive Difficulty Engine** — Question complexity scales across 5+ levels: Level 1 uses 2 icon types with counts 1–3; Level 5+ uses 4 icon types with counts 1–8, comparison questions, and chart building.

7. **Combo Warp Speed System** — Consecutive correct answers trigger visual "Warp Speed" effects that reward sustained focus without punishing intermittent errors.

8. **Attention Management via Idle Timer + Window Blur Detection** — A dual-system approach: idle timer detects 10 seconds of inactivity within the game; window blur detects tab-switching. Both trigger gentle, character-driven re-engagement.

9. **Sensory-Safe Error Boundary** — A React class component catches any runtime JavaScript crash and displays a friendly recovery UI instead of a blank white screen, ensuring the child is never stranded.

10. **Research-Backed ASD Colour Palette** — Every colour in the application is selected based on published clinical research: `#CD6155` (soft coral for errors), `#5DADE2` (calm blue for actions), `#FDFCF0` (warm paper for low-stim mode).

### 2.4 Importance of Visualisation in Relevance to the Portal Aspects

Visualisation is the central pillar of this portal because autistic children process information differently from neurotypical users:

1. **Visual-Spatial Strengths:** Research shows that many autistic children have superior visual-spatial processing (Grandin, 2006). Our bar charts, dot plots, and pie charts leverage this strength to make abstract numbers tangible.

2. **Concrete-to-Abstract Bridge:** The CRA methodology requires visualisation as the bridge between physical objects and abstract numbers. The interactive bar chart IS the representational stage — children physically see numbers grow as they click cells.

3. **Predictability Through Visual Consistency:** Every chart type uses the same colour palette (cyan, magenta, lime, amber, rose), the same icon set (⭐🌙🪐☄️🚀), and the same spatial layout conventions. This visual consistency reduces cognitive load.

4. **Immediate Visual Feedback:** Green checkmarks (✓) appear instantly on each correctly matched bar. The progress pips at the bottom show bar-by-bar completion. The pulsing submit button changes state when all bars match. Every piece of feedback is visual first, textual second.

5. **Parallax Starfield as Calming Background:** The three-layer parallax star system (far/mid/near) with mouse-driven motion creates a living, breathing space environment that is engaging without being overstimulating. Research shows that predictable, slow environmental motion has a calming effect on ASD learners (Koenig & Rudney, 2010).

6. **Animated Chart Rendering:** Bars animate in sequentially (staggered 0.15s delay per column) from bottom to top, allowing children to see numbers being "built" rather than appearing instantly. This mirrors the physical counting process.

7. **Pie Chart Donut Visualisation:** The SVG-based pie chart uses a donut shape with labelled slices and a centre total, teaching proportional thinking through visual area comparison.

---

## 3. List of Operations in the Portal with Purpose

| # | Operation Name | Expected Output | React.js Concepts Used | How the Concept Improves the Application |
|:-:|:---------------|:----------------|:-----------------------|:------------------------------------------|
| 1 | **Title Screen & Game Launch** | Animated title with orbit rings, ship icon, and "Launch Mission" button. Clicking starts the game. | `useState` (game state machine), `useCallback` (memoized start handler), `AnimatePresence` (mount/unmount transitions), Framer Motion `motion.div` (spring animations) | The state machine pattern (`TITLE → MISSION_INTRO → PLAYING → CELEBRATING → LEVEL_COMPLETE → PROGRESS_MAP`) ensures the UI is always in a predictable, valid state — critical for ASD learners who need consistency. `AnimatePresence` ensures smooth transitions between game phases without jarring cuts. |
| 2 | **Mission Banner Display** | Full-screen animated banner showing mission type (icon + title + description) before each new mission phase. | `AnimatePresence` (enter/exit animations), Framer Motion spring physics (`stiffness: 250, damping: 20`), Imported constants from `MissionEngine` | Provides a clear visual "chapter marker" that prepares the child for what's coming next, reducing anxiety about unexpected changes. Spring physics create a satisfying, natural motion that doesn't startle. |
| 3 | **Grouped Icon Counting (Concrete CRA Stage)** | Rows of space icons (⭐🌙🪐☄️🚀) displayed at 32px with colour-coded backgrounds. Target icon row is highlighted. | `Array.from()` + `.map()` for dynamic rendering, `motion.div` with staggered delays, Inline `style` objects for conditional highlighting | The `.map()` renders exactly the right number of icons per type, enforcing one-to-one correspondence. Staggered animation lets children count icons as they appear, mimicking physical counting. |
| 4 | **Bar Chart Rendering (Passive)** | Vertical bar chart with stacked unit blocks, Y-axis labels, gridlines, and count badges. Target bar glows. | `useMemo` (memoized calculations), Framer Motion `scaleY` animation per block, CSS Grid for bar layout, `motion.div` initial/animate/transition | `useMemo` prevents recalculation on every render, keeping the UI responsive. Per-block `scaleY` animation builds bars visually from bottom to top, reinforcing the count-to-height mapping. |
| 5 | **Pictograph Rendering** | Horizontal rows of coloured blocks (1 block = 1 unit) with icon labels and column numbers. | `Array.from({ length: maxCount })` generates exact block grids, `motion.div` with sequential delays per cell, CSS Flexbox | Each block maps to exactly one counted object, maintaining the one-to-one correspondence principle. Sequential animation lets children follow the count left-to-right. |
| 6 | **Dot Plot Rendering** | Coloured dots stacked vertically in columns with Y-axis labels and icon labels below. | `flex-col-reverse` for bottom-to-top stacking, `motion.div` spring animation per dot, radial-gradient for 3D dot effect | Bottom-to-top stacking mirrors natural counting direction. Spring physics on each dot makes the visualisation feel alive and tangible. |
| 7 | **Pie Chart Rendering** | SVG donut chart with animated arc paths, labelled slices, centre total, and colour legend. | SVG `<path>` elements with computed arc mathematics (`polarToXY`, `arcPath` functions), `motion.path` for animated entrance, `Math.cos`/`Math.sin` for coordinate geometry | Introduces proportional thinking through visual area comparison. SVG ensures crisp rendering at any screen size. Mathematical arc computation demonstrates applied trigonometry. |
| 8 | **Interactive Bar Chart Builder (Representational CRA Stage)** | Clickable grid where children build bars by clicking cells. Ghost bars show targets, green ✓ marks correct bars. | `useState` (heights array, selectedBar, hoveredCell), `useCallback` (setBarHeight, handleCellClick, handleKeyDown), `useRef` (containerRef, chartRef), `useMemo` (allCorrect, matchCount derivations), `useEffect` (reset on dataset change, auto-focus) | Multiple `useState` hooks manage independent pieces of state without coupling. `useCallback` with dependency arrays prevents unnecessary re-renders during rapid clicking. `useMemo` efficiently derives "all correct" status from heights array without recalculating on every render. |
| 9 | **Keyboard Navigation** | Arrow keys adjust bar heights (↑↓), switch bars (←→). Tab cycles bars. Number keys set height directly. Enter/Space submits. | `onKeyDown` event handler with `switch` statement, `e.preventDefault()` for key interception, `useCallback` memoization | Full keyboard accessibility ensures children who cannot use a mouse (motor difficulties common in ASD) can still interact. `preventDefault` stops arrow keys from scrolling the page. |
| 10 | **Drag-and-Drop Orb Answers** | Draggable number orbs that must be dropped onto the answer zone. Correct drops trigger celebration; wrong drops trigger gentle feedback. | Framer Motion `drag` prop, `onDragEnd` handler with `getBoundingClientRect()` hit-testing, `dragConstraints` (ref-based), `dragElastic: 0.5` | Drag interaction engages kinaesthetic learners. Hit-zone detection with ±30px tolerance is forgiving for children with fine motor challenges. `dragElastic` creates a rubber-band feel that guides orbs back if dropped outside the zone. |
| 11 | **Combo / Warp Speed System** | Consecutive correct answers increment a combo counter. At combo ≥ 2, "Warp Speed" visual effects trigger. | Custom `useCombo` hook (`useState` + `useCallback`), Conditional CSS classes, Framer Motion animation variants | Rewards sustained attention without punishing mistakes — wrong answers reset the combo but don't subtract from score. The hook encapsulates combo logic, making it reusable and testable. |
| 12 | **Idle Timer Hint System** | After 10 seconds of no interaction, the correct orb gently glows and the robot companion shows a hint. | Custom `useIdleTimer` hook (`useState` + `useEffect` + `useRef` + `useCallback`), Window event listeners (`mousemove`, `mousedown`, `touchstart`, `keydown`) | Detects inactivity without intrusive popups. Uses `useRef` for the timer ID to avoid stale closures. Passive event listeners prevent performance degradation. |
| 13 | **Robot Companion Emotional States** | Animated SVG robot with 5 emotion states (sleeping, idle, excited, cheering, confused). Arms rotate, eyes change, speech bubbles appear. | Framer Motion named `variants` object (`bodyVariants`), `AnimatePresence` for speech bubbles, SVG animation, Conditional rendering based on `emotion` prop | Named variants allow smooth transitions between emotional states with a single prop change. The companion provides non-verbal social-emotional feedback that ASD children can understand without reading complex text. |
| 14 | **Parallax Starfield Background** | Three-layer star system that shifts based on mouse position. Far stars move slowly, near stars move more. | Custom `useMouseParallax` hook (Framer Motion `useMotionValue` + `useSpring`), `useTransform` for parallax offsets, `useMemo` for static star generation | `useMotionValue` + `useSpring` create buttery-smooth parallax without re-rendering React components on every mouse move. `useMemo` generates star positions once, preventing layout thrashing. |
| 15 | **Sound System Architecture** | Named sound effects (click, whoosh, success, error, warp, combo, levelUp, hint) triggered at interaction points. | Custom `useSound` hook, `useRef` for enable toggle, `useCallback` for memoized `play` function | Centralised sound registry allows easy replacement of console placeholders with actual audio files (Howler.js). `useRef` avoids re-renders when toggling sound on/off. |
| 16 | **Screen Capture & Download** | Children press "📸 Save My Chart!" to download their built chart as a PNG file. | Custom `useScreenCapture` hook, Dynamic `import()` for html2canvas (code-splitting), `useRef` for element reference, `document.createElement('a')` for download trigger | Dynamic import loads the 201KB html2canvas library only when the user clicks capture, reducing initial bundle size. The hook follows the React composition pattern — capture logic is reusable across any component. |
| 17 | **Level Progression & Progress Map** | After 6 questions, a level-complete overlay shows score/level. Then a planet-to-planet progress map displays the journey. | `AnimatePresence` for overlay mount/unmount, Framer Motion staggered children (`staggerChildren: 0.1`), Spring physics for planet reveal | The progress map gives children a spatial mental model of their progress — "I'm on Planet Nova Prime!" — which is more motivating and concrete than a progress bar. |
| 18 | **Theme Context & Low Stim Toggle** | Toggle between "Calm Mode" and "Low Stim Mode." Low Stim removes all decorative elements. | React `createContext` + `useContext` (Context API), `ThemeProvider` wrapper, Conditional CSS classes based on `isLowStim` state | Context API provides global theme state without prop drilling through 15+ components. The toggle empowers the child/caregiver to control sensory load in real-time. |
| 19 | **Routing (Multi-Page SPA)** | Three pages: Home (`/`), Profile (`/profile`), Game (`/game`) with client-side navigation. No page reloads. | `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `Link`), Route-based code organisation | Client-side routing eliminates page reload flash which can startle ASD users. Each page has a clear purpose, supporting the "one task per screen" design principle. |
| 20 | **Child Profile & Cognitive Assessment** | Class-component form with text/number/email/select/checkbox inputs. Generates personalised recommendations based on cognitive level, communication style, and sensory profile. | React Class Component (`extends Component`), `constructor` with `this.state`, Controlled form inputs (`value={this.state.x}`, `onChange`), `this.setState()`, Form validation, Method binding (`this.handleSubmit.bind(this)`) | Class component demonstrates the full React class lifecycle. Controlled inputs ensure form state is always in sync with the UI. Personalised recommendations transform raw form data into actionable caregiver guidance. |
| 21 | **Error Boundary** | Catches any runtime JavaScript crash and shows a friendly error message + "🔄 Reload Page" button instead of a blank white screen. | React Class Component with `static getDerivedStateFromError()` and `componentDidCatch()` lifecycle methods | Error boundaries can only be implemented as class components in React. This ensures the ASD child never sees a blank white page (which could cause confusion and distress). |
| 22 | **Warp Transition Effect** | Full-screen hyperspace jump animation between levels with radial conic-gradient streaks and white flash. | Framer Motion `AnimatePresence`, CSS `repeating-conic-gradient`, CSS `@keyframes` animation, `mix-blend-mode: screen` | Provides a dramatic but brief (1.5s) visual marker that signals "something new is happening," helping ASD children prepare for a context change. |
| 23 | **Particle Explosion (Celebration)** | 18 colourful particles burst from screen centre on correct answers, then fade out. | `useMemo` (particle generation), `AnimatePresence`, Physics-based animation (angle, velocity, rotation per particle) | Celebrates correct answers with a visually satisfying but brief (0.7–1.1s) burst. `useMemo` ensures particle positions are computed only once per activation, not on every frame. |
| 24 | **Cockpit HUD** | Glassmorphic heads-up display showing Score, Level, Fuel gauge (progress), Combo counter, and Mission type. | Lucide React icons (`Star`, `Fuel`, `Zap`, `Gauge`, `Rocket`), Fixed positioning (`fixed top-4 left-4`), `motion.div` spring entrance, CSS `backdrop-blur` | Fixed positioning ensures HUD never shifts during gameplay. Glassmorphism creates depth without solid backgrounds that could obscure the game. Lucide icons are consistent, accessible SVGs. |
| 25 | **Window Blur/Focus Detection** | When the child leaves the browser tab, the robot says "Come back, navigator! 🛸". On return: "Welcome back! Let's continue! 🌟" | `useEffect` with `window.addEventListener('blur'/'focus')`, Cleanup function in return | Detects tab-switching without requiring browser permissions. The cleanup function in `useEffect` removes listeners on unmount, preventing memory leaks. No punitive mechanics — no timers, no progress loss. |

---

## 4. What Improvements Will This Application Bring to Autism Kids

| # | Improvement Area | How It Is Achieved | Expected Outcome |
|:-:|:-----------------|:-------------------|:-----------------|
| 1 | **Numerical Reasoning & Counting** | CRA methodology — concrete icons → representational bar building → abstract numbers. Six question subtypes (COUNT, MOST, LEAST, TOTAL, COMPARE_BARS, BUILD_CHART) cover the full spectrum of data-handling skills. | Children develop fluency in counting, comparing quantities, computing totals, and understanding differences — foundational skills for school mathematics. |
| 2 | **Memory Improvement** | Repeated exposure to the same icon set (⭐🌙🪐☄️🚀) across multiple chart types reinforces recognition. The combo system rewards recall of previously seen patterns. | Working memory is strengthened through spaced repetition. The consistent visual vocabulary reduces the memory load of learning new symbols. |
| 3 | **Contextual Learning** | All math concepts are embedded in a space exploration narrative ("Fuel the Engine", "Scan Data", "Balance Cargo"). The robot companion provides context-appropriate commentary. | Children learn math as a tool for exploration, not an isolated academic exercise. Narrative context aids long-term retention (Schank & Abelson, 1977). |
| 4 | **Fine Motor Skills** | Drag-and-drop orbs require controlled mouse/touch movement. Bar chart clicking requires precise cell targeting. Keyboard navigation provides an alternative. | Practises hand-eye coordination and fine motor control. The ±30px drop tolerance is forgiving for children with motor difficulties. |
| 5 | **Visual Processing & Data Literacy** | Four chart types (Bar, Pictograph, Dot Plot, Pie Chart) teach children to read and interpret data in multiple visual formats. | Builds visual literacy and the ability to extract information from graphs — a critical 21st-century skill. |
| 6 | **Emotional Regulation** | Robot companion models five emotional states. Gentle error feedback ("Almost there!") instead of punitive ("Wrong!"). Low Stim Mode for sensory overload. | Children learn that mistakes are part of learning, not causes for distress. The robot demonstrates emotional vocabulary (excited, confused, sleeping). |
| 7 | **Attention & Focus** | Idle timer detects inactivity → provides hints. Window blur detection notices tab-switching → gently re-engages. Combo system rewards sustained focus. | Builds the attention span incrementally — 6 questions per level is achievable even for children with short attention spans. |
| 8 | **Self-Regulation & Autonomy** | "Low Stim Mode" toggle gives children control over their sensory environment. "Save My Chart" creates ownership. No forced timers or mandatory sequences. | Empowers children to self-regulate, building independence and self-advocacy skills. |
| 9 | **Transition Tolerance** | Level-complete celebrations, warp transitions, and mission banners provide clear signals that something is changing. | Reduces transition-related meltdowns by making every change predictable and visually communicated in advance. |
| 10 | **Pride & Motivation** | Screen capture creates downloadable PNG "stickers" that can be printed. Progress map shows planetary journey. Combo counter celebrates streaks. | Tangible rewards (stickers) and visible progress (planet map) create a motivation loop that sustains engagement across sessions. |

---

## 5. Outputs with Explanations

### Output 1: Title Screen
**Description:** The landing page of Nebula Number Navigator. Features an animated spaceship with orbital rings, the game title with gradient text, a "Data Charts" mission preview badge, and a pulsing "Launch Mission" button. A robot companion greets the player from the bottom-left corner.
**Explanation:** The title screen establishes the space narrative and provides a single, clear call-to-action. The orbital animation is slow and predictable (3s cycle) to avoid startling. The glass-panel design uses `backdrop-blur` for depth without solid backgrounds.

### Output 2: Mission Banner
**Description:** When a new mission type begins, a full-screen animated banner displays the mission icon (📊), title ("Scan Data"), and description ("Analyze the chart data!"). It auto-dismisses after 1.8 seconds.
**Explanation:** The banner serves as a "chapter marker" that prepares the child for the upcoming question type. Spring physics (`stiffness: 250, damping: 20`) create a natural, non-jarring entrance.

### Output 3: Grouped Icon Counting (Concrete Stage)
**Description:** Space icons (e.g., 4 ⭐, 2 🌙, 5 🪐) are displayed in clearly separated rows with colour-coded backgrounds. Each icon is 32px with generous spacing. The target icon row is highlighted with a glowing border.
**Explanation:** This is the CRA "Concrete" stage — children can point to and count individual icons. One-to-one correspondence is enforced by rendering exactly `count` icons per row. The highlight draws attention to the relevant data without removing context.

### Output 4: Bar Chart Visualisation
**Description:** A vertical bar chart with thick unit blocks (32px each), Y-axis labels, horizontal gridlines, and count badges above each bar. The target bar glows with an inset shadow. Bars animate in sequentially from bottom to top.
**Explanation:** Each unit block represents one counted object, maintaining the concrete-to-representational mapping. Sequential animation mimics the physical act of stacking blocks. The glow effect uses `box-shadow` rather than CSS `filter: blur()` for performance.

### Output 5: Pictograph Visualisation
**Description:** Horizontal rows where each icon type has coloured blocks (1 block = 1 unit). Column numbers (1, 2, 3...) appear above. A legend explains "■ = 1 object."
**Explanation:** Pictographs are the standard data-handling representation in primary school curricula. The block-per-unit design maintains one-to-one correspondence. Empty cells use `rgba(255,255,255,0.04)` to show the maximum range without distracting.

### Output 6: Dot Plot Visualisation
**Description:** Coloured dots stacked vertically in columns with Y-axis labels. Dots use radial gradients for a 3D spherical appearance. Icon labels appear below each column.
**Explanation:** Dot plots teach children to read vertically stacked data — a different visual skill from horizontal bars. The 3D gradient makes dots feel tangible. Bottom-to-top stacking (`flex-col-reverse`) matches natural counting direction.

### Output 7: Pie Chart Visualisation
**Description:** An SVG donut chart with animated arc segments, icon labels at slice midpoints, and a centre showing the total. A colour-coded legend appears below.
**Explanation:** Introduces proportional/fractional thinking — "Stars take up more of the circle because there are more of them." The donut hole prevents the "which slice is bigger?" confusion that solid pie charts cause. SVG ensures crisp rendering at any zoom level.

### Output 8: Interactive Bar Chart Builder
**Description:** A clickable grid where children build bars by clicking cells. Ghost bars (dashed outlines) show target heights. Filled cells use colour gradients. Green ✓ marks appear when a bar matches its target. Progress pips show bar-by-bar completion. A "Check Answer!" button glows when all bars are correct.
**Explanation:** This is the CRA "Representational" stage — children physically construct the chart rather than passively reading it. Ghost bars implement errorless learning by showing the target without revealing the answer. Clamped heights (0 to maxCount) prevent impossible states.

### Output 9: Screen Capture Sticker
**Description:** After correctly building a chart, a "📸 Save My Chart!" button appears. Clicking it downloads the chart as a high-resolution PNG file named `space-chart-[timestamp].png`.
**Explanation:** html2canvas renders the chart DOM element to a canvas at 2× resolution (retina quality) with the dark space background preserved (`backgroundColor: '#0f1729'`). The download uses the standard `<a download>` pattern. This tangible reward can be printed and displayed.

### Output 10: Drag-and-Drop Number Orbs
**Description:** Three draggable orbs with numbers (or comparison operators <, >, =) float below the equation. Children drag the correct orb onto the pulsing "?" answer zone. Correct drops trigger particle explosions; wrong drops trigger gentle shaking.
**Explanation:** Drag interaction engages kinaesthetic learners. The drop zone uses `getBoundingClientRect()` with ±30px tolerance, forgiving imprecise motor control. Wrong orbs shake briefly (0.5s) with reduced intensity (`x: [0, -8, 8, -5, 5, -2, 0]`) to provide feedback without distress.

### Output 11: Robot Companion States
**Description:** Five emotional states: sleeping (closed eyes, gentle breathing), idle (blinking, subtle float), excited (bouncing, open mouth), cheering (arms up, starry eyes), confused (tilted head, "?" bubble). Speech bubbles appear with contextual messages.
**Explanation:** The companion provides non-verbal emotional modelling. Speech bubbles use emojis as universal communicators. The SVG robot is rendered at 90×110px with Framer Motion variants for smooth state transitions.

### Output 12: Cockpit HUD
**Description:** Fixed glassmorphic panels showing: Score (⭐), Level (🚀), Fuel gauge (progress bar), Combo counter (⚡), and Mission type indicator. Panels anchor to screen edges.
**Explanation:** Fixed positioning ensures the HUD never shifts during gameplay, providing a stable reference frame. Lucide React icons provide consistent, accessible SVGs. The fuel gauge (`width: ${progress/total * 100}%`) gives a visual sense of "how much is left."

### Output 13: Level Complete Overlay
**Description:** Celebratory overlay with confetti rain (30 particles), trophy icon, score display, and "Next Level →" button. Uses staggered spring animations.
**Explanation:** Marks a clear achievement milestone. Confetti uses `repeat: Infinity` animations that don't require JavaScript intervention, keeping the main thread free. The overlay uses `backdrop-blur` to dim the game board without hiding it completely.

### Output 14: Progress Map
**Description:** A dotted-line path connecting planets (🌙 Luna Station → 🪐 Nova Prime → 💚 Emerald Nebula → etc.). The current planet glows and pulses. Past planets are dimmed. Future planets are locked.
**Explanation:** Gives children a spatial mental model of their journey through the game — "I'm on Planet 3!" — which is more motivating than an abstract number. The planet names add narrative richness to the space theme.

### Output 15: Warp Transition
**Description:** Full-screen hyperspace effect with rotating conic-gradient streaks, scale animation (1× → 4×), and a white flash midway.
**Explanation:** Signals a major context change (level transition). The 1.5s duration is long enough to register but short enough to avoid disengagement. `mix-blend-mode: screen` makes streaks glow against the dark background.

### Output 16: Child Profile Form
**Description:** Multi-section form with: child name, age, guardian email, cognitive level (dropdown), communication style, attention span, learning style, sensory profile, colour sensitivity, favourite colours (checkboxes), and a challenges textarea. Generates personalised recommendations on submit.
**Explanation:** Uses React Class Component with controlled inputs. Recommendations adapt based on age group (≤5, ≤10, 11+), cognitive level (emerging/developing/moderate/advanced), and sensory sensitivity. This data could drive future adaptive difficulty.

### Output 17: Low Stim Mode Toggle
**Description:** A button in the header toggles between "🍃 Low Stim Mode" and "🛑 Restore Colors." In Low Stim mode, all decorative elements are removed, background becomes warm paper (`#FDFCF0`), and text becomes dark grey.
**Explanation:** Implements the "Panic Button" design requirement. Uses React Context API to propagate the mode change through all 20+ components without prop drilling. The toggle empowers the child/caregiver to control their sensory environment.

### Output 18: Error Boundary Recovery
**Description:** If any runtime error occurs, a clean error page shows: "⚠️ Something went wrong", the error message in a code block, and a "🔄 Reload Page" button.
**Explanation:** Uses `static getDerivedStateFromError()` and `componentDidCatch()` lifecycle methods. Prevents the terrifying blank white page. The soft coral heading (`#CD6155`) follows the ASD colour palette.

---

## 6. Placeholder for Screenshots

> **Note:** Attach screenshots of each output described above. Suggested captures:
> 1. Title Screen with robot companion
> 2. Mission Banner animation
> 3. Grouped Icon rows (Concrete stage)
> 4. Bar Chart with highlighted target bar
> 5. Pictograph view
> 6. Dot Plot view
> 7. Pie Chart view
> 8. Interactive Bar Chart Builder with ghost bars
> 9. Screen capture download dialog
> 10. Drag-and-drop orbs with answer zone
> 11. Robot companion in each emotion state
> 12. Cockpit HUD showing score/level/combo
> 13. Level Complete overlay with confetti
> 14. Progress Map with planets
> 15. Low Stim Mode comparison (before/after)
> 16. Child Profile form with recommendations
> 17. Error Boundary recovery page

---

## 7. List of Similar Products

| # | Product Name / URL | Description | Key Features |
|:-:|:-------------------|:------------|:-------------|
| 1 | **Starfall Math** — https://www.starfall.com/h/math/ | Free online math learning platform for pre-K through Grade 3. Uses visual animations and characters. | Animated math games, counting activities, pattern recognition, number line visualisation, printable worksheets |
| 2 | **Todo Math** — https://www.todomath.com/ | Gamified daily math practice app for ages 3–8. Adaptive difficulty. | Daily missions, multi-sensory interactions (drag, trace, tap), adaptive difficulty, progress reports for parents, offline support |
| 3 | **Khan Academy Kids** — https://learn.khanacademy.org/ | Free educational app covering math, reading, and social-emotional learning for ages 2–8. | Personalised learning paths, animated characters, hands-on activities, progress tracking, teacher dashboard, offline access |
| 4 | **AutiSpark** — https://www.autispark.com/ | Purpose-built learning app for children with autism. Covers academics, life skills, and social skills. | ASD-specific design, visual schedules, token reward system, customisable difficulty, sensory-friendly interface, progress reporting |
| 5 | **Otsimo** — https://otsimo.com/ | Special education game for children with autism and learning disabilities. AAC and speech therapy included. | Evidence-based games, AAC (Augmentative and Alternative Communication), speech therapy, attention-building activities, offline support, parent analytics |
| 6 | **Prodigy Math** — https://www.prodigygame.com/ | RPG-style math game for grades 1–8. Adaptive curriculum aligned to educational standards. | Role-playing adventure, curriculum-aligned questions, adaptive difficulty, class management for teachers, parent dashboard |
| 7 | **SplashLearn** — https://www.splashlearn.com/ | Gamified math and reading platform for PreK–Grade 5. Adaptive practice. | Curriculum-aligned, gamified practice, adaptive learning path, visual manipulatives, teacher dashboard, progress reports |
| 8 | **Moose Math by Duck Duck Moose** — https://www.duckduckmoose.com/ | Math learning game for ages 3–7 with a city-building narrative. | Counting, addition, subtraction, sorting, geometry through city building; multi-sensory interactions; progress tracking |

---

## 8. List of Research Labs Working in the Same Area

| # | Lab Name | URL | Professor / PI Details | Research Focus |
|:-:|:---------|:----|:-----------------------|:---------------|
| 1 | **Autism & Technology Lab, University of Washington** | https://www.hcde.washington.edu/ | Prof. Jennifer Mankoff, Human Centered Design & Engineering | Designing interactive technologies for people with disabilities, including autism. Focus on sensory-friendly interfaces and assistive tools. |
| 2 | **Center for Autism Research (CAR), Children's Hospital of Philadelphia** | https://www.carautismroadmap.org/ | Dr. Robert T. Schultz, Director | Autism diagnosis, intervention technologies, and computational approaches to understanding ASD. Neuroimaging and AI-based assessment tools. |
| 3 | **MIT Media Lab — Affective Computing Group** | https://www.media.mit.edu/groups/affective-computing/ | Prof. Rosalind Picard | Emotion-sensing wearable technology for autism. Social-emotional AI systems. Developed tools for reading facial expressions in ASD children. |
| 4 | **MIND Institute, UC Davis** | https://health.ucdavis.edu/mindinstitute/ | Dr. Leonard Abbeduto, Director | Neurodevelopmental disabilities research. Behavioural interventions, early detection, and educational technology for ASD. |
| 5 | **Autism CRC (Cooperative Research Centre), Australia** | https://www.autismcrc.com.au/ | Prof. Andrew Whitehouse, Chief Research Officer | Australia's national autism research body. Technology-based interventions, educational tools, and post-school transition programs. |
| 6 | **Stanford Autism Center** | https://med.stanford.edu/autismcenter.html | Dr. Antonio Hardan, Director | Technology-mediated interventions for ASD, including VR/AR for social skills training and adaptive educational platforms. |
| 7 | **Cambridge Autism Research Centre (ARC)** | https://www.autismresearchcentre.com/ | Prof. Simon Baron-Cohen | Systemising theory of autism, emotion recognition tools (Mind Reading software), and digital interventions for ASD. |
| 8 | **Georgia Tech — Computational Behaviour Analysis Lab** | https://cba.gatech.edu/ | Prof. Gregory Abowd | Ubicomp and AI for autism. Developed CaptureMyEmotion and other technology tools for behavioural assessment in ASD. |
| 9 | **Vanderbilt University — Treatment and Research Institute for Autism Spectrum Disorders (TRIAD)** | https://vkc.vumc.org/vkc/triad/ | Dr. Zachary Warren | Technology-based interventions, telehealth for autism, adaptive learning systems, and robot-assisted therapy. |
| 10 | **Indian Institute of Technology (IIT) Delhi — Assistive Technologies Lab** | https://web.iitd.ac.in/ | Prof. M. Balakrishnan | Assistive technologies for cognitive disabilities, including educational tools for autistic children in the Indian context. |

---

## 9. Algorithms Implemented in This Product

### Algorithm 1: Finite State Machine (Game Controller)
**Purpose:** Controls the entire game flow.
**States:** `TITLE → MISSION_INTRO → PLAYING → CELEBRATING/WRONG_FEEDBACK → LEVEL_COMPLETE → PROGRESS_MAP`
**Implementation:** React `useState` holds the current state. Each user action (start, answer, next level) transitions to a valid next state. Invalid transitions are blocked by guard conditions (`if (gameState !== GAME_STATES.PLAYING) return`).
**Complexity:** O(1) per transition.

### Algorithm 2: Mission Rotation Engine
**Purpose:** Cycles through mission types every 3 questions.
**Formula:** `missionType = MISSION_ROTATION[floor(questionIndex / 3) % MISSION_ROTATION.length]`
**Implementation:** Modular arithmetic ensures fair rotation across all mission types. Currently set to SCAN_DATA only; easily extensible.
**Complexity:** O(1).

### Algorithm 3: Dynamic Question Generation (Level-Adaptive)
**Purpose:** Generates questions scaled to the current level.
**Logic:**
- Level 1: 2 icon types, counts 1–3, subtypes COUNT/TOTAL/BUILD_CHART
- Level 2–3: 3 icon types, counts 1–4, subtypes + MOST/LEAST
- Level 4+: 4 icon types, counts 1–8, all 6 subtypes including COMPARE_BARS
**Implementation:** Conditional branching in `generateScanDataQuestion()` with `randomInt()` helper.
**Complexity:** O(n) where n = number of icon types.

### Algorithm 4: Fisher-Yates Shuffle
**Purpose:** Randomises the order of answer choices to prevent positional learning.
**Implementation:** `shuffleArray()` in MissionEngine.js. Iterates from the end, swapping each element with a random earlier element.
**Complexity:** O(n).

### Algorithm 5: Wrong Answer Generation with Proximity Control
**Purpose:** Generates plausible wrong answers that are close to the correct answer but never negative or duplicate.
**Implementation:** `generateWrongAnswers(correct, count, maxOffset)` generates candidates within ±maxOffset of the correct answer. Uses a `Set` to prevent duplicates. Falls back to sequential values after 50 attempts.
**Complexity:** O(k) where k = number of wrong answers needed (typically 2).

### Algorithm 6: Hit-Zone Detection (Bounding Box Collision)
**Purpose:** Determines whether a dragged orb was dropped inside the answer zone.
**Implementation:** `getBoundingClientRect()` on the drop zone. Checks if the pointer's (x, y) is within the rect ±30px tolerance.
**Formula:** `isInDropZone = (point.x ≥ rect.left - 30) && (point.x ≤ rect.right + 30) && (point.y ≥ rect.top - 30) && (point.y ≤ rect.bottom + 30)`
**Complexity:** O(1).

### Algorithm 7: Bar Height Comparison (Chart Validation)
**Purpose:** Validates the user's built chart against the target dataset.
**Implementation:** `question.dataset.every((d, i) => builtHeights[i] === d.count)` — iterates through each bar and checks if the user's height matches the target.
**Complexity:** O(n) where n = number of bars.

### Algorithm 8: SVG Arc Path Computation (Pie Chart)
**Purpose:** Computes SVG path data for donut chart slices.
**Implementation:** Converts polar coordinates to Cartesian using trigonometry:
```
x = cx + r × cos(angle)
y = cy + r × sin(angle)
```
Then constructs SVG `A` (arc) and `L` (line) commands for the outer and inner radius paths.
**Complexity:** O(n) where n = number of slices.

### Algorithm 9: Parallax Depth Mapping
**Purpose:** Creates a 3D depth illusion by moving star layers at different speeds based on mouse position.
**Implementation:** `useTransform(mouseX, [-1, 1], [offsetMin, offsetMax])` maps normalised mouse coordinates to pixel offsets. Three layers: far (±6px), mid (±14px), near (±28px). Spring physics smooth the motion.
**Complexity:** O(1) per frame.

### Algorithm 10: Combo Streak Tracker
**Purpose:** Tracks consecutive correct answers for the Warp Speed effect.
**Implementation:** `registerCorrect()` increments combo. `registerWrong()` resets to 0. `isWarpSpeed = combo ≥ 2`. Tracks `maxCombo` for analytics.
**Complexity:** O(1) per action.

### Algorithm 11: Idle Detection via Activity Monitoring
**Purpose:** Detects user inactivity and triggers hints.
**Implementation:** A timeout resets on any of 5 event types (mousemove, mousedown, touchstart, touchmove, keydown). After 10,000ms of no events, `isIdle` becomes true.
**Complexity:** O(1) per event, O(1) for timeout check.

### Algorithm 12: Dynamic Import Code-Splitting (html2canvas)
**Purpose:** Loads the 201KB html2canvas library only when the user clicks "Save My Chart."
**Implementation:** `const html2canvas = (await import('html2canvas')).default` — uses ES2020 dynamic `import()` to create a separate chunk that loads on demand.
**Benefit:** Reduces initial page load by 201KB (47KB gzipped).

---

## 10. Feature Enhancements That Can Be Done and Justification

| # | Feature Enhancement | Justification |
|:-:|:-------------------|:--------------|
| 1 | **Real Audio Sound Effects** | The current sound system logs to console only. Adding actual audio feedback (ding for correct, gentle buzz for wrong, whoosh for drag) would engage auditory learners. Research shows multi-sensory feedback improves retention in ASD children by 23% (Mechling, 2011). Use Howler.js or the Web Audio API. |
| 2 | **Speech Synthesis (Text-to-Speech)** | Adding browser `SpeechSynthesis` API to read questions aloud would support non-reading children and reinforce auditory-visual connections. The robot companion could "speak" its messages. Essential for pre-literate ASD learners aged 3–5. |
| 3 | **Adaptive Difficulty via Machine Learning** | Currently, difficulty is level-based. An ML model (e.g., Bayesian Knowledge Tracing) could adapt in real-time based on accuracy, response time, and hint usage. This would personalise the experience for each child's Zone of Proximal Development. |
| 4 | **Parent/Teacher Analytics Dashboard** | A backend (Firebase/Supabase) could store session data: scores, error patterns, time-per-question, combo streaks. A dashboard would show progress over time, identify areas of difficulty, and suggest targeted practice. Essential for therapists who manage multiple ASD learners. |
| 5 | **Multi-Language Support (i18n)** | Adding internationalisation (react-i18next) would make the portal accessible to non-English-speaking ASD children globally. Priority languages: Tamil, Hindi, Spanish, Mandarin, Arabic. Robot companion messages and question text should be translatable. |
| 6 | **Offline Progressive Web App (PWA)** | Many ASD children use the portal during therapy sessions in clinics with unreliable internet. Converting to a PWA with service worker caching would enable offline use. Vite supports PWA via `vite-plugin-pwa`. |
| 7 | **Augmented Reality (AR) Chart Builder** | Using WebXR or AR.js, children could place virtual bar charts in their physical environment using a tablet camera. This would bridge the CRA "concrete" and "representational" stages by overlaying digital charts on real-world surfaces. |
| 8 | **Multiplayer Cooperative Mode** | A real-time cooperative mode (via WebSockets) where two children build a chart together — one handles bars 1–2, the other handles bars 3–4. This would practise turn-taking and collaborative skills, which are key ASD intervention targets. |
| 9 | **Custom Avatar & Theme Builder** | Let children customise their spaceship, robot companion, and colour theme. Research shows that personalisation increases engagement and ownership in ASD learners (Koegel & Koegel, 2010). Stored in `localStorage` for persistence. |
| 10 | **Integration with AAC Devices** | Many ASD children use Augmentative and Alternative Communication (AAC) devices. Adding switch-scan support (spacebar to cycle, enter to select) would make the portal accessible to children with motor disabilities who cannot use mouse or touch. |

---

*Report prepared by Gugan S S (CB.SC.U4CSE23416)*
*Nebula Number Navigator — Lab2*
*Date: February 2026*
