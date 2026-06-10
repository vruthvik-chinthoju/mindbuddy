import "./css/goals.css";
import {
  FaBrain,
  FaMoon,
  FaBookOpen,
  FaSun,
  FaWater,
  FaBriefcase,
  FaHeart,
  FaSmile,
  FaRocket,
  FaMountain,
  FaTrophy,
  FaStar,
} from "react-icons/fa";

import { GiMeditation } from "react-icons/gi";

const goalsData = [
  {
    category: "Daily Habits",
    goals: [
      {
        title: "Build a Meditation Habit",
        icon: <GiMeditation />,
        description: "Meditate 5 minutes daily and build consistency.",
        progress: 43,
        days: "3/7 Days",
      },
      {
        title: "Improve Sleep Quality",
        icon: <FaMoon />,
        description: "Create a healthier sleep routine.",
        progress: 35,
        days: "5/14 Days",
      },
      {
        title: "Daily Reflection",
        icon: <FaBookOpen />,
        description: "Write a journal entry every day.",
        progress: 28,
        days: "2/7 Days",
      },
      {
        title: "Morning Mindfulness",
        icon: <FaSun />,
        description: "Start every morning with intention.",
        progress: 60,
        days: "6/10 Days",
      },
    ],
  },

  {
    category: "Stress Relief",
    goals: [
      {
        title: "Reduce Daily Stress",
        icon: <FaWater />,
        description:
          "Practice breathing and relaxation exercises daily.",
      },
      {
        title: "Beat Work Stress",
        icon: <FaBriefcase />,
        description: "Mindful breaks and focus sessions.",
      },
      {
        title: "Emotional Balance",
        icon: <FaHeart />,
        description: "Improve emotional awareness and calm.",
      },
    ],
  },

  {
    category: "Positive Mindset",
    goals: [
      {
        title: "Happiness Challenge",
        icon: <FaSmile />,
        description: "Practice gratitude and positivity daily.",
      },
      {
        title: "Boost Confidence",
        icon: <FaRocket />,
        description: "Build confidence through daily actions.",
      },
      {
        title: "Build Resilience",
        icon: <FaMountain />,
        description: "Learn coping skills for difficult moments.",
      },
    ],
  },

  {
    category: "Advanced Challenges",
    goals: [
      {
        title: "30 Days of Mindfulness",
        icon: <FaBrain />,
        description:
          "Meditation, journaling, gratitude and breathing.",
        featured: true,
      },
      {
        title: "Mental Wellness Transformation",
        icon: <FaTrophy />,
        description:
          "Complete all wellness pillars in 60 days.",
        featured: true,
      },
    ],
  },
];

export default function Goals() {
  return (
    <div className="goals-page">
      <div className="hero">
        <h1>Your Wellness Goals</h1>
        <p>
          Small daily actions that strengthen your mind and improve
          mental wellbeing.
        </p>
        <div className="goalsimg">
            <img src="https://static.vecteezy.com/system/resources/previews/005/642/854/original/illustration-graphic-cartoon-character-of-achieving-goals-vector.jpg" alt="" />
        </div>
      </div>

      {goalsData.map((section) => (
        <div key={section.category} className="goal-section">
          <h2>{section.category}</h2>

          <div className="goals-grid">
            {section.goals.map((goal) => (
              <div
                key={goal.title}
                className={`goal-card ${
                  goal.featured ? "featured" : ""
                }`}
              >
                <div className="goal-icon">{goal.icon}</div>

                <h3>{goal.title}</h3>

                <p>{goal.description}</p>

                {goal.progress !== undefined && (
                  <>
                    <div className="progress-row">
                      <span>Progress</span>
                      <span>{goal.days}</span>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </>
                )}

                <button>
                  {goal.progress !== undefined
                    ? "Continue"
                    : "Start Challenge"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}