import { getDisplayCategory } from "@/lib/categoryMerge";

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

// Grupos de produtos cujo cliente pediu para tirar a medida da descrição em
// todo lugar (card, carrinho, busca) — a medida continua disponível no chip
// "Medidas" da página do produto, pois vem do próprio campo `name`.
const HIDE_DIMENSIONS_IDS = new Set([
  "p079", "p080", "p081", "p082", // caixinhas de batata / caixa de lanche
  "p072", "p073", "p074", "p075", "p076", // saco kraft liso
]);
const HIDE_DIMENSIONS_CATEGORIES = new Set(["Embalagens de Isopor"]);

export function shouldHideDimensions(product: {
  id: string;
  category: string;
}): boolean {
  if (HIDE_DIMENSIONS_IDS.has(product.id)) return true;
  return HIDE_DIMENSIONS_CATEGORIES.has(getDisplayCategory(product.category));
}

export function getCardDisplayName(product: {
  id: string;
  name: string;
  category: string;
}): string {
  return shouldHideDimensions(product) ? getDisplayName(product.name) : product.name;
}
