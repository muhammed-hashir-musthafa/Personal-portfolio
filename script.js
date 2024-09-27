// Get all "Learn more" buttons
const learnMoreBtns = document.querySelectorAll(".learn-more-btn");

// Get all modals
const modals = document.querySelectorAll(".modal");

// Close modal button
const closeBtns = document.querySelectorAll(".close-btn");

// When the user clicks a "Learn more" button, open the correct modal
learnMoreBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const modalId = btn.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    modal.classList.add('show');
    event.preventDefault();
  });
});

// When the user clicks the close button, close the modal
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.style.display = "none";
    modal.classList.remove('show');
  });
});

// Close modal if user clicks outside of the modal content
window.onclick = function (event) {
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
      modal.classList.remove('show');
    }
  });
};

// Ensure modal is hidden on page load/refresh
window.onload = function() {
  modals.forEach(modal => modal.style.display = "none");
};
