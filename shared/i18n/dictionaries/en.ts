import { Dictionary } from "./types";

/**
 * Translation quality flag: to be reviewed by native speaker.
 */
export const enDictionary: Dictionary = {
  locale: "en",
  reviewNote: "EN copy should be reviewed by a native speaker.",
  a11y: {
    skipToMain: "Skip to main content",
    primaryNavigation: "Primary navigation",
    socialLinks: "Social links",
  },
  theme: {
    light: "Light",
    dark: "Dark",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
  meta: {
    homeTitle: "Software Developer",
    siteTitle: "Roberta Matera | Software Developer",
    siteDescription:
      "Portfolio of Roberta Matera, Frontend Software Engineer with 4+ years of experience across banking, insurance, retail, enterprise, and AI-driven platforms.",
    siteKeywords: [
      "Roberta Matera",
      "Frontend Engineer",
      "TypeScript",
      "Angular",
      "React",
      "Next.js",
      "Web Portfolio",
    ],
    ogTitle: "Roberta Matera | Software Developer",
    ogDescription:
      "Scalable frontend architecture, reusable component systems, REST API integration, and quality-driven delivery.",
    twitterTitle: "Roberta Matera | Software Developer",
    twitterDescription:
      "Enterprise frontend portfolio focused on architecture, maintainability, and software quality.",
  },
  nav: {
    name: "Roberta Matera",
    role: "Software Developer",
    items: [
      { label: "About", section: "about" },
      { label: "Skills", section: "skills" },
      { label: "Experience", section: "experience" },
      { label: "Projects", section: "projects" },
      { label: "Education", section: "education" },
      { label: "Contact", section: "contact" },
    ],
    resumeLabel: "Resume",
    languageLabel: "Language",
  },
  languageSwitcher: {
    current: "English",
    chooseLanguage: "Choose language",
    locales: [
      { locale: "it", label: "Italiano" },
      { locale: "en", label: "English" },
      { locale: "de", label: "Deutsch" },
    ],
  },
  footer: {
    siteColumn: {
      title: "SITE",
      links: [
        { label: "Home", route: "home" },
        { label: "Projects", route: "projects" },
        { label: "Resume", route: "resume" },
      ],
    },
    socialColumn: {
      title: "SOCIAL",
      links: [
        { label: "GitHub", href: "https://github.com/RobertaMatera", external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/roberta-matera/", external: true },
        { label: "Email", href: "mailto:materaroberta11@gmail.com", external: true },
      ],
    },
    resourcesColumn: {
      title: "RESOURCES",
      links: [
        { label: "Tech stack", route: "techStack" },
        { label: "Download CV", route: "resume" },
      ],
    },
    cta: {
      text: "Let’s build something robust and meaningful.",
      button: "Get in touch →",
    },
    copyrightSuffix: "All rights reserved.",
  },
  hero: {
    eyebrow: "HI, I'M ROBERTA",
    title: "Software Developer focused on scalable, maintainable frontend platforms.",
    description:
      "I design and deliver modern web applications from requirements and UX collaboration through implementation, refactoring, testing, and quality assurance.",
    actions: {
      primary: "View projects",
      secondary: "Contact me",
      tertiary: "Download CV",
    },
  },
  sections: {
    about: {
      eyebrow: "About",
      title: "End-to-end frontend ownership in enterprise environments",
      paragraphs: [
        "I am a Frontend Software Engineer with over four years of experience delivering products across banking, insurance, retail, enterprise, and AI-driven domains.",
        "My core strengths include TypeScript, Angular, React, reusable architecture patterns, REST API integration, and long-term maintainability through testing and refactoring.",
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Engineering capabilities and technical stack",
      groups: [
        {
          title: "Frontend Architecture & Engineering",
          items: [
            "TypeScript, JavaScript, Angular, React, Next.js",
            "Reusable component systems and modular frontend architecture",
            "Responsive web applications, PWAs, HTML5, CSS3, Sass/SCSS",
            "REST API integration and frontend/backend collaboration",
            "Refactoring, technical debt reduction, maintainability",
          ],
        },
        {
          title: "UI Systems & UX",
          items: [
            "Reusable UI libraries and interface standardization",
            "Angular Material, PrimeNG, Material UI, Ant Design",
            "Storybook, Tailwind CSS, Bootstrap, Figma",
            "Design-to-development workflows and cross-browser delivery",
          ],
        },
        {
          title: "Testing & Software Quality",
          items: [
            "Unit testing with Vitest, Jasmine, and Karma",
            "Debugging, defect resolution, and quality assurance",
            "Testable frontend architecture and reusable engineering patterns",
          ],
        },
        {
          title: "Engineering Practices & Tooling",
          items: [
            "Git, VS Code, IntelliJ, Agile/Scrum",
            "Technical documentation, requirement analysis, stakeholder collaboration",
            "AI-assisted development: Claude, GitHub Copilot, prompt engineering",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional track record",
      items: [
        {
          role: "Front-End Engineer",
          company: "F1 Consulting",
          period: "May 2025 – Aug 2026",
          location: "Milan · Remote",
          highlights: [
            "Owned frontend delivery across enterprise applications for Conad, Generali, and Barilla.",
            "Translated business and UX requirements into maintainable Angular and React implementations.",
            "Strengthened quality through reusable patterns, testing, and architecture-level problem solving.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "Almaviva Digitaltech",
          period: "Apr 2023 – May 2025",
          location: "Bari · Hybrid",
          highlights: [
            "Progressed from feature work to reusable frontend architecture responsibilities.",
            "Contributed to enterprise and AI-driven products with modular, scalable implementation patterns.",
            "Produced technical documentation that improved adoption and team alignment.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "NexumAI",
          period: "Jan 2023 – Apr 2023",
          location: "Rome · Remote",
          highlights: [
            "Built and enhanced React features for insurance/banking workflows.",
            "Resolved REST integration issues and reduced recurring technical debt.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "Fides (projects via Accenture)",
          period: "Feb 2022 – Dec 2022",
          location: "Naples · Remote",
          highlights: [
            "Delivered responsive React solutions for retail and banking platforms.",
            "Improved consistency, reuse, and performance through frontend refactoring.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      confidentialNote: "Code and deployment details are confidential due to project restrictions.",
      items: [
        {
          name: "Conad · Internal Management Platform & AI Assistant",
          context: "DataReply / F1 Consulting",
          summary:
            "Owned frontend implementation for an Angular/PWA platform with reusable UI components and responsive workflows.",
          details: [
            "Collaborated with stakeholders and UX designers through Figma-driven iteration.",
            "Established reusable frontend patterns and testing practices for release confidence.",
            "Integrated AI-driven workflows across UI logic and API boundaries.",
          ],
          stack: ["Angular", "TypeScript", "PWA", "Vitest", "REST APIs"],
          links: [],
          confidential: true,
        },
        {
          name: "Generali · Car Insurance Platform",
          context: "DataReply / F1 Consulting",
          summary:
            "Served as sole Front-End Developer across React/Angular applications for claims and request management workflows.",
          details: [
            "Owned implementation from requirements to production-ready interfaces.",
            "Improved workflow clarity and operational reliability through targeted UX/frontend improvements.",
          ],
          stack: ["React", "Angular", "REST APIs", "Figma"],
          links: [],
          confidential: true,
        },
        {
          name: "Health Bridge Clinic",
          context: "Academic project · UniPegaso (2026)",
          summary:
            "Full-stack healthcare platform with layered architecture, secure API integration, and UML documentation.",
          details: [
            "Implemented Java 21, Spring Boot, JPA, Spring Security, and Angular architecture.",
            "Applied RBAC, DTOs, and practical frontend/backend boundary design.",
          ],
          stack: ["Angular 21", "Java 21", "Spring Boot", "REST APIs", "UML"],
          links: [],
          confidential: false,
        },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Education and continuous development",
      certificationsTitle: "Certifications and professional development",
      languagesTitle: "Languages",
      items: [
        {
          title: "Bachelor’s Degree in Information Technology for Digital Enterprises",
          institution: "UNIPEGASO Digital University",
          period: "Aug 2024 – Jul 2026",
          status: "Completed",
          notes: "IT and digital-business program with a full-stack capstone focus.",
        },
        {
          title: "Master’s Degree in Architecture",
          institution: "Polytechnic of Bari",
          period: "Sep 2008 – Jun 2017",
          status: "Completed",
          notes: "Strong methodological background in design, structure, and problem solving.",
        },
        {
          title: "Front End Web Development Bootcamp",
          institution: "Strive School · Berlin",
          period: "Oct 2021 – Feb 2022",
          status: "Completed",
          notes: "Hands-on intensive training on modern frontend development.",
        },
      ],
      certifications: [
        {
          name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
          status: "In progress · exam scheduled Oct 2026",
        },
        {
          name: "Interaction Design Foundation (IxDF) · AI for Designers",
          status: "Ongoing",
        },
      ],
      languages: ["Italian (native)", "English (C1 - IELTS)", "German (A1 - currently studying)"],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s discuss your next frontend challenge",
      text:
        "I am open to frontend opportunities that value technical quality, ownership, and strong collaboration across product, UX, and backend teams.",
      primaryAction: "Email me",
      resumeAction: "View resume",
    },
  },
  pages: {
    resume: {
      title: "Resume",
      description: "View or download Roberta Matera's public CV.",
      eyebrow: "Resume",
      heading: "Curriculum Vitae",
      body: "You can view the latest public CV version online or download it as PDF.",
      download: "Download CV (PDF)",
      view: "Open CV",
      contact: "Contact",
    },
    techStack: {
      title: "Tech stack",
      description: "Technical overview of technologies and engineering practices used across projects.",
      backToHome: "← Back to home",
      eyebrow: "Tech stack",
      heading: "Technologies and practices",
      intro:
        "A structured overview of frontend development, integration, quality, and engineering workflows.",
      groups: [
        {
          id: "frontend-engineering",
          category: "Frontend Engineering",
          items: [
            "React",
            "Next.js",
            "Angular",
            "TypeScript",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Sass/SCSS",
            "Responsive Design",
            "PWA",
          ],
        },
        {
          id: "ui-systems",
          category: "UI Systems & UX",
          items: [
            "Figma",
            "Design-to-development workflows",
            "Angular Material",
            "PrimeNG",
            "Material UI",
            "Ant Design",
            "Storybook",
            "Tailwind CSS",
            "Bootstrap",
          ],
          illustrationSrc: "/images/ux_ui.png",
          illustrationAlt: "UI systems illustration",
        },
        {
          id: "quality",
          category: "Testing & Quality",
          items: ["Vitest", "Jasmine", "Karma", "Debugging", "Refactoring", "Quality assurance"],
          illustrationSrc: "/images/beTools.png",
          illustrationAlt: "Testing and quality illustration",
        },
        {
          id: "integration",
          category: "Integration & Backend",
          items: ["REST APIs", "Node.js", "Java", "Spring Boot", "JPA", "Spring Security", "Python", "PHP"],
          illustrationSrc: "/images/branchBG.png",
          illustrationAlt: "Backend integration illustration",
        },
      ],
    },
    projects: {
      title: "Projects",
      description: "Selected enterprise and technical projects focused on frontend impact and quality.",
      eyebrow: "Projects",
      heading: "Selected projects",
      intro: "A concise selection of enterprise and academic projects.",
      backToHome: "← Back to home",
    },
    notFound: {
      title: "Page not found",
      heading: "This page does not exist",
      body: "The requested content is unavailable or has been moved.",
      backHome: "Back to home",
    },
  },
};
