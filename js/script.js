document.addEventListener("DOMContentLoaded", function () {
  alert(
    "This website is a Netflix clone for educational purposes only. No actual subscriptions or logins work here."
  );

  const POSTER_DIR = "images/posters/";

  const TRENDING_MOVIES = [
    {
      title: "Friends",
      meta: "1994 | Comedy, Romance",
      poster: `${POSTER_DIR}friends.jpg`,
    },
    {
      title: "The Mentalist",
      meta: "2008 | Crime, Mystery",
      poster: `${POSTER_DIR}the-mentalist.jpg`,
    },
    {
      title: "War Machine",
      meta: "2026 | Action, War",
      poster: `${POSTER_DIR}war-machine.jpg`,
    },
    {
      title: "A Different World",
      meta: "1987 | Comedy, Drama",
      poster: `${POSTER_DIR}a-different-world.jpg`,
    },
    {
      title: "From",
      meta: "2022 | Horror, Mystery",
      poster: `${POSTER_DIR}FROM.jpg`,
    },
    {
      title: "Peaky Blinders: The Immortal Man",
      meta: "2026 | Crime, Drama",
      poster: `${POSTER_DIR}peaky-blinders.jpg`,
    },
    {
      title: "Materialists",
      meta: "2025 | Romance, Drama",
      poster: `${POSTER_DIR}materialists.jpg`,
    },
    {
      title: "Damsel",
      meta: "2024 | Fantasy, Action",
      poster: `${POSTER_DIR}damsel.jpg`,
    },
    {
      title: "The Idea of You",
      meta: "2024 | Romance, Drama",
      poster: `${POSTER_DIR}the-idea-of-you.jpg`,
    },
  ];

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(value) {
    return EMAIL_REGEX.test(String(value).trim());
  }

  function showToast(message, variant = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center text-bg-${variant} border-0`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    container.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
    toast.show();
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  }

  async function submitEmailForm(form, emailInput) {
    const loadingSpinner = document.querySelector(".loading-spinner");
    const email = emailInput.value.trim();

    form.classList.add("was-validated");
    emailInput.classList.toggle("is-invalid", !isValidEmail(email));
    emailInput.classList.toggle("is-valid", isValidEmail(email));

    if (!isValidEmail(email)) {
      emailInput.focus();
      return;
    }

    if (loadingSpinner) loadingSpinner.style.display = "block";

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (loadingSpinner) loadingSpinner.style.display = "none";

    showToast(
      `Thanks! We saved ${email} for your demo membership. Check your inbox (simulated).`
    );
    form.reset();
    form.classList.remove("was-validated");
    emailInput.classList.remove("is-valid", "is-invalid");
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  const backgroundContainer = document.getElementById("background-container");
  let dynamicBg = document.querySelector(".dynamic-background");

  const heroStage = document.querySelector(".hero-stage");

  window.addEventListener("scroll", () => {
    const navSolid = window.scrollY > (heroStage ? heroStage.offsetHeight * 0.08 : 50);
    if (navSolid) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Dynamic background sync with carousel
  function updateBackground(imageUrl) {
    const newBg = document.createElement("div");
    newBg.className = "dynamic-background";
    newBg.style.backgroundImage = `url(${imageUrl})`;
    newBg.style.opacity = "0";

    backgroundContainer.appendChild(newBg);

    setTimeout(() => {
      newBg.style.opacity = "0.16";
    }, 50);

    setTimeout(() => {
      if (dynamicBg && dynamicBg.parentNode) {
        dynamicBg.parentNode.removeChild(dynamicBg);
      }
    }, 1000);

    dynamicBg = newBg;
  }

  const carousel = document.getElementById("heroCarousel");
  if (carousel) {
    const firstSlide = carousel.querySelector(".carousel-item.active");
    if (firstSlide && dynamicBg) {
      const firstBgUrl = firstSlide.dataset.bg;
      dynamicBg.style.backgroundImage = `url(${firstBgUrl})`;
    }

    carousel.addEventListener("slide.bs.carousel", (event) => {
      const nextSlide = event.relatedTarget;
      const nextBgUrl = nextSlide.dataset.bg;
      updateBackground(nextBgUrl);
    });
  }

  // FAQ Functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.setAttribute("type", "button");
    question.setAttribute("aria-expanded", "false");
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });
      document.querySelectorAll(".faq-question").forEach((q) => {
        q.classList.remove("active");
        q.setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        faqItem.classList.add("active");
        question.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll('.footer-section a[href="#faq-section"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  function createTrendingMovieCol(movie, rank) {
    const col = document.createElement("div");
    col.className = "col-auto pe-3 movie-col";
    col.innerHTML = `
      <div class="card border-0 bg-transparent position-relative movie-item">
        <div class="ranking-badge">${rank}</div>
        <div class="movie-poster-frame">
          <img
            src="${movie.poster}"
            class="card-img"
            alt="${movie.title} poster"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="card-img-overlay d-flex align-items-end movie-overlay">
          <div class="text-white movie-overlay-text">
            <h5 class="card-title mb-1">${movie.title}</h5>
            <p class="card-text small mb-0">${movie.meta}</p>
          </div>
        </div>
      </div>
    `;
    return col;
  }

  function renderTrendingMovies() {
    const movieRow = document.getElementById("trendingMovieRow");
    if (!movieRow) return null;

    movieRow.innerHTML = "";
    TRENDING_MOVIES.forEach((movie, index) => {
      movieRow.appendChild(createTrendingMovieCol(movie, index + 1));
    });

    return movieRow;
  }

  function bindMovieCardInteractions(root = document) {
    root.querySelectorAll(".movie-item").forEach((item) => {
      if (item.dataset.bound === "true") return;
      item.dataset.bound = "true";
      item.setAttribute("tabindex", "0");
      item.addEventListener("click", () => {
        item.classList.toggle("movie-item-active");
      });
    });
  }

  function initTrendingCarousel() {
    const movieRow = renderTrendingMovies();
    const scrollPrev = document.querySelector(".scroll-button.prev");
    const scrollNext = document.querySelector(".scroll-button.next");
    if (!movieRow || !scrollPrev || !scrollNext) return;

    bindMovieCardInteractions(movieRow);

    const scrollAmount = () => Math.min(movieRow.clientWidth * 0.75, 720);

    const maxScrollLeft = () =>
      Math.max(0, movieRow.scrollWidth - movieRow.clientWidth);

    const isAtEnd = () =>
      movieRow.scrollLeft >= maxScrollLeft() - 8;

    const isAtStart = () => movieRow.scrollLeft <= 8;

    scrollNext.addEventListener("click", () => {
      if (isAtEnd()) {
        movieRow.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      movieRow.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });

    scrollPrev.addEventListener("click", () => {
      if (isAtStart()) {
        movieRow.scrollTo({ left: maxScrollLeft(), behavior: "smooth" });
        return;
      }
      movieRow.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    let autoScrollTimer = null;
    const startAutoScroll = () => {
      if (autoScrollTimer) clearInterval(autoScrollTimer);
      autoScrollTimer = setInterval(() => {
        if (document.hidden) return;
        scrollNext.click();
      }, 6000);
    };
    const stopAutoScroll = () => {
      if (autoScrollTimer) clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    };

    movieRow.addEventListener("mouseenter", stopAutoScroll);
    movieRow.addEventListener("mouseleave", startAutoScroll);
    movieRow.addEventListener("touchstart", stopAutoScroll, { passive: true });
    movieRow.addEventListener("touchend", () => {
      setTimeout(startAutoScroll, 3000);
    });
    startAutoScroll();
  }

  initTrendingCarousel();

  // Hero + membership email forms
  document
    .querySelectorAll(".subscription-form, .membership-email-form")
    .forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) await submitEmailForm(form, emailInput);
      });

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        emailInput.addEventListener("input", () => {
          if (form.classList.contains("was-validated")) {
            emailInput.classList.toggle("is-invalid", !isValidEmail(emailInput.value));
            emailInput.classList.toggle("is-valid", isValidEmail(emailInput.value));
          }
        });
      }
    });

  const signInForm = document.getElementById("signInForm");
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("signInEmail");
      const passwordInput = document.getElementById("signInPassword");
      signInForm.classList.add("was-validated");

      const emailOk = isValidEmail(emailInput.value);
      const passOk = passwordInput.value.length >= 4;
      emailInput.classList.toggle("is-invalid", !emailOk);
      passwordInput.classList.toggle("is-invalid", !passOk);

      if (!emailOk || !passOk) return;

      const modalEl = document.getElementById("signInModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
      showToast("Demo sign-in successful. Welcome back!", "success");
      signInForm.reset();
      signInForm.classList.remove("was-validated");
    });
  }

  const languageSelect = document.querySelector(".language-selector select");
  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      const label =
        languageSelect.options[languageSelect.selectedIndex].text;
      showToast(`Language set to ${label} (demo).`, "dark");
    });
  }
});
