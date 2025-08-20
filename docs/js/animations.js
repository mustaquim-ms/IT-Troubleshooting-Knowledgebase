// Fade-in + Slide animations
document.addEventListener("DOMContentLoaded", () => {
    const animatedSections = document.querySelectorAll(".animate-fade-in, .animate-slide-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedSections.forEach(section => observer.observe(section));
});

// Wobble Effect for Navbar + Footer links + Social Icons
document.querySelectorAll(".nav-links a, footer a, .social-icons img, .footer-social img").forEach(el => {
    el.addEventListener("mouseenter", () => {
        el.classList.add("animate__animated", "animate__wobble");
    });
    el.addEventListener("animationend", () => {
        el.classList.remove("animate__animated", "animate__wobble");
    });
});
