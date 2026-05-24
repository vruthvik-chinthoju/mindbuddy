export const MoodIcons = {
  Happy: ({ active }) => (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill={active ? "#22c55e" : "#d1fae5"} />
      <circle cx="18" cy="20" r="2" fill="#065f46" />
      <circle cx="30" cy="20" r="2" fill="#065f46" />
      <path d="M16 28c2 3 6 3 8 3s6 0 8-3" stroke="#065f46" strokeWidth="2" fill="none"/>
    </svg>
  ),

  Neutral: ({ active }) => (
    <svg width="48" height="48">
      <circle cx="24" cy="24" r="20" fill={active ? "#facc15" : "#fef9c3"} />
      <circle cx="18" cy="20" r="2" fill="#713f12" />
      <circle cx="30" cy="20" r="2" fill="#713f12" />
      <line x1="16" y1="30" x2="32" y2="30" stroke="#713f12" strokeWidth="2"/>
    </svg>
  ),

  Sad: ({ active }) => (
    <svg width="48" height="48">
      <circle cx="24" cy="24" r="20" fill={active ? "#60a5fa" : "#dbeafe"} />
      <circle cx="18" cy="20" r="2" fill="#1e3a8a" />
      <circle cx="30" cy="20" r="2" fill="#1e3a8a" />
      <path d="M16 32c2-3 6-3 8-3s6 0 8 3" stroke="#1e3a8a" strokeWidth="2" fill="none"/>
    </svg>
  ),

  Angry: ({ active }) => (
    <svg width="48" height="48">
      <circle cx="24" cy="24" r="20" fill={active ? "#ef4444" : "#fee2e2"} />
      <path d="M16 18l4-2M32 18l-4-2" stroke="#7f1d1d" strokeWidth="2"/>
      <circle cx="18" cy="22" r="2" fill="#7f1d1d" />
      <circle cx="30" cy="22" r="2" fill="#7f1d1d" />
      <path d="M16 32c3-2 13-2 16 0" stroke="#7f1d1d" strokeWidth="2"/>
    </svg>
  ),

  Anxious: ({ active }) => (
    <svg width="48" height="48">
      <circle cx="24" cy="24" r="20" fill={active ? "#a78bfa" : "#ede9fe"} />
      <circle cx="18" cy="20" r="2" fill="#4c1d95" />
      <circle cx="30" cy="20" r="2" fill="#4c1d95" />
      <path d="M20 30c2-2 6-2 8 0" stroke="#4c1d95" strokeWidth="2"/>
    </svg>
  ),
};