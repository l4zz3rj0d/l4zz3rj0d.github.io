import { useCallback, useRef } from 'react';
import { TextScramble } from '../hooks/useTextScramble';

const LABS = [
  {
    name: 'HackingHub',
    desc: 'Top 300 all time. Practising real-world bug bounty scenarios through structured labs — building recon, enumeration, and exploitation skills for live programs.',
    tags: ['Top 300 All Time', 'Bug Bounty Practice', 'Active'],
    status: 'ACTIVE',
    color: 'var(--neon-green)',
    borderColor: 'rgba(0,230,118,0.3)',
    bgColor: 'rgba(0,230,118,0.02)'
  },
  {
    name: 'Hack The Box',
    desc: 'Recently started exploring HTB machines and challenges. Early stage but actively working through beginner-level boxes to build hands-on exploitation skills.',
    tags: ['Getting Started', 'Active'],
    status: 'ACTIVE',
    color: 'var(--neon-green)',
    borderColor: 'rgba(0,230,118,0.3)',
    bgColor: 'rgba(0,230,118,0.02)'
  },
  {
    name: 'TryHackMe Learning Paths',
    desc: 'Completed two full certification paths — building foundational to intermediate offensive security skills across real labs.',
    tags: ['Jr. Penetration Tester', 'Web App Pentesting', 'Linux PrivEsc'],
    status: 'COMPLETE',
    color: 'var(--neon-green)',
    borderColor: 'rgba(0,230,118,0.3)',
    bgColor: 'rgba(0,230,118,0.02)'
  },
  {
    name: 'PortSwigger Web Security Academy',
    desc: 'Consistent practice across the full OWASP attack surface. Currently exploring newer areas including Web LLM attacks.',
    tags: ['SQLi', 'Auth Bypass', '2FA Bypass', 'XXE', 'SSTI', 'Web LLM Attacks', 'Access Control', 'IDOR'],
    status: 'ACTIVE',
    color: 'var(--neon-green)',
    borderColor: 'rgba(0,230,118,0.3)',
    bgColor: 'rgba(0,230,118,0.02)'
  },
  {
    name: 'AI & LLM Security — Emerging Focus',
    desc: 'Actively learning how AI-integrated applications introduce new attack surfaces — prompt injection, LLM-assisted recon, and AI-driven vulnerability detection.',
    tags: ['Prompt Injection', 'Web LLM Attacks', 'AI-Assisted Pentesting'],
    status: 'ACTIVE',
    color: 'var(--neon-green)',
    borderColor: 'rgba(0,230,118,0.3)',
    bgColor: 'rgba(0,230,118,0.02)'
  },
  {
    name: 'HackSmarter Labs',
    desc: 'Recently started learning on HackSmarter — structured security labs focused on practical offensive skills and real-world attack scenarios.',
    tags: ['Getting Started', 'Offensive Labs', 'hacksmarter.org'],
    status: 'ACTIVE',
    color: 'var(--neon-green)',
    borderColor: 'rgba(0,230,118,0.3)',
    bgColor: 'rgba(0,230,118,0.02)'
  }
];

const WRITEUPS = [
  { title: 'HealthGPT - Jailbreak tryackme walthrough', url: 'https://medium.com/@l4zz3rj0d/healthgpt-when-access-denied-accidentally-leaked-everything-7d386e89f052' },
  { title: 'Pluck CMS 4.7.16 — Remote Code Execution Exploit', url: 'https://medium.com/@l4zz3rj0d/pluck-cms-4-7-16-exploit-walkthrough-999df429c306' },
  { title: 'Mustacchio — TryHackMe XXE Walkthrough', url: 'https://medium.com/@l4zz3rj0d/summary-15e9cd1b387f' },
  { title: 'PicoCTF SSTI1 — Server-Side Template Injection', url: 'https://medium.com/@l4zz3rj0d/picoctf-ssdi1-server-side-template-injection-writeup-6bb27fb335f0' },
];

