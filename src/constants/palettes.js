/**
 * ASD Research-Backed Color Palettes
 * Sources suggest that muted, natural, and low-saturation colors are often preferred.
 * - Calm/Soothing: Blues, greens, and soft pinks.
 * - Low-Stimulation: Monochromatic or analogous schemes with very low contrast.
 *
 * We will define two palettes based on these principles.
 */

// Research-Backed ASD Friendly Color Palette
// Logic: Low saturation, matte finish, avoiding pure #000 or #FFF

export const THEMES = {
  // Section 4.1: Controlled Color Palette (Default)
  calm: {
    id: "calm",
    label: "Calm Focus",
    background: "#F4F7F6", // Soft Grey-Green (reduces glare)
    surface: "#FFFFFF",
    textPrimary: "#2C3E50", // Dark Blue-Grey (softer than black)
    textSecondary: "#5D6D7E",
    accent: "#5DADE2",      // Muted Sky Blue
    error: "#CD6155",       // Muted Red (Avoids "Danger" trigger)
    success: "#52BE80",     // Muted Green
    border: "#E5E8E8",
    shadow: "0 4px 6px rgba(0,0,0,0.05)"
  },

  // Section 2.1: Handling Sensory Overload
  lowStim: {
    id: "lowStim",
    label: "Low Stimulation",
    background: "#FDFCF0", // Warm Off-White (Old Paper look)
    surface: "#FDFCF0",    // Flat design (no depth)
    textPrimary: "#4E4E4E", // Soft Grey
    textSecondary: "#707070",
    accent: "#888888",      // Greyed out accent
    error: "#A0A0A0",       // Errors deprioritized
    success: "#A0A0A0",
    border: "transparent",
    shadow: "none"
  }
};