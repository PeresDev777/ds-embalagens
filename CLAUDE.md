# Projeto: Site DS Embalagens (versão moderna)

## Contexto
Estou redesenhando o site da **DS Embalagens**, empresa de Porto Alegre/RS que vende embalagens descartáveis para delivery (hambúrguer, pizza, marmita, copos, açaí, confeitaria, sacos, descartáveis em geral). O cliente já tem um site antigo (https://dsembalagenspoa.com.br/) e quer uma versão nova, mais moderna, mantendo a essência visual (azul + branco, estilo "loja de delivery/atacado").

**Muito importante:** o site NÃO vai ter checkout online e NÃO mostra preços. O carrinho serve só para o cliente montar uma lista de pedido (produto + quantidade) e finalizar mandando pelo WhatsApp da empresa — o valor final é negociado diretamente lá com o cliente da DS Embalagens.

## Stack técnica
- **Next.js** (App Router) + **React** + **TypeScript**
- Estilização com **Tailwind CSS**
- Estado do carrinho: **Context API + localStorage** (sem backend, sem banco de dados)
- Produtos: catálogo real do cliente em `data/products.ts` (gerado a partir da planilha `DESCRIÇÃO.xlsx`, ~190 itens). Sem campo de preço. Campo `image` ainda `null` em todos os produtos — o cliente vai mandar as fotos depois.
- Deploy final: **Vercel**

## Identidade visual
- Cor primária: azul (tom próximo de #1E3A8A / #1D4ED8 — usar o azul das logos anexas como referência exata)
- Fundo branco, textos em azul-escuro/cinza
- Detalhe de destaque em amarelo (usado como faixa fina no topo do site antigo — pode manter como toque de cor pontual, ex. em badges de promoção)
- Logo horizontal (retangular) para o header
- Logo redonda para favicon / ícone / redes sociais
- Estilo visual: clean, confiável, "loja de atacado para delivery" — cards de produto com imagem, nome e botão de adicionar (sem preço)

## Estrutura de páginas
1. **Home (`/`)**
   - Header fixo: logo, busca, categorias, telefone/WhatsApp de atendimento, ícone do carrinho com contador
   - Hero banner ("Tudo para o seu delivery em um só lugar")
   - Barra de benefícios (entrega rápida, preço baixo, pronta entrega, atendimento rápido, compra segura)
   - Grid de categorias (ícone + nome, clicável, leva para `/categoria/[slug]`)
   - Seção de promoções
   - Seção "mais vendidos" (carrossel ou grid de produtos)
   - Depoimentos de clientes
   - Footer: sobre, políticas, contato, formas de pagamento, localização/mapa, redes sociais

2. **Categoria (`/categoria/[slug]`)**
   - Lista de produtos da categoria em grid, com ordenação simples (relevância / nome)
   - Cada card: imagem, nome, botão "+" para adicionar ao carrinho (com stepper de quantidade, igual à referência)

3. **Produto (`/produto/[slug]`)**
   - Imagem, nome, marca/código/qtd. mínima quando disponíveis, seletor de quantidade, botão "adicionar ao carrinho"
   - Produtos relacionados

4. **Carrinho (painel lateral/flutuante em todas as páginas + página dedicada opcional `/carrinho`)**

## Funcionalidade do carrinho (referência: print anexo)
- Painel abre ao clicar no ícone do carrinho no header (drawer lateral direito, como no exemplo)
- Carrinho funciona como **lista de pedido**: nome do produto, stepper de quantidade (+/-), opção de remover — sem preço, sem subtotal, sem total
- Rodapé do painel: contador de itens, botão "Limpar carrinho" e botão principal **"Finalizar pedido no WhatsApp"**
- Estado do carrinho salvo em localStorage (persiste ao recarregar a página)
- Contador de itens no ícone do carrinho no header

## Integração com WhatsApp (sem checkout, sem preço)
Ao clicar em "Finalizar pedido no WhatsApp":
1. Montar uma mensagem de texto com a lista de itens e quantidades (sem preços, sem total), exemplo:
   ```
   Olá! Gostaria de fazer o seguinte pedido:

   1x Marmita 750ML Com Tampa Totalplast
   2x Copo Plastico Descartavel Branco 300ML C/100

   Aguardo o valor e condições de entrega.
   ```
2. Codificar essa mensagem em URL e redirecionar para:
   `https://wa.me/5551992341428?text=MENSAGEM_CODIFICADA`
3. Número da empresa: **(51) 99234-1428** (usar formato internacional `5551992341428` no link)
4. Não implementar nenhuma etapa de pagamento, login ou dados de entrega no site — tudo isso, incluindo o valor final, é combinado no WhatsApp.

## Dados de produtos (catálogo real do cliente)
`data/products.ts` contém o catálogo real (planilha `DESCRIÇÃO.xlsx`), sem mock. Estrutura:
```ts
type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  sku: string | null;
  category: string;
  minOrderQty: number | null; // quantidade mínima de pedido, quando informada pelo fornecedor
  boxQty: number | null; // quantidade por caixa/lote, quando informada
  image: string | null; // TODO: preencher quando o cliente enviar as fotos
};
```
Categorias (`data/categories.ts`) são derivadas dinamicamente dos valores únicos de `category` no catálogo — não é mais uma lista fixa. Produtos sem `image` usam um placeholder genérico (`/products/placeholder.svg`).

## Responsividade
Mobile-first. A maioria dos clientes vai acessar pelo celular vindo do Instagram/WhatsApp — o carrinho e os botões de adicionar precisam funcionar bem no toque.

## Assets já disponíveis
- `logo_inteira.jpeg` — logo horizontal (header)
- `logo_redonda.jpeg` — logo circular (favicon, redes sociais)
- `exemplo_carrinho.jpeg` — referência de UX do carrinho
- `site.jpeg` — referência do layout/seções do site atual

## Ordem sugerida de execução
1. Setup do projeto Next.js + Tailwind, estrutura de pastas
2. Layout base (Header, Footer, Container)
3. Página Home com seções estáticas (usando mock de produtos)
4. Sistema de carrinho (Context + localStorage) + componente de drawer
5. Páginas de Categoria e Produto
6. Integração do botão WhatsApp
7. Ajustes de responsividade e polish visual
8. Preparar para deploy na Vercel
