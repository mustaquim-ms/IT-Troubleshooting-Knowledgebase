// HERO TYPED ANIMATION (Multiple Texts)
const typedText = document.getElementById("typed-text");
const texts = [
    "KnowledgeBase: Your Blueprint for AI-Powered IT.",
    "Troubleshoot with Intelligence. Innovate with Ease.",
    "Transform Problems into Solutions, One AI Tool at a Time.",
    "AI-Enhanced IT: Unlocking Efficiency, Elevating Expertise.",
    "The Future of Fixes: Your AI Toolkit for Seamless Operations."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;   // typing speed
let deletingSpeed = 50;  // deleting speed
let delayBetween = 1500; // pause before switching text

function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
        // Typing characters
        typedText.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    }
    else if (isDeleting && charIndex > 0) {
        // Deleting characters
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, deletingSpeed);
    }
    else {
        if (!isDeleting && charIndex === currentText.length) {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeEffect, delayBetween);
        }
        else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, typingSpeed);
        }
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
let width, height, t = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function draw() {
  ctx.clearRect(0, 0, width, height);

  let waveHeight = 120;
  let waveLength = 0.015;
  let speed = 0.02;

  // Gradient intensity: brighter at center, fades outward
  let cx = width / 2, cy = height / 2;
  let maxDist = Math.sqrt(cx * cx + cy * cy);

  for (let i = 0; i < height; i += 8) {
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      let y = Math.sin(x * waveLength + t) * waveHeight * Math.sin(i * 0.01) + i;
      ctx.lineTo(x, y);
    }

    // Compute distance to center row for radial glow
    let distFactor = 1 - Math.abs(i - cy) / cy;
    let alpha = 0.05 + distFactor * 0.15;

    ctx.strokeStyle = `hsla(190, 100%, 60%, ${alpha})`;
    ctx.stroke();
  }

  t += speed;
  requestAnimationFrame(draw);
}
draw();