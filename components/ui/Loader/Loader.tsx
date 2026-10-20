import { getTranslations } from "next-intl/server";

import CatChase from "@/components/ui/CatChase/CatChase";
import CatTable from "@/components/ui/CatTable/CatTable";
import { stringList } from "@/lib/messages";

/**
 * Page loading state. The cat chases the fish (v1); if loading takes longer
 * than a few seconds, the slow scene (v2) takes over. Pure CSS, no client
 * JavaScript. Screen readers hear one calm "Loading", not the jokes.
 */
export default async function Loader() {
  const t = await getTranslations("Loader");

  return (
    <div className="loader" role="status">
      <span className="visually-hidden">{t("label")}</span>
      <div className="loader__stage">
        <div className="loader__scene loader__scene--default">
          <CatChase messages={stringList(t.raw("chase"), "Loader.chase")} />
        </div>
        <div className="loader__scene loader__scene--slow">
          <CatTable messages={stringList(t.raw("slow"), "Loader.slow")} />
        </div>
      </div>
    </div>
  );
}
