// Hero Background Cube Animation
const canvas = document.getElementById("hero-bg");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const cubes = [];
const numCubes = 50;
const mouse = { x: width / 2, y: height / 2 };

class Cube {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = x;
    this.baseY = y;
    this.speed = speed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(((this.x + this.y) * 0.01) % (2 * Math.PI));
    ctx.fillStyle = "rgba(255,127,80,0.7)";
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }

  update() {
    // Magnetic pull effect
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      this.x += dx * 0.02;
      this.y += dy * 0.02;
    } else {
      // Slowly return to original position
      this.x += (this.baseX - this.x) * 0.02;
      this.y += (this.baseY - this.y) * 0.02;
    }

    this.draw();
  }
}

// Generate cubes
for (let i = 0; i < numCubes; i++) {
  let size = Math.random() * 20 + 10;
  let x = Math.random() * width;
  let y = Math.random() * height;
  let speed = Math.random() * 0.5 + 0.2;
  cubes.push(new Cube(x, y, size, speed));
}

// Animate
function animate() {
  ctx.clearRect(0, 0, width, height);
  cubes.forEach(cube => cube.update());
  requestAnimationFrame(animate);
}

animate();

// Update mouse
canvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Resize
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});


/* --------------------------
   SMOOTH SCROLL
--------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* --------------------------
   SCROLL REVEAL ANIMATIONS
--------------------------- */
const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

// Testimonials auto slider with sliding effect
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.querySelector('.testimonial-dots');
let index = 0;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);

  dot.addEventListener('click', () => {
    goToSlide(i);
    index = i;
  });
});

const dots = document.querySelectorAll('.testimonial-dots span');

function goToSlide(newIndex) {
  slides.forEach(slide => slide.classList.remove('active', 'prev'));
  dots.forEach(dot => dot.classList.remove('active'));

  const current = index;
  if (newIndex > current) {
    slides[current].classList.add('prev'); // slide left
  }

  slides[newIndex].classList.add('active');
  dots[newIndex].classList.add('active');
  index = newIndex;
}

// Auto scroll every 3s
setInterval(() => {
  let newIndex = (index + 1) % slides.length;
  goToSlide(newIndex);
}, 3000);

// 🔹 Animated counter for stats (unchanged)
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function animateCounters() {
  if (!counterStarted && window.scrollY + window.innerHeight > document.querySelector('.testimonial-stats').offsetTop) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const step = target / (duration / 16);

      let current = 0;
      function updateCounter() {
        if (current < target) {
          current += step;
          counter.textContent = target < 10 ? current.toFixed(1) : Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      updateCounter();
    });
    counterStarted = true;
  }
}

window.addEventListener('scroll', animateCounters);

