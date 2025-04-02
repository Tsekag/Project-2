document.addEventListener("DOMContentLoaded", function () {
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    const backgroundContainer = document.getElementById(
      "background-container"
    );
    let dynamicBg = document.querySelector(".dynamic-background");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
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

    // Initialize first background
    const carousel = document.getElementById("heroCarousel");
    const firstSlide = carousel.querySelector(".carousel-item.active");
    if (firstSlide) {
      const firstBgUrl = firstSlide.dataset.bg;
      dynamicBg.style.backgroundImage = `url(${firstBgUrl})`;
    }

    // Update background on carousel slide
    carousel.addEventListener("slide.bs.carousel", (event) => {
      const nextSlide = event.relatedTarget;
      const nextBgUrl = nextSlide.dataset.bg;
      updateBackground(nextBgUrl);
    });

    // FAQ Functionality
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains("active");

        // Close all FAQ items
        document.querySelectorAll(".faq-item").forEach((item) => {
          item.classList.remove("active");
        });
        document.querySelectorAll(".faq-question").forEach((q) => {
          q.classList.remove("active");
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          faqItem.classList.add("active");
          question.classList.add("active");
        }
      });
    });

    // Trending section scroll functionality
    const movieRow = document.querySelector(".movie-row");
    const scrollPrev = document.querySelector(".scroll-button.prev");
    const scrollNext = document.querySelector(".scroll-button.next");
    const scrollAmount = 800;

    if (scrollPrev && scrollNext) {
      scrollPrev.addEventListener("click", () => {
        movieRow.scrollLeft -= scrollAmount;
      });

      scrollNext.addEventListener("click", () => {
        movieRow.scrollLeft += scrollAmount;
      });

      // Show/hide scroll buttons based on scroll position
      movieRow.addEventListener("scroll", () => {
        scrollPrev.style.opacity = movieRow.scrollLeft > 0 ? "1" : "0";
        scrollNext.style.opacity =
          movieRow.scrollLeft < movieRow.scrollWidth - movieRow.clientWidth
            ? "1"
            : "0";
      });
    }

    // Enhanced form handling
    const forms = document.querySelectorAll(".subscription-form");
    const loadingSpinner = document.querySelector(".loading-spinner");

    forms.forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;

        if (!email || !email.includes("@")) {
          alert("Please enter a valid email address");
          return;
        }

        loadingSpinner.style.display = "block";

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        loadingSpinner.style.display = "none";
        alert("Thank you for subscribing!");
        form.reset();
      });
    });

    // Lazy loading for images
    const movieImages = document.querySelectorAll(".movie-item img");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        }
      });
    });

    movieImages.forEach((img) => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  });
