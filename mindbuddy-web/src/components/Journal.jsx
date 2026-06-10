import { useState, useEffect } from "react";
import "./css/Journal.css";
import {
  FaSun,
  FaMoon,
  FaStar,
  FaCloudRain,
  FaBrain,
  FaHeart,
} from "react-icons/fa";

export default function Journal() {
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("journals")) || [];
    setEntries(saved);
  }, []);

  const journals = [
    {
      title: "Morning Journal",
      desc: "Start your day with positivity and purpose.",
      icon: <FaSun />,
    },
    {
      title: "Evening Journal",
      desc: "Reflect on your day and learn from it.",
      icon: <FaMoon />,
    },
    {
      title: "Positive Moments",
      desc: "Capture happy memories and achievements.",
      icon: <FaStar />,
    },
    {
      title: "Negative Situations",
      desc: "Process difficult experiences safely.",
      icon: <FaCloudRain />,
    },
    {
      title: "Trigger Journal",
      desc: "Identify stress and emotional triggers.",
      icon: <FaBrain />,
    },
    {
      title: "Gratitude Journal",
      desc: "Focus on what you're thankful for.",
      icon: <FaHeart />,
    },
  ];

  const saveJournal = (category) => {
    if (!content.trim()) return;

    const newEntry = {
      id: Date.now(),
      category,
      content,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const updated = [newEntry, ...entries];

    setEntries(updated);

    localStorage.setItem(
      "journals",
      JSON.stringify(updated)
    );

    setContent("");
  };

  return (
    <div className="journal-page">
      <div className="journal-hero">
        <h1>Journals</h1>

        <p>
          Reflect, heal, and track your personal
          journey through guided journaling.
        </p>

        <div className="journal-tags">
          <span>Mindfulness</span>
          <span>CBT</span>
          <span>DBT</span>
          <span>Positive Psychology</span>
        </div>
      </div>

      <div className="journal-container">
        {journals.map((journal) => (
          <div
            className={`journal-card ${
              selectedJournal === journal.title
                ? "expanded"
                : ""
            }`}
            key={journal.title}
          >
            <div className="card-top">
              <div>
                <h2>{journal.title}</h2>
                <p>{journal.desc}</p>

                <button
                  className="write-btn"
                  onClick={() =>
                    setSelectedJournal(
                      selectedJournal === journal.title
                        ? null
                        : journal.title
                    )
                  }
                >
                  {selectedJournal === journal.title
                    ? "Close"
                    : "Write"}
                </button>
              </div>

              <div className="journal-icon">
                {journal.icon}
              </div>
            </div>

            {selectedJournal === journal.title && (
              <div className="inline-editor">
                <textarea
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  placeholder={`Write your ${journal.title.toLowerCase()} here...`}
                />

                <button
                  className="save-btn"
                  onClick={() =>
                    saveJournal(journal.title)
                  }
                >
                  Save Journal
                </button>

                <h3>📚 Previous Entries</h3>

                <div className="entries-container">
                  {entries
                    .filter(
                      (entry) =>
                        entry.category ===
                        journal.title
                    )
                    .map((entry) => (
                      <div
                        className="entry-card"
                        key={entry.id}
                      >
                        <div className="entry-date">
                          {entry.date} • {entry.time}
                        </div>

                        <p>{entry.content}</p>
                      </div>
                    ))}

                  {entries.filter(
                    (entry) =>
                      entry.category ===
                      journal.title
                  ).length === 0 && (
                    <div className="empty-entry">
                      No journal entries yet.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}