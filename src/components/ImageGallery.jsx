import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ImageGallery = () => {
  const { isLowStim } = useTheme();
  const [focusedId, setFocusedId] = useState(null);
  const [gameMode, setGameMode] = useState(false);
  const [targetColor, setTargetColor] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showShades, setShowShades] = useState(false);

  // Enhanced Data for Color Learning
  const items = [
    { 
      id: 1, 
      name: "Apple", 
      color: "bg-red-400", 
      emoji: "🍎",
      colorName: "RED",
      hex: "#F87171",
      rgb: "rgb(248, 113, 113)",
      colorFamily: "red"
    },
    { 
      id: 2, 
      name: "Banana", 
      color: "bg-yellow-300", 
      emoji: "🍌",
      colorName: "YELLOW",
      hex: "#FDE047",
      rgb: "rgb(253, 224, 71)",
      colorFamily: "yellow"
    },
    { 
      id: 3, 
      name: "Leaf", 
      color: "bg-green-400", 
      emoji: "🍃",
      colorName: "GREEN",
      hex: "#4ADE80",
      rgb: "rgb(74, 222, 128)",
      colorFamily: "green"
    },
    { 
      id: 4, 
      name: "Orange", 
      color: "bg-orange-400", 
      emoji: "🍊",
      colorName: "ORANGE",
      hex: "#FB923C",
      rgb: "rgb(251, 146, 60)",
      colorFamily: "orange"
    },
    { 
      id: 5, 
      name: "Grapes", 
      color: "bg-purple-400", 
      emoji: "🍇",
      colorName: "PURPLE",
      hex: "#C084FC",
      rgb: "rgb(192, 132, 252)",
      colorFamily: "purple"
    },
    { 
      id: 6, 
      name: "Blueberry", 
      color: "bg-blue-400", 
      emoji: "🫐",
      colorName: "BLUE",
      hex: "#60A5FA",
      rgb: "rgb(96, 165, 250)",
      colorFamily: "blue"
    },
  ];

  // Color shades for gradation learning
  const colorShades = {
    red: [
      { shade: "Light", hex: "#FCA5A5", rgb: "rgb(252, 165, 165)", class: "bg-red-300" },
      { shade: "Medium", hex: "#F87171", rgb: "rgb(248, 113, 113)", class: "bg-red-400" },
      { shade: "Dark", hex: "#DC2626", rgb: "rgb(220, 38, 38)", class: "bg-red-600" },
    ],
    yellow: [
      { shade: "Light", hex: "#FEF08A", rgb: "rgb(254, 240, 138)", class: "bg-yellow-200" },
      { shade: "Medium", hex: "#FDE047", rgb: "rgb(253, 224, 71)", class: "bg-yellow-300" },
      { shade: "Dark", hex: "#CA8A04", rgb: "rgb(202, 138, 4)", class: "bg-yellow-600" },
    ],
    green: [
      { shade: "Light", hex: "#86EFAC", rgb: "rgb(134, 239, 172)", class: "bg-green-300" },
      { shade: "Medium", hex: "#4ADE80", rgb: "rgb(74, 222, 128)", class: "bg-green-400" },
      { shade: "Dark", hex: "#16A34A", rgb: "rgb(22, 163, 74)", class: "bg-green-600" },
    ],
  };

  const startColorGame = () => {
    const colors = ["red", "yellow", "green", "orange", "purple", "blue"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setSelectedItems([]);
    setGameMode(true);
    setFocusedId(null);
  };

  const handleItemClick = (item) => {
    if (gameMode) {
      // Color matching game logic
      if (item.colorFamily === targetColor) {
        if (!selectedItems.includes(item.id)) {
          setSelectedItems([...selectedItems, item.id]);
        }
      }
    } else {
      // Regular focus mode
      setFocusedId(focusedId === item.id ? null : item.id);
    }
  };

  const resetGame = () => {
    setGameMode(false);
    setTargetColor(null);
    setSelectedItems([]);
  };

  const correctItems = items.filter(item => item.colorFamily === targetColor);
  const gameComplete = gameMode && selectedItems.length === correctItems.length;

  return (
    <div>
      {/* Mode Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setGameMode(false);
            setShowShades(false);
            setFocusedId(null);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !gameMode && !showShades
              ? 'bg-asd-accent text-white'
              : isLowStim 
                ? 'bg-stone-200 text-stone-600' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          🎯 Focus Mode
        </button>
        <button
          onClick={startColorGame}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            gameMode
              ? 'bg-asd-accent text-white'
              : isLowStim 
                ? 'bg-stone-200 text-stone-600' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          🎮 Color Match Game
        </button>
        <button
          onClick={() => {
            setShowShades(!showShades);
            setGameMode(false);
            setFocusedId(null);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showShades
              ? 'bg-asd-accent text-white'
              : isLowStim 
                ? 'bg-stone-200 text-stone-600' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          🎨 Color Shades
        </button>
      </div>

      {/* Instructions */}
      {!gameMode && !showShades && (
        <p className="mb-4 opacity-80 text-sm">
          Click an item to see its color name and technical values.
        </p>
      )}

      {gameMode && !gameComplete && (
        <div className="mb-4 p-4 bg-asd-success bg-opacity-10 rounded-lg border-2 border-asd-success">
          <p className="text-lg font-bold text-center text-gray-800">
            Find all <span className={`uppercase text-white font-bold px-3 py-1 rounded ${
              targetColor === 'red' ? 'bg-red-500' :
              targetColor === 'yellow' ? 'bg-yellow-400 text-gray-900' :
              targetColor === 'green' ? 'bg-green-500' :
              targetColor === 'orange' ? 'bg-orange-500' :
              targetColor === 'purple' ? 'bg-purple-500' :
              targetColor === 'blue' ? 'bg-blue-500' :
              'bg-gray-500'
            }`}>{targetColor}</span> objects! 🎯
          </p>
          <p className="text-sm text-center mt-1 text-gray-700 font-medium">
            Found: {selectedItems.length} / {correctItems.length}
          </p>
        </div>
      )}

      {gameComplete && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg border-4 border-green-500 animate-pulse shadow-lg">
          <p className="text-xl font-bold text-center text-gray-900">
            🎉 Excellent! You found all <span className="text-green-700 uppercase">{targetColor}</span> items!
          </p>
          <button
            onClick={resetGame}
            className="mt-3 w-full py-3 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 shadow-md"
          >
            🔄 Play Again
          </button>
        </div>
      )}

      {/* Color Shades Section */}
      {showShades && (
        <div className="mb-6 space-y-4">
          <h3 className="font-bold text-lg mb-3">Learn Color Shades</h3>
          {Object.entries(colorShades).map(([colorName, shades]) => (
            <div key={colorName} className="space-y-2">
              <h4 className="font-semibold text-sm uppercase tracking-wide opacity-80">
                {colorName}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {shades.map((shade, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      isLowStim ? 'bg-stone-200 grayscale' : `${shade.class} bg-opacity-30`
                    } border-2 border-stone-300`}
                  >
                    <div className="text-center">
                      <p className="font-bold text-sm mb-1">{shade.shade}</p>
                      <div className={`w-12 h-12 mx-auto rounded-full mb-2 ${
                        isLowStim ? 'bg-stone-400' : shade.class
                      }`}></div>
                      <p className="text-xs font-mono opacity-70">{shade.hex}</p>
                      <p className="text-xs font-mono opacity-60">{shade.rgb}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Item Grid */}
      {!showShades && (
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => {
            const isFocused = focusedId === item.id;
            const isDimmed = focusedId !== null && !isFocused;
            const isSelected = selectedItems.includes(item.id);
            const isCorrect = gameMode && item.colorFamily === targetColor;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  h-28 rounded-lg flex flex-col items-center justify-center transition-all duration-500
                  ${isDimmed ? 'opacity-20 scale-90 blur-[1px]' : 'opacity-100 scale-100'}
                  ${isLowStim ? 'bg-stone-200 grayscale' : `${item.color} bg-opacity-20`}
                  border-2 ${
                    isFocused 
                      ? 'border-asd-accent ring-2 ring-asd-accent ring-offset-2' 
                      : isSelected
                        ? 'border-asd-success ring-2 ring-asd-success'
                        : 'border-transparent'
                  }
                `}
              >
                <span className="text-3xl mb-1">{item.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{item.name}</span>
                {isSelected && <span className="text-lg mt-1">✓</span>}
              </button>
            );
          })}
        </div>
      )}
      
      {/* Color Information Display */}
      {focusedId && !gameMode && !showShades && (
        <div className="mt-6 p-6 bg-white rounded-lg border-4 border-asd-accent shadow-lg">
          {items
            .filter(item => item.id === focusedId)
            .map(item => (
              <div key={item.id} className="text-center">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  Color: <span className="text-asd-accent">{item.colorName}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="text-left bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-bold mb-2 text-gray-700">HEX Code:</p>
                    <p className="font-mono text-xl font-bold text-gray-900 bg-white px-4 py-3 rounded border-2 border-gray-300">
                      {item.hex}
                    </p>
                  </div>
                  <div className="text-left bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-bold mb-2 text-gray-700">RGB Value:</p>
                    <p className="font-mono text-lg font-bold text-gray-900 bg-white px-4 py-3 rounded border-2 border-gray-300">
                      {item.rgb}
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-6 text-gray-600 font-medium">👆 Click the item again to close</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;