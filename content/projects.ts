// Selected work, in carousel order. Wording lives in messages/*.json under
// "Work.projects.<id>" (card tags and case study paragraphs as lists);
// tool names under "Work.tools.<key>".

export interface ProjectImage {
  /** Key of the image's alt text under "Work.projects.<id>.detail.images". */
  key: string;
  src: string;
  width: number;
  height: number;
  /** Narrow portrait images are shown at a capped height, not full width. */
  tall?: boolean;
}

export type ToolKey =
  | "autocad"
  | "revit"
  | "totalStation"
  | "photography"
  | "rendering"
  | "photoshop"
  | "indesign"
  | "logoDesign"
  | "brandIdentity"
  | "designSystem"
  | "signage"
  | "productDesign"
  | "concept"
  | "technicalDrawing"
  | "materials";

interface ProjectBase {
  id: string;
  /** Year the work was made, when known. */
  year?: number;
}

/** A software project with public code. */
export interface CodeProject extends ProjectBase {
  kind: "code";
  repository: string;
  /** Technologies, shown as-is in every language. */
  stack: readonly string[];
  programmingLanguages: readonly string[];
}

/** A design or architecture project with a write-up and drawings. */
export interface CaseStudyProject extends ProjectBase {
  kind: "caseStudy";
  tools: readonly ToolKey[];
  images: readonly ProjectImage[];
}

/** A placeholder for work in progress. */
export interface UpcomingProject extends ProjectBase {
  kind: "upcoming";
}

type AnyProject = CodeProject | CaseStudyProject | UpcomingProject;

const architectureTools = [
  "autocad",
  "revit",
  "totalStation",
  "photography",
  "rendering",
  "photoshop",
  "indesign",
] as const satisfies readonly ToolKey[];

// Generic so each key stays a literal type and message lookups are checked.
const image = <K extends string>(key: K, file: string, width: number, height: number) => ({
  key,
  src: `/images/projects/${file}.webp`,
  width,
  height,
});

export const projects = [
  {
    id: "healthBridge",
    kind: "code",
    year: 2026,
    repository: "https://github.com/RobertaMatera/health-bridge-clinic",
    stack: ["Java 21", "Spring Boot", "Angular 21"],
    programmingLanguages: ["Java", "TypeScript"],
  },
  {
    id: "secli",
    kind: "caseStudy",
    year: 2013,
    tools: architectureTools,
    images: [
      image("plan", "secli-convent/reuse-plan", 977, 1300),
      image("ruin", "secli-convent/ruin-before", 900, 412),
    ],
  },
  {
    id: "uggiano",
    kind: "caseStudy",
    tools: architectureTools,
    images: [
      image("sitePlan", "uggiano-thesis/site-plan", 1011, 1300),
      image("masonry", "uggiano-thesis/masonry-sheet", 1400, 1358),
      image("masseria", "uggiano-thesis/masseria-lisanti", 1400, 1053),
    ],
  },
  {
    id: "genoa",
    kind: "caseStudy",
    year: 2020,
    tools: ["logoDesign", "brandIdentity", "designSystem", "signage"],
    images: [
      image("logo", "genoa-historic-shops/logo", 900, 833),
      image("categories", "genoa-historic-shops/categories", 1000, 410),
      image("versions", "genoa-historic-shops/positive-negative", 1000, 200),
      { ...image("plaque", "genoa-historic-shops/slate-plaque", 560, 730), tall: true },
    ],
  },
  {
    id: "copper",
    kind: "caseStudy",
    year: 2021,
    tools: ["productDesign", "concept", "technicalDrawing", "materials"],
    images: [
      { ...image("refrigerator", "copper-skyline/refrigerator", 560, 1527), tall: true },
      image("blade", "copper-skyline/copper-blade", 1000, 586),
    ],
  },
  {
    id: "upcoming",
    kind: "upcoming",
  },
] as const satisfies readonly AnyProject[];

/** The projects as declared, with literal ids for message lookups. */
export type Project = (typeof projects)[number];
export type ProjectId = Project["id"];
