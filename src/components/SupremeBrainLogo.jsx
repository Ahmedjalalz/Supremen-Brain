import React from 'react';

export default function SupremeBrainLogo({ className = 'w-8 h-8', showGlow = true }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={`${className} transition-transform duration-300 group-hover:scale-105 shrink-0`}
      fill="none"
      aria-label="Supreme Brain Emblem"
    >
      <defs>
        <linearGradient id="sbGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1B0" />
          <stop offset="35%" stopColor="#F5CD47" />
          <stop offset="70%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8A6814" />
        </linearGradient>

        <linearGradient id="sbStemGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A6814" />
          <stop offset="50%" stopColor="#E5BE38" />
          <stop offset="100%" stopColor="#FFEAA0" />
        </linearGradient>

        {showGlow && (
          <filter id="sbEmblemGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Decorative Outer Ring */}
      <circle
        cx="64"
        cy="64"
        r="60"
        fill="#06060c"
        stroke="url(#sbGoldGrad)"
        strokeWidth="1.5"
        className="opacity-90"
      />
      <circle
        cx="64"
        cy="64"
        r="56"
        fill="none"
        stroke="#C9A227"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        className="opacity-40"
      />

      {/* Flared Base */}
      <path
        d="M42 108 L86 108 L80 102 L48 102 Z"
        fill="url(#sbGoldGrad)"
        filter={showGlow ? 'url(#sbEmblemGlow)' : undefined}
      />
      <rect x="46" y="104" width="36" height="1.5" fill="#FFF1B0" opacity="0.8" />

      {/* Slender Stem with Turned Rings */}
      <rect x="61.5" y="78" width="5" height="24" rx="1.5" fill="url(#sbStemGrad)" />
      <ellipse cx="64" cy="94" rx="6.5" ry="2" fill="url(#sbGoldGrad)" />
      <ellipse cx="64" cy="85" rx="5.5" ry="1.5" fill="url(#sbGoldGrad)" />

      {/* Glass Bowl Chevron / Coupe Rim */}
      <polygon
        points="64,80 34,58 94,58"
        fill="none"
        stroke="url(#sbGoldGrad)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon points="64,76 44,61 84,61" fill="#C9A227" fillOpacity="0.25" />

      {/* Brain Cerebrum & Neural Lattice */}
      <path
        d="M62 55 C52 55 42 52 35 45 C28 38 29 27 37 20 C42 15 50 15 55 19 C58 21 61 24 62 27 Z"
        fill="none"
        stroke="url(#sbGoldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M37 32 C43 32 48 37 53 35 C58 33 60 28 62 27"
        fill="none"
        stroke="url(#sbGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 42 C48 40 52 44 62 43"
        fill="none"
        stroke="url(#sbGoldGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M66 55 C76 55 86 52 93 45 C100 38 99 27 91 20 C86 15 78 15 73 19 C70 21 67 24 66 27 Z"
        fill="none"
        stroke="url(#sbGoldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M91 32 C85 32 80 37 75 35 C70 33 68 28 66 27"
        fill="none"
        stroke="url(#sbGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M86 42 C80 40 76 44 66 43"
        fill="none"
        stroke="url(#sbGoldGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Central Longitudinal Fissure */}
      <line
        x1="64"
        y1="20"
        x2="64"
        y2="56"
        stroke="url(#sbGoldGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Glowing Synapse Nodes */}
      <circle cx="37" cy="20" r="2.8" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />
      <circle cx="55" cy="19" r="2.5" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />
      <circle cx="35" cy="45" r="2.5" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />
      <circle cx="48" cy="35" r="2.8" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />

      <circle cx="91" cy="20" r="2.8" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />
      <circle cx="73" cy="19" r="2.5" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />
      <circle cx="93" cy="45" r="2.5" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />
      <circle cx="80" cy="35" r="2.8" fill="#FFF8D6" filter={showGlow ? 'url(#sbEmblemGlow)' : undefined} />

      {/* Celestial Distillation Spark */}
      <g transform="translate(64, 13)">
        <path
          d="M0 -7 Q1 -1 7 0 Q1 1 0 7 Q-1 1 -7 0 Q-1 -1 0 -7 Z"
          fill="url(#sbGoldGrad)"
          filter={showGlow ? 'url(#sbEmblemGlow)' : undefined}
        />
        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
