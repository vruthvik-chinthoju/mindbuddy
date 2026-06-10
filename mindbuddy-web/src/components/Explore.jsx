import "./css/Explore.css";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Journal",
    img: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
    path: "/Journal",
  },
  {
    title: "Activities",
    img: "https://cdn-icons-png.flaticon.com/512/3534/3534061.png",
    path: "/Activities",
  },
  {
    title: "Exercises",
    img: "https://cdn-icons-png.flaticon.com/512/3048/3048398.png",
    path: "/Exercises",
  },
  {
    title: "How you feel",
    img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    path: "/Mood",
  },
  {
    title: "Set Goals",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    path: "/Goals",
  },
  {
    title: "Sleep",
    img: "https://cdn-icons-png.flaticon.com/512/2933/2933186.png",
    path: "/Sleep",
  },
  {
    title: "Travel",
    img: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    path: "/Travel",
  },
  {
    title: "Health Tips",
    img: "https://cdn-icons-png.flaticon.com/512/2966/2966483.png",
    path: "/Health",
  },
  {
    title: "Talk With MindBuddy",
    img: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
    path: "/Chat",
  },
  {
    title: "Check Your Progress",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
    path: "/Progress",
  },
];

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="explore">
      <h1>
        Explore Your <span>Mental Space</span>
      </h1>

      <p>
        Discover calming exercises, mindfulness tools,
        sleep support, journaling, music therapy,
        and more designed for your mental wellness.
      </p>

      <div className="card-container">
        {cards.map((card, i) => (
          <div key={i} className="big-card">
            <div className="left">
              <h2>{card.title}</h2>

              <button onClick={() => navigate(card.path)}>
                See More
              </button>
            </div>

            <img src={card.img} alt={card.title} />
          </div>
        ))}
      </div>
    </div>
  );
}