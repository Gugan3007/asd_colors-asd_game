# 🎨 Research: Color Perception & Interaction in Autism (ASD)

## 1. Executive Summary
This document outlines the design constraints and color theory applied to the **ColorCode** application. The UI design is not based on aesthetic preference but on **sensory regulation principles** for children with Autism Spectrum Disorder (ASD).

Children with ASD often experience **Atypical Sensory Processing**. Visual input that is neutral to neurotypical users can cause physical pain (photophobia), anxiety, or cognitive shutdown in autistic users.

## 2. Key Visual Challenges in ASD
Our design addresses three specific neurological phenomena:

### A. Photophobia & Visual Snow
* **The Issue:** Many individuals with ASD are hypersensitive to luminance. Pure white backgrounds (`#FFFFFF`) can cause glare and physical eye strain. Some experience "Visual Snow"—a layer of static overlaid on their vision, which is exacerbated by high contrast.
* **The Solution:** We utilize a **"Calm Mode"** default background of **Cool Grey-Green (`#F4F7F6`)**. This reduces overall luminance and screen vibration.

### B. The "Fight or Flight" Response to Color
* **The Issue:** Bright, saturated colors—especially **Neon Red**—are often biologically processed as "threat signals." For an anxious child, a bright red error popup can trigger the amygdala, causing a meltdown or immediate withdrawal from the task.
* **The Solution:** We strictly avoid `#FF0000`. Error states are communicated using **Soft Coral (`#CD6155`)**, which provides necessary feedback without emotional aggression.

### C. Weak Central Coherence
* **The Issue:** Autistic processing is often "bottom-up" (focusing on details rather than the whole). Complex UIs with shadows, gradients, and multiple colors cause cognitive overload because the user tries to process every pixel equally.
* **The Solution:** The **"Low Stimulation Mode"** flattens the UI. It removes shadows, gradients, and distinct borders, creating a wireframe experience that reduces the "cost" of visual processing.

---

## 3. The Sensory-Safe Color Palette (Technical Spec)

These specific hex codes are implemented in the `tailwind.css` / `index.css` configuration.

| Variable Name | Hex Code | Visual Description | Physiological Purpose |
| :--- | :--- | :--- | :--- |
| **--color-asd-bg** | `#F4F7F6` | Cool Grey-Green | **Anti-Glare:** Reduces blue-light reflection and visual fatigue. |
| **--color-asd-text** | `#2C3E50` | Dark Blue-Grey | **Soft Contrast:** Avoids the "vibration" effect of pure black text on white. |
| **--color-asd-error** | `#CD6155` | Muted Coral | **Safe Alert:** Signals attention without triggering anxiety/anger associations. |
| **--color-asd-accent**| `#5DADE2` | Soft Sky Blue | **Calm Action:** Blue is universally linked to calmness; used for interactive buttons. |
| **--color-asd-low-bg**| `#FDFCF0` | Warm Paper | **Low Stim:** Mimics old book paper; used in monochrome mode for maximum comfort. |

---

## 4. Design Guidelines for Implementation

### Rule 1: Cognitive Redundancy
**Never rely on color alone.**
* *Bad:* A red box meaning "Stop."
* *Good:* A Coral box + The text "Stop" + A Hand Icon ✋.
* *Reason:* Some autistic users have difficulty mapping abstract colors to meanings. Symbols provide concrete understanding.

### Rule 2: The "Panic Button" Requirement
The interface must offer an escape hatch. The **"Switch to Low Stim"** toggle is a mandatory accessibility feature. It empowers the user to control their sensory environment, which builds trust in the application.

### Rule 3: Tunnel Vision Layouts
Text and content must be constrained to narrow widths (max `600px`).
* *Reason:* Tracking long lines of text across a wide screen requires complex eye-movement coordination, which can be fatiguing. Narrow columns support better focus.

### Rule 4: No Surprise Animations
* No flashing elements.
* No auto-playing media.
* Transitions between modes must be slow (`duration-500ms`) and smooth to prevent startle responses.

---

## 5. References & Clinical Basis
1.  *Grandgeorge, M., & Masataka, N. (2016).* Atypical Color Preference in Children with Autism Spectrum Disorder. (Preference for green/brown over yellow/red).
2.  *Wilkins, A. J. (2003).* Reading through Colour. (Impact of screen luminance on visual stress).
3.  *Ludlow, A. K., et al. (2014).* Color tinting and visual stress in Autism. (Efficacy of off-white backgrounds).