export default function ProofOfWork() {
  const scramblersRef = useRef<Map<HTMLElement, TextScramble>>(new Map());
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const writeupsTitleRef = useRef<HTMLHeadingElement>(null);

  const handleHover = useCallback((el: HTMLElement | null, text: string) => {
    if (!el) return;
    let scrambler = scramblersRef.current.get(el);
    if (!scrambler) {
      scrambler = new TextScramble(el);
      scramblersRef.current.set(el, scrambler);
    }
    scrambler.setText(text);
  }, []);

  return (
    <section id="proof-of-work" className="relative w-full bg-transparent py-24 border-t border-gray-900">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">Platform Stats & Writeups</span>
        <h2 
          ref={mainTitleRef}
          onMouseEnter={() => handleHover(mainTitleRef.current, 'Proof of Work')}
          className="font-display font-black text-3xl lg:text-5xl mt-2 mb-12 text-white cursor-pointer hover:text-neon transition-colors"
        >
          Proof of Work
        </h2>

        {/* TryHackMe Live Badge */}
        <div className="flex justify-center mb-28 w-full" style={{ minHeight: '200px' }}>
          <iframe 
            src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=2378461" 
            style={{ 
              border: 'none', 
              display: 'block', 
              width: '100%', 
              maxWidth: '340px', 
              height: '100px',
              transform: 'scale(1.8)', 
              transformOrigin: 'top center' 
            }} 
            loading="lazy" 
            title="TryHackMe Badge"
          />
        </div>

        {/* Labs & Continuous Learning Grid */}
        <div className="mb-20">
          <span className="font-display text-xs text-white/40 tracking-widest uppercase block mb-6">
            Labs & Continuous Learning
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LABS.map((lab, i) => (
              <div
                key={i}
                className="border border-white/10 p-5 rounded-lg hover:border-neon/30 hover:shadow-[0_0_20px_rgba(0,230,118,0.1)] transition-all flex flex-col justify-between bg-white/[0.02] backdrop-blur-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 
                      onMouseEnter={(e) => handleHover(e.currentTarget, lab.name)}
                      className="font-display font-bold text-base text-white cursor-pointer group-hover:text-neon transition-colors"
                    >
                      {lab.name}
                    </h3>
                    <span
                      className="font-display text-[9px] px-2 py-0.5 uppercase tracking-wider font-bold rounded-full"
                      style={{
                        color: lab.color,
                        border: `1px solid ${lab.borderColor}`,
                        backgroundColor: lab.bgColor
                      }}
                    >
                      {lab.status}
                    </span>
                  </div>
                  <p className="font-display text-sm text-gray-400 leading-relaxed mb-4">
                    {lab.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {lab.tags.map((t, ti) => (
                    <span key={ti} className="font-display text-[9px] text-neon/80 bg-neon/5 border border-neon/20 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Writeups & Research */}
        <div>
          <span className="font-display text-xs text-white/40 tracking-widest uppercase block mb-4">
            Writing
          </span>
          <h3 
            ref={writeupsTitleRef}
            onMouseEnter={() => handleHover(writeupsTitleRef.current, 'Writeups & Research')}
            className="font-display font-black text-2xl text-white mb-8 cursor-pointer hover:text-neon transition-colors"
          >
            Writeups &amp; Research
          </h3>

          <div className="space-y-0 mb-8">
            {WRITEUPS.map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-5 border-b border-gray-800 hover:border-hazard/50 transition-colors no-underline px-4 mt-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-[10px] text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                    <h4
                      onMouseEnter={(e) => handleHover(e.currentTarget, post.title)}
                      className="font-display font-bold text-base text-white group-hover:text-hazard transition-colors cursor-pointer"
                    >
                      {post.title}
                    </h4>
                  </div>
                </div>
                <span className="font-mono text-xs text-gray-600 group-hover:text-hazard transition-colors ml-4 p-2">
                  ↗
                </span>
              </a>
            ))}
          </div>

          <a
            href="https://medium.com/@l4zz3rj0d/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-neon hover:text-hazard transition-colors border border-neon/30 hover:border-hazard px-4 py-2 no-underline mt-2 ml-4"
          >
            All writeups on Medium
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
