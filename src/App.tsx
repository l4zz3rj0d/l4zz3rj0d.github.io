import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import LabsMatrix from './sections/LabsMatrix';
import Contributions from './sections/Contributions';
import ProofOfWork from './sections/ProofOfWork';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force scroll to top and clear hash on initial load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const video = videoRef.current;
    if (!video) return;

    // The official GSAP pattern for video scrubbing
    const setupScrub = () => {
      const duration = video.duration && !isNaN(video.duration) ? video.duration : 10;
      
      gsap.to(video, {
        currentTime: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 3, // 3 second smoothing for buttery cinematic feel
        }
      });
    };

    if (video.readyState >= 1) {
      setupScrub();
    } else {
      video.addEventListener('loadedmetadata', setupScrub, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative bg-transparent min-h-screen">
      {/* Fixed scroll-driven background video (z-0 to stay in front of body bg) */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/videos/BACKGROUND_SCRUB.mp4" type="video/mp4" />
        </video>
        {/* Restored dark overlay for readability */}
        <div className="absolute inset-0 bg-[#050505]/60" />
      </div>

      {/* Sections (z-10 to ensure they scroll over the video) */}
      <div className="relative z-10">
        <Hero />
        <About />
        <LabsMatrix />
        <Contributions />
        <ProofOfWork />
        <Skills />
        <Experience />
        <Footer />
      </div>
    </div>
  );
}

export default App;
