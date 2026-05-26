import { useCallback, useRef } from 'react';
import { TextScramble } from '../hooks/useTextScramble';

const CONTRIBUTIONS = [
  {
    repo: 'project-hellhound/x5sentry',
    title: 'Autonomous XSS Hunter & Exploit Builder',
    desc: 'Contributed advanced scanning mechanics for X5Sentry including DOM, mXSS, uXSS, and blind XSS detection payloads, powered by headless browser playwright injection.',
    hash: 'x553ntry',
    tag: 'CONTRIBUTED',
    date: '2026-05-15',
    type: 'SECURITY MODULE',
    link: 'https://github.com/project-hellhound-org/x5sentry'
  },
  {
    repo: 'cyart/cytrack',
    title: 'Multi-Agent Autonomous Web Pentesting Platform',
    desc: 'Authored the multi-agent orchestration layer to coordinate independent offensive scanners targeting complex web application routing and access structures.',
    hash: 'cy7r4ck0',
    tag: 'MERGED',
    date: '2026-05-10',
    type: 'INTERNAL PROJECT',
    link: null
  },
];

export default function Contributions() {
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
    <section id="contributions" className="relative w-full bg-transparent py-24 border-t border-gray-900">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">Code Collaborations & Forks</span>
        <h2 
          ref={mainTitleRef}
          onMouseEnter={() => handleHover(mainTitleRef.current, 'Open Source Contributions')}
          className="font-display font-black text-3xl lg:text-5xl mt-2 mb-12 text-white cursor-pointer hover:text-neon transition-colors"
        >
          Open Source Contributions
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
              git_log_vapt.sh
            </span>
          </div>

          <div className="p-6 font-mono text-xs space-y-8">
            {CONTRIBUTIONS.map((item, i) => (
              <div key={i} className="relative pl-6 md:pl-8 border-l border-gray-800 hover:border-neon/30 transition-colors">
                {/* Timeline node */}
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-hazard pulse-dot border border-black" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-neon font-bold">commit {item.hash}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-400 font-semibold">{item.repo}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{item.date}</span>
                </div>

                <h3
                  onMouseEnter={(e) => handleHover(e.currentTarget, item.title)}
                  className="font-display font-bold text-lg text-white mb-2 cursor-pointer hover:text-neon transition-colors"
                >
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
                  {item.desc}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className="text-[9px] px-2 py-0.5 uppercase tracking-wider font-bold"
                    style={{
                      color: 'var(--neon-green)',
                      border: '1px solid rgba(0,230,118,0.3)',
                      backgroundColor: 'rgba(0,230,118,0.05)'
                    }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-gray-500">TYPE: {item.type}</span>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-hazard hover:text-neon no-underline transition-colors ml-auto px-3 py-1"
                    >
                      View Source Repository ↗
                    </a>
                  ) : (
                    <span className="text-[10px] text-gray-500 ml-auto px-3 py-1 italic">
                      Private Internal Repository
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
