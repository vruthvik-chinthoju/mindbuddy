import { useState, useEffect, useRef } from "react";
import "./css/Excercises.css";

// ─── Data ────────────────────────────────────────────────────────────────────

const MEDITATIONS = [
  {
    id: "box",
    category: "breath",
    title: "Box Breathing",
    emoji: "🌿",
    iconClass: "icon-breath",
    cardClass: "card-breath",
    duration: 300,
    label: "5 min",
    level: "All Levels",
    desc: "Four counts in, hold, out, hold. Used by Navy SEALs to regulate the nervous system instantly.",
    phases: [
      { label: "Breathe In",  abbr: "IN",   dur: 4, color: "#5ec98a" },
      { label: "Hold",        abbr: "HOLD", dur: 4, color: "#89d4a8" },
      { label: "Breathe Out", abbr: "OUT",  dur: 4, color: "#3a9e68" },
      { label: "Hold",        abbr: "HOLD", dur: 4, color: "#89d4a8" },
    ],
    cues: [
      "Notice your belly rise",
      "Hold gently",
      "Let it all go",
      "Empty and still",
    ],
  },
  {
    id: "sleep",
    category: "sleep",
    title: "Sleep Reset",
    emoji: "🌙",
    iconClass: "icon-sleep",
    cardClass: "card-sleep",
    duration: 480,
    label: "8 min",
    level: "Beginner",
    desc: "Wind down racing thoughts and ease into deep, restful sleep with a slow body-to-mind release.",
    phases: [
      { label: "Breathe In",  abbr: "IN",   dur: 4, color: "#8080ff" },
      { label: "Hold",        abbr: "HOLD", dur: 7, color: "#a0a0ff" },
      { label: "Breathe Out", abbr: "OUT",  dur: 8, color: "#6060dd" },
    ],
    cues: [
      "Draw breath slowly",
      "Hold and soften",
      "Release completely — all tension gone",
    ],
  },
  {
    id: "focus",
    category: "focus",
    title: "Focus Training",
    emoji: "🧠",
    iconClass: "icon-focus",
    cardClass: "card-focus",
    duration: 360,
    label: "6 min",
    level: "All Levels",
    desc: "Sharpen attention and dissolve mental fog with rhythmic breath anchoring and presence cues.",
    phases: [
      { label: "Breathe In",  abbr: "IN",   dur: 4, color: "#ffc844" },
      { label: "Hold",        abbr: "HOLD", dur: 2, color: "#ffd870" },
      { label: "Breathe Out", abbr: "OUT",  dur: 6, color: "#e6a800" },
    ],
    cues: [
      "Anchor your attention here",
      "Steady",
      "Clear your mind on the exhale",
    ],
  },
  {
    id: "stress",
    category: "stress",
    title: "Stress Relief",
    emoji: "❤️",
    iconClass: "icon-stress",
    cardClass: "card-stress",
    duration: 420,
    label: "7 min",
    level: "Beginner",
    desc: "Lower cortisol and slow your heart rate through heart-coherence breathing patterns.",
    phases: [
      { label: "Breathe In",  abbr: "IN",   dur: 5, color: "#ff8080" },
      { label: "Hold",        abbr: "HOLD", dur: 2, color: "#ffaaaa" },
      { label: "Breathe Out", abbr: "OUT",  dur: 5, color: "#dd5555" },
    ],
    cues: [
      "Breathe deeply into your chest",
      "Pause",
      "Slow and full exhale",
    ],
  },
  {
    id: "body",
    category: "body",
    title: "Body Scan",
    emoji: "✨",
    iconClass: "icon-body",
    cardClass: "card-body",
    duration: 600,
    label: "10 min",
    level: "Intermediate",
    desc: "Travel slowly from crown to toe, releasing held tension in each area with mindful awareness.",
    phases: [
      { label: "Breathe In",  abbr: "IN",   dur: 5, color: "#c88cff" },
      { label: "Hold",        abbr: "HOLD", dur: 3, color: "#ddaaff" },
      { label: "Breathe Out", abbr: "OUT",  dur: 7, color: "#9944cc" },
    ],
    cues: [
      "Expand your ribcage",
      "Feel the stillness",
      "Melt with each exhale",
    ],
  },
  {
    id: "sleep2",
    category: "sleep",
    title: "Deep Sleep Drift",
    emoji: "🌙",
    iconClass: "icon-sleep",
    cardClass: "card-sleep",
    duration: 720,
    label: "12 min",
    level: "Guided",
    desc: "Extended slow breathing with descending count guides you through the threshold of sleep.",
    phases: [
      { label: "Breathe In",  abbr: "IN",   dur: 4, color: "#8080ff" },
      { label: "Hold",        abbr: "HOLD", dur: 7, color: "#a0a0ff" },
      { label: "Breathe Out", abbr: "OUT",  dur: 8, color: "#6060dd" },
    ],
    cues: [
      "Slow and deep",
      "Suspend the world",
      "Drift downward with each breath",
    ],
  },
];

