import React, { Component } from 'react';

/**
 * ============================================================
 * CLASS COMPONENT - ChildProfileForm
 * ============================================================
 * This is a CLASS COMPONENT that demonstrates:
 * 1. Class-based React component structure
 * 2. Constructor with state initialization
 * 3. Form handling with controlled inputs
 * 4. Event handling (onChange, onSubmit)
 * 5. Cognitive assessment for ASD children
 * 6. Personalized recommendations based on input
 * ============================================================
 */

class ChildProfileForm extends Component {
  // Constructor - initializes state and binds methods
  constructor(props) {
    super(props);
    
    // STATE MANAGEMENT - storing form data
    this.state = {
      // Basic Info
      childName: '',
      age: '',
      guardianEmail: '',
      
      // Cognitive Assessment Fields
      cognitiveLevel: 'moderate',
      communicationStyle: 'verbal',
      attentionSpan: 'medium',
      learningStyle: 'visual',
      
      // Sensory Profile
      sensoryLevel: 'moderate',
      colorSensitivity: 'some',
      
      // Learning Preferences
      favoriteColors: [],
      challenges: '',
      
      // Form State
      isSubmitted: false,
      errors: {},
      recommendations: []
    };

    // Binding event handlers to 'this'
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.generateRecommendations = this.generateRecommendations.bind(this);
  }

  // Generate personalized recommendations based on cognitive profile
  generateRecommendations() {
    const recommendations = [];
    const { cognitiveLevel, communicationStyle, attentionSpan, learningStyle, sensoryLevel, colorSensitivity, age } = this.state;

    // Age-based recommendations
    if (parseInt(age) <= 5) {
      recommendations.push({
        icon: '🧒',
        title: 'Early Learner Mode',
        desc: 'Use larger images and simpler color names (Red, Blue, Yellow only). Limit to 3 colors per session.'
      });
    } else if (parseInt(age) <= 10) {
      recommendations.push({
        icon: '📚',
        title: 'Intermediate Learning',
        desc: 'Introduce all 6 primary/secondary colors. Add Color Matching Game for engagement.'
      });
    } else {
      recommendations.push({
        icon: '🎓',
        title: 'Advanced Learning',
        desc: 'Enable Color Shades mode to learn light/medium/dark variations. Show HEX and RGB codes.'
      });
    }

    // Cognitive Level recommendations
    if (cognitiveLevel === 'emerging') {
      recommendations.push({
        icon: '🌱',
        title: 'Simplified Interface',
        desc: 'Enable Low Stim mode by default. Show only 2-3 items at a time. Use Focus Mode always.'
      });
    } else if (cognitiveLevel === 'developing') {
      recommendations.push({
        icon: '🌿',
        title: 'Guided Learning',
        desc: 'Use Color Matching Game with audio cues. Keep sessions to 5-10 minutes.'
      });
    } else if (cognitiveLevel === 'moderate') {
      recommendations.push({
        icon: '🌳',
        title: 'Interactive Learning',
        desc: 'Enable all game modes. Allow child to switch between Focus Mode and Game Mode freely.'
      });
    } else {
      recommendations.push({
        icon: '🌟',
        title: 'Self-Directed Learning',
        desc: 'Child can control all settings. Introduce color theory concepts and shade variations.'
      });
    }

    // Communication Style recommendations
    if (communicationStyle === 'non-verbal') {
      recommendations.push({
        icon: '👆',
        title: 'Touch-Based Interaction',
        desc: 'Use large tap targets. Provide visual feedback with animations instead of text prompts.'
      });
    } else if (communicationStyle === 'limited') {
      recommendations.push({
        icon: '🗣️',
        title: 'Simple Language',
        desc: 'Use single-word labels (RED, BLUE). Pair colors with familiar objects (Apple=Red).'
      });
    } else if (communicationStyle === 'verbal') {
      recommendations.push({
        icon: '💬',
        title: 'Verbal Reinforcement',
        desc: 'Encourage child to say color names aloud. Add voice prompts for color identification.'
      });
    }

    // Attention Span recommendations
    if (attentionSpan === 'short') {
      recommendations.push({
        icon: '⏱️',
        title: 'Micro-Sessions',
        desc: 'Limit sessions to 3-5 minutes. Show only 3 items. Give breaks between activities.'
      });
    } else if (attentionSpan === 'medium') {
      recommendations.push({
        icon: '⏰',
        title: 'Standard Sessions',
        desc: '10-15 minute sessions. Use Color Matching Game to maintain engagement.'
      });
    } else {
      recommendations.push({
        icon: '📖',
        title: 'Extended Learning',
        desc: 'Allow longer exploration. Enable Color Shades and multiple game rounds.'
      });
    }

    // Learning Style recommendations
    if (learningStyle === 'visual') {
      recommendations.push({
        icon: '👁️',
        title: 'Visual Learning',
        desc: 'Focus Mode is ideal. Use color-coded backgrounds. Show color swatches prominently.'
      });
    } else if (learningStyle === 'tactile') {
      recommendations.push({
        icon: '✋',
        title: 'Interactive Touch',
        desc: 'Encourage tapping and dragging. Use Color Matching Game for hands-on learning.'
      });
    } else if (learningStyle === 'auditory') {
      recommendations.push({
        icon: '🔊',
        title: 'Audio Support',
        desc: 'Add text-to-speech for color names. Use sound effects for correct answers.'
      });
    } else {
      recommendations.push({
        icon: '🎯',
        title: 'Multi-Sensory Approach',
        desc: 'Combine visual colors with object names. Use emojis for recognition (🍎=Red).'
      });
    }

    // Sensory Level recommendations
    if (sensoryLevel === 'high') {
      recommendations.push({
        icon: '🧘',
        title: 'High Sensitivity Mode',
        desc: 'ALWAYS start in Low Stim mode. Use only muted colors. Avoid animations.'
      });
    } else if (sensoryLevel === 'moderate') {
      recommendations.push({
        icon: '⚖️',
        title: 'Balanced Stimulation',
        desc: 'Start in Calm Mode. Allow child to toggle Low Stim when needed.'
      });
    }

    // Color Sensitivity recommendations
    if (colorSensitivity === 'high') {
      recommendations.push({
        icon: '🎨',
        title: 'Color Caution',
        desc: 'Avoid bright reds and yellows initially. Start with calming blues and greens.'
      });
    }

    return recommendations;
  }

