// Character rotation inspired by React Bits Rotating Text, using native browser animations.
(() => {
  const badge = document.getElementById("rotating-role");
  if (!badge || !Element.prototype.animate) return;

  const roles = [
    "Python Backend Developer",
    "API Integration Developer",
    "Data Migration Engineer",
    "Helpdesk Migration Specialist",
    "Python Full Stack Developer",
    "AWS Cloud Engineer",
    "DevOps Engineer"
  ];
  const windowElement = badge.querySelector(".role-window");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer;
  let visible = false;
  let hovered = false;
  let transitioning = false;

  function makeLine(text) {
    const line = document.createElement("span");
    line.className = "role-line";
    for (const character of text) {
      const letter = document.createElement("span");
      letter.className = "role-letter";
      letter.textContent = character === " " ? "\u00a0" : character;
      line.append(letter);
    }
    return line;
  }

  let current = makeLine(roles[0]);
  windowElement.replaceChildren(current);

  function fit(line = current) {
    const style = getComputedStyle(badge);
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    badge.style.width = `${line.offsetWidth + padding}px`;
  }

  function schedule() {
    clearTimeout(timer);
    if (visible && !hovered && !document.hidden && !reducedMotion.matches && !transitioning) {
      timer = setTimeout(rotate, 2400);
    }
  }

  async function rotate() {
    transitioning = true;
    index = (index + 1) % roles.length;
    const incoming = makeLine(roles[index]);
    windowElement.append(incoming);
    fit(incoming);
    const animations = [];
    [...current.children].forEach((letter, position) => {
      animations.push(letter.animate([
        { transform: "translateY(0) rotateX(0deg)", opacity: 1 },
        { transform: "translateY(-120%) rotateX(70deg)", opacity: 0 }
      ], {
        duration: 300,
        delay: position * 10,
        easing: "cubic-bezier(0.5, 0, 0.75, 0)",
        fill: "forwards"
      }));
    });
    [...incoming.children].forEach((letter, position) => {
      animations.push(letter.animate([
        { transform: "translateY(110%) rotateX(-70deg)", opacity: 0 },
        { transform: "translateY(0) rotateX(0deg)", opacity: 1 }
      ], {
        duration: 520,
        delay: 80 + position * 18,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both"
      }));
    });
    await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
    current.remove();
    current = incoming;
    animations.forEach(animation => animation.cancel());
    transitioning = false;
    fit();
    schedule();
  }

  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    schedule();
  });
  observer.observe(badge);
  new ResizeObserver(() => fit(windowElement.lastElementChild)).observe(badge.parentElement);
  badge.addEventListener("mouseenter", () => { hovered = true; schedule(); });
  badge.addEventListener("mouseleave", () => { hovered = false; schedule(); });
  document.addEventListener("visibilitychange", schedule);
  reducedMotion.addEventListener("change", schedule);
  document.fonts.ready.then(() => fit());
  fit();
})();
