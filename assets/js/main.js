/* ============================================================
   Amplify Schools - site scripts
   ============================================================ */

/* Donations: the Donate button on donate.html is a plain link to our
   Stripe donation page, so it needs no script. See README.md. */

/* ------------------------------------------------------------
   SCHOOL REGISTRATION FORM SETUP
   ------------------------------------------------------------
   The application form posts to a hosted form service, so no
   backend is needed. Recommended: Formspree (formspree.io).
   1. Create a free Formspree account and a new form.
   2. Paste its endpoint below, e.g. "https://formspree.io/f/abcdwxyz".
   Web3Forms or any service accepting a JSON POST also works.
   Until this is set, applicants are shown an email fallback.
------------------------------------------------------------ */
const REGISTER_FORM_ENDPOINT = "https://formspree.io/f/xeajdyel";
// The contact form reuses the same Formspree form by default; submissions
// are distinguished by their subject line. To route contact messages to a
// separate Formspree form instead, paste its endpoint here.
const CONTACT_FORM_ENDPOINT = REGISTER_FORM_ENDPOINT;
const CONTACT_EMAIL = "backstage@amplifyschools.org"; // fallback shown if an endpoint is not set

/* ---------- Mobile navigation ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  // close the mobile menu when a navigation link is chosen
  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- Scroll reveal ---------- */
/* CSS only hides .reveal elements when html.js is set and the user
   allows motion, so this stays purely progressive enhancement. */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && !reduceMotion.matches && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ---------- Footer year ---------- */
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* ---------- Copy bank details (donate.html only) ---------- */
document.querySelectorAll(".copy-btn").forEach((btn) => {
  const label = btn.querySelector(".copy-label");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      label.textContent = "Copied";
    } catch {
      label.textContent = "Copy failed";
    }
    setTimeout(() => { label.textContent = "Copy"; }, 2000);
  });
});

/* ---------- Hosted forms (register.html and contact.html) ---------- */
function wireHostedForm({ formId, submitId, alertId, successId, endpoint, sendingLabel, mailtoSubject }) {
  const form = document.getElementById(formId);
  if (!form) return;
  const submitBtn = document.getElementById(submitId);
  const alertBox = document.getElementById(alertId);
  const successBox = document.getElementById(successId);
  const idleLabel = submitBtn.textContent.trim();

  function showAlert(html) {
    alertBox.innerHTML = html;
    alertBox.classList.add("show");
    alertBox.scrollIntoView({ block: "nearest" });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    alertBox.classList.remove("show");

    if (!form.reportValidity()) return;
    // honeypot filled = bot; pretend success without sending
    if (form.elements.website && form.elements.website.value) {
      form.hidden = true;
      successBox.hidden = false;
      return;
    }

    if (!endpoint) {
      // No endpoint configured: build a pre-filled email from the fields.
      const lines = [];
      for (const el of form.elements) {
        if (!el.name || el.name === "website" || el.name.startsWith("_") || el.type === "hidden") continue;
        if (el.type === "checkbox") lines.push(`${el.name}: ${el.checked ? "yes" : "no"}`);
        else if (el.value) lines.push(`${el.name}: ${el.value}`);
      }
      const subject = encodeURIComponent(mailtoSubject);
      const body = encodeURIComponent(lines.join("\n"));
      showAlert(
        `This form is still being set up. Please email us instead: ` +
        `<a href="mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}">send it with one click</a> ` +
        `or write to ${CONTACT_EMAIL}.`
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = sendingLabel;
    try {
      const formData = new FormData(form);
      formData.delete("website");
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.hidden = true;
      successBox.hidden = false;
      successBox.scrollIntoView({ block: "center" });
    } catch (err) {
      showAlert(
        `Something went wrong sending your message. Please try again, ` +
        `or email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = idleLabel;
    }
  });
}

wireHostedForm({
  formId: "register-form",
  submitId: "register-submit",
  alertId: "register-alert",
  successId: "register-success",
  endpoint: REGISTER_FORM_ENDPOINT,
  sendingLabel: "Sending application...",
  mailtoSubject: "School application",
});

wireHostedForm({
  formId: "contact-form",
  submitId: "contact-submit",
  alertId: "contact-alert",
  successId: "contact-success",
  endpoint: CONTACT_FORM_ENDPOINT,
  sendingLabel: "Sending message...",
  mailtoSubject: "Website enquiry",
});
