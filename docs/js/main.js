// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.textContent =
        document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Animate On Load
window.addEventListener("load", () => {
    document.querySelector(".hero-title").style.opacity = "1";
});

// Contributions Graph using Chart.js
const ctx = document.getElementById("contribChart").getContext("2d");
new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Contributions",
            data: [3, 7, 12, 18, 25, 32],
            borderColor: "#00f5ff",
            fill: false,
            tension: 0.3
        }]
    },
    options: { responsive: true }
});

// Mock Chat
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (msg) {
        const p = document.createElement("p");
        p.textContent = "You: " + msg;
        chatBox.appendChild(p);
        chatInput.value = "";

        // Mock bot response
        setTimeout(() => {
            const reply = document.createElement("p");
            reply.textContent = "Bot: Thanks for your message!";
            chatBox.appendChild(reply);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 800);
    }
});
