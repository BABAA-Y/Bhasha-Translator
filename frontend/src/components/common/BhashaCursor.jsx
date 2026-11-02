import React, { useEffect, useRef, useState } from "react";

export default function BhashaCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  // Real-time coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable on desktop/fine-pointer devices
    const checkPointer = () => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      setIsFinePointer(fine);
    };
    checkPointer();
    window.addEventListener("resize", checkPointer);

    let animId;

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      setIsVisible(true);

      // Instantly position the center precision dot (0ms latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over clickable/interactive elements without expensive reflow
      const target = e.target;
      if (target && target.closest) {
        const isInteractive = Boolean(
          target.closest("button, a, [role='button'], input, select, textarea, .cursor-pointer, summary")
        );
        setIsHovering(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };
    const onMouseEnter = () => setIsVisible(true);

    // Spring Lerp Loop for trailing reticle ring
    const render = () => {
      const factor = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * factor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * factor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", checkPointer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  // If touch device, do not render custom cursor
  if (!isFinePointer) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      
      {/* 1. Precision Center Dot (Locked to mouse, 0ms input latency) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0
        }}
      >
        <div 
          className="rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            width: isHovering ? "8px" : "6px",
            height: isHovering ? "8px" : "6px",
            backgroundColor: "#FF9933",
            boxShadow: isHovering
              ? "0 0 10px #FF9933, 0 0 4px #FFFFFF"
              : "0 0 6px rgba(255, 153, 51, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.9)"
          }}
        />
      </div>

      {/* 2. Trailing Acoustic Reticle Ring (Fluid spring trailing physics) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0
        }}
      >
        <div
          className="relative rounded-full flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            width: isClicking ? "26px" : isHovering ? "52px" : "34px",
            height: isClicking ? "26px" : isHovering ? "52px" : "34px",
            border: isHovering
              ? "1.5px solid rgba(255, 153, 51, 0.85)"
              : "1px solid rgba(255, 153, 51, 0.40)",
            backgroundColor: isHovering
              ? "rgba(255, 153, 51, 0.08)"
              : isClicking
              ? "rgba(6, 182, 212, 0.15)"
              : "rgba(255, 153, 51, 0.02)",
            boxShadow: isHovering
              ? "0 0 18px rgba(255, 153, 51, 0.28), inset 0 0 12px rgba(6, 182, 212, 0.12)"
              : isClicking
              ? "0 0 14px rgba(6, 182, 212, 0.35)"
              : "0 0 8px rgba(255, 153, 51, 0.10)"
          }}
        >
          {/* Subtle Acoustic Reticle Cross-ticks (Top, Bottom, Left, Right) */}
          <span 
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 transition-colors duration-300"
            style={{ backgroundColor: isHovering ? "#FF9933" : "rgba(255, 153, 51, 0.4)" }}
          />
          <span 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 transition-colors duration-300"
            style={{ backgroundColor: isHovering ? "#FF9933" : "rgba(255, 153, 51, 0.4)" }}
          />
          <span 
            className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-[1px] transition-colors duration-300"
            style={{ backgroundColor: isHovering ? "#FF9933" : "rgba(255, 153, 51, 0.4)" }}
          />
          <span 
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-[1px] transition-colors duration-300"
            style={{ backgroundColor: isHovering ? "#FF9933" : "rgba(255, 153, 51, 0.4)" }}
          />
        </div>
      </div>

    </div>
  );
}
