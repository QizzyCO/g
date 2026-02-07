
import React, { useRef, useEffect, useState } from 'react';

interface GooeyNavProps {
  items: { label: string; id: string; icon?: React.ReactNode }[];
  activeId: string;
  onItemClick: (id: string) => void;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  activeId,
  onItemClick,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const getIndexFromId = (id: string) => items.findIndex(item => item.id === id);
  const [activeIndex, setActiveIndex] = useState(getIndexFromId(activeId));

  useEffect(() => {
    const newIndex = getIndexFromId(activeId);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [activeId, items]);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: number[], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            if (element.contains(particle)) {
              element.removeChild(particle);
            }
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles: any = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    
    // Use innerHTML to preserve icons
    textRef.current.innerHTML = element.innerHTML;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number, id: string) => {
    e.preventDefault();
    const liEl = e.currentTarget.parentElement;
    if (!liEl) return;
    
    if (activeIndex !== index) {
      setActiveIndex(index);
      onItemClick(id);
    }
    
    updateEffectPosition(liEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current?.removeChild(p));
      makeParticles(filterRef.current);
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: e.currentTarget } as any, index, id);
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi as HTMLElement);
      textRef.current?.classList.add('active');
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi as HTMLElement);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, items]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <style>{`
        :root {
          --linear-ease: linear(
            0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 
            1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 
            0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 
            0.995 68%, 1.001 85%, 1
          );
        }

        .gooey-nav-container {
          --color-1: #3b82f6; /* Blue */
          --color-2: #8b5cf6; /* Purple */
          --color-3: #10b981; /* Green */
          --color-4: #ec4899; /* Pink */
          position: relative;
        }

        .gooey-nav-container nav {
          display: flex;
          position: relative;
          transform: translate3d(0, 0, 0.01px);
        }

        .gooey-nav-container nav ul {
          display: flex;
          gap: 0.5em; /* Adjusted gap */
          list-style: none;
          padding: 0 1em;
          margin: 0;
          position: relative;
          z-index: 3;
          color: white;
          /* text-shadow: 0 1px 1px hsl(205deg 30% 10% / 0.2); */
        }

        .gooey-nav-container nav ul li {
          border-radius: 100vw;
          position: relative;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 0 0.5px 1.5px transparent;
          color: white;
          opacity: 0.8;
        }

        .gooey-nav-container nav ul li:hover {
          opacity: 1;
        }

        .gooey-nav-container nav ul li a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6em 1em;
          text-decoration: none;
          color: inherit;
          font-weight: 500;
          white-space: nowrap;
        }

        .gooey-nav-container nav ul li:focus-within:has(:focus-visible) {
          box-shadow: 0 0 0.5px 1.5px white;
        }

        .gooey-nav-container nav ul li::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: white;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
          z-index: -1;
        }

        .gooey-nav-container nav ul li.active {
          color: black;
          opacity: 1;
          /* text-shadow: none; */
        }

        .gooey-nav-container nav ul li.active::after {
          opacity: 1;
          transform: scale(1);
        }

        .gooey-nav-container .effect {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          opacity: 1;
          pointer-events: none;
          display: grid;
          place-items: center;
          z-index: 1;
        }

        .gooey-nav-container .effect.text {
          color: white;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        
        .gooey-nav-container .effect.text a {
           display: flex;
           align-items: center;
           gap: 0.5rem;
           padding: 0.6em 1em;
           text-decoration: none;
           color: inherit;
           font-weight: 500;
        }

        .gooey-nav-container .effect.text.active {
          color: black;
        }

        .gooey-nav-container .effect.filter {
          filter: blur(7px) contrast(100) blur(0);
          mix-blend-mode: lighten;
        }

        .gooey-nav-container .effect.filter::before {
          content: '';
          position: absolute;
          inset: -75px;
          z-index: -2;
          /* background: black; Removed to fix the black cube issue */
        }

        .gooey-nav-container .effect.filter::after {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          transform: scale(0);
          opacity: 0;
          z-index: -1;
          border-radius: 100vw;
        }

        .gooey-nav-container .effect.active::after {
          animation: pill 0.3s ease both;
        }

        @keyframes pill {
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .particle,
        .point {
          display: block;
          opacity: 0;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          transform-origin: center;
        }

        .particle {
          --time: 5s;
          position: absolute;
          top: calc(50% - 8px);
          left: calc(50% - 8px);
          animation: particle calc(var(--time)) ease 1 -350ms;
        }

        .point {
          background: var(--color);
          opacity: 1;
          animation: point calc(var(--time)) ease 1 -350ms;
        }

        @keyframes particle {
          0% {
            transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
            opacity: 1;
            animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
          }

          70% {
            transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
            opacity: 1;
            animation-timing-function: ease;
          }

          85% {
            transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
            opacity: 1;
          }

          100% {
            transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
            opacity: 1;
          }
        }

        @keyframes point {
          0% {
            transform: scale(0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
          }

          25% {
            transform: scale(calc(var(--scale) * 0.25));
          }

          38% {
            opacity: 1;
          }

          65% {
            transform: scale(var(--scale));
            opacity: 1;
            animation-timing-function: ease;
          }

          85% {
            transform: scale(var(--scale));
            opacity: 1;
          }

          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        
        @media (max-width: 640px) {
          .gooey-nav-container nav ul {
             padding: 0.25rem 0.5rem;
             gap: 0;
          }
          .gooey-nav-container nav ul li a {
             padding: 0.5em 0.75em;
          }
          .gooey-nav-container nav ul li a span.label {
             display: none;
          }
          .gooey-nav-container .effect.text a {
             padding: 0.5em 0.75em;
          }
          .gooey-nav-container .effect.text a span.label {
             display: none;
          }
        }
      `}</style>

      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.id} className={activeIndex === index ? 'active' : ''}>
              <a 
                href={`#${item.id}`} 
                onClick={e => handleClick(e, index, item.id)} 
                onKeyDown={e => handleKeyDown(e, index, item.id)}
              >
                {item.icon && <span className="icon">{item.icon}</span>}
                <span className="label text-sm uppercase tracking-wider mono">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Effect layers */}
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
