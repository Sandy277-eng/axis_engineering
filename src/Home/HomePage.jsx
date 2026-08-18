import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroSectionRef = useRef(null);

  // Refs for About Section Animation
  const aboutContainerRef = useRef(null);
  const aboutTextRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutBgImageRef = useRef(null);

  // Refs for What We Supply section
  const supplySectionRef = useRef(null);

  // Refs for Specialties Section
  const specialtiesRef = useRef(null);

  // Refs for Why Choose Us Section
  const whyChooseUsRef = useRef(null);

  // Refs for Stats Bar Section
  const statsBarRef = useRef(null);

  const cardsContainerRef = useRef(null);

  const scrollToProducts = (e) => {
    if (e) e.preventDefault();
    cardsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [detronZoom, setDetronZoom] = useState({ scale: 1, x: 50, y: 50 });
  const [fixtureZoom, setFixtureZoom] = useState({ scale: 1, x: 50, y: 50 });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Context for scroll-triggered animations
    const ctx = gsap.context(() => {
      // 1. Hero Text Fade in
      gsap.fromTo(
        ".hero-fade-in",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.2 }
      );

      // 2. Slide cards (Detron / Fixtures)
      gsap.fromTo(
        ".slide-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. ScrollTrigger for all Section Boxes (.section-box)
      gsap.utils.toArray(".section-box").forEach((box) => {
        gsap.fromTo(
          box,
          { y: 80, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: box,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 4. About Us Internal Element Animations (nested delay)
      gsap.fromTo(
        aboutTextRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        aboutImageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Background Parallax
      if (aboutBgImageRef.current) {
        gsap.fromTo(
          aboutBgImageRef.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: aboutContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 5. Supply Grid Card animations
      gsap.fromTo(
        ".supply-card",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: supplySectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 6. Specialties Item animations
      gsap.fromTo(
        ".specialty-item",
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: specialtiesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 7. Why Choose Us Card animations
      gsap.fromTo(
        ".choose-card",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: whyChooseUsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 8. Stats Bar number scale-in
      gsap.fromTo(
        ".stat-val",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsBarRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e, setZoomState) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomState({ scale: 1.15, x, y });
  };

  const handleMouseLeave = (setZoomState) => {
    setZoomState({ scale: 1, x: 50, y: 50 });
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .cta {
            display: inline-flex;
            align-items: center;
            padding: 11px 33px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 800;
            color: white;
            background: #E30613;
            transition: 1s;
            box-shadow: 6px 6px 0 black;
            transform: skewX(-15deg);
            border: none;
            cursor: pointer;
            width: fit-content;
          }

          .cta:focus {
            outline: none;
          }

          .cta:hover {
            transition: 0.5s;
            box-shadow: 10px 10px 0 black;
            background: #E30613;
          }

          .cta .second {
            transition: 0.5s;
            margin-right: 0px;
            display: inline-flex;
            align-items: center;
          }

          .cta:hover .second {
            transition: 0.5s;
            margin-right: 25px;
          }

          .cta .span {
            transform: skewX(15deg);
            display: inline-block;
          }

          .cta .second {
            width: 20px;
            margin-left: 15px;
            position: relative;
            display: inline-flex;
            align-items: center;
          }

          .cta .one {
            transition: 0.4s;
            transform: translateX(-60%);
            fill: white;
          }

          .cta .two {
            transition: 0.5s;
            transform: translateX(-30%);
            fill: white;
          }

          .cta .three {
            fill: white;
          }

          .cta:hover .three {
            animation: color_anim 1s infinite 0.2s;
          }

          .cta:hover .one {
            transform: translateX(0%);
            animation: color_anim 1s infinite 0.6s;
          }

          .cta:hover .two {
            transform: translateX(0%);
            animation: color_anim 1s infinite 0.4s;
          }

          @keyframes color_anim {
            0% {
              fill: white;
            }

            50% {
              fill: #000000;
            }

            100% {
              fill: white;
            }
          }

          /* Dark/Outline CTA button styling */
          .cta-dark {
            display: inline-flex;
            align-items: center;
            padding: 11px 33px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 800;
            color: white;
            background: #000000;
            transition: 1s;
            box-shadow: 6px 6px 0 white;
            transform: skewX(-15deg);
            border: 2px solid white;
            cursor: pointer;
            width: fit-content;
          }

          .cta-dark:focus {
            outline: none;
          }

          .cta-dark:hover {
            transition: 0.5s;
            box-shadow: 10px 10px 0 #E30613;
            background: #000000;
          }

          .cta-dark .second {
            transition: 0.5s;
            margin-right: 0px;
            display: inline-flex;
            align-items: center;
          }

          .cta-dark:hover .second {
            transition: 0.5s;
            margin-right: 25px;
          }

          .cta-dark .span {
            transform: skewX(15deg);
            display: inline-block;
          }

          .cta-dark .second {
            width: 20px;
            margin-left: 15px;
            position: relative;
            display: inline-flex;
            align-items: center;
          }

          .cta-dark .one {
            transition: 0.4s;
            transform: translateX(-60%);
            fill: white;
          }

          .cta-dark .two {
            transition: 0.5s;
            transform: translateX(-30%);
            fill: white;
          }

          .cta-dark .three {
            fill: white;
          }

          .cta-dark:hover .three {
            animation: color_anim_dark 1s infinite 0.2s;
          }

          .cta-dark:hover .one {
            transform: translateX(0%);
            animation: color_anim_dark 1s infinite 0.6s;
          }

          .cta-dark:hover .two {
            transform: translateX(0%);
            animation: color_anim_dark 1s infinite 0.4s;
          }

          @keyframes color_anim_dark {
            0% {
              fill: white;
            }

            50% {
              fill: #E30613;
            }

            100% {
              fill: white;
            }
          }

          /* Premium Hover Red Cover Transition for Cards */
          .supply-card, .choose-card, .specialty-item {
            position: relative !important;
            overflow: hidden !important;
            background-color: #f8fafc !important;
            border: 2px solid #e2e8f0 !important;
            transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                        box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            z-index: 1 !important;
          }

          .supply-card::before, .choose-card::before, .specialty-item::before {
            content: '' !important;
            position: absolute !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 0% !important;
            background-color: #E30613 !important;
            transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            z-index: 0 !important;
          }

          .supply-card:hover::before, .choose-card:hover::before, .specialty-item:hover::before {
            height: 100% !important;
          }

          .supply-card > *, .choose-card > *, .specialty-item > * {
            position: relative !important;
            z-index: 1 !important;
          }

          /* Default text colors for Supply Cards */
          .supply-card .supplyCardNum {
            color: #E30613 !important;
            transition: color 0.4s ease;
          }
          .supply-card h4 {
            color: #0f172a !important;
            transition: color 0.4s ease;
          }
          .supply-card p {
            color: #475569 !important;
            transition: color 0.4s ease;
          }
          .supply-card span {
            color: #E30613 !important;
            transition: color 0.4s ease;
          }

          /* Hover state for Supply Cards */
          .supply-card:hover {
            border-color: #E30613 !important;
            transform: translateY(-8px) scale(1.02) !important;
            box-shadow: 0 20px 40px rgba(227, 6, 19, 0.25) !important;
          }
          .supply-card:hover span,
          .supply-card:hover h4,
          .supply-card:hover p {
            color: #ffffff !important;
          }

          /* Default text colors for Specialties items */
          .specialty-item span {
            color: #1e293b !important;
            transition: color 0.4s ease;
          }
          .specialty-item svg {
            stroke: #E30613 !important;
            transition: stroke 0.4s ease;
          }

          /* Hover state for Specialties items */
          .specialty-item:hover {
            border-color: #E30613 !important;
            transform: translateY(-6px) scale(1.02) !important;
            box-shadow: 0 15px 30px rgba(227, 6, 19, 0.2) !important;
          }
          .specialty-item:hover span {
            color: #ffffff !important;
          }
          .specialty-item:hover svg {
            stroke: #ffffff !important;
          }

          /* Default text colors for Choose Cards */
          .choose-card {
            border-top: 4px solid #E30613 !important;
          }
          .choose-card h4 {
            color: #0f172a !important;
            transition: color 0.4s ease;
          }
          .choose-card p {
            color: #475569 !important;
            transition: color 0.4s ease;
          }

          /* Hover state for Choose Cards */
          .choose-card:hover {
            border-color: #E30613 !important;
            border-top-color: #E30613 !important;
            transform: translateY(-8px) scale(1.02) !important;
            box-shadow: 0 20px 40px rgba(227, 6, 19, 0.25) !important;
          }
          .choose-card:hover h4,
          .choose-card:hover p {
            color: #ffffff !important;
          }
        `}
      </style>

      {/* 11. HEADER NAVIGATION */}
      <Header activePage="home" scrollToProducts={scrollToProducts} />

      {/* 1. VIDEO HERO SECTION */}
      <div ref={heroSectionRef} style={styles.pinnedHeroWrapper}>
        <video
          src="/videos/detron_home_page_animation01.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={styles.heroVideo}
        />
        <div style={styles.heroVideoOverlay} />

        <div style={styles.heroTextOverlay}>
          <span style={styles.heroBadge} className="hero-fade-in">
            INDIA'S TRUSTED PARTNER FOR CNC ROTARY TABLE SOLUTIONS
          </span>
          <h1 style={styles.heroTitle} className="hero-fade-in">
            PRECISION SYSTEMS FOR <br />
            <span style={styles.heroRedHighlight}>INDUSTRIAL EXCELLENCE</span>
          </h1>
          <p style={styles.heroDescription} className="hero-fade-in">
            Every system we deliver — Detron rotary table or custom fixture — passes
            through the same rigorous discipline: engineered for the application,
            assembled with precision, tested under load, and verified before it ships.
          </p>

          <div style={styles.heroButtonContainer} className="hero-fade-in">
            <Link to="/contact" className="cta">
              <span className="span">REQUEST A QUOTE</span>
              <span className="second">
                <svg width="20px" height="10px" viewBox="0 0 22 10" fill="none">
                  <path d="M2 1 L5 5 L2 9 H5 L8 5 L5 1 Z" className="one" />
                  <path d="M8 1 L11 5 L8 9 H11 L14 5 L11 1 Z" className="two" />
                  <path d="M14 1 L17 5 L14 9 H17 L20 5 L17 1 Z" className="three" />
                </svg>
              </span>
            </Link>
            <Link to="/contact" className="cta-dark">
              <span className="span">TALK TO OUR ENGINEERS</span>
              <span className="second">
                <svg width="20px" height="10px" viewBox="0 0 22 10" fill="none">
                  <path d="M2 1 L5 5 L2 9 H5 L8 5 L5 1 Z" className="one" />
                  <path d="M8 1 L11 5 L8 9 H11 L14 5 L11 1 Z" className="two" />
                  <path d="M14 1 L17 5 L14 9 H17 L20 5 L17 1 Z" className="three" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. TWO-CARD SECTION */}
      <div style={styles.scrollWrapperClip}>
        <section ref={cardsContainerRef} style={styles.categorySection}>
          {/* DETRON PRODUCT CARD */}
          <Link
            to="/products/detron"
            className="slide-card"
            style={{ ...styles.categoryCard, textDecoration: "none" }}
            onMouseMove={(e) => handleMouseMove(e, setDetronZoom)}
            onMouseLeave={() => handleMouseLeave(setDetronZoom)}
          >
            <div style={styles.imageWrapper}>
              <img
                src="/images/detron.jpeg"
                alt="Detron Technology CNC Rotary Table"
                style={{
                  ...styles.zoomableImage,
                  transform: `scale(${detronZoom.scale})`,
                  transformOrigin: `${detronZoom.x}% ${detronZoom.y}%`,
                }}
              />
            </div>

            <div style={styles.cardContentOverlay}>
              <div>
                <span style={styles.cardTag}>BRAND PARTNER</span>
                <h2 style={styles.cardTitle}>Detron Technology</h2>
                <p style={styles.cardText}>
                  Ultra-rigid 4th and 5th axis CNC rotary tables engineered in Taiwan
                  for one job: hold tight tolerances at high load, shift after shift,
                  without drifting.
                </p>
              </div>
              <span style={styles.cardRedButton}>
                DISCOVER DETRON RANGE &gt;
              </span>
            </div>
          </Link>

          {/* CUSTOM FIXTURES CARD */}
          <Link
            to="/products/fixtures"
            className="slide-card"
            style={{ ...styles.categoryCard, textDecoration: "none" }}
            onMouseMove={(e) => handleMouseMove(e, setFixtureZoom)}
            onMouseLeave={() => handleMouseLeave(setFixtureZoom)}
          >
            <div style={styles.imageWrapper}>
              <img
                src="/images/products_fixture/fixturecoverpic.jpg"
                alt="Axis Engineering Custom Workholding Fixture"
                style={{
                  ...styles.zoomableImage,
                  transform: `scale(${fixtureZoom.scale})`,
                  transformOrigin: `${fixtureZoom.x}% ${fixtureZoom.y}%`,
                }}
              />
            </div>

            <div style={styles.cardContentOverlay}>
              <div>
                <span style={styles.cardTag}>BESPOKE DESIGN</span>
                <h2 style={styles.cardTitle}>Custom Fixtures</h2>
                <p style={styles.cardText}>
                  No two components clamp the same way. We design workholding
                  fixtures around your part's geometry — not the other way around
                  — so cycle time and accuracy both go up.
                </p>
              </div>
              <span style={styles.cardRedButton}>
                EXPLORE FIXTURE SOLUTIONS &gt;
              </span>
            </div>
          </Link>
        </section>
      </div>

      {/* ABOUT / OUR PRODUCTS INTRO SECTION */}
      <div style={styles.aboutWrapperClip}>
        <section ref={aboutContainerRef} style={styles.aboutSectionBordered} className="section-box">
          {/* 1. SLIDING BACKGROUND INDUSTRY IMAGE (BOTTOM LAYER) */}
          <div ref={aboutBgImageRef} style={styles.aboutBgWrapper}>
            <img
              src="/logo_axis/axis_industry image.png"
              alt="Industry Background"
              style={styles.aboutBgImage}
            />
          </div>

          <div style={styles.aboutFlexRow}>
            {/* 2. LEFT COLUMN: TEXT CONTENT */}
            <div ref={aboutTextRef} style={styles.aboutTextCol}>
              <span style={styles.panelBadge}>COMPANY PROFILE</span>
              <h2 style={styles.aboutTitle}>About Us</h2>
              <h3 style={styles.aboutSubheading}>
                Welcome to Axis Engineering Solutions
              </h3>

              <div style={styles.aboutMissionBox}>
                <p style={styles.aboutMissionText}>
                  <strong>Our mission has stayed simple since day one:</strong> cutting-edge
                  technology, at an affordable price, backed by world-class service.
                  Every product we recommend is chosen because it's the right fit
                  for your application — not just the one we have on the shelf.
                </p>
              </div>

              <p style={styles.aboutDescription}>
                We're proud to be the sole Indian distributor for Detron Machinery
                Co. Ltd., Taiwan — the largest NC rotary table manufacturer in the
                world by volume. Detron manufactures every element in-house under
                strict quality control, so what you get is precision that's been
                verified, not just promised on a spec sheet.
              </p>

              <div style={{ marginTop: "24px" }}>
                <Link to="/about" className="cta">
                  <span className="span">READ MORE</span>
                  <span className="second">
                    <svg width="20px" height="10px" viewBox="0 0 22 10" fill="none">
                      <path d="M2 1 L5 5 L2 9 H5 L8 5 L5 1 Z" className="one" />
                      <path d="M8 1 L11 5 L8 9 H11 L14 5 L11 1 Z" className="two" />
                      <path d="M14 1 L17 5 L14 9 H17 L20 5 L17 1 Z" className="three" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* 3. RIGHT COLUMN: MACHINERY IMAGE & SUB-TEXT */}
            <div ref={aboutImageRef} style={styles.aboutImageCol}>
              <img
                src="/images/axis.jpg"
                alt="Axis Engineering CNC Machine"
                style={styles.aboutImageWithBorder}
              />
              <p style={styles.aboutRightDescription}>
                Since 2014, we've stocked fast-moving models to meet urgent delivery
                demands, and our team — spanning electrical, electronics, mechatronics,
                and mechanical engineering — is built to solve real integration
                problems, not just move boxes.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 4. WHAT WE SUPPLY */}
      <div style={styles.sectionWrapperClip}>
        <section ref={supplySectionRef} style={styles.sectionBoxCard} className="section-box">
          <div style={styles.sectionHeader}>
            <span style={styles.panelBadge}>ONE-POINT SOLUTION</span>
            <h2 style={styles.sectionTitle}>
              One-Point Solution for Automation & Integration
            </h2>
            <p style={styles.sectionSubtext}>
              Based in Ambattur Industrial Estate, Chennai, Axis Engineering Solutions
              is the sole distributor for Detron (Taiwan) across India, supplying:
            </p>
          </div>

          <div style={styles.supplyGrid}>
            {/* Item 1 */}
            <Link to="/products/detron/4-axis" style={styles.supplyCard} className="supply-card">
              <div>
                <span style={styles.supplyCardNum}>01</span>
                <h4 style={styles.supplyCardTitle}>4th Axis NC Rotary Tables</h4>
                <p style={styles.supplyCardDesc}>
                  Ø125–800mm, 82 models, pneumatic & hydraulic
                </p>
              </div>
              <span style={styles.supplyCardLink}>EXPLORE RANGE →</span>
            </Link>

            {/* Item 2 */}
            <Link to="/products/detron/5-axis" style={styles.supplyCard} className="supply-card">
              <div>
                <span style={styles.supplyCardNum}>02</span>
                <h4 style={styles.supplyCardTitle}>5th Axis Tilting Rotary Tables</h4>
                <p style={styles.supplyCardDesc}>Ø100–630mm, 26 models</p>
              </div>
              <span style={styles.supplyCardLink}>EXPLORE RANGE →</span>
            </Link>

            {/* Item 3 */}
            <Link to="/products/detron/auto-pallet-changer" style={styles.supplyCard} className="supply-card">
              <div>
                <span style={styles.supplyCardNum}>03</span>
                <h4 style={styles.supplyCardTitle}>B-Axis Systems</h4>
                <p style={styles.supplyCardDesc}>For HMC Auto Pallet Changers</p>
              </div>
              <span style={styles.supplyCardLink}>EXPLORE RANGE →</span>
            </Link>

            {/* Item 4 */}
            <Link to="/products/detron/intelligent-control" style={styles.supplyCard} className="supply-card">
              <div>
                <span style={styles.supplyCardNum}>04</span>
                <h4 style={styles.supplyCardTitle}>Direct Drive Motors</h4>
                <p style={styles.supplyCardDesc}>
                  Direct Drive Motor Tilting Rotary Tables
                </p>
              </div>
              <span style={styles.supplyCardLink}>EXPLORE RANGE →</span>
            </Link>

            {/* Item 5 */}
            <Link to="/products/detron/accessories" style={styles.supplyCard} className="supply-card">
              <div>
                <span style={styles.supplyCardNum}>05</span>
                <h4 style={styles.supplyCardTitle}>Rotary Joints & Accessories</h4>
                <p style={styles.supplyCardDesc}>
                  Tailstocks, Support Tables, Chucks with Cradle System & SKT Rotary Joints
                </p>
              </div>
              <span style={styles.supplyCardLink}>EXPLORE RANGE →</span>
            </Link>

            {/* Item 6 */}
            <Link to="/products/fixtures" style={styles.supplyCard} className="supply-card">
              <div>
                <span style={styles.supplyCardNum}>06</span>
                <h4 style={styles.supplyCardTitle}>Custom Fixtures</h4>
                <p style={styles.supplyCardDesc}>
                  Bespoke workholding engineered around part geometry
                </p>
              </div>
              <span style={styles.supplyCardLink}>EXPLORE RANGE →</span>
            </Link>
          </div>

          <div style={styles.supplyBottomBox}>
            <p style={styles.supplyBottomText}>
              We handle the full picture — supply, integration, and application support
              — so you get total control over your automation, not just a component.
            </p>
            <Link to="/products/detron" style={styles.btnRedPrimary}>
              VIEW ALL PRODUCTS &gt;
            </Link>
          </div>
        </section>
      </div>

      {/* 5. ENGINEERING SPECIALTIES */}
      <div style={styles.sectionWrapperClip}>
        <section ref={specialtiesRef} style={styles.sectionBoxCard} className="section-box">
          <div style={styles.sectionHeader}>
            <span style={styles.panelBadge}>OUR EXPERTISE</span>
            <h2 style={styles.sectionTitle}>What We Bring to Every Project</h2>
            <p style={styles.sectionSubtext}>
              Our engineering capabilities span beyond standard distribution, providing
              manufacturers with deep technical value.
            </p>
          </div>

          <div style={styles.specialtiesGrid}>
            {[
              "4th & 5th Axis CNC Interfacing",
              "Fanuc, Mitsubishi, Siemens & Heidenhain Controls",
              "Direct Drive (DDR) Integration",
              "Hydraulic Fixture & Rotary Systems",
              "Jig Control Logic & Safety Interlocks",
              "Servo Tuning & Cable Management",
            ].map((specialty, idx) => (
              <div key={idx} style={styles.specialtyItem} className="specialty-item">
                <div style={styles.specialtyIconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E30613" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span style={styles.specialtyText}>{specialty}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. WHY MANUFACTURERS CHOOSE AXIS */}
      <div style={styles.sectionWrapperClip}>
        <section ref={whyChooseUsRef} style={styles.sectionBoxCard} className="section-box">
          <div style={styles.sectionHeader}>
            <span style={styles.panelBadge}>THE AXIS ADVANTAGE</span>
            <h2 style={styles.sectionTitle}>Why Manufacturers Choose Axis</h2>
          </div>

          <div style={styles.chooseGrid}>
            <div style={styles.chooseCard} className="choose-card">
              <h4 style={styles.chooseCardTitle}>Stock on Hand, Not on Paper</h4>
              <p style={styles.chooseCardText}>
                Fast-moving Detron models ready for immediate delivery, minimizing
                your lead times.
              </p>
            </div>

            <div style={styles.chooseCard} className="choose-card">
              <h4 style={styles.chooseCardTitle}>Turnkey Integration</h4>
              <p style={styles.chooseCardText}>
                Interfacing, controls, and safety logic—we don't just drop off a box,
                we make it run.
              </p>
            </div>

            <div style={styles.chooseCard} className="choose-card">
              <h4 style={styles.chooseCardTitle}>A Decade of Proof</h4>
              <p style={styles.chooseCardText}>
                Trusted by STM, BFW, Hurco, LMW, AMS, and Phillips since 2014 across
                thousands of machines.
              </p>
            </div>

            <div style={styles.chooseCard} className="choose-card">
              <h4 style={styles.chooseCardTitle}>Senior Engineering Attention</h4>
              <p style={styles.chooseCardText}>
                A focused 11–50 person team that understands your machining
                application inside-out.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 7. ADVANCED APPLICATION TECHNOLOGY (BEST PRACTICES) */}
      <div style={styles.sectionWrapperClip}>
        <section style={styles.sectionBoxCard} className="section-box">
          <div style={styles.sectionHeader}>
            <span style={styles.panelBadge}>QUALITY STANDARDS</span>
            <h2 style={styles.sectionTitle}>We Follow Best Practices</h2>
          </div>

          <div style={styles.practicesGrid}>
            {[
              { title: "Latest Designs", desc: "Using advanced engineering CAD standards." },
              { title: "Modern Technology", desc: "Precision CNC hardware and electrical control design." },
              { title: "Projects Delivered On Time", desc: "Rigorous milestone scheduling and delivery support." },
              { title: "Improved Machine Processes", desc: "Engineered to increase machining efficiency and tool life." },
            ].map((practice, idx) => (
              <div key={idx} style={styles.practiceItem}>
                <div style={styles.practicePoint} />
                <h4 style={styles.practiceTitle}>{practice.title}</h4>
                <p style={styles.practiceDesc}>{practice.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 8. TRUSTED BY */}
      <div style={styles.sectionWrapperClip}>
        <section style={styles.sectionBoxCard} className="section-box">
          <div style={styles.trustedByContainer}>
            <h3 style={styles.trustedByTitle}>
              Trusted by India's Leading Machine Tool Builders
            </h3>
            <div style={styles.marqueeWrapper}>
              <span style={styles.marqueeItem}>STM</span>
              <span style={styles.marqueeDot}>·</span>
              <span style={styles.marqueeItem}>BFW</span>
              <span style={styles.marqueeDot}>·</span>
              <span style={styles.marqueeItem}>Hurco</span>
              <span style={styles.marqueeDot}>·</span>
              <span style={styles.marqueeItem}>LMW</span>
              <span style={styles.marqueeDot}>·</span>
              <span style={styles.marqueeItem}>AMS</span>
              <span style={styles.marqueeDot}>·</span>
              <span style={styles.marqueeItem}>Phillips</span>
            </div>
          </div>
        </section>
      </div>

      {/* 9. STATS BAR */}
      <div style={styles.sectionWrapperClip}>
        <section ref={statsBarRef} style={styles.statsSectionBordered} className="section-box">
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statVal} className="stat-val">2014</span>
              <span style={styles.statLabel}>Founded</span>
            </div>
            <div style={styles.statsDivider} />
            <div style={styles.statCard}>
              <span style={styles.statVal} className="stat-val">82</span>
              <span style={styles.statLabel}>Rotary Table Models</span>
            </div>
            <div style={styles.statsDivider} />
            <div style={styles.statCard}>
              <span style={styles.statVal} className="stat-val">Ø125–800mm</span>
              <span style={styles.statLabel}>Table Range</span>
            </div>
            <div style={styles.statsDivider} />
            <div style={styles.statCard}>
              <span style={styles.statVal} className="stat-val">10+ Years</span>
              <span style={styles.statLabel}>In Business</span>
            </div>
          </div>
        </section>
      </div>

      {/* 10. CLOSING CTA */}
      <div style={styles.sectionWrapperClip}>
        <section style={styles.sectionBoxCard} className="section-box">
          <div style={styles.closingCtaContent}>
            <h2 style={styles.closingCtaTitle}>
              Have a Machine That Needs to Work Harder?
            </h2>
            <p style={styles.closingCtaDesc}>
              Tell us what you're building, what you're machining, or what's slowing
              down your line — we'll tell you honestly whether a stock Detron table
              fits, or whether it's a custom fixture job.
            </p>
            <div style={styles.closingButtonContainer}>
              <Link to="/contact" className="cta">
                <span className="span">Request a Quote</span>
                <span className="second">
                  <svg width="20px" height="10px" viewBox="0 0 22 10" fill="none">
                    <path d="M2 1 L5 5 L2 9 H5 L8 5 L5 1 Z" className="one" />
                    <path d="M8 1 L11 5 L8 9 H11 L14 5 L11 1 Z" className="two" />
                    <path d="M14 1 L17 5 L14 9 H17 L20 5 L17 1 Z" className="three" />
                  </svg>
                </span>
              </Link>
              <Link to="/contact" className="cta-dark">
                <span className="span">Talk to Our Engineers</span>
                <span className="second">
                  <svg width="20px" height="10px" viewBox="0 0 22 10" fill="none">
                    <path d="M2 1 L5 5 L2 9 H5 L8 5 L5 1 Z" className="one" />
                    <path d="M8 1 L11 5 L8 9 H11 L14 5 L11 1 Z" className="two" />
                    <path d="M14 1 L17 5 L14 9 H17 L20 5 L17 1 Z" className="three" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
    backgroundColor: "#f8fafc",
    color: "#0f172a",
    margin: 0,
    padding: 0,
  },

  pinnedHeroWrapper: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  heroVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
    zIndex: 0,
  },
  heroVideoOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 100%)",
    zIndex: 1,
  },
  heroTextOverlay: {
    position: "relative",
    zIndex: 10,
    maxWidth: "950px",
    textAlign: "center",
    padding: "20px",
    marginTop: "60px",
    textShadow: "0 2px 10px rgba(0,0,0,0.9)",
  },
  heroBadge: {
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
    color: "#E30613",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "8px 16px",
    borderLeft: "3px solid #E30613",
    borderRadius: "2px",
    display: "inline-block",
    marginBottom: "16px",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#ffffff",
    margin: "10px 0 20px 0",
    lineHeight: "1.25",
    letterSpacing: "-0.5px",
  },
  heroRedHighlight: { color: "#E30613" },
  heroDescription: {
    fontSize: "16px",
    color: "#cbd5e1",
    lineHeight: "1.7",
    maxWidth: "750px",
    margin: "0 auto 32px auto",
  },
  heroButtonContainer: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  btnRedPrimary: {
    backgroundColor: "#E30613",
    color: "#ffffff",
    padding: "14px 32px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1px",
    boxShadow: "0 4px 14px rgba(227, 6, 19, 0.4)",
    transition: "background-color 0.2s, transform 0.2s",
    display: "inline-block",
  },
  btnOutline: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#ffffff",
    padding: "14px 32px",
    borderRadius: "4px",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1px",
    border: "2px solid #ffffff",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.2s, border-color 0.2s",
    display: "inline-block",
  },

  scrollWrapperClip: { width: "100%", overflowX: "hidden" },
  categorySection: {
    position: "relative",
    zIndex: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "32px",
    padding: "80px 48px",
    backgroundColor: "#f8fafc",
  },
  categoryCard: {
    position: "relative",
    borderRadius: "8px",
    borderTop: "4px solid #E30613",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    minHeight: "420px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  imageWrapper: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  zoomableImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  cardContentOverlay: {
    position: "relative",
    zIndex: 10,
    flexGrow: 1,
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 100%)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
  },
  cardTag: {
    fontSize: "11px",
    fontWeight: "900",
    color: "#E30613",
    letterSpacing: "1.5px",
    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
  },
  cardTitle: {
    fontSize: "28px",
    fontWeight: "900",
    color: "#ffffff",
    margin: "12px 0 16px 0",
    textShadow: "0 2px 8px rgba(0,0,0,0.9)",
  },
  cardText: {
    fontSize: "14.5px",
    color: "#cbd5e1",
    lineHeight: "1.65",
    textShadow: "0 1px 5px rgba(0,0,0,0.9)",
  },
  cardRedButton: {
    color: "#E30613",
    fontWeight: "800",
    fontSize: "13px",
    letterSpacing: "0.5px",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "24px",
    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
  },

  aboutWrapperClip: {
    width: "100%",
    overflowX: "hidden",
    backgroundColor: "transparent",
    padding: "80px 24px",
    boxSizing: "border-box",
  },
  sectionWrapperClip: {
    width: "100%",
    overflowX: "hidden",
    backgroundColor: "transparent",
    padding: "40px 24px",
    boxSizing: "border-box",
  },
  sectionBoxCard: {
    position: "relative",
    zIndex: 20,
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    padding: "60px",
    backgroundColor: "#ffffff",
    maxWidth: "1300px",
    margin: "0 auto",
    borderRadius: "12px",
    border: "3px solid #cbd5e1",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },
  aboutSectionBordered: {
    position: "relative",
    zIndex: 20,
    padding: "60px",
    backgroundColor: "#ffffff",
    maxWidth: "1300px",
    margin: "0 auto",
    borderRadius: "12px",
    border: "3px solid #cbd5e1",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  statsSectionBordered: {
    position: "relative",
    zIndex: 20,
    padding: "48px",
    backgroundColor: "#E30613",
    maxWidth: "1300px",
    margin: "0 auto",
    borderRadius: "12px",
    border: "1px solid #E30613",
    boxShadow: "0 20px 50px rgba(227, 6, 19, 0.18)",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  aboutTextCol: {
    flex: "1 1 500px",
    maxWidth: "580px",
    minWidth: "300px",
    color: "#0f172a",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    boxSizing: "border-box",
  },
  aboutTitle: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#0f172a",
    margin: "10px 0 6px 0",
    letterSpacing: "-0.5px",
  },
  aboutSubheading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#475569",
    marginBottom: "24px",
  },
  aboutMissionBox: {
    borderLeft: "4px solid #E30613",
    paddingLeft: "20px",
    marginBottom: "24px",
    backgroundColor: "#f8fafc",
    padding: "16px 20px",
    borderRadius: "0 8px 8px 0",
  },
  aboutMissionText: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#1e293b",
    margin: 0,
  },
  aboutParagraph: {
    fontSize: "14.5px",
    lineHeight: "1.7",
    color: "#334155",
    marginBottom: "18px",
  },
  aboutImageCol: {
    flex: "1 1 580px",
    maxWidth: "600px",
    minWidth: "320px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  aboutImageCompositeWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  aboutImage: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
    display: "block",
    border: "1px solid #e2e8f0",
  },
  aboutWorkerOverImage: {
    position: "absolute",
    right: "-60px",
    bottom: "-80px",
    height: "105%",
    maxHeight: "420px",
    zIndex: 3,
    pointerEvents: "none",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  aboutWorkerImage: {
    height: "100%",
    width: "auto",
    objectFit: "contain",
    display: "block",
    filter: "drop-shadow(-8px 12px 20px rgba(0,0,0,0.25))",
  },
  aboutBgWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
  },
  aboutBgImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.05,
  },
  aboutLogoRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  aboutLogoTitle: {
    fontSize: "24px",
    fontWeight: "900",
    letterSpacing: "2px",
    lineHeight: "1.2",
  },
  aboutLogoAxis: {
    color: "#E30613",
  },
  aboutLogoRest: {
    color: "#0f172a",
  },
  aboutDescription: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#475569",
    marginBottom: "28px",
  },
  aboutFlexRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "60px",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  aboutImageWithBorder: {
    width: "100%",
    maxWidth: "580px",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
    display: "block",
    border: "8px solid #cbd5e1",
    boxSizing: "border-box",
  },
  aboutRightDescription: {
    fontSize: "14.5px",
    lineHeight: "1.7",
    color: "#475569",
    marginTop: "24px",
    textAlign: "left",
    width: "100%",
    maxWidth: "580px",
  },

  supplySection: {
    backgroundColor: "transparent",
    padding: "0",
    textAlign: "center",
  },
  sectionHeader: {
    maxWidth: "800px",
    margin: "0 auto 12px auto",
    textAlign: "center",
  },
  panelBadge: {
    fontSize: "11px",
    color: "#E30613",
    fontWeight: "900",
    letterSpacing: "2px",
    display: "inline-block",
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#0f172a",
    margin: "0 0 16px 0",
    letterSpacing: "-0.5px",
  },
  sectionSubtext: {
    fontSize: "15px",
    color: "#475569",
    lineHeight: "1.6",
  },
  supplyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    width: "100%",
  },
  supplyCard: {
    backgroundColor: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "6px",
    padding: "32px",
    textAlign: "left",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "220px",
    boxSizing: "border-box",
  },
  supplyCardNum: {
    fontSize: "14px",
    fontWeight: "900",
    color: "#E30613",
    fontFamily: "monospace",
  },
  supplyCardTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "12px 0 8px 0",
  },
  supplyCardDesc: {
    fontSize: "13px",
    color: "#475569",
    lineHeight: "1.5",
    margin: 0,
    flexGrow: 1,
  },
  supplyCardLink: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#E30613",
    marginTop: "16px",
    display: "block",
  },
  supplyBottomBox: {
    marginTop: "12px",
    textAlign: "center",
  },
  supplyBottomText: {
    fontSize: "15px",
    color: "#475569",
    marginBottom: "24px",
    fontWeight: "600",
  },

  specialtiesSection: {
    backgroundColor: "transparent",
    padding: "0",
  },
  specialtiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
    width: "100%",
  },
  specialtyItem: {
    backgroundColor: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "6px",
    padding: "24px 28px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
  },
  specialtyIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(227, 6, 19, 0.05)",
    borderRadius: "50%",
    flexShrink: 0,
  },
  specialtyText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e293b",
  },

  chooseSection: {
    backgroundColor: "transparent",
    padding: "0",
  },
  chooseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
    width: "100%",
  },
  chooseCard: {
    backgroundColor: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "6px",
    padding: "32px",
    textAlign: "left",
  },
  chooseCardTitle: {
    fontSize: "18px",
    fontWeight: "850",
    color: "#0f172a",
    margin: "0 0 12px 0",
  },
  chooseCardText: {
    fontSize: "13.5px",
    color: "#475569",
    lineHeight: "1.6",
    margin: 0,
  },

  practicesSection: {
    backgroundColor: "transparent",
    padding: "0",
  },
  practicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "32px",
    width: "100%",
  },
  practiceItem: {
    textAlign: "left",
    position: "relative",
    paddingLeft: "24px",
  },
  practicePoint: {
    position: "absolute",
    left: 0,
    top: "8px",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#E30613",
  },
  practiceTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 8px 0",
  },
  practiceDesc: {
    fontSize: "13px",
    color: "#475569",
    lineHeight: "1.5",
    margin: 0,
  },

  trustedBySection: {
    backgroundColor: "transparent",
    padding: "0",
  },
  trustedByContainer: {
    width: "100%",
    textAlign: "center",
  },
  trustedByTitle: {
    fontSize: "12px",
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "24px",
  },
  marqueeWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "28px",
  },
  marqueeItem: {
    fontSize: "24px",
    fontWeight: "900",
    color: "#475569",
    letterSpacing: "1px",
  },
  marqueeDot: {
    fontSize: "24px",
    fontWeight: "900",
    color: "#E30613",
  },

  statsBar: {
    backgroundColor: "#E30613",
    padding: "0",
    color: "#ffffff",
  },
  statsGrid: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: "24px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "150px",
  },
  statVal: {
    fontSize: "36px",
    fontWeight: "900",
    letterSpacing: "-0.5px",
  },
  statLabel: {
    fontSize: "11px",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginTop: "6px",
    color: "rgba(255, 255, 255, 0.85)",
  },
  statsDivider: {
    width: "1px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },

  closingCta: {
    backgroundColor: "transparent",
    padding: "0",
    textAlign: "center",
  },
  closingCtaContent: {
    width: "100%",
    margin: "0 auto",
  },
  closingCtaTitle: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "16px",
    letterSpacing: "-0.5px",
  },
  closingCtaDesc: {
    fontSize: "15.5px",
    color: "#475569",
    lineHeight: "1.75",
    marginBottom: "32px",
  },
  closingButtonContainer: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};
