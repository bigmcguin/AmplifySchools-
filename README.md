# Amplify Schools website

A fast, public-focused website for [amplifyschools.org](https://amplifyschools.org): a homepage that tells the story (refurbishing donated rock instruments and giving them to school music programs), and a donate page ready to take one-off and monthly donations, or instrument donations.

No build step, no framework. Plain HTML, CSS and JavaScript, so it can be hosted anywhere (GitHub Pages, Netlify, Cloudflare Pages) for free.

## Brand

Colours are taken from the Amplify Schools logo:

- **Navy `#1c3e66`**: structural (headings, hero scrim, CTA band, wordmark top line)
- **Teal `#0b7488`**: the single interactive accent (buttons, links, selected states, highlights)

Both are defined as CSS variables at the top of `assets/css/styles.css`, with dark mode equivalents. Display type is Archivo in heavy italic, echoing the logo's wordmark.

The header and footer use a brand lockup: a recreated guitar outline (`assets/img/logo-guitar.svg`, drawn to match the logo's gradient stroke style) next to a typographic wordmark (stacked AMPLIFY / SCHOOLS). To use the original logo artwork instead, save it as a transparent SVG or PNG and swap it into the `.brand` links in both HTML files.

When you change `styles.css` or `main.js`, bump the `?v=` number on their links in both HTML files so browsers and CDNs fetch the new version.

## Structure

```
index.html          Homepage (hero, mission, programs, tiers, impact, team, CTA)
donate.html         Donate page (donation widget, other ways to give, FAQ)
assets/css/styles.css   All styling (light + dark mode, responsive)
assets/js/main.js       Navigation, donation widget, PAYMENT_LINKS config
assets/img/             Logo and photos (from the site's image collection)
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

Search both HTML files for `EDIT ME` comments. In particular:

1. **Team roles**: the "Who we are" section shows Matthew, Vanessa and Hylton with a generic "Amplify Schools" line; replace it with each person's actual role.
2. **Donation tiers**: the $40 / $150 / $500 amounts and descriptions are sensible guesses; adjust them to your real refurbishment costs.
3. **Mission copy** in the "Why we exist" section: tune to your official wording.
4. **Bank transfer details** on the donate page (BSB, account number).
5. **Contact email, social links, ABN and charity registration** in the footer.
6. **Tax deductibility FAQ**: confirm whether you have DGR (Deductible Gift Recipient) status with the ATO and update the answer. Only DGR-endorsed organisations can offer tax-deductible receipts in Australia.
7. **Photo permissions**: the photos and testimonial names came from your uploaded image collection; double-check you have permission to publish each one, especially images featuring school staff and students.

## Taking donations: how to wire up payments

The donate button is already built. It reads hosted payment page URLs from `PAYMENT_LINKS` at the top of `assets/js/main.js`. Until you paste links in, donors are shown the bank transfer details instead, so nothing is broken in the meantime.

### Option A (recommended): Stripe Payment Links

No code and no monthly fee; Stripe takes about 1.7% + $0.30 per domestic card transaction. Supports Apple Pay, Google Pay and recurring monthly donations, and emails receipts automatically.

1. Create an account at [stripe.com/au](https://stripe.com/au) (registered charities can apply for discounted nonprofit pricing via Stripe support).
2. In the dashboard, go to **Payment Links → New**.
3. Create links for each preset ($40, $150, $500), one set as one-off and one set as a monthly recurring price. Also create one "Customers choose what to pay" link per frequency for custom amounts.
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
