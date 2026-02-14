import { useEffect, useState, useCallback, RefObject } from 'react';
import './RosePage.css';

interface RosePageProps {
  onShowMessage: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
}

export default function RosePage({ onShowMessage, audioRef }: RosePageProps) {
  const [particles, setParticles] = useState<{ id: number; emoji: string; color: string; delay: number; left: number }[]>([]);
  const [showRose, setShowRose] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Dramatic entrance timing - show rose immediately
    const roseTimer = setTimeout(() => setShowRose(true), 500);
    const textTimer = setTimeout(() => setShowText(true), 2000);

    const particleTypes = [
      { emoji: '🌹', color: '#ff66b2' },
      { emoji: '🌸', color: '#ffb3d9' },
      { emoji: '💕', color: '#ff99cc' },
      { emoji: '✨', color: '#ffffff' },
      { emoji: '💖', color: '#ff80bf' },
      { emoji: '💗', color: '#ffc0cb' },
      { emoji: '🌺', color: '#ff69b4' }
    ];
    
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      ...particleTypes[i % particleTypes.length],
      delay: i * 0.4 + 3,
      left: 5 + (i * 5),
    }));
    
    setParticles(newParticles);

    return () => {
      clearTimeout(roseTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const handleRoseClick = useCallback(() => {
    // Play audio immediately
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Audio playing!'))
          .catch(err => {
            console.error('Audio play failed:', err);
            // One retry after 50ms
            setTimeout(() => {
              audioRef.current?.play().catch(() => {});
            }, 50);
          });
      }
    }
    
    onShowMessage();
  }, [audioRef, onShowMessage]);

  return (
    <div className="rose-page">
      <div className="rose-header">
        <h2 className={`rose-title ${showText ? 'show' : ''}`}>Like this rose, my love for you...</h2>
        <p className={`rose-subtitle ${showText ? 'show' : ''}`}>...blooms more beautiful with each passing day</p>
      </div>

      <div className="rose-container">
        <div className={`rose-wrapper ${showRose ? 'show' : ''}`} onClick={handleRoseClick}>
          <div className="rose-glow"></div>
          <div className="rose-sparkles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`sparkle s${i + 1}`}>✨</span>
            ))}
          </div>
          <svg className="rose" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="petalGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ff6b8a" />
                <stop offset="50%" stopColor="#ff1744" />
                <stop offset="100%" stopColor="#c2185b" />
              </radialGradient>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b0000" />
                <stop offset="100%" stopColor="#4a0000" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g className="rose-petals" filter="url(#glow)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="75"
                  rx="28"
                  ry="42"
                  fill="url(#petalGradient)"
                  transform={`rotate(${rotation} 100 100)`}
                  opacity="0.95"
                  className={`petal-${i}`}
                />
              ))}
              {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((rotation, i) => (
                <ellipse
                  key={`center-${i}`}
                  cx="100"
                  cy="82"
                  rx="18"
                  ry="28"
                  fill="url(#centerGradient)"
                  transform={`rotate(${rotation} 100 100)`}
                  opacity="0.95"
                />
              ))}
            </g>
            <circle cx="100" cy="100" r="14" fill="url(#centerGradient)"/>
            <rect x="97" y="100" width="6" height="70" rx="3" fill="#2e7d32"/>
            <ellipse cx="80" cy="135" rx="18" ry="10" fill="#4caf50" transform="rotate(-35 80 135)"/>
            <ellipse cx="120" cy="145" rx="18" ry="10" fill="#4caf50" transform="rotate(35 120 145)"/>
          </svg>
        </div>
      </div>
      
      <div className="rose-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="rose-particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              filter: `drop-shadow(0 0 12px ${p.color})`,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
