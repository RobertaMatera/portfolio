import type { Locale } from "@/i18n/routing";
import type messages from "./messages/en.json";

// English is the source of truth: a key missing from it is a type error.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
