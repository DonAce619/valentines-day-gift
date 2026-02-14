import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ValentinePage from './components/ValentinePage';
import LandingPage from './components/LandingPage';
import RosePage from './components/RosePage';
import MessagePopup from './components/MessagePopup';
import LoadingScreen from './components/LoadingScreen';
import GradientMesh from './components/GradientMesh';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'loading' | 'valentine' | 'landing' | 'rose' | 'message'>('loading');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with absolute path
    const audio = new Audio();
    audio.src = '/valentines-day-gift/music.mp3';
    audio.volume = 0.5;
    audio.preload = 'auto';
    audio.loop = false;
    
    // Add comprehensive event listeners
    audio.addEventListener('load', () => {
      console.log('✅ Audio loaded successfully');
    });
    
    audio.addEventListener('error', (e) => {
      console.error('❌ Audio error:', e);
    });
    
    audio.addEventListener('canplay', () => {
      console.log('✅ Audio can play');
    });
    
    audioRef.current = audio;
    
    const timer = setTimeout(() => {
      setCurrentPage('valentine');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const showLanding = () => {
    setCurrentPage('landing');
  };

  const showRose = () => {
    setCurrentPage('rose');
  };

  const showMessage = () => {
    setCurrentPage('message');
  };

  const closeMessage = () => {
    setCurrentPage('rose');
  };

  return (
    <div className="app">
      <div className="gradient-background">
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <GradientMesh />
        </Canvas>
      </div>

      <div className="content-layer">
        {currentPage === 'loading' && <LoadingScreen />}
        {currentPage === 'valentine' && <ValentinePage onContinue={showLanding} />}
        {currentPage === 'landing' && <LandingPage onEnter={showRose} audioRef={audioRef} />}
        {currentPage === 'rose' && <RosePage onShowMessage={showMessage} audioRef={audioRef} />}
        {currentPage === 'message' && <MessagePopup onClose={closeMessage} />}
      </div>
    </div>
  );
}

export default App;
