const projectSlider = document.querySelector("[data-project-slider]");
const previousProjectButton = document.querySelector("[data-project-slide='previous']");
const nextProjectButton = document.querySelector("[data-project-slide='next']");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    }
  });
}

if (projectSlider && previousProjectButton && nextProjectButton) {
  let isProjectSliderMoving = false;
  const projectSlideDuration = 340;

  const getProjectStep = () => {
    const cards = Array.from(projectSlider.querySelectorAll(".project-card"));

    if (!cards.length) {
      return 0;
    }

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = Number(getComputedStyle(projectSlider).columnGap.replace("px", "")) || 0;

    return cardWidth + gap;
  };

  const setProjectScroll = (left) => {
    const previousScrollBehavior = projectSlider.style.scrollBehavior;

    projectSlider.style.scrollBehavior = "auto";
    projectSlider.scrollLeft = left;
    projectSlider.style.scrollBehavior = previousScrollBehavior;
  };

  const finishProjectSlide = () => {
    isProjectSliderMoving = false;
    previousProjectButton.disabled = false;
    nextProjectButton.disabled = false;
  };

  const moveProjects = (direction) => {
    const cards = Array.from(projectSlider.querySelectorAll(".project-card"));
    const step = getProjectStep();

    if (!cards.length || !step) {
      return;
    }

    if (isProjectSliderMoving) {
      return;
    }

    isProjectSliderMoving = true;
    previousProjectButton.disabled = true;
    nextProjectButton.disabled = true;

    if (direction > 0) {
      projectSlider.scrollBy({ left: step, behavior: "smooth" });

      window.setTimeout(() => {
        projectSlider.appendChild(projectSlider.firstElementChild);
        setProjectScroll(projectSlider.scrollLeft - step);
        finishProjectSlide();
      }, projectSlideDuration);

      return;
    }

    projectSlider.insertBefore(projectSlider.lastElementChild, projectSlider.firstElementChild);
    setProjectScroll(projectSlider.scrollLeft + step);
    projectSlider.scrollBy({ left: -step, behavior: "smooth" });

    window.setTimeout(finishProjectSlide, projectSlideDuration);
  };

  previousProjectButton.addEventListener("click", () => moveProjects(-1));
  nextProjectButton.addEventListener("click", () => moveProjects(1));
}
