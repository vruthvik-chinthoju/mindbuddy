import "./css/home.css";
import { FiMenu } from "react-icons/fi";

import {
  GiMeditation,
} from "react-icons/gi";

import {
  MdPsychology,
  MdSelfImprovement,
  MdMenuBook,
} from "react-icons/md";

import {
  FaBrain,
  FaRegSmile,
} from "react-icons/fa";

export default function Home() {
  const cards = [
    { title: "Mental Wellness", icon: <GiMeditation /> },
    { title: "Distress Signals", icon: <FaRegSmile /> },
    { title: "Understanding", icon: <MdPsychology /> },
    { title: "Success Stories", icon: <MdSelfImprovement /> },
    { title: "Self Help", icon: <MdMenuBook /> },
    { title: "Brain Food", icon: <FaBrain /> },
  ];

  return (
    <div className="home">

      {/* Header */}
      <div className="header">
        {/* <h2 className="logo">MindBuddy</h2> */}
        {/* <FiMenu size={22} /> */}
      </div>

      {/* Hero */}
      <div className="hero">
        <h3>Your safe space to connect & heal</h3>
      </div>

      {/* Search */}
      <div className="search-bar">
        <button>
          <a href="">What are you feeling Today ?</a>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 74 74"
              height="34"
              width="34"
            >
              <circle strokewidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
              <path
                fill="black"
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
              ></path>
            </svg>
          </div>
        </button>

      </div>


      {/* Cards */}
      <div className="grid">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="icon">{card.icon}</div>
            <p>{card.title}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta">
        <p>Need immediate support?</p>
        <p> 📞 Call : 14410/14416</p>
        <button>Talk Now</button>
      </div>

      <div className="day">
        <h3>Day</h3>
        <div className="dayplan">
          <button>Plan Your Day</button>
          <img src="https://i.pinimg.com/736x/7b/22/1b/7b221b1565e8734c091b94b773f18041.jpg" alt="" />
        </div>
      </div>


    </div>

  );
}