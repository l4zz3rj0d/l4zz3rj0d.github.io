import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingHacker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopScreenRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Subtle breathing/typing neon pulse animation
    const screenPulse = gsap.to(laptopScreenRef.current, {
      opacity: 0.8,
      scale: 1.05,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    // Drift paths connecting sections
    const ctx = gsap.context(() => {
      // Pin hacker in fixed coordinates, animate its position relative to viewport
      gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          endTrigger: '#footer',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      })
      // 1. Move to About section (position left side, slightly larger)
      .to(el, {
        x: '10vw',
        y: '35vh',
        scale: 1.2,
        rotation: 12,
        opacity: 0.45,
        duration: 1,
      })
      // 2. Move to Projects section (position bottom center, blend background)
      .to(el, {
        x: '40vw',
        y: '70vh',
        scale: 0.9,
        rotation: -5,
        opacity: 0.3,
        duration: 1,
      })
      // 3. Move to Contributions / Proof of Work section (position right side)
      .to(el, {
        x: '75vw',
        y: '25vh',
        scale: 1.1,
        rotation: -15,
        opacity: 0.4,
        duration: 1,
      })
      // 4. Move to Skills / Experience (position left bottom)
      .to(el, {
        x: '5vw',
        y: '65vh',
        scale: 1.0,
        rotation: 8,
        opacity: 0.35,
        duration: 1,
      })
      // 5. Descend to Footer (blend completely into matrix silhouette)
      .to(el, {
        x: '80vw',
        y: '80vh',
        scale: 0.7,
        rotation: 0,
        opacity: 0.15,
        duration: 1,
      });
    });

    return () => {
      screenPulse.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-[180px] h-[180px] -z-10 pointer-events-none transition-opacity duration-500 select-none"
      style={{
        transform: 'translate(80vw, 55vh) scale(1)',
        opacity: 0.4,
        filter: 'drop-shadow(0 0 20px rgba(0, 230, 118, 0.4))',
      }}
    >
      {/* Hooded Hacker Silhouette SVG */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Glowing aura/matrix code flow circle backdrop */}
        <circle cx="100" cy="100" r="70" fill="url(#hackerGlow)" opacity="0.15" />

        {/* Laptop base */}
        <path
          d="M60 140 H140 L150 155 H50 Z"
          fill="#111111"
          stroke="var(--neon-green)"
          strokeWidth="2"
        />

        {/* Laptop Screen & Glow */}
        <svg
          ref={laptopScreenRef}
          x="75"
          y="105"
          width="50"
          height="35"
          viewBox="0 0 50 35"
          className="origin-bottom"
        >
          <rect
            x="2"
            y="2"
            width="46"
            height="31"
            rx="2"
            fill="#050505"
            stroke="var(--neon-green)"
            strokeWidth="1.5"
          />
          {/* Cyber code matrix streams inside laptop screen */}
          <line x1="6" y1="8" x2="25" y2="8" stroke="var(--neon-green)" strokeWidth="1" />
          <line x1="6" y1="14" x2="35" y2="14" stroke="var(--hazard-orange)" strokeWidth="1" />
          <line x1="6" y1="20" x2="20" y2="20" stroke="var(--neon-green)" strokeWidth="1" />
          <line x1="6" y1="26" x2="40" y2="26" stroke="var(--neon-green)" strokeWidth="1" />
        </svg>

        {/* Light cone projecting from laptop to face */}
        <polygon
          points="75,120 125,120 135,50 65,50"
          fill="url(#lightCone)"
          opacity="0.3"
        />

        {/* Torso / Hoodie */}
        <path
          d="M50 180 C50 140, 70 110, 100 110 C130 110, 150 140, 150 180 Z"
          fill="#0a0a0a"
          stroke="var(--neon-green)"
          strokeWidth="2"
        />

        {/* Hood */}
        <path
          d="M75 110 C75 70, 125 70, 125 110 C125 117, 120 125, 100 125 C80 125, 75 117, 75 110 Z"
          fill="#0f0f0f"
          stroke="var(--neon-green)"
          strokeWidth="1.5"
        />

        {/* Face hollow shadow */}
        <path
          d="M83 105 C83 85, 117 85, 117 105 C117 112, 112 118, 100 118 C88 118, 83 112, 83 105 Z"
          fill="#020202"
        />

        {/* Glitch lines on hacker body */}
        <line x1="45" y1="150" x2="70" y2="150" stroke="var(--hazard-orange)" strokeWidth="1" opacity="0.7" />
        <line x1="130" y1="165" x2="155" y2="165" stroke="var(--neon-green)" strokeWidth="1" opacity="0.8" />

        {/* Definitions */}
        <defs>
          <radialGradient id="hackerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--neon-green)" />
            <stop offset="100%" stopColor="var(--void-black)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lightCone" x1="100" y1="120" x2="100" y2="50">
            <stop offset="0%" stopColor="var(--neon-green)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--neon-green)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
