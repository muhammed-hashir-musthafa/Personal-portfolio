// Get all "Learn more" buttons
const learnMoreBtns = document.querySelectorAll(".learn-more-btn");

// Get all project thumbnail images
const projectImages = document.querySelectorAll(".project-thumbnail img");

// Get all modals
const modals = document.querySelectorAll(".modal");

// Get all close buttons
const closeBtns = document.querySelectorAll(".close-btn");

// Function to open the modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex"; // Show the modal
  modal.classList.add("show"); // Add 'show' class for any additional styling (if required)
}

// Function to close the modal
function closeModal(modal) {
  modal.style.display = "none"; // Hide the modal
  modal.classList.remove("show"); // Remove 'show' class
}

// When the user clicks a "Learn more" button, open the corresponding modal
learnMoreBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const modalId = btn.getAttribute("data-modal");
    openModal(modalId);
    event.preventDefault(); // Prevent default anchor behavior
  });
});

// When the user clicks the project thumbnail image, open the corresponding modal
projectImages.forEach((img) => {
  img.addEventListener("click", (event) => {
    const modalId = img
      .closest(".project-thumbnail")
      .querySelector("a")
      .getAttribute("data-modal");
    openModal(modalId);
    event.preventDefault(); // Prevent default anchor behavior
  });
});

// When the user clicks the close button, close the modal
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal"); // Find the closest modal to the button
    closeModal(modal); // Call close function
  });
});

// Close modal if user clicks outside of the modal content
window.onclick = function (event) {
  modals.forEach((modal) => {
    if (event.target === modal) {
      // Check if click is outside modal content
      closeModal(modal); // Call close function
    }
  });
};

// Ensure modal is hidden on page load/refresh
window.onload = function () {
  modals.forEach((modal) => closeModal(modal)); // Close all modals on load
};

// Add event listener for experience cards
const experienceCards = document.querySelectorAll(".experience-card");

experienceCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default action
    const modalId = card.getAttribute("data-modal"); // Get the modal id from the card
    openModal(modalId);
  });
});

// Mobile Navigation Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Create mobile toggle button
  const mobileToggle = document.createElement("button");
  mobileToggle.className = "mobile-nav-toggle";
  mobileToggle.innerHTML = "☰";
  mobileToggle.setAttribute("aria-label", "Toggle navigation menu");

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "mobile-nav-overlay";

  // Insert elements
  document.body.insertBefore(mobileToggle, document.body.firstChild);
  document.body.insertBefore(overlay, document.body.firstChild);

  const sidebar = document.querySelector(".side-bar");

  // Toggle function
  function toggleNav() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active")
      ? "hidden"
      : "";

    // Change button icon
    mobileToggle.innerHTML = sidebar.classList.contains("active") ? "✕" : "☰";
  }

  // Event listeners
  mobileToggle.addEventListener("click", toggleNav);
  overlay.addEventListener("click", toggleNav);

  // Close nav when clicking on nav links
  const navLinks = document.querySelectorAll(".navbar-link, .navbar-link2");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (sidebar.classList.contains("active")) {
        toggleNav();
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      mobileToggle.innerHTML = "☰";
    }
  });

  // Handle escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      toggleNav();
    }
  });
});

// Active navigation highlighting system
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-link, .navbar-link2");
  const sections = document.querySelectorAll("section, .main-body");

  // Create a map of href to nav link for easy lookup
  const navMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      navMap.set(href, link);
    }
  });

  function updateActiveNavigation() {
    let currentSection = "";
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    // Find which section is currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        sectionId &&
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = `#${sectionId}`;
      }
    });

    // Remove active class from all nav links
    navLinks.forEach((link) => {
      link.classList.remove("active-nav");
    });

    // Add active class to current section's nav link
    if (currentSection && navMap.has(currentSection)) {
      navMap.get(currentSection).classList.add("active-nav");
    }
  }

  // Update on scroll
  window.addEventListener("scroll", throttle(updateActiveNavigation, 100));

  // Update on page load
  updateActiveNavigation();

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Throttle function to limit how often the scroll event fires
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Handle modal functionality (existing code enhanced)
document.addEventListener("DOMContentLoaded", function () {
  const openModalBtns = document.querySelectorAll(
    ".open-modal, .learn-more-btn"
  );
  const modals = document.querySelectorAll(".modal");
  const closeBtns = document.querySelectorAll(".close-btn");

  // Open modal
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        modal.classList.add("fade-in");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      }
    });
  });

  // Close modal
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
        modal.classList.remove("fade-in");
        document.body.style.overflow = "auto"; // Restore scrolling
      }
    });
  });

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
        this.classList.remove("fade-in");
        document.body.style.overflow = "auto";
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.style.display === "flex") {
          modal.style.display = "none";
          modal.classList.remove("fade-in");
          document.body.style.overflow = "auto";
        }
      });
    }
  });
});

// Mobile navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mobileClose = document.querySelector(".mobile-nav-close");
  const sidebar = document.querySelector(".side-bar");
  const overlay = document.querySelector(".mobile-nav-overlay");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", function () {
      sidebar.classList.add("active");
      if (overlay) overlay.classList.add("active");
    });
  }

  if (mobileClose && sidebar) {
    mobileClose.addEventListener("click", function () {
      sidebar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      sidebar.classList.remove("active");
      this.classList.remove("active");
    });
  }

  // Close mobile nav when clicking nav links
  const navLinks = document.querySelectorAll(".navbar-link, .navbar-link2");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
      }
    });
  });
});
