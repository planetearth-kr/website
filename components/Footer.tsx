import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-gray-500 text-sm">
        <p>
          Copyright 2022-{new Date().getFullYear()} 플래닛네트워크. All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center">
          <span>{t("disclaimer")}</span>
          <span>{t("help")}</span>
        </div>
      </div>
    </footer>
  );
}
