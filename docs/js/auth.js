// Simple localStorage-based auth mock
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const user = document.getElementById("signup-username").value;
        const pass = document.getElementById("signup-password").value;
        if (user && pass) {
            localStorage.setItem("itkbUser", JSON.stringify({ user, pass }));
            alert("Account created! Please login.");
            window.location.href = "login.html";
        } else {
            alert("Fill all fields!");
        }
    });
}

const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const user = document.getElementById("login-username").value;
        const pass = document.getElementById("login-password").value;
        const stored = JSON.parse(localStorage.getItem("itkbUser"));
        if (stored && stored.user === user && stored.pass === pass) {
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials!");
        }
    });
}
