// MyProjects.jsx - Güncellenmiş Observer kısmı
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MyProjects.css';

// GSAP Observer mock - Mobil touch desteği ile
const Observer = {
  create: (options) => {
    let startY = 0;
    let startX = 0;
    let isScrolling = false;
    let touchStartTime = 0;
    
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        options.onUp && options.onUp();
      } else {
        options.onDown && options.onDown();
      }
    };

    const handleKeyDown = (e) => {
      if ((e.code === "ArrowUp" || e.code === "ArrowLeft")) {
        options.onDown && options.onDown();
      }
      if ((e.code === "ArrowDown" || e.code === "ArrowRight" || e.code === "Space" || e.code === "Enter")) {
        options.onUp && options.onUp();
      }
    };

    // Touch başlangıcı
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startY = touch.clientY;
      startX = touch.clientX;
      touchStartTime = Date.now();
      isScrolling = false;
    };

    // Touch hareketi
    const handleTouchMove = (e) => {
      if (!startY || !startX) return;
      
      const touch = e.touches[0];
      const currentY = touch.clientY;
      const currentX = touch.clientX;
      
      const diffY = startY - currentY;
      const diffX = startX - currentX;
      
      // Dikey hareket horizontal hareketten daha fazla ise
      if (Math.abs(diffY) > Math.abs(diffX)) {
        e.preventDefault(); // Sayfa scroll'unu engelle
        isScrolling = true;
      }
    };

    // Touch sonu
    const handleTouchEnd = (e) => {
      if (!startY || !startX || !isScrolling) return;
      
      const touch = e.changedTouches[0];
      const endY = touch.clientY;
      const endX = touch.clientX;
      const touchEndTime = Date.now();
      
      const diffY = startY - endY;
      const diffX = startX - endX;
      const timeDiff = touchEndTime - touchStartTime;
      
      // Minimum hareket mesafesi ve maksimum süre kontrolü
      const minDistance = 50;
      const maxTime = 600;
      
      if (Math.abs(diffY) > Math.abs(diffX) && 
          Math.abs(diffY) > minDistance && 
          timeDiff < maxTime) {
        
        if (diffY > 0) {
          // Yukarı kaydırma - sonraki proje
          options.onUp && options.onUp();
        } else {
          // Aşağı kaydırma - önceki proje
          options.onDown && options.onDown();
        }
      }
      
      // Reset
      startY = 0;
      startX = 0;
      isScrolling = false;
    };

    // Event listener'ları ekle
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return {
      kill: () => {
        document.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }
};

gsap.registerPlugin(ScrollTrigger);

