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
    modal.classList.add('show'); // Add 'show' class for any additional styling (if required)
}

// Function to close the modal
function closeModal(modal) {
    modal.style.display = "none"; // Hide the modal
    modal.classList.remove('show'); // Remove 'show' class
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
        const modalId = img.closest('.project-thumbnail').querySelector('a').getAttribute("data-modal");
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
        if (event.target === modal) { // Check if click is outside modal content
            closeModal(modal); // Call close function
        }
    });
};

// Ensure modal is hidden on page load/refresh
window.onload = function() {
    modals.forEach(modal => closeModal(modal)); // Close all modals on load
};

// Add event listener for experience cards
const experienceCards = document.querySelectorAll('.experience-card');

experienceCards.forEach((card) => {
    card.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default action
        const modalId = card.getAttribute("data-modal"); // Get the modal id from the card
        openModal(modalId);
    });
});
