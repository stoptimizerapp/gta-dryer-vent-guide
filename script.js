const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

document.querySelectorAll("[data-faq-button]").forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    if (panel) panel.hidden = isOpen;
  });
});

document.querySelectorAll("[data-quote-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const isGitHubPages = window.location.hostname.endsWith(".github.io");
    if (!isLocal && !isGitHubPages) return;

    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    if (status) {
      status.textContent = isGitHubPages
        ? "Quote intake is not connected yet. Please check back soon while the secure form endpoint is configured."
        : "Preview mode: the form is valid. Connect the deployed form to your email or CRM before launch.";
      status.classList.add("is-visible");
      status.focus();
    }
  });
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
