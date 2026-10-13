import { Locale } from "../config";
import { SectionId } from "../routing";

type Link = {
  label: string;
  href: string;
  external?: boolean;
};

type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};

type ProjectEntry = {
  name: string;
  context: string;
  summary: string;
  details: string[];
  stack: string[];
  links: Link[];
  confidential: boolean;
};

type EducationEntry = {
  title: string;
  institution: string;
  period: string;
  status: string;
  notes: string;
};

type CertificationEntry = {
  name: string;
  status: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

type TechStackGroup = {
  id: string;
  category: string;
  items: string[];
  illustrationSrc?: string;
  illustrationAlt?: string;
};

export type Dictionary = {
  locale: Locale;
  reviewNote?: string;
  a11y: {
    skipToMain: string;
    primaryNavigation: string;
    socialLinks: string;
  };
  theme: {
    light: string;
    dark: string;
    switchToLight: string;
    switchToDark: string;
  };
  meta: {
    homeTitle: string;
    siteTitle: string;
    siteDescription: string;
    siteKeywords: string[];
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  nav: {
    name: string;
    role: string;
    items: { label: string; section: SectionId }[];
    resumeLabel: string;
    languageLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
  };
  languageSwitcher: {
    current: string;
    chooseLanguage: string;
    locales: { locale: Locale; label: string }[];
  };
  footer: {
    siteColumn: { title: string; links: { label: string; route: "home" | "projects" | "resume" }[] };
    socialColumn: { title: string; links: Link[] };
    resourcesColumn: { title: string; links: { label: string; route: "techStack" | "resume" }[] };
    cta: {
      text: string;
      button: string;
    };
    copyrightSuffix: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    actions: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
  };
  sections: {
    about: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    skills: {
      eyebrow: string;
      title: string;
      groups: SkillGroup[];
    };
    experience: {
      eyebrow: string;
      title: string;
      items: ExperienceEntry[];
    };
    projects: {
      eyebrow: string;
      title: string;
      confidentialNote: string;
      items: ProjectEntry[];
    };
    education: {
      eyebrow: string;
      title: string;
      certificationsTitle: string;
      languagesTitle: string;
      items: EducationEntry[];
      certifications: CertificationEntry[];
      languages: string[];
    };
    contact: {
      eyebrow: string;
      title: string;
      text: string;
      primaryAction: string;
      resumeAction: string;
    };
  };
  pages: {
    resume: {
      title: string;
      description: string;
      eyebrow: string;
      heading: string;
      body: string;
      download: string;
      view: string;
      contact: string;
    };
    techStack: {
      title: string;
      description: string;
      backToHome: string;
      eyebrow: string;
      heading: string;
      intro: string;
      groups: TechStackGroup[];
    };
    projects: {
      title: string;
      description: string;
      eyebrow: string;
      heading: string;
      intro: string;
      backToHome: string;
    };
    notFound: {
      title: string;
      heading: string;
      body: string;
      backHome: string;
    };
  };
};
