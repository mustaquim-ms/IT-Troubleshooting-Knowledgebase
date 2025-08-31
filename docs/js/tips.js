// Modal Logic
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("solutionModal");
  const solutionText = document.getElementById("solutionText");
  const closeBtn = document.querySelector(".close");

  // Open modal with solution
  cards.forEach(card => {
    card.addEventListener("click", () => {
      solutionText.textContent = card.getAttribute("data-solution");
      modal.style.display = "flex";
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});
