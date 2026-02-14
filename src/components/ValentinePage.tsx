import { useEffect, useState } from 'react';
import './ValentinePage.css';

interface ValentinePageProps {
  onContinue: () => void;
}

export default function ValentinePage({ onContinue }: ValentinePageProps) {
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [fadeOutLastMessage, setFadeOutLastMessage] = useState(false);

  const emotionalMessages = [
    "Every moment with you feels like magic...",
    "Your smile lights up my world...",
    "I fall in love with you more each day...",
    "With you, I found my forever..."
  ];

  useEffect(() => {
    setShowContent(true);
    
    // Cycle through emotional messages
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= emotionalMessages.length - 1) {
          // When we reach the last message, fade it out after 2 seconds
          setTimeout(() => {
            setFadeOutLastMessage(true);
            setTimeout(() => {
              setShowFinalQuestion(true);
              setTimeout(() => setShowButtons(true), 1000);
            }, 1000);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(messageTimer);
  }, []);

  return (
    <div className="valentine-page">
      <div className={`valentine-content ${showContent ? 'show' : ''}`}>
        {/* Emotional Messages */}
        <div className="message-container">
          <div className={`emotional-message ${showFinalQuestion ? 'fade-out' : ''} ${fadeOutLastMessage && messageIndex === 3 ? 'fade-out' : ''}`}>
            {emotionalMessages[messageIndex]}
          </div>
          
          {/* Final Question */}
          <h1 className={`valentine-question ${showFinalQuestion ? 'show' : ''}`}>
            Will you be my Valentine?
          </h1>
        </div>
        
        {/* Forever Promise */}
        <div className={`forever-promise ${showFinalQuestion ? 'show' : ''}`}>
          <p className="promise-line">Not just for today...</p>
          <p className="promise-line">Not just for this year...</p>
          <p className="promise-line highlight">But forever and always...</p>
        </div>
        
        {/* Interactive Button */}
        <div className={`valentine-button-container ${showButtons ? 'show' : ''}`}>
          <button 
            className="valentine-btn forever" 
            onClick={onContinue}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
            }}
          >
            <div className="btn-content">
              <span className="btn-text">Yes, Forever 💕</span>
              <div className="btn-glow"></div>
              <div className="heart-sparkles">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className={`heart-sparkle hs-${i + 1}`}>✨</span>
                ))}
              </div>
            </div>
          </button>
        </div>
        
        {/* Personal Touch */}
        <div className={`personal-message ${showButtons ? 'show' : ''}`}>
          <p className="love-note">
            "You're not just my Valentine, you're my everything"
          </p>
        </div>
      </div>
    </div>
  );
}
