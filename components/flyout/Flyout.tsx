"use client";

import type { Character } from "#/types";

import { generateCSV } from "#/app/[locale]/actions";
import { useSelectionStore } from "#/lib/store/useSelectionStore";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function Flyout() {
  const t = useTranslations();
  const selected = useSelectionStore((state) => state.selected);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = async () => {
    const headers: (keyof Character)[] = [
      "name",
      "birth_year",
      "gender",
      "url",
    ];

    const response = await generateCSV(headers, selected);
    if (response.success) {
      const url = URL.createObjectURL(response.data);
      setDownloadUrl(url);
    }
  };

  useEffect(() => {
    if (downloadUrl && downloadRef.current) {
      downloadRef.current.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl("");
    }
  }, [downloadUrl]);

  if (selected.length === 0) return null;

  return (
    <div className="bg-secondary-300 border-secondary-300 secondary-shadow-md fixed right-5 bottom-5 z-2 w-fit rounded-lg border-2 px-6 py-4">
      <span className="mb-5 inline-block text-black">
        {selected.length} {t("csv.items_are_selected")}
      </span>
      <div>
        <button
          className="hover:border-secondary-400 hover:bg-secondary-400 border-black text-black normal-case"
          onClick={clearSelection}
        >
          {t("csv.unselect_all")}
        </button>
        <button
          className="hover:border-secondary-400 hover:bg-secondary-400 border-black text-black normal-case"
          onClick={handleDownload}
        >
          {t("csv.download")}
        </button>
      </div>
      <a
        ref={downloadRef}
        href={downloadUrl}
        download={`${selected.length}_items.csv`}
        style={{ display: "none" }}
      >
        {t("csv.download")}
      </a>
    </div>
  );
}
