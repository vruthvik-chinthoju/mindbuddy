import { useState } from "react";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Mood from "./components/Mood";
import Wellness from "./components/Wellness";
import Home from "./components/Home";
import Explore from "./components/Explore";

function Journal() {
  return <h2>📓 Journal Page</h2>;
}
function Goals() {
  return <h2>🎯 Goals Page</h2>;
}
function Sleep() {
  return <h2>😴 Sleep Page</h2>;
}
function Activities() {
  return <h2>🏃 Activities Page</h2>;
}
function Music() {
  return <h2>🎵 Music Page</h2>;
}
function Travel() {
  return <h2>✈️ Travel Page</h2>;
}
function Community() {
  return <h2>👥 Community Page</h2>;
}
function Movies() {
  return <h2>🎬 Movies Page</h2>;
}
function Health() {
  return <h2>🩺 Health Tips</h2>;
}
function Training() {
  return <h2>💪 Training Program</h2>;
}
function Progress() {
  return <h2>📊 Your Progress</h2>;
}

export default function App() {
  const [tab, setTab] = useState("explore");

  const renderPage = () => {
    switch (tab) {
      case "home":
        return <Home />;
      case "explore":
        return <Explore setTab={setTab} />;
      case "chat":
        return <Chat />;
      case "mood":
        return <Mood />;
      case "journal":
        return <Journal />;
      case "goals":
        return <Goals />;
      case "sleep":
        return <Sleep />;
      case "activities":
        return <Activities />;
      case "music":
        return <Music />;
      case "travel":
        return <Travel />;
      case "community":
        return <Community />;
      case "movies":
        return <Movies />;
      case "health":
        return <Health />;
      case "training":
        return <Training />;
      case "progress":
        return <Progress />;
      default:
        return <Home/>;
    }
  };

  return (
    <div className="app-container">
      <Navbar setTab={setTab} activeTab={tab} />
      <div className="content">{renderPage()}</div>
    </div>
  );
}