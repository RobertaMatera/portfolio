// TYPES
export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumnData = {
  title: string;
  links: FooterLink[];
};

export type FooterCTA = {
  iconSrc: string;
  text: string;
  button: {
    label: string;
    href: string;
  },
};

export type FooterDecor = {
  branch: { src: string; width: number; height: number };
};