import { DE_REGISTER } from "../config";
import { Dictionary } from "./types";

/**
 * Translation quality flag: to be reviewed by native speaker.
 * Register: de-DE formal (Sie) controlled by DE_REGISTER.
 */
export const deDictionary: Dictionary = {
  locale: "de",
  reviewNote: `DE copy should be reviewed by a native speaker. Register: ${DE_REGISTER}.`,
  a11y: {
    skipToMain: "Zum Hauptinhalt springen",
    primaryNavigation: "Hauptnavigation",
    socialLinks: "Social-Media-Links",
  },
  theme: {
    light: "Hell",
    dark: "Dunkel",
    switchToLight: "Zum hellen Farbschema wechseln",
    switchToDark: "Zum dunklen Farbschema wechseln",
  },
  meta: {
    homeTitle: "Software Developer",
    siteTitle: "Roberta Matera | Software Developer",
    siteDescription:
      "Portfolio von Roberta Matera, Frontend Software Engineer mit über 4 Jahren Erfahrung in Banking-, Insurance-, Retail-, Enterprise- und KI-getriebenen Plattformen.",
    siteKeywords: [
      "Roberta Matera",
      "Frontend Engineer",
      "TypeScript",
      "Angular",
      "React",
      "Next.js",
      "Portfolio",
    ],
    ogTitle: "Roberta Matera | Software Developer",
    ogDescription:
      "Skalierbare Frontend-Architektur, wiederverwendbare Komponenten und qualitätsorientierte Produktentwicklung.",
    twitterTitle: "Roberta Matera | Software Developer",
    twitterDescription:
      "Enterprise-Frontend-Portfolio mit Fokus auf Architektur, Wartbarkeit und Softwarequalität.",
  },
  nav: {
    name: "Roberta Matera",
    role: "Software Developer",
    items: [
      { label: "Über mich", section: "about" },
      { label: "Kompetenzen", section: "skills" },
      { label: "Erfahrung", section: "experience" },
      { label: "Projekte", section: "projects" },
      { label: "Ausbildung", section: "education" },
      { label: "Kontakt", section: "contact" },
    ],
    resumeLabel: "Lebenslauf",
    languageLabel: "Sprache",
    openMenuLabel: "Menü öffnen",
    closeMenuLabel: "Menü schließen",
  },
  languageSwitcher: {
    current: "Deutsch",
    chooseLanguage: "Sprache auswählen",
    locales: [
      { locale: "it", label: "Italiano" },
      { locale: "en", label: "English" },
      { locale: "de", label: "Deutsch" },
    ],
  },
  footer: {
    siteColumn: {
      title: "SEITE",
      links: [
        { label: "Startseite", route: "home" },
        { label: "Projekte", route: "projects" },
        { label: "Lebenslauf", route: "resume" },
      ],
    },
    socialColumn: {
      title: "SOCIAL",
      links: [
        { label: "GitHub", href: "https://github.com/RobertaMatera", external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/roberta-matera/", external: true },
        { label: "E-Mail", href: "mailto:materaroberta11@gmail.com", external: true },
      ],
    },
    resourcesColumn: {
      title: "RESSOURCEN",
      links: [
        { label: "Technologie-Stack", route: "techStack" },
        { label: "CV herunterladen", route: "resume" },
      ],
    },
    cta: {
      text: "Lassen Sie uns etwas Robustes und Sinnvolles entwickeln.",
      button: "Kontakt aufnehmen →",
    },
    copyrightSuffix: "Alle Rechte vorbehalten.",
  },
  hero: {
    eyebrow: "HALLO, ICH BIN ROBERTA",
    title: "Software Developer mit Fokus auf skalierbare und wartbare Frontend-Plattformen.",
    description:
      "Ich entwickle moderne Webanwendungen von Anforderungen und UX-Abstimmung bis zu Implementierung, Refactoring, Testing und Qualitätssicherung.",
    actions: {
      primary: "Projekte ansehen",
      secondary: "Kontakt",
      tertiary: "CV herunterladen",
    },
  },
  sections: {
    about: {
      eyebrow: "Über mich",
      title: "Frontend-Verantwortung von der Anforderung bis zur Auslieferung",
      paragraphs: [
        "Ich bin Frontend Software Engineer mit mehr als vier Jahren Erfahrung in Banking-, Insurance-, Retail-, Enterprise- und KI-getriebenen Projekten.",
        "Meine Schwerpunkte sind TypeScript, Angular und React sowie wiederverwendbare Architektur, REST-API-Integration und langfristige Wartbarkeit durch Testing und Refactoring.",
      ],
    },
    skills: {
      eyebrow: "Kompetenzen",
      title: "Technologie-Stack und Engineering-Praxis",
      groups: [
        {
          title: "Frontend Architecture & Engineering",
          items: [
            "TypeScript, JavaScript, Angular, React, Next.js",
            "Wiederverwendbare Komponenten-Systeme und modulare Frontend-Architektur",
            "Responsive Webanwendungen, PWAs, HTML5, CSS3, Sass/SCSS",
            "REST-API-Integration und Frontend/Backend-Zusammenarbeit",
            "Refactoring, Reduktion technischer Schulden, Wartbarkeit",
          ],
        },
        {
          title: "UI Systems & UX",
          items: [
            "Wiederverwendbare UI-Bibliotheken und Interface-Standardisierung",
            "Angular Material, PrimeNG, Material UI, Ant Design",
            "Storybook, Tailwind CSS, Bootstrap, Figma",
            "Design-to-Development-Workflows und Cross-Browser-Umsetzung",
          ],
        },
        {
          title: "Testing & Software Quality",
          items: [
            "Unit-Tests mit Vitest, Jasmine und Karma",
            "Debugging, Fehlerbehebung und Qualitätssicherung",
            "Testbare Frontend-Architektur und wiederverwendbare Engineering-Patterns",
          ],
        },
        {
          title: "Engineering Practices & Tooling",
          items: [
            "Git, VS Code, IntelliJ, Agile/Scrum",
            "Technische Dokumentation, Anforderungsanalyse, Stakeholder-Zusammenarbeit",
            "AI-assisted development: Claude, GitHub Copilot, Prompt Engineering",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "Erfahrung",
      title: "Beruflicher Werdegang",
      items: [
        {
          role: "Front-End Engineer",
          company: "F1 Consulting",
          period: "Mai 2025 – Aug 2026",
          location: "Mailand · Remote",
          highlights: [
            "Frontend-Ownership in Enterprise-Anwendungen für Conad, Generali und Barilla.",
            "Übersetzung von Business- und UX-Anforderungen in wartbare Angular- und React-Lösungen.",
            "Qualitätssteigerung durch wiederverwendbare Patterns, Testing und strukturelle Problemlösung.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "Almaviva Digitaltech",
          period: "Apr 2023 – Mai 2025",
          location: "Bari · Hybrid",
          highlights: [
            "Entwicklung von wiederverwendbaren Frontend-Systemen und technischen Standards.",
            "Mitarbeit an Enterprise- und KI-Produkten mit modularen und skalierbaren Implementierungen.",
            "Technische Dokumentation für bessere Team-Ausrichtung und schnellere Adoption.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "NexumAI",
          period: "Jan 2023 – Apr 2023",
          location: "Rom · Remote",
          highlights: [
            "Entwicklung und Weiterentwicklung einer React-basierten Finanzanwendung.",
            "Lösung von REST-Integrationsproblemen und Reduktion wiederkehrender technischer Schulden.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "Fides (Projekte via Accenture)",
          period: "Feb 2022 – Dez 2022",
          location: "Neapel · Remote",
          highlights: [
            "Responsive React-Lösungen für Retail- und Banking-Plattformen.",
            "Bessere Konsistenz, Wiederverwendbarkeit und Performance durch Frontend-Refactoring.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projekte",
      title: "Ausgewählte Arbeiten",
      confidentialNote: "Code- und Deployment-Details sind aus Vertraulichkeitsgründen nicht öffentlich.",
      items: [
        {
          name: "Conad · Interne Management-Plattform & AI Assistant",
          context: "DataReply / F1 Consulting",
          summary:
            "Frontend-Ownership für eine Angular/PWA-Plattform mit wiederverwendbaren UI-Komponenten und responsiven Workflows.",
          details: [
            "Enge Zusammenarbeit mit Stakeholdern und UX über Figma-basierte Iterationen.",
            "Einführung wiederverwendbarer Frontend-Patterns und Tests für mehr Release-Sicherheit.",
            "Integration KI-gestützter Workflows über UI-Logik und API-Grenzen hinweg.",
          ],
          stack: ["Angular", "TypeScript", "PWA", "Vitest", "REST APIs"],
          links: [],
          confidential: true,
        },
        {
          name: "Generali · Car Insurance Platform",
          context: "DataReply / F1 Consulting",
          summary:
            "Tätigkeit als alleinige Front-End-Entwicklerin für React/Angular-Workflows in Schaden- und Antragsprozessen.",
          details: [
            "Verantwortung für die Umsetzung von Anforderungen bis zu produktionsreifen Interfaces.",
            "Verbesserte Workflow-Klarheit und operative Zuverlässigkeit durch gezielte Frontend-/UX-Anpassungen.",
          ],
          stack: ["React", "Angular", "REST APIs", "Figma"],
          links: [],
          confidential: true,
        },
        {
          name: "Health Bridge Clinic",
          context: "Akademisches Projekt · UniPegaso (2026)",
          summary:
            "Full-Stack-Healthcare-Plattform mit Layered Architecture, sicherer API-Integration und UML-Dokumentation.",
          details: [
            "Implementierung mit Java 21, Spring Boot, JPA, Spring Security und Angular.",
            "RBAC, DTOs und klares Verständnis der Frontend/Backend-Grenzen.",
          ],
          stack: ["Angular 21", "Java 21", "Spring Boot", "REST APIs", "UML"],
          links: [],
          confidential: false,
        },
      ],
    },
    education: {
      eyebrow: "Ausbildung",
      title: "Ausbildung und kontinuierliche Weiterentwicklung",
      certificationsTitle: "Zertifizierungen und Weiterbildung",
      languagesTitle: "Sprachen",
      items: [
        {
          title: "Bachelor’s Degree in Information Technology for Digital Enterprises",
          institution: "UNIPEGASO Digital University",
          period: "Aug 2024 – Jul 2026",
          status: "Abgeschlossen",
          notes: "IT- und Digital-Business-Studium mit Full-Stack-Abschlussprojekt.",
        },
        {
          title: "Master’s Degree in Architecture",
          institution: "Polytechnic of Bari",
          period: "Sep 2008 – Jun 2017",
          status: "Abgeschlossen",
          notes: "Methodisch starke Basis in Planung, Struktur und Problemlösung.",
        },
        {
          title: "Front End Web Development Bootcamp",
          institution: "Strive School · Berlin",
          period: "Okt 2021 – Feb 2022",
          status: "Abgeschlossen",
          notes: "Praxisorientiertes Intensivprogramm für modernes Frontend Development.",
        },
      ],
      certifications: [
        {
          name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
          status: "In Vorbereitung · Prüfung geplant Okt 2026",
        },
        {
          name: "Interaction Design Foundation (IxDF) · AI for Designers",
          status: "Laufend",
        },
      ],
      languages: ["Italienisch (Muttersprache)", "Englisch (C1 - IELTS)", "Deutsch (A1 - in Ausbildung)"],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lassen Sie uns über Ihre nächste Frontend-Herausforderung sprechen",
      text:
        "Ich bin offen für Frontend-Positionen, in denen technische Qualität, Ownership und Zusammenarbeit zwischen Product, UX und Backend entscheidend sind.",
      primaryAction: "E-Mail senden",
      resumeAction: "Lebenslauf ansehen",
    },
  },
  pages: {
    resume: {
      title: "Lebenslauf",
      description: "Öffentlichen Lebenslauf von Roberta Matera ansehen oder herunterladen.",
      eyebrow: "Lebenslauf",
      heading: "Curriculum Vitae",
      body: "Hier finden Sie die aktuelle öffentliche CV-Version als PDF.",
      download: "CV herunterladen (PDF)",
      view: "CV öffnen",
      contact: "Kontakt",
    },
    techStack: {
      title: "Technologie-Stack",
      description: "Technischer Überblick über eingesetzte Technologien und Engineering-Praktiken.",
      backToHome: "← Zur Startseite",
      eyebrow: "Technologie-Stack",
      heading: "Technologien und Vorgehensweisen",
      intro:
        "Strukturierter Überblick über Frontend-Entwicklung, Integration, Qualität und Engineering-Workflows.",
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
            "Design-to-Development-Workflows",
            "Angular Material",
            "PrimeNG",
            "Material UI",
            "Ant Design",
            "Storybook",
            "Tailwind CSS",
            "Bootstrap",
          ],
          illustrationSrc: "/images/ux_ui.png",
          illustrationAlt: "UI-Systems Illustration",
        },
        {
          id: "quality",
          category: "Testing & Quality",
          items: ["Vitest", "Jasmine", "Karma", "Debugging", "Refactoring", "Quality Assurance"],
          illustrationSrc: "/images/beTools.png",
          illustrationAlt: "Testing und Qualität Illustration",
        },
        {
          id: "integration",
          category: "Integration & Backend",
          items: ["REST APIs", "Node.js", "Java", "Spring Boot", "JPA", "Spring Security", "Python", "PHP"],
          illustrationSrc: "/images/branchBG.png",
          illustrationAlt: "Backend-Integration Illustration",
        },
      ],
    },
    projects: {
      title: "Projekte",
      description: "Auswahl relevanter Enterprise- und Technikprojekte mit Frontend-Fokus.",
      eyebrow: "Projekte",
      heading: "Ausgewählte Projekte",
      intro: "Kompakte Auswahl zentraler Enterprise- und akademischer Arbeiten.",
      backToHome: "← Zur Startseite",
    },
    notFound: {
      title: "Seite nicht gefunden",
      heading: "Diese Seite existiert nicht",
      body: "Der angeforderte Inhalt ist nicht verfügbar oder wurde verschoben.",
      backHome: "Zur Startseite",
    },
  },
};
