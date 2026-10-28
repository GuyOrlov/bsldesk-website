# BSLDesk — software MVP handoff to Lovable

**Source:** BSLDesk — Simple Business Plan and Brand Options — October 2026. This handoff deliberately excludes real patient data from the prototype.

## Suggested prompt for Lovable

> Build a responsive, accessible multi-tenant SaaS called BSLDesk. Agencies pay a proposed £99/month for appointment-readiness and BSL interpreter booking coordination software. The product serves four roles: agency owner, agency coordinator, authorised client receptionist/secretary, and interpreter. Implement a secure organisation invitation and role-based workspace. Client staff can create minimal-authorised BSL interpreter requests, view status and receive updates. Agency coordinators can review requests, select their approved provider(s), offer assignments to interpreters, re-offer declined assignments, confirm coverage, assign a named next-action owner, record changes/cancellations, and close requests with outcomes. Interpreters see only assignment offers specifically addressed to their account and can accept/decline. Build a dashboard for Requested / Awaiting confirmation / Confirmed / Changed / Cancelled, with words not colour alone. Include activity audit history and simple reports. Use fictional data for the prototype. Do not add clinical advice, BSL automatic translation or an unapproved automatic routing rule. Interpreter fees are not billed by BSLDesk. Separate each agency tenant and client organisation with robust row-level security. Before real information is added, require data-protection assessment and an independent technical security review. Keep UX keyboard-friendly, caption-friendly and readable on mobile.

## Minimum tables / key fields (schema concept)

- organisations: `id`, `name`, `type` ('agency'|'client'), `status`.
- memberships: `user_id`, `organisation_id`, `role`, `is_active`.
- client_agency_relationships: `client_org_id`, `agency_org_id`, `approval_status`.
- requests: `id`, `requesting_client_org_id`, `agency_org_id`, `requested_by`, `appointment_start`, `duration_minutes`, `mode`, `general_location`, `communication_requirements`, `status`, `next_action_owner`, `created_at`, `updated_at`.
- interpreter_profiles: `user_id`, `registration_status`, `skills`, `availability_preferences` (avoid holding excessive data).
- offers: `id`, `request_id`, `interpreter_id`, `status`, `sent_at`, `responded_at`.
- activity_events: `id`, `request_id`, `actor_id`, `event_type`, `before`, `after`, `timestamp`.
- notification_preferences: `user_id`, `event_types`, `delivery_method`.

For the initial user test, avoid personally identifiable patient fields entirely. Even minimal appointment information can become sensitive when associated with real individuals or a clinical setting. In production decide the exact fields, retention rules and lawful basis with participating organisations.

## Security and operational gates before live pilots

- Authenticate all users; invite-only client and interpreter accounts. No public sign-up to a real booking workspace.
- Define each agency/client data boundary and database-level row level security (RLS); independently test cross-tenant access.
- Encrypt data in transit and at rest; handle backups, recovery and deletion.
- Create audit logs, authorised status transitions and duplicate-request safeguards.
- Restrict notification emails to minimum data; no patient details in subject lines.
- Add a manual escalation route for urgent arrangements and a retry strategy for failed reminders.
- Arrange a formal DPIA/data processing agreement and appropriate supplier assurance before personal data.
- For an NHS deployment, the partner organisation must assess procurement, relevant clinical-safety, DTAC and DSPT requirements; do not imply certification or NHS endorsement.

## Success tests from the plan

- First: 5 agency/service managers and 5 reception/secretary interviews.
- Target: 2 external agency pilots after testing with cSeeker.
- Measure: time chasing, number of unconfirmed requests, status accuracy, booking errors, support hours and actual willingness to pay £99/month.
- Experiment target: 25% less chasing with no increase in booking errors. This is a target to test, not a performance claim.