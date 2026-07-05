import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import NotFoundView from "@/components/NotFoundView";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <NotFoundView
      strings={{
        title: t("title"),
        description: t("description"),
        home: t("home"),
      }}
      Link={Link}
    />
  );
}
