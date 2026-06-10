import { useState, useMemo } from "react";
import "./css/mood.css";

const MOODS = [
  { id: "rad",     label: "Radiant",  emoji: "🌟", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  score: 5 },
  { id: "happy",   label: "Happy",    emoji: "😊", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   score: 4 },
  { id: "okay",    label: "Okay",     emoji: "😐", color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  score: 3 },
  { id: "sad",     label: "Sad",      emoji: "😔", color: "#a78bfa", bg: "rgba(167,139,250,0.12)", score: 2 },
  { id: "anxious", label: "Anxious",  emoji: "😰", color: "#f472b6", bg: "rgba(244,114,182,0.12)", score: 2 },
  { id: "angry",   label: "Angry",    emoji: "😤", color: "#f87171", bg: "rgba(248,113,113,0.12)", score: 1 },
];

const MOOD_BY_ID = Object.fromEntries(MOODS.map(m => [m.id, m]));

const DEFAULT_EMOTIONS = ["Grateful", "Calm", "Excited", "Tired", "Lonely", "Hopeful", "Overwhelmed", "Content"];
const DEFAULT_ACTIVITIES = ["Work", "Exercise", "Reading", "Friends", "Family", "Sleep", "Outdoors", "Music"];

const QUESTIONS = [
  { id: "q1", text: "What made you smile today?" },
  { id: "q2", text: "What's weighing on your mind?" },
  { id: "q3", text: "One thing you're grateful for?" },
];

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

function generateSeedData(month, year, today) {
  const count = getDaysInMonth(month, year);
  const data = {};
  for (let d = 1; d < today; d++) {
    if (Math.random() > 0.25) {
      data[d] = MOODS[Math.floor(Math.random() * MOODS.length)].id;
    }
  }
  return data;
}


