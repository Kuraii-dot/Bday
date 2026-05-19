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
            width: "70px", height: "70px", borderRadius: "16px",
            background: "white",
            border: `4px solid ${item.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Fredoka One', cursive",
            fontSize: "1.8rem", color: item.color,
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
        maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem",
        background: "white", padding: "2.5rem", borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        position: "relative",
        borderTop: `8px solid ${C.blue}`
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        try {
          await fetch("https://formsubmit.co/ajax/arvineil13@yahoo.com.ph", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
          });
          setSent(true);
        } catch (error) {
          console.error(error);
          setSent(true);
        } finally {
          setLoading(false);
        }
      }}
    >
      <input type="hidden" name="_subject" value="New Birthday RSVP!" />
      <input type="hidden" name="_captcha" value="false" />
      <img src="/images/cookie.png" alt="Cookie Monster" style={{
        position: "absolute", top: "-120px", right: "-100px", width: "400px",
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
  const storyRef = useRef(null);
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);
  const rsvpRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";
    const unlock = () => setIsOpened(true);
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
          font-size: 0.9rem;
          color: ${C.textDark};
          background: none;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        .nav-btn:hover {
          background: rgba(0,0,0,0.05);
          color: ${C.blue};
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
        <div style={{ textAlign: "center", padding: "2rem", position: "relative" }}>
          <img src="/images/group.png" alt="Sesame Street" style={{
            width: "90%", maxWidth: "500px", margin: "0 auto",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
            animation: "bounce 4s ease-in-out infinite alternate"
          }} />

          <div style={{
            background: "white", padding: "1.5rem 3rem", borderRadius: "50px",
            border: `6px solid ${C.green}`,
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

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem",
        background: scrollY > 20 ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrollY > 20 ? "blur(10px)" : "none",
        boxShadow: scrollY > 20 ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{
          fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem", color: C.red,
          background: "white", padding: "0.2rem 1rem", borderRadius: "20px",
          border: `3px solid ${C.red}`
        }}>
          DANE
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {nav.map(n => (
            <button key={n.id} className="nav-btn" onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </div>
      </nav>

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
              Dane Adrielle is turning ONE!
            </h1>

            <p style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "1.2rem", color: C.textDark,
              lineHeight: "1.6", fontWeight: 600,
              maxWidth: "500px", margin: "0 auto 2rem"
            }}>
              Sunny days, sweeping the clouds away...<br />
              Can you tell me how to get to Dane Adrielle's Birthday Party?
            </p>

            <img src="/images/1.JPG" alt="Dane" style={{
              width: "280px", height: "280px", objectFit: "cover",
              borderRadius: "50%", border: `8px solid ${C.red}`,
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
              margin: "0 auto 2rem"
            }} />

            <Countdown />
          </div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section id="details" ref={detailsRef} style={{
        padding: "6rem 1.5rem",
        background: `linear-gradient(to bottom, #ffffff, ${C.bgLight})`,
        position: "relative"
      }}>
        {/* Peek1 between Hero and Details */}
        <img src="/images/peek1.png" alt="" style={{ position: "absolute", top: "-120px", left: "-10.5%", width: "220px", zIndex: 15, pointerEvents: "none", filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.2))" }} />

        <img src="/images/bert.png" alt="" style={{ position: "absolute", bottom: "0%", left: "-80%", width: "200vw", minWidth: "350px", opacity: 0.15, pointerEvents: "none", zIndex: 10 }} />
        <img src="/images/ernie.png" alt="" style={{ position: "absolute", top: "0%", right: "-10%", width: "70vw", minWidth: "400px", opacity: 0.15, pointerEvents: "none", zIndex: 10 }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionHeader subtitle="Where & When" title="Party Details" color={C.orange} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>

            <div style={{
              background: "white", padding: "2.5rem", borderRadius: "24px",
              textAlign: "center", border: `3px solid ${C.blue}`,
              boxShadow: `0 10px 30px ${C.blue}22`,
              position: "relative"
            }}>
              <div style={{ background: C.blue, color: "white", padding: "1rem", borderRadius: "50%", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: C.blue, marginBottom: "0.5rem" }}>Date & Time</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textDark, fontWeight: 700 }}>
                Tuesday, June 16, 2026
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textMuted, fontWeight: 600 }}>
                4:00 in the Afternoon
              </p>
            </div>

            <div style={{
              background: "white", padding: "2.5rem", borderRadius: "24px",
              textAlign: "center", border: `3px solid ${C.green}`,
              boxShadow: `0 10px 30px ${C.green}22`,
              position: "relative"
            }}>
              <img src="/images/peek2.png" alt="" style={{ position: "absolute", top: "-90px", right: "10%", width: "220px", zIndex: 15, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))", pointerEvents: "none" }} />
              <div style={{ background: C.green, color: "white", padding: "1rem", borderRadius: "50%", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", position: "relative", zIndex: 10 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: C.green, marginBottom: "0.5rem" }}>Location</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textDark, fontWeight: 700 }}>
                Boulevard Town Square
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: C.textMuted, fontWeight: 600 }}>
                San Fermin, Cauayan City, Isabela
              </p>
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
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.2rem", color: C.textMuted, marginBottom: "2rem", fontWeight: 600 }}>
              Wear your favorite colors from Sesame Street!
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { name: "Blue", color: C.blue },
                { name: "Green", color: C.green },
                { name: "Yellow", color: C.yellow },
                { name: "Red", color: C.red },
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
        {/* Peeking Character removed from here */}

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionHeader subtitle="Memories" title="Growing Up" color={C.blue} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
            padding: "1rem"
          }}>
            {[
              "/images/2.jfif",
              "/images/3.JPG",
              "/images/4.JPG",
              "/images/5.JPG",
              "/images/6.JPG",
              "/images/7.png"
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
        padding: "6rem 1.5rem",
        background: `radial-gradient(circle at center, ${C.red}11, transparent)`,
        position: "relative"
      }}>
        <img src="/images/peek3.png" alt="" style={{ position: "absolute", bottom: "-20%", left: "-7%", width: "250px", zIndex: 15, pointerEvents: "none", filter: "drop-shadow(0 -5px 15px rgba(0,0,0,0.2))" }} />
        <img src="/images/kermit.png" alt="" style={{ position: "absolute", bottom: "-5%", right: "-55%", width: "200vw", minWidth: "350px", opacity: 0.15, pointerEvents: "none", zIndex: 10 }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionHeader subtitle="Let Us Know" title="RSVP" color={C.green} />

          <RSVPForm />

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

    </>
  );
}
