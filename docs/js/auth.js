document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".auth-form").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            alert("Authentication system will connect to backend here.");
        });
    });
});
