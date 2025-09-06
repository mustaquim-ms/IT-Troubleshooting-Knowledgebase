// Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
});

// Subscriber Counter Animation
let count = 0;
const target = 15230; 
const speed = 20;
const subscriberEl = document.getElementById("subscriber-count");

function updateCount() {
  const increment = Math.ceil(target / 200);
  if (count < target) {
    count += increment;
    subscriberEl.textContent = count.toLocaleString();
    setTimeout(updateCount, speed);
  } else {
    subscriberEl.textContent = target.toLocaleString();
  }
}
updateCount();

// Scroll Animation
const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.2 });
faders.forEach(fader => appearOnScroll.observe(fader));

// Search Filtering
const searchInput = document.getElementById("search-input");
const posts = document.querySelectorAll(".post");

function filterPosts(query) {
  const q = query.toLowerCase();
  posts.forEach(post => {
    const title = post.querySelector("h2").textContent.toLowerCase();
    const tags = post.querySelector(".tags").textContent.toLowerCase();
    if (title.includes(q) || tags.includes(q)) {
      post.style.display = "inline-block";
    } else {
      post.style.display = "none";
    }
  });
}

searchInput.addEventListener("keyup", () => filterPosts(searchInput.value));
document.getElementById("search-btn").addEventListener("click", () => filterPosts(searchInput.value));

// Category Chips
const chips = document.querySelectorAll(".search-chip");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    const category = chip.dataset.category.toLowerCase();
    filterPosts(category);
    searchInput.value = chip.textContent;
  });
});