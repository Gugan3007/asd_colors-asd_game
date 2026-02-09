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