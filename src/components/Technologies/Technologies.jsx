import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Technologies.css';

import steamIcon from '../../assets/steam.png';
import itchIcon from '../../assets/itch.png';
import unityIcon from '../../assets/unity.png';

// Mock GSAP plugins - replace with real imports
const Observer = {
  create: (options) => {
    let isDrawing = false;
    
    const handlePointerDown = (e) => {
      if (options.onPress) options.onPress(e);
      isDrawing = true;
    };
    
    const handlePointerMove = (e) => {
      if (isDrawing && options.onDrag) options.onDrag(e);
    };
    
    const handlePointerUp = (e) => {
      if (options.onDragEnd) options.onDragEnd(e);
      if (options.onRelease) options.onRelease(e);
      isDrawing = false;
    };

    if (options.target) {
      options.target.addEventListener('pointerdown', handlePointerDown);
      options.target.addEventListener('pointermove', handlePointerMove);
      options.target.addEventListener('pointerup', handlePointerUp);
      options.target.addEventListener('pointerleave', handlePointerUp);
    }

    return {
      kill: () => {
        if (options.target) {
          options.target.removeEventListener('pointerdown', handlePointerDown);
          options.target.removeEventListener('pointermove', handlePointerMove);
          options.target.removeEventListener('pointerup', handlePointerUp);
          options.target.removeEventListener('pointerleave', handlePointerUp);
        }
      }
    };
  }
};

const CustomWiggle = {
  create: () => "back.out(1.7)"
};

