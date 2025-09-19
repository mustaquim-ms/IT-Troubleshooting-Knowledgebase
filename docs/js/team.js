document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".team-hero .blob").forEach((blob) => {
    const speed = blob.getAttribute("data-speed") || 20;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    blob.style.transform = `translate(${x}px, ${y}px)`;
  });
});

const features = document.querySelectorAll(".feature");
features.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * 10; 
    const rotateY = ((x / rect.width) - 0.5) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// Modal elements
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("bioModal");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalPosition = document.getElementById("modal-position");
  const modalBio = document.getElementById("modal-bio");
  const modalQuote = document.getElementById("modal-quote");
  const closeBtn = document.querySelector(".modal .close");

  const quoteStyles = ["quote-style-1", "quote-style-2", "quote-style-3", "quote-style-4", "quote-style-5"];

  // Open modal when clicking a card
  document.querySelectorAll(".bio-trigger").forEach(card => {
    card.addEventListener("click", () => {
      modalImg.src = card.dataset.img;
      modalName.textContent = card.dataset.name;
      modalPosition.textContent = card.dataset.position;
      modalBio.textContent = card.dataset.bio;
      modalQuote.textContent = card.dataset.quote || "";

      // Remove previous style
      modalQuote.className = "";
      // Assign a random style
      const randomStyle = quoteStyles[Math.floor(Math.random() * quoteStyles.length)];
      modalQuote.classList.add(randomStyle);

      modal.style.display = "flex";
      document.body.classList.add("modal-open");
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  });

  // Close modal on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });
});
