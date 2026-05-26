import { useCallback, useRef } from 'react';

export class TextScramble {
  el: HTMLElement;
  chars: string;
  queue: { from: string; to: string; start: number; end: number; char?: string }[];
  frame: number;
  frameRequest: number | null;
  isResolving: boolean;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.queue = [];
    this.frame = 0;
    this.frameRequest = null;
    this.isResolving = false;
  }

  setText(newText: string): Promise<string> {
    return new Promise((resolve) => {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      
      if (this.frameRequest) {
        cancelAnimationFrame(this.frameRequest);
      }
      this.frame = 0;
      this.isResolving = true;
      this.update(resolve, newText);
    });
  }

  update(resolve: (text: string) => void, finalText: string) {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color: var(--hazard-orange)">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.el.style.color = 'var(--terminal-text)';
      this.isResolving = false;
      resolve(finalText);
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(() => this.update(resolve, finalText));
    }
  }

  destroy() {
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }
}

export function useTextScramble() {
  const instanceRef = useRef<TextScramble | null>(null);

  const scramble = useCallback((el: HTMLElement, newText: string) => {
    if (instanceRef.current) {
      instanceRef.current.destroy();
    }
    instanceRef.current = new TextScramble(el);
    return instanceRef.current.setText(newText);
  }, []);

  return scramble;
}
