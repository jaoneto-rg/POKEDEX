# POKEDEX

Projeto de Pokedex simples para praticar consumo de API externa e manipulação do DOM. A aplicação busca dados na PokeAPI e exibe nome, número e sprite do Pokémon, além de permitir navegar entre os registros.

**Destaques**
- Busca por nome ou número
- Botões de navegação para anterior/próximo
- Alternância para versão Shiny quando disponível
- Interface baseada em uma imagem clássica de Pokedex
- Feedback de carregamento e tratamento de “não encontrado”

**Tecnologias**
- HTML
- CSS
- JavaScript (vanilla)
- API: PokeAPI

**Como usar**
1. Abra o arquivo `index.html` no navegador.
2. Digite um nome ou número no campo de busca e pressione Enter.
3. Use os botões para avançar ou voltar na lista.
4. Clique em “Shiny” para alternar a versão do Pokémon (quando houver sprite).

**Estrutura do projeto**
- `index.html` — estrutura da página e componentes da Pokedex
- `css/styles.css` — estilos e layout
- `js/script.js` — lógica de busca, renderização, navegação e shiny
- `images/` — imagens usadas no layout
- `favicons/` — ícones do navegador

**Observações**
- A listagem segue o ID oficial da PokeAPI.
- Quando não há resultado, a tela exibe a mensagem de “não encontrado”.
