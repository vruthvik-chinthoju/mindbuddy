import "./css/sleep.css";
import {
  MdBedtime,
  MdNightsStay,
  MdLibraryMusic,
  MdAir,
  MdTipsAndUpdates,
  MdTimer,
} from "react-icons/md";

const sleepContent = [
  {
    icon: <MdBedtime />,
    title: "Deep Sleep Meditation",
    duration: "15 min",
    description:
      "Relax your mind and drift into a peaceful deep sleep.",
  },
  {
    icon: <MdNightsStay />,
    title: "Sleep Story",
    duration: "20 min",
    description:
      "Calming bedtime stories designed to help you fall asleep.",
  },
  {
    icon: <MdLibraryMusic />,
    title: "Rain Sounds",
    duration: "∞",
    description:
      "Gentle rainfall sounds to improve sleep quality.",
  },
  {
    icon: <MdAir />,
    title: "White Noise",
    duration: "∞",
    description:
      "Block distractions and create a calm sleep environment.",
  },
  {
    icon: <MdTimer />,
    title: "Power Nap",
    duration: "20 min",
    description:
      "Recharge your energy with a scientifically backed nap.",
  },
  {
    icon: <MdTipsAndUpdates />,
    title: "Sleep Tips",
    duration: "Daily",
    description:
      "Learn proven habits that improve sleep quality.",
  },
];

export default function Sleep() {
  return (
    <div className="sleep-page">
        <div className="sleepimg">
            <img src="https://static.vecteezy.com/system/resources/previews/015/535/257/non_2x/sleepy-icon-free-vector.jpg" alt="" />
        </div>
      <div className="sleep-hero">
        <div className="moon-icon"></div>


        <h1>Sleep Better Tonight</h1>

        <p>
          Discover relaxing sounds, guided meditations,
          sleep stories and healthy bedtime habits.
        </p>
      </div>

      <div className="sleep-stats">
        <div className="stat-card">
          <h3>🔥 Sleep Streak</h3>
          <span>7 Days</span>
        </div>

        <div className="stat-card">
          <h3>⏰ Avg Sleep</h3>
          <span>7.8 hrs</span>
        </div>

        <div className="stat-card">
          <h3>⭐ Quality</h3>
          <span>89%</span>
        </div>
      </div>

      <h2 className="section-title">
        Sleep Library
      </h2>

      <div className="sleep-grid">
        {sleepContent.map((item) => (
          <div className="sleep-card" key={item.title}>
            <div className="sleep-card-icon">
              {item.icon}
            </div>

            <div className="sleep-duration">
              {item.duration}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <button>Start</button>
          </div>
        ))}
      </div>

      <div className="bedtime-section">
        <h2>Healthy Bedtime Habits</h2>

        <div className="habit">
          📵 Avoid screens 1 hour before bed
        </div>

        <div className="habit">
          ☕ Avoid caffeine after 2 PM
        </div>

        <div className="habit">
          🌙 Keep your room dark and cool
        </div>

        <div className="habit">
          📚 Read a book before sleeping
        </div>

        <div className="habit">
          🧘 Practice a 5-minute meditation
        </div>
      </div>
    </div>
  );
}