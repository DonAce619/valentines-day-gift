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
    // ULTIMATE AUDIO INITIALIZATION
    console.log('🎵 Initializing ultimate audio system...');
    
    // Create DOM audio element for maximum compatibility
    const audio = document.createElement('audio');
    
    // Setup audio with comprehensive configuration
    audio.src = '/valentines-day-gift/dist/music.mp3';
    audio.volume = 0.5;
    audio.preload = 'auto';
    audio.loop = false;
    audio.crossOrigin = 'anonymous';
    
    // Comprehensive event listeners
    audio.addEventListener('load', () => console.log('✅ Audio loaded'));
    audio.addEventListener('canplay', () => console.log('✅ Audio can play'));
    audio.addEventListener('error', (e) => console.error('❌ Audio error', e));
    audio.addEventListener('stalled', () => console.log('⏸️ Audio stalled'));
    audio.addEventListener('suspend', () => console.log('⏸️ Audio suspended'));
    audio.addEventListener('abort', () => console.log('❌ Audio aborted'));
    
    // Hide audio element
    audio.style.position = 'absolute';
    audio.style.left = '-9999px';
    audio.style.opacity = '0';
    
    // Add to DOM for reliability
    document.body.appendChild(audio);
    
    // Set ref
    audioRef.current = audio;
    
    const timer = setTimeout(() => {
      setCurrentPage('valentine');
    }, 5000);
    return () => {
      clearTimeout(timer);
      if (document.body.contains(audio)) {
        document.body.removeChild(audio);
      }
    };
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
