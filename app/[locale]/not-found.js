import { getTranslations } from "next-intl/server";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex items-center">
        <div className="container-app text-center max-w-2xl">
          <div className="text-[clamp(6rem,18vw,12rem)] leading-none font-serif text-brand">404</div>
          <h1 className="mt-4 text-4xl lg:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-ink-soft">{t("subtitle")}</p>
          <div className="mt-8">
            <Button href="/" size="lg">
              <Home className="h-4 w-4" />
              {t("back")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
