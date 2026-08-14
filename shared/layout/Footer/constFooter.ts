import { FooterColumnData, FooterCTA, FooterDecor } from "./footer.types";

export const FOOTER_COLUMNS: FooterColumnData[] = [
  {
    title: "SITE",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/#projects" },
      { label: "Resume", href: "/Resume" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      { label: "GitHub", href: "https://github.com/RobertaMatera" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/roberta-matera/" },
      { label: "Email", href: "mailto:materaroberta11@gmail.com" },
    ],
  },
  {
    title: "INFO",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Imprint", href: "#" },
    ],
  },
];


export const FOOTER_CTA: FooterCTA = {
  iconSrc: "/images/icons/logo.png",
  text: "Let's build something meaningful together.",
  button: {
    label: "Get in touch →",
    href: "mailto:materaroberta11@gmail.com",
  },
};

export const FOOTER_DECOR: FooterDecor = {
  branch: { src: "/images/branch.png", width: 60, height: 120 },
};