  // EVENT HANDLER - handles text/select input changes
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: '' }
    });
  }

  // EVENT HANDLER - handles checkbox changes for favorite colors
  handleCheckboxChange(event) {
    const { value, checked } = event.target;
    this.setState(prevState => {
      if (checked) {
        return { favoriteColors: [...prevState.favoriteColors, value] };
      } else {
        return { favoriteColors: prevState.favoriteColors.filter(color => color !== value) };
      }
    });
  }

  // FORM VALIDATION
  validateForm() {
    const errors = {};
    
    if (!this.state.childName.trim()) {
      errors.childName = 'Child name is required';
    }
    
    if (!this.state.age || this.state.age < 2 || this.state.age > 18) {
      errors.age = 'Please enter a valid age (2-18)';
    }
    
    if (!this.state.guardianEmail.trim()) {
      errors.guardianEmail = 'Guardian email is required';
    } else if (!/\S+@\S+\.\S+/.test(this.state.guardianEmail)) {
      errors.guardianEmail = 'Please enter a valid email';
    }

    return errors;
  }

  // EVENT HANDLER - handles form submission
  handleSubmit(event) {
    event.preventDefault();
    
    const errors = this.validateForm();
    
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    // Generate personalized recommendations
    const recommendations = this.generateRecommendations();

    // Form is valid - show success with recommendations
    this.setState({ 
      isSubmitted: true,
      recommendations: recommendations
    });
    
    // Log form data (in real app, would send to API)
    console.log('Child Profile Created:', this.state);
  }

  // Reset form to initial state
  resetForm() {
    this.setState({
      childName: '',
      age: '',
      guardianEmail: '',
      cognitiveLevel: 'moderate',
      communicationStyle: 'verbal',
      attentionSpan: 'medium',
      learningStyle: 'visual',
      sensoryLevel: 'moderate',
      colorSensitivity: 'some',
      favoriteColors: [],
      challenges: '',
      isSubmitted: false,
      errors: {},
      recommendations: []
    });
  }

  // RENDER METHOD - required in class components
  render() {
    const { isLowStim } = this.props;
    const { isSubmitted, errors, recommendations } = this.state;

    // Success message with recommendations after form submission
    if (isSubmitted) {
      return (
        <div className="space-y-6">
          {/* Success Header */}
          <div className="p-6 bg-green-50 rounded-xl border-4 border-green-500 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              ✅ Profile Created Successfully!
            </h2>
            <p className="text-gray-700">
              <strong>{this.state.childName}</strong>, Age {this.state.age}
            </p>
          </div>

          {/* Personalized Recommendations */}
          <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-300">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
              🎯 Personalized Recommendations for {this.state.childName}
            </h3>
            
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{rec.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{rec.title}</h4>
                      <p className="text-gray-600 text-sm">{rec.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-700 mb-2">📋 Profile Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><strong>Cognitive Level:</strong> {this.state.cognitiveLevel}</p>
              <p><strong>Communication:</strong> {this.state.communicationStyle}</p>
              <p><strong>Attention Span:</strong> {this.state.attentionSpan}</p>
              <p><strong>Learning Style:</strong> {this.state.learningStyle}</p>
              <p><strong>Sensory Level:</strong> {this.state.sensoryLevel}</p>
              <p><strong>Color Sensitivity:</strong> {this.state.colorSensitivity}</p>
            </div>
          </div>

          <button
            onClick={this.resetForm}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Create Another Profile
          </button>
        </div>
      );
    }

    // Form UI
    return (
      <form onSubmit={this.handleSubmit} className="space-y-6">
        
        {/* SECTION 1: Basic Information */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-700 mb-4">👤 Basic Information</h3>
          
          {/* Child Name - Text Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Child's Name *
            </label>
            <input
              type="text"
              name="childName"
              value={this.state.childName}
              onChange={this.handleInputChange}
              placeholder="Enter child's name"
              className={`w-full p-3 rounded-lg border-2 ${
                errors.childName ? 'border-red-400' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            />
            {errors.childName && (
              <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
            )}
          </div>

          {/* Age - Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Age (2-18 years) *
            </label>
            <input
              type="number"
              name="age"
              value={this.state.age}
              onChange={this.handleInputChange}
              min="2"
              max="18"
              placeholder="Enter age"
              className={`w-full p-3 rounded-lg border-2 ${
                errors.age ? 'border-red-400' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Guardian Email - Email Input */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Guardian Email *
            </label>
            <input
              type="email"
              name="guardianEmail"
              value={this.state.guardianEmail}
              onChange={this.handleInputChange}
              placeholder="guardian@example.com"
              className={`w-full p-3 rounded-lg border-2 ${
                errors.guardianEmail ? 'border-red-400' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            />
            {errors.guardianEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.guardianEmail}</p>
            )}
          </div>
        </div>

        {/* SECTION 2: Cognitive Assessment */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="font-bold text-purple-800 mb-4">🧠 Cognitive Assessment</h3>
          
          {/* Cognitive Level - Select Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Cognitive/Developmental Level
            </label>
            <select
              name="cognitiveLevel"
              value={this.state.cognitiveLevel}
              onChange={this.handleInputChange}
              className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            >
              <option value="emerging">Emerging - Needs significant support</option>
              <option value="developing">Developing - Needs moderate support</option>
              <option value="moderate">Moderate - Some independence</option>
              <option value="independent">Independent - Minimal support needed</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">This helps customize difficulty and pacing</p>
          </div>

          {/* Communication Style - Select */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Communication Style
            </label>
            <select
              name="communicationStyle"
              value={this.state.communicationStyle}
              onChange={this.handleInputChange}
              className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            >
              <option value="non-verbal">Non-verbal - Uses gestures/AAC</option>
              <option value="limited">Limited verbal - Single words/phrases</option>
              <option value="verbal">Verbal - Speaks in sentences</option>
              <option value="fluent">Fluent - Advanced communication</option>
            </select>
          </div>

          {/* Attention Span - Select */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Typical Attention Span
            </label>
            <select
              name="attentionSpan"
              value={this.state.attentionSpan}
              onChange={this.handleInputChange}
              className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            >
              <option value="short">Short - Under 5 minutes</option>
              <option value="medium">Medium - 5-15 minutes</option>
              <option value="long">Long - Over 15 minutes</option>
            </select>
          </div>

          {/* Learning Style - Select */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Primary Learning Style
            </label>
            <select
              name="learningStyle"
              value={this.state.learningStyle}
              onChange={this.handleInputChange}
              className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            >
              <option value="visual">Visual - Learns by seeing</option>
              <option value="auditory">Auditory - Learns by hearing</option>
              <option value="tactile">Tactile - Learns by touching/doing</option>
              <option value="mixed">Mixed - Combination of styles</option>
            </select>
          </div>
        </div>

        {/* SECTION 3: Sensory Profile */}
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-4">🎨 Sensory Profile</h3>
          
          {/* Sensory Sensitivity Level */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Overall Sensory Sensitivity
            </label>
            <select
              name="sensoryLevel"
              value={this.state.sensoryLevel}
              onChange={this.handleInputChange}
              className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-orange-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            >
              <option value="low">Low - Can handle most visual stimuli</option>
              <option value="moderate">Moderate - Some sensitivity to brightness</option>
              <option value="high">High - Easily overwhelmed by visuals</option>
            </select>
          </div>

          {/* Color Sensitivity */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Sensitivity to Bright Colors
            </label>
            <select
              name="colorSensitivity"
              value={this.state.colorSensitivity}
              onChange={this.handleInputChange}
              className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-orange-500 ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            >
              <option value="none">None - Enjoys bright colors</option>
              <option value="some">Some - Prefers muted tones</option>
              <option value="high">High - Bright colors cause distress</option>
            </select>
          </div>
        </div>

        {/* SECTION 4: Learning Preferences */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800 mb-4">📚 Learning Preferences</h3>
          
          {/* Favorite Colors - Checkboxes */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Colors to Focus On (Select all that apply)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Red', emoji: '🔴' },
                { name: 'Yellow', emoji: '🟡' },
                { name: 'Green', emoji: '🟢' },
                { name: 'Blue', emoji: '🔵' },
                { name: 'Purple', emoji: '🟣' },
                { name: 'Orange', emoji: '🟠' }
              ].map(color => (
                <label key={color.name} className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded-lg border">
                  <input
                    type="checkbox"
                    value={color.name.toLowerCase()}
                    checked={this.state.favoriteColors.includes(color.name.toLowerCase())}
                    onChange={this.handleCheckboxChange}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-lg">{color.emoji}</span>
                  <span className="text-gray-700 text-sm">{color.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Challenges - Textarea */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Specific Challenges or Notes
            </label>
            <textarea
              name="challenges"
              value={this.state.challenges}
              onChange={this.handleInputChange}
              rows="3"
              placeholder="E.g., Gets anxious with red, responds well to blue, needs frequent breaks..."
              className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 resize-none ${
                isLowStim ? 'bg-stone-100' : 'bg-white'
              }`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
            isLowStim
              ? 'bg-stone-300 text-stone-700 hover:bg-stone-400'
              : 'bg-asd-accent text-white hover:bg-sky-600 shadow-md'
          }`}
        >
          🎯 Create Profile & Get Recommendations
        </button>

      </form>
    );
  }
}

export default ChildProfileForm;
