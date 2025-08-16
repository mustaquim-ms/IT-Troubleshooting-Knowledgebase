// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    // Fade in hero title
    gsap.from(".hero-title", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power3.out"
    });
    gsap.from(".hero-subtitle", {
        duration: 1.5,
        y: 30,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out"
    });
    gsap.from(".cta-btn", {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        delay: 1,
        ease: "back.out(1.7)"
    });

    // Animate each section on scroll
    gsap.utils.toArray(".section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // when section is 80% into viewport
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    });

    // Animate cards individually
    gsap.utils.toArray(".card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // Contributor images pop-in
    gsap.utils.toArray(".contributor").forEach((contrib, i) => {
        gsap.from(contrib, {
            scrollTrigger: {
                trigger: contrib,
                start: "top 85%",
            },
            duration: 1,
            scale: 0.5,
            opacity: 0,
            delay: i * 0.2,
            ease: "elastic.out(1, 0.6)"
        });
    });
});

// Loader Animation
window.addEventListener("load", () => {
    gsap.to("#page-loader", {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        onComplete: () => {
            document.getElementById("page-loader").style.display = "none";
        }
    });
});

// Page Transition Overlay
function pageTransition(url) {
    const overlay = document.getElementById("transition-overlay");
    gsap.to(overlay, {
        duration: 0.5,
        scaleX: 1,
        transformOrigin: "left",
        ease: "power2.inOut",
        onComplete: () => {
            window.location.href = url;
        }
    });
}

// Hook into links with class "transition-link"
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && (href.endsWith(".html"))) {
            link.classList.add("transition-link");
        }
    });

    document.querySelectorAll(".transition-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = link.getAttribute("href");
            pageTransition(url);
        });
    });

    // Animate overlay when page loads
    gsap.fromTo("#transition-overlay",
        { scaleX: 1, transformOrigin: "right" },
        { duration: 0.6, scaleX: 0, ease: "power2.inOut", delay: 0.3 }
    );
});
