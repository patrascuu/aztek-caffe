/**
 * AZTEK COFFEE — Landing Page
 * Design: "Petroșani Nights" — Dark atmospheric luxury café
 * Colors: Espresso black (#13120b), amber gold (#d4a853), warm brown (#5a4735), cream (#eeeae6)
 * Typography: Cormorant Garamond (display) + Nunito Sans (body)
 * Language: Romanian
 */

import { useEffect, useRef, useState } from "react";

// Image CDN URLs
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663479535422/oV8S9ZHRwfvL5kpQimLtnV/aztek-hero-j4pUF4mPu9UuusUDLFNTXp.webp";
const BEANS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663479535422/oV8S9ZHRwfvL5kpQimLtnV/aztek-coffee-beans-RbP2K6uDQYZHFQCV7E64ha.webp";
const ESPRESSO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663479535422/oV8S9ZHRwfvL5kpQimLtnV/aztek-espresso-N3bfkBX9Nyg5oxWYeVBCbR.webp";
const COCKTAIL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663479535422/oV8S9ZHRwfvL5kpQimLtnV/aztek-cocktail-Ct98hBJYbSxU6t6XbxMNFR.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663479535422/oV8S9ZHRwfvL5kpQimLtnV/aztek-interior-HsYqUXgtvufGSjmuHxMc8H.webp";

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#despre", label: "Despre" },
    { href: "#meniu", label: "Meniu" },
    { href: "#atmosfera", label: "Atmosferă" },
    { href: "#evenimente", label: "Evenimente" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
        background: scrolled ? "rgba(19,18,11,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(212,168,83,0.15)" : "none",
        padding: "0 2rem",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.08em" }}>
              AZTEK
            </span>
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "#c8c6c0", letterSpacing: "0.35em", textTransform: "uppercase", marginTop: "-2px" }}>
              COFFEE · PETROȘANI
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#c8c6c0",
                textDecoration: "none",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4a853")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#c8c6c0")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+40730079401"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#13120b",
              background: "#d4a853",
              padding: "0.5rem 1.25rem",
              borderRadius: "2px",
              textDecoration: "none",
              letterSpacing: "0.08em",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8c87a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#d4a853")}
          >
            Rezervă
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#d4a853", cursor: "pointer", padding: "8px" }}
          className="show-mobile"
          aria-label="Meniu"
        >
          <div style={{ width: "24px", height: "2px", background: "#d4a853", marginBottom: "5px", transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <div style={{ width: "24px", height: "2px", background: "#d4a853", marginBottom: "5px", opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <div style={{ width: "24px", height: "2px", background: "#d4a853", transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(19,18,11,0.98)", borderTop: "1px solid rgba(212,168,83,0.2)", padding: "1.5rem 2rem 2rem" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", color: "#eeeae6", textDecoration: "none", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.08em" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+40730079401"
            style={{ display: "block", marginTop: "1.5rem", textAlign: "center", background: "#d4a853", color: "#13120b", padding: "0.85rem", fontWeight: 600, textDecoration: "none", letterSpacing: "0.08em", borderRadius: "2px" }}
          >
            +40 730 079 401
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(19,18,11,0.92) 0%, rgba(19,18,11,0.7) 50%, rgba(19,18,11,0.5) 100%)",
        }}
      />
      {/* Grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1320px", margin: "0 auto", padding: "0 2rem", paddingTop: "100px", paddingBottom: "80px" }}>
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            opacity: 0,
            animation: "fadeInUp 0.8s ease 0.2s forwards",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#d4a853" }} />
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Petroșani, România
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 300,
            color: "#eeeae6",
            lineHeight: 0.95,
            marginBottom: "0.2em",
            opacity: 0,
            animation: "fadeInUp 0.9s ease 0.4s forwards",
          }}
        >
          Aztek
        </h1>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 600,
            fontStyle: "italic",
            color: "#d4a853",
            lineHeight: 0.95,
            marginBottom: "0.6em",
            opacity: 0,
            animation: "fadeInUp 0.9s ease 0.55s forwards",
          }}
        >
          Coffee
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#c8c6c0",
            marginBottom: "2.5rem",
            maxWidth: "480px",
            lineHeight: 1.6,
            opacity: 0,
            animation: "fadeInUp 0.9s ease 0.7s forwards",
          }}
        >
          Cafea de origini, proaspăt prăjită —<br />
          gustul care definește Petroșaniul.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            opacity: 0,
            animation: "fadeInUp 0.9s ease 0.85s forwards",
          }}
        >
          <a
            href="#meniu"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#13120b",
              background: "#d4a853",
              padding: "1rem 2.5rem",
              textDecoration: "none",
              borderRadius: "2px",
              transition: "background 0.25s, transform 0.25s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#e8c87a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#d4a853"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Descoperă Meniul
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#d4a853",
              background: "transparent",
              padding: "1rem 2.5rem",
              textDecoration: "none",
              border: "1px solid rgba(212,168,83,0.5)",
              borderRadius: "2px",
              transition: "border-color 0.25s, color 0.25s, transform 0.25s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#d4a853"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.5)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Găsește-ne
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0,
            animation: "fadeIn 1s ease 1.5s forwards",
          }}
        >
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.65rem", color: "#7d6855", letterSpacing: "0.2em", textTransform: "uppercase" }}></span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #d4a853, transparent)", animation: "shimmer 2s infinite" }} />
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="despre" style={{ background: "#13120b", padding: "7rem 0", position: "relative", overflow: "hidden" }}>
      {/* Decorative large text */}
      <div style={{ position: "absolute", top: "50%", right: "-2rem", transform: "translateY(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8rem, 20vw, 18rem)", fontWeight: 700, color: "rgba(212,168,83,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em" }}>
        AZTEK
      </div>

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* Left: Image */}
          <AnimatedSection>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  backgroundImage: `url(${BEANS_IMG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "2px",
                }}
              />
              {/* Decorative gold frame */}
              <div style={{ position: "absolute", top: "-16px", left: "-16px", right: "16px", bottom: "16px", border: "1px solid rgba(212,168,83,0.25)", borderRadius: "2px", pointerEvents: "none" }} />
              {/* Badge */}
              <div style={{ position: "absolute", bottom: "2rem", right: "-1.5rem", background: "#d4a853", padding: "1.25rem 1.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 700, color: "#13120b", lineHeight: 1 }}>100%</div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#13120b", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>Specialty</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Text */}
          <AnimatedSection delay={200}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "1px", background: "#d4a853" }} />
                <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                  Povestea noastră
                </span>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 400, color: "#eeeae6", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Unde cafeaua<br />
                <em style={{ color: "#d4a853" }}>devine artă</em>
              </h2>

              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", fontWeight: 300, color: "#a09890", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Aztek Coffee s-a născut din pasiunea pentru cafeaua autentică, proaspăt prăjită, adusă din cele mai bune origini ale lumii. În inima Petroșaniului, am creat un spațiu unde fiecare ceașcă spune o poveste.
              </p>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", fontWeight: 300, color: "#a09890", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Folosim boabe selectate cu grijă, prăjite la perfecție pentru a scoate în evidență notele unice ale fiecărei origini — de la aciditatea fructată a cafelei etiopiene, la corpul bogat al celei braziliene.
              </p>

              {/* Stats */}
              <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", borderTop: "1px solid rgba(212,168,83,0.15)", paddingTop: "2rem" }}>
                {[
                  { num: "15+", label: "Origini de cafea" },
                  { num: "8K+", label: "Clienți fericiți" },
                  { num: "5★", label: "Atmosferă unică" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 600, color: "#d4a853", lineHeight: 1 }}>{stat.num}</div>
                    <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 400, color: "#7d6855", marginTop: "4px", letterSpacing: "0.05em" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #despre .grid-2col { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

// Menu Section
function MenuSection() {
  const menuItems = [
    {
      category: "Cafea Specialty",
      image: ESPRESSO_IMG,
      items: [
        { name: "Espresso", desc: "Extras pur, concentrat, cu cremă aurie bogată", price: "8 lei" },
        { name: "Cappuccino", desc: "Espresso cu lapte spumat catifelat și artă latte", price: "12 lei" },
        { name: "Flat White", desc: "Espresso dublu cu microspumă de lapte", price: "14 lei" },
        { name: "Ice Coffee Aztek", desc: "Cafea rece cu ciocolată și condimente aztece", price: "16 lei" },
        { name: "Cold Brew", desc: "Infuzat 24h la rece, neted și răcoritor", price: "15 lei" },
      ],
    },
    {
      category: "Cocktailuri & Bar",
      image: COCKTAIL_IMG,
      items: [
        { name: "Espresso Martini", desc: "Vodka, espresso proaspăt, lichior de cafea", price: "28 lei" },
        { name: "Aztek Negroni", desc: "Gin, Campari, vermouth cu twist de cafea", price: "30 lei" },
        { name: "Coffee Old Fashioned", desc: "Whiskey bourbon, sirop de cafea, angostura", price: "32 lei" },
        { name: "Aperol Spritz", desc: "Aperol, prosecco, apă minerală, portocală", price: "25 lei" },
        { name: "Vin de casă", desc: "Selecție locală, roșu sau alb", price: "18 lei" },
      ],
    },
  ];

  return (
    <section id="meniu" style={{ background: "#0e0a07", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #d4a853)" }} />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Selecția noastră
              </span>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, #d4a853)" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#eeeae6", lineHeight: 1.1 }}>
              Meniu <em style={{ color: "#d4a853" }}>Aztek</em>
            </h2>
          </div>
        </AnimatedSection>

        {/* Menu categories */}
        <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {menuItems.map((category, idx) => (
            <AnimatedSection key={category.category} delay={idx * 150}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,168,83,0.12)", borderRadius: "4px", overflow: "hidden" }}>
                {/* Category image */}
                <div
                  style={{
                    height: "220px",
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,10,7,0.9) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#eeeae6", lineHeight: 1 }}>
                      {category.category}
                    </h3>
                  </div>
                </div>

                {/* Items */}
                <div style={{ padding: "1.5rem" }}>
                  {category.items.map((item, i) => (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "0.875rem 0",
                        borderBottom: i < category.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      }}
                    >
                      <div style={{ flex: 1, paddingRight: "1rem" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, color: "#eeeae6", marginBottom: "3px" }}>
                          {item.name}
                        </div>
                        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: "#7d6855", lineHeight: 1.4 }}>
                          {item.desc}
                        </div>
                      </div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "#d4a853", whiteSpace: "nowrap" }}>
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Note */}
        <AnimatedSection delay={300}>
          <p style={{ textAlign: "center", marginTop: "3rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: "#5a4735" }}>
            * Meniu complet disponibil la cafenea. Prețurile pot varia în funcție de sezon.
          </p>
        </AnimatedSection>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #meniu .grid-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// Atmosphere Section
function AtmosphereSection() {
  return (
    <section id="atmosfera" style={{ position: "relative", overflow: "hidden" }}>
      {/* Full-bleed image */}
      <div
        style={{
          position: "relative",
          height: "70vh",
          backgroundImage: `url(${INTERIOR_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(19,18,11,0.85) 0%, rgba(19,18,11,0.4) 60%, rgba(19,18,11,0.2) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", maxWidth: "1320px", margin: "0 auto", padding: "0 2rem" }}>
          <AnimatedSection>
            <div style={{ maxWidth: "520px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "1px", background: "#d4a853" }} />
                <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                  Atmosfera
                </span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#eeeae6", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                Un loc unde<br />
                <em style={{ color: "#d4a853" }}>timpul se oprește</em>
              </h2>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", fontWeight: 300, color: "#c8c6c0", lineHeight: 1.8, marginBottom: "2rem" }}>
                Aztek Caffe este mai mult decât o cafenea — este un spațiu cultural viu, unde muzica bună, arta și cafeaua de calitate se întâlnesc. Fie că vii pentru un espresso de dimineață sau pentru o seară acustică, atmosfera noastră te va face să te simți acasă.
              </p>
              <div style={{ display: "flex", gap: "2rem" }}>
                {[
                  { icon: "☕", label: "Cafea Specialty" },
                  { icon: "🎵", label: "Seri Muzicale" },
                  { icon: "🍷", label: "Bar & Cocktailuri" },
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>{item.icon}</div>
                    <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 500, color: "#d4a853", letterSpacing: "0.08em" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Events Section
function EventsSection() {
  const events = [
    {
      icon: "🎸",
      title: "Seri Acustice",
      desc: "În fiecare weekend, Aztek Caffe se transformă într-o scenă intimă pentru artiști locali și invitați speciali. Muzică live, atmosferă caldă și cafeaua ta preferată.",
      tag: "Weekend",
    },
    {
      icon: "🎨",
      title: "Zilele AztekArt",
      desc: "Evenimentul cultural anual care aduce împreună muzică, artă vizuală și gastronomie. Patru zile de experiențe unice în inima Petroșaniului.",
      tag: "Anual",
    },
    {
      icon: "🏢",
      title: "Evenimente Corporate",
      desc: "Organizăm sesiuni de bar office, cocktail parties, aperitive sociale și evenimente corporate personalizate. Contactați-ne pentru pachete speciale.",
      tag: "La cerere",
    },
    {
      icon: "🎂",
      title: "Petreceri Private",
      desc: "Sărbătorește momentele speciale la Aztek. Oferim pachete complete pentru aniversări, petreceri tematice și reuniuni de prieteni.",
      tag: "Rezervare",
    },
  ];

  return (
    <section id="evenimente" style={{ background: "#13120b", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2rem" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #d4a853)" }} />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Viața la Aztek
              </span>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, #d4a853)" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#eeeae6", lineHeight: 1.1 }}>
              <em style={{ color: "#d4a853" }}>Evenimente</em> & Experiențe
            </h2>
          </div>
        </AnimatedSection>

        <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {events.map((event, idx) => (
            <AnimatedSection key={event.title} delay={idx * 100}>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(212,168,83,0.1)",
                  borderRadius: "4px",
                  padding: "2rem",
                  transition: "border-color 0.3s, background 0.3s, transform 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(212,168,83,0.4)";
                  el.style.background = "rgba(212,168,83,0.04)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(212,168,83,0.1)";
                  el.style.background = "rgba(255,255,255,0.02)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "2rem" }}>{event.icon}</span>
                  <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.15em", textTransform: "uppercase", background: "rgba(212,168,83,0.1)", padding: "4px 10px", borderRadius: "2px" }}>
                    {event.tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: "#eeeae6", marginBottom: "0.75rem" }}>
                  {event.title}
                </h3>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "#7d6855", lineHeight: 1.7 }}>
                  {event.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #evenimente .grid-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// Testimonials
function TestimonialsSection() {
  const reviews = [
    { text: "Cel mai bun loc din oraș pentru o băutură. Vibe-ul este incredibil, angajații sunt super. Recomand cu căldură!", author: "Ianc Darius", stars: 5 },
    { text: "Cafea excelentă! Exact ce aveam nevoie înainte de a urca pe Transalpina. Atmosfera vibrantă și plină de energie.", author: "Matt James", stars: 5 },
    { text: "Un spațiu cultural unic în Petroșani. Evenimentele muzicale sunt de neuitat. Revenim mereu cu drag.", author: "Elena M.", stars: 5 },
  ];

  return (
    <section style={{ background: "linear-gradient(135deg, #0e0a07 0%, #1a1208 100%)", padding: "7rem 0", position: "relative", overflow: "hidden" }}>
      {/* Decorative */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2rem" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #d4a853)" }} />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Ce spun clienții
              </span>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, #d4a853)" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#eeeae6" }}>
              Vocile <em style={{ color: "#d4a853" }}>comunității</em>
            </h2>
          </div>
        </AnimatedSection>

        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {reviews.map((review, idx) => (
            <AnimatedSection key={review.author} delay={idx * 120}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,168,83,0.1)", borderRadius: "4px", padding: "2rem", position: "relative" }}>
                {/* Quote mark */}
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", color: "rgba(212,168,83,0.15)", lineHeight: 0.8, marginBottom: "1rem", fontWeight: 700 }}>"</div>
                {/* Stars */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                  {[...Array(review.stars)].map((_, i) => (
                    <span key={i} style={{ color: "#d4a853", fontSize: "0.9rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#c8c6c0", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {review.text}
                </p>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.08em" }}>
                  — {review.author}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section .grid-3col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" style={{ background: "#13120b", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2rem" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #d4a853)" }} />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Vino la noi
              </span>
              <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, #d4a853)" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#eeeae6" }}>
              <em style={{ color: "#d4a853" }}>Găsește-ne</em> în Petroșani
            </h2>
          </div>
        </AnimatedSection>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Contact info */}
          <AnimatedSection>
            <div>
              <div style={{ display: "grid", gap: "2rem" }}>
                {/* Address */}
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>
                    📍
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Adresă</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#eeeae6", lineHeight: 1.5 }}>
                      Strada 1 Decembrie 1918 80<br />
                      332024 Petroșani, Hunedoara<br />
                      România
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>
                    📞
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Telefon</div>
                    <a href="tel:+40730079401" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#eeeae6", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#d4a853")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#eeeae6")}
                    >
                      +40 730 079 401
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>
                    🕐
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Program</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#eeeae6", lineHeight: 1.6 }}>
                      Luni — Vineri: 09:00 – 22:00<br />
                      Sâmbătă — Duminică: 09:00 – 23:00
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(212,168,83,0.15)" }}>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                  Urmărește-ne
                </div>
                <div className="social-links" style={{ display: "flex", gap: "1rem" }}>
                  <a
                    href="https://www.instagram.com/aztekcaffe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(212,168,83,0.15)",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "2px",
                      textDecoration: "none",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.5)"; e.currentTarget.style.background = "rgba(212,168,83,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500, color: "#eeeae6" }}>@aztekcaffe</span>
                  </a>
                  <a
                    href="https://www.facebook.com/aztek.caffepetrosani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(212,168,83,0.15)",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "2px",
                      textDecoration: "none",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.5)"; e.currentTarget.style.background = "rgba(212,168,83,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#d4a853">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500, color: "#eeeae6" }}>Aztek Caffe</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Map embed */}
          <AnimatedSection delay={200}>
            <div style={{ position: "relative" }}>
              <div style={{ border: "1px solid rgba(212,168,83,0.2)", borderRadius: "4px", overflow: "hidden", height: "420px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.123456789!2d23.3700!3d45.4100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c5b0000000001%3A0x0!2sStrada+1+Decembrie+1918+80%2C+Petro%C8%99ani!5e0!3m2!1sro!2sro!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aztek Coffee pe hartă"
                />
              </div>
              {/* CTA overlay */}
              <div className="contact-cta" style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                <a
                  href="https://maps.google.com/?q=Strada+1+Decembrie+1918+80,+Petrosani,+Romania"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#13120b",
                    background: "#d4a853",
                    padding: "0.9rem",
                    textDecoration: "none",
                    borderRadius: "2px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e8c87a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#d4a853")}
                >
                  Deschide în Maps
                </a>
                <a
                  href="tel:+40730079401"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#d4a853",
                    background: "transparent",
                    padding: "0.9rem",
                    textDecoration: "none",
                    border: "1px solid rgba(212,168,83,0.4)",
                    borderRadius: "2px",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#d4a853")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.4)")}
                >
                  Sună Acum
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{ background: "#0e0a07", borderTop: "1px solid rgba(212,168,83,0.15)", padding: "3rem 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.08em" }}>AZTEK</span>
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "#5a4735", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginTop: "-4px" }}>COFFEE · PETROȘANI</span>
            </div>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#5a4735", lineHeight: 1.7, maxWidth: "280px" }}>
              Cafea de origini, proaspăt prăjită. Un spațiu cultural viu în inima Petroșaniului, unde cafeaua devine artă.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Navigare
            </div>
            {["Despre", "Meniu", "Atmosferă", "Evenimente", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("ă", "a").replace("ș", "s")}`}
                style={{ display: "block", fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#5a4735", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4a853")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5a4735")}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social */}
          <div>
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#d4a853", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Social Media
            </div>
            <a href="https://www.instagram.com/aztekcaffe/" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#5a4735", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4a853")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5a4735")}
            >
              Instagram — @aztekcaffe
            </a>
            <a href="https://www.facebook.com/aztek.caffepetrosani/" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#5a4735", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4a853")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5a4735")}
            >
              Facebook — Aztek Caffe
            </a>
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#5a4735", marginTop: "1.5rem" }}>
              <div style={{ color: "#7d6855", marginBottom: "4px" }}>📞 +40 730 079 401</div>
              <div style={{ color: "#7d6855" }}>📍 Str. 1 Decembrie 1918 80</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(212,168,83,0.1)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: "#3a3228" }}>
            © 2024 Aztek Coffee Petroșani. Toate drepturile rezervate.
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "#3a3228" }}>
            Cafea de origini, proaspăt prăjită ☕
          </span>
        </div>
      </div>
    </footer>
  );
}

// Responsive CSS injection
function GlobalStyles() {
  return (
    <style>{`
      /* ===== RESPONSIVE GRID FIXES ===== */
      @media (max-width: 768px) {
        .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        .menu-grid { grid-template-columns: 1fr !important; }
        .events-grid { grid-template-columns: 1fr !important; }
        .reviews-grid { grid-template-columns: 1fr !important; }
        .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .footer-bottom { flex-direction: column !important; text-align: center !important; }
        .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        .hero-cta { flex-direction: column !important; }
        .hero-cta a { text-align: center !important; }
        .atmosphere-section { background-attachment: scroll !important; }
        .hero-bg { background-attachment: scroll !important; }
        .badge-right { right: 0 !important; }
      }
      @media (max-width: 480px) {
        .stats-grid { grid-template-columns: 1fr !important; }
        .social-links { flex-direction: column !important; }
        .contact-cta { flex-direction: column !important; }
      }
    `}</style>
  );
}

// Main Home component
export default function Home() {
  return (
    <div style={{ background: "#13120b", minHeight: "100vh" }}>
      <GlobalStyles />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <AtmosphereSection />
      <EventsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
