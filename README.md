# BSLDesk — GitHub Pages website + interactive product preview

**Status:** Discovery-stage marketing website and fictional-data demonstration, prepared 28 October 2026 from the BSLDesk Simple Business Plan (27 October 2026).

This is **not a live interpreter booking application**. There is **no authentication, database, patient information, online payment or sending of booking requests**. Demo status changes exist in browser memory only and reset on refresh.

## Files

- `index.html` — public single-page website, SEO text and accessible demo markup.
- `styles.css` — responsive styling for mobile, desktop and reduced-motion preference.
- `app.js` — fictional in-memory sample requests, role switcher, filter and editable statuses.
- `favicon.svg` — BSLDesk logo mark.
- `.nojekyll` — allows straightforward GitHub Pages publishing.
- `LOVABLE_HANDOFF.md` — the next-stage software blueprint and Lovable prompt.

## Publish on GitHub Pages (no coding required)

1. Sign in at GitHub and create a **new public repository** called `bsldesk-website`. (Repository must be public for GitHub Pages on a GitHub Free account.)
2. Upload the contents of this folder to the **root of the repository** (not an additional enclosing folder). Commit to the `main` branch.
3. Open **Settings → Pages → Build and deployment → Deploy from a branch**. Choose `main` and `/ (root)`, then save.
4. When GitHub finishes publishing, the typical project URL is `https://<your-github-username>.github.io/bsldesk-website/`. Check your actual Pages settings for the live link.
5. Only after you have confirmed ownership of the name and domain, set a custom domain in Pages and configure DNS in your domain registrar.

The public website does not yet have a connected analytics service, contact form or booking backend. The call to action opens an email to `bookings@cseeker.co.uk`, with subject `BSLDesk agency pilot enquiry`, so an agency can ask about a test. Change that address in `index.html` before launch if you want a dedicated BSLDesk mailbox.

## Design and content decisions

- Target: interpreting agency operators; clients include receptionists and secretaries; interpreters participate without a software subscription.
- **£99/agency/month** is an *unvalidated proposed pilot price*, not a real live offer.
- The demo communicates five statuses with labels, not colour alone: Requested, Awaiting confirmation, Confirmed, Changed, Cancelled.
- Every demo record is fictional, has no patient name and never leaves the browser.
- BSLDesk is a **working product name**; check UK company/trademark conflicts and domain availability before branding the live business.
- Do not infer NHS endorsement; any NHS patient-data deployment would be a separate regulated/procurement/security workstream.
- The landing page uses Google Fonts as a design enhancement; system fonts are used when unavailable.

## Quality assurance before real launch

- Confirm product name, trade mark and domain; publish adequate privacy and cookie information for the real deployment and analytics configuration.
- Replace the pilot email mailbox if preferred; test the contact workflow.
- Test keyboard-only navigation, mobile breakpoints and actual BSL-user accessibility feedback.
- Check page titles, structured information, Search Console and analytics after publication.
- Do not use GitHub Pages for secret API keys, private booking details, patient information or authentication credentials.

## Upgrade path

1. Use this site to interview five agency/service managers and five reception/secretary staff, using the story in the business plan.
2. Show the fictional demo; observe whether the status view meaningfully improves their workflow.
3. Build the actual multi-tenant SaaS in Lovable, with owned backend such as Supabase if suitable, **separately from this GitHub Pages project**.
4. In Lovable, connect GitHub **from the Lovable project** to create a new synced software repository. Git sync does not connect an already existing repository.
5. Keep `bsldesk-website` for marketing and SEO. Link its 'Log in' button later to the deployed software URL after security review.