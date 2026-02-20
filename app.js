// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// Close menu on nav link click
navMenu.querySelectorAll(".item a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
    document.body.style.overflow = "";
  });
});

// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});

// ==============================
// SCROLL TO TOP
// ==============================
const scrollTopBtn = document.getElementById("scrollTop");
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==============================
// ICON HOVER ANIMATION
// ==============================
document.querySelectorAll(".icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.classList.remove("iconAnimate");
    void icon.offsetWidth;
    icon.classList.add("iconAnimate");
  });
});

// ==============================
// MENU FILTER BUTTONS
// ==============================
const filterBtns = document.querySelectorAll(".filter-btn");
const menuBoxes = document.querySelectorAll(".menu-box");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    menuBoxes.forEach((box, i) => {
      const match = filter === "all" || box.dataset.category === filter;
      if (match) {
        box.classList.remove("hidden");
        box.style.animationDelay = `${(i % 4) * 80}ms`;
        box.classList.remove("animate__animated", "animate__fadeInUp");
        void box.offsetWidth;
        box.classList.add("animate__animated", "animate__fadeInUp");
      } else {
        box.classList.add("hidden");
      }
    });
  });
});

// ==============================
// INTERSECTION OBSERVER — SECTIONS
// ==============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const section = entry.target;

      // HOME
      if (section.classList.contains("home")) {
        section.classList.add("animate__animated", "animate__fadeInDownBig");
      }

      // ABOUT
      if (section.classList.contains("about")) {
        const aboutLeft = section.querySelector(".about-left");
        const aboutRight = section.querySelector(".about-right");
        const img = aboutLeft?.querySelector("img");

        if (img) {
          img.classList.remove("about--image");
          aboutLeft.classList.add("animate__animated");
          img.classList.add("animate__animated", "animate__backInLeft");
          img.addEventListener(
            "animationend",
            () => {
              img.classList.remove("animate__backInLeft");
              img.classList.add("about--image");
            },
            { once: true },
          );
        }

        if (aboutRight) {
          aboutRight.classList.add("animate__animated", "animate__backInRight");
        }
      }

      // MENU
      if (section.classList.contains("menu")) {
        const visibleBoxes = [
          ...document.querySelectorAll(".menu-box:not(.hidden)"),
        ];
        visibleBoxes.forEach((box, index) => {
          setTimeout(() => {
            box.classList.add("animate__animated", "animate__fadeInUp");
          }, index * 100);
        });
      }

      // GALLERY
      if (section.classList.contains("gallary")) {
        section.querySelectorAll(".gallary-box-1").forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animate__animated", "animate__zoomIn");
            card.style.opacity = "1";
          }, index * 120);
        });
      }

      // REVIEWS
      if (section.classList.contains("reviews")) {
        section.querySelectorAll(".customer-box").forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animate__animated", "animate__fadeInUp");
          }, index * 150);
        });
      }

      // TEAMS
      if (section.classList.contains("teams")) {
        section.querySelectorAll(".teams__bow").forEach((card, index) => {
          card.style.animationDelay = `${index * 150}ms`;
        });
      }

      observer.unobserve(section);
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll("section")
  .forEach((section) => observer.observe(section));

// ==============================
// ACTIVE NAV LINK ON SCROLL
// ==============================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".item a[href^='#']");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = "";
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.style.color = "var(--color-primary)";
          }
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((s) => sectionObserver.observe(s));

// ==============================
// FORM SUBMIT FEEDBACK
// ==============================
const orderForm = document.getElementById("order-form");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = orderForm.querySelector(".btn-submit");
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check-circle"></i> Commande envoyée !';
    btn.style.background = "#22c55e";
    btn.style.color = "white";
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = "";
      btn.style.color = "";
      orderForm.reset();
    }, 3000);
  });
}
