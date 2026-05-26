import { useCallback, useRef } from 'react';
import { TextScramble } from '../hooks/useTextScramble';

const PROJECTS = [
  {
    repo: 'project-hellhound/spider',
    title: 'Hellhound Spider',
    desc: 'Async web crawler for security testing — maps endpoints, parameters, and security issues across traditional and SPA web applications. Standalone CLI tool with headless browser support.',
    hash: 'sp1d3r_x',
    tag: 'ACTIVE',
    date: '2026-05-12',
    type: 'CORE MODULE',
    link: 'https://github.com/project-hellhound-org/spider'
  },
  {
    repo: 'project-hellhound/pentest',
    title: 'Hellhound Framework',
    desc: 'Hellhound is a high-fidelity security framework engineered for professional web application assessments. Engineered for speed and surgical precision, it features an intelligent AI core enabling automated attack-chain correlation, context-aware verification, and a robust arsenal of modular security auditors. Acting like a surgical robot with an AI brain, Hellhound doesn\'t just detect—it understands the logic of the application to find hidden flaws that standard tools miss, providing a unified console to manage your entire offensive pipeline.',
    hash: 'h0und_fx',
    tag: 'IN DEV',
    date: '2026-05-13',
    type: 'INTELLIGENCE ENGINE',
    link: 'https://github.com/project-hellhound-org/pentest'
  },
  {
    repo: 'project-hellhound/cmdmap',
    title: 'CMDmap',
    desc: 'CMDmap is a high-fidelity, autonomous command injection detector built for modern web targets. It pairs a SPA-aware crawler with a 5-tier injection engine that auto-escalates from direct output tests through timing-based blind detection to OOB callbacks — stopping only when execution is confirmed or all vectors are exhausted.\n\nEvery finding is verified, timestamped, and delivered with a ready-to-run curl PoC.',
    hash: 'cmd_m4p',
    tag: 'ACTIVE',
    date: '2026-05-20',
    type: 'DETECTOR UTILITY',
    link: 'https://github.com/project-hellhound-org/cmdmap'
  },
  {
    repo: 'project-hellhound/joe',
    title: 'Joe-Goldberg',
    desc: 'Joe Goldberg is an OSINT investigation tool named after the obsessive, detail-oriented character from the series YOU. Just like Joe, this tool notices everything — it gathers publicly available information about a target, connects the dots, and narrates findings in his voice.\n\nBuilt for penetration testers, bug bounty hunters, CTF players, and security researchers. No API keys for recon. No subscriptions. No data leaving your machine.',
    hash: 'j0e_g0ld',
    tag: 'IN DEV',
    date: '2026-05-08',
    type: 'RECON MODULE',
    link: 'https://github.com/project-hellhound-org/joe'
  },
];

export default function LabsMatrix() {
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

  return (
    <section id="projects" className="relative w-full bg-transparent py-24 border-t border-gray-900">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">Autonomous Tools</span>
        <h2 
          ref={mainTitleRef}
          onMouseEnter={() => handleHover(mainTitleRef.current, 'Cybersecurity Projects')}
          className="font-display font-black text-3xl lg:text-5xl mt-2 mb-12 text-white cursor-pointer hover:text-neon transition-colors"
        >
          Cybersecurity Projects
        </h2>

        {/* Git Log Terminal View */}
        <div className="border border-gray-800 bg-black/60 backdrop-blur-md rounded-md overflow-hidden">
          {/* Header console bar */}
          <div className="flex items-center justify-between border-b border-gray-900 bg-black/80 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-[10px] text-gray-500 font-bold tracking-wider">
              git_log_projects.sh
            </span>
          </div>

          <div className="p-6 font-mono text-xs space-y-12">
            {PROJECTS.map((item, i) => (
              <div key={i} className="relative pl-6 md:pl-10 border-l border-gray-800 hover:border-neon/30 transition-colors">
                {/* Timeline node */}
                <span className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-neon pulse-dot border border-black" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-neon font-bold text-sm">commit {item.hash}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-400 font-semibold text-sm">{item.repo}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>

                <h3
                  onMouseEnter={(e) => handleHover(e.currentTarget, item.title)}
                  className="font-display font-bold text-xl md:text-2xl text-white mb-4 cursor-pointer hover:text-neon transition-colors"
                >
                  {item.title}
                </h3>

                <div className="text-gray-400 leading-relaxed mb-6 text-base md:text-lg whitespace-pre-wrap">
                  {item.desc}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className="text-[10px] px-3 py-1 uppercase tracking-wider font-bold"
                    style={{
                      color: item.tag === 'ACTIVE' ? 'var(--neon-green)' : 'var(--hazard-orange)',
                      border: item.tag === 'ACTIVE' ? '1px solid rgba(0,230,118,0.3)' : '1px solid rgba(255,61,0,0.3)',
                      backgroundColor: item.tag === 'ACTIVE' ? 'rgba(0,230,118,0.05)' : 'rgba(255,61,0,0.05)'
                    }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-500">TYPE: {item.type}</span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-hazard hover:text-neon no-underline transition-colors ml-auto px-3 py-1"
                  >
                    View Source Repository ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
