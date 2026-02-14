import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Gathering my thoughts...",
    "Collecting memories of us...",
    "Pouring my heart into words...",
    "Creating something special for you...",
    "Almost ready, my love..."
  ];

  useEffect(() => {
    // Cycle through romantic loading texts
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800); // Slower text cycling for readability

    // Fade out after loading
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // Match App timer

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className={`loading-screen ${!visible ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="hearts-container">
          <span className="floating-heart-1">💕</span>
          <span className="floating-heart-2">💖</span>
          <span className="floating-heart-3">💗</span>
          <span className="loading-heart">❤️</span>
        </div>
        <div className="loading-text-container">
          <div className="loading-text">{loadingTexts[textIndex]}</div>
        </div>
        <div className="loading-subtitle">Made with love, for you</div>
      </div>
    </div>
  );
}
