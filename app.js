/* ============================================================
   Serra do Mar Engenharia — app.js
   Redesign Editorial
   ============================================================ */

/* ------ Reveal on scroll ------ */
const revealItems = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);
revealItems.forEach((item) => observer.observe(item));

/* ------ Mobile hamburger menu ------ */
(function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!hamburger || !mobileMenu) return;

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !hamburger.classList.contains("open");
    hamburger.classList.toggle("open", isOpen);
    mobileMenu.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
    hamburger.setAttribute("aria-expanded", isOpen);
  }

  hamburger.addEventListener("click", () => toggleMenu());

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMenu(false);
  });
})();

/* ------ Contact form (Formspree) ------ */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const msgEl = document.getElementById("form-message");
  const submitBtn = form.querySelector('[type="submit"]');

  function setMessage(type, text) {
    msgEl.className = "form-message " + type;
    msgEl.textContent = text;
    msgEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function clearMessage() {
    msgEl.className = "form-message";
    msgEl.textContent = "";
  }

  function validate() {
    const nome  = form.querySelector('[name="nome"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg   = form.querySelector('[name="mensagem"]').value.trim();

    if (!nome)  { setMessage("error", "Por favor, informe seu nome."); return false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("error", "Por favor, informe um e-mail válido."); return false;
    }
    if (!msg)   { setMessage("error", "Por favor, descreva seu projeto."); return false; }
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessage();

    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setMessage(
          "success",
          "✓ Mensagem enviada com sucesso! Retornaremos em breve."
        );
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        const detail = json.errors ? json.errors.map((e) => e.message).join(", ") : "";
        setMessage("error", "Erro ao enviar. " + (detail || "Tente novamente ou nos contate por e-mail."));
      }
    } catch (_) {
      setMessage("error", "Sem conexão. Verifique sua internet e tente novamente.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Solicitar diagnóstico técnico";
    }
  });
})();
