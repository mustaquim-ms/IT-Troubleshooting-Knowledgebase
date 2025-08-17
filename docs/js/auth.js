// Mock authentication actions

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".auth-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Logged in successfully (demo)!");
        });
    }

    const signupForm = document.querySelector(".auth-form");
    if (signupForm && signupForm.querySelector('button[type="submit"]')) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Account created successfully (demo)!");
        });
    }

    // Social logins
    document.querySelectorAll(".social-login button").forEach(btn => {
        btn.addEventListener("click", () => {
            alert(`${btn.textContent} - demo login`);
        });
    });

    // Forgot password
    const forgotBtn = document.querySelector(".forgot-password");
    if (forgotBtn) {
        forgotBtn.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Password reset link sent (demo)!");
        });
    }
});
