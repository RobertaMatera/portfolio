import { Dictionary } from "./types";

export const itDictionary: Dictionary = {
  locale: "it",
  a11y: {
    skipToMain: "Vai al contenuto principale",
    primaryNavigation: "Navigazione principale",
    socialLinks: "Link social",
  },
  theme: {
    light: "Chiaro",
    dark: "Scuro",
    switchToLight: "Passa al tema chiaro",
    switchToDark: "Passa al tema scuro",
  },
  meta: {
    homeTitle: "Software Developer",
    siteTitle: "Roberta Matera | Software Developer",
    siteDescription:
      "Portfolio di Roberta Matera, Frontend Software Engineer con esperienza in piattaforme enterprise, banking, insurance, retail e progetti AI-driven.",
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
      "Esperienza in architetture frontend scalabili, componenti riusabili, integrazione REST API e qualità del software.",
    twitterTitle: "Roberta Matera | Software Developer",
    twitterDescription:
      "Portfolio con progetti, esperienza enterprise e competenze frontend moderne.",
  },
  nav: {
    name: "Roberta Matera",
    role: "Software Developer",
    items: [
      { label: "Chi sono", section: "about" },
      { label: "Competenze", section: "skills" },
      { label: "Esperienza", section: "experience" },
      { label: "Progetti", section: "projects" },
      { label: "Formazione", section: "education" },
      { label: "Contatti", section: "contact" },
    ],
    resumeLabel: "Curriculum",
    languageLabel: "Lingua",
    openMenuLabel: "Apri menu",
    closeMenuLabel: "Chiudi menu",
  },
  languageSwitcher: {
    current: "Italiano",
    chooseLanguage: "Seleziona lingua",
    locales: [
      { locale: "it", label: "Italiano" },
      { locale: "en", label: "English" },
      { locale: "de", label: "Deutsch" },
    ],
  },
  footer: {
    siteColumn: {
      title: "SITO",
      links: [
        { label: "Home", route: "home" },
        { label: "Progetti", route: "projects" },
        { label: "Curriculum", route: "resume" },
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
      title: "RISORSE",
      links: [
        { label: "Stack tecnologico", route: "techStack" },
        { label: "Scarica CV", route: "resume" },
      ],
    },
    cta: {
      text: "Costruiamo qualcosa di utile e ben progettato.",
      button: "Scrivimi →",
    },
    copyrightSuffix: "Tutti i diritti riservati.",
  },
  hero: {
    eyebrow: "CIAO, SONO ROBERTA",
    title: "Software Developer con focus su piattaforme frontend scalabili e manutenibili.",
    description:
      "Da oltre 4 anni progetto e sviluppo applicazioni web moderne in contesti enterprise: dal confronto con stakeholder e UX fino a implementazione, refactoring, test e qualità.",
    actions: {
      primary: "Vedi progetti",
      secondary: "Contattami",
      tertiary: "Scarica CV",
    },
  },
  sections: {
    about: {
      eyebrow: "Chi sono",
      title: "Profilo tecnico con ownership frontend end-to-end",
      paragraphs: [
        "Sono una Frontend Software Engineer con esperienza su prodotti digitali in ambito banking, insurance, retail ed enterprise, inclusi contesti AI-driven.",
        "Lavoro su TypeScript, Angular e React con attenzione ad architettura frontend, componenti riusabili, integrazione API REST e standard qualitativi sostenibili nel tempo.",
      ],
    },
    skills: {
      eyebrow: "Competenze",
      title: "Tecnologie, qualità e pratiche di engineering",
      groups: [
        {
          title: "Frontend Architecture & Engineering",
          items: [
            "TypeScript, JavaScript, Angular, React, Next.js",
            "Architettura frontend e sistemi di componenti riusabili",
            "Responsive web app, PWA, HTML5, CSS3, Sass/SCSS",
            "Collaborazione frontend/backend con REST API",
            "Refactoring, riduzione del debito tecnico, manutenibilità",
          ],
        },
        {
          title: "UI Systems & UX",
          items: [
            "Librerie UI riusabili e standardizzazione interfacce",
            "Angular Material, PrimeNG, Material UI, Ant Design",
            "Storybook, Tailwind CSS, Bootstrap, Figma",
            "Workflow design-to-development e cross-browser UI",
          ],
        },
        {
          title: "Testing & Quality",
          items: [
            "Unit testing con Vitest, Jasmine e Karma",
            "Debugging, defect resolution e quality assurance",
            "Pattern di codice testabili e consistenti",
          ],
        },
        {
          title: "Tooling & Collaboration",
          items: [
            "Git, VS Code, IntelliJ, Agile/Scrum",
            "Documentazione tecnica, analisi requisiti, stakeholder collaboration",
            "AI-assisted development: Claude, GitHub Copilot, prompt engineering",
          ],
        },
      ],
    },
    experience: {
      eyebrow: "Esperienza",
      title: "Percorso professionale",
      items: [
        {
          role: "Front-End Engineer",
          company: "F1 Consulting",
          period: "Mag 2025 – Ago 2026",
          location: "Milano · Remote",
          highlights: [
            "Ownership dell’implementazione frontend su progetti enterprise per Conad, Generali e Barilla.",
            "Traduzione requisiti business e UX in soluzioni Angular/React manutenibili.",
            "Definizione di pattern riusabili, test e miglioramenti strutturali orientati alla qualità.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "Almaviva Digitaltech",
          period: "Apr 2023 – Mag 2025",
          location: "Bari · Hybrid",
          highlights: [
            "Sviluppo di sistemi frontend riusabili e standard tecnici condivisi.",
            "Contributo a piattaforme enterprise e AI-driven con architetture modulari.",
            "Documentazione tecnica e collaborazione cross-team su design system e component library.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "NexumAI",
          period: "Gen 2023 – Apr 2023",
          location: "Roma · Remote",
          highlights: [
            "Sviluppo e manutenzione di applicazione finanziaria React.",
            "Risoluzione criticità di integrazione REST API e riduzione del debito tecnico.",
          ],
        },
        {
          role: "Front-End Engineer",
          company: "Fides (progetti via Accenture)",
          period: "Feb 2022 – Dic 2022",
          location: "Napoli · Remote",
          highlights: [
            "Consegna di applicazioni React responsive per e-commerce e banking.",
            "Refactoring e componentizzazione riusabile con attenzione a performance e consistenza UI.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Progetti",
      title: "Progetti selezionati",
      confidentialNote: "Dettagli codice e deployment non pubblici per vincoli di riservatezza.",
      items: [
        {
          name: "Conad · Piattaforma gestionale interna + AI Assistant",
          context: "DataReply / F1 Consulting",
          summary:
            "Ownership frontend su piattaforma Angular/PWA con workflow responsive e componenti riusabili.",
          details: [
            "Allineamento continuo con stakeholder e UX su prototipi Figma.",
            "Riduzione cicli di revisione e incremento della qualità percepita in rilascio.",
            "Supporto a flussi AI-driven con integrazioni UI/API manutenibili.",
          ],
          stack: ["Angular", "TypeScript", "PWA", "Vitest", "REST API"],
          links: [],
          confidential: true,
        },
        {
          name: "Generali · Car Insurance Platform",
          context: "DataReply / F1 Consulting",
          summary:
            "Sole Front-End Developer su workflow React/Angular per gestione richieste e danni veicolo.",
          details: [
            "Implementazione frontend end-to-end da requisiti cliente a rilascio.",
            "Interfacce più chiare e affidabili con impatto misurabile su errori operativi.",
          ],
          stack: ["React", "Angular", "REST API", "Figma"],
          links: [],
          confidential: true,
        },
        {
          name: "Health Bridge Clinic",
          context: "Progetto accademico · UniPegaso (2026)",
          summary:
            "Piattaforma healthcare full-stack con architettura layered, sicurezza e documentazione UML.",
          details: [
            "Implementazione Java 21, Spring Boot, JPA, Spring Security e Angular.",
            "RBAC, DTO e integrazione sicura frontend/backend.",
          ],
          stack: ["Angular 21", "Java 21", "Spring Boot", "REST API", "UML"],
          links: [],
          confidential: false,
        },
      ],
    },
    education: {
      eyebrow: "Formazione",
      title: "Istruzione e crescita continua",
      certificationsTitle: "Certificazioni e sviluppo professionale",
      languagesTitle: "Lingue",
      items: [
        {
          title: "Bachelor’s Degree in Information Technology for Digital Enterprises",
          institution: "UNIPEGASO Digital University",
          period: "Ago 2024 – Lug 2026",
          status: "Completato",
          notes: "Percorso focalizzato su IT, digital business e progetto finale full-stack.",
        },
        {
          title: "Master’s Degree in Architecture",
          institution: "Polytechnic of Bari",
          period: "Set 2008 – Giu 2017",
          status: "Completato",
          notes: "Base metodologica forte su progettazione, struttura e problem solving.",
        },
        {
          title: "Front End Web Development Bootcamp",
          institution: "Strive School · Berlino",
          period: "Ott 2021 – Feb 2022",
          status: "Completato",
          notes: "Percorso pratico intensivo su sviluppo frontend moderno.",
        },
      ],
      certifications: [
        {
          name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
          status: "In corso · esame previsto Ott 2026",
        },
        {
          name: "Interaction Design Foundation (IxDF) · AI for Designers",
          status: "In corso",
        },
      ],
      languages: ["Italiano (madrelingua)", "Inglese (C1 - IELTS)", "Tedesco (A1 - in studio)"],
    },
    contact: {
      eyebrow: "Contatti",
      title: "Parliamo del tuo prossimo progetto frontend",
      text:
        "Sono disponibile per ruoli frontend dove servono qualità tecnica, ownership e collaborazione efficace tra prodotto, UX e backend.",
      primaryAction: "Scrivimi",
      resumeAction: "Vedi curriculum",
    },
  },
  pages: {
    resume: {
      title: "Curriculum",
      description: "Visualizza o scarica il CV pubblico di Roberta Matera.",
      eyebrow: "Curriculum",
      heading: "Curriculum Vitae",
      body: "Qui trovi la versione pubblica aggiornata del CV in formato PDF.",
      download: "Scarica CV (PDF)",
      view: "Apri CV",
      contact: "Contatti",
    },
    techStack: {
      title: "Stack tecnologico",
      description: "Panoramica tecnica delle tecnologie e pratiche utilizzate nei progetti.",
      backToHome: "← Torna alla home",
      eyebrow: "Stack tecnologico",
      heading: "Tecnologie e pratiche",
      intro:
        "Competenze organizzate per aree: sviluppo frontend, integrazione, qualità e workflow di engineering.",
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
          illustrationAlt: "Illustrazione UI systems",
        },
        {
          id: "quality",
          category: "Testing & Quality",
          items: ["Vitest", "Jasmine", "Karma", "Debugging", "Refactoring", "Quality assurance"],
          illustrationSrc: "/images/beTools.png",
          illustrationAlt: "Illustrazione testing e quality",
        },
        {
          id: "integration",
          category: "Integration & Backend",
          items: ["REST APIs", "Node.js", "Java", "Spring Boot", "JPA", "Spring Security", "Python", "PHP"],
          illustrationSrc: "/images/branchBG.png",
          illustrationAlt: "Illustrazione integrazione API",
        },
      ],
    },
    projects: {
      title: "Progetti",
      description: "Selezione di progetti enterprise e tecnici con focus su impatto e qualità frontend.",
      eyebrow: "Progetti",
      heading: "Lavori selezionati",
      intro: "Panoramica dei progetti più rilevanti su cui ho lavorato in ambito enterprise e accademico.",
      backToHome: "← Torna alla home",
    },
    notFound: {
      title: "Pagina non trovata",
      heading: "Questa pagina non esiste",
      body: "Il contenuto richiesto non è disponibile o è stato spostato.",
      backHome: "Torna alla home",
    },
  },
};
