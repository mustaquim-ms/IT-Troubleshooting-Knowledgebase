const problems = {
  "Windows": [
    { id: "bsod", title: "Blue Screen of Death", description: "BSOD caused by drivers.", solution: "Update or rollback drivers using Device Manager." },
    { id: "slow-boot", title: "Slow Boot", description: "Windows boots slowly.", solution: "Disable startup apps via Task Manager." }
    // ➝ Add ~25 problems per category
  ],
  "Linux": [
    { id: "broken-packages", title: "Broken Packages", description: "APT packages failing.", solution: "Run: sudo apt --fix-broken install" }
  ],
  "Network": [
    { id: "wifi-drop", title: "Wi-Fi Keeps Dropping", description: "Connection unstable.", solution: "Reset adapter and run: ipconfig /flushdns" }
  ]
};

const categoriesContainer = document.getElementById("categoriesContainer");
const modal = document.getElementById("solutionModal");
const modalTitle = document.getElementById("solutionTitle");
const modalDesc = document.getElementById("solutionDescription");
const modalCode = document.getElementById("solutionCode");
const closeModal = document.querySelector(".close");

function renderCategories() {
  categoriesContainer.innerHTML = "";
  Object.keys(problems).forEach(category => {
    const section = document.createElement("div");
    section.className = "category";
    section.innerHTML = `<h3>${category}</h3>`;

    const carousel = document.createElement("div");
    carousel.className = "problem-carousel";

    const leftBtn = document.createElement("button");
    leftBtn.className = "scroll-btn left";
    leftBtn.innerHTML = "<i class='fas fa-chevron-left'></i>";

    const rightBtn = document.createElement("button");
    rightBtn.className = "scroll-btn right";
    rightBtn.innerHTML = "<i class='fas fa-chevron-right'></i>";

    const track = document.createElement("div");
    track.className = "problem-track";

    problems[category].forEach(p => {
      const card = document.createElement("div");
      card.className = "problem-card";
      card.innerHTML = `
        <h4>${p.title}</h4>
        <div class="problem-details">${p.description}
          <br><button onclick="openSolution('${category}','${p.id}')">View Solution</button>
        </div>
      `;
      card.onclick = (e) => {
        if (e.target.tagName !== "BUTTON") {
          const details = card.querySelector(".problem-details");
          details.style.display = details.style.display === "block" ? "none" : "block";
        }
      };
      track.appendChild(card);
    });

    leftBtn.onclick = () => { track.scrollBy({ left: -300, behavior: "smooth" }); };
    rightBtn.onclick = () => { track.scrollBy({ left: 300, behavior: "smooth" }); };

    carousel.appendChild(leftBtn);
    carousel.appendChild(track);
    carousel.appendChild(rightBtn);
    section.appendChild(carousel);
    categoriesContainer.appendChild(section);
  });
}

function openSolution(category, id) {
  const problem = problems[category].find(p => p.id === id);
  modal.style.display = "flex";
  modalTitle.textContent = problem.title;
  modalDesc.textContent = problem.description;
  modalCode.textContent = problem.solution;
}

closeModal.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

renderCategories();