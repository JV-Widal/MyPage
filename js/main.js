/**
 * Portfólio Profissional — João Vitor de Campos Widal Sanchez
 * Script principal (JavaScript puro, sem dependências externas)
 */

/* ==========================================================================
   1. CONFIGURAÇÃO CENTRALIZADA DE DADOS OPCIONAIS
   ========================================================================== */

const PORTFOLIO_CONFIG = {
  /**
   * Endereço do perfil no GitHub.
   * Mantenha vazio ("") enquanto não desejar exibir o botão do GitHub.
   * Quando preenchido com uma URL válida (ex.: "https://github.com/seu-usuario"),
   * o botão será exibido automaticamente na seção de Contato.
   */
  githubUrl: "",

  /**
   * Lista de projetos públicos.
   * Enquanto este array estiver vazio ([]), tanto a seção "Projetos" quanto
   * o item "Projetos" no menu de navegação permanecerão ocultos.
   *
   * Modelo de objeto para adicionar um projeto real:
   * {
   *   titulo: "Nome do Projeto",
   *   descricao: "Descrição objetiva do problema resolvido e da arquitetura utilizada.",
   *   tecnologias: ["C#", "ASP.NET Core", "SQL Server", "Docker"],
   *   linkRepositorio: "https://github.com/seu-usuario/nome-do-repositorio",
   *   linkDemonstracao: "" // Opcional: URL de demonstração ou deixe "" para não exibir o botão
   * }
   */
  projetos: []
};

/* ==========================================================================
   2. FUNÇÕES DE INICIALIZAÇÃO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  atualizarAnoRodape();
  configurarBotaoGithub();
  renderizarProjetos();
  inicializarMenuMobile();
  inicializarDestaqueNavegacao();
});

/**
 * Atualiza automaticamente o ano exibido no rodapé.
 */
function atualizarAnoRodape() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

/**
 * Valida se uma string representa uma URL HTTP/HTTPS real (e não "#" ou vazio).
 * @param {string} url
 * @returns {boolean}
 */
function isValidHttpUrl(url) {
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Exibe o botão do GitHub na seção de Contato somente quando houver uma URL válida.
 */
function configurarBotaoGithub() {
  const githubBtn = document.getElementById("btn-contact-github");
  if (!githubBtn) return;

  if (isValidHttpUrl(PORTFOLIO_CONFIG.githubUrl)) {
    githubBtn.href = PORTFOLIO_CONFIG.githubUrl.trim();
    githubBtn.hidden = false;
  } else {
    githubBtn.removeAttribute("href");
    githubBtn.hidden = true;
  }
}

/**
 * Renderiza os cards de projetos e exibe a seção/item de menu
 * apenas quando existirem projetos reais válidos cadastrados.
 */
function renderizarProjetos() {
  const secaoProjetos = document.getElementById("projetos");
  const navItemProjetos = document.getElementById("nav-item-projetos");
  const container = document.getElementById("projects-container");

  if (!secaoProjetos || !navItemProjetos || !container) return;

  const listaProjetos = Array.isArray(PORTFOLIO_CONFIG.projetos)
    ? PORTFOLIO_CONFIG.projetos.filter(
        (proj) =>
          proj &&
          typeof proj.titulo === "string" &&
          proj.titulo.trim() !== "" &&
          typeof proj.descricao === "string" &&
          proj.descricao.trim() !== ""
      )
    : [];

  if (listaProjetos.length === 0) {
    secaoProjetos.hidden = true;
    navItemProjetos.hidden = true;
    container.innerHTML = "";
    return;
  }

  container.innerHTML = "";

  listaProjetos.forEach((projeto) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const contentTop = document.createElement("div");

    const titleEl = document.createElement("h3");
    titleEl.className = "project-title";
    titleEl.textContent = projeto.titulo.trim();
    contentTop.appendChild(titleEl);

    const descEl = document.createElement("p");
    descEl.className = "project-description";
    descEl.textContent = projeto.descricao.trim();
    contentTop.appendChild(descEl);

    if (Array.isArray(projeto.tecnologias) && projeto.tecnologias.length > 0) {
      const techList = document.createElement("ul");
      techList.className = "project-tech-list";
      techList.setAttribute("aria-label", "Tecnologias utilizadas");

      projeto.tecnologias.forEach((tech) => {
        if (typeof tech === "string" && tech.trim() !== "") {
          const li = document.createElement("li");
          li.className = "project-tech-tag";
          li.textContent = tech.trim();
          techList.appendChild(li);
        }
      });

      if (techList.children.length > 0) {
        contentTop.appendChild(techList);
      }
    }

    card.appendChild(contentTop);

    // Links do projeto (exibidos somente se tiverem URLs válidas)
    const temRepoValido = isValidHttpUrl(projeto.linkRepositorio);
    const temDemoValida = isValidHttpUrl(projeto.linkDemonstracao);

    if (temRepoValido || temDemoValida) {
      const linksWrapper = document.createElement("div");
      linksWrapper.className = "project-links";

      if (temRepoValido) {
        const repoLink = document.createElement("a");
        repoLink.className = "project-link";
        repoLink.href = projeto.linkRepositorio.trim();
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        repoLink.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>Repositório</span>
        `;
        linksWrapper.appendChild(repoLink);
      }

      if (temDemoValida) {
        const demoLink = document.createElement("a");
        demoLink.className = "project-link";
        demoLink.href = projeto.linkDemonstracao.trim();
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";
        demoLink.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Demonstração</span>
        `;
        linksWrapper.appendChild(demoLink);
      }

      card.appendChild(linksWrapper);
    }

    container.appendChild(card);
  });

  secaoProjetos.hidden = false;
  navItemProjetos.hidden = false;
}

/**
 * Controla a abertura, o fechamento e os atributos de acessibilidade do menu mobile.
 */
function inicializarMenuMobile() {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const nav = document.getElementById("primary-navigation");

  if (!toggleBtn || !nav) return;

  function fecharMenu() {
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
    nav.classList.remove("is-open");
  }

  function alternarMenu() {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      fecharMenu();
    } else {
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Fechar menu de navegação");
      nav.classList.add("is-open");
    }
  }

  toggleBtn.addEventListener("click", alternarMenu);

  // Fecha o menu ao clicar em um link de navegação
  const navLinks = nav.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        fecharMenu();
      }
    });
  });

  // Fecha o menu ao pressionar a tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      fecharMenu();
      toggleBtn.focus();
    }
  });

  // Ajusta estado ao redimensionar a tela
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && toggleBtn.getAttribute("aria-expanded") === "true") {
      fecharMenu();
    }
  });
}

/**
 * Destaca o item do menu correspondente à seção visível na tela.
 */
function inicializarDestaqueNavegacao() {
  if (!("IntersectionObserver" in window)) return;

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav .nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${activeId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    if (!section.hidden) {
      observer.observe(section);
    }
  });
}
