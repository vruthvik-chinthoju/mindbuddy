export const NavIcons = {
  Home: ({ active }) => (
    <svg width="20" height="20">
      <path d="M3 10L10 3l7 7v7H3v-7z"
        stroke={active ? "black" : "#fff"}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),

  Chat: ({ active }) => (
    <svg width="20" height="20">
      <path d="M4 4h12v8H7l-3 3V4z"
        stroke={active ? "black" : "#fff"}
        strokeWidth="2"
      />
    </svg>
  ),

  Mood: ({ active }) => (
    <svg width="20" height="20">
      <circle cx="10" cy="10" r="8"
        stroke={active ? "black" : "#fff"}
        strokeWidth="2"
        fill="none"
      />
      <circle cx="7" cy="8" r="1" fill={active ? "#4CAF50" : "#fff"} />
      <circle cx="13" cy="8" r="1" fill={active ? "#4CAF50" : "#fff"} />
      <path d="M6 12c1.5 2 4.5 2 6 0"
        stroke={active ? "black" : "#fff"}
        strokeWidth="2"
      />
    </svg>
  ),

  Explore: ({ active }) => (
    <svg width="20" height="20">
      <circle cx="10" cy="10" r="8"
        stroke={active ? "black" : "#fff"}
        strokeWidth="2"
        fill="none"
      />
      <path d="M10 6l3 3-3 5-3-3z"
        fill={active ? "black" : "#fff"}
      />
    </svg>
  ),

  Menu: () => (
    <svg width="24" height="24">
      <line x1="4" y1="6" x2="20" y2="6" stroke="#fff" strokeWidth="2"/>
      <line x1="4" y1="12" x2="20" y2="12" stroke="#fff" strokeWidth="2"/>
      <line x1="4" y1="18" x2="20" y2="18" stroke="#fff" strokeWidth="2"/>
    </svg>
  )
};