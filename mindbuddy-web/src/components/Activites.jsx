import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Activites.css";

export default function Activities() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [seconds, setSeconds] = useState(600);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const activities = [
    {
      title: "Meditation",
      icon: "🧘",
      color: "#FF7A45",
      redirect: "/exercises",
      description:
        "Practice guided meditation to calm your mind and reduce stress.",
      benefits: [
        "Reduces anxiety",
        "Improves focus",
        "Promotes inner peace",
      ],
    },
    {
      title: "Deep Breathing",
      icon: "🌬️",
      color: "#FFD43B",
      redirect: "/exercises",
      description:
        "Use breathing techniques to regulate emotions and relax instantly.",
      benefits: [
        "Lowers stress",
        "Calms nervous system",
        "Improves mindfulness",
      ],
    },
    {
      title: "Mindful Walking",
      icon: "🚶",
      color: "#22C55E",
      timer: true,
      description:
        "Take a slow mindful walk while focusing on your breathing and surroundings.",
      benefits: [
        "Reduces overthinking",
        "Improves mood",
        "Boosts mental clarity",
      ],
    },
    {
      title: "Gratitude Practice",
      icon: "❤️",
      color: "#EF4444",
      description:
        "Write down three things you are grateful for today.",
      benefits: [
        "Increases happiness",
        "Reduces negativity",
        "Improves optimism",
      ],
    },
    {
      title: "Digital Detox",
      icon: "📵",
      color: "#8B5CF6",
      description:
        "Stay away from social media and unnecessary screen time for 30 minutes.",
      benefits: [
        "Less anxiety",
        "Better focus",
        "Improved mental clarity",
      ],
    },
    {
      title: "Morning Sunlight",
      icon: "☀️",
      color: "#F59E0B",
      description:
        "Spend 10–15 minutes in natural sunlight after waking.",
      benefits: [
        "Boosts mood",
        "Improves sleep",
        "Increases energy",
      ],
    },
    {
      title: "Sleep Hygiene",
      icon: "😴",
      color: "#4F46E5",
      description:
        "Avoid screens before bed and maintain a regular sleep schedule.",
      benefits: [
        "Better sleep quality",
        "Less stress",
        "Improved recovery",
      ],
    },
    {
      title: "Focus Session",
      icon: "🎯",
      color: "#2563EB",
      description:
        "Use the Pomodoro method: 25 minutes work and 5 minutes break.",
      benefits: [
        "Better productivity",
        "Reduced burnout",
        "Improved concentration",
      ],
    },
    {
      title: "Relaxing Music",
      icon: "🎵",
      color: "#EC4899",
      description:
        "Listen to calming music, rain sounds, or nature sounds.",
      benefits: [
        "Reduces stress",
        "Promotes relaxation",
        "Improves mood",
      ],
    },
    {
      title: "Journaling",
      icon: "📝",
      color: "#10B981",
      redirect: "/journal",
      description:
        "Reflect on your emotions and experiences through journaling.",
      benefits: [
        "Improves self-awareness",
        "Reduces emotional burden",
        "Tracks personal growth",
      ],
    },
  ];

  useEffect(() => {
    let interval;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setRunning(false);
      setCompleted(true);
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  const handleCardClick = (activity) => {
    setCompleted(false);
    setSeconds(600);

    if (activity.redirect) {
      navigate(activity.redirect);
      return;
    }

    setSelected(activity);
  };

  return (
    <div className="activities-page">
      <div className="activities-header">
        <h1>Daily Mental Wellness Activities</h1>

        <p>
          Small daily actions can create a healthier,
          calmer and happier mind.
        </p>
      </div>

      <div className="activities-grid">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="activity-card"
            style={{ background: activity.color }}
            onClick={() =>
              handleCardClick(activity)
            }
          >
            <span>{activity.icon}</span>
            <h3>{activity.title}</h3>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="modal-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              {selected.icon} {selected.title}
            </h2>

            <p>{selected.description}</p>

            <h3>Benefits</h3>

            <ul>
              {selected.benefits.map((benefit) => (
                <li key={benefit}>✓ {benefit}</li>
              ))}
            </ul>

            {selected.timer && (
              <>
                <div className="timer-display">
                  {formatTime()}
                </div>

                {!completed ? (
                  <div className="timer-buttons">
                    <button
                      onClick={() => setRunning(true)}
                    >
                      Start
                    </button>

                    <button
                      onClick={() => setRunning(false)}
                    >
                      Pause
                    </button>

                    <button
                      onClick={() => {
                        setRunning(false);
                        setSeconds(600);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  <div className="success-box">
                    🎉 Congratulations!
                    <br />
                    You completed your 10 minute
                    mindful walk.
                  </div>
                )}
              </>
            )}

            {!selected.timer && (
              <button className="complete-btn">
                Mark Complete
              </button>
            )}

            <button
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}