function MoodCalendar({ month, year, calendarData, today, selectedDay, onSelectDay }) {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay    = getFirstDayOfMonth(month, year);
  const cells       = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div className="mt-calendar">
      <div className="cal-header">
        <h2 className="cal-title">{MONTHS[month]} <span>{year}</span></h2>
        <div className="cal-legend">
          {MOODS.map(m => (
            <span key={m.id} className="legend-dot" style={{ background: m.color }} title={m.label} />
          ))}
        </div>
      </div>
      <div className="cal-weekdays">
        {DAYS_SHORT.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="cal-grid">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="cal-cell empty" />;
          const moodId   = calendarData[day];
          const mood     = moodId ? MOOD_BY_ID[moodId] : null;
          const isToday  = day === today && month === new Date().getMonth() && year === new Date().getFullYear();
          const isSelected = day === selectedDay;
          return (
            <div
              key={day}
              className={`cal-cell ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""} ${mood ? "has-mood" : ""}`}
              style={mood ? { "--mood-color": mood.color, "--mood-bg": mood.bg } : {}}
              onClick={() => onSelectDay(day)}
              title={mood ? mood.label : "No entry"}
            >
              <span className="cal-day-num">{day}</span>
              {mood && <span className="cal-emoji">{mood.emoji}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function MoodGraph({ calendarData, month, year }) {
  const daysInMonth = getDaysInMonth(month, year);
  const weeks = [];
  let week = [];
  const firstDay = getFirstDayOfMonth(month, year);

  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (firstDay + d - 1) % 7;
    week.push(d);
    if (dayOfWeek === 6 || d === daysInMonth) {
      weeks.push([...week]);
      week = [];
    }
  }

  const weeklyAvg = weeks.map(w => {
    const scores = w.map(d => calendarData[d] ? MOOD_BY_ID[calendarData[d]].score : null).filter(Boolean);
    return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
  });

  const maxScore = 5;

  return (
    <div className="mood-graph-wrap">
      <div className="graph-bars">
        {weeklyAvg.map((avg, i) => {
          const pct = avg ? (avg / maxScore) * 100 : 0;
          const moodScore = avg ? Math.round(avg) : 0;
          const matchMood = MOODS.find(m => m.score === moodScore) || MOODS[2];
          return (
            <div key={i} className="graph-col">
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    height: avg ? `${pct}%` : "4px",
                    background: avg ? `linear-gradient(to top, ${matchMood.color}99, ${matchMood.color})` : "rgba(255,255,255,0.08)",
                  }}
                />
                {avg && <span className="bar-emoji">{matchMood.emoji}</span>}
              </div>
              <span className="bar-label">W{i + 1}</span>
            </div>
          );
        })}
      </div>
      <div className="graph-scale">
        {["Low", "Mid", "High"].map(l => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}



function TagPill({ label, active, color, onClick, onRemove, custom }) {
  return (
    <button
      className={`tag-pill ${active ? "active" : ""}`}
      style={active ? { "--pill-color": color, borderColor: color, background: `${color}18`, color } : {}}
      onClick={onClick}
    >
      {label}
      {custom && (
        <span className="pill-remove" onClick={e => { e.stopPropagation(); onRemove(); }}>×</span>
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MoodTracker() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year,  setYear]  = useState(today.getFullYear());

  const seedData = useMemo(() => generateSeedData(month, year, today.getDate()), []);
  const [calendarData, setCalendarData] = useState(seedData);
  const [selectedDay,  setSelectedDay]  = useState(today.getDate());

  // Entry state
  const [mood,      setMood]      = useState(null);
  const [emotions,  setEmotions]  = useState([]);
  const [activities,setActivities]= useState([]);
  const [answers,   setAnswers]   = useState({});
  const [note,      setNote]      = useState("");
  const [saved,     setSaved]     = useState(false);

  // Custom tags
  const [customEmotions,   setCustomEmotions]   = useState([]);
  const [customActivities, setCustomActivities] = useState([]);
  const [newEmotion,       setNewEmotion]        = useState("");
  const [newActivity,      setNewActivity]       = useState("");
  const [addingEmotion,    setAddingEmotion]     = useState(false);
  const [addingActivity,   setAddingActivity]    = useState(false);

  const allEmotions   = [...DEFAULT_EMOTIONS,   ...customEmotions];
  const allActivities = [...DEFAULT_ACTIVITIES, ...customActivities];

  const activeMood = mood ? MOOD_BY_ID[mood] : null;

  function toggleTag(list, setList, tag) {
    setList(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }

  function handleSave() {
    if (!mood) return;
    setCalendarData(prev => ({ ...prev, [selectedDay]: mood }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  // Streaks / stats
  const totalEntries  = Object.keys(calendarData).length;
  const avgScore      = totalEntries
    ? (Object.values(calendarData).reduce((s, id) => s + MOOD_BY_ID[id].score, 0) / totalEntries).toFixed(1)
    : "—";
  const topMoodId     = totalEntries
    ? Object.entries(
        Object.values(calendarData).reduce((acc, id) => { acc[id] = (acc[id] || 0) + 1; return acc; }, {})
      ).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  return (
    <div className="mt-page">
      {/* bg blobs */}
      <div className="blob blob-a" />
      <div className="blob blob-b" />

      {/* ── Header ── */}
      <header className="mt-header">
        <div>
          <p className="mt-eyebrow">MindBuddy</p>
          <h1 className="mt-heading">Mood <em>Journal</em></h1>
        </div>
        <div className="mt-stats">
          <div className="stat-chip">
            <span className="stat-val">{totalEntries}</span>
            <span className="stat-lbl">Entries</span>
          </div>
          <div className="stat-chip">
            <span className="stat-val">{avgScore}</span>
            <span className="stat-lbl">Avg Mood</span>
          </div>
          {topMoodId && (
            <div className="stat-chip">
              <span className="stat-val">{MOOD_BY_ID[topMoodId].emoji}</span>
              <span className="stat-lbl">Most felt</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Calendar ── */}
      <section className="mt-section">
        <div className="cal-nav">
          <button className="nav-btn" onClick={prevMonth}>←</button>
          <span />
          <button className="nav-btn" onClick={nextMonth}>→</button>
        </div>
        <MoodCalendar
          month={month} year={year}
          calendarData={calendarData}
          today={today.getDate()}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
      </section>

      {/* ── Two-col layout ── */}
      <div className="mt-body">

        {/* LEFT: entry form */}
        <div className="mt-left">

          {/* Day heading */}
          <div className="day-heading">
            <h2>
              {MONTHS[month]} {selectedDay}
              {selectedDay === today.getDate() && month === today.getMonth() && <span className="today-badge">Today</span>}
            </h2>
            {calendarData[selectedDay] && (
              <span className="day-saved-mood">
                {MOOD_BY_ID[calendarData[selectedDay]].emoji} {MOOD_BY_ID[calendarData[selectedDay]].label}
              </span>
            )}
          </div>

          {/* Mood picker */}
          <div className="mt-block">
            <p className="block-label">How are you feeling?</p>
            <div className="mood-grid">
              {MOODS.map(m => (
                <button
                  key={m.id}
                  className={`mood-btn ${mood === m.id ? "mood-active" : ""}`}
                  style={{ "--mc": m.color, "--mb": m.bg }}
                  onClick={() => setMood(m.id)}
                >
                  <span className="mood-emoji">{m.emoji}</span>
                  <span className="mood-lbl">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Emotions */}
          <div className="mt-block">
            <div className="block-row">
              <p className="block-label">Emotions</p>
              <button className="add-tag-btn" onClick={() => setAddingEmotion(v => !v)}>+ Add</button>
            </div>
            <div className="tag-row">
              {allEmotions.map(e => (
                <TagPill
                  key={e} label={e}
                  active={emotions.includes(e)}
                  color={activeMood?.color || "#5ec98a"}
                  onClick={() => toggleTag(emotions, setEmotions, e)}
                  custom={customEmotions.includes(e)}
                  onRemove={() => setCustomEmotions(prev => prev.filter(x => x !== e))}
                />
              ))}
            </div>
            {addingEmotion && (
              <div className="add-row">
                <input
                  className="mt-input"
                  placeholder="Type an emotion…"
                  value={newEmotion}
                  onChange={e => setNewEmotion(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && newEmotion.trim()) {
                      setCustomEmotions(p => [...p, newEmotion.trim()]);
                      setNewEmotion(""); setAddingEmotion(false);
                    }
                  }}
                />
                <button className="add-confirm" onClick={() => {
                  if (newEmotion.trim()) {
                    setCustomEmotions(p => [...p, newEmotion.trim()]);
                    setNewEmotion(""); setAddingEmotion(false);
                  }
                }}>Add</button>
              </div>
            )}
          </div>

          {/* Activities */}
          <div className="mt-block">
            <div className="block-row">
              <p className="block-label">Activities</p>
              <button className="add-tag-btn" onClick={() => setAddingActivity(v => !v)}>+ Add</button>
            </div>
            <div className="tag-row">
              {allActivities.map(a => (
                <TagPill
                  key={a} label={a}
                  active={activities.includes(a)}
                  color={activeMood?.color || "#60a5fa"}
                  onClick={() => toggleTag(activities, setActivities, a)}
                  custom={customActivities.includes(a)}
                  onRemove={() => setCustomActivities(prev => prev.filter(x => x !== a))}
                />
              ))}
            </div>
            {addingActivity && (
              <div className="add-row">
                <input
                  className="mt-input"
                  placeholder="Type an activity…"
                  value={newActivity}
                  onChange={e => setNewActivity(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && newActivity.trim()) {
                      setCustomActivities(p => [...p, newActivity.trim()]);
                      setNewActivity(""); setAddingActivity(false);
                    }
                  }}
                />
                <button className="add-confirm" onClick={() => {
                  if (newActivity.trim()) {
                    setCustomActivities(p => [...p, newActivity.trim()]);
                    setNewActivity(""); setAddingActivity(false);
                  }
                }}>Add</button>
              </div>
            )}
          </div>

          {/* Reflection questions */}
          <div className="mt-block">
            <p className="block-label">Daily Reflections</p>
            {QUESTIONS.map(q => (
              <div key={q.id} className="question-wrap">
                <label className="question-label">{q.text}</label>
                <input
                  className="mt-input"
                  placeholder="Write here…"
                  value={answers[q.id] || ""}
                  onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                />
              </div>
            ))}
          </div>

          {/* Free note */}
          <div className="mt-block">
            <p className="block-label">Journal Note</p>
            <textarea
              className="mt-textarea"
              placeholder="Let your thoughts flow freely…"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          <button
            className={`save-btn ${saved ? "saved" : ""} ${!mood ? "disabled" : ""}`}
            onClick={handleSave}
            disabled={!mood}
          >
            {saved ? "✓ Saved!" : "Save Entry"}
          </button>
        </div>

        {/* RIGHT: graph + summary */}
        <div className="mt-right">

          <div className="mt-block">
            <p className="block-label">Monthly Mood Trend</p>
            <p className="block-sub">Weekly average across {MONTHS[month]}</p>
            <MoodGraph calendarData={calendarData} month={month} year={year} />
          </div>

          <div className="mt-block">
            <p className="block-label">Mood Breakdown</p>
            <div className="breakdown-list">
              {MOODS.map(m => {
                const count = Object.values(calendarData).filter(id => id === m.id).length;
                const pct   = totalEntries ? Math.round((count / totalEntries) * 100) : 0;
                return (
                  <div key={m.id} className="breakdown-row">
                    <span className="bd-emoji">{m.emoji}</span>
                    <span className="bd-label">{m.label}</span>
                    <div className="bd-bar-track">
                      <div className="bd-bar-fill" style={{ width: `${pct}%`, background: m.color }} />
                    </div>
                    <span className="bd-pct">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-block mood-tips">
            <p className="block-label">Today's Tip</p>
            <p className="tip-text">
              {activeMood?.id === "rad"     && "You're glowing today ✨ Share that energy with someone."}
              {activeMood?.id === "happy"   && "Great day! Try capturing this feeling in your journal."}
              {activeMood?.id === "okay"    && "Neutral days are valid. A short walk can shift things gently."}
              {activeMood?.id === "sad"     && "Be gentle with yourself today 💜 Rest is productive too."}
              {activeMood?.id === "anxious" && "Try 4-7-8 breathing: in for 4, hold 7, out for 8."}
              {activeMood?.id === "angry"   && "Write it out — anger often carries an important message."}
              {!activeMood               && "Select a mood to get a personalised tip for today."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}