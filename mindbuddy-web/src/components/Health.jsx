import "./css/health.css";
import {
  MdSelfImprovement,
  MdBedtime,
  MdDirectionsWalk,
  MdOutlineSpa,
  MdFavorite,
  MdPsychology,
  MdMusicNote,
  MdWaterDrop,
} from "react-icons/md";

const tips = [
  {
    icon: <MdSelfImprovement />,
    title: "Meditate Daily",
    description:
      "Just 10 minutes of meditation can reduce stress, improve focus, and promote emotional balance.",
  },
  {
    icon: <MdBedtime />,
    title: "Prioritize Sleep",
    description:
      "Aim for 7–9 hours of quality sleep. Poor sleep is linked to anxiety, depression, and mood swings.",
  },
  {
    icon: <MdDirectionsWalk />,
    title: "Take Daily Walks",
    description:
      "Walking in nature lowers cortisol levels and boosts mental clarity.",
  },
  {
    icon: <MdOutlineSpa />,
    title: "Practice Deep Breathing",
    description:
      "Slow breathing activates the body's relaxation response and reduces anxiety.",
  },
  {
    icon: <MdFavorite />,
    title: "Express Gratitude",
    description:
      "Writing down 3 things you're grateful for can improve happiness and resilience.",
  },
  {
    icon: <MdPsychology />,
    title: "Challenge Negative Thoughts",
    description:
      "Ask yourself whether a negative thought is truly factual or just an assumption.",
  },
  {
    icon: <MdMusicNote />,
    title: "Listen to Calming Music",
    description:
      "Soft instrumental music can reduce stress and promote relaxation.",
  },
  {
    icon: <MdWaterDrop />,
    title: "Stay Hydrated",
    description:
      "Even mild dehydration can affect mood, concentration, and energy levels.",
  },
];

export default function HealthTips() {
  return (
    <div className="tips-page">
      <div className="tips-hero">
        <h1>Mental Wellness Tips</h1>
        <p>
          Small habits backed by psychology and wellness practices that can
          improve your mental health every day.
        </p>
      </div>

      <div className="daily-tip">
        <h2>Tip of the Day</h2>
        <p>
          Take a 5-minute mindful breathing break right now. Inhale for 4
          seconds, hold for 4 seconds, exhale for 6 seconds.
        </p>
      </div>

      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div className="tip-card" key={index}>
            <div className="tip-icon">{tip.icon}</div>

            <h3>{tip.title}</h3>

            <p>{tip.description}</p>
          </div>
        ))}
      </div>

      <div className="wellness-section">
        <h2>Proven Mental Health Habits</h2>

        <div className="habit-list">
          <div className="habit-item">
            🌞 Get morning sunlight within 30 minutes of waking up.
          </div>

          <div className="habit-item">
            📵 Reduce social media usage before bedtime.
          </div>

          <div className="habit-item">
            📝 Journal your emotions instead of suppressing them.
          </div>

          <div className="habit-item">
            🤝 Stay connected with friends and family.
          </div>

          <div className="habit-item">
            🧘 Practice mindfulness during daily activities.
          </div>

          <div className="habit-item">
            💧 Drink enough water throughout the day.
          </div>

          <div className="habit-item">
            🚶 Move your body for at least 20 minutes daily.
          </div>

          <div className="habit-item">
            ❤️ Be kind to yourself during difficult moments.
          </div>
        </div>
      </div>
    </div>
  );
}