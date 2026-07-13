# Amplify Schools website

A fast, public-focused website for [amplifyschools.org](https://amplifyschools.org): a homepage that tells the story, and a donate page ready to take one-off and monthly donations.

No build step, no framework. Plain HTML, CSS and JavaScript, so it can be hosted anywhere (GitHub Pages, Netlify, Cloudflare Pages) for free.

## Structure

```
index.html          Homepage (hero, mission, programs, donation tiers, quote, CTA)
donate.html         Donate page (donation widget, other ways to give, FAQ)
assets/css/styles.css   All styling (light + dark mode, responsive)
assets/js/main.js       Navigation, donation widget, PAYMENT_LINKS config
assets/fonts/           Self-hosted fonts (Outfit + Public Sans)
assets/icons.svg        Icon sprite (Phosphor Icons, MIT licence)
```

## Previewing locally

Because the icons load from a separate file, open the site through a local server rather than double-clicking the HTML file:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Content to replace before launch

Search both HTML files for `EDIT ME` and `TODO` comments. In particular:

1. **Photos**: the images are placeholders from picsum.photos. Replace them with real photos of your school communities (with permission). Drop files into `assets/img/` and update the `<img src>` paths.
2. **Mission copy** in the "Why we exist" section.
3. **Programs**: names, descriptions and photos of what you actually run.
4. **Donation tiers**: the $35 / $75 / $150 amounts and what they fund.
5. **Quote**: a real quote from a school leader, teacher or family, with their name.
6. **Bank transfer details** on the donate page (BSB, account number).
7. **Contact email, social links, ABN and charity registration** in the footer.
8. **Tax deductibility FAQ**: confirm whether you have DGR (Deductible Gift Recipient) status with the ATO and update the answer. Only DGR-endorsed organisations can offer tax-deductible receipts in Australia.

## Taking donations: how to wire up payments

The donate button is already built. It reads hosted payment page URLs from `PAYMENT_LINKS` at the top of `assets/js/main.js`. Until you paste links in, donors are shown the bank transfer details instead, so nothing is broken in the meantime.

### Option A (recommended): Stripe Payment Links

No code and no monthly fee; Stripe takes about 1.7% + $0.30 per domestic card transaction. Supports Apple Pay, Google Pay and recurring monthly donations, and emails receipts automatically.

1. Create an account at [stripe.com/au](https://stripe.com/au) (registered charities can apply for discounted nonprofit pricing via Stripe support).
2. In the dashboard, go to **Payment Links → New**.
3. Create links for each preset ($35, $75, $150), one set as one-off and one set as a monthly recurring price. Also create one "Customers choose what to pay" link per frequency for custom amounts.
4. Paste the URLs into `PAYMENT_LINKS` in `assets/js/main.js`.

### Option B: PayPal Donations

Set up at [paypal.com/au/non-profit](https://www.paypal.com/au/non-profit) and paste your hosted donate URL into the `any` fields. Confirmed charities pay a discounted rate. Familiar to many donors, but the checkout experience is weaker than Stripe's.

### Option C: Australian fundraising platforms

If you want donor management, appeals and tax receipts handled for you:

- **GiveNow** (givenow.com.au): low flat fee, built for Australian community groups.
- **Raisely** (raisely.com): free platform (donors cover processing fees), great for campaigns and peer-to-peer fundraising.
- **Grassrootz** (grassrootz.com): popular for events and appeals.

All of these give you a hosted donation page URL: paste it into the `any` fields in `PAYMENT_LINKS` and the donate button will send people there.

### A note on compliance

Before actively fundraising, check your state's charitable fundraising licence requirements and register with the ACNC if you haven't already. Add your ABN and registration details to the footer; donors look for them.

## Publishing

**GitHub Pages** (free): repository Settings → Pages → deploy from the `main` branch, root folder. Then point the `amplifyschools.org` DNS at GitHub Pages and add the domain in the Pages settings (a `CNAME` file will be created automatically).

**Netlify / Cloudflare Pages** (free): connect the repository, no build command needed, publish directory is the repository root.

## Credits

- Fonts: [Outfit](https://fonts.google.com/specimen/Outfit) and [Public Sans](https://fonts.google.com/specimen/Public+Sans) (OFL), self-hosted via Fontsource.
- Icons: [Phosphor Icons](https://phosphoricons.com/) (MIT).
