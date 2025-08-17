"use server";

import type { Character } from "#/types";

export async function generateCSV(
  headers: (keyof Character)[],
  rows: Character[],
) {
  try {
    const rowLines = rows.map((row) => headers.map((head) => row[head]));
    const csvContent = [headers.join(","), ...rowLines].join("\n");

    return {
      success: true,
      data: new Blob([csvContent], { type: "text/csv;charset=utf-8;" }),
      filename: "star-wars-characters.csv",
    };
  } catch (error) {
    return {
      success: false,
      data: new Blob([], { type: "text/csv;charset=utf-8;" }),
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
