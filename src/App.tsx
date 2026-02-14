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
    // Audio will be created via DOM element
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
      {/* Direct DOM audio element - more reliable than Audio() constructor */}
      <audio
        ref={audioRef}
        src="/valentines-day-gift/music.mp3"
        preload="auto"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = 0.5;
            console.log('✅ Audio loaded and ready');
          }
        }}
        onError={(e) => {
          console.error('❌ Audio load error:', e);
        }}
      />
      
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
