import "./css/navbar.css";
import { useState, useEffect, useRef } from "react";
import { NavIcons } from "./NavIcons";

export default function Navbar({ setTab, activeTab }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScroll = useRef(0);

  const tabs = [
    { key: "home", label: "Home", icon: NavIcons.Home },
    { key: "explore", label: "Explore", icon: NavIcons.Explore },
    { key: "mood", label: "Mood", icon: NavIcons.Mood },
    { key: "chat", label: "Chat", icon: NavIcons.Chat },
  ];

  // 🔥 Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 50) {
        setShowNav(false); // scroll down
      } else {
        setShowNav(true); // scroll up
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Overlay */}
      {openMenu && (
        <div className="overlay" onClick={() => setOpenMenu(false)} />
      )}

      {/* Desktop Navbar */}
      <div className="navbar desktop">
        <h2 className="logo"><span>Mind</span>Buddy</h2>

        <div className="nav-links">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                className={activeTab === tab.key ? "active" : ""}
                onClick={() => setTab(tab.key)}
              >
                <Icon active={activeTab === tab.key} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="hamburger"
          onClick={() => setOpenMenu(prev => !prev)}
        >
          <NavIcons.Menu />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <h2>Mind<span>Buddy</span></h2>

        <div onClick={() => setOpenMenu(prev => !prev)}>
          <NavIcons.Menu />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className={`mobile-bottom-nav ${showNav ? "show" : "hide"}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              className={`nav-item ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setTab(tab.key)}
            >
              <Icon active={activeTab === tab.key} />
              <span className="label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Side Drawer */}
      <div className={`side-menu ${openMenu ? "open" : ""}`}>
        <h3></h3>
        <button onClick={() => setOpenMenu(false)}>Profile</button>
        <button onClick={() => setOpenMenu(false)}>Call</button>
        <button onClick={() => setOpenMenu(false)}>Settings</button>
        <button onClick={() => setOpenMenu(false)}>About</button>
      </div>
    </>
  );
}