const TABS = [
  { key: "all",    label: "All"       },
  { key: "sleep",  label: "Sleep"     },
  { key: "focus",  label: "Focus"     },
  { key: "stress", label: "Stress"    },
  { key: "breath", label: "Breathing" },
  { key: "body",   label: "Body Scan" },
];

const CIRC = 2 * Math.PI * 105; // circumference for r=105

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ─── MeditationCard ──────────────────────────────────────────────────────────

function MeditationCard({ med, onStart }) {
  return (
    <div className={`card ${med.cardClass}`}>
      <div className="card-header">
        <div className={`card-icon ${med.iconClass}`}>{med.emoji}</div>
        <span className="card-duration">{med.label}</span>
      </div>
      <h3>{med.title}</h3>
      <p>{med.desc}</p>
      <div className="card-footer">
        <span className="card-level">{med.level.toUpperCase()}</span>
        <button className="btn-start" onClick={() => onStart(med)}>
          Begin
        </button>
      </div>
    </div>
  );
}

// ─── SessionOverlay ──────────────────────────────────────────────────────────

function SessionOverlay({ med, onEnd }) {
  const totalSecs      = med.duration;
  const [remaining, setRemaining] = useState(totalSecs);
  const [phaseIdx, setPhaseIdx]   = useState(0);
  const [phaseLeft, setPhaseLeft] = useState(med.phases[0].dur);

  const phaseIdxRef  = useRef(0);
  const phaseLeftRef = useRef(med.phases[0].dur);

  // Main countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) { onEnd(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onEnd]);

  // Phase tick
  useEffect(() => {
    const tick = setInterval(() => {
      phaseLeftRef.current -= 1;
      if (phaseLeftRef.current <= 0) {
        phaseIdxRef.current = (phaseIdxRef.current + 1) % med.phases.length;
        phaseLeftRef.current = med.phases[phaseIdxRef.current].dur;
        setPhaseIdx(phaseIdxRef.current);
        setPhaseLeft(phaseLeftRef.current);
      } else {
        setPhaseLeft(phaseLeftRef.current);
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [med.phases]);

  const phase    = med.phases[phaseIdx];
  const fraction = phaseLeft / phase.dur;
  const offset   = CIRC * (1 - fraction);
  const progress = ((totalSecs - remaining) / totalSecs) * 100;
  const cue      = med.cues[phaseIdx % med.cues.length];

  return (
    <div className="overlay">
      <p className="session-eyebrow">Guided Session</p>
      <h2 className="session-title">{med.title}</h2>

      <div className="orb-wrap">
        <svg className="ring-track" viewBox="0 0 220 220">
          <circle
            cx="110" cy="110" r="105"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
          />
          <circle
            cx="110" cy="110" r="105"
            fill="none"
            stroke={phase.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            transform="rotate(-90 110 110)"
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease" }}
          />
        </svg>
        <div className="orb-inner" style={{ boxShadow: `0 0 50px ${phase.color}33` }}>
          <span className="orb-phase">{phase.abbr}</span>
          <span className="orb-count">{phaseLeft}</span>
        </div>
      </div>

      <div className="session-timer">{fmt(remaining)}</div>

      <div className="progress-bar-wrap">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${phase.color}88, ${phase.color})` }}
        />
      </div>

      <p className="session-cue">{cue}</p>

      <button className="btn-end" onClick={onEnd}>
        End session
      </button>
    </div>
  );
}

// ─── Exercises (main export) ─────────────────────────────────────────────────

export default function Exercises() {
  const [activeTab, setActiveTab]     = useState("all");
  const [activeMed, setActiveMed]     = useState(null);

  const visible = activeTab === "all"
    ? MEDITATIONS
    : MEDITATIONS.filter((m) => m.category === activeTab);

  return (
    <>
      <section className="exercise-page">
        {/* ambient glows */}
        <div className="glow glow-tl" />
        <div className="glow glow-br" />

        {/* hero */}
        <div className="hero">
          <p className="eyebrow">MindBuddy Wellness</p>
          <h1>
            Find your <em>stillness</em>
          </h1>
          <p className="hero-sub">
            Guided meditations for sleep, focus, stress relief, and more.
            Start anywhere — all you need is your breath.
          </p>
          <img src="./med.png" alt="" />
        </div>

        {/* tabs */}
        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid">
          {visible.map((med) => (
            <MeditationCard key={med.id} med={med} onStart={setActiveMed} />
          ))}
        </div>
      </section>

      {/* session overlay */}
      {activeMed && (
        <SessionOverlay
          med={activeMed}
          onEnd={() => setActiveMed(null)}
        />
      )}
    </>
  );
}