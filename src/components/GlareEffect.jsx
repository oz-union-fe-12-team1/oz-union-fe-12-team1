import { useEffect, useRef } from 'react';

export default function GlareEffect() {
  const containerRef = useRef(null);
  const baOneRef = useRef(null);
  const baTwoRef = useRef(null);

  useEffect(() => {
    let x1 = 0;
    let x2 = 200;

    let animationId;

    const animate = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;

      if (baOneRef.current) {
        x1 += 1; // 이동 속도
        if (x1 > containerWidth + 150) x1 = -150;
        baOneRef.current.style.transform = `translateX(${x1}px) rotate(-25deg)`;
      }

      if (baTwoRef.current) {
        x2 += 1;
        if (x2 > containerWidth + 150) x2 = -150;
        baTwoRef.current.style.transform = `translateX(${x2}px) rotate(-25deg)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    let oneVisible = true;
    let twoVisible = true;
    const blinkInterval = setInterval(() => {
      if (baOneRef.current) {
        baOneRef.current.style.opacity = oneVisible ? '0.3' : '0.6';
      }
      oneVisible = !oneVisible;

      if (baTwoRef.current) {
        baTwoRef.current.style.opacity = twoVisible ? '0.6' : '0.3';
      }
      twoVisible = !twoVisible;
    }, 1000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="glare-container">
      <div className="ba" ref={baOneRef}>
        <div className="thick"></div>
        <div className="thin"></div>
      </div>
      <div className="ba" ref={baTwoRef}>
        <div className="thick"></div>
        <div className="thin"></div>
      </div>
    </div>
  );
}
