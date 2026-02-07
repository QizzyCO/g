
import React, { useEffect, useRef } from 'react';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles to prevent duplication
    container.innerHTML = '';
    
    const particleCount = 100; 
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const span = document.createElement("span");
      span.classList.add("particle-goo");

      const size = 3 + Math.random() * 6; 
      const distance = 10 + Math.random() * 15; 
      const position = Math.random() * 100;
      const time = 3 + Math.random() * 3;
      const delay = -1 * (Math.random() * 10);

      span.style.setProperty("--dim", `${size}rem`);
      span.style.setProperty("--uplift", `${distance}rem`);
      span.style.setProperty("--pos-x", `${position}%`);
      span.style.setProperty("--dur", `${time}s`);
      span.style.setProperty("--delay", `${delay}s`);

      fragment.appendChild(span);
    }

    container.appendChild(fragment);
  }, []);

  return (
    <div className="w-full relative">
      <style>{`
        .footer-section-goo {
            position: relative;
            background: #4CD9B0; /* The exact mint color from the reference */
            min-height: 250px; 
            padding-bottom: 2rem;
            margin-top: 15rem; 
            width: 100%;
            font-family: 'Inter', sans-serif;
            z-index: 50;
        }

        .gooey-animations-container {
            position: absolute;
            top: 0;
            width: 120%;
            left: -10%;
            height: 6rem; 
            background: #4CD9B0;
            transform: translateY(-99%); 
            z-index: 0;
            filter: url('#liquid-effect-footer');
            overflow: visible; 
            pointer-events: none;
        }

        .particle-goo {
            position: absolute;
            background: #4CD9B0;
            border-radius: 50%;
            top: 50%;
            left: var(--pos-x, 50%);
            width: var(--dim, 5rem);
            height: var(--dim, 5rem);
            transform: translate(-50%, -50%);
            animation: float-up-goo var(--dur, 4s) ease-in infinite;
            animation-delay: var(--delay, 0s);
        }

        .footer-content-goo {
            position: relative;
            z-index: 2;
            max-width: 1000px;
            margin: 0 auto;
            padding: 4rem 2rem; 
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            text-align: center;
        }

        .footer-column-goo {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .footer-column-goo h4 {
            color: #2E2E2E; /* Text color from reference */
            margin: 0;
            font-size: 1.1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .footer-column-goo a {
            color: #2E2E2E;
            opacity: 0.8;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 400;
            transition: opacity 0.3s, transform 0.3s;
        }

        .footer-column-goo a:hover {
            opacity: 1;
            transform: translateY(-3px);
            font-weight: 600;
        }

        @keyframes float-up-goo {
            0% {
                top: 50%;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                top: calc(var(--uplift) * -1); 
                transform: translate(-50%, -50%) scale(0);
            }
        }

        @media (max-width: 600px) {
            .footer-content-goo { text-align: center; }
        }
      `}</style>

      <footer className="footer-section-goo">
        <div className="gooey-animations-container" ref={containerRef}></div>

        <div className="footer-content-goo">
            <div className="footer-column-goo">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Brand</a>
            </div>
            <div className="footer-column-goo">
                <h4>Resources</h4>
                <a href="#">Help Center</a>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </div>
            <div className="footer-column-goo">
                <h4>Social</h4>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
            </div>
        </div>
      </footer>

      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="liquid-effect-footer">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="
                    1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 19 -9" result="liquid" />
            </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Footer;
