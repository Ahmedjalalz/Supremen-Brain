import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PouringRhythmChart({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const points = useMemo(() => {
    if (!data || data.length === 0) return [];
    const maxVal = Math.max(...data.map((d) => d.pours), 70);
    const minVal = 0;
    const width = 800;
    const height = 240;
    const paddingLeft = 45;
    const paddingRight = 25;
    const paddingTop = 25;
    const paddingBottom = 35;

    const chartW = width - paddingLeft - paddingRight;
    const chartH = height - paddingTop - paddingBottom;

    return data.map((item, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * chartW;
      const normY = (item.pours - minVal) / (maxVal - minVal);
      const y = height - paddingBottom - normY * chartH;
      return {
        x,
        y,
        date: item.date,
        pours: item.pours,
        index,
      };
    });
  }, [data]);

  // Construct smooth SVG cubic Bezier path
  const { pathD, areaD } = useMemo(() => {
    if (points.length === 0) return { pathD: '', areaD: '' };

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      // Catmull-Rom to Cubic Bezier conversion
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const baselineY = 240 - 35;
    const area = `${d} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

    return { pathD: d, areaD: area };
  }, [points]);

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div className="w-full relative select-none">
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox="0 0 800 240"
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {/* Speakeasy Gold Gradient Fill */}
            <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#C9A227" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#06060a" stopOpacity="0.0" />
            </linearGradient>

            {/* Line Glow Filter */}
            <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal Grid Lines */}
          {[0, 20, 40, 60].map((level) => {
            const y = 240 - 35 - (level / 70) * (240 - 25 - 35);
            return (
              <g key={level}>
                <line
                  x1="45"
                  y1={y}
                  x2="775"
                  y2={y}
                  stroke="rgba(201, 162, 39, 0.08)"
                  strokeDasharray="3 4"
                  strokeWidth="1"
                />
                <text
                  x="38"
                  y={y + 3.5}
                  textAnchor="end"
                  className="font-mono text-[10px] fill-smoke/60"
                >
                  {level}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <motion.path
            d={areaD}
            fill="url(#goldAreaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Main Gold Line - Animated Drawing from Left to Right */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#FFD700"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#goldGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Vertical Crosshair Line when Hovered */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={25}
                x2={activePoint.x}
                y2={205}
                stroke="rgba(201, 162, 39, 0.4)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5"
                fill="#FFD700"
                stroke="#06060a"
                strokeWidth="2"
                className="filter drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
              />
            </g>
          )}

          {/* X Axis Labels (Sampled to avoid crowding) */}
          {points.map((p, idx) => {
            if (idx % 4 === 0 || idx === points.length - 1) {
              return (
                <text
                  key={idx}
                  x={p.x}
                  y="228"
                  textAnchor="middle"
                  className="font-mono text-[10px] fill-smoke/70"
                >
                  {p.date}
                </text>
              );
            }
            return null;
          })}

          {/* Invisible Overlay Rectangles for Smooth Hover Catch */}
          {points.map((p, idx) => {
            const stepW = 800 / points.length;
            return (
              <rect
                key={`hit-${idx}`}
                x={p.x - stepW / 2}
                y="15"
                width={stepW}
                height="200"
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoveredIndex(idx)}
              />
            );
          })}
        </svg>

        {/* Vintage Floating Tooltip */}
        <AnimatePresence>
          {activePoint && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute z-20 flex flex-col items-center"
              style={{
                left: `${(activePoint.x / 800) * 100}%`,
                top: `${(activePoint.y / 240) * 100}%`,
                transform: 'translate(-50%, -125%)',
              }}
            >
              <div className="rounded-lg border border-gold/40 bg-[#0c0c16]/95 backdrop-blur-md px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.7),0_0_12px_rgba(201,162,39,0.2)] text-center">
                <div className="font-mono text-[10px] tracking-wider text-smoke uppercase">
                  {activePoint.date}, 2026
                </div>
                <div className="flex items-baseline gap-1.5 justify-center mt-0.5">
                  <span className="font-playfair text-base font-bold text-gold">
                    {activePoint.pours}
                  </span>
                  <span className="font-inter text-[11px] text-light/80">pours</span>
                </div>
              </div>
              {/* Little down arrow */}
              <div className="w-2 h-2 rotate-45 bg-[#0c0c16] border-r border-b border-gold/40 -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-3 px-2 text-xs text-smoke/70">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_#C9A227]" />
          <span className="font-inter text-[11px]">Daily Invocations</span>
        </div>
        <div className="font-mono text-[11px] text-smoke/60">
          Showing past 28 days · Peak: 62 pours
        </div>
      </div>
    </div>
  );
}
