document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".team-hero .blob").forEach((blob) => {
    const speed = blob.getAttribute("data-speed") || 20;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    blob.style.transform = `translate(${x}px, ${y}px)`;
  });
});

const features = document.querySelectorAll(".feature");
features.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * 10; 
    const rotateY = ((x / rect.width) - 0.5) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});