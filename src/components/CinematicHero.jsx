import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Sparkles, Star, Volume2, VolumeX, RotateCcw } from 'lucide-react';

const TOTAL_FRAMES = 240;

const PHASES = [
  { id: 1, name: "01 Clean Product", range: [0, 0.20], subtitle: "Pure White Artisanal Hero" },
  { id: 2, name: "02 Brand Reveal", range: [0.20, 0.45], subtitle: "Royal Purple & Bold Type" },
  { id: 3, name: "03 Splash & Berries", range: [0.45, 0.70], subtitle: "3D Floating Berries & Splash" },
  { id: 4, name: "04 Color Symphony", range: [0.70, 0.90], subtitle: "Vibrant Berry Pink & Mango" },
  { id: 5, name: "05 Every Scoop", range: [0.90, 1.00], subtitle: "Happiness In Every Scoop" },
];

export default function CinematicHero({ onProgressUpdate, onEnterSite }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Target and current frame for smooth lerp interpolation
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const rafIdRef = useRef(null);
  const isInitialDrawDone = useRef(false);

  // Pad frame index to 4 digits: frame_0001.webp
  const getFrameUrl = useCallback((index) => {
    const padded = String(index).padStart(4, '0');
    return `/frames_webp/frame_${padded}.webp`;
  }, []);

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES + 1);
    imagesRef.current = images;

    // 1. Immediately load frame 1 for instant hero render
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      images[1] = firstImg;
      loadedCountRef.current = 1;
      setLoadProgress(1);
      drawFrame(1);
      isInitialDrawDone.current = true;
    };

    // 2. Batch load all remaining frames
    let loaded = 1;
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        images[i] = img;
        loaded++;
        loadedCountRef.current = loaded;
        
        // Update UI progress in chunks to keep rendering fast
        if (loaded % 12 === 0 || loaded === TOTAL_FRAMES) {
          const percent = Math.min(100, Math.round((loaded / TOTAL_FRAMES) * 100));
          setLoadProgress(percent);
          if (loaded >= TOTAL_FRAMES * 0.4) {
            setIsLoaded(true);
          }
        }
      };
      img.onerror = () => {
        // Fallback to frame 1 if a frame errors
        if (!images[i]) images[i] = images[1];
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl]);

  // Draw frame on canvas with crisp HiDPI scaling and object-fit: contain logic
  const drawFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const roundedFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNumber)));
    let img = imagesRef.current[roundedFrame];
    
    // Fallback to nearest available frame if this one hasn't finished loading yet
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 20; offset++) {
        const lower = imagesRef.current[Math.max(1, roundedFrame - offset)];
        if (lower && lower.complete && lower.naturalWidth > 0) {
          img = lower;
          break;
        }
        const higher = imagesRef.current[Math.min(TOTAL_FRAMES, roundedFrame + offset)];
        if (higher && higher.complete && higher.naturalWidth > 0) {
          img = higher;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Retina canvas scaling
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate smooth dynamic scaling:
    // In Phase 01 (progress < 0.2), product has ~18% white space margin around it
    // As user scrolls, the product smoothly scales up to full-bleed cinema coverage
    const progress = Math.max(0, Math.min(1, (frameNumber - 1) / (TOTAL_FRAMES - 1)));
    const zoomProgress = Math.min(1, progress / 0.4);
    const heroScale = 0.76 + zoomProgress * 0.24; // Smooth zoom from 0.76 to 1.0

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (displayWidth < 768) {
      // Mobile portrait vertical composition:
      // Keep product large, centered in vertical composition
      const mobileHeroScale = 0.64 + zoomProgress * 0.36; // 0.64 -> 1.0 of screen height
      drawHeight = displayHeight * mobileHeroScale;
      drawWidth = drawHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      // Desktop composition:
      let baseWidth, baseHeight;
      if (canvasRatio > imgRatio) {
        baseHeight = displayHeight;
        baseWidth = displayHeight * imgRatio;
      } else {
        baseWidth = displayWidth;
        baseHeight = displayWidth / imgRatio;
      }

      // Full cover dimensions for cinematic immersion
      let coverWidth, coverHeight;
      if (canvasRatio > imgRatio) {
        coverWidth = displayWidth;
        coverHeight = displayWidth / imgRatio;
      } else {
        coverHeight = displayHeight;
        coverWidth = displayHeight * imgRatio;
      }

      // Blend between contained hero with white breathing space and full cover
      drawWidth = (baseWidth * heroScale) * (1 - zoomProgress) + coverWidth * zoomProgress;
      drawHeight = (baseHeight * heroScale) * (1 - zoomProgress) + coverHeight * zoomProgress;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Seamless white backdrop fill during opening clean phase
    if (progress < 0.3) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, displayWidth, displayHeight);
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Smooth RAF render loop with LERP interpolation
  useEffect(() => {
    let animId;
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Linear interpolation factor (0.15 gives buttery smooth response without noticeable lag)
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.15;
        drawFrame(currentFrameRef.current);
      } else if (Math.abs(diff) > 0.001) {
        currentFrameRef.current = target;
        drawFrame(target);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    rafIdRef.current = animId;

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Scroll listener: maps scroll distance directly to video timeline (frames 1 to 240)
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      
      if (scrollableDistance <= 0) return;

      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      setScrollProgress(progress);
      if (onProgressUpdate) onProgressUpdate(progress);

      // Determine active phase
      const phaseIdx = PHASES.findIndex(p => progress >= p.range[0] && progress <= p.range[1]);
      if (phaseIdx !== -1) {
        setCurrentPhaseIndex(phaseIdx);
      } else if (progress > 0.9) {
        setCurrentPhaseIndex(PHASES.length - 1);
      }

      // Map progress to frame number [1, TOTAL_FRAMES]
      const targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onProgressUpdate]);

  // Programmatic jump to phase
  const jumpToPhase = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const targetProgress = PHASES[index].range[0] + 0.05;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetY = container.offsetTop + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const scrollToContent = () => {
    const container = containerRef.current;
    if (!container) return;
    const endY = container.offsetTop + container.offsetHeight;
    window.scrollTo({ top: endY, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      id="hero-track"
      aria-label="Interactive Cinematic Hero Scroll Experience"
      style={{
        position: 'relative',
        height: '520vh', // Generous 520vh timeline for fine scroll precision
        backgroundColor: scrollProgress > 0.85 ? '#240624' : '#FFFFFF',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Sticky Fullscreen Pinned Canvas & Overlay Viewport */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* HTML5 Canvas for 60FPS Video Frame Rendering */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Ambient Gradient Glows based on scroll progress */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
            background: scrollProgress < 0.25 
              ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 60%, rgba(240,230,240,0.4) 100%)'
              : scrollProgress < 0.65
              ? 'radial-gradient(circle at 50% 50%, rgba(106, 20, 107, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(230, 57, 123, 0.18) 0%, rgba(36, 6, 36, 0.4) 100%)',
            transition: 'background 0.5s ease',
          }}
        />

        {/* ============================================================== */}
        {/* PHASE 01 — CLEAN PRODUCT (Progress 0.0 - 0.20)                 */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 'clamp(2rem, 5vh, 3.5rem)',
            paddingBottom: 'clamp(2rem, 5vh, 3.5rem)',
            pointerEvents: 'none',
            opacity: Math.max(0, 1 - (scrollProgress / 0.16)),
            transform: `translateY(${-scrollProgress * 60}px)`,
            transition: 'opacity 0.2s ease-out',
          }}
        >
          {/* Top minimal brand text: "MERRY BERRY" then "ICE CREAM CAFE" */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
              fontWeight: 800,
              letterSpacing: '0.35em',
              color: 'var(--color-purple-deep)',
              lineHeight: 1.2,
              textTransform: 'uppercase',
              marginBottom: '0.2rem',
            }}>
              MERRY BERRY
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.72rem, 1.4vw, 0.85rem)',
              fontWeight: 700,
              letterSpacing: '0.28em',
              color: 'var(--color-berry-pink)',
              textTransform: 'uppercase',
            }}>
              ICE CREAM CAFE
            </p>
          </div>

          {/* Center remains completely open for the photorealistic product tub */}
          <div style={{ flexGrow: 1 }} />

          {/* Bottom scroll prompt */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '0.4rem',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.25em',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
            }}>
              SCROLL TO EXPLORE
            </span>
            <div className="animate-pulse-subtle" style={{ color: 'var(--color-berry-pink)' }}>
              <ChevronDown size={20} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 02 — BRAND REVEAL (Progress 0.20 - 0.45)                */}
        {/* Subtle corner badge letting the video's oversized typography shine */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            zIndex: 8,
            pointerEvents: 'none',
            opacity: scrollProgress >= 0.18 && scrollProgress <= 0.45
              ? Math.min(1, (scrollProgress - 0.18) / 0.06) * Math.min(1, (0.45 - scrollProgress) / 0.06)
              : 0,
            transition: 'opacity 0.25s ease-out',
          }}
        >
          <div style={{
            background: 'rgba(34, 5, 36, 0.45)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            PHASE 02 · ROYAL BRAND IDENTITY
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 03 — PRODUCT + 3D BERRIES (0.45 - 0.70)                 */}
        {/* Subtle top floating pills highlighting ingredients            */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(1rem, 3vh, 2rem)',
            left: 0,
            right: 0,
            zIndex: 9,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 clamp(1rem, 3vw, 2.5rem)',
            gap: '0.5rem',
            pointerEvents: 'none',
            opacity: scrollProgress >= 0.45 && scrollProgress <= 0.70
              ? Math.min(1, (scrollProgress - 0.45) / 0.06) * Math.min(1, (0.70 - scrollProgress) / 0.06)
              : 0,
            transition: 'opacity 0.25s ease-out',
          }}
        >
          <div style={{
            background: 'rgba(34, 5, 36, 0.65)',
            backdropFilter: 'blur(12px)',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontSize: 'clamp(0.68rem, 1.8vw, 0.78rem)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.08em',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>
            🍓 STRAWBERRY & RASPBERRY
          </div>
          <div style={{
            background: 'rgba(34, 5, 36, 0.65)',
            backdropFilter: 'blur(12px)',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontSize: 'clamp(0.68rem, 1.8vw, 0.78rem)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.08em',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>
            🫐 BLUEBERRY
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 04 — COLOR TRANSITION (0.70 - 0.88)                     */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(1rem, 3vh, 2rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9,
            pointerEvents: 'none',
            width: 'max-content',
            maxWidth: '90vw',
            opacity: scrollProgress >= 0.70 && scrollProgress <= 0.88
              ? Math.min(1, (scrollProgress - 0.70) / 0.06) * Math.min(1, (0.88 - scrollProgress) / 0.06)
              : 0,
            transition: 'opacity 0.25s ease-out',
          }}
        >
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            background: 'rgba(34, 5, 36, 0.75)',
            backdropFilter: 'blur(12px)',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            flexWrap: 'nowrap',
            overflowX: 'auto',
          }}>
            {['BERRY PURPLE', 'PINK', 'MANGO GOLD', 'CREAM'].map((c, i) => (
              <span key={i} style={{
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(0.62rem, 1.6vw, 0.72rem)',
                letterSpacing: '0.1em',
                padding: '0.2rem 0.4rem',
                whiteSpace: 'nowrap',
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 05 — FINAL BRAND MOMENT & TRANSITION (0.90 - 1.00)       */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 12,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'clamp(1.5rem, 5vw, 4rem)',
            paddingTop: 'clamp(5rem, 10vh, 7rem)', // Clear sticky navbar space on mobile
            background: 'linear-gradient(180deg, rgba(36, 6, 36, 0.45) 0%, rgba(36, 6, 36, 0.9) 100%)',
            opacity: scrollProgress >= 0.88 ? Math.min(1, (scrollProgress - 0.88) / 0.08) : 0,
            pointerEvents: scrollProgress >= 0.90 ? 'auto' : 'none',
            transition: 'opacity 0.3s ease-out',
          }}
        >
          {/* Rating & Location Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(16px)',
            padding: '0.4rem 1.1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#fff',
            fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
          }}>
            <div style={{ display: 'flex', color: '#FFB300' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#FFB300" strokeWidth={0} />
              ))}
            </div>
            <span style={{ fontWeight: 800 }}>4.9 ★ (64 Reviews)</span>
            <span style={{ opacity: 0.6 }}>•</span>
            <span style={{ fontWeight: 600 }}>Erode</span>
          </div>

          {/* Grand Title & Tagline */}
          <div style={{ textAlign: 'center', maxWidth: '850px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 6.5vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              color: '#FFFFFF',
              lineHeight: 1.05,
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
              textTransform: 'uppercase',
            }}>
              MERRY BERRY
            </h2>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.8rem)',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'var(--color-berry-pink)',
              textTransform: 'uppercase',
              marginTop: '0.3rem',
            }}>
              ICE CREAM CAFE
            </p>
            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(0.95rem, 2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#FAF7F2',
              marginTop: '0.8rem',
              letterSpacing: '0.02em',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
            }}>
              “A Little Happiness in Every Scoop”
            </p>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={scrollToContent}
                className="btn-primary"
                style={{
                  pointerEvents: 'auto',
                  padding: '0.8rem 1.6rem',
                  fontSize: '0.85rem',
                  minHeight: '48px',
                }}
              >
                <Sparkles size={16} />
                ENTER CAFE & MENU
              </button>
            </div>
          </div>

          {/* Downward transition indicator */}
          <div 
            onClick={scrollToContent}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 0.8)',
              gap: '0.2rem',
              pointerEvents: 'auto',
              marginBottom: 'clamp(2.5rem, 6vh, 4rem)',
            }}
          >
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', fontWeight: 700, textAlign: 'center' }}>
              CONTINUE DOWN TO STORY & FLAVOURS
            </span>
            <ChevronDown size={18} className="animate-pulse-subtle" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE PHASE SCRUBBER (Responsive: centered on mobile)    */}
        {/* ============================================================== */}
        <div
          className="hero-phase-scrubber"
          style={{
            position: 'absolute',
            bottom: '1.2rem',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(20, 5, 22, 0.85)',
            backdropFilter: 'blur(16px)',
            padding: '0.35rem 0.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          }}
        >
          {PHASES.map((phase, idx) => {
            const isActive = currentPhaseIndex === idx;
            return (
              <button
                key={phase.id}
                onClick={() => jumpToPhase(idx)}
                aria-label={`Jump to ${phase.name}`}
                title={`${phase.name} — ${phase.subtitle}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: isActive ? 'var(--color-berry-pink)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                  border: 'none',
                  padding: isActive ? '0.35rem 0.7rem' : '0.45rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  minHeight: '32px',
                  minWidth: '32px',
                  justifyContent: 'center',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }} />
                <span className="scrubber-text" style={{ display: isActive ? 'inline' : 'none' }}>
                  {phase.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll Progress Bar at the top edge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 30,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, var(--color-strawberry), var(--color-berry-pink), var(--color-mango))',
              boxShadow: '0 0 10px rgba(230, 57, 123, 0.8)',
              transition: 'width 0.08s linear',
            }}
          />
        </div>

        <style>{`
          .hero-phase-scrubber {
            right: 1.5rem;
          }
          @media (max-width: 600px) {
            .hero-phase-scrubber {
              right: auto !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              bottom: 0.8rem !important;
            }
            .scrubber-text {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
