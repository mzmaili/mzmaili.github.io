(() => {
  // Force dark mode
  document.documentElement.setAttribute("data-theme", "dark");

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      siteNav.classList.toggle("is-open");
    });
  }

  // Reading progress bar
  const progressBar = document.querySelector(".reading-progress span");
  if (progressBar) {
    const updateProgress = () => {
      const article = document.querySelector(".article-content");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = article.scrollHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / (total - window.innerHeight));
      progressBar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  // Back to top button
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Copy link share button
  document.querySelectorAll(".share-copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = btn.getAttribute("data-url");
      try {
        await navigator.clipboard.writeText(url);
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = original; }, 2000);
      } catch (e) {
        // Fallback
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy link"; }, 2000);
      }
    });
  });

  // Portfolio nav – show after scrolling past hero, highlight active section
  const pNav = document.querySelector(".p-nav");
  const navLinks = document.querySelectorAll(".p-nav a[href^='#']");
  if (navLinks.length) {
    const heroEl = document.getElementById("hero");
    const sections = [];
    navLinks.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) sections.push({ el, link });
    });

    const markActive = () => {
      // Show/hide nav based on hero scroll position
      if (pNav && heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        pNav.classList.toggle("visible", heroBottom <= 0);
      }

      let current = sections[0];
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= 120) current = s;
      }
      navLinks.forEach((l) => l.classList.remove("active"));
      if (current) current.link.classList.add("active");
    };

    window.addEventListener("scroll", markActive, { passive: true });
    markActive();
  }

  // Scroll-reveal: animate sections when they enter viewport
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach((el) => observer.observe(el));
  }

  // Back to top button
  const pBackToTop = document.querySelector(".p-back-to-top");
  if (pBackToTop) {
    const toggleBtn = () => {
      pBackToTop.classList.toggle("visible", window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleBtn, { passive: true });
    pBackToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
