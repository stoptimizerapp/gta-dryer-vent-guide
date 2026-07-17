# GTA Dryer Vent Guide — operating notes

This is a complete static HTML/CSS/JavaScript lead-generation site for a transparent dryer vent cleaning referral model in Toronto and the GTA.

## Preview locally

From this folder:

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Open `http://127.0.0.1:4174/`.

## Live domain

The production domain is `https://gtadryerventguide.ca/`. HTTPS, the apex domain and the `www` redirect are active through GitHub Pages. Canonical tags, structured data, the sitemap, robots file and internal paths use the production domain.

## Form setup

The homepage embeds the published Google Form named `GTA Dryer Vent Quote Request`. It collects contact information, service location, property and vent details, preferred timing, and explicit contact-sharing consent. The form does not require a Google sign-in, responses remain in the form owner’s Google account, and new-response email notifications are enabled.

Before routing production leads:

1. Submit a controlled test and confirm it appears in the Forms response dashboard and email notification flow.
2. Route a request only to a provider that has agreed to receive it.
3. Define response time, service area, excluded jobs and lead-data deletion rules in the partner agreement.
4. Review and delete old test or abandoned requests under the chosen retention policy.
5. Test the consent and privacy workflow again after adding analytics or call tracking.

## Remaining commercial activation tasks

- Test the live Google Form and its email notification flow with a controlled submission.
- Activate monitored `hello@` and `privacy@` mailboxes.
- Put the final legal business identity and contact details into the Privacy Policy and Terms.
- Have those policies reviewed for the actual company, hosting, analytics, CRM and provider agreement.
- Confirm a legitimate provider partner and the process for checking its insurance and capabilities.
- Verify the domain in Google Search Console and submit `/sitemap.xml`.
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

- `index.html`: Toronto/GTA landing page and embedded Google Form
- `areas/`: unique Mississauga, Oakville, Vaughan and Brampton pages
- `services/`: condo cleaning and vent repair pages
- `guides/`: cost, frequency and warning-sign articles
- `styles.css` and `script.js`: responsive UI and interactions
- `sitemap.xml`, `robots.txt`, `_headers`: technical SEO and security basics
- `SEO-RESEARCH.md`: keyword snapshot, page map and authority plan

No website can guarantee first-page rankings. This build removes common on-page and technical obstacles; ranking will still depend on the final domain, indexing, genuinely useful updates, earned local links, competition and time.
