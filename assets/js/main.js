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
    35: "",
    75: "",
    150: "",
  },
  monthly: {
    any: "",
    35: "",
    75: "",
    150: "",
  },
};

/* ---------- Mobile navigation ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
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
  let amount = 75;

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
