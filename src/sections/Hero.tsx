import { useEffect, useRef } from 'react';
import { TextScramble } from '../hooks/useTextScramble';

const TAGS = [
  { label: 'Co-Founder · TriOps Security', href: 'https://www.linkedin.com/company/122134385' },
  { label: 'Offensive Security Research' },
  { label: 'Automated Penetration Testing' },
  { label: 'Web Application Security' },
  { label: 'AI / LLM Security Testing' },
  { label: 'CTF · TryHackMe Top 1%' },
];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scramblerRef = useRef<TextScramble | null>(null);

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    const setColoredName = (isLazzer: boolean) => {
      if (!titleRef.current) return;
      if (isLazzer) {
        titleRef.current.innerHTML = '<span class="text-hazard">L4ZZ3R</span><span class="text-white">J0D</span>';
      } else {
        titleRef.current.innerHTML = '<span class="text-white">SREE </span><span class="text-hazard">DANUSH</span>';
      }
    };

    const runGlitchSequence = async () => {
      if (!titleRef.current) return;
      if (!scramblerRef.current) {
        scramblerRef.current = new TextScramble(titleRef.current);
      }
      
      // Start as L4ZZ3RJ0D
      setColoredName(true);

      // After 1 sec, switch to SREE DANUSH
      timeout1 = setTimeout(async () => {
        if (!scramblerRef.current) return;
        await scramblerRef.current.setText('SREE DANUSH');
        setColoredName(false);
        
        // After 2 sec, switch back
        timeout2 = setTimeout(async () => {
          if (!scramblerRef.current) return;
          await scramblerRef.current.setText('L4ZZ3RJ0D');
          setColoredName(true);
        }, 2000);
      }, 1000);
    };

    const interval = setInterval(() => {
      runGlitchSequence();
    }, 6000);
    runGlitchSequence();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      if (scramblerRef.current) {
        scramblerRef.current.destroy();
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col justify-between"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" style={{ zIndex: 2 }} />

      {/* Header bar */}
      <header className="relative w-full flex items-center justify-between px-6 py-4" style={{ zIndex: 10 }}>
        <div className="flex items-center gap-3">
          <span className="text-hazard font-mono text-sm font-bold tracking-widest">L4ZZ3RJ0D</span>
          <span className="text-xs font-mono text-gray-500">OFFSEC PORTFOLIO</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
          <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="bg-hazard text-black font-mono text-xs font-bold px-5 py-2 hover:bg-white hover:text-black transition-all"
        >
          Let&apos;s Talk
        </a>
      </header>

      {/* Main hero content */}
      <div className="relative flex flex-col items-center justify-center flex-grow py-12" style={{ zIndex: 5 }}>
        {/* Profile Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/80 shadow-[0_0_30px_rgba(255,61,0,0.4)] mb-8 bg-black">
          <img
            src="/images/l4zz3rj0d.jpg"
            alt="Sree Danush S"
            className="w-full h-full object-cover"
          />
        </div>

        <h1
          ref={titleRef}
          className="font-display font-black text-center select-none text-white"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            textShadow: '0 0 60px rgba(255,61,0,0.25), 0 0 120px rgba(255,61,0,0.1)',
          }}
        >
          L4ZZ3RJ0D
        </h1>
        <p className="font-display text-white/60 text-sm mt-4 tracking-widest font-medium">
          OFFENSIVE SECURITY ENGINEER &amp; TOOL BUILDER
        </p>

        {/* Availability badge */}
        <div className="mt-4 flex items-center gap-2 font-display text-xs">
          <span className="w-2 h-2 rounded-full bg-hazard pulse-dot" />
          <span className="text-gray-400">Open to opportunities</span>
        </div>

        {/* Custom Chips / Tags — Co-Founder links to LinkedIn */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 max-w-2xl px-6">
          {TAGS.map((tag, i) =>
            tag.href ? (
              <a
                key={i}
                href={tag.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xs px-3 py-1.5 border border-white/20 text-white/80 bg-white/5 rounded-full hover:border-hazard hover:text-hazard hover:bg-hazard/5 transition-colors no-underline"
              >
                {tag.label}
              </a>
            ) : (
              <span
                key={i}
                className="font-display text-xs px-3 py-1.5 border border-white/20 text-white/80 bg-white/5 rounded-full hover:border-hazard hover:text-hazard hover:bg-hazard/5 transition-colors"
              >
                {tag.label}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
