import type { ReactNode } from "react";

import type { ProjectId } from "@/content/projects";

// Illustration palette (see --ill-* tokens); SVG presentation attributes
// cannot read CSS custom properties, so the values are repeated here.
const INK = "#22471d";
const PAPER = "#f1f5e6";
const SUN = "#f7dc8a";
const CORAL = "#f29a82";
const LEAF = "#7fa57a";
const LEAF_SOFT = "#b8d4a8";
const COPPER = "#d98a5b";
const LIME = "#a8e063";

const LEAF_PATH = "M0 0 C10 -17 31 -20 42 -17 C40 -4 22 7 0 0 Z";

interface LeafProps {
  x: number;
  y: number;
  /** Mirror horizontally so the leaf points left. */
  flip?: boolean;
  rotate?: number;
  fill: string;
}

function Leaf({ x, y, flip = false, rotate, fill }: LeafProps) {
  const transform = `translate(${x} ${y})${flip ? " scale(-1 1)" : ""}${rotate ? ` rotate(${rotate})` : ""}`;
  return <path d={LEAF_PATH} transform={transform} fill={fill} />;
}

interface SprigProps {
  x: number;
  /** Where the stem ends; the upper leaf sits just below it. */
  top: number;
  /** Leaves pointing the other way, for the right-hand side of a scene. */
  mirror?: boolean;
}

