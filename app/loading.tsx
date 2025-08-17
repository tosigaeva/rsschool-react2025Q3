import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations();

  return <div>{t("loading")}</div>;
};

export default Loading;
