import { useEffect, useRef } from 'react';

export default function GlareEffect() {
  const containerRef = useRef(null);
  const baOneRef = useRef(null);
  const baTwoRef = useRef(null);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const spacing = containerWidth / 2;
    // => 부모 너비의 1/3만큼의 거리를 벌리겠다,,

    let x1 = 0;
    let x2 = -spacing;

    let animationId;

    const animate = () => {
      if (!containerRef.current) return;

      if (baOneRef.current) {
        x1 += 1;
        // 화면 끝을 넘어가면 화면 왼쪽 밖에서 다시 시작
        if (x1 > containerWidth + 250) {
          x1 = -150;
        }
        baOneRef.current.style.transform = `translateX(${x1}px) rotate(-25deg)`;
      }

      if (baTwoRef.current) {
        x2 += 1;
        // 두 번째 바도 같은 방식으로 루프
        if (x2 > containerWidth + 250) {
          x2 = -150;
        }
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
        baTwoRef.current.style.opacity = twoVisible ? '0.5' : '0.2';
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
