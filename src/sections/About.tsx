import { useCallback, useRef, useState, useEffect } from 'react';
import { TextScramble } from '../hooks/useTextScramble';

function GlitchStat({ stat }: { stat: { label: string, value: string } }) {
  const [displayText, setDisplayText] = useState(stat.value);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      const chars = '!<>-_\\/[]{}—=+*^?#';
      setDisplayText(stat.value.split('').map(c => c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join(''));
      
      timeout = setTimeout(() => {
        setDisplayText(stat.value);
      }, 150);
    }, 2000 + Math.random() * 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [stat.value]);

  return (
    <div className="text-center group cursor-pointer">
      <div 
        className="font-display font-black text-2xl text-hazard group-hover:text-white transition-colors"
        style={{ textShadow: '0 0 15px rgba(255,61,0,0.8), 0 0 30px rgba(255,61,0,0.4)' }}
      >
        {displayText}
      </div>
      <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-1 group-hover:text-hazard transition-colors">
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  const handleNameHover = useCallback(() => {
    if (nameRef.current) {
      const s = new TextScramble(nameRef.current);
      s.setText('L4ZZ3RJ0D');
      setTimeout(() => {
        if (nameRef.current) {
          const s2 = new TextScramble(nameRef.current);
          s2.setText('Sree Danush S');
        }
      }, 1500);
    }
  }, []);

  const handleRoleHover = useCallback(() => {
    if (roleRef.current) {
      const s = new TextScramble(roleRef.current);
      s.setText('SYSTEM BREAK-IN...');
      setTimeout(() => {
        if (roleRef.current) {
          const s2 = new TextScramble(roleRef.current);
          s2.setText('OFFENSIVE SECURITY ENGINEER & TOOL BUILDER');
        }
      }, 1200);
    }
  }, []);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-transparent text-white py-20"
    >
      {/* Section label */}
      <div className="px-6 mb-12">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">About</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Diagnostics System Terminal (Static, highly detailed) */}
        <div className="border border-gray-800 bg-[#050505]/80 p-6 rounded-sm font-mono text-xs text-left space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-gray-900 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">
              system_diagnostics.log
            </span>
          </div>

          <div className="space-y-2 leading-relaxed">
            <div>
              <span className="text-neon font-bold">OPERATOR:</span> Sree Danush S
            </div>
            <div>
              <span className="text-neon font-bold">IDENTITY:</span> L4ZZ3RJ0D
            </div>
            <div>
              <span className="text-neon font-bold">STATUS:</span> Active Security Researcher
            </div>
            <div>
              <span className="text-neon font-bold">ACADEMIC:</span> BE Cybersecurity · MEC
            </div>
            <div>
              <span className="text-neon font-bold">DIAGNOSTIC STATUS:</span> <span className="text-neon">ONLINE [SECURE]</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-900 space-y-2">
            <span className="text-[10px] text-gray-500 font-bold block">PRIMARY CORE COMPETENCIES</span>
            <div className="grid grid-cols-1 gap-1.5 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-neon">[✓]</span> Web Application Penetration Testing (OWASP Top 10)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon">[✓]</span> Active Directory &amp; Infrastructure Auditing
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon">[✓]</span> Automated Offensive Framework Design
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon">[✓]</span> Wireless Attacks (Deauth &amp; Rogue AP Setups)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon">[✓]</span> Hardware Exploitation (Pico Rubber Ducky setups)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon">[✓]</span> AI / LLM Security Vulnerability Testing
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-900 text-[10px] text-gray-500 flex justify-between">
            <span>SYS_VERSION: HELLHOUND_V4</span>
            <span>INTEGRITY: 100% SECURE</span>
          </div>
        </div>

        {/* Right: Bio */}
        <div className="space-y-6">
          <h2
            ref={nameRef}
            onMouseEnter={handleNameHover}
            className="font-display font-bold text-3xl lg:text-4xl cursor-pointer text-white hover:text-neon transition-colors"
            style={{ letterSpacing: '-0.02em' }}
          >
            Sree Danush S
          </h2>

          <p
            ref={roleRef}
            onMouseEnter={handleRoleHover}
            className="font-mono text-sm text-neon font-bold cursor-pointer"
          >
            OFFENSIVE SECURITY ENGINEER &amp; TOOL BUILDER
          </p>

          <div className="space-y-4 font-mono text-sm text-gray-300 leading-relaxed">
            <p>
              I&apos;m <strong className="text-white font-bold">Sree Danush S</strong> — an offensive security engineer,
              tool builder, and founder of{' '}
              <span className="text-hazard font-bold">Project-Hellhound</span>, an open-source security
              research organisation building autonomous offensive tools at the intersection of web
              security, AI, and automation. BE Cybersecurity graduate from Mahendra Engineering College.
            </p>
            <p>
              At <strong className="text-white font-bold">CyArt</strong>, I contribute to{' '}
              <span className="text-hazard font-bold">CyTrack</span> — a multi-agent autonomous web
              pentesting platform. Multiple agent layers, each targeting a different attack class, run
              in production against real targets. This is production-grade offensive security engineering,
              not a side project.
            </p>
            <p>
              In parallel, I maintain <span className="text-hazard font-bold">Hellhound</span> — my
              personal modular pentest framework — and consistently practise through{' '}
              <strong className="text-white font-bold">PortSwigger Web Security Academy</strong>, where I&apos;m currently exploring areas
              like Web LLM attacks, advanced injection techniques, and newer web attack vectors. I believe
              the best security engineers never stop practising their craft.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-gray-800">
            {[
              { label: 'CGPA', value: '8.31' },
              { label: 'Internships', value: '5' },
              { label: 'GitHub Repos', value: '22+' },
              { label: 'TryHackMe', value: 'Top 1%' },
              { label: 'HackingHub', value: 'Top 300' },
            ].map((stat) => (
              <GlitchStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
