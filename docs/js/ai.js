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