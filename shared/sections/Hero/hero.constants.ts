import {
  HeroActions,
  HeroContent,
  HeroPrimaryStackItem,
} from "./hero.types";

export const HERO_CONTENT: HeroContent = {
  eyebrow: "HI, I'M ROBERTA",
  title: "Front-End & Full-Stack Developer building modern web experiences.",
  description:
    "I bring your needs to life, line by line. I design and develop fast, accessible, and scalable web applications, transforming ideas into intuitive digital products. From responsive front-end interfaces to robust backend APIs, I create reliable solutions focused on performance, usability, and clean code.",
  altLabel: "Roberta Matera portrait",
  src:"/images/hero_pic.png",
};

export const HERO_ACTIONS: HeroActions = {
  primary: {
    label: "View projects",
    href: "#projects",
  },
  secondary: {
    label: "Get in touch",
    href: "mailto:materaroberta11@gmail.com",
  },
  tertiary: {
    label: "Download CV",
    href: "/files/CV_%20R_Matera.pdf",
  },
};

export const HERO_PRIMARY_STACK: HeroPrimaryStackItem[] = [
  { name: "Angular", placeholder: "A" },
  { name: "React", placeholder: "R" },
  { name: "Next.js", placeholder: "N" },
  { name: "TypeScript", placeholder: "TS" },
  { name: "Spring Boot", placeholder: "SB" },
  { name: "Git", placeholder: "G" },
];
