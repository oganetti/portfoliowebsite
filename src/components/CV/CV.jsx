import { useEffect, useRef } from 'react';
import './CV.css';

const CV = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const velocity = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    
    if (!wrapper || !content) return;

    // Smooth scroll variables
    const smoothness = 0.1;
    
    // GSAP-like smooth scroll animation
    const smoothScroll = () => {
      const prevScrollY = currentScrollY.current;
      currentScrollY.current += (targetScrollY.current - currentScrollY.current) * smoothness;
      velocity.current = currentScrollY.current - prevScrollY;
      
      content.style.transform = `translateY(${-currentScrollY.current}px)`;
      
      // Apply effects to CV card based on velocity
      const cvCard = content.querySelector('.cv-card');
      if (cvCard) {
        const rawVelocity = velocity.current / -50;
        const clampedVelocity = Math.max(-20, Math.min(20, rawVelocity));
        const skewValue = clampedVelocity * 0.3; // Reduced skew for CV card
        
        cvCard.style.transform = `skewY(${skewValue}deg)`;
      }
      
      if (Math.abs(targetScrollY.current - currentScrollY.current) > 0.1) {
        requestAnimationFrame(smoothScroll);
      } else {
        if (cvCard) {
          cvCard.style.transform = `skewY(0deg)`;
        }
        isScrolling.current = false;
      }
    };

    // Handle wheel events
    const handleWheel = (e) => {
      e.preventDefault();
      
      const scrollSpeed = 2;
      targetScrollY.current += e.deltaY * scrollSpeed;
      
      const maxScroll = content.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(0, Math.min(maxScroll, targetScrollY.current));
      
      if (!isScrolling.current) {
        isScrolling.current = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 3;
      
      targetScrollY.current += deltaY;
      const maxScroll = content.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(0, Math.min(maxScroll, targetScrollY.current));
      
      touchStartY = touchY;
      
      if (!isScrolling.current) {
        isScrolling.current = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleDownloadCV = () => {
    // PDF'i yeni sekmede aç, kullanıcı oradan indirebilir
    window.open('/ogancv.pdf', '_blank');
  };

  return (
    <div className="cv-container">
      <h1 className="cv-title">Curriculum Vitae</h1>
      
      <div className="cv-button-wrapper">
        <button className="cv-button" onClick={handleDownloadCV}>
          View CV
        </button>
      </div>
    </div>
  );
};

export default CV;