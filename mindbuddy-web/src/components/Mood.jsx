import { useState } from "react";
import "./css/mood.css";
import { MoodIcons } from "./MoodIcons";

const moods = ["Happy", "Neutral", "Sad", "Angry", "Anxious"];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate calendar days
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const days = Array.from(
    { length: getDaysInMonth(currentMonth, currentYear) },
    (_, i) => i + 1
  );

  return (
    <div className="mood-container">
      <h2>How are you feeling now?</h2>

      {/* 📅 Calendar */}
      <div className="calendar">
        {days.map((day) => {
          const isToday = day === today.getDate();

          return (
            <div
              key={day}
              className={`day ${isToday ? "today" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Mood Selection */}
      <div className="mood-grid">
        {moods.map((mood, index) => {
          const Icon = MoodIcons[mood];

          return (
            <div
              key={index}
              className={`mood-card ${
                selectedMood === mood ? "active" : ""
              }`}
              onClick={() => setSelectedMood(mood)}
            >
              <Icon active={selectedMood === mood} />
              <p>{mood}</p>
            </div>
          );
        })}
      </div>

      {/* Inputs */}
      <div className="section">
        <h3>What are your emotions?</h3>
        <input placeholder="Add emotions..." />
      </div>

      <div className="section">
        <h3>What are you doing?</h3>
        <input placeholder="Add activities..." />
      </div>

      <div className="section">
        <h3>Write your thoughts</h3>
        <textarea
          placeholder="Write here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* 📊 Simple Mood Graph */}
      <div className="graph">
        <h3>Mood Trend</h3>
        <div className="graph-bars">
          {[3, 4, 2, 5, 3, 4, 1].map((value, i) => (
            <div key={i} className="bar">
              <div
                className="fill"
                style={{ height: `${value * 20}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {selectedMood && (
        <p className="selected-text">
          You’re feeling <strong>{selectedMood}</strong> today 💭
        </p>
      )}

      <button className="save-btn">Save Mood</button>
    </div>
  );
}