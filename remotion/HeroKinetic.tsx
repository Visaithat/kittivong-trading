import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  brand: string;
  tagline: string;
};

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);

const Char: React.FC<{ char: string; index: number }> = ({ char, index }) => {
  const frame = useCurrentFrame();
  const start = index * 2;
  const y = interpolate(frame, [start, start + 28], [60, 0], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [start, start + 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = interpolate(frame, [start, start + 28], [10, 0], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${y}px)`,
        opacity,
        filter: `blur(${blur}px)`,
        whiteSpace: "pre",
      }}
    >
      {char === " " ? " " : char}
    </span>
  );
};

const Tagline: React.FC<{ tagline: string }> = ({ tagline }) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 36], [0, 100], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity,
        clipPath: `inset(0 ${100 - reveal}% 0 0)`,
        fontFamily:
          "ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace",
        letterSpacing: "0.5em",
        fontSize: 26,
        color: "#047857",
        fontWeight: 500,
      }}
    >
      {tagline}
    </div>
  );
};

const Underline: React.FC = () => {
  const frame = useCurrentFrame();
  const dash = interpolate(frame, [0, 40], [900, 0], {
    easing: EASE_IN_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg
      width={900}
      height={6}
      viewBox="0 0 900 6"
      style={{ display: "block", marginTop: 26 }}
    >
      <defs>
        <linearGradient id="hero-underline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1="3"
        x2="900"
        y2="3"
        stroke="url(#hero-underline)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="900"
        strokeDashoffset={dash}
        style={{ filter: "drop-shadow(0 6px 14px rgba(22,163,74,0.4))" }}
      />
    </svg>
  );
};

const FloatingCapsule: React.FC<{
  seed: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}> = ({ seed, x, y, size, delay }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const float = Math.sin(t * 0.05 + seed) * 16;
  const opacity = interpolate(t, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotate = Math.sin(t * 0.03 + seed) * 14;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        width: size,
        height: size * 0.4,
        transform: `rotate(${rotate}deg)`,
        opacity: opacity * 0.7,
        filter: "drop-shadow(0 8px 16px rgba(14,26,19,0.08))",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "left",
          background: "#bbf7d0",
          borderRadius: `${size}px 0 0 ${size}px`,
        }}
      />
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "left",
          background: "#ffffff",
          borderRadius: `0 ${size}px ${size}px 0`,
          boxShadow: "inset 1px 0 0 rgba(14,26,19,0.05)",
        }}
      />
    </div>
  );
};

export const HeroKinetic: React.FC<Props> = ({ brand, tagline }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "transparent" }}>
      {/* Decorative drifting capsules behind the title */}
      <FloatingCapsule seed={1} x={width * 0.08} y={height * 0.2} size={130} delay={4} />
      <FloatingCapsule seed={2} x={width * 0.84} y={height * 0.18} size={110} delay={8} />
      <FloatingCapsule seed={3} x={width * 0.12} y={height * 0.72} size={150} delay={14} />
      <FloatingCapsule seed={4} x={width * 0.78} y={height * 0.75} size={120} delay={18} />
      <FloatingCapsule seed={5} x={width * 0.5} y={height * 0.12} size={100} delay={22} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
            fontWeight: 700,
            fontSize: Math.min(width * 0.072, 180),
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "#0e1a13",
            textAlign: "center",
            display: "flex",
            overflow: "hidden",
            padding: "0 4px 12px",
          }}
        >
          {brand.split("").map((c, i) => (
            <Char key={i} char={c} index={i} />
          ))}
        </div>

        <Sequence from={36} layout="none">
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: height / 2 + Math.min(width * 0.072, 180) * 0.55,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Underline />
          </div>
        </Sequence>

        <Sequence from={60} layout="none">
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: height / 2 + Math.min(width * 0.072, 180) * 0.65 + 44,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tagline tagline={tagline} />
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
