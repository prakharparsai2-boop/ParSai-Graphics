import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import "./Contact.css";

interface Body {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isDragging: boolean;
  isSleeping: boolean; // New: Optimization to stop flickering
  text: string;
  theme: "orange" | "dark" | "light";
}

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

// Tuned for stability
const PHYSICS = {
  GRAVITY: 0.5, // Slightly stronger gravity for better settling
  FRICTION: 0.9, // Higher damping (lower number = more friction)
  WALL_BOUNCE: 0.2, // Very low bounce
  BODY_BOUNCE: 0.05, // Negligible bounce to prevent jitter
  SLEEP_SPEED: 0.25, // Increased sleep threshold
  WAKE_SPEED: 0.5,
  ITERATIONS: 8, // More iterations for better stacking stability
  SLOP: 0.5, // Pixel tolerance for overlaps to prevent micro-vibrations
  BAUMGARTE: 0.2, // Soft position correction coefficient
};

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bodies, setBodies] = useState<Body[]>([]);
  const requestRef = useRef<number>(0);
  const bodiesRef = useRef<Body[]>([]);

  const dragStateRef = useRef<{
    id: number | null;
    offsetX: number;
    offsetY: number;
  }>({ id: null, offsetX: 0, offsetY: 0 });

  const dragHistoryRef = useRef<
    Map<number, { x: number; y: number; time: number }[]>
  >(new Map());

  // Initialization
  useEffect(() => {
    // Initial spawn
    const spawnWidth = containerRef.current?.clientWidth || 800;
    const colCount = 4;
    const colWidth = spawnWidth / colCount;

    const initialBodies: Body[] = TAGS.map((tag, i) => {
      // Scatter logic: Distribute in columns but randomize x slightly within column
      // Start Y negative so they fall in sequence
      const col = i % colCount;
      const x = col * colWidth + Math.random() * (colWidth - 100);
      const y = -150 - Math.floor(i / colCount) * 100 - Math.random() * 50;

      return {
        id: i,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2, // Slight horizontal drift
        vy: 0,
        width: 0,
        height: 0,
        isDragging: false,
        isSleeping: false,
        text: tag.text,
        theme: tag.theme,
      };
    });

    bodiesRef.current = initialBodies;
    setBodies(initialBodies);
  }, []);

  // Measurement
  useEffect(() => {
    if (bodies.length === 0) return;

    const measure = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;

      bodiesRef.current.forEach((body) => {
        const el = document.getElementById(`physics-tag-${body.id}`);
        if (el) {
          body.width = el.offsetWidth;
          body.height = el.offsetHeight;

          // Keep X within bounds immediately
          if (body.x + body.width > containerWidth) {
            body.x = Math.max(0, containerWidth - body.width);
          }
        }
      });
    };

    measure();
    const timer = setTimeout(measure, 100); // Debounce measurement
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [bodies.length]);

  // Physics Loop
  const updatePhysics = useCallback(() => {
    if (!containerRef.current) return;

    const containerW = containerRef.current.clientWidth;
    const containerH = containerRef.current.clientHeight;
    const allBodies = bodiesRef.current;

    // 1. Integration (Movement)
    allBodies.forEach((body) => {
      if (body.isDragging) return;

      // Check sleep state
      const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);

      // Only stay sleep if energy is low
      if (speed < PHYSICS.SLEEP_SPEED && body.vy < 0.5) {
        if (body.y + body.height >= containerH - 1) {
          body.isSleeping = true;
          body.vx = 0;
          body.vy = 0;
        }
      } else if (speed > PHYSICS.WAKE_SPEED) {
        body.isSleeping = false;
      }

      if (!body.isSleeping) {
        body.vy += PHYSICS.GRAVITY;

        // Apply friction
        body.vx *= PHYSICS.FRICTION;
        body.vy *= PHYSICS.FRICTION;

        // Limit velocity to prevent explosion
        body.vx = Math.max(-30, Math.min(30, body.vx));
        body.vy = Math.max(-30, Math.min(30, body.vy));

        body.x += body.vx;
        body.y += body.vy;
      }
    });

    // 2. Constraints & Collisions
    for (let iter = 0; iter < PHYSICS.ITERATIONS; iter++) {
      // Wall Constraints
      allBodies.forEach((body) => {
        if (body.isDragging) return;

        // Floor
        if (body.y + body.height > containerH) {
          body.y = containerH - body.height;
          body.vy *= -PHYSICS.WALL_BOUNCE;
          body.vx *= 0.8; // Friction on ground

          if (Math.abs(body.vy) < PHYSICS.GRAVITY * 1.5) {
            body.vy = 0;
          }
        }

        // Walls
        if (body.x + body.width > containerW) {
          body.x = containerW - body.width;
          body.vx *= -PHYSICS.WALL_BOUNCE;
        } else if (body.x < 0) {
          body.x = 0;
          body.vx *= -PHYSICS.WALL_BOUNCE;
        }
      });

      // Body vs Body Collisions
      for (let i = 0; i < allBodies.length; i++) {
        for (let j = i + 1; j < allBodies.length; j++) {
          const b1 = allBodies[i];
          const b2 = allBodies[j];

          // AABB Check
          if (
            b1.x < b2.x + b2.width &&
            b1.x + b1.width > b2.x &&
            b1.y < b2.y + b2.height &&
            b1.y + b1.height > b2.y
          ) {
            // Wake up if colliding
            if (!b1.isDragging) b1.isSleeping = false;
            if (!b2.isDragging) b2.isSleeping = false;

            const overlapX =
              Math.min(b1.x + b1.width, b2.x + b2.width) - Math.max(b1.x, b2.x);
            const overlapY =
              Math.min(b1.y + b1.height, b2.y + b2.height) -
              Math.max(b1.y, b2.y);

            // Smallest separation axis
            if (overlapX < overlapY) {
              // Separation along X
              if (overlapX > PHYSICS.SLOP) {
                const mid1 = b1.x + b1.width / 2;
                const mid2 = b2.x + b2.width / 2;
                const dir = mid1 < mid2 ? -1 : 1;
                const separation =
                  (overlapX - PHYSICS.SLOP) * PHYSICS.BAUMGARTE;

                if (!b1.isDragging) b1.x += dir * -separation;
                if (!b2.isDragging) b2.x += dir * separation;

                // Conservation of momentum (simple version)
                const relativeVx = b1.vx - b2.vx;
                if (relativeVx * dir > 0) {
                  const impulse = relativeVx * PHYSICS.BODY_BOUNCE;
                  if (!b1.isDragging) b1.vx -= impulse;
                  if (!b2.isDragging) b2.vx += impulse;
                }
              }
            } else {
              // Separation along Y
              if (overlapY > PHYSICS.SLOP) {
                const mid1 = b1.y + b1.height / 2;
                const mid2 = b2.y + b2.height / 2;
                const dir = mid1 < mid2 ? -1 : 1;
                const separation =
                  (overlapY - PHYSICS.SLOP) * PHYSICS.BAUMGARTE;

                if (!b1.isDragging) b1.y += dir * -separation;
                if (!b2.isDragging) b2.y += dir * separation;

                // Friction when stacking
                if (!b1.isDragging) b1.vx *= 0.95;
                if (!b2.isDragging) b2.vx *= 0.95;

                const relativeVy = b1.vy - b2.vy;
                if (relativeVy * dir > 0) {
                  const impulse = relativeVy * PHYSICS.BODY_BOUNCE;
                  if (!b1.isDragging) b1.vy -= impulse;
                  if (!b2.isDragging) b2.vy += impulse;
                }
              }
            }
          }
        }
      }
    }

    // 3. Render
    allBodies.forEach((body) => {
      const el = document.getElementById(`physics-tag-${body.id}`);
      if (el) {
        el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0)`;

        if (body.isDragging && !el.classList.contains("dragging")) {
          el.classList.add("dragging");
        } else if (!body.isDragging && el.classList.contains("dragging")) {
          el.classList.remove("dragging");
        }
      }
    });

    requestRef.current = requestAnimationFrame(updatePhysics);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updatePhysics]);

  // Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const body = bodiesRef.current.find((b) => b.id === id);
    if (!body || !containerRef.current) return;

    body.isDragging = true;
    body.isSleeping = false;
    body.vx = 0;
    body.vy = 0;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - body.x;
    const offsetY = e.clientY - rect.top - body.y;

    dragStateRef.current = { id, offsetX, offsetY };
    dragHistoryRef.current.set(id, []);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { id, offsetX, offsetY } = dragStateRef.current;
    if (id === null || !containerRef.current) return;

    const body = bodiesRef.current.find((b) => b.id === id);
    if (!body) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newX = e.clientX - rect.left - offsetX;
    let newY = e.clientY - rect.top - offsetY;

    // Soft constraints during drag
    const maxW = containerRef.current.clientWidth - body.width;
    const maxH = containerRef.current.clientHeight - body.height;
    newX = Math.max(-20, Math.min(maxW + 20, newX));
    newY = Math.max(-20, Math.min(maxH + 20, newY));

    body.x = newX;
    body.y = newY;
    body.isSleeping = false;

    // History for throw
    const history = dragHistoryRef.current.get(id) || [];
    const now = performance.now();
    history.push({ x: newX, y: newY, time: now });
    if (history.length > 8) history.shift();
    dragHistoryRef.current.set(id, history);
  };

  const handlePointerUp = (e: React.PointerEvent, id: number) => {
    const body = bodiesRef.current.find((b) => b.id === id);
    if (body) {
      body.isDragging = false;

      // Calculate throw
      const history = dragHistoryRef.current.get(id);
      if (history && history.length >= 2) {
        const last = history[history.length - 1];
        const first = history[0];
        const dt = last.time - first.time;
        if (dt > 0) {
          const vx = ((last.x - first.x) / dt) * 10;
          const vy = ((last.y - first.y) / dt) * 10;
          body.vx = Math.max(-20, Math.min(20, vx));
          body.vy = Math.max(-20, Math.min(20, vy));
        }
      }

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    dragStateRef.current.id = null;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div
          className="contact-card"
          ref={containerRef}
          onPointerMove={handlePointerMove}
        >
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

          {bodies.map((body) => (
            <div
              key={body.id}
              id={`physics-tag-${body.id}`}
              className={`physics-tag ${body.theme}`}
              onPointerDown={(e) => handlePointerDown(e, body.id)}
              onPointerUp={(e) => handlePointerUp(e, body.id)}
              onPointerCancel={(e) => handlePointerUp(e, body.id)}
            >
              {body.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