---

## 6. Lab2 Enhancement — Data Handling & Bar Chart Building (Research Basis)

### Strategy A: CRA (Concrete–Representational–Abstract)

The CRA framework is the gold standard for mathematics instruction in special education, with strong evidence for ASD learners:

**Concrete Stage:** Physical, countable objects are presented first.
- In Lab2: Grouped space icons (⭐🌙🪐☄️🚀) shown in clearly separated rows with one-to-one correspondence.
- Each icon is rendered at 32px with generous spacing to support serial counting.

**Representational Stage:** Pictorial/diagrammatic representation bridges concrete to abstract.
- In Lab2: The interactive "Build Chart" mode — children construct bars by clicking grid cells, creating a physical mapping from icon count to bar height.
- Ghost bar outlines (dashed borders) scaffold the target height without revealing the answer directly.

**Abstract Stage:** Numerical symbols used after representational understanding.
- In Lab2: Y-axis labels and height badges display numbers alongside the bars.
- Once bars match targets, green ✓ indicators provide immediate symbolic feedback.

**Citations:**
- *Witzel, B. S. (2005).* Using CRA to Teach Algebra to Students with Math Difficulties in Inclusive Settings.
- *Flores, M. M. (2010).* Using the CRA Sequence to Teach Subtraction with Regrouping to Students at Risk for Failure. (Extends CRA efficacy to multi-step math tasks.)
- *Yakubova, G., & Bouck, E. C. (2014).* CRA with ASD students — app-based mathematical instruction.

### Strategy B: Errorless Learning

Errorless learning removes or minimizes the possibility of making errors during the acquisition phase. For ASD learners who experience high anxiety from failure, this is critical:

- **Ghost Bar Scaffolding:** Dashed outlines show the exact target height, guiding the child toward the correct answer.
- **Clamped Input:** Bar heights cannot go below 0 or above the maximum count, preventing nonsensical states.
- **Per-Bar Feedback:** Each correctly matched bar shows an immediate green ✓, so the child receives continuous positive reinforcement rather than all-or-nothing judgment.
- **Gentle Wrong Feedback:** If "Check Answer" is pressed with incorrect bars, the robot companion says "Almost there! Check your bars!" rather than punitive language.

**Citations:**
- *Terrace, H. S. (1963).* Discrimination learning with and without "errors." (Original errorless learning paradigm.)
- *Mueller, M. M., Palkovic, C. M., & Maynard, C. S. (2007).* Errorless learning: Review and practical application for teaching children with pervasive developmental disorders.
- *Schreibman, L. (2000).* Intensive behavioral/psychoeducational treatments for autism: Research needs and future directions.

### Strategy C: Digital Anchoring

ASD learners benefit from consistent, familiar visual contexts that reduce cognitive load from novelty:

- **Space Theme Consistency:** The bar chart builder uses the same space-themed icons (⭐🌙🪐) and neon-on-dark color palette as all other missions. No visual context switch is required.
- **Predictable Grid Layout:** The chart grid is always left-to-right, bottom-to-top, with consistent cell sizes and spacing. This predictability reduces anxiety about "what comes next."
- **Familiar Interaction Patterns:** Arrow keys, click, and tab follow standard UI conventions that may already be learned.

**Citations:**
- *Shane, H. C., & Albert, P. D. (2008).* Electronic screen media for persons with autism spectrum disorders: Results of a survey. (Preference for structured digital interfaces.)
- *Mechling, L. C. (2011).* Review of twenty-first century portable electronic devices for persons with moderate intellectual disabilities and ASD.

### Strategy D: Screen Capture as Tangible Reward

After successfully building a chart, the child can press "📸 Save My Chart!" to download their creation as a PNG sticker:

- **Ownership & Pride:** Saving a digital artefact provides a sense of accomplishment that extends beyond the game session.
- **Tangible Reinforcement:** The saved image can be printed, shared with parents/teachers, or collected as a "sticker album."
- **Motivation Loop:** The anticipation of earning a new sticker motivates engagement with subsequent chart-building challenges.

