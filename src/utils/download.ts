const GAME_URL = "https://example.com/jogo";

/**
 * Creates a temporary JSON file from arbitrary data and initiates a file
 * download. After the download has started a new tab pointing to the
 * game URL will be opened. This helper is separated into its own module
 * so that it can be tree‑shaken when unused and easily replaced or
 * extended in the future.
 *
 * @param filename Suggested file name for the downloaded JSON
 * @param data     Arbitrary JSON serialisable object
 */
export function downloadJSONAndGo(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  window.open(GAME_URL, "_blank");
}