# PROJECT: ColorCode - ASD Sensory-Safe UI Assistant

## 1. PROJECT OVERVIEW

ColorCode is a specialized React application designed to address the sensory processing challenges faced by children with Autism Spectrum Disorder (ASD). Standard digital interfaces often cause "Sensory Overload" through high-contrast colors, bright whites, and neon alerts. This project implements a research-backed "Sensory Safe" color system that reduces visual noise, prevents anxiety triggers, and improves focus.

---

## 2. KEY FEATURES & RESEARCH IMPLEMENTATION

### A. Dual-Mode Sensory System

- **Calm Mode (Default)**: Uses "Cool Grey-Green" (`#F4F7F6`) instead of pure white to reduce glare/photophobia.
- **Low Stimulation Mode**: A "Panic Button" feature that instantly converts the UI to a flat, monochrome wireframe (Warm Paper `#FDFCF0`). This allows users to eliminate visual noise immediately if they feel overwhelmed.

### B. Anxiety-Free Alerts

- Replaces standard Neon Red error messages (which trigger "fight or flight" responses) with Soft Coral (`#CD6155`).
- Uses cognitive redundancy (Icon + Text + Soft Color) instead of relying on color alone.

### C. Focused Learning Gallery

- Implements "Selective Attention" logic.
- When a user selects an item (e.g., Apple), all other items dim (opacity: 20%) and blur. This mimics "Tunnel Vision" to help the child focus on one task at a time.

---

## 3. TECH STACK

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS v4 (Using the new CSS-based `@theme` configuration)
- **State Management**: React Context API (ThemeContext)

---

## 4. FOLDER STRUCTURE
```
src/
├── components/           # Modular UI blocks
│   ├── Header.jsx       # Navigation & Low Stim Toggle
│   ├── SafeCard.jsx     # Content wrapper with sensory-safe padding
│   ├── SafeMessage.jsx  # Alert system (Success/Error)
│   └── ImageGallery.jsx # Interactive learning tool with Focus Mode
├── context/
│   └── ThemeContext.jsx # Global state for managing Sensory Modes
├── index.css            # Tailwind v4 configuration & Custom Color Variables
├── App.jsx              # Main Application Layout
└── main.jsx             # Entry Point
```

---

## 5. SETUP & INSTALLATION

### Prerequisites

Node.js installed.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm run dev
```

---

## 6. COLOR PALETTE JUSTIFICATION (Research Notes)

- **Background (`#F4F7F6`)**: A specific cool grey-green chosen to minimize "Visual Snow" syndrome common in ASD.
- **Action Blue (`#5DADE2`)**: A muted sky blue that provides high contrast for buttons without the aggression of orange/red.
- **Text (`#2C3E50`)**: Dark Blue-Grey. Pure black text on white backgrounds creates a "vibrating" effect for some autistic readers; this softer contrast prevents that.

---

## 7. HOW TO TEST THE APP

1. Open the app. Notice the soft background colors.
2. Click "Low Stim Mode" in the top right. Observe how the interface flattens and colors disappear to reduce stimulation.
3. Open the "Sensory Learning" section. Click on the Apple or Banana emoji. Notice how the background elements fade away to assist focus.

---

## 8. FUTURE ENHANCEMENTS

- Add user preference persistence (save mode selection)
- Implement additional sensory profiles for different ASD sensitivity levels
- Add haptic feedback controls for mobile devices
- Create parent/caregiver dashboard for tracking interaction patterns

---

## 9. RESOURCES & REFERENCES

- [Autism & Visual Processing Research](https://www.autism.org.uk)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Sensory-Friendly Design Principles](https://www.uxdesigninstitute.com/blog/accessibility-autism/)

---

## 10. LICENSE

MIT License - Feel free to use this project for educational and therapeutic purposes.

---

## 11. CONTRIBUTING

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/sensory-improvement`)
3. Commit your changes (`git commit -m 'Add new sensory feature'`)
4. Push to the branch (`git push origin feature/sensory-improvement`)
5. Open a Pull Request

---

## 12. CONTACT & SUPPORT

For questions, feedback, or collaboration opportunities, please reach out through the project repository issues page.

---

**Built with ❤️ for neurodivergent learners**