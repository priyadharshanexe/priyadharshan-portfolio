const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLinks = nav.querySelectorAll(".nav-link");

document.querySelector(".work-link").addEventListener("click", () => {
  document.getElementById("project").scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start"
  });
  if (window.location.hash !== "#project") {
    window.history.pushState(null, "", "#project");
  }
});

function setMenuOpen(open, restoreFocus = false) {
  nav.classList.toggle("show", open);
  nav.inert = !open;
  menu.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  if (open) requestAnimationFrame(() => {
    if (nav.classList.contains("show")) closeButton.focus();
  });
  else if (restoreFocus) menu.focus();
}

menu.addEventListener("click", () => setMenuOpen(true));
closeButton.addEventListener("click", () => setMenuOpen(false, true));
navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false, true));
});

document.addEventListener("keydown", (event) => {
  if (!nav.classList.contains("show")) return;
  if (event.key === "Escape") {
    setMenuOpen(false, true);
    return;
  }
  if (event.key !== "Tab") return;
  const links = [...nav.querySelectorAll("button, a[href]")];
  const first = links[0];
  const last = links[links.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.matchMedia("(min-width: 1025px)").addEventListener("change", (event) => {
  if (event.matches) setMenuOpen(false);
});

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const name = fields.get("name").trim();
  const email = fields.get("email").trim();
  const message = fields.get("message").trim();
  if (!name || !message) {
    contactStatus.textContent = "Please enter your name and message.";
    return;
  }
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.open(`mailto:priyadharshan.exe@gmail.com?subject=${subject}&body=${body}`, "_self");
  contactStatus.textContent = "Your email draft is ready in your email app. Send it there to get in touch.";
});