**Citations:**
- *Koegel, R. L., & Koegel, L. K. (2010).* Pivotal Response Treatment for Autism Spectrum Disorders. (Tangible rewards in PRT.)
- *Mechling, L. C. (2011).* Review of portable electronic devices for persons with ASD. (Digital artefacts as motivational tools.)

### Strategy E: Window Blur Detection (Attention Management)

For ASD learners who may be easily distracted or pulled away from the task:

- **Blur Event:** When the browser loses focus, the robot companion gently says "Come back, navigator! 🛸" — a non-punitive, character-driven reminder.
- **Focus Event:** When the child returns, the robot welcomes them back with "Welcome back! Let's continue! 🌟" — reducing re-entry anxiety.
- **No Punitive Mechanics:** No timer penalties, no progress loss. The game patiently waits.

**Citation:**
- *Ozonoff, S., et al. (2005).* Evidence-based assessment of Autism Spectrum Disorders in children and adolescents. (Attention regulation challenges in ASD.)

---

## 7. Screen Time & Autism — Community Research Findings

### Source: r/Autism_Parenting Community Discussion (Reddit, 2024)
**URL:** https://www.reddit.com/r/Autism_Parenting/comments/1e81jbh/screen_time_for_autistic_children/

**Key Findings from 100+ Parent Responses:**

1. **Content quality matters more than duration.** Structured, educational screen time (math games, phonics apps, puzzles) is consistently reported as beneficial by ASD parents. Unstructured content (YouTube autoplay, social media) is problematic.
   - *"Things with structure are fine. Unstructured things are a big problem."* — u/The-Chartreuse-Moose
   - *"If he ever refuses to do something and we suspect it's because he'd rather screen… he decides to go."* — u/SuccessfulNews2330

2. **Screens as a regulation tool.** Many ASD children use screens to self-regulate and recharge after sensory overload. Removing screens entirely can cause more harm than moderate use.
   - *"That is her safe place and the most effective recharge after running out of energy due to real life."* — u/Atomvarg
   - *"My son is learning so much… he knows how to look up and build Vtech Marble plans on his own."* — u/Mess1na

3. **Screens facilitate communication.** For some non-verbal or minimally verbal children, screen-based learning provides the repetition needed for language acquisition.
   - *"If it weren't for the tablet and repetition it provides, my daughter wouldn't be able to communicate at all."* — u/yepthatsme410
   - *"My son has grown leaps and bounds in his communication since increased screen time."* — u/cozyporcelain

4. **Transition support is key.** The challenge isn't screen time itself but the transition away. Structured endpoints (e.g., "after 4 races") reduce meltdowns.
   - *"Mario Kart with a set structure of four races is totally fine. He switches off at the end."* — u/The-Chartreuse-Moose

5. **Every child is different.** One-size-fits-all rules don't apply. Parents emphasize knowing their child's specific triggers and needs.
   - *"My son is particularly negatively affected by phone/iPad, but doesn't have an addictive response to TV."* — u/Fantastic_Skill_1748

### How Lab2 Applies These Findings:
- **Structured educational content:** Lab2 provides well-defined math missions with clear start/end per question — not open-ended browsing.
- **Built-in transitions:** The mission rotation (6 questions per level) provides natural break points. Level-complete celebrations serve as transition markers.
- **Regulation support:** The low-stimulation space theme with gentle animations serves as a calming, predictable environment.
- **Communication building:** The robot companion models emotional responses and uses simple, encouraging language to build social-emotional vocabulary.
- **Screen capture as tangible output:** The "Save My Chart" feature creates a physical artefact that can be printed and shared, bridging digital and real-world interaction.

### Screen Capture — Technical Implementation Reference
**Source:** Grumberg, R. (2023). "How to ScreenShot in Reactjs — Step-by-Step Guide."
**URL:** https://medium.com/@pro.grb.studio/how-to-screencapture-in-reactjs-step-by-step-guide-b435e8b53e11

Lab2 implements the html2canvas pattern described in this article:
1. `React.useRef()` creates a reference to the chart DOM element
2. `html2canvas(ref.current, { useCORS: true })` converts it to a canvas
3. `canvas.toDataURL('image/png')` converts to a data URL
4. An `<a>` element with `download` attribute triggers the save

This is wrapped in the custom `useScreenCapture` hook at `src/game/hooks/useScreenCapture.js` for reusability across components.