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

## Registered Charity Tick (ACNC)

Amplify Schools is registered with the ACNC (Australian Charities and Not-for-profits Commission), so the site shows the Registered Charity Tick:

- **Every page footer**, under the tagline.
- **The donate page**, at the bottom of the donation card, with a one-line "registered charity" note.

Both link to the charity's entry on the ACNC Charity Register, as the ACNC expects whenever the Tick is used online.

The files are the official ACNC artwork, cropped to the circle and saved as lossless WebP (264px square, three times the largest display size):

- `assets/img/acnc-charity-tick.webp`: full colour, for light backgrounds.
- `assets/img/acnc-charity-tick-dark.webp`: white (reversed), swapped in automatically in dark mode.

The black (mono) version from the ACNC pack is for single-colour print, so the site doesn't use it.

Rules from the ACNC's Registered Charity Tick style guide and terms of use:

- Don't recolour, redraw, stretch or add effects to the Tick.
- Keep it at least 15mm wide (about 57px on screen) with 5mm (about 19px) of clear space around it.
- Link it to the charity's Charity Register listing.
- Only use it while Amplify Schools stays registered.

Charity registration is separate from DGR (Deductible Gift Recipient) endorsement by the ATO. Keep the "not tax deductible" wording on the donate page until DGR status is granted.

## Structure

```
index.html          Homepage (hero, mission, programs, tiers, impact, team, CTA)
donate.html         Donate page (donation widget, other ways to give, FAQ)
register.html       School registration (application form + eligibility)
assets/css/styles.css   All styling (light + dark mode, responsive)
assets/js/main.js       Navigation, donation widget, registration form,
                        PAYMENT_LINKS and REGISTER_FORM_ENDPOINT config
assets/img/             Logo, photos (from the site's image collection) and
                        the ACNC Registered Charity Tick
assets/fonts/           Self-hosted fonts (Archivo + Public Sans)
assets/icons.svg        Icon sprite (Phosphor Icons, MIT licence)
```

## School registration form

`register.html` collects: school name, contact name, email, phone, instruments needed, and an authority confirmation. Because the site is static, the form posts to a hosted form service:

1. Create a free account at [formspree.io](https://formspree.io) and add a new form (free tier is 50 submissions/month; Web3Forms is a free alternative).
2. Copy the form endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `REGISTER_FORM_ENDPOINT` at the top of `assets/js/main.js`.

Submissions then arrive in your email inbox. Until the endpoint is set, applicants are shown a one-click email fallback instead, so nothing is broken in the meantime. A hidden honeypot field filters basic spam bots.

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
5. **Contact email and social links** in the footer. The ABN and the Registered Charity Tick are already in place.
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

Before actively fundraising, check your state's charitable fundraising licence requirements. Amplify Schools is registered with the ACNC, and every page footer shows the ABN and the Registered Charity Tick; donors look for them.

## Publishing

**Live site** (`https://amplifyschools.org`): Hostinger, Cloud Startup plan. Hostinger's Git deployment (hPanel → amplifyschools.org → Advanced → GIT) is connected to this repository's `main` branch with auto-deploy on, so every push to `main` goes live in about a minute. It deploys into `public_html` and replaces whatever is there, so server settings live in the repository:

- `.htaccess` sends `http://` and `www.` to `https://amplifyschools.org/` with a 301.
- `CNAME` sets the GitHub Pages custom domain to `amplifyschools.org`, so the GitHub Pages copy redirects to the real site.

**GitHub Pages** also builds `main`. DNS points at Hostinger, not GitHub, so Pages only redirects to amplifyschools.org.

## Search engines (SEO)

The site's preferred address is `https://amplifyschools.org/` (no www). It's written into:

- the `<link rel="canonical">` and `og:url` tags on every page
- the structured data (JSON-LD) on the homepage, which tells Google that Amplify Schools is a charity and this is its website
- `sitemap.xml` and `robots.txt`

If the site ever moves to `www.amplifyschools.org`, find and replace `https://amplifyschools.org/` in those files. When you add a page, give it its own canonical tag and add it to `sitemap.xml`.

The favicon files (`favicon.ico` with 16, 32 and 48px sizes, `favicon.svg`, and `apple-touch-icon.png` for iPhone home screens) sit in the site root and are linked from every page. Google only shows a favicon that's a real file, so don't switch back to an inline `data:` icon.

`https://bigmcguin.github.io/AmplifySchools-/` (GitHub Pages) redirects to amplifyschools.org because of the `CNAME` file, and the canonical tags point there too, so there's only one version for Google to index.

To keep an eye on rankings:

1. Verify `amplifyschools.org` in [Google Search Console](https://search.google.com/search-console) as a Domain property (it gives you a TXT record to add to your DNS).
2. Submit `https://amplifyschools.org/sitemap.xml` under **Sitemaps**.
3. Use **URL Inspection** on the homepage to see whether it's indexed and which canonical Google chose, then click **Request indexing**.
4. Check **Pages** for anything excluded, and **Security & Manual actions** for problems.
5. Make sure the charity's ACNC Charity Register listing shows the website address, and ask partner schools to link to the site. Links from trusted sites help the most.

## Credits

- Fonts: [Outfit](https://fonts.google.com/specimen/Outfit) and [Public Sans](https://fonts.google.com/specimen/Public+Sans) (OFL), self-hosted via Fontsource.
- Icons: [Phosphor Icons](https://phosphoricons.com/) (MIT).
- Registered Charity Tick: supplied by the [ACNC](https://www.acnc.gov.au/) to registered charities and used under its terms of use.
