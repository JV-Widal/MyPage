# Portfólio Profissional — João Vitor Widal

Landing page de portfólio profissional de **João Vitor de Campos Widal Sanchez**, desenvolvedor de software com foco em backend, **C#**, **ASP.NET Core** e **SQL Server**.

O projeto foi construído com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)**, sem dependências externas de runtime ou etapa de build, utilizando caminhos relativos para funcionar tanto localmente quanto hospedado em um repositório ou subdiretório do **GitHub Pages**.

---

## Estrutura de pastas

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── curriculo.pdf       # Adicione manualmente o PDF do seu currículo neste caminho
│   └── icons/
│       ├── favicon.svg
│       ├── code.svg
│       ├── database.svg
│       ├── layers.svg
│       └── server.svg
└── README.md
```

---

## 1. Como visualizar o site localmente

Como o projeto utiliza apenas arquivos estáticos com caminhos relativos, você pode visualizá-lo de duas maneiras:

### Opção A: Abrindo diretamente no navegador
Basta dar um duplo clique no arquivo `index.html` ou abri-lo em qualquer navegador moderno.

### Opção B: Usando um servidor HTTP local (recomendado)
Caso tenha Python, Node.js ou a extensão **Live Server** do VS Code:

- **Com Python 3:**
  ```bash
  python3 -m http.server 8000
  ```
  Em seguida, acesse `http://localhost:8000` no navegador.

- **Com VS Code:**
  Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

---

## 2. Como adicionar o currículo (`assets/curriculo.pdf`)

> **Atenção:** O arquivo `assets/curriculo.pdf` **não foi incluído automaticamente** porque o link externo original estava restrito (HTTP 403) no momento da geração.

Para que o botão **"Baixar currículo"** funcione corretamente:
1. Renomeie o arquivo PDF do seu currículo para `curriculo.pdf` (tudo em minúsculas e sem acento).
2. Copie-o para dentro da pasta `assets/`, ficando exatamente em:
   ```text
   assets/curriculo.pdf
   ```

---

## 3. Como cadastrar seu endereço do GitHub

Por padrão, o botão do GitHub na seção **Contato** fica oculto enquanto nenhuma URL real estiver configurada.

Para ativá-lo:
1. Abra o arquivo `js/main.js`.
2. Localize o objeto `PORTFOLIO_CONFIG` no início do arquivo.
3. Preencha a propriedade `githubUrl` com a URL completa do seu perfil:
   ```javascript
   const PORTFOLIO_CONFIG = {
     githubUrl: "https://github.com/seu-usuario",
     projetos: []
   };
   ```
4. Salve o arquivo. O botão **"Acessar GitHub"** passará a ser exibido automaticamente na seção de Contato.

---

## 4. Como cadastrar projetos e ativar a seção "Projetos"

Enquanto o array `projetos` em `js/main.js` estiver vazio (`[]`), tanto a seção **Projetos** quanto o link **Projetos** no menu de navegação permanecem ocultos automaticamente.

Para adicionar projetos reais e ativar a seção:
1. Abra o arquivo `js/main.js`.
2. No objeto `PORTFOLIO_CONFIG`, adicione objetos ao array `projetos` seguindo este modelo:

```javascript
const PORTFOLIO_CONFIG = {
  githubUrl: "",
  projetos: [
    {
      titulo: "Nome do Projeto",
      descricao: "Descrição objetiva da aplicação, objetivo técnico e principais funcionalidades implementadas.",
      tecnologias: ["C#", "ASP.NET Core", "SQL Server", "Docker"],
      linkRepositorio: "https://github.com/seu-usuario/nome-do-repositorio",
      linkDemonstracao: "" // Opcional: informe uma URL completa (https://...) ou deixe "" para ocultar o botão de demonstração
    }
  ]
};
```

> **Nota:** Os links de **Repositório** e **Demonstração** só são renderizados nos cards caso possuam uma URL `http://` ou `https://` válida. Valores vazios (`""`) ou `"#"` são ignorados para evitar botões sem destino.

---

## 5. Como alterar cores e textos

### Alterar cores, fontes e espaçamentos
Todas as variáveis visuais estão centralizadas no bloco `:root` no topo do arquivo `css/style.css`:

```css
:root {
  --bg-primary: #0b1120;      /* Fundo principal (azul-marinho escuro) */
  --bg-secondary: #0f172a;    /* Fundo de seções alternadas */
  --bg-card: #131c31;         /* Fundo dos cards */
  --text-primary: #f8fafc;    /* Texto principal */
  --text-secondary: #cbd5e1;  /* Texto secundário */
  --accent-primary: #38bdf8;  /* Cor de destaque (ciano / azul claro) */
  --accent-hover: #7dd3fc;    /* Cor de destaque no hover */
}
```

### Alterar textos e seções
Todo o conteúdo textual de apresentação, competências, linha do tempo de experiência, formação acadêmica, cursos e contato está organizado de forma semântica e comentada diretamente no arquivo `index.html`.

---

## 6. Como publicar no GitHub Pages

1. Faça o commit e envie (`git push`) todos os arquivos para a branch `main` do seu repositório no GitHub:
   ```bash
   git add .
   git commit -m "Estrutura inicial do portfólio profissional"
   git push -u origin main
   ```
2. No GitHub, acesse a página do repositório e clique em **Settings** (Configurações).
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
5. Em **Branch**, escolha `main` e a pasta `/ (root)`, depois clique em **Save**.
6. Aguarde alguns instantes até o GitHub concluir a publicação. A URL pública será exibida no topo da página **Settings > Pages**.
