import "./css/navbar.css";
import { useState, useEffect, useRef } from "react";
import { NavIcons } from "./NavIcons";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScroll = useRef(0);

  const tabs = [
    { path: "/", label: "Home", icon: NavIcons.Home },
    { path: "/Explore", label: "Explore", icon: NavIcons.Explore },
    { path: "/Mood", label: "Mood", icon: NavIcons.Mood },
    { path: "/Chat", label: "Chat", icon: NavIcons.Chat },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
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
        <div
          className="overlay"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* Desktop Navbar */}
      <div className="navbar desktop">
        <h2 className="logo">
          <span>Mind</span>Buddy
        </h2>

        <div className="nav-links">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                <Icon />
                {tab.label}
              </NavLink>
            );
          })}
        </div>

        <div
          className="hamburger"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <NavIcons.Menu />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <h2>
          Mind<span>Buddy</span>
        </h2>

        <div onClick={() => setOpenMenu((prev) => !prev)}>
          <NavIcons.Menu />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div
        className={`mobile-bottom-nav ${
          showNav ? "show" : "hide"
        }`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon />
              <span className="label">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Side Drawer */}
      <div className={`side-menu ${openMenu ? "open" : ""}`}>
        <h3>Menu</h3>

        <button onClick={() => setOpenMenu(false)}>
          Profile
        </button>

        <button onClick={() => setOpenMenu(false)}>
          Call
        </button>

        <button onClick={() => setOpenMenu(false)}>
          Settings
        </button>

        <button onClick={() => setOpenMenu(false)}>
          About
        </button>
      </div>
    </>
  );
}