// Consolida categorias pequenas/genéricas dentro de categorias maiores e mais
// relevantes, só para fins de navegação (grid da home, categoria, breadcrumb).
// O campo `category` original do catálogo do cliente não é alterado.
const CATEGORY_MERGE: Record<string, string> = {
  Marmitas: "Potes e Embalagens",
  Outros: "Descartáveis",
};

export function getDisplayCategory(rawCategory: string): string {
  return CATEGORY_MERGE[rawCategory] ?? rawCategory;
}
