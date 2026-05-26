import { useRef, useEffect } from 'react';
import { TextScramble } from '../hooks/useTextScramble';
import { Github, Linkedin, PenTool, Shield, Mail } from 'lucide-react';

const SOCIALS = [
  { name: 'Email', handle: 'ssreedanush@gmail.com', url: 'mailto:ssreedanush@gmail.com', Icon: Mail },
  { name: 'GitHub', handle: '@l4zz3rj0d', url: 'https://github.com/l4zz3rj0d', Icon: Github },
  { name: 'GitHub Org', handle: '@project-hellhound-org', url: 'https://github.com/project-hellhound-org', Icon: Github },
  { name: 'LinkedIn', handle: '@ssreedanush', url: 'https://www.linkedin.com/in/ssreedanush/', Icon: Linkedin },
  { name: 'Medium', handle: '@l4zz3rj0d', url: 'https://medium.com/@l4zz3rj0d', Icon: PenTool },
  { name: 'TryHackMe', handle: 'L4ZZ3RJ0D', url: 'https://tryhackme.com/p/L4ZZ3RJ0D', Icon: Shield },
];

export default function Footer() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scramblerRef = useRef<TextScramble | null>(null);

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    const setColoredName = (isLetsTalk: boolean) => {
      if (!titleRef.current) return;
      if (isLetsTalk) {
        titleRef.current.innerHTML = '<span class="text-hazard">Let\'s</span> <span class="text-white">Talk</span>';
      } else {
        titleRef.current.innerHTML = '<span class="text-white">Get in</span> <span class="text-hazard">Touch</span>';
      }
    };

    const runGlitchSequence = async () => {
      if (!titleRef.current) return;
      if (!scramblerRef.current) {
        scramblerRef.current = new TextScramble(titleRef.current);
      }
      
      setColoredName(true);

      timeout1 = setTimeout(async () => {
        if (!scramblerRef.current) return;
        await scramblerRef.current.setText('Get in Touch');
        setColoredName(false);
        
        timeout2 = setTimeout(async () => {
          if (!scramblerRef.current) return;
          await scramblerRef.current.setText('Let\'s Talk');
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
    <footer id="contact" className="relative w-full bg-transparent py-24 border-t border-gray-900">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">Contact</span>

        <div className="mt-8 items-start">
          <div>
            <h2 ref={titleRef} className="font-display font-black text-4xl lg:text-6xl mb-12">
              Let&apos;s Talk
            </h2>

            {/* Social links */}
            <div className="flex flex-wrap gap-4">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg hover:border-hazard hover:bg-hazard/10 hover:shadow-[0_0_20px_rgba(255,61,0,0.4)] hover:-translate-y-1 transition-all duration-300 no-underline"
                >
                  <s.Icon className="w-4 h-4 text-gray-400 group-hover:text-hazard transition-colors drop-shadow-md" />
                  <div className="flex flex-col">
                    <span className="font-display text-xs text-white font-bold">{s.name}</span>
                    <span className="font-mono text-[10px] text-gray-500 group-hover:text-white/80">{s.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-gray-600 text-center md:text-left">
            Sree Danush S · Offensive Security Engineer · Continuously learning. Continuously building.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon pulse-dot" />
            <span className="font-mono text-[10px] text-gray-500">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
