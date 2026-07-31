// Extrai blocos de medida em cm (ex: "26,5X20X4,3CM", "10X11,5X8,5CM (axlxc)")
// do nome do produto, para exibir separadamente na página do produto em vez
// de poluir o título nos cards, no carrinho e na mensagem do WhatsApp.
const DIMENSION_REGEX =
  /\d+(?:,\d+)?(?:[Xx]\d+(?:,\d+)?){1,3}\s*CM\b(?:\s*\([^)]*\))?/i;

export function extractDimensions(name: string): {
  displayName: string;
  dimensions: string | null;
} {
  const match = DIMENSION_REGEX.exec(name);
  if (!match || match.index === undefined) {
    return { displayName: name, dimensions: null };
  }

  const dimensions = match[0].trim();
  const before = name.slice(0, match.index).replace(/[-–]\s*$/, "").trimEnd();
  const after = name.slice(match.index + match[0].length).trimStart();
  const displayName = [before, after].filter(Boolean).join(" ").replace(/\s{2,}/g, " ").trim();

  return { displayName: displayName || name, dimensions };
}

export function getDisplayName(name: string): string {
  return extractDimensions(name).displayName;
}
