import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const TAU = Math.PI * 2;
const EASE_LOOP = Easing.bezier(0.45, 0, 0.55, 1);

const Leaf: React.FC<{
  seed: number;
  size: number;
  hue: string;
  startX: number;
  startY: number;
  driftX: number;
  driftY: number;
  rotateRange: number;
}> = ({ seed, size, hue, startX, startY, driftX, driftY, rotateRange }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = ((frame + seed * 40) % durationInFrames) / durationInFrames;
  const x = startX + Math.sin(t * TAU + seed) * driftX;
  const y = startY + Math.cos(t * TAU + seed * 0.7) * driftY;
  const rotate = Math.sin(t * TAU + seed) * rotateRange;
  const sway = 0.92 + Math.sin(t * TAU * 2 + seed) * 0.08;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotate}deg) scale(${sway})`,
        opacity: 0.85,
        filter: "drop-shadow(0 12px 24px rgba(22,163,74,0.15))",
      }}
    >
      <defs>
        <linearGradient id={`leaf-g-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={hue} stopOpacity="0.95" />
          <stop offset="100%" stopColor={hue} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 C 48 12, 60 28, 56 48 C 42 60, 22 58, 10 44 C 6 26, 16 10, 32 4 Z"
        fill={`url(#leaf-g-${seed})`}
      />
      <path
        d="M32 6 C 30 22, 28 38, 22 52"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Capsule: React.FC<{
  seed: number;
  y: number;
  size: number;
  hueA: string;
  hueB: string;
  speed: number;
}> = ({ seed, y, size, hueA, hueB, speed }) => {
  const frame = useCurrentFrame();
  const { width, durationInFrames } = useVideoConfig();
  const t = ((frame + seed * 30) % durationInFrames) / durationInFrames;
  const x = interpolate(t, [0, 1], [-200, width + 200], { easing: EASE_LOOP });
  const rotate = Math.sin(t * TAU + seed) * 18;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size * 0.42,
        transform: `rotate(${rotate}deg)`,
        opacity: 0.92,
        filter: "drop-shadow(0 8px 20px rgba(14,26,19,0.12))",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "left",
          background: hueA,
          borderRadius: `${size}px 0 0 ${size}px`,
          borderRight: "1px solid rgba(255,255,255,0.4)",
        }}
      />
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "left",
          background: hueB,
          borderRadius: `0 ${size}px ${size}px 0`,
        }}
      />
    </div>
  );
};

const BreathingRing: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = (frame % durationInFrames) / durationInFrames;
  const pulse = 0.5 + 0.5 * Math.sin(t * TAU);
  const r1 = 220 + pulse * 80;
  const r2 = 320 + pulse * 90;
  const r3 = 440 + pulse * 100;
  const cx = width / 2;
  const cy = height / 2;
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0 }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r1}
        fill="none"
        stroke="rgba(22,163,74,0.28)"
        strokeWidth={1.2}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r2}
        fill="none"
        stroke="rgba(22,163,74,0.18)"
        strokeWidth={1}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r3}
        fill="none"
        stroke="rgba(22,163,74,0.1)"
        strokeWidth={1}
      />
    </svg>
  );
};

const HeartbeatLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = (frame % durationInFrames) / durationInFrames;

  const baselineY = height * 0.78;
  const stepX = width / 12;
  let d = `M 0 ${baselineY}`;
  for (let i = 0; i < 12; i++) {
    const startX = i * stepX;
    // Flat baseline, then a heartbeat spike near the middle of each segment
    d += ` L ${startX + stepX * 0.35} ${baselineY}`;
    d += ` L ${startX + stepX * 0.4} ${baselineY - 50}`;
    d += ` L ${startX + stepX * 0.45} ${baselineY + 70}`;
    d += ` L ${startX + stepX * 0.5} ${baselineY - 20}`;
    d += ` L ${startX + stepX * 0.55} ${baselineY}`;
    d += ` L ${(i + 1) * stepX} ${baselineY}`;
  }

  const total = 4400;
  const dashOffset = interpolate(t, [0, 1], [total, 0]);

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <path
        d={d}
        fill="none"
        stroke="rgba(22,163,74,0.6)"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="80 4400"
        strokeDashoffset={dashOffset}
        style={{ filter: "drop-shadow(0 0 8px rgba(22,163,74,0.45))" }}
      />
      <path
        d={d}
        fill="none"
        stroke="rgba(22,163,74,0.12)"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const PharmaAmbient: React.FC = () => {
  const leaves = [
    { seed: 1, size: 180, hue: "#65b687", x: 60, y: 80, dx: 60, dy: 30, rot: 18 },
    { seed: 2, size: 140, hue: "#86c79f", x: 220, y: 480, dx: 80, dy: 40, rot: 22 },
    { seed: 3, size: 220, hue: "#4ea872", x: 1380, y: 120, dx: 70, dy: 50, rot: 14 },
    { seed: 4, size: 160, hue: "#9bd0ad", x: 1500, y: 620, dx: 60, dy: 40, rot: 20 },
    { seed: 5, size: 110, hue: "#a8d8b5", x: 760, y: 60, dx: 50, dy: 40, rot: 24 },
    { seed: 6, size: 130, hue: "#7ac294", x: 900, y: 820, dx: 60, dy: 30, rot: 16 },
  ];

  const capsules = [
    { seed: 1, y: 160, size: 90, a: "#16a34a", b: "#ffffff", speed: 1 },
    { seed: 2, y: 360, size: 70, a: "#22c55e", b: "#fef3c7", speed: 1.2 },
    { seed: 3, y: 560, size: 110, a: "#047857", b: "#ffffff", speed: 0.8 },
    { seed: 4, y: 800, size: 80, a: "#15803d", b: "#dcfce7", speed: 1 },
    { seed: 5, y: 240, size: 60, a: "#10b981", b: "#ffffff", speed: 1.4 },
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 30% 35%, #ffffff 0%, #f1f7ee 55%, #e7f1e3 100%)",
        overflow: "hidden",
      }}
    >
      {/* Big soft blooms */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: "20%",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(22,163,74,0.18) 0%, transparent 65%)",
          filter: "blur(20px)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "5%",
          bottom: "5%",
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(101,182,135,0.22) 0%, transparent 70%)",
          filter: "blur(30px)",
          mixBlendMode: "multiply",
        }}
      />

      <BreathingRing />

      {leaves.map((l) => (
        <Leaf
          key={l.seed}
          seed={l.seed}
          size={l.size}
          hue={l.hue}
          startX={l.x}
          startY={l.y}
          driftX={l.dx}
          driftY={l.dy}
          rotateRange={l.rot}
        />
      ))}

      {capsules.map((c) => (
        <Capsule
          key={c.seed}
          seed={c.seed}
          y={c.y}
          size={c.size}
          hueA={c.a}
          hueB={c.b}
          speed={c.speed}
        />
      ))}

      <HeartbeatLine />

      {/* Top + bottom soft vignettes so it integrates with page chrome */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(250,252,248,0.4) 0%, transparent 18%, transparent 80%, rgba(250,252,248,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