/** A stem with two leaves, framing a scene on the ground line. */
function Sprig({ x, top, mirror = false }: SprigProps) {
  return (
    <>
      <path d={`M${x} 296V${top}`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <Leaf x={x} y={284} flip={!mirror} fill={LEAF} />
      <Leaf x={x} y={top + 2} flip={mirror} fill={LEAF_SOFT} />
    </>
  );
}

const ground = <path d="M110 296H530" stroke={INK} strokeWidth="1.5" />;

const scenes: Record<ProjectId, ReactNode> = {
  healthBridge: (
    <>
      <rect x="308" y="84" width="24" height="64" rx="7" fill={CORAL} />
      <rect x="288" y="104" width="64" height="24" rx="7" fill={CORAL} />
      <path d="M164 214H476" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <g fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M180 296V262A40 40 0 0 1 260 262V296" />
        <path d="M280 296V262A40 40 0 0 1 360 262V296" />
        <path d="M380 296V262A40 40 0 0 1 460 262V296" />
      </g>
      {ground}
      <Sprig x={134} top={270} />
      <Sprig x={506} top={270} mirror />
    </>
  ),
  secli: (
    <>
      <g fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M190 296V218H450V296" />
        <path d="M290 218V176A30 30 0 0 1 350 176V218" />
        <path d="M300 296V264A20 20 0 0 1 340 264V296" />
        <path d="M216 262V248A10 10 0 0 1 236 248V262" />
        <path d="M404 262V248A10 10 0 0 1 424 248V262" />
      </g>
      <path d="M310 190c0-12 4-18 10-18s10 6 10 18z" fill={CORAL} />
      <circle cx="320" cy="194" r="3" fill={INK} />
      {ground}
      <path d="M140 296V268M164 296V274M476 296V274M500 296V268" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <Leaf x={140} y={284} flip fill={LEAF} />
      <Leaf x={140} y={272} fill={LEAF_SOFT} />
      <Leaf x={164} y={288} fill={LEAF} />
      <Leaf x={476} y={288} flip fill={LEAF_SOFT} />
      <Leaf x={500} y={284} fill={LEAF} />
      <Leaf x={500} y={272} flip fill={LEAF_SOFT} />
    </>
  ),
  uggiano: (
    <>
      <path d="M90 296C190 236 450 236 550 296Z" fill={LEAF_SOFT} />
      <g fill={PAPER} stroke={INK} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M240 274V150H292V274" />
        <path d="M292 274V190H400V274" />
      </g>
      <g fill={INK}>
        <rect x="240" y="136" width="14" height="14" />
        <rect x="263" y="136" width="14" height="14" />
        <rect x="286" y="136" width="14" height="14" />
        <rect x="300" y="176" width="14" height="14" />
        <rect x="336" y="176" width="14" height="14" />
        <rect x="372" y="176" width="14" height="14" />
      </g>
      <path d="M330 274V246A16 16 0 0 1 362 246V274" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M266 150V120" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M266 120l30 9-30 9z" fill={CORAL} />
      {ground}
      <Leaf x={450} y={286} fill={LEAF} />
      <Leaf x={450} y={276} flip fill={LEAF_SOFT} />
    </>
  ),
  genoa: (
    <>
      <defs>
        <clipPath id="genoa-door">
          <path
            clipRule="evenodd"
            d="M20 240 L20 100 A80 80 0 0 1 180 100 L180 240 Z M60 240 L60 124 A40 40 0 0 1 140 124 L140 240 Z"
          />
        </clipPath>
      </defs>
      <g transform="translate(230 76) scale(.9)">
        <g clipPath="url(#genoa-door)">
          <rect width="200" height="250" fill={PAPER} />
          <path
            d="M0 20H200V40H0Z M0 60H200V80H0Z M0 100H200V120H0Z M0 140H200V160H0Z M0 180H200V200H0Z M0 220H200V240H0Z"
            fill={INK}
          />
        </g>
        <path d="M20 240 L20 100 A80 80 0 0 1 180 100 L180 240" fill="none" stroke={INK} strokeWidth="3" />
        <path d="M60 240 L60 124 A40 40 0 0 1 140 124 L140 240Z" fill={INK} />
        <g fill="none" stroke={PAPER} strokeWidth="3" strokeLinecap="round">
          <path d="M68 124A32 32 0 0 1 132 124Z" />
          <path d="M100 124L127.7 108M100 124L116 96.3M100 124L100 92M100 124L84 96.3M100 124L72.3 108M100 136L100 240" />
        </g>
        <circle cx="93" cy="192" r="3" fill={PAPER} />
        <circle cx="107" cy="192" r="3" fill={PAPER} />
        <path d="M8 244H192" stroke={INK} strokeWidth="6" />
      </g>
      {ground}
      <circle cx="450" cy="272" r="10" fill={CORAL} />
    </>
  ),
  copper: (
    <>
      <rect x="266" y="76" width="108" height="220" rx="12" fill={PAPER} stroke={INK} strokeWidth="6" />
      <path d="M266 220H374" stroke={INK} strokeWidth="4" />
      <path d="M300 232H340" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M280 100V128" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".55" />
      <g fill={COPPER}>
        <path d="M278 204C278 188 285 180 296 177C296 189 293 199 290 204Z" />
        <path d="M288 204C288 190 295 184 304 182C304 192 301 200 298 204Z" />
        <path d="M310 204L320 152L322 134L324 152L334 204L328 204L322 172L316 204Z" />
        <rect x="344" y="192" width="16" height="12" />
        <path d="M348 192L350 170H356L358 192Z" />
        <circle cx="353" cy="165" r="4.5" />
        <path d="M357 172L364 152" stroke={COPPER} strokeWidth="3" strokeLinecap="round" />
        <circle cx="365" cy="148" r="3.5" />
      </g>
      <path d="M276 206H364" stroke={COPPER} strokeWidth="3" strokeLinecap="round" />
      {ground}
      <Sprig x={190} top={268} />
      <Sprig x={450} top={268} mirror />
    </>
  ),
  upcoming: (
    <>
      <rect x="206" y="104" width="228" height="170" rx="14" fill={PAPER} stroke={INK} strokeWidth="6" />
      <path d="M206 136H434" stroke={INK} strokeWidth="4" />
      <g fill={INK}>
        <circle cx="228" cy="120" r="4" />
        <circle cx="244" cy="120" r="4" />
        <circle cx="260" cy="120" r="4" />
      </g>
      <rect x="226" y="152" width="92" height="64" rx="8" fill={LEAF_SOFT} />
      <path d="M334 160H414M334 178H398M334 196H406" stroke={LEAF} strokeWidth="6" strokeLinecap="round" />
      <rect x="226" y="228" width="64" height="28" rx="14" fill={CORAL} />
      <path d="M310 242H414" stroke={LEAF} strokeWidth="6" strokeLinecap="round" strokeDasharray="2 12" />
      {ground}
      <path d="M470 296V252" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <Leaf x={470} y={284} flip fill={LEAF} />
      <Leaf x={470} y={266} fill={LEAF_SOFT} />
      <Leaf x={470} y={252} rotate={-60} fill={LIME} />
    </>
  ),
};

interface ProjectArtProps {
  project: ProjectId;
  /** Accessible description of the illustration. */
  label: string;
  /** The two caption lines drawn under the scene. */
  lines: [string, string];
}

/** Flat illustration for a project card: sun, scene, ground line, captions. */
export default function ProjectArt({ project, label, lines }: ProjectArtProps) {
  return (
    <svg
      className="project-art"
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <rect width="640" height="400" fill={PAPER} />
      <circle className="project-art__sun" cx="320" cy="150" r="108" fill={SUN} />
      {scenes[project]}
      <text className="project-art__title" x="320" y="346" textAnchor="middle" fill={INK}>
        {lines[0]}
      </text>
      <text className="project-art__subtitle" x="320" y="374" textAnchor="middle" fill={LEAF}>
        {lines[1]}
      </text>
    </svg>
  );
}
