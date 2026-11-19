# Amplify Schools website

Source for [amplifyschools.org](https://amplifyschools.org), the website of **Amplify Schools Incorporated**: an Australian registered charity ([ACNC Charity Register listing](https://www.acnc.gov.au/charity/charities/515e9afa-9e64-f111-a826-6045bde523ce/profile), ABN 32 761 982 262) that refurbishes donated rock instruments and gives them to school music programs.

To donate, register a school or get in touch, visit **[amplifyschools.org](https://amplifyschools.org)**.

The site is plain HTML, CSS and JavaScript, with no build step or framework.

## Brand

Colours are taken from the Amplify Schools logo:

- **Navy `#1c3e66`**: structural (headings, hero scrim, CTA band, wordmark top line)
- **Teal `#0b7488`**: the single interactive accent (buttons, links, selected states, highlights)

Both are defined as CSS variables at the top of `assets/css/styles.css`, with dark mode equivalents. Display type is Archivo in heavy italic, echoing the logo's wordmark.

The header and footer show the official logo: `assets/img/logo.svg`, with `assets/img/logo-dark.svg` swapped in for dark mode.

When you change `styles.css` or `main.js`, bump the `?v=` number on their links in every HTML file so browsers and CDNs fetch the new version.

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

Charity registration (ACNC) is separate from DGR (Deductible Gift Recipient) endorsement by the ATO. Amplify Schools has both, so the donate page says donations are tax deductible.

## Structure

```
index.html          Homepage (hero, mission, programs, tiers, impact, team, CTA)
donate.html         Donate page (donation widget, other ways to give, FAQ)
register.html       School registration (application form + eligibility)
contact.html        Contact page (general enquiry form)
assets/css/styles.css   All styling (light + dark mode, responsive)
assets/js/main.js       Navigation, donation options, copy buttons,
                        registration and contact forms,
                        REGISTER_FORM_ENDPOINT config
assets/img/             Logo, photos (from the site's image collection),
                        the ACNC Registered Charity Tick and the donation
                        QR code (donate-qr.svg)
assets/fonts/           Self-hosted fonts (Archivo + Public Sans)
assets/icons.svg        Icon sprite (Phosphor Icons, MIT licence)
favicon.ico, favicon.svg, apple-touch-icon.png   Site icons
robots.txt, sitemap.xml                          For search engines
.htaccess, CNAME                                 Server settings (see Publishing)
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

## Content to keep up to date

Notes for whoever edits the site are marked with `EDIT ME` comments in the HTML. In particular:

1. **Donation tiers**: keep the $40 / $150 / $500 amounts and descriptions in line with real refurbishment costs.
2. **Mission copy** in the "Why we exist" section: keep it in line with the charity's official wording.
3. **Social links**: Instagram ([@amplifyschools](https://www.instagram.com/amplifyschools/)) and [LinkedIn](https://www.linkedin.com/company/amplify-schools/) are in every page footer and in `sameAs` in the homepage JSON-LD. Add any new profiles in both places.
4. **Tax deductibility**: Amplify Schools has DGR (Deductible Gift Recipient) status, and the "Is my donation tax deductible?" FAQ on the donate page says so. Gifts of money are only deductible from $2, so keep the minimum on the Stripe donation link at $2 or more. Every tax receipt, including Stripe's emailed receipts, must show the organisation's name, its ABN and that the payment is a gift.
5. **Photo permissions**: make sure you have permission to publish each photo, especially images featuring school staff and students.

## Taking donations (Stripe)

Online donations go through Stripe Payment Links in Amplify Schools' Stripe account. Donors finish on Stripe's page, so card details never touch this site and there's no backend.

Stripe can't receive an amount picked on this site, so every amount has its own link:

| Donate card button | Stripe link |
| --- | --- |
| One-off $40 | `https://buy.stripe.com/28E5kDds56sXgnY0145os01` |
| One-off $150 (selected by default) | `https://buy.stripe.com/aFa14ngEh5oT0p0eVY5os02` |
| One-off $500 | `https://buy.stripe.com/cNi28r73H6sX7RscNQ5os03` |
| One-off Other (donor types the amount on Stripe) | `https://donate.stripe.com/9B66oH0Fj6sX7RsaFI5os00` |
| Monthly $20 (selected by default) | `https://buy.stripe.com/5kQ6oH1Jn18D3Bcg025os04` |
| Monthly $50 | `https://buy.stripe.com/eVqaEXco15oT0p029c5os05` |

- Each amount button in `donate.html` holds its link in `data-link`. The script in `main.js` points the **Donate** button at the chosen one, so to change an amount, edit the button's text and its `data-link`. To add one, copy a button.
- The "Other" link is also the **Donate** button's `href` (used if JavaScript doesn't run) and the QR code under the button (`assets/img/donate-qr.svg`), for people on a computer who'd rather pay on their phone. The QR code is navy on white to match the site, and hidden on phones and tablets.
- Stripe's "Customers choose what to pay" links can't be monthly, so monthly gifts have fixed amounts only.

If the "Other" link changes, update it in all three places, then regenerate the QR code from the repository folder:

```bash
npx qrcode -t svg -e M -q 4 -d 1c3e66 -l ffffff -o assets/img/donate-qr.svg "NEW-LINK-HERE"
```

Check these in the Stripe dashboard, because the donate page relies on them. Most are set per link, so check every link:

- **Tax receipts.** Donors are told they get tax-deductible receipts by email. The ATO requires each receipt to show the organisation's name, its ABN and that the payment is a gift. Stripe's standard receipt email doesn't include the ABN or gift wording; one way is to turn on **Create an invoice PDF** under **After payment** on each one-off link, and put the ABN and gift wording in the invoice settings (monthly gifts get invoices automatically).
- **Product names** show on the payment page and the receipt, so use something like "Amplify Schools Charitable Donation".
- **$2 minimum** on the "Other" link. Gifts of money are only deductible from $2.
- **Payouts** go to the Amplify Schools Gift Fund account listed on the donate page, so card and bank donations end up in the same place.
- **Monthly donations** are cancelled or changed by Amplify Schools in the Stripe dashboard when a donor asks; the donate page FAQ tells donors to contact us.

### A note on compliance

Before actively fundraising, check your state's charitable fundraising licence requirements. Amplify Schools is registered with the ACNC, and every page footer shows the ABN and the Registered Charity Tick; donors look for them.

## Publishing

**Live site** (`https://amplifyschools.org`): Hostinger, Cloud Startup plan. Hostinger's Git deployment (hPanel → amplifyschools.org → Advanced → GIT) is connected to this repository's `main` branch with auto-deploy on, so every push to `main` goes live in about a minute. It deploys into `public_html` and replaces whatever is there, so server settings live in the repository:

- `.htaccess` sends `http://` and `www.` to `https://amplifyschools.org/` with a 301.
- `CNAME` sets the GitHub Pages custom domain to `amplifyschools.org`, so the GitHub Pages copy redirects to the real site.
- Because the deploy copies the whole repository, `.htaccess` also refuses files that aren't part of the website (`README.md`, `CNAME`, `.claude/` and `.git/`), so search engines can't index them.

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

Ranking for the name "Amplify Schools" is mostly decided off the site, because it competes with long-established names (Amplify Music Education, and the US company Amplify). The biggest levers are a Google Business Profile, social profiles that link to amplifyschools.org (add them to `sameAs` in the homepage JSON-LD), and links from schools, local media and charity directories that use the name "Amplify Schools".

## Credits

- Fonts: [Archivo](https://fonts.google.com/specimen/Archivo) and [Public Sans](https://fonts.google.com/specimen/Public+Sans) (OFL), self-hosted via Fontsource.
- Icons: [Phosphor Icons](https://phosphoricons.com/) (MIT).
- Registered Charity Tick: supplied by the [ACNC](https://www.acnc.gov.au/) to registered charities and used under its terms of use.
