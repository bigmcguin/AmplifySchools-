/* ============================================================
   Amplify Schools - site scripts
   ============================================================ */

/* ------------------------------------------------------------
   PAYMENT SETUP
   ------------------------------------------------------------
   The donate button opens a hosted payment page, so no card
   details ever touch this site and no backend is needed.

   Recommended: Stripe Payment Links (https://stripe.com/au/payments/payment-links)
   1. Create a Stripe account and add "Amplify Schools" branding.
   2. Create one Payment Link per option below. For "monthly",
      create the link with a recurring price. For links where the
      donor chooses the amount, use "Customers choose what to pay".
   3. Paste each URL below. Any option left empty falls back to
      the frequency-level "any" link; if that is empty too, the
      donor sees the bank transfer fallback message.

   PayPal Donations or an Australian platform (GiveNow, Raisely,
   Grassrootz) also work here: just paste the hosted URL.
------------------------------------------------------------ */
const PAYMENT_LINKS = {
  once: {
    // "any" = a link where the donor chooses their own amount
    any: "",
    40: "",
    150: "",
    500: "",
  },
  monthly: {
    any: "",
    40: "",
    150: "",
    500: "",
  },
};

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
const REGISTER_FORM_ENDPOINT = "";
const CONTACT_EMAIL = "hello@amplifyschools.org"; // fallback shown if the endpoint is not set

/* ---------- Mobile navigation ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
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

/* ---------- Donation widget (donate.html only) ---------- */
const donateBtn = document.getElementById("donate-btn");
if (donateBtn) {
  const freqButtons = document.querySelectorAll(".freq-toggle button");
  const amountButtons = document.querySelectorAll(".amount-grid button");
  const customInput = document.getElementById("custom-amount");
  const alertBox = document.getElementById("donate-alert");

  let frequency = "once";
  let amount = 150;

  const labels = { once: "Donate", monthly: "Donate monthly" };

  function updateButtonLabel() {
    const amt = amount ? ` A$${amount}` : "";
    donateBtn.textContent = `${labels[frequency]}${amt}`;
  }

  freqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      frequency = btn.dataset.freq;
      freqButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      updateButtonLabel();
    });
  });

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      amount = Number(btn.dataset.amount);
      amountButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      if (customInput) customInput.value = "";
      updateButtonLabel();
    });
  });

  if (customInput) {
    customInput.addEventListener("input", () => {
      const value = Math.floor(Number(customInput.value));
      if (value >= 1) {
        amount = value;
        amountButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      }
      updateButtonLabel();
    });
  }

  donateBtn.addEventListener("click", () => {
    const links = PAYMENT_LINKS[frequency] || {};
    const url = links[amount] || links.any;
    if (url) {
      window.open(url, "_blank", "noopener");
    } else if (alertBox) {
      // Payment links not configured yet: point donors at bank transfer.
      alertBox.classList.add("show");
      alertBox.scrollIntoView({ block: "nearest" });
    }
  });

  updateButtonLabel();
}

/* ---------- School registration form (register.html only) ---------- */
const registerForm = document.getElementById("register-form");
if (registerForm) {
  const submitBtn = document.getElementById("register-submit");
  const alertBox = document.getElementById("register-alert");
  const successBox = document.getElementById("register-success");

  function showAlert(html) {
    alertBox.innerHTML = html;
    alertBox.classList.add("show");
    alertBox.scrollIntoView({ block: "nearest" });
  }

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    alertBox.classList.remove("show");

    if (!registerForm.reportValidity()) return;
    // honeypot filled = bot; pretend success without sending
    if (registerForm.elements.website.value) {
      registerForm.hidden = true;
      successBox.hidden = false;
      return;
    }

    if (!REGISTER_FORM_ENDPOINT) {
      const data = registerForm.elements;
      const body = encodeURIComponent(
        `School name: ${data.school_name.value}\n` +
        `Contact name: ${data.contact_name.value}\n` +
        `Email: ${data.email.value}\n` +
        `Phone: ${data.phone.value}\n` +
        `Instruments needed: ${data.instruments.value}\n` +
        `Authority confirmed: yes`
      );
      const subject = encodeURIComponent(`School application: ${data.school_name.value}`);
      showAlert(
        `Online applications are still being set up. Please email your application instead: ` +
        `<a href="mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}">send it with one click</a> ` +
        `or write to ${CONTACT_EMAIL}.`
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending application...";
    try {
      const formData = new FormData(registerForm);
      formData.delete("website");
      const res = await fetch(REGISTER_FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      registerForm.hidden = true;
      successBox.hidden = false;
      successBox.scrollIntoView({ block: "center" });
    } catch (err) {
      showAlert(
        `Something went wrong sending your application. Please try again, ` +
        `or email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit application";
    }
  });
}
