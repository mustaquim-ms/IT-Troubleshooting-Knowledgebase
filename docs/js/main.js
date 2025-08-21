// Navbar shrink effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 60) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// NAVBAR SCROLL LOGIC
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// HERO TYPED ANIMATION (Multiple Texts)
const typedText = document.getElementById("typed-text");
const texts = [
    "KnowledgeBase: Empowering IT Learners",
    "Solve IT. Share Knowledge. Build Together.",
    "Learn, Code, and Collaborate Smarter.",
    "Your Go-To IT & AI Knowledge Hub",
    "Discover Tools. Fix Issues. Grow Faster."
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


// Subscription form handler
document.querySelector(".subscribe-form")?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thanks for subscribing! 🚀");
});

// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ===============================
// Scroll-triggered animations
// ===============================
const animatedSections = document.querySelectorAll(".section, .hero");

function handleScrollAnimations() {
    const triggerBottom = window.innerHeight * 0.85;

    animatedSections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", handleScrollAnimations);
handleScrollAnimations();

// ===============================
// Apply wobble effect on nav & footer links dynamically
// ===============================
function addHoverWobble(selector) {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener("mouseenter", () => {
            el.classList.add("hovering");
        });
        el.addEventListener("animationend", () => {
            el.classList.remove("hovering");
        });
    });
}

addHoverWobble(".nav-links li a");
addHoverWobble(".footer-col ul li a");
addHoverWobble(".footer-social a");
addHoverWobble(".navbar-social a");
