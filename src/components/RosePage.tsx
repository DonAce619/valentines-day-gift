import { useEffect, useState, useCallback, RefObject } from 'react';
import './RosePage.css';

interface RosePageProps {
  onShowMessage: () => void;
  audioRef: RefObject<HTMLAudioElement>;
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
    
    const newParticles = [...Array(6)].map((_, i) => ({
      id: i,
      emoji: particleTypes[i].emoji,
      color: particleTypes[i].color,
      delay: Math.random() * 2,
      left: 20 + Math.random() * 60
    }));
    
    setParticles(newParticles);

    return () => {
      clearTimeout(roseTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const handleRoseClick = useCallback(() => {
    console.log('🌹 ULTIMATE ROSE AUDIO PLAY - All methods activated!');
    
    const audio = audioRef.current;
    if (audio) {
      // Reset audio completely
      audio.currentTime = 0;
      audio.volume = 0.5;
      
      // ULTIMATE PLAY FUNCTION - Try everything
      const ultimatePlay = async () => {
        console.log('🎵 Starting ultimate audio play sequence...');
        
        // STRATEGY 1: Direct play
        try {
          console.log('🎵 Strategy 1: Direct play');
          await audio.play();
          console.log('✅ SUCCESS! Audio playing!');
          return;
        } catch (e1) {
          console.error('Strategy 1 failed:', e1);
          
          // STRATEGY 2: Load and play
          try {
            console.log('🎵 Strategy 2: Load and play');
            audio.load();
            await new Promise(resolve => setTimeout(resolve, 100));
            await audio.play();
            console.log('✅ SUCCESS! Audio playing!');
            return;
          } catch (e2) {
            console.error('Strategy 2 failed:', e2);
            
            // STRATEGY 3: Muted then unmute
            try {
              console.log('🎵 Strategy 3: Muted then unmute');
              audio.volume = 0;
              await audio.play();
              audio.volume = 0.5;
              console.log('✅ SUCCESS! Audio playing!');
              return;
            } catch (e3) {
              console.error('Strategy 3 failed:', e3);
              
              // STRATEGY 4: Create new audio element
              try {
                console.log('🎵 Strategy 4: New audio element');
                const newAudio = new Audio('/valentines-day-gift/dist/music.mp3');
                newAudio.volume = 0.5;
                await newAudio.play();
                console.log('✅ SUCCESS! New audio playing!');
                return;
              } catch (e4) {
                console.error('Strategy 4 failed:', e4);
                
                // STRATEGY 5: Force interaction
                try {
                  console.log('🎵 Strategy 5: Force interaction');
                  const button = document.createElement('button');
                  button.textContent = 'Play Audio';
                  button.onclick = () => audio.play();
                  button.style.position = 'absolute';
                  button.style.left = '-9999px';
                  document.body.appendChild(button);
                  button.click();
                  document.body.removeChild(button);
                  console.log('✅ SUCCESS! Forced play!');
                  return;
                } catch (e5) {
                  console.error('Strategy 5 failed:', e5);
                  console.error('❌ ALL STRATEGIES FAILED - Audio will not play');
                }
              }
            }
          }
        }
      };
      
      // Execute ultimate play
      ultimatePlay();
    } else {
      console.error('❌ Audio ref is null!');
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
