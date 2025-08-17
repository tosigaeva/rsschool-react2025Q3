"use client";

import { Button } from "#/components/ui/Button";
import { Input } from "#/components/ui/Input";
import { useSearch } from "#/hooks/useNavigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchPanelSection() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const t = useTranslations();
  const { onTermChange } = useSearch();

  useEffect(() => {
    const params = new URLSearchParams(searchParams ?? []);
    setInput(params.get("query") || "");
  }, [searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.trim());
  };

  const handleSearchClick = async () => {
    onTermChange(input);
  };

  return (
    <>
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder={t("search.searchPlaceholder")}
      />
      <Button onClick={handleSearchClick}>{t("search.searchButton")}</Button>
    </>
  );
}
