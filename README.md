# GTA Dryer Vent Guide — launch notes

This is a complete static HTML/CSS/JavaScript lead-generation site for a transparent dryer vent cleaning referral model in Toronto and the GTA.

## Preview locally

From this folder:

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Open `http://127.0.0.1:4174/`.

## Live domain

The production domain is `https://gtadryerventguide.ca/`. Canonical tags, structured data, the sitemap, robots file and internal paths are configured for that domain. The `www` variant should point to `stoptimizerapp.github.io` and redirect to the apex domain through GitHub Pages.

## Form setup

The quote form is Netlify Forms-compatible and includes:

- honeypot spam field;
- required Canadian postal-code format;
- required referral-consent checkbox;
- explicit statement that the site does not perform the work;
- thank-you page;
- local preview behaviour in `script.js`.

Before launch:

1. Deploy to a Netlify site or adapt the form to your chosen host/CRM.
2. Submit a real test and confirm it appears in the form dashboard.
3. Configure a monitored notification address.
4. Route the request only to a provider that has agreed to receive it.
5. Define response time, service area, excluded jobs and lead-data deletion rules in the partner agreement.
6. Test the consent and privacy workflow again after adding analytics or call tracking.

GitHub Pages is static and does not process form submissions. While hosted there, `script.js` keeps the form in a safe “not connected yet” mode instead of sending data to a dead endpoint. Connect Formspree, Basin, a serverless function or another secure form service before accepting live requests.

## Required launch edits

- Register the domain and activate `hello@` and `privacy@` mailboxes.
- Put the final legal business identity and contact details into the Privacy Policy and Terms.
- Have those policies reviewed for the actual company, hosting, analytics, CRM and provider agreement.
- Confirm a legitimate provider partner and the process for checking its insurance and capabilities.
- Do not add a fake address, fake phone, fake reviews, fake certifications or `LocalBusiness` schema.
- Do not create a Google Business Profile for this referral site. A real provider may manage its own eligible profile.

## Deployment and indexing

1. Deploy over HTTPS and connect the final domain.
2. Verify Google Search Console using the DNS-domain method.
3. Submit `https://gtadryerventguide.ca/sitemap.xml`.
4. Inspect the homepage and core city/service URLs in Search Console.
5. Add privacy-respecting analytics only if it will drive decisions; update consent disclosures first.
6. Monitor valid form submissions and provider-confirmed qualified leads separately.

## Files

- `index.html`: Toronto/GTA landing page and lead form
- `areas/`: unique Mississauga, Oakville, Vaughan and Brampton pages
- `services/`: condo cleaning and vent repair pages
- `guides/`: cost, frequency and warning-sign articles
- `styles.css` and `script.js`: responsive UI and interactions
- `sitemap.xml`, `robots.txt`, `_headers`: technical SEO and security basics
- `SEO-RESEARCH.md`: keyword snapshot, page map and authority plan

No website can guarantee first-page rankings. This build removes common on-page and technical obstacles; ranking will still depend on the final domain, indexing, genuinely useful updates, earned local links, competition and time.
