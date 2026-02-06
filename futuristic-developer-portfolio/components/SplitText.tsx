
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: React.ElementType;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  rootMargin = '-50px',
  textAlign = 'left',
  tag: Tag = 'span'
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') setFontsLoaded(true);
    else document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  const parts = useMemo(() => {
    if (splitType === 'words') {
      return text.split(' ').map((word, i) => ({
        content: word + (i === text.split(' ').length - 1 ? '' : '\u00A0'),
        id: i
      }));
    }
    return text.split('').map((char, i) => ({
      content: char === ' ' ? '\u00A0' : char,
      id: i
    }));
  }, [text, splitType]);

  useGSAP(() => {
    if (!containerRef.current || !fontsLoaded) return;
    const elements = containerRef.current.querySelectorAll('.split-item');
    
    gsap.fromTo(elements, from, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top bottom${rootMargin}`,
        once: true,
      },
    });
  }, { dependencies: [fontsLoaded, parts], scope: containerRef });

  return (
    <Tag ref={containerRef} className={`inline-block ${className}`} style={{ textAlign }}>
      {parts.map((part) => (
        <span key={part.id} className="split-item inline-block">
          {part.content}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
