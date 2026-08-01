// Consolida e renomeia categorias pequenas/genéricas para fins de navegação
// (grid da home, categoria, breadcrumb). O campo `category` original do
// catálogo do cliente não é alterado.
const CATEGORY_MERGE: Record<string, string> = {
  Marmitas: "Potes e Embalagens",
  Outros: "Diversos",
  Descartáveis: "Diversos",
  Copos: "Copos e Tampas",
  Hambúrguer: "Embalagens de Isopor",
  "Papéis e Bobinas": "Acoplado e Bobinas",
  Pizza: "Caixa de Pizza",
  Sacos: "Sacolas e Sacos Kraft",
};

export function getDisplayCategory(rawCategory: string): string {
  return CATEGORY_MERGE[rawCategory] ?? rawCategory;
}
