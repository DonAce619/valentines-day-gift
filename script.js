// Global variables
let isTransitioning = false;
let mouseX = 0;
let mouseY = 0;
let cursorGlow;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize particles
    initParticles();
    
    // Initialize enhanced animations
    initEnhancedAnimations();
});

// Function to show rose page
function showRose() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const landingPage = document.getElementById('landingPage');
    const rosePage = document.getElementById('rosePage');
    
    // Add fade out animation to landing page
    landingPage.classList.add('fade-out');
    
    // Play transition sound effect (optional)
    playTransitionSound();
    
    // Show rose page after landing page starts fading
    setTimeout(() => {
        rosePage.classList.remove('hidden');
        setTimeout(() => {
            rosePage.classList.add('active');
            // Add entrance animation to rose
            const roseWrapper = document.querySelector('.rose-wrapper');
            roseWrapper.classList.add('animate__animated', 'animate__zoomIn');
        }, 50);
    }, 500);
    
    // Hide landing page completely after transition
    setTimeout(() => {
        landingPage.classList.add('hidden');
        landingPage.classList.remove('fade-out');
        isTransitioning = false;
    }, 1500);
    
    // Create floating hearts around rose
    createFloatingHearts();
    
    // Create rose particles
    createRoseParticles();
}

// Function to show message popup
function showMessage() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const messagePopup = document.getElementById('messagePopup');
    
    // Show popup with animation
    messagePopup.classList.remove('hidden');
    setTimeout(() => {
        messagePopup.classList.add('active');
    }, 50);
    
    // Play romantic sound effect (optional)
    playRomanticSound();
    
    // Create enhanced petal effect
    createEnhancedPetals();
    
    // Create magical particles
    createMagicalParticles();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Function to close message popup
function closeMessage() {
    const messagePopup = document.getElementById('messagePopup');
    
    messagePopup.classList.remove('active');
    
    setTimeout(() => {
        messagePopup.classList.add('hidden');
    }, 300);
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }
}

// Initialize custom cursor
function initCustomCursor() {
    cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;
    
    // Only show custom cursor on desktop
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.left = mouseX + 'px';
            cursorGlow.style.top = mouseY + 'px';
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('button, .rose-wrapper');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorGlow.classList.add('hover');
            });
            element.addEventListener('mouseleave', () => {
                cursorGlow.classList.remove('hover');
            });
        });
    }
}

// Initialize particles
function initParticles() {
    const particleContainer = document.getElementById('particleContainer');
    if (!particleContainer) return;
    
    // Create synchronized particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createSyncedParticle();
        }, i * 400);
    }
    
    // Create synced orbs
    initSyncedOrbs();
    
    // Continue creating particles
    setInterval(() => {
        createSyncedParticle();
    }, 2000);
}

// Create synchronized particle
function createSyncedParticle() {
    const particleContainer = document.getElementById('particleContainer');
    if (!particleContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '0px';
    particle.style.setProperty('--particle-delay', Math.random() * 2 + 's');
    
    particleContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Initialize synced orbs
function initSyncedOrbs() {
    const syncedOrbs = document.getElementById('syncedOrbs');
    if (!syncedOrbs) return;
    
    const orbCount = 8;
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'sync-orb';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.setProperty('--orb-delay', (i * 1.5) + 's');
        
        syncedOrbs.appendChild(orb);
    }
}

// Create floating hearts around rose
function createFloatingHearts() {
    const rosePage = document.getElementById('rosePage');
    
    // Create synchronized hearts with complementary timing
    const heartData = [
        { emoji: '❤️', delay: 0, duration: 8, left: 10 },
        { emoji: '💕', delay: 1, duration: 9, left: 25 },
        { emoji: '💖', delay: 2, duration: 10, left: 40 },
        { emoji: '💗', delay: 3, duration: 8.5, left: 55 },
        { emoji: '💝', delay: 4, duration: 9.5, left: 70 },
        { emoji: '💕', delay: 5, duration: 11, left: 85 },
        { emoji: '❤️', delay: 6, duration: 7.5, left: 15 },
        { emoji: '💖', delay: 7, duration: 10.5, left: 30 },
    ];
    
    heartData.forEach((data, i) => {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart-rose';
            heart.innerHTML = data.emoji;
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 1 + 1.5}rem;
                left: ${data.left}%;
                bottom: -50px;
                opacity: 0;
                animation: syncFloat ${data.duration}s ease-in-out infinite;
                animation-delay: ${data.delay}s;
                pointer-events: none;
                z-index: 1;
                filter: drop-shadow(0 0 15px rgba(255, 182, 193, 0.8));
            `;
            rosePage.appendChild(heart);
        }, i * 500);
    });
}

// Create rose particles
function createRoseParticles() {
    const roseParticles = document.getElementById('roseParticles');
    if (!roseParticles) return;
    
    const particleTypes = [
        { emoji: '🌹', color: '#ff66b2' },
        { emoji: '🌸', color: '#ffb3d9' },
        { emoji: '💕', color: '#ff99cc' },
        { emoji: '✨', color: '#ffffff' },
        { emoji: '💖', color: '#ff80bf' }
    ];
    
    // Create synchronized particle system
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particleType = particleTypes[i % particleTypes.length];
            const particle = document.createElement('div');
            particle.className = 'rose-particle';
            particle.innerHTML = particleType.emoji;
            particle.style.left = (10 + (i * 6)) + '%';
            particle.style.setProperty('--particle-delay', (i * 0.3) + 's');
            particle.style.filter = `drop-shadow(0 0 10px ${particleType.color})`;
            
            roseParticles.appendChild(particle);
        }, i * 300);
    }
}

// Create enhanced petal effect
function createEnhancedPetals() {
    const petalBackground = document.querySelector('.petal-background');
    if (!petalBackground) return;
    
    // Add additional dynamic petals
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'dynamic-petal';
            const petals = ['🌸', '🌺', '🌹', '💐', '🌷'];
            petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            petal.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 2 + 1.5}rem;
                left: ${Math.random() * 100}%;
                top: -50px;
                opacity: ${Math.random() * 0.4 + 0.4};
                animation: dynamicPetalFall ${Math.random() * 5 + 8}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
            `;
            petalBackground.appendChild(petal);
        }, i * 200);
    }
}

