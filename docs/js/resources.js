document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".resource-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// ✅ Resources Filter Logic
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resourceCards = document.querySelectorAll(".resource-card");
  const searchInput = document.getElementById("resourceSearch");

  let activeFilter = "all";

  function filterResources() {
    const searchQuery = searchInput.value.toLowerCase();

    resourceCards.forEach((card) => {
      const matchesFilter =
        activeFilter === "all" ||
        card.classList.contains(activeFilter) ||
        card.dataset.category === activeFilter;

      const matchesSearch =
        card.textContent.toLowerCase().includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = "flex";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      filterResources();
    });
  });

  searchInput.addEventListener("input", filterResources);

  // Initial load
  filterResources();
});