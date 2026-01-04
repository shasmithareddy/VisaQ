import { motion } from "framer-motion";

interface Dimension {
  name: string;
  score: number;
  shortName: string;
}

interface RadarChartProps {
  dimensions: Dimension[];
}

export function RadarChart({ dimensions }: RadarChartProps) {
  const size = 280;
  const center = size / 2;
  const radius = 100;
  const levels = 5;

  const angleStep = (2 * Math.PI) / dimensions.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLevelPoints = (level: number) => {
    const r = (level / levels) * radius;
    return dimensions.map((_, i) => {
      const angle = angleStep * i - Math.PI / 2;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(" ");
  };

  const dataPoints = dimensions.map((d, i) => getPoint(i, d.score));
  const pathData = dataPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(" ") + " Z";

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid levels */}
        {Array.from({ length: levels }, (_, i) => (
          <polygon
            key={i}
            points={getLevelPoints(i + 1)}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const endPoint = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={pathData}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
          />
        ))}

        {/* Labels */}
        {dimensions.map((d, i) => {
          const labelPoint = getPoint(i, 130);
          return (
            <g key={i}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-xs font-medium"
              >
                {d.shortName}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {d.score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