// Create magical particles for message popup
function createMagicalParticles() {
    const messagePopup = document.getElementById('messagePopup');
    if (!messagePopup) return;
    
    // Create floating lights
    createFloatingLights();
    
    // Create synchronized sparkles
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 0.8 + 0.6}rem;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                animation: sparkleAnim 2s ease-out forwards;
                pointer-events: none;
                z-index: 1;
                filter: drop-shadow(0 0 8px rgba(255, 223, 239, 0.9));
            `;
            messagePopup.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 80);
    }
}

// Create floating lights for message popup
function createFloatingLights() {
    const floatingLights = document.getElementById('floatingLights');
    if (!floatingLights) return;
    
    for (let i = 0; i < 12; i++) {
        const light = document.createElement('div');
        light.className = 'floating-light';
        light.style.left = Math.random() * 100 + '%';
        light.style.setProperty('--light-delay', (i * 0.8) + 's');
        
        floatingLights.appendChild(light);
    }
}

// Initialize enhanced animations
function initEnhancedAnimations() {
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const landingContent = document.querySelector('.landing-content');
        if (landingContent) {
            landingContent.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
    
    // Add ripple effect to button
    const enterBtn = document.querySelector('.enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${e.offsetX - 25}px;
                top: ${e.offsetY - 25}px;
                width: 50px;
                height: 50px;
            `;
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Optional: Play transition sound effect
function playTransitionSound() {
    // Create a simple sound effect using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        // Silent fail if audio is not supported
        console.log('Audio not supported');
    }
}

// Add dynamic styles for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes dynamicPetalFall {
        0% {
            transform: translateY(-50px) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-heart-rose {
        animation: floatUp 6s ease-out forwards;
    }
    
    .dynamic-petal {
        animation: dynamicPetalFall 10s linear infinite;
    }
    
    .ripple {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const messagePopup = document.getElementById('messagePopup');
        if (messagePopup.classList.contains('active')) {
            closeMessage();
        }
    }
    
    if (e.key === 'Enter' || e.key === ' ') {
        const landingPage = document.getElementById('landingPage');
        const rosePage = document.getElementById('rosePage');
        
        if (!landingPage.classList.contains('hidden') && !isTransitioning) {
            e.preventDefault();
            showRose();
        } else if (!rosePage.classList.contains('hidden') && !document.getElementById('messagePopup').classList.contains('active') && !isTransitioning) {
            e.preventDefault();
            showMessage();
        }
    }
});

// Add mouse trail effect on landing page
document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landingPage');
    
    landingPage.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) { // Only create trail occasionally
            const trail = document.createElement('div');
            trail.innerHTML = '✨';
            trail.style.cssText = `
                position: absolute;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 1rem;
                pointer-events: none;
                animation: sparkle 1s ease-out forwards;
                z-index: 1;
            `;
            landingPage.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 1000);
        }
    });
    
    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        const landingPage = document.getElementById('landingPage');
        const rosePage = document.getElementById('rosePage');
        
        if (!landingPage.classList.contains('hidden') && swipeDistance < -minSwipeDistance) {
            // Swipe up on landing page
            showRose();
        } else if (!rosePage.classList.contains('hidden') && swipeDistance < -minSwipeDistance) {
            // Swipe up on rose page
            showMessage();
        }
    }
}

// Prevent context menu on long press (for better mobile experience)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});
