import { Locale } from "./config";
import { Dictionary } from "./dictionaries/types";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "it":
      return (await import("./dictionaries/it")).itDictionary;
    case "en":
      return (await import("./dictionaries/en")).enDictionary;
    case "de":
      return (await import("./dictionaries/de")).deDictionary;
    default:
      return (await import("./dictionaries/it")).itDictionary;
  }
}
