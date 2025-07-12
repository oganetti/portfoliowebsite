import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import './TextAnimation.css';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const TextAnimation = () => {
  const textBlockRef = useRef(null);

  useEffect(() => {
    // Initialize SplitText
    const st = new SplitText('p', { type: 'chars', charsClass: 'char' });

    // Set data-content attribute for each character
    st.chars.forEach((char) => {
      gsap.set(char, { attr: { 'data-content': char.innerHTML } });
    });

    // Handle pointer movement
    const textBlock = textBlockRef.current;
    const handlePointerMove = (e) => {
      st.chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          gsap.to(char, {
            overwrite: true,
            duration: 1.2 - dist / 100,
            scrambleText: {
              text: char.dataset.content,
              chars: '.:',
              speed: 0.5,
            },
            ease: 'none',
          });
        }
      });
    };

    textBlock.addEventListener('pointermove', handlePointerMove);

    // Cleanup
    return () => {
      textBlock.removeEventListener('pointermove', handlePointerMove);
      st.revert();
    };
  }, []);

  return (
    <div className="text-block" ref={textBlockRef}>
      <p>
       Hello my name is Ogan Dragonetti. I am a software developer.
      </p>
    </div>
  );
};

export default TextAnimation;