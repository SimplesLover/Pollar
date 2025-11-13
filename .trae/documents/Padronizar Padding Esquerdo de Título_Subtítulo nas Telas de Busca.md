## Objetivo
Aplicar o mesmo padding esquerdo da barra de pesquisa aos títulos e subtítulos nas telas "Buscar Peças" e "Consultar Modelos", mantendo responsividade e consistência visual.

## Referência de Padding
- A barra de pesquisa usa `paddingHorizontal: spacing.md` dentro de `inputWrap` (`src/components/SearchBar.js`).
- Portanto, o valor a replicar é `spacing.md`.

## Alterações Propostas
### PartsScreen
- Arquivo: `src/screens/PartsScreen.js`
- Ações:
  - Importar `spacing` de `src/design/spacing`.
  - No `<HeroHeader ...>` substituir `titleStyle` e `subtitleStyle` para usar `paddingLeft: spacing.md` (removendo o valor atual).
  - Não alterar o `style` da SearchBar (continua centralizada e com largura responsiva já aplicada).

### ModelsScreen
- Arquivo: `src/screens/ModelsScreen.js`
- Ações:
  - Importar `spacing` de `src/design/spacing`.
  - No `<HeroHeader ...>` substituir `titleStyle` e `subtitleStyle` para usar `paddingLeft: spacing.md`.

## Responsividade e Consistência
- `spacing.md` é parte do design system (12px) garantindo consistência.
- Mantém SearchBar intacta (sem padding esquerdo externo), apenas alinha visualmente textos com o padding interno da SearchBar.
- Não impacta outros elementos: mudanças são locais a `titleStyle`/`subtitleStyle`.

## Verificação
- Conferir alinhamento visual dos títulos/subtítulos com o início do conteúdo da SearchBar (ao lado do ícone de lupa).
- Testar em telas estreitas (<360px) e largas (>600px) para confirmar que o alinhamento permanece.

## Observações Técnicas
- Sem alterações de lógica; apenas estilos inline via props do `HeroHeader`.
- Mantém acessibilidade: textos continuam usando o componente `Text` com escala de fonte.

## Próximo Passo
Aprovar o plano para eu aplicar as mudanças (imports de `spacing` e ajuste de `paddingLeft` em ambos os arquivos).