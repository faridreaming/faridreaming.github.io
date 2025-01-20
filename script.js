const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const sender = contactForm.querySelector("#sender").value.trim();
  const email = contactForm.querySelector("#email").value.trim();
  const message = contactForm.querySelector("#message").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  const finalMessage = `${sender} (${email}):\n${message.replace(/\n/g, "\n")}`;
  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/6283802598364?text=${encodedMessage}`;
  document.location.href = whatsappUrl;
});
function isTopOfElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.top <= 0.5 * window.innerHeight;
}
let sectionLocation = "home";
const menuItems = {
  home: "abbr[title='Home'] a",
  about: "abbr[title='About'] a",
  skills: "abbr[title='Skills'] a",
  projects: "abbr[title='Projects'] a",
  certifications: "abbr[title='Certifications'] a",
  contact: "abbr[title='Contact'] a",
};
const navbar = document.querySelector("header nav");
let deviceWidth = window.innerWidth;
let navbarHeight = 0;
if (deviceWidth < 1020) {
  navbar.style.bottom = "-66px";
  navbarHeight = 66;
} else if (deviceWidth < 561) {
  navbar.style.bottom = "-58px";
  navbarHeight = 58;
} else {
  navbar.style.bottom = "0px";
  navbarHeight = 0;
}
window.addEventListener("resize", function () {
  deviceWidth = window.innerWidth;
  if (deviceWidth < 1020) {
    navbarHeight = 66;
  } else if (deviceWidth < 561) {
    navbarHeight = 58;
  } else {
    navbarHeight = 0;
  }
});
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("main .container");
  let isAtHome = window.scrollY < navbarHeight / 2;

  if (isAtHome) {
    navbar.style.bottom = `-${navbarHeight + 1}px`;
  } else {
    navbar.style.bottom = "0";
  }
  sections.forEach((section) => {
    if (isTopOfElementInViewport(section)) {
      sectionLocation = section.id.trim();
      for (const item in menuItems) {
        const menuItem = document.querySelector(menuItems[item]);
        if (item === sectionLocation) {
          menuItem.classList.add("active");
        } else {
          menuItem.classList.remove("active");
        }
      }
    }
  });
});
const toggleDarkMode = document.getElementById("toggle-dark-mode");
function setDarkMode(isDarkMode) {
  localStorage.setItem("dark-mode", isDarkMode);
  if (isDarkMode) {
    document.body.classList.add("dark");
    toggleDarkMode.innerText = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    toggleDarkMode.innerText = "Dark Mode";
  }
}
toggleDarkMode.addEventListener("click", () => {
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  setDarkMode(!isDarkMode);
});
document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  setDarkMode(isDarkMode);
});
document.getElementById("copyright-year").innerText = new Date().getFullYear();
