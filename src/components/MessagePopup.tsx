import { useEffect, useState } from 'react';
import './MessagePopup.css';

interface MessagePopupProps {
  onClose: () => void;
}

export default function MessagePopup({ onClose }: MessagePopupProps) {
  const [petals, setPetals] = useState<{ id: number; emoji: string; color: string; delay: number; duration: number }[]>([]);
  const [lights, setLights] = useState<{ id: number; delay: number }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const loveLines = [
    "My Dearest Love...",
    "From the moment I met you,",
    "my world changed forever.",
    "You are the first thought in my morning,",
    "and the last prayer in my night.",
    "Every smile you give me...",
    "is a treasure I keep locked in my heart.",
    "Every tear I've seen you cry...",
    "has made me vow to be your protector forever.",
    "You are not just my girlfriend...",
    "You are my best friend, my safe place,",
    "my home, my everything.",
    "I fall in love with you more",
    "with every sunrise we share.",
    "Happy Valentine's Day, my love.",
    "You have my heart...",
    "today, tomorrow, and always. ❤️"
  ];

  useEffect(() => {
    const petalData = [
      { emoji: '🌸', color: '#ffb3d9', delay: 0, duration: 10 },
      { emoji: '🌺', color: '#ff99cc', delay: 0.8, duration: 12 },
      { emoji: '🌸', color: '#ffb3d9', delay: 1.6, duration: 9 },
      { emoji: '🌹', color: '#ff66b2', delay: 2.4, duration: 11 },
      { emoji: '🌸', color: '#ffb3d9', delay: 3.2, duration: 10 },
      { emoji: '🌺', color: '#ff99cc', delay: 4, duration: 13 },
      { emoji: '🌸', color: '#ffb3d9', delay: 4.8, duration: 9 },
      { emoji: '🌹', color: '#ff66b2', delay: 5.6, duration: 11 },
      { emoji: '🌸', color: '#ffb3d9', delay: 6.4, duration: 10 },
      { emoji: '🌺', color: '#ff99cc', delay: 7.2, duration: 12 },
    ];
    setPetals(petalData.map((p, i) => ({ ...p, id: i })));
    setLights([...Array(15)].map((_, i) => ({ id: i, delay: i * 0.6 })));

    // Start showing content after a moment
    setTimeout(() => setShowContent(true), 500);

    // Animate lines one by one
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < loveLines.length) {
        setCurrentLine(lineIndex + 1);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="message-popup active">
      <div className="petal-background">
        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              filter: `drop-shadow(0 0 20px ${p.color})`,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>
      
      <div className="floating-lights">
        {lights.map((l) => (
          <div
            key={l.id}
            className="floating-light"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${l.delay}s`,
            }}
          />
        ))}
      </div>
      
      <div className={`message-content ${showContent ? 'show' : ''}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="love-letter">
          {loveLines.slice(0, currentLine).map((line, index) => (
            <p 
              key={index} 
              className={`love-line ${index === currentLine - 1 ? 'typing' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {line}
            </p>
          ))}
          {currentLine < loveLines.length && (
            <span className="cursor">|</span>
          )}
        </div>

        {currentLine >= loveLines.length && (
          <div className="final-message animate-in">
            <div className="signature-section">
              <p className="signature">Forever Yours,</p>
              <p className="signature-name">Your Loving Man,<br />Adrian "Ace" T. Servillejo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
