import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { routing, type Locale } from "@/i18n/routing";

// Social preview card in the style of the hero section.
// Rendered once per locale at build time.

const size = { width: 1200, height: 630 };

// Mockup palette (styles/_tokens.scss). The image renderer cannot read CSS
// custom properties, so the few values it needs are repeated here.
const color = {
  g7: "#22471d",
  g6: "#2d5a27",
  g5: "#3f6e36",
  bg: "#f9fbf9",
  sl: "#eef8dd",
  t1: "#1a1c1a",
  tm: "#5f675f",
};

// Same wave path as the mockup's section dividers (--w1).
const wave =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 80" preserveAspectRatio="none"><path fill="${color.g7}" d="M0 46C160 4 320 4 520 40S900 84 1200 30V80H0Z"/></svg>`,
  );

const asset = (file: string) => readFile(join(process.cwd(), "assets", file));
const dataUri = async (file: string) => `data:image/png;base64,${(await asset(file)).toString("base64")}`;

export async function generateImageMetadata({ params }: { params: { locale: string } }) {
  const locale = (routing.locales as readonly string[]).includes(params.locale)
    ? (params.locale as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return [{ id: "card", alt: t("ogImageAlt"), size, contentType: "image/png" }];
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // Split the headline at its <em> so the emphasised end gets its own
  // highlighted line, as in the hero.
  const marker = "\u0000";
  const [lead = "", emphasis = "", tail = ""] = tHero
    .markup("title", { em: (chunks) => `${marker}${chunks}${marker}` })
    .split(marker);

  const [fraunces, manropeMedium, manropeBold, portrait, logo] = await Promise.all([
    asset("fonts/Fraunces-ExtraBold.ttf"),
    asset("fonts/Manrope-Medium.ttf"),
    asset("fonts/Manrope-Bold.ttf"),
    dataUri("og/portrait.png"),
    dataUri("og/logo.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: color.bg,
          backgroundImage:
            "radial-gradient(circle at 6% 10%, rgba(168,224,99,0.28), transparent 45%), radial-gradient(circle at 62% 100%, rgba(255,205,170,0.4), transparent 45%)",
          fontFamily: "Manrope",
          color: color.t1,
        }}
      >
        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 720,
            padding: "56px 0 0 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 14,
              padding: "8px 26px 8px 10px",
              borderRadius: 99,
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 8px 24px rgba(18,24,16,0.08)",
            }}
          >
            <img src={logo} width={52} height={51} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 24, fontWeight: 700 }}>{profile.name}</span>
              <span style={{ fontSize: 14, color: color.tm, letterSpacing: 1.2, textTransform: "uppercase" }}>
                {tCommon("role")}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 58,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: color.g5,
            }}
          >
            <div style={{ width: 30, height: 3, background: "#a8e063" }} />
            {tHero("eyebrow")}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 20,
              fontFamily: "Fraunces",
              fontSize: 54,
              lineHeight: 1.12,
              letterSpacing: -1,
            }}
          >
            <span>{lead.trim()}</span>
            {/* One span per word: the renderer has no box-decoration-break,
                so this keeps the highlight under each line when it wraps. */}
            <div style={{ display: "flex", flexWrap: "wrap", color: color.g6 }}>
              {`${emphasis}${tail}`.split(" ").map((word, index, words) => (
                <span
                  key={index}
                  style={{
                    paddingRight: index < words.length - 1 ? 14 : 0,
                    backgroundImage: `linear-gradient(transparent 62%, ${color.sl} 62%)`,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Portrait over a soft blob, bottom-aligned like the hero cut-out */}
        <div style={{ display: "flex", position: "absolute", right: 40, bottom: 0, width: 440, height: 600 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 40,
              height: 430,
              borderRadius: 220,
              backgroundImage:
                "radial-gradient(circle at 25% 30%, rgba(168,224,99,0.75), transparent 60%), linear-gradient(140deg, #eef8dd, #d9efd3 55%, #cfe9e0)",
            }}
          />
          <img
            src={portrait}
            width={440}
            height={545}
            alt=""
            style={{ position: "absolute", bottom: 20, left: 0 }}
          />
        </div>

        <img src={wave} width={1200} height={48} alt="" style={{ position: "absolute", left: 0, bottom: 0 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 800, style: "normal" },
        { name: "Manrope", data: manropeMedium, weight: 500, style: "normal" },
        { name: "Manrope", data: manropeBold, weight: 700, style: "normal" },
      ],
    },
  );
}
