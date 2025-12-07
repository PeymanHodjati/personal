'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  // State for UI updates
  const [activeSection, setActiveSection] = useState(1); // Start at Home (Middle)
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Refs for smooth animation loop
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0); // Tracks UI/Lock progress
  const videoProgressRef = useRef(0);   // Tracks Video progress
  const requestRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef(0); // Debounce scroll
  const lastFrameTimeRef = useRef(0);  // For delta time calculation
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration
  const isTransitioningRef = useRef(false);
  const SECTIONS = ['Portfolio', 'Home', 'Contact'];
  const UI_SPEED_PER_MS = 0.03125;
  const VIDEO_SPEED_PER_MS = 0.0075;

  // Map section index to progress (0, 50, 100)
  const getTargetProgress = (sectionIndex: number) => {
    if (sectionIndex === 0) return 0;   // Portfolio (Start)
    if (sectionIndex === 1) return 50;  // Home (Middle)
    return 100;                         // Contact (End)
  };

  // Animation Loop - runs continuously
  const animate = (time: number) => {
    if (lastFrameTimeRef.current === 0) {
      lastFrameTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = time - lastFrameTimeRef.current;
    lastFrameTimeRef.current = time;

    const target = targetProgressRef.current;

    // --- UI / Lock Update ---
    const uiDiff = target - currentProgressRef.current;
    const uiStep = UI_SPEED_PER_MS * deltaTime;
    const uiDone = Math.abs(uiDiff) < uiStep;

    if (!uiDone) {
      isTransitioningRef.current = true;
      const direction = Math.sign(uiDiff);
      currentProgressRef.current += direction * uiStep;
    } else {
      currentProgressRef.current = target;
    }

    // --- Video Update (Slower) ---
    const videoDiff = target - videoProgressRef.current;
    const videoStep = VIDEO_SPEED_PER_MS * deltaTime;
    const videoDone = Math.abs(videoDiff) < videoStep;

    if (!videoDone) {
      const direction = Math.sign(videoDiff);
      videoProgressRef.current += direction * videoStep;

      // Apply to Video
      if (videoRef.current && videoRef.current.duration) {
        const videoTime = (videoProgressRef.current / 100) * videoRef.current.duration;
        if (Number.isFinite(videoTime)) {
          videoRef.current.currentTime = videoTime;
        }
      }
    } else {
      videoProgressRef.current = target;
    }

    // --- Check for Completion ---
    if (uiDone && videoDone) {
      if (isTransitioningRef.current) {
        isTransitioningRef.current = false;
        lastScrollTimeRef.current = Date.now();
      }
    }

    // Always continue the animation loop
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    // Detect mobile via touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouchDevice);

    // Check if video is already ready (cached)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      if (!isTouchDevice) {
        setIsLoading(false);
      }
    }

    // Fallback timeout - on mobile show enter button, on desktop hide loader
    const timeout = setTimeout(() => {
      if (isTouchDevice) {
        setShowEnterButton(true);
      } else {
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(timeout);
      if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    };
  }, []);

  // Update target when active section changes
  useEffect(() => {
    targetProgressRef.current = getTargetProgress(activeSection);
  }, [activeSection]);

  // Wheel Logic (Discrete Steps)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isLoading) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < 500) return; // Debounce 500ms

      // Lock scroll if currently animating
      if (isTransitioningRef.current) return;

      const direction = Math.sign(e.deltaY);

      if (direction > 0) {
        // Scroll Down
        setActiveSection(prev => {
          const next = Math.min(prev + 1, SECTIONS.length - 1);
          if (next !== prev) isTransitioningRef.current = true; // Lock immediately
          return next;
        });
      } else if (direction < 0) {
        // Scroll Up
        setActiveSection(prev => {
          const next = Math.max(prev - 1, 0);
          if (next !== prev) isTransitioningRef.current = true; // Lock immediately
          return next;
        });
      }

      lastScrollTimeRef.current = now;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLoading]);

  // Drag Logic (Updates Section based on position)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      if (scrollBarRef.current) {
        const rect = scrollBarRef.current.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const percentage = (clickY / rect.height) * 100;
        const clamped = Math.max(0, Math.min(100, percentage));

        // Snap to nearest section
        if (clamped < 33) setActiveSection(0);
        else if (clamped < 66) setActiveSection(1);
        else setActiveSection(2);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Touch Logic (Swipe)
  const touchStartRef = useRef<number | null>(null);
  const hasInteractedRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;

    // Unlock video on first touch for mobile browsers
    if (!hasInteractedRef.current && videoRef.current) {
      hasInteractedRef.current = true;
      videoRef.current.load();
      // Brief play/pause to unlock the video for scrubbing
      videoRef.current.play().then(() => {
        videoRef.current?.pause();
      }).catch(() => { });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default to avoid scrolling the body (if needed)
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    if (isTransitioningRef.current) return;

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStartRef.current - touchEnd;

    // Threshold for swipe (e.g., 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe Up -> Next Section
        setActiveSection(prev => Math.min(prev + 1, SECTIONS.length - 1));
      } else {
        // Swipe Down -> Prev Section
        setActiveSection(prev => Math.max(prev - 1, 0));
      }
    }

    touchStartRef.current = null;
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Loading Screen */}
      <div className={`${styles.loader} ${!isLoading ? styles.hidden : ''}`}>
        {showEnterButton && isMobile ? (
          <button
            className={styles.enterButton}
            onClick={() => {
              // Unlock video on mobile
              if (videoRef.current) {
                hasInteractedRef.current = true;
                videoRef.current.load();
                videoRef.current.play().then(() => {
                  videoRef.current?.pause();
                  setIsLoading(false);
                }).catch(() => {
                  setIsLoading(false);
                });
              } else {
                setIsLoading(false);
              }
            }}
          >
            Enter Site
          </button>
        ) : (
          <>
            <div className={styles.spinner}></div>
            <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Starting up</p>
          </>
        )}
      </div>

      {/* Background Video */}
      <video
        ref={videoRef}
        className={styles.videoBackground}
        src="https://pub-a0f9c91ac679465bb3e90eb766fb247a.r2.dev/Home/personalsitevid.mp4"
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={() => setIsLoading(false)}
      />

      {/* Side Menu */}
      <div className={styles.sideMenu}>
        {/* Custom Scrollbar */}
        <div
          ref={scrollBarRef}
          className={styles.scrollBarContainer}
          onMouseDown={(e) => {
            setIsDragging(true);
            const rect = e.currentTarget.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const percentage = (clickY / rect.height) * 100;

            // Snap on click
            if (percentage < 33) setActiveSection(0);
            else if (percentage < 66) setActiveSection(1);
            else setActiveSection(2);
          }}
        >
          {/* Thumb position based on active section */}
          <div
            className={`${styles.scrollBarThumb} ${isDragging ? styles.dragging : ''}`}
            style={{
              top: `${getTargetProgress(activeSection)}%`,
              transform: 'translate(-50%, -50%)',
              transition: isDragging ? 'none' : 'top 0.5s ease-in-out' // Smooth move
            }}
          />
        </div>

        {SECTIONS.map((section, index) => (
          <button
            key={section}
            className={`${styles.menuItem} ${activeSection === index ? styles.active : ''}`}
            onClick={() => {
              setActiveSection(index);

              // Clear any existing timeout
              if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);

              // Set fixed 3s timeout for navigation
              if (section === 'Portfolio') {
                navigationTimeoutRef.current = setTimeout(() => {
                  router.push('/portfolio');
                }, 3000);
              }
              // Contact no longer navigates, just slides in
            }}
            style={{ cursor: activeSection === index ? 'pointer' : 'default' }}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Contact Slide-in */}
      <div className={`${styles.contactSlideIn} ${activeSection === 2 ? styles.visible : ''}`}>
        <div className={styles.contactTitle}>Get in Touch</div>

        <div className={styles.contactRow}>
          <div className={styles.contactDetail}>General: hello@peymanhodjati.com</div>
          <button
            className={styles.copyButton}
            onClick={() => handleCopy('hello@peymanhodjati.com')}
            title="Copy to clipboard"
          >
            {copiedEmail === 'hello@peymanhodjati.com' ? (
              <span className={styles.copiedText}>Copied!</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </div>

        <div className={styles.contactRow}>
          <div className={styles.contactDetail}>Work-related inquiries: contact@peymanhodjati.com</div>
          <button
            className={styles.copyButton}
            onClick={() => handleCopy('contact@peymanhodjati.com')}
            title="Copy to clipboard"
          >
            {copiedEmail === 'contact@peymanhodjati.com' ? (
              <span className={styles.copiedText}>Copied!</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Content Overlay (Cleared Center) */}
      <div className={styles.contentOverlay}>
        {/* Center cleared as requested. */}
      </div>
    </div>
  );
}
