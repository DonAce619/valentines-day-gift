import { useEffect, useState, RefObject } from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onEnter: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
}

export default function LandingPage({ onEnter, audioRef }: LandingPageProps) {
  const [hearts, setHearts] = useState<{ id: number; emoji: string; delay: number; duration: number; left: number }[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
    
    const heartData = [
      { emoji: '❤️', delay: 0, duration: 12, left: 10 },
      { emoji: '💕', delay: 1.5, duration: 14, left: 25 },
      { emoji: '💖', delay: 3, duration: 16, left: 40 },
      { emoji: '💗', delay: 4.5, duration: 13, left: 55 },
      { emoji: '💝', delay: 6, duration: 15, left: 70 },
      { emoji: '💕', delay: 7.5, duration: 11, left: 85 },
      { emoji: '❤️', delay: 9, duration: 17, left: 15 },
      { emoji: '💖', delay: 10.5, duration: 12, left: 30 },
    ];
    setHearts(heartData.map((h, i) => ({ ...h, id: i })));
  }, []);

  const unlockAndEnter = () => {
    console.log('🔓 ULTIMATE AUDIO UNLOCK - Trying all methods...');
    
    const audio = audioRef.current;
    if (audio) {
      // METHOD 1: Direct play/pause
      const method1 = () => {
        console.log('🎵 Method 1: Direct play/pause');
        return audio.play().then(() => {
          console.log('✅ Method 1 SUCCESS!');
          audio.pause();
          audio.currentTime = 0;
        });
      };
      
      // METHOD 2: AudioContext resume
      const method2 = () => {
        console.log('🎵 Method 2: AudioContext resume');
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          const audioContext = new AudioContext();
          return audioContext.resume().then(() => {
            console.log('✅ Method 2 SUCCESS!');
            return audio.play().then(() => {
              audio.pause();
              audio.currentTime = 0;
            });
          });
        } catch (e) {
          console.error('Method 2 failed:', e);
          return Promise.reject(e);
        }
      };
      
      // METHOD 3: User interaction simulation
      const method3 = () => {
        console.log('🎵 Method 3: User interaction simulation');
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        document.dispatchEvent(clickEvent);
        return audio.play().then(() => {
          console.log('✅ Method 3 SUCCESS!');
          audio.pause();
          audio.currentTime = 0;
        });
      };
      
      // METHOD 4: Muted play then unmute
      const method4 = () => {
        console.log('🎵 Method 4: Muted play then unmute');
        const originalVolume = audio.volume;
        audio.volume = 0;
        return audio.play().then(() => {
          console.log('✅ Method 4 SUCCESS!');
          audio.pause();
          audio.currentTime = 0;
          audio.volume = originalVolume;
        });
      };
      
      // TRY ALL METHODS IN SEQUENCE
      method1()
        .catch(() => method2())
        .catch(() => method3())
        .catch(() => method4())
        .catch((e) => {
          console.error('❌ ALL METHODS FAILED:', e);
        })
        .finally(() => {
          console.log('🔓 Audio unlock attempt complete');
          onEnter();
        });
    } else {
      console.error('❌ Audio ref is null!');
      onEnter();
    }
  };

  return (
    <div className="landing-page" onClick={unlockAndEnter} style={{ cursor: 'pointer' }}>
      <div className={`landing-content ${showContent ? 'show' : ''}`}>
        <h1 className="greeting">
          <span className="greeting-line">To My Everything</span>
        </h1>
        <p className="subtitle">I've created something special just for you...</p>
        <p className="sub-subtitle">A little piece of my heart, wrapped in code</p>
        <button className="enter-btn" onClick={(e) => { e.stopPropagation(); unlockAndEnter(); }}>
          <span className="btn-text">Open Your Gift</span>
          <div className="heart-pulse">❤️</div>
          <div className="btn-glow"></div>
        </button>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>Click anywhere to continue</p>
      </div>
      
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>
      
      <div className="particle-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="synced-orbs">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="sync-orb"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
