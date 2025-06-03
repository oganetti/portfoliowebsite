import { useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
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
    const smoothness = 0.1; // Higher = smoother but slower
    
    // GSAP-like smooth scroll animation
    const smoothScroll = () => {
      // Calculate velocity
      const prevScrollY = currentScrollY.current;
      currentScrollY.current += (targetScrollY.current - currentScrollY.current) * smoothness;
      velocity.current = currentScrollY.current - prevScrollY;
      
      // Apply transform to content
      content.style.transform = `translateY(${-currentScrollY.current}px)`;
      
      // Apply effects to images based on velocity and data-speed
      const images = content.querySelectorAll('img');
      const rawVelocity = velocity.current / -50; // GSAP-like velocity calculation
      const clampedVelocity = Math.max(-20, Math.min(20, rawVelocity)); // clamp between -20 and 20
      
      images.forEach(img => {
        const speed = parseFloat(img.dataset.speed) || 1;
        
        // Apply skew effect based on velocity (like GSAP quickTo)
        const skewValue = clampedVelocity;
        
        // Apply parallax effect based on data-speed
        const parallaxOffset = currentScrollY.current * (speed - 1) * 0.5;
        
        // Combine both effects
        img.style.transform = `translateY(${parallaxOffset}px) skewY(${skewValue}deg)`;
      });
      
      // Continue animation if still scrolling
      if (Math.abs(targetScrollY.current - currentScrollY.current) > 0.1) {
        requestAnimationFrame(smoothScroll);
      } else {
        // Reset skew when stopped but keep parallax
        images.forEach(img => {
          const speed = parseFloat(img.dataset.speed) || 1;
          const parallaxOffset = currentScrollY.current * (speed - 1) * 0.5;
          img.style.transform = `translateY(${parallaxOffset}px) skewY(0deg)`;
        });
        isScrolling.current = false;
      }
    };

    // Handle wheel events
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Update target scroll position
      const scrollSpeed = 2; // Adjust scroll speed
      targetScrollY.current += e.deltaY * scrollSpeed;
      
      // Clamp scroll position
      const maxScroll = content.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(0, Math.min(maxScroll, targetScrollY.current));
      
      // Start smooth scroll if not already running
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
      const deltaY = (touchStartY - touchY) * 3; // Multiply for sensitivity
      
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
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80",
    "https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80",
    "https://images.unsplash.com/photo-1535207010348-71e47296838a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1588007375246-3ee823ef4851?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
  ];

  const imageLinks = [
    "https://linkedin.com/in/your-profile",  // İlk resim LinkedIn'e gidecek
    "https://github.com/your-username",      // İkinci resim GitHub'a gidecek
    "https://linkedin.com/in/your-profile",  // Üçüncü resim LinkedIn'e gidecek
    "https://github.com/your-username",      // Dördüncü resim GitHub'a gidecek
    "https://linkedin.com/in/your-profile",  // Beşinci resim LinkedIn'e gidecek
    "https://github.com/your-username",      // Altıncı resim GitHub'a gidecek
    "https://linkedin.com/in/your-profile",  // Yedinci resim LinkedIn'e gidecek
    "https://github.com/your-username"       // Sekizinci resim GitHub'a gidecek
  ];

  const socialLinks = [
    {
      type: 'linkedin',
      url: 'https://linkedin.com/in/your-profile',
      icon: 'https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
    },
    {
      type: 'github', 
      url: 'https://github.com/your-username',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
    },
    {
      type: 'linkedin',
      url: 'https://linkedin.com/in/your-profile',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
    },
    {
      type: 'github',
      url: 'https://github.com/your-username', 
      icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png'
    },
    {
      type: 'linkedin',
      url: 'https://linkedin.com/in/your-profile',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
    },
    {
      type: 'github',
      url: 'https://github.com/your-username',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
    },
    {
      type: 'linkedin',
      url: 'https://linkedin.com/in/your-profile', 
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
    },
    {
      type: 'github',
      url: 'https://github.com/your-username',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
    }
  ];

  const dataSpeeds = [0.8, 0.9, 1, 1.1, 0.9, 1.2, 0.8, 1];

  return (
    <div className="contact-container">
      <h1 className="text">Contact</h1>
     
 
      
      <div id="wrapper" ref={wrapperRef}>
        <section id="content" ref={contentRef}>
        <section className="images">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}

           
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                <img
                  data-speed={dataSpeeds[index]}
                  src={social.icon}
                  alt=""
           
                />
              </a>
            ))}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Contact;