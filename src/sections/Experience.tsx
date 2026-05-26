import { useCallback, useRef, useEffect } from 'react';
import { TextScramble } from '../hooks/useTextScramble';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    date: 'DEC 2025 — PRESENT · REMOTE',
    org: 'CyArt',
    role: 'VAPT Intern — CyTrack Platform',
    points: [
      'Contributing across multiple agent layers in CyTrack — a multi-agent autonomous web pentesting platform',
      'Building production-grade Python agents, each targeting a different class of web vulnerabilities',
      'Modules running in production and actively tested on real targets',
    ],
  },
  {
    date: 'SEP 2025 — NOV 2025 · REMOTE',
    org: 'Cyber Secured India',
    role: 'Hardware Hacking Intern',
    points: [
      'Learned about deauthentication attacks and Evil Twin AP setups using ESP32 and ESP8266',
      'Studied IoT device attack surfaces and wireless network vulnerability concepts',
      'Gained foundational understanding of hardware-based attack methodologies',
    ],
  },
  {
    date: 'APR 2025 — JUN 2025 · REMOTE',
    org: 'Cyber Secured India',
    role: 'Cybersecurity & Digital Forensic Intern',
    points: [
      'Learned web application security and digital forensics concepts through structured training',
      'Completed 10+ PortSwigger Web Security Academy labs covering SQLi, Broken Auth, 2FA bypass, and enumeration',
      'Exploited a VulnHub machine — Pluck CMS 4.7.16 RCE — and published a full technical writeup on Medium',
      'Studied Android application security using DIVA',
    ],
  },
  {
    date: 'JAN 2025 · PONDICHERRY',
    org: 'Pondicherry Cyber Crime Department',
    role: 'Cybersecurity Intern',
    points: [
      'Gained hands-on understanding of how cybercrime investigations are conducted in a real government department',
      'Observed digital evidence handling, case analysis workflows, and law enforcement cybersecurity protocols',
      'Built a Raspberry Pi Pico Rubber Ducky — a functional HID keystroke injection device for penetration testing research',
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'Jr. Penetration Tester', issuer: 'TRYHACKME', link: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-O59FSUN5EB.pdf' },
  { name: 'Web Application Pentesting', issuer: 'TRYHACKME', link: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-OYCBQIXUDM.pdf' },
  { name: 'Hands-on Pentesting with Metasploit', issuer: 'INFOSYS SPRINGBOARD', link: 'https://drive.google.com/file/d/1vTxTJONank6EKcmtlcUHGMt2x5A4WreI' },
  { name: 'CCEP — Certified Cybersecurity Educator Professional', issuer: 'RED TEAM LEADERS', link: 'https://drive.google.com/file/d/1KMDAmhTNo8vxImXOY7HgVvcG8qAGA4_F' },
  { name: 'Cisco Ethical Hacker', issuer: 'CISCO', link: 'https://drive.google.com/file/d/17AeBj7gnI9NYn1ks2VJdGeIW1MsOBcYi' },
];

const EDUCATION = [
  { institution: 'Mahendra Engineering College', degree: 'BE — Cyber Security', duration: '2022 – Present', location: 'Namakkal', score: '8.31 / 10 CGPA' },
  { institution: 'SVN Matric Higher Secondary School', degree: 'HSC — Computer Science', duration: '2021 – 2022', location: 'Erode', score: '88.7%' },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scramblersRef = useRef<Map<HTMLElement, TextScramble>>(new Map());
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const eduTitleRef = useRef<HTMLSpanElement>(null);
  const certTitleRef = useRef<HTMLSpanElement>(null);

  const handleHover = useCallback((el: HTMLElement | null, text: string) => {
    if (!el) return;
    let scrambler = scramblersRef.current.get(el);
    if (!scrambler) {
      scrambler = new TextScramble(el);
      scramblersRef.current.set(el, scrambler);
    }
    scrambler.setText(text);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Timeline line growth animation
      gsap.fromTo(
        '.timeline-progress-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: true,
          },
        }
      );

      // Fade-in and shift timeline cards
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  let globalIdx = 0;

  return (
    <section ref={sectionRef} id="experience" className="relative w-full bg-transparent py-24 border-t border-gray-900">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <span className="font-display text-xs text-white/40 tracking-widest uppercase">Experience</span>
        <h2 
          ref={mainTitleRef}
          onMouseEnter={() => handleHover(mainTitleRef.current, 'Where I\'ve Worked')}
          className="font-display font-black text-3xl lg:text-5xl mt-2 mb-16 cursor-pointer hover:text-neon transition-colors" 
          style={{ color: 'var(--terminal-text)' }}
        >
          Where I&apos;ve Worked
        </h2>

        {/* Timeline */}
        <div className="timeline-container relative space-y-12 mb-20 pl-0">
          {/* Base track line */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gray-800/60" />
          
          {/* Active progress tracker line */}
          <div
            className="timeline-progress-line absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-neon to-hazard origin-top"
            style={{ transformOrigin: 'top' }}
          />

          {EXPERIENCE.map((exp, i) => {
            const idx = globalIdx++;
            return (
              <div key={i} className="timeline-item relative pl-8 hover:border-hazard/50 transition-colors">
                {/* Dot */}
                <div className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-hazard border border-black shadow-[0_0_8px_rgba(255,61,0,0.6)]" />

                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  {exp.date}
                </div>
                <h3
                  onMouseEnter={(e) => handleHover(e.currentTarget, exp.org)}
                  className="font-display font-bold text-xl text-white cursor-pointer hover:text-neon transition-colors mb-1"
                >
                  {exp.org}
                </h3>
                <div className="font-mono text-xs text-neon mb-3">{exp.role}</div>
                <ul className="space-y-1.5">
                  {exp.points.map((pt, pi) => (
                    <li key={pi} className="font-mono text-sm text-gray-400 leading-relaxed flex items-start gap-2">
                      <span className="text-hazard mt-1">›</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <span 
          ref={eduTitleRef}
          onMouseEnter={() => handleHover(eduTitleRef.current, 'Education')}
          className="font-display text-xs text-white/40 tracking-widest uppercase cursor-pointer hover:text-neon transition-colors block mt-8"
        >
          Education
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-16">
          {EDUCATION.map((edu, i) => {
            const idx = globalIdx++;
            return (
              <div key={i} className="border border-gray-800 p-5 hover:border-neon/30 transition-colors">
                <h3 
                  onMouseEnter={(e) => handleHover(e.currentTarget, edu.institution)}
                  className="font-display font-bold text-lg text-white cursor-pointer hover:text-neon transition-colors"
                >
                  {edu.institution}
                </h3>
                <p className="font-mono text-xs text-neon mt-1">{edu.degree}</p>
                <div className="flex items-center justify-between mt-3 font-mono text-[10px] text-gray-500">
                  <span>{edu.duration} · {edu.location}</span>
                  <span className="text-hazard">{edu.score}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <span 
          ref={certTitleRef}
          onMouseEnter={() => handleHover(certTitleRef.current, 'Certifications')}
          className="font-display text-xs text-white/40 tracking-widest uppercase cursor-pointer hover:text-neon transition-colors block"
        >
          Certifications
        </span>
        <div className="mt-4 space-y-0">
          {CERTIFICATIONS.map((cert, i) => {
            const idx = globalIdx++;
            return (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-4 border-b border-gray-800 hover:border-hazard/50 transition-colors"
              >
                <div>
                  <h3
                    onMouseEnter={(e) => handleHover(e.currentTarget, cert.name)}
                    className="font-display font-bold text-sm text-white group-hover:text-hazard transition-colors cursor-pointer"
                  >
                    {cert.name}
                  </h3>
                  <span className="font-mono text-[10px] text-gray-500 mt-1 block">
                    {cert.issuer} · VERIFIED
                  </span>
                </div>
                <span className="font-mono text-xs text-gray-600 group-hover:text-hazard transition-colors">
                  ↗
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
