import { useState, useEffect, useRef } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  red: "#F44336",
  blue: "#2196F3",
  yellow: "#FFEB3B",
  green: "#4CAF50",
  orange: "#FF9800",
  white: "#FFFFFF",
  bgLight: "#F5F8FA",
  textDark: "#263238",
  textMuted: "#607D8B",
};

// ── FALLING SHAPES ────────────────────────────────────────────────────────────
function FallingShapes() {
  const shapes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${2 + (i * 5.3) % 95}%`,
    delay: `${(i * 0.4) % 15}s`,
    duration: `${12 + (i * 1.5) % 10}s`,
    color: [C.red, C.blue, C.yellow, C.green, C.orange][i % 5],
    scale: 0.6 + (i % 4) * 0.2,
    type: i % 4,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, overflow: "hidden" }}>
      <style>{`
        @keyframes floatDown1 {
          0%   { transform: translateY(-5vh) translateX(0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.35; }
          90%  { opacity: 0.35; }
          100% { transform: translateY(105vh) translateX(40px) rotate(360deg); opacity: 0; }
        }
        @keyframes floatDown2 {
          0%   { transform: translateY(-5vh) translateX(0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.25; }
          50%  { transform: translateY(50vh) translateX(-30px) rotate(180deg); }
          90%  { opacity: 0.25; }
          100% { transform: translateY(105vh) translateX(20px) rotate(420deg); opacity: 0; }
        }
      `}</style>
      {shapes.map((s) => (
        <div key={s.id} style={{
          position: "absolute",
          left: s.left,
          top: "-5vh",
          color: s.color,
          transform: `scale(${s.scale})`,
          animation: `${s.type % 2 === 0 ? 'floatDown1' : 'floatDown2'} ${s.duration} ${s.delay} linear infinite`,
        }}>
          {s.type === 0 && ( // Star
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
          {s.type === 1 && ( // Circle
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="10" />
            </svg>
          )}
          {s.type === 2 && ( // Square
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <rect width="18" height="18" rx="3" />
            </svg>
          )}
          {s.type === 3 && ( // Triangle
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ── DECORATIVE HELPERS ────────────────────────────────────────────────────────
function SectionHeader({ subtitle, title, color = C.red }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <p style={{
        fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em",
        color: C.textMuted, textTransform: "uppercase", marginBottom: "0.5rem",
        fontWeight: 700
      }}>{subtitle}</p>
      <h2 style={{
        fontFamily: "'Fredoka One', 'Bubblegum Sans', cursive", fontSize: "clamp(2.5rem, 6vw, 4rem)",
        color: color, margin: 0, letterSpacing: "1px",
        textShadow: "2px 2px 0px rgba(0,0,0,0.05)"
      }}>{title}</h2>
      <div style={{ width: "60px", height: "6px", background: color, margin: "1rem auto", borderRadius: "10px" }} />
    </div>
  );
}

// ── COUNTDOWN ─────────────────────────────────────────────────────────────────
function Countdown() {
  const target = new Date("2026-06-16T16:00:00");
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", val: t.days, color: C.red },
    { label: "Hours", val: t.hours, color: C.blue },
    { label: "Mins", val: t.minutes, color: C.green },
    { label: "Secs", val: t.seconds, color: C.orange },
  ];

  return (
    <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
      {items.map((item) => (
        <div key={item.label} style={{ textAlign: "center" }}>
          <div style={{
            width: "clamp(55px, 15vw, 70px)", height: "clamp(55px, 15vw, 70px)", borderRadius: "16px",
            background: "white",
            border: `clamp(2px, 1vw, 4px) solid ${item.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Fredoka One', cursive",
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)", color: item.color,
            boxShadow: `0 6px 16px ${item.color}33`,
            transform: "rotate(-3deg)",
            transition: "transform 0.3s ease",
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = "rotate(5deg) scale(1.1)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "rotate(-3deg) scale(1)"}
          >
            {String(item.val).padStart(2, "0")}
          </div>
          <div style={{
            fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", fontWeight: "800",
            letterSpacing: "0.1em", color: C.textDark, marginTop: "0.6rem", textTransform: "uppercase"
          }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── RSVP ──────────────────────────────────────────────────────────────────────
function RSVPForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (sent) return (
    <div style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "24px", border: `4px solid ${C.green}`, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
      <img src="/images/elmo.png" alt="Elmo" style={{ width: "100px", marginBottom: "1rem" }} />
      <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2rem", color: C.green }}>Yay! See you there!</h3>
      <p style={{ fontFamily: "'Nunito', sans-serif", color: C.textMuted, fontSize: "1.1rem", marginTop: "1rem" }}>
        We can't wait to celebrate with you!
      </p>
    </div>
  );

  const inp = {
    width: "100%", padding: "1rem 1.2rem",
    background: "#F5F8FA",
    border: `2px solid #E1E8ED`, borderRadius: "12px",
    fontFamily: "'Nunito', sans-serif", fontSize: "1rem", fontWeight: "600",
    color: C.textDark, outline: "none", boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };
  const lbl = {
    display: "block", fontFamily: "'Nunito', sans-serif",
    fontSize: "0.8rem", fontWeight: "800", letterSpacing: "0.1em",
    color: C.textDark, marginBottom: "0.5rem", textTransform: "uppercase",
  };

  return (
    <form
      style={{
        maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(1rem, 3vw, 1.5rem)",
        background: "white", padding: "clamp(1.5rem, 5vw, 2.5rem)", borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        position: "relative",
        borderTop: `8px solid ${C.blue}`
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name") || "Guest";
        const guests = formData.get("guests") || "1";
        const message = formData.get("message") || "No message provided.";
        
        const subject = encodeURIComponent(`Birthday RSVP from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nNumber of Guests: ${guests}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:arvineil13@yahoo.com.ph?subject=${subject}&body=${body}`;
        setSent(true);
      }}
    >
      <img src="/images/cookie.png" alt="Cookie Monster" style={{
        position: "absolute", top: "clamp(-60px, -15vw, -120px)", right: "clamp(-40px, -15vw, -100px)", width: "clamp(200px, 50vw, 400px)",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        animation: "peek 3s ease-in-out infinite alternate"
      }} />
      <style>{`
        @keyframes peek {
          0% { transform: translateY(0) rotate(10deg); }
          100% { transform: translateY(-10px) rotate(-5deg); }
        }
      `}</style>

      <div>
        <label style={lbl}>Guest Name</label>
        <input name="name" type="text" style={inp} placeholder="Who's coming to play?" required
          onFocus={(e) => e.target.style.borderColor = C.blue}
          onBlur={(e) => e.target.style.borderColor = "#E1E8ED"} />
      </div>

      <div>
        <label style={lbl}>Number of Guests</label>
        <select name="guests" style={inp}
          onFocus={(e) => e.target.style.borderColor = C.orange}
          onBlur={(e) => e.target.style.borderColor = "#E1E8ED"}>
          {["1", "2", "3", "4", "5+"].map(n => (
            <option key={n} value={n}>{n} {n === "1" ? "Person" : "People"}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={lbl}>Message for Dane (Optional)</label>
        <textarea name="message" style={{ ...inp, resize: "vertical", minHeight: "100px" }}
          placeholder="Leave a sweet note!"
          onFocus={(e) => e.target.style.borderColor = C.green}
          onBlur={(e) => e.target.style.borderColor = "#E1E8ED"} />
      </div>

      <button type="submit" disabled={loading} style={{
        padding: "1.2rem 2rem",
        background: loading ? "#ccc" : C.red,
        color: "#fff", border: "none", borderRadius: "50px",
        fontFamily: "'Fredoka One', cursive", fontSize: "1.2rem",
        letterSpacing: "0.05em", cursor: loading ? "not-allowed" : "pointer",
        boxShadow: loading ? "none" : `0 8px 20px ${C.red}66`,
        transition: "all 0.3s ease",
        marginTop: "0.5rem"
      }}
        onMouseOver={(e) => {
          if (loading) return;
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = `0 12px 24px ${C.red}88`;
        }}
        onMouseOut={(e) => {
          if (loading) return;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 8px 20px ${C.red}66`;
        }}>
        {loading ? "Sending..." : "Count Me In!"}
      </button>
    </form>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function BdayInvitation() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const storyRef = useRef(null);
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);
  const rsvpRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Initialize audio
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";
    const unlock = () => {
      setIsOpened(true);
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay blocked:", e));
      }
    };
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("wheel", unlock, { once: true });
    window.addEventListener("click", unlock, { once: true });
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("click", unlock);
    };
  }, [isOpened]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const nav = [
    { id: "home", label: "Home" },
    { id: "story", label: "Message" },
    { id: "details", label: "Details" },
    { id: "gallery", label: "Gallery" },
    { id: "rsvp", label: "RSVP" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bgLight}; overflow-x: hidden; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${C.bgLight}; }
        ::-webkit-scrollbar-thumb { background: ${C.red}; border-radius: 4px; }
        
        .fade-up {
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-7px); }
        }
        
        @keyframes peekTop {
          0%, 100% { transform: translateY(-10px) rotate(-2deg); }
          50% { transform: translateY(10px) rotate(2deg); }
        }
        @keyframes peekBottom {
          0%, 100% { transform: translateY(10px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        
        .nav-btn {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: clamp(0.9rem, 2vw, 1rem);
          color: ${C.textDark};
          background: none;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 20px;
          transition: all 0.2s ease;
          width: 100%;
        }
        .nav-btn:hover {
          background: rgba(0,0,0,0.05);
          color: ${C.blue};
        }
        .nav-links {
          display: flex;
          gap: clamp(0.2rem, 1vw, 0.5rem);
          justify-content: flex-end;
          align-items: center;
          flex: 1;
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: ${C.textDark};
        }
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 70px;
            right: 1.5rem;
            background: white;
            flex-direction: column;
            padding: 1rem;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            transform: translateY(-20px) scale(0.95);
            opacity: 0;
            visibility: hidden;
            border: 3px solid ${C.blue};
            min-width: 150px;
          }
          .nav-links.open {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
          }
          .hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border: 2px solid #eee;
            transition: all 0.2s;
          }
          .hamburger:active {
            transform: scale(0.95);
          }
        }
      `}</style>

      {/* ── INVITATION COVER ── */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 99999,
          background: `radial-gradient(circle at center, #ffffff 0%, ${C.yellow} 100%)`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          transition: "transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), opacity 1.2s ease, visibility 1.2s",
          transform: isOpened ? "translateY(-100vh)" : "translateY(0)",
          opacity: isOpened ? 0 : 1,
          visibility: isOpened ? "hidden" : "visible",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "1rem", position: "relative" }}>
          <img src="/images/group.png" alt="Sesame Street" style={{
            display: "block",
            width: "100%", maxWidth: "500px", margin: "0 auto",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
            animation: "bounce 4s ease-in-out infinite alternate"
          }} />

          <div style={{
            background: "white", padding: "clamp(1rem, 4vw, 1.5rem) clamp(1.5rem, 8vw, 3rem)", borderRadius: "50px",
            border: `clamp(3px, 1.5vw, 6px) solid ${C.green}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            marginTop: "-30px", position: "relative", zIndex: 10,
            transform: "rotate(-2deg)"
          }}>
            <h1 style={{
              fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 5vw, 3rem)",
              color: C.green, margin: 0, textTransform: "uppercase", letterSpacing: "2px"
            }}>
              You're Invited!
            </h1>
          </div>
          <div className="bounce" style={{
            marginTop: "3rem",
            display: "inline-block",
            background: "white", padding: "1rem 2rem", borderRadius: "30px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            color: C.textDark, fontFamily: "'Nunito', sans-serif", fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "1px"
          }}>
            Tap or Scroll to Open
          </div>
        </div>
      </div>

      <FallingShapes />
      
      {/* ── MUSIC TOGGLE ── */}
      {isOpened && (
        <button
          onClick={toggleAudio}
          style={{
            position: "fixed", bottom: "20px", right: "20px", zIndex: 100,
            width: "50px", height: "50px", borderRadius: "50%",
            background: "white", border: `3px solid ${C.red}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)", cursor: "pointer",
            color: C.red, transition: "transform 0.2s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
               <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </button>
      )}

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 1.5rem",
        background: scrollY > 20 ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrollY > 20 ? "blur(10px)" : "none",
        boxShadow: scrollY > 20 ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{
          fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem", color: C.red,
          background: "white", padding: "0.2rem 1rem", borderRadius: "20px",
          border: `3px solid ${C.red}`, zIndex: 101
        }}>
          DANE
        </div>

        <button className="hamburger" onClick={() => setIsNavOpen(!isNavOpen)} style={{ zIndex: 101 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.textDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isNavOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <div className={`nav-links ${isNavOpen ? 'open' : ''}`}>
          {nav.map(n => (
            <button key={n.id} className="nav-btn" onClick={() => { setIsNavOpen(false); go(n.id); }}>{n.label}</button>
          ))}
        </div>
      </nav>

      <div style={{ overflowX: "hidden", width: "100%", position: "relative" }}>
        {/* ── HERO ── */}
        <section id="home" style={{
          minHeight: "100vh",
          background: `radial-gradient(circle at top right, ${C.yellow}22, transparent), radial-gradient(circle at bottom left, ${C.blue}22, transparent)`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "relative",
          padding: "7rem 1.5rem 5rem",
        }}>

          {/* Decor */}
          <img src="/images/bigbird.png" alt="" style={{ position: "absolute", bottom: "-3%", right: "-80%", width: "200vw", minWidth: "450px", opacity: 0.2, pointerEvents: "none", transform: "scaleX(-1)", animation: "bounce 9s infinite alternate-reverse", zIndex: 10 }} />

          <div className="fade-up" style={{ textAlign: "center", zIndex: 1, position: "relative", maxWidth: "800px" }}>
            <div style={{
              background: "white", padding: "3rem", borderRadius: "40px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              border: `4px dashed ${C.yellow}`
            }}>
              <p style={{
                fontFamily: "'Nunito', sans-serif", fontSize: "1rem", letterSpacing: "0.2em",
                color: C.textMuted, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 800
              }}>
                Join us on Sesame Street!
              </p>

              <h1 style={{
                fontFamily: "'Bubblegum Sans', cursive",
                fontSize: "clamp(3.5rem, 8vw, 5rem)",
                color: C.blue,
                lineHeight: "1.1",
                marginBottom: "1rem",
                textShadow: `3px 3px 0px ${C.yellow}, -1px -1px 0px white`
              }}>
                Dane Adriel is turning ONE!
              </h1>

              <p style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "1.2rem", color: C.textDark,
                lineHeight: "1.6", fontWeight: 600,
                maxWidth: "500px", margin: "0 auto 2rem"
              }}>
                Sunny days, sweeping the clouds away...<br />
                Can you tell me how to get to Dane Adriel's Birthday Party?
              </p>

              <img src="/images/1st.jpg" alt="Dane" style={{
                width: "clamp(200px, 60vw, 280px)", height: "clamp(200px, 60vw, 280px)", objectFit: "cover",
                borderRadius: "50%", border: `clamp(4px, 2vw, 8px) solid ${C.red}`,
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                margin: "0 auto 2rem"
              }} />

              <Countdown />
            </div>
          </div>
        </section>

        {/* ── DETAILS ── */}
        <section id="details" ref={detailsRef} style={{
          padding: "clamp(4rem, 10vw, 6rem) clamp(1rem, 5vw, 1.5rem)",
          background: `linear-gradient(to bottom, #ffffff, ${C.bgLight})`,
          position: "relative"
        }}>
          {/* Peek1 between Hero and Details */}
          <img src="/images/peek1.png" alt="" style={{ position: "absolute", top: "clamp(-60px, -15vw, -120px)", left: "clamp(-5%, -10vw, -10.5%)", width: "clamp(120px, 30vw, 220px)", zIndex: 15, pointerEvents: "none", filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.2))" }} />

          <img src="/images/bert.png" alt="" style={{ position: "absolute", bottom: "0%", left: "-80%", width: "200vw", minWidth: "350px", opacity: 0.15, pointerEvents: "none", zIndex: 10 }} />
          <img src="/images/ernie.png" alt="" style={{ position: "absolute", top: "0%", right: "-10%", width: "70vw", minWidth: "400px", opacity: 0.15, pointerEvents: "none", zIndex: 10 }} />

          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <SectionHeader subtitle="Where & When" title="Party Details" color={C.orange} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(1.5rem, 5vw, 2rem)" }}>

              <div style={{
                background: "white", padding: "clamp(1.5rem, 5vw, 2.5rem)", borderRadius: "24px",
                textAlign: "center", border: `3px solid ${C.blue}`,
                boxShadow: `0 10px 30px ${C.blue}22`,
                position: "relative"
              }}>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ background: C.blue, color: "white", padding: "1rem", borderRadius: "50%", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: C.blue, marginBottom: "0.5rem" }}>Date</h3>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textDark, fontWeight: 700 }}>
                    Tuesday, June 16, 2026
                  </p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textMuted, fontWeight: 600 }}>
                    Save the Date!
                  </p>
                </div>
              </div>

              <div style={{
                background: "white", padding: "clamp(1.5rem, 5vw, 2.5rem)", borderRadius: "24px",
                textAlign: "center", border: `3px solid ${C.orange}`,
                boxShadow: `0 10px 30px ${C.orange}22`,
                position: "relative"
              }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "20px", overflow: "hidden", zIndex: 0 }}>
                  <img src="/images/church.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ background: C.orange, color: "white", padding: "1rem", borderRadius: "50%", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: C.orange, marginBottom: "0.5rem" }}>First Venue</h3>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textDark, fontWeight: 700 }}>Christening Ceremony</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textDark, fontWeight: 700 }}>
                    Our Lady of the Pillar Parish Church
                  </p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textMuted, fontWeight: 600 }}>
                    3:00 in the Afternoon
                  </p>
                </div>
              </div>

              <div style={{
                background: "white", padding: "clamp(1.5rem, 5vw, 2.5rem)", borderRadius: "24px",
                textAlign: "center", border: `3px solid ${C.green}`,
                boxShadow: `0 10px 30px ${C.green}22`,
                position: "relative"
              }}>
                <img src="/images/peek2.png" alt="" style={{ position: "absolute", top: "clamp(-62px, -10vw, -90px)", right: "5%", width: "clamp(120px, 30vw, 220px)", zIndex: 15, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))", pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "20px", overflow: "hidden", zIndex: 0 }}>
                  <img src="/images/boulevard.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ background: C.green, color: "white", padding: "1rem", borderRadius: "50%", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: C.green, marginBottom: "0.5rem" }}>Main Venue</h3>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textDark, fontWeight: 700 }}>
                    New Boulevard Town Square
                  </p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textMuted, fontWeight: 600 }}>
                    San Fermin, Cauayan City, Isabela<br />
                    5:00 in the Afternoon
                  </p>
                </div>
              </div>

            </div>

            {/* Dress Code */}
            <div style={{
              background: "white", padding: "3rem", borderRadius: "30px",
              marginTop: "3rem", textAlign: "center",
              boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
              borderBottom: `8px solid ${C.yellow}`
            }}>
              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2rem", color: C.textDark, marginBottom: "1rem" }}>
                Dress Code
              </h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.2rem", color: C.textMuted, marginBottom: "1rem", fontWeight: 600 }}>
                Wear your favorite colors from Sesame Street!
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.red, marginBottom: "2rem", fontWeight: 700, fontStyle: "italic" }}>
                * Ninongs/Ninangs are advised to wear white during the baptismal ceremony.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                {[
                  { name: "Blue", color: C.blue },
                  { name: "Green", color: C.green },
                  { name: "Yellow", color: C.yellow },
                ].map(c => (
                  <div key={c.name} style={{
                    display: "flex", alignItems: "center", gap: "0.8rem",
                    padding: "0.8rem 1.5rem", borderRadius: "50px",
                    background: "#F5F8FA", border: `2px solid ${c.color}`
                  }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: c.color, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }} />
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: C.textDark }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section id="gallery" ref={galleryRef} style={{
          padding: "6rem 1.5rem",
          background: C.bgLight,
          position: "relative"
        }}>

          <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <SectionHeader subtitle="Memories" title="Growing Up" color={C.blue} />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
              gap: "1.5rem",
              padding: "1rem"
            }}>
              {[
                "/images/1.JPG",
                "/images/2.jfif",
                "/images/3.JPG",
                "/images/4.JPG",
                "/images/5.JPG",
                "/images/6.JPG"
              ].map((src, i) => (
                <div key={i} style={{
                  borderRadius: "20px", overflow: "hidden",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  aspectRatio: "3/4",
                  border: "6px solid white",
                  transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05) rotate(0deg)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
                    e.currentTarget.style.zIndex = "10";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? 3 : -3}deg)`;
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                    e.currentTarget.style.zIndex = "1";
                  }}>
                  <img src={src} alt="Memory" style={{
                    width: "100%", height: "100%", objectFit: "cover"
                  }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RSVP & FOOTER ── */}
        <section id="rsvp" ref={rsvpRef} style={{
          padding: "clamp(4rem, 10vw, 6rem) clamp(1rem, 5vw, 1.5rem)",
          background: `radial-gradient(circle at center, ${C.red}11, transparent)`,
          position: "relative"
        }}>
          <img src="/images/peek3.png" alt="" style={{ position: "absolute", bottom: "-20%", left: "-7%", width: "clamp(150px, 35vw, 250px)", zIndex: 15, pointerEvents: "none", filter: "drop-shadow(0 -5px 15px rgba(0,0,0,0.2))" }} />
          <img src="/images/kermit.png" alt="" style={{ position: "absolute", bottom: "-5%", right: "-55%", width: "200vw", minWidth: "350px", opacity: 0.15, pointerEvents: "none", zIndex: 10 }} />

          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <SectionHeader subtitle="Let Us Know" title="RSVP" color={C.green} />

            <RSVPForm />

            {/* ── GIFT GUIDE ── */}
            <div style={{
              background: "white", padding: "clamp(2rem, 5vw, 3rem)", borderRadius: "30px",
              marginTop: "4rem", textAlign: "center",
              boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
              border: `4px solid ${C.yellow}`,
              position: "relative"
            }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ background: C.yellow, color: "white", padding: "1rem", borderRadius: "50%", width: "70px", height: "70px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1h-4v-1c0-.55.45-1 1-1 1.14 0 2.12.63 2.66 1.56.24-.26.56-.43.92-.48.13-.02.27-.08.42-.08zM9 4c.55 0 1 .45 1 1v1H6c0-.55.45-1 1-1s1-.45 1-1c.15 0 .29.06.42.08.36.05.68.22.92.48C9.88 4.63 10.86 4 12 4c-.38 0-.74.09-1.06.24C10.42 4.09 9.74 4 9 4zm3 15H4v-2h8v2zm0-4H4v-5h8v5zm2 4v-2h8v2h-8zm0-4v-5h8v5h-8z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2rem", color: C.textDark, marginBottom: "1rem" }}>
                  Gifts & Presents
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.2rem", color: C.textMuted, marginBottom: "0", fontWeight: 600 }}>
                  Your presence is the greatest gift of all! However, if you wish to honor Dane with a gift, monetary gifts to help start his savings would be greatly appreciated.
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <p style={{
                fontFamily: "'Nunito', sans-serif", fontSize: "1.2rem",
                color: C.textMuted, fontStyle: "italic", fontWeight: 600,
                maxWidth: "600px", margin: "0 auto"
              }}>
                "On Sesame Street, we all come together — and that's what birthdays are all about!"
              </p>
              <p style={{
                fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem",
                color: C.red, marginTop: "2rem", letterSpacing: "1px"
              }}>
                With love, <br /> Dane's Family
              </p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