const Technologies = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const proxyRef = useRef(null);
  const handRef = useRef(null);
  const instructionsRef = useRef(null);
  const dragRef = useRef(null);
  const rockRef = useRef(null);
  const handleRef = useRef(null);

  // Tech images data
  const techImages = [
  { key: "react", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { key: "js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { key: "ts", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { key: "node", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { key: "python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { key: "csharp", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { key: "dotnet", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
  { key: "css", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { key: "html", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { key: "git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { key: "mongodb", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { key: "figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { key: "unity", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  { key: "docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { key: "mysql", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { key: "postgresql", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { key: "nextjs", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { key: "vscode", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { key: "unity", src: unityIcon }
  ];

  const explosionImages = [
{ key: "react", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { key: "js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { key: "ts", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { key: "node", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { key: "python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { key: "csharp", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { key: "dotnet", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
  { key: "css", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { key: "html", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { key: "git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { key: "mongodb", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { key: "figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { key: "unity", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  { key: "docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { key: "mysql", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { key: "postgresql", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { key: "tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { key: "express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { key: "nextjs", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { key: "vscode", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
  ];

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const proxy = proxyRef.current;
    const hand = handRef.current;
    const instructions = instructionsRef.current;
    const drag = dragRef.current;
    const rock = rockRef.current;
    const handle = handleRef.current;

    if (!hero || !canvas || !proxy || !hand) return;

    let isDrawing = false;
    let currentLine = null;
    let startImage = null;
    let circle = null;
    let startX = 0;
    let startY = 0;
    let lastDistance = 0;

    const imageMap = {};
    const imageKeys = [];
    techImages.forEach(img => {
      imageMap[img.key] = { src: img.src };
      imageKeys.push(img.key);
    });

    const explosionMap = {};
    const explosionKeys = [];
    explosionImages.forEach(img => {
      explosionMap[img.key] = { src: img.src };
      explosionKeys.push(img.key);
    });

    const clamper = gsap.utils.clamp(1, 100);
    const xSetter = gsap.quickTo(hand, "x", { duration: 0.1 });
    const ySetter = gsap.quickTo(hand, "y", { duration: 0.1 });

    gsap.set(hand, { xPercent: -50, yPercent: -50 });

    // Mouse events
    hero.style.cursor = "none";

    hero.addEventListener("mouseenter", (e) => {
      gsap.set(hand, { opacity: 1 });
      xSetter(e.clientX);
      ySetter(e.clientY);
    });

    hero.addEventListener("mouseleave", () => {
      gsap.set(hand, { opacity: 0 });
    });

    hero.addEventListener("mousemove", (e) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    });

    const createExplosion = (x, y, distance = 100) => {
      const count = Math.round(gsap.utils.clamp(3, 100, distance / 20));
      const explosion = gsap.timeline();
      const speed = gsap.utils.mapRange(0, 500, 0.3, 1.5, distance);
      const sizeRange = gsap.utils.mapRange(0, 500, 20, 60, distance);

      for (let i = 0; i < count; i++) {
        const randomKey = gsap.utils.random(explosionKeys);
        const original = explosionMap[randomKey];
        
        const img = document.createElement('img');
        img.className = "explosion-img";
        img.src = original.src;
        img.style.position = "absolute";
        img.style.pointerEvents = "none";
        img.style.height = `${gsap.utils.random(20, sizeRange)}px`;
        img.style.width = `${gsap.utils.random(20, sizeRange)}px`;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.zIndex = 4;

        hero.appendChild(img);

        const angle = Math.random() * Math.PI * 2;
        const velocity = gsap.utils.random(500, 1500) * speed;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        explosion
          .to(img, {
            x: vx / 5,
            y: vy / 5,
            rotation: gsap.utils.random(-180, 180),
            duration: 1 + Math.random(),
            ease: "power2.out"
          }, 0)
          .to(img, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => img.remove()
          }, 0.8);
      }

      return explosion;
    };

    const startDrawing = (e) => {
      isDrawing = true;
      gsap.set(instructions, { opacity: 0 });

      startX = e.clientX;
      startY = e.clientY + window.scrollY;

      // Create SVG line
      currentLine = document.createElementNS("http://www.w3.org/2000/svg2", "line");
      currentLine.setAttribute("x1", startX);
      currentLine.setAttribute("y1", startY);
      currentLine.setAttribute("x2", startX);
      currentLine.setAttribute("y2", startY);
      currentLine.setAttribute("stroke", "#00f5ff");
      currentLine.setAttribute("stroke-width", "2");
      currentLine.setAttribute("stroke-dasharray", "4");

      circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", startX);
      circle.setAttribute("cy", startY);
      circle.setAttribute("r", "30");
      circle.setAttribute("fill", "#0e100f");

      // Create tech image at start point
      const randomKey = gsap.utils.random(imageKeys);
      const original = imageMap[randomKey];
      const clone = document.createElementNS("http://www.w3.org/2000/svg", "image");

      clone.setAttribute("x", startX - 25);
      clone.setAttribute("y", startY - 25);
      clone.setAttribute("width", "50");
      clone.setAttribute("height", "50");
      clone.setAttributeNS("http://www.w3.org/1999/xlink", "href", original.src);

      startImage = clone;

      canvas.appendChild(currentLine);
      canvas.appendChild(circle);
      canvas.appendChild(startImage);

      gsap.set(drag, { opacity: 1 });
      gsap.set(handle, { opacity: 1 });
      gsap.set(rock, { opacity: 0 });
    };

    const updateDrawing = (e) => {
      if (!currentLine || !startImage) return;

      const cursorX = e.clientX;
      const cursorY = e.clientY + window.scrollY;
      const dx = cursorX - startX;
      const dy = cursorY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      let x2, y2;
      if (distance > 30) {
        const shrink = (distance - 30) / distance;
        x2 = startX + dx * shrink;
        y2 = startY + dy * shrink;
      } else {
        x2 = startX;
        y2 = startY;
      }

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      gsap.to(currentLine, {
        attr: { x2, y2 },
        duration: 0.1,
        ease: "none"
      });

      // Scale based on distance
      const raw = distance / 100;
      const eased = Math.pow(raw, 0.5);
      const clamped = clamper(eased);

      gsap.set([startImage, circle], {
        scale: clamped,
        rotation: `${angle - 45}_short`,
        transformOrigin: "center center"
      });

      // Rotate hand
      gsap.to(hand, {
        rotation: `${angle - 90}_short`,
        duration: 0.1,
        ease: "none"
      });

      lastDistance = distance;
    };

    const clearDrawing = (e) => {
      if (!isDrawing) return;
      
      createExplosion(startX, startY, lastDistance);

      gsap.set(drag, { opacity: 0 });
      gsap.set(handle, { opacity: 0 });
      gsap.set(rock, { opacity: 1 });

      gsap.to(rock, {
        duration: 0.4,
        rotation: "+=30",
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.set(rock, { opacity: 0 });
          gsap.set(hand, { rotation: 0, overwrite: "auto" });
          gsap.to(instructions, { opacity: 1 });
          gsap.set(drag, { opacity: 1 });
        }
      });

      isDrawing = false;
      canvas.innerHTML = "";
      currentLine = null;
      startImage = null;
    };

    // Observer setup
    const observer = Observer.create({
      target: proxy,
      type: "pointer",
      onPress: startDrawing,
      onDrag: (e) => isDrawing && updateDrawing(e),
      onDragEnd: clearDrawing,
      onRelease: clearDrawing
    });

    // Auto explosion on load
    gsap.delayedCall(1, () => {
      createExplosion(window.innerWidth / 2, window.innerHeight / 2, 600);
    });

    return () => {
      observer.kill();
    };
  }, []);

return (
  <div className="technologies-container" ref={heroRef}>
    <div className="tech-content">
      <p className="tech-instruction">What I use</p>
    </div>

    {/* Hand cursor */}
    <div className="tech-hand" ref={handRef}>
      <img className="tech-drag" ref={dragRef} src="https://assets.codepen.io/16327/hand-drag.png" alt="" />
      <img className="tech-rock" ref={rockRef} src="https://assets.codepen.io/16327/hand-rock.png" alt="" />
      <img className="tech-handle" ref={handleRef} src="https://assets.codepen.io/16327/2D-circle.png" alt="" />
      <small ref={instructionsRef}>drag me</small>
    </div>

    {/* Technology Icons Grid */}
    <div className="tech-icons-grid">
      <div className="tech-icons-container">
        {techImages.map((tech, index) => (
          <img
            key={tech.key}
            src={tech.src}
            alt={tech.key}
            className="tech-icon"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>

    <svg className="tech-canvas" ref={canvasRef}></svg>
    <div className="tech-proxy" ref={proxyRef}></div>
  </div>
);
};

export default Technologies;