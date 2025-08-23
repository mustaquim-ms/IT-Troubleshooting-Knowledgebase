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

// Typed text effect
const words = [
    "AI-powered tools 🚀",
    "expert tutorials 📘",
    "real-world projects 💻",
    "a supportive community 🌍",
    "future-driven knowledge 🔮"
];
let i = 0, j = 0, currentWord = "", isDeleting = false;
const typedText = document.getElementById("typed-text");

function typeEffect() {
    if (!typedText) return;

    if (i < words.length) {
        if (!isDeleting && j <= words[i].length) {
            currentWord = words[i].substring(0, j++);
            typedText.textContent = currentWord;
        } else if (isDeleting && j >= 0) {
            currentWord = words[i].substring(0, j--);
            typedText.textContent = currentWord;
        }

        if (j === words[i].length + 1) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
        }
        setTimeout(typeEffect, isDeleting ? 60 : 100);
    }
}

typeEffect();
