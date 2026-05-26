import { useCallback, useRef } from 'react';
import { TextScramble } from '../hooks/useTextScramble';

const WRITEUPS = [
  { title: 'Pluck CMS 4.7.16 — Remote Code Execution Exploit', url: 'https://medium.com/@l4zz3rj0d/pluck-cms-4-7-16-exploit-walkthrough-999df429c306' },
  { title: 'Mustacchio — TryHackMe XXE Walkthrough', url: 'https://medium.com/@l4zz3rj0d/summary-15e9cd1b387f' },
  { title: 'PicoCTF SSTI1 — Server-Side Template Injection', url: 'https://medium.com/@l4zz3rj0d/picoctf-ssdi1-server-side-template-injection-writeup-6bb27fb335f0' },
];

export default function Blog() {
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const handleHover = useCallback((index: number) => {
    const el = titleRefs.current[index];
    if (!el) return;
    const original = el.dataset.text || '';
    const scrambler = new TextScramble(el);
    scrambler.setText(original);
  }, []);

  return (
    <section className="relative w-full bg-void py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">Writing</span>
        <h2 className="font-display font-black text-3xl lg:text-5xl mt-2 mb-12" style={{ color: 'var(--terminal-text)' }}>
          Writeups &amp; Research
        </h2>

        <div className="space-y-0 mb-8">
          {WRITEUPS.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 border-b border-gray-800 hover:border-hazard/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-[10px] text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                  <h3
                    ref={(el) => { titleRefs.current[i] = el; }}
                    data-text={post.title}
                    onMouseEnter={() => handleHover(i)}
                    className="font-display font-bold text-base text-white group-hover:text-hazard transition-colors"
                  >
                    {post.title}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-xs text-gray-600 group-hover:text-hazard transition-colors ml-4">
                ↗
              </span>
            </a>
          ))}
        </div>

        <a
          href="https://medium.com/@l4zz3rj0d/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs text-neon hover:text-hazard transition-colors border border-neon/30 hover:border-hazard px-4 py-2"
        >
          All writeups on Medium
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
