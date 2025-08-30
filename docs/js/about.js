// Scroll reveal effect
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});

// HERO TYPED ANIMATION (Multiple Texts)
const typedText = document.getElementById("typed-text");
const texts = [
    "KnowledgeBase: Connecting IT Minds Everywhere",
"Learn, Solve, and Share IT Knowledge with Ease",
"From Tutorials to Troubleshooting – Grow Smarter",
"Your Hub for IT Learning, Collaboration, and Innovation",
"Explore, Build, and Master Technology Together",
"Turning IT Curiosity into Real Skills",
"Guides, Community, and Tools – All in One Place"
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


document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            // Close all other open FAQ items
            faqItems.forEach(el => {
                if (el !== item) {
                    el.classList.remove("active");
                }
            });

            // Toggle current item
            item.classList.toggle("active");
        });
    });
});
   
AOS.init({
                duration: 1000,   // animation speed in ms
                once: true,       // animation happens only once
                easing: 'ease-in-out'
            });



            document.addEventListener("DOMContentLoaded", function () {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("show");
                            observer.unobserve(entry.target); // animate once
                        }
                    });
                }, { threshold: 0.2 });

                // Target all elements that fade in
                const cards = document.querySelectorAll(
                    ".feature-card, .explore .card, .perk-card, .value-cards .card"
                );

                cards.forEach(card => observer.observe(card));
            });
        

            // Fade-in on scroll
            const fadeElems = document.querySelectorAll('.feature-card, .explore .card, .perk-card, .value-cards .card');

            function checkFade() {
                const triggerBottom = window.innerHeight * 0.85;

                fadeElems.forEach(el => {
                    const boxTop = el.getBoundingClientRect().top;

                    if (boxTop < triggerBottom) {
                        el.classList.add('show');
                    }
                });
            }

            window.addEventListener('scroll', checkFade);
            window.addEventListener('load', checkFade);
