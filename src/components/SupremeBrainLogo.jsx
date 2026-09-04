import React from 'react';

export default function SupremeBrainLogo({ className = 'w-8 h-8', showGlow = true }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={`${className} transition-transform duration-300 group-hover:scale-105 shrink-0`}
      fill="none"
      aria-label="Supreme Brain Emblem"
    >
      <defs>
        <linearGradient id="logoGoldBright" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7C2" />
          <stop offset="30%" stopColor="#F5D061" />
          <stop offset="70%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#9E7008" />
        </linearGradient>

        <linearGradient id="logoGoldHigh" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        <linearGradient id="logoGoldDeep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="50%" stopColor="#8A6305" />
          <stop offset="100%" stopColor="#573D00" />
        </linearGradient>

        {showGlow && (
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4A017" floodOpacity="0.4" />
          </filter>
        )}
      </defs>

      <g filter={showGlow ? 'url(#logoGlow)' : undefined}>
        {/* Dark Silhouette Backing */}
        <path
          d="M22 6
             C33 5 44 9 52 17
             C58 23 58 32 54 39
             C50 44 42 45 36 45
             C35 48 37 56 39 59
             L23 59
             C25 56 27 48 26 45
             C19 45 13 41 9 34
             C5 26 8 16 16 10
             C18 8 20 7 22 6 Z"
          fill="#0B0803"
          stroke="#000000"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 1. Frontal Superior Lobe (Top Left) */}
        <path
          d="M22 7
             C28 6.5 35 8.5 40 12
             L35 18
             C30 15 24 14 18 16
             L17 12
             C18.5 10 20.2 8.3 22 7 Z"
          fill="url(#logoGoldHigh)"
        />

        {/* 2. Parietal Crown Lobe (Top Right) */}
        <path
          d="M42 13.5
             C46.5 17 50.5 21.5 52 27
             L45 28
             C44 24 40.5 20.5 36.5 19
             Z"
          fill="url(#logoGoldBright)"
        />

        {/* 3. Frontal Anterior Lobe */}
        <path
          d="M15.5 13.5
             L17 17.5
             C13 19 10 23 9.5 27
             L5 25.5
             C6 19.5 10 15.5 15.5 13.5 Z"
          fill="url(#logoGoldBright)"
        />

        {/* 4. Central Sulcus / Mid-Brain Facet */}
        <path
          d="M18.5 19
             C24 17 31 18 35 21
             L36 26
             C31 24 24 24 19 27
             L17.5 22.5 Z"
          fill="url(#logoGoldHigh)"
        />

        {/* 5. Occipital Lobe */}
        <path
          d="M45.5 30
             L53 29
             C53.5 33 52 37 48.5 40
             L43 36
             C44.5 34 45.5 32 45.5 30 Z"
          fill="url(#logoGoldDeep)"
        />

        {/* 6. Center Cortex Bridge */}
        <path
          d="M20 29
             C26 26.5 34 26.5 41 30
             L39 35
             C33 32.5 26 33 21 36
             Z"
          fill="url(#logoGoldBright)"
        />

        {/* 7. Temporal Lobe */}
        <path
          d="M11 29
             L18 30
             C19 33 17 37 13 38.5
             C10.5 36 9.5 32.5 11 29 Z"
          fill="url(#logoGoldDeep)"
        />

        {/* 8. Lower Temporal Convolutions */}
        <path
          d="M22 38
             C28 35 36 34 42 38
             L40 43
             C34 40 27 41 23 44
             Z"
          fill="url(#logoGoldBright)"
        />

        {/* 9. Cerebellum Striations */}
        <path
          d="M43.5 41
             L48 39.5
             C46.5 43.5 42 45.5 37 45.5
             L38 42
             C40.5 42 42.5 41.5 43.5 41 Z"
          fill="url(#logoGoldDeep)"
        />

        {/* Fluted Cocktail Pedestal Stem */}
        <path
          d="M28 45
             C29 48 30 54 26 57
             L36 57
             C32 54 33 48 34 45
             Z"
          fill="url(#logoGoldBright)"
        />
        <rect x="22" y="57" width="18" height="3" rx="1" fill="url(#logoGoldHigh)" />
        <rect x="20" y="59.5" width="22" height="1.5" rx="0.75" fill="url(#logoGoldDeep)" />

        {/* Apex Crown Spark */}
        <polygon points="26,1 27.5,4.5 31,5.5 27.5,6.5 26,10 24.5,6.5 21,5.5 24.5,4.5" fill="#FFFDF0" />
        <circle cx="26" cy="5.5" r="1" fill="#D4A017" />
      </g>
    </svg>
  );
}
