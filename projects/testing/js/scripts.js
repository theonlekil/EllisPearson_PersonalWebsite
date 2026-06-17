const bg = document.getElementById("background");
const content = document.getElementById("content");

let activated = false;

bg.addEventListener("click", () => {
    if (activated) return; // prevent toggling off

    activated = true;
    content.classList.add("active");
    bg.classList.add("blurred");
});