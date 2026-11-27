const form = document.querySelector("#join-form");
const feedback = document.querySelector("#form-feedback");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

document.querySelector("#current-year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

const validators = {
  name(value) {
    return value.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters).";
  },
  email(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.";
  },
  department(value) {
    return value ? "" : "Please choose your department.";
  },
  year(value) {
    return value ? "" : "Please choose your year of study.";
  }
};

function validateField(field) {
  const error = validators[field.name](field.value);
  const errorElement = document.querySelector(`#${field.name}-error`);
  errorElement.textContent = error;
  field.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input, select")];
    const isValid = fields.map(validateField).every(Boolean);

    feedback.className = "form-feedback";
    if (!isValid) {
      feedback.textContent = "A couple of details need your attention.";
      feedback.classList.add("error");
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    feedback.textContent = "Thanks for signing up! We’ll be in touch with meetup details.";
    feedback.classList.add("success");
    form.reset();
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
  });

  form.querySelectorAll("input, select").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });
}
