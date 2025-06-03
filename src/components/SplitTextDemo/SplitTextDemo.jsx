import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './SplitTextDemo.css';

// Mock SplitText for demo
const SplitText = {
  create: (selector, options) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!element) return { words: [] };

    const text = element.textContent;
    const words = [];
    
    // Clear original content
    element.innerHTML = '';
    
    // Split by words, but preserve HTML tags
    const wordRegex = /\S+/g;
    let match;
    let lastIndex = 0;
    
    while ((match = wordRegex.exec(text)) !== null) {
      const word = match[0];
      const wordStart = match.index;
      const wordEnd = wordStart + word.length;
      
      // Add any whitespace before this word
      if (wordStart > lastIndex) {
        const whitespace = text.slice(lastIndex, wordStart);
        element.appendChild(document.createTextNode(whitespace));
      }
      
      // Create word element
      const wordElement = document.createElement('span');
      wordElement.className = options.wordsClass || 'word';
      wordElement.textContent = word;

       if (word === 'Technologies' || word === 'Projects') {
        wordElement.style.cursor = 'pointer';
        
        wordElement.addEventListener('click', () => {
          if (word === 'Technologies') {
            window.location.href = '/technologies';
          } else if (word === 'Projects') {
            window.location.href = '/projects';
          }
        });
      }
      
      element.appendChild(wordElement);
      words.push(wordElement);
      
      lastIndex = wordEnd;
    }
    
    // Add any remaining whitespace
    if (lastIndex < text.length) {
      element.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    
    return {
      words: words,
      revert: () => {
        element.textContent = text;
      }
    };
  }
};

const SplitTextDemo = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Wait for fonts to load
    const initAnimation = () => {
      // First show the heading like original
      gsap.set(heading, { opacity: 1 });
      
      const headlineSplit = SplitText.create(heading, {
        type: "words",
        wordsClass: "word",
        ignore: "sup"
      });

      // Start animation from invisible state like original
      gsap.fromTo(headlineSplit.words, 
        {
          y: -100,
          opacity: 0,
          rotation: () => gsap.utils.random(-80, 80)
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 1 // Small delay like original
        }
      );
    };

    // Check if fonts are ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initAnimation);
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(initAnimation, 100);
    }
  }, []);

  return (
    <div className="split-text-container">
      <h2 ref={headingRef} className="split-heading">
        Technologies<sup></sup>  Projects<sup></sup>  Contact<sup></sup>
      </h2>
    </div>
  );
};

export default SplitTextDemo;