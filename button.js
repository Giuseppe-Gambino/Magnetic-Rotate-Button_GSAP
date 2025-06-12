const button = document.getElementById("magBut");
const text = "Hover me!";
const circleText = "Joseph --- Joseph --- Joseph --- ";
const angle = 360 / circleText.length;
const buttonText = document.getElementById("buttonText");
const container = document.getElementById("charCircle");

// Inserisce lettere in cerchio
container.innerHTML = "";
[...circleText].forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.transform = `rotate(${i * angle}deg)`;
  container.appendChild(span);
});

buttonText.innerText = text;

// GSAP interazione magnetica
let isHovering = false;
let rotateTl = gsap.timeline({ repeat: -1, paused: true });

rotateTl.to(button, {
  rotation: 360,
  duration: 10,
  ease: "none",
});

button.addEventListener("mouseenter", () => {
  isHovering = true;
  rotateTl.play();
});

button.addEventListener("mousemove", (e) => {
  if (!isHovering) return;
  const rect = button.getBoundingClientRect();
  const deltaX = (e.clientX - rect.left - rect.width / 2) * 0.4;
  const deltaY = (e.clientY - rect.top - rect.height / 2) * 0.4;

  gsap.to(button, {
    x: deltaX,
    y: deltaY,
    duration: 0.3,
    ease: "power2.out",
  });
});

button.addEventListener("mouseleave", () => {
  isHovering = false;
  gsap.to(button, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)",
  });
  rotateTl.pause();
  gsap.to(button, {
    rotation: 0,
    duration: 0.2,
    ease: "none",
  });
});
