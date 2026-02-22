import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Matter from "matter-js";
import "./Contact.css";

const TAGS = [
  { text: "From meh to wow!", theme: "dark" as const },
  { text: "No Editor? No Problem", theme: "orange" as const },
  { text: "Watch Time Wins", theme: "dark" as const },
  { text: "Low Views? Fixed", theme: "dark" as const },
  { text: "Conversion Boost", theme: "orange" as const },
  { text: "Viral Edits", theme: "light" as const },
  { text: "Retention Hacking", theme: "dark" as const },
  { text: "Sound Design", theme: "dark" as const },
  { text: "Color Grading", theme: "dark" as const },
  { text: "Storytelling", theme: "orange" as const },
  { text: "4K Delivery", theme: "light" as const },
  { text: "Thumbnail Design", theme: "dark" as const },
  { text: "Fast Turnaround", theme: "dark" as const },
];

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let runner: Matter.Runner;
    let engine: Matter.Engine;
    let raf: number;
    let resizeHandler: () => void;

    const initTimeout = setTimeout(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const { clientWidth: width, clientHeight: height } = container;

      console.log(`Matter.js: Initializing in ${width}x${height} container`);
      if (width === 0 || height === 0) return;

      // 1. Initialize Matter.js
      engine = Matter.Engine.create({
        gravity: { x: 0, y: 1, scale: 0.001 }
      });
      const world = engine.world;

      // 2. Create Boundaries
      const wallOptions = { isStatic: true, restitution: 0.2, friction: 0.1 };
      const thickness = 100;

      const ground = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 10, thickness, wallOptions);
      const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 10, wallOptions);
      const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 10, wallOptions);

      Matter.Composite.add(world, [ground, leftWall, rightWall]);

      // 3. Create Tags
      const bodies: Matter.Body[] = [];
      TAGS.forEach((tag, i) => {
        const el = tagsRef.current[i];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        let bW = rect.width || el.offsetWidth || 100;
        let bH = rect.height || el.offsetHeight || 40;

        const x = Math.random() * (width - bW) + bW / 2;
        const y = -100 - (i * 50);

        const body = Matter.Bodies.rectangle(x, y, bW, bH, {
          restitution: 0.3,
          friction: 0.05,
          frictionAir: 0.02,
          chamfer: { radius: 8 },
        });

        (body as any).renderWidth = bW;
        (body as any).renderHeight = bH;
        (body as any).element = el;
        bodies.push(body);
      });

      Matter.Composite.add(world, bodies);

      // 4. Mouse Interaction
      const mouse = Matter.Mouse.create(container);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
      });
      Matter.Composite.add(world, mouseConstraint);

      // 5. Update Loop
      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const update = () => {
        bodies.forEach(body => {
          const el = (body as any).element;
          if (el) {
            const { x, y } = body.position;
            const angle = body.angle;
            const rw = (body as any).renderWidth;
            const rh = (body as any).renderHeight;
            el.style.transform = `translate3d(${x - rw / 2}px, ${y - rh / 2}px, 0) rotate(${angle}rad)`;
          }
        });
        raf = requestAnimationFrame(update);
      };
      raf = requestAnimationFrame(update);

      // 6. Resize Handler
      resizeHandler = () => {
        if (!containerRef.current) return;
        const { clientWidth: nW, clientHeight: nH } = containerRef.current;
        Matter.Body.setPosition(ground, { x: nW / 2, y: nH + thickness / 2 });
        Matter.Body.setPosition(rightWall, { x: nW + thickness / 2, y: nH / 2 });
        Matter.Body.setPosition(leftWall, { x: -thickness / 2, y: nH / 2 });
      };
      window.addEventListener("resize", resizeHandler);

      setIsReady(true);
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (runner) Matter.Runner.stop(runner);
      if (engine) Matter.Engine.clear(engine);
      if (raf) cancelAnimationFrame(raf);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card" ref={containerRef}>
          <div className="contact-content-layer">
            <h2 className="cta-title">Ready to Level Up?</h2>
            <p className="cta-subtitle">
              Whether it’s a one-off edit or a full channel transformation,
              we’re ready when you are. Let’s talk ideas.
            </p>
            <a href="#contact" className="cta-button-main">
              <span>Book a Call</span>
              <div className="cta-btn-icon">
                <ArrowRight size={20} />
              </div>
            </a>
          </div>

          {TAGS.map((tag, i) => (
            <div
              key={i}
              ref={(el) => (tagsRef.current[i] = el)}
              className={`physics-tag ${tag.theme} ${isReady ? 'visible' : 'measuring'}`}
            >
              {tag.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
