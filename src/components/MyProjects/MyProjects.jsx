// MyProjects.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MyProjects.css';

// GSAP Observer mock for demo
const Observer = {
  create: (options) => {
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

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return {
      kill: () => {
        document.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
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
      title: "E-COMMERCE",
      image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400",
      overlayImage: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTU4Mw&ixlib=rb-1.2.1&q=80&w=800",
      color: "#6d597a",
      description: "Modern e-commerce platform with React & Node.js Modern e-commerce platform with React & Node.js Modern e-commerce platform with React & Node.js"
    },
    {
      title: "PORTFOLIO",
      image: "https://images.unsplash.com/photo-1558603668-6570496b66f8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=85&w=400",
      overlayImage: "https://images.unsplash.com/photo-1594666757003-3ee20de41568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTcwOA&ixlib=rb-1.2.1&q=80&w=800",
      color: "#355070",
      description: "Interactive portfolio with GSAP animations  Interactive portfolio with GSAP animations Interactive portfolio with GSAP animations"
    },
    {
      title: "MOBILE APP",
      image: "https://images.unsplash.com/photo-1537165924986-cc3568f5d454?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=85&w=400",
      overlayImage: "https://images.unsplash.com/photo-1579830341096-05f2f31b8259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTQ5Ng&ixlib=rb-1.2.1&q=80&w=800",
      color: "#b56576",
      description: "Cross-platform mobile app with React Native Cross-platform mobile app with React Native Cross-platform mobile app with React Native"
    },
    {
      title: "WEB DESIGN",
      image: "https://images.unsplash.com/photo-1589271243958-d61e12b61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=80&w=400",
      overlayImage: "https://images.unsplash.com/photo-1603771628302-c32c88e568e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTUxNg&ixlib=rb-1.2.1&q=80&w=800",
      color: "#9a8c98",
      description: "Creative web design with modern UI/UX Creative web design with modern UI/UX Creative web design with modern UI/UX"
    }
  ];

  useEffect(() => {
    let currentIndex = 0;
    let animating = false;

    const sections = gsap.utils.toArray(".slide");
    const images = gsap.utils.toArray(".image").reverse();
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
                  <h2 className="slide__heading">{project.title}</h2>
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
        <a href="#projects">My Projects</a>
        <p>GSAP Portfolio by Ogan</p>
      </footer>
    </div>
  );
};

export default MyProjects;