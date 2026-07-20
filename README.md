# Evolux360 — Landing Page Acadêmica (HTML, CSS & JS)

Este repositório contém o projeto de uma Landing Page responsiva e de alta fidelidade visual para a plataforma **Evolux360**, desenvolvida exclusivamente com **HTML5, CSS3 e JavaScript (Vanilla)**.

O projeto foi reestruturado de um template em React para cumprir as especificações de entrega acadêmica.

---

## 🚀 Funcionalidades Principais

1. **Apresentação de Módulos (Produtos)**: Seções dedicadas que descrevem os módulos Core, AI, Comercial, Vision e Catálogo da plataforma.
2. **Integração com API ViaCep**: Um simulador de frete interativo que consome a API oficial do ViaCep (`https://viacep.com.br/ws/{cep}/json/`). Ele valida o CEP inserido, busca os dados de localidade (Cidade/UF) e simula o preço e o prazo de frete com base na região geográfica (UF).
3. **Formulário de Contato e Interesse**: Formulário funcional com validações de campos obrigatórios e formato de e-mail via JS.
4. **Feedback de Agradecimento (Ação JS)**: Ao preencher o formulário corretamente, um modal de sucesso animado é exibido com o nome e e-mail informados, demonstrando a captura de dados sem recarregar a página.
5. **Efeitos Visuais e Premium**:
   - Cursor customizado que segue o mouse e aumenta de escala ao passar sobre links e botões clicáveis.
   - Design moderno focado na paleta de cores original (tons de roxo `#5932EA`, cinza-azulados e sem uso de preto puro).
   - Efeito de *glassmorphism* (efeito de vidro) e sombras suaves.
   - Layout 100% responsivo para mobile e desktop.

---

## 🛠️ Tecnologias Utilizadas

* **Estrutura**: HTML5 Semântico.
* **Estilização**: CSS3 Puro (Vanilla CSS), incluindo variáveis nativas, Flexbox, CSS Grid e animações `@keyframes`.
* **Comportamento**: JavaScript Puro (ES6+), utilizando requisições assíncronas (`fetch` e `async/await`), manipulação de DOM e listeners de eventos.
* **Tipografia**: Google Fonts (*Inter* para corpo do texto e *Outfit* para cabeçalhos marcantes).
* **Ícones**: SVGs nativos para carregamento rápido e controle de cores.

---

## 📂 Estrutura de Arquivos

* `index.html`: Estrutura semântica da landing page.
* `style.css`: Estilos, variáveis e responsividade.
* `script.js`: Lógica para o simulador de CEP, validação de formulário e modal.
* `.gitignore`: Arquivos temporários ignorados.

---

## 📌 Requisitos de Git Cumpridos
* Repositório configurado localmente.
* Branches estruturadas:
  - `main`: Branch estável de produção.
  - `develop`: Branch de desenvolvimento ativa.
