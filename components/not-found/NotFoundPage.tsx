"use client";

import { useTranslations } from "next-intl";
import { createNavigation } from "next-intl/navigation";

const { Link } = createNavigation();

export const NotFoundPage = () => {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-400">
          {t("notFound.title")}
        </h2>
        <p className="mb-8 max-w-md text-gray-500 dark:text-gray-500">
          {t("notFound.description")}
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  );
};
