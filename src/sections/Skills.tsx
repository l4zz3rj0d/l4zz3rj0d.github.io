import { useCallback, useRef } from 'react';
import { TextScramble } from '../hooks/useTextScramble';

const SKILL_CATEGORIES = [
  {
    title: 'PENETRATION TESTING TOOLS',
    skills: ['Burp Suite', 'Nmap', 'Metasploit', 'SQLMap', 'Hydra', 'Custom Python Tools', 'Hellhound Framework'],
  },
  {
    title: 'WEB SECURITY AREAS',
    skills: ['Injection Vulnerabilities', 'Broken Authentication', 'Access Control Flaws', 'Web LLM Attacks', 'API Security', 'Linux Privilege Escalation'],
  },
  {
    title: 'HARDWARE & WIRELESS',
    skills: ['ESP32 / ESP8266', 'Raspberry Pi Pico', 'Deauth Attacks', 'Evil Twin AP', 'Keystroke Injection'],
  },
  {
    title: 'PLATFORMS & LABS',
    skills: ['Kali Linux', 'TryHackMe', 'Hack The Box', 'PortSwigger Academy', 'Android Pentesting (DIVA)', 'Integrity (Bug Bounty)'],
  },
];

export default function Skills() {
  const scramblersRef = useRef<Map<HTMLElement, TextScramble>>(new Map());
  const mainTitleRef = useRef<HTMLHeadingElement>(null);

  const handleHover = useCallback((el: HTMLElement | null, text: string) => {
    if (!el) return;
    let scrambler = scramblersRef.current.get(el);
    if (!scrambler) {
      scrambler = new TextScramble(el);
      scramblersRef.current.set(el, scrambler);
    }
    scrambler.setText(text);
  }, []);

  let globalIndex = 0;

  return (
    <section id="skills" className="relative w-full bg-transparent py-24 border-t border-gray-900">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay-orange pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">Skills</span>
        <h2 
          ref={mainTitleRef}
          onMouseEnter={() => handleHover(mainTitleRef.current, 'Technical Focus')}
          className="font-display font-black text-3xl lg:text-5xl mt-2 mb-12 cursor-pointer hover:text-neon transition-colors" 
          style={{ color: 'var(--terminal-text)' }}
        >
          Technical Focus
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div key={ci} className="border border-gray-800 p-6 hover:border-neon/30 transition-colors">
              <h3 className="font-mono text-xs text-hazard uppercase tracking-widest mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const idx = globalIndex++;
                  return (
                    <div
                      key={skill}
                      onMouseEnter={(e) => handleHover(e.currentTarget, skill)}
                      className="font-mono text-xs px-3 py-1.5 border border-gray-700 text-gray-300 hover:border-neon hover:text-neon cursor-default transition-all"
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
