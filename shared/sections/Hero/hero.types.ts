export type HeroAction = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  placeholderLabel: string;
};

export type HeroActions = {
  primary: HeroAction;
  secondary: HeroAction;
  tertiary: HeroAction;
};

export type HeroPrimaryStackItem = {
  name: string;
  placeholder: string;
};
