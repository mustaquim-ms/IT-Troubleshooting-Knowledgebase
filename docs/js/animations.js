// =============================
// Typing effect for hero subtitles
// =============================
function runTypedAnimation() {
    const typedText = document.getElementById("typed-text");
    if (!typedText) return;

    const messages = [
        "Documenting IT issues...",
        "Collaborating with the community...",
        "Building the ultimate IT KnowledgeBase."
    ];
    let msgIndex = 0;
    let charIndex = 0;
    let currentMessage = "";
    let isDeleting = false;

    function type() {
        if (isDeleting) {
            currentMessage = messages[msgIndex].substring(0, charIndex--);
        } else {
            currentMessage = messages[msgIndex].substring(0, charIndex++);
        }
        typedText.textContent = currentMessage;

        if (!isDeleting && charIndex === messages[msgIndex].length) {
            setTimeout(() => (isDeleting = true), 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            msgIndex = (msgIndex + 1) % messages.length;
        }
        setTimeout(type, isDeleting ? 60 : 120);
    }
    type();
}

// =============================
// GSAP scroll animations
// =============================
document.addEventListener("DOMContentLoaded", () => {
    runTypedAnimation();

    gsap.utils.toArray(".section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    });
});

// =============================
// Scroll reveal fallback (simple CSS trigger)
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});

// =============================
// Smooth Expand/Collapse for Cards
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const readMoreButtons = document.querySelectorAll(".read-more");

    readMoreButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const fullText = card.querySelector(".card-full");

            if (!card.classList.contains("expanded")) {
                // Expand
                card.classList.add("expanded");
                fullText.style.display = "block";
                gsap.fromTo(
                    fullText,
                    { height: 0, opacity: 0 },
                    { height: "auto", opacity: 1, duration: 0.6, ease: "power2.out" }
                );
                button.textContent = "Show Less ↑";

                // Optional: scroll to card after expanding
                gsap.to(window, { duration: 0.6, scrollTo: card.offsetTop - 50 });

            } else {
                // Collapse
                gsap.to(fullText, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        fullText.style.display = "none";
                        card.classList.remove("expanded");
                    }
                });
                button.textContent = "Read More →";
            }
        });
    });
});
