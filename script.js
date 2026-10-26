(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuToggle && navLinks) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("is-open", !open);
    });

    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("click", event => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const faqItems = document.querySelectorAll(".faq-list details");
  faqItems.forEach(item => item.addEventListener("toggle", () => {
    if (item.open) faqItems.forEach(other => {
      if (other !== item) other.open = false;
    });
  }));

  // Reveal sections as they enter the viewport; no animation when reduced motion is preferred.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(
    ".hero-copy, .hero-visual, .trust-strip, .section-intro, .feature-card, .workflow-copy, .step, .price-card, .cta-content, .faq-layout > div, .faq-list details"
  );

  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealTargets.forEach(element => observer.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add("is-visible"));
  }

  console.info("NOVA landing page demo loaded.");
})();