const MyProjects = () => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projectData = [
    {
      title: "PC GAME",
      url: "https://store.steampowered.com/app/1604180/Laika/",
      image: "/steam2.webp",
      overlayImage: "/laika1.png",
      color: "#0C0C0C",
      description: "Laika is a third person perma-death runner game where you have to deal with various obstacles that exist to end your life. The main goal of this game is to survive until the end."
    },
    {
      title: "UNITY ASSET",
      url: "https://assetstore.unity.com/packages/tools/gui/basic-menu-options-238520",
      image: "/asset2.png",
      overlayImage: "/asset1.png",
      color: "#355070",
      description: "A Menu and Options (Settings) for games.The asset can change resolution, quality, and other video settings. In the Audio Setting, you can change your SFX and music volume. In the control setting, there is a sensitivity slider. Lastly, there is a simple Loading Screen in the package."
    },
    {
      title: "WINDOWS APP",
      url: "https://www.linkedin.com/in/ogan-dragonetti-2666a3151/?originalSubdomain=tr",
      image: "/WAPP.webp",
      overlayImage: "/WAPP.jpg",
      color: "#9a8c98",
      description: "Developed a Windows application for an insurance company using WPF and DevExpress, adhering to the MVVM pattern. Implemented data charts with data binding and created a scalablebackend with the .NET framework"
    },
    {
      title: "MOBILE GAME",
      url: "https://www.linkedin.com/in/ogan-dragonetti-2666a3151/?originalSubdomain=tr",
      image: "/OldCar2.jpg",
      overlayImage: "/google2.jpg",
      color: "#C9C19F",
      description: "Old Car is a new free hard casual game. Finish the levels and win the game."
    },
    {
      title: "WEB APP",
      url: "https://www.linkedin.com/in/ogan-dragonetti-2666a3151/?originalSubdomain=tr",
      image: "/myeyerod2.jpg",
      overlayImage: "/myeyerod.png",
      color: "#9a8c98",
      description: "A monitoring system for solar energy sites and panels.The backend is built with Strapi as a CMS system for managing and tracking data.The frontend is developed using React."
    },
    {
      title: "PC GAME",
      url: "https://store.steampowered.com/app/1540060/Angry_Putin/",
      image: "/steam2.webp",
      overlayImage: "/angry.png",
      color: "#0C0C0C",
      description: "Angry Putin is a third person simulation game. Putin is angry and he will relax by beating other people, dancing with music and drinking VOTKA VOTKA VOTKA!"
    },
    {
      title: "ITCH.IO ASSET",
      url: "https://oganetti.itch.io/cool-stick-man",
      image: "/itch.svg",
      overlayImage: "/stick.png",
      color: "#C73A3A",
      description: "A Menu and Options (Settings) for games.The asset can change resolution, quality, and other video settings. In the Audio Setting, you can change your SFX and music volume. In the control setting, there is a sensitivity slider. Lastly, there is a simple Loading Screen in the package."
    },
    {
      title: "UNITY ASSET",
      url: "https://assetstore.unity.com/packages/vfx/shaders/basic-toon-shader-built-in-303287",
      image: "/unityasset.png",
      overlayImage: "/shader.png",
      color: "#355070",
      description: "Basic Toon Shader helps you give your 3D objects a fun cartoon look without sticking to one style. It includes example scenes that you can use in your projects. You can also use it on built-in Unity projects to create your own assets and achieve the cartoon style you want."
    },
    {
      title: "MOBILE GAME",
      url: "https://www.linkedin.com/in/ogan-dragonetti-2666a3151/?originalSubdomain=tr",
      image: "/BunCube1.webp",
      overlayImage: "/google2.jpg",
      color: "#C9C19F",
      description: "BunCube is a new free hard casual game. Finish the levels and win the game."
    },
    {
      title: "ITCH.IO ASSET",
      url: "https://oganetti.itch.io/cool-stick-man",
      image: "/itch.svg",
      overlayImage: "/stick.png",
      color: "#C73A3A",
      description: "Basic Toon Water Shader allows you to create water effects in a basic toon style for your 3D objects, without being limited to a specific look."
    },
    {
      title: "WEB SITE",
      url: "https://southsidebodrum.com/",
      image: "/south2.png",
      overlayImage: "/south.png",
      color: "#9a8c98",
      description: "A stylish, responsive promotional website designed for a boutique hotel in Bodrum."
    },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let animating = false;

    const sections = gsap.utils.toArray(".slide");
    const images = gsap.utils.toArray(".image");
    const slideImages = gsap.utils.toArray(".slide__img");
    const outerWrappers = gsap.utils.toArray(".slide__outer");
    const innerWrappers = gsap.utils.toArray(".slide__inner");
    const count = document.querySelector(".count");
    const overlayDescription = document.querySelector(".overlay__description");
    const wrap = gsap.utils.wrap(0, sections.length);

    // Initialize positions
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
    gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });
    
    // Initialize overlay images
    gsap.set(images, { autoAlpha: 0 });
    gsap.set(images[0], { autoAlpha: 1 });

    function gotoSection(index, direction) {
      animating = true;
      index = wrap(index);
      
      let tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        onComplete: () => {
          animating = false;
        }
      });

      let currentSection = sections[currentIndex];
      let heading = currentSection.querySelector(".slide__heading");
      let nextSection = sections[index];
      let nextHeading = nextSection.querySelector(".slide__heading");

      // Update text content
      overlayDescription.textContent = projectData[index].description;
      
      gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndex], images[index]], { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index], images[currentIndex]], { zIndex: 2, autoAlpha: 1 });

      tl
        .set(count, { textContent: index + 1 }, 0.32)
        .set(overlayDescription, { textContent: projectData[index].description }, 0.32)
        .fromTo(
          overlayDescription,
          { 
            opacity: 0,
            xPercent: 30
          },
          { 
            opacity: 1,
            xPercent: 0,
            duration: 0.8,
            delay: 0.5
          },
          0
        )
        .fromTo(
          outerWrappers[index],
          { xPercent: 100 * direction },
          { xPercent: 0 },
          0
        )
        .fromTo(
          innerWrappers[index],
          { xPercent: -100 * direction },
          { xPercent: 0 },
          0
        )
        .to(
          heading,
          {
            "--width": "800",
            xPercent: 30 * direction
          },
          0
        )
        .fromTo(
          nextHeading,
          {
            "--width": "800",
            xPercent: -30 * direction
          },
          {
            "--width": "200",
            xPercent: 0
          },
          0
        )
        .fromTo(
          images[index],
          {
            xPercent: 125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
          },
          { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
          0
        )
        .fromTo(
          images[currentIndex],
          { xPercent: 0, scaleX: 1, scaleY: 1 },
          {
            xPercent: -125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
          },
          0
        )
        .fromTo(
          slideImages[index],
          { scale: 2 },
          { scale: 1 },
          0
        )
        .timeScale(0.8);

      currentIndex = index;
      setCurrentIndex(index);
    }

    // Create Observer for scroll/swipe detection
    observerRef.current = Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        if (animating) return;
        gotoSection(currentIndex + 1, +1);
      },
      onDown: () => {
        if (animating) return;
        gotoSection(currentIndex - 1, -1);
      },
      tolerance: 10
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="projects-container" ref={containerRef}>
      {/* Slides */}
      {projectData.map((project, index) => (
        <section key={index} className={`slide ${index === 0 ? 'slide--active' : ''}`}>
          <div className="slide__outer">
            <div className="slide__inner">
              <div className="slide__content" style={{ backgroundColor: project.color }}>
                <div className="slide__container">
                  <h2 className="slide__heading">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h2>
                  <figure className="slide__img-cont">
                    <img className="slide__img" src={project.image} alt={project.title} />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Overlay */}
      <section className="overlay">
        <div className="overlay__content">
          <p className="overlay__count">0<span className="count">1</span></p>
          <p className="overlay__description">{projectData[currentIndex]?.description || projectData[0].description}</p>
          <figure className="overlay__img-cont">
            {projectData.map((project, index) => (
              <img key={index} className="image" src={project.overlayImage} alt={`${project.title} detail`} />
            ))}
          </figure>
        </div>
      </section>

      {/* Footer */}
      <footer className="projects-footer">
      </footer>
    </div>
  );
};

export default MyProjects;