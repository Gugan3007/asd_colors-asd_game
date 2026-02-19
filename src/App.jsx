import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import SafeCard from './components/SafeCard';
import SafeMessage from './components/SafeMessage';
import ImageGallery from './components/ImageGallery';
import ChildProfileForm from './components/ChildProfileForm';
import GamePage from './game/GamePage';

/**
 * ============================================================
 * FUNCTIONAL COMPONENT - HomePage (Stateless Component)
 * ============================================================
 * This demonstrates:
 * - Functional Component syntax
 * - Props usage
 * - Conditional rendering
 * - Event handling with onClick
 * ============================================================
 */
const HomePage = () => {
  const { isLowStim } = useTheme();
  const [showGallery, setShowGallery] = useState(false);

  // EVENT HANDLER - toggles gallery visibility
  const handleOpenGallery = () => {
    setShowGallery(true);
  };

  return (
    <>
      {/* Navigation Links */}
      <div className="flex gap-4 mb-6">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-lg font-medium ${
            isLowStim ? 'bg-stone-300 text-stone-700' : 'bg-asd-accent text-white'
          }`}
        >
          🎨 Color Learning
        </Link>
        <Link 
          to="/profile" 
          className={`px-4 py-2 rounded-lg font-medium ${
            isLowStim ? 'bg-stone-200 text-stone-600' : 'bg-white text-asd-text border border-gray-300'
          }`}
        >
          👤 Create Profile
        </Link>
        <Link 
          to="/game" 
          className={`px-4 py-2 rounded-lg font-medium ${
            isLowStim ? 'bg-stone-200 text-stone-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          🧮 Teach Math (Lab2)
        </Link>
      </div>

      {/* Section 1: Interactive Learning */}
      <SafeCard title="Sensory Learning">
        <p className="text-lg leading-relaxed mb-6">
          Identify the objects below.
        </p>
        
        {!showGallery ? (
           <button 
             onClick={handleOpenGallery}
             className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors ${
               isLowStim
                 ? 'bg-stone-200 text-stone-700 hover:bg-stone-300' 
                 : 'bg-asd-accent text-white hover:bg-sky-500 shadow-sm' 
             }`}
           >
             Open Image Gallery
           </button>
        ) : (
          <ImageGallery />
        )}
      </SafeCard>

      {/* Section 2: Alerts Demo */}
      <SafeCard title="System Alerts">
        <p className="mb-4 text-sm opacity-80">
          Research-backed soft error colors.
        </p>
        <SafeMessage type="error" text="Internet connection lost. Retrying..." />
        <SafeMessage type="success" text="Progress saved automatically." />
      </SafeCard>
    </>
  );
};

/**
 * ============================================================
 * FUNCTIONAL COMPONENT - ProfilePage (Uses Class Component)
 * ============================================================
 * This page contains the CLASS COMPONENT ChildProfileForm
 * Demonstrates FORMS concept with:
 * - Text input, Number input, Email input
 * - Select dropdown
 * - Checkboxes
 * - Textarea
 * - Form validation
 * - Form submission
 * ============================================================
 */
const ProfilePage = () => {
  const { isLowStim } = useTheme();

  return (
    <>
      {/* Navigation Links - ROUTING demonstration */}
      <div className="flex gap-4 mb-6">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-lg font-medium ${
            isLowStim ? 'bg-stone-200 text-stone-600' : 'bg-white text-asd-text border border-gray-300'
          }`}
        >
          🎨 Color Learning
        </Link>
        <Link 
          to="/profile" 
          className={`px-4 py-2 rounded-lg font-medium ${
            isLowStim ? 'bg-stone-300 text-stone-700' : 'bg-asd-accent text-white'
          }`}
        >
          👤 Create Profile
        </Link>
        <Link 
          to="/game" 
          className={`px-4 py-2 rounded-lg font-medium ${
            isLowStim ? 'bg-stone-200 text-stone-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          🧮 Teach Math (Lab2)
        </Link>
      </div>

      {/* SafeCard - STATELESS COMPONENT */}
      <SafeCard title="Child Profile Registration">
        <p className="text-lg leading-relaxed mb-6">
          Create a personalized learning profile for your child. This helps customize 
          the color learning experience based on their sensory needs.
        </p>
        
        {/* CLASS COMPONENT with FORMS */}
        <ChildProfileForm isLowStim={isLowStim} />
      </SafeCard>
    </>
  );
};

/**
 * ============================================================
 * FUNCTIONAL COMPONENT - AppContent (Wrapper)
 * ============================================================
 * Uses:
 * - useTheme HOOK (custom hook)
 * - ROUTING with Routes and Route components
 * - Conditional className based on state
 * ============================================================
 */
const AppContent = () => {
  const { isLowStim } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans p-4 md:p-8 ${
      isLowStim ? 'bg-[#FDFCF0]' : 'bg-asd-bg'
    }`}>
      
      <div className="max-w-3xl mx-auto">
        <Header />

        <main className="max-w-2xl mx-auto space-y-6">
          {/* ROUTING - React Router Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

/**
 * ============================================================
 * MAIN APP COMPONENT - Root Component
 * ============================================================
 * Wraps entire app with:
 * - ThemeProvider (Context API for STATE MANAGEMENT)
 * - Router (React Router for ROUTING)
 * ============================================================
 */
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}