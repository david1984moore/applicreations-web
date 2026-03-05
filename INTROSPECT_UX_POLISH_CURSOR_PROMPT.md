# INTROSPECT — UX POLISH & QUESTION REDESIGN
**Cursor Implementation Prompt | Phase 2**
**Builds on:** Existing static questionnaire implementation

---

## WHAT THIS PROMPT COVERS

This prompt makes four major changes to the existing Introspect implementation:

1. **Question rewrite** — All 33 questions rewritten as warm, conversational, survey-like copy. No business jargon. No "metrics", "KPIs", "target audience", "value proposition". Clients should feel like they're filling out a fun, insightful quiz — not a corporate intake form.

2. **Multi-question page groups** — Questions are grouped into logical pages (4–6 questions per page). Not one question per screen. Progress feels like momentum, not a marathon.

3. **Complete animation and transition system** — Welcome screen, onboarding screen, animated flow throughout, and a proper ending sequence. Clients should never wonder "what's next?"

4. **Design refinements** — Remove the 70% whitespace constraint. Use space intentionally — breathe where it helps, fill where it serves. The experience should feel rich and alive, not sparse.

---

## ARCHITECTURAL CONSTRAINTS — DO NOT CHANGE THESE

These are preserved from the previous implementation. Do not alter them.

- **Zero Claude API calls during the questionnaire flow.** Claude is only called once — after all answers are submitted, to generate SCOPE.md.
- **Zustand + localStorage persistence.** Users can close the tab and resume.
- **Conditional question logic** (`showIf` functions) must continue to drive which questions appear.
- **Industry detection** from Q4 (business name) pre-fills Q5/Q6 suggestions.
- **Two emails on completion:** Full SCOPE.md with Section 15 → david1984moore@gmail.com. Client PDF (no Section 15) → client's email.

---

## TECH STACK (UNCHANGED)

```
Framework:     Next.js 15.x (App Router)
Language:      TypeScript 5.x strict mode
Styling:       Tailwind CSS v4
Animations:    Framer Motion
State:         Zustand with localStorage persistence
Email:         Resend
UI Primitives: Radix UI
Icons:         Lucide React
```

---

## DESIGN SYSTEM (UPDATED)

### Typography — Perfect Fourth Scale (1.333 ratio)
```
xs:   0.75rem   (12px)
sm:   0.875rem  (14px)
base: 1rem      (16px)
lg:   1.333rem  (21px)
xl:   1.777rem  (28px)
2xl:  2.369rem  (38px)
3xl:  3.157rem  (51px)
```

### Spacing — 8-point grid
All spacing: multiples of 8px (8, 16, 24, 32, 40, 48, 64, 80, 96)

### Colors — OKLCH
```css
--color-primary:       oklch(0.45 0.18 250)
--color-primary-light: oklch(0.55 0.16 250)
--color-primary-dark:  oklch(0.35 0.20 250)
--color-accent:        oklch(0.72 0.18 160)
--color-surface:       oklch(0.99 0.002 250)
--color-surface-raised:oklch(0.97 0.004 250)
--color-border:        oklch(0.90 0.005 250)
--color-border-focus:  oklch(0.60 0.12 250)
--color-text:          oklch(0.15 0.01 250)
--color-text-muted:    oklch(0.50 0.01 250)
--color-text-subtle:   oklch(0.70 0.008 250)
--color-success:       oklch(0.55 0.15 145)
--color-error:         oklch(0.50 0.20 25)
```

### Fonts
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
             Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Whitespace Philosophy (UPDATED)
Use space intentionally. Dense where it creates energy. Open where it creates focus. There is no percentage rule — every section earns its spacing based on what the content needs. Never sparse for its own sake. Never crowded to the point of stress.

---

## PART 1: THE COMPLETE EXPERIENCE FLOW

The Introspect experience has five distinct phases. Each must be designed and animated as its own moment.

```
Phase 1: Entry         → Slow fade from whatever brought them here → Welcome screen
Phase 2: Onboarding    → What is this? What will you do? How long?
Phase 3: Questionnaire → Multi-question pages, animated transitions, progress bar
Phase 4: Review        → See all answers, edit any, confirm before submitting
Phase 5: Completion    → Processing animation → Success → What happens next
```

---

## PART 2: PHASE 1 — WELCOME SCREEN

### Route: `/introspect`

When a user arrives at `/introspect`, the existing page content (if any) fades out over 600ms, and the Welcome Screen fades in.

### Welcome Screen Design

Full viewport. Centered content. Dark, rich background — use a deep gradient:
```css
background: linear-gradient(135deg, oklch(0.12 0.04 250) 0%, oklch(0.18 0.06 260) 100%);
```

Subtle animated background: a very slow, very faint moving mesh or particle effect (Framer Motion, not canvas). Think: like looking at light through deep water. Barely perceptible. Just enough to feel alive.

**Content (centered, vertically and horizontally):**

```
[Applicreations wordmark — small, top-left, white at 70% opacity]

[Large centered area]

  [Animated logo mark — "I" letterform or abstract mark, draws in over 1.2s]

  INTROSPECT
  [lg tracking-widest, white, 60% opacity, fades in at 0.8s delay]

  [Thin horizontal rule — 40px wide, white 30% opacity, fades in at 1.2s]

  Your website. Perfectly understood.
  [xl, white, 85% opacity, fades in at 1.4s]

  [Pause 600ms]

  [Button fades in]
  [ Let's get started → ]
```

**Animation sequence — use Framer Motion `variants` with `staggerChildren`:**
- Logo mark: draw-in effect (SVG stroke animation or scale from 0.8 → 1.0 with opacity)
- "INTROSPECT": letter-by-letter stagger (10ms per character, opacity 0→1)
- Tagline: fade up (y: 12 → 0)
- Button: fade in with subtle scale (0.95 → 1.0)

**Button style:**
- White text, transparent background, white border (1px)
- On hover: background fills white, text goes dark (primary color)
- Transition: 200ms ease
- Right arrow icon that slides right 4px on hover

**On button click:** Entire welcome screen fades out over 400ms, Onboarding screen fades in.

---

## PART 3: PHASE 2 — ONBOARDING SCREEN

After the welcome screen, before any questions. This screen does three jobs: tell them what Introspect is, tell them what they'll do, tell them roughly how long.

### Design

Same dark background as welcome screen. Content appears with stagger animation.

**Layout — three columns on desktop, stacked on mobile:**

```
[Top — centered]
Before we dive in...
[2xl, white, bold]

[Subtext, centered, white 70%]
Here's what's about to happen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Three cards, side by side]

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   💬            │  │   ⚡            │  │   📄            │
│                 │  │                 │  │                 │
│  We'll ask you  │  │  Takes about    │  │  You'll get a   │
│  some fun       │  │  10–15 minutes  │  │  custom website │
│  questions      │  │                 │  │  proposal in    │
│  about your     │  │  No tech-speak. │  │  your inbox.    │
│  project.       │  │  No pressure.   │  │  Built for you. │
│                 │  │  Just honest    │  │                 │
│  No wrong       │  │  answers.       │  │  Same day.      │
│  answers.       │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Centered button]
[ I'm ready — let's go → ]
```

**Card styling:**
- Semi-transparent white background (white at 8% opacity)
- White border (1px, 15% opacity)
- Backdrop blur (8px)
- Rounded corners (12px)
- Padding: 32px
- Icon: 32px, accent color (teal: `oklch(0.72 0.18 160)`)

**Animation:** Cards stagger in from bottom (y: 24 → 0, opacity 0 → 1), 150ms between each.

**On button click:** Fade out over 300ms → questionnaire begins with first page group.

---

## PART 4: PHASE 3 — THE QUESTIONNAIRE

### Page Group Architecture

Questions are grouped into logical pages. Multiple questions per page. Users see a complete page, fill it in, click "Continue", next page slides in.

**Page transition:** Current page slides out left (x: 0 → -40px, opacity 1 → 0). New page slides in from right (x: 40px → 0, opacity 0 → 1). Duration: 350ms, ease: `easeInOut`.

**Background:** Switch from dark to light. The questionnaire uses the light surface color (`oklch(0.99 0.002 250)`). The transition from dark onboarding to light questionnaire should itself be animated — a full-screen color transition over 500ms.

### Progress Bar

Thin bar at the very top of the viewport (not inside the page container). 4px height. Primary color fill. Smooth width transition (600ms ease). No percentage label. No page numbers. Just the bar filling up.

### Page Layout Structure

Each page:
```
[Progress bar — fixed top]

[Page container — max-width: 680px, centered, padding: 48px 24px]

  [Page headline — xl, text color, bold]
  [Page subtext — base, muted, mt-8px]

  [Question group — mt-32px, space-y-32px]

    [Individual question]
      [Question label — base, text color, font-weight: 500]
      [Helper text — sm, muted, mt-4px] (if exists)
      [Input — mt-12px]

  [Continue button — mt-48px, full width on mobile, right-aligned on desktop]
```

### Continue Button States
- **Default:** Primary color, white text, 16px padding vertical, 32px horizontal
- **Disabled:** Muted background, muted text — when required fields on page are empty
- **Loading:** Spinner icon replaces arrow, "One moment..." text (only on final submit page)
- **Hover:** Slight darken, arrow slides right 3px

### Back Navigation
Small text button top-left of page container. "← Back". Only appears after page 1. No icon, just the arrow character and text. `sm` size, muted color. On click: reverse slide animation (current page slides out right, previous slides in from left).

---

## PART 5: THE REWRITTEN QUESTIONS

These replace all 33 questions in `lib/questions/questionBank.ts`. The question `text` and `helperText` fields are what change. All `id`, `type`, `options`, `showIf`, and `required` fields stay the same as the existing implementation.

**Rewrite philosophy:**
- Speak like a smart, friendly person — not a consultant
- Use "you" and "your" constantly — make it personal
- Be curious, not interrogative
- Use informal punctuation where it helps (em dashes, ellipses)
- Options should sound like things a real person would say
- Helper text should feel like a friend leaning over and whispering context

---

### PAGE 1 — Let's Meet You

**Page headline:** "First, let's get acquainted."
**Page subtext:** "Quick and easy — just the basics."

**Q1 — Name**
```
text: "What's your name?"
placeholder: "First and last name"
```

**Q2 — Email**
```
text: "And your email address?"
helperText: "We'll send your proposal here — so make it a good one."
placeholder: "you@example.com"
```

**Q3 — Phone**
```
text: "A phone number? (Totally optional)"
helperText: "We only call if something's unclear — and we'll always text first."
placeholder: "(555) 123-4567"
```

**Q4 — Business Name**
```
text: "What's the name of your business or project?"
helperText: "Doesn't have to be official — even a working name is fine."
placeholder: "e.g., Blue Ridge Bakery, My Photography Studio, Jake's Consulting"
```

---

### PAGE 2 — About Your Project

**Page headline:** "Tell us about what you're building."
**Page subtext:** "Don't overthink it — your gut answers are usually the best ones."

**Q5 — Website Type**
```
text: "What kind of website are you looking for?"
helperText: "Pick the one that feels closest — we'll figure out the details together."
options (labels rewritten):
  "A website for my business or services"
  "An online store to sell things"
  "A portfolio to show off my work"
  "A site for my non-profit or community cause"
  "A blog or place to share content"
  "One focused landing page"
  "Something else entirely"
```

**Q6 — Industry**
```
text: "What world do you operate in?"
helperText: "Just pick the closest fit — this helps us ask smarter questions."
options (labels rewritten):
  "Law, finance, or consulting"
  "Healthcare or wellness"
  "Real estate or property"
  "Construction, trades, or home services"
  "Restaurants, food, or hospitality"
  "Design, photography, or creative work"
  "Tech or software"
  "Education or coaching"
  "Retail or product sales"
  "Non-profit or community"
  "Beauty, fitness, or personal care"
  "Events or entertainment"
  "Something else"
```

---

### PAGE 3 — What You're Going For

**Page headline:** "What are you actually trying to accomplish?"
**Page subtext:** "This is the most important page. Be honest — there are no wrong answers."

**Q7 — Primary Goal**
```
text: "When someone visits your new website, what's the ONE thing you want to happen?"
helperText: "If you could only have one outcome, what would it be?"
options (rewritten):
  "They pick up the phone and call me (or fill out a form)"
  "They buy something right then and there"
  "They're impressed and decide to hire me"
  "They sign up, join, or subscribe to something"
  "They trust me more than my competitors"
  "They find the exact information they came for"
  "They donate to or support my cause"
  "Something else"
```

**Q8 — Success Vision**
```
text: "Fast forward 6 months — your new website is live and crushing it. What does that look like?"
helperText: "Paint us a picture. More bookings? Online orders rolling in? Your phone blowing up? Be as specific as you want."
placeholder: "e.g., I'm getting 10 new leads a week, my online store is doing $5k/month, people in my city actually know who I am..."
```

**Q9 — Target Audience**
```
text: "Who are the people you most want to walk through your (virtual) front door?"
helperText: "Think about your favorite type of customer or the people you most want to reach."
options (rewritten):
  "People in my local area"
  "Customers anywhere in the country"
  "Other businesses (I work B2B)"
  "Professionals or specialists in my field"
  "A community of like-minded people"
  "Honestly, a pretty mixed crowd"
  "Someone else entirely"
```

**Q10 — Differentiator**
```
text: "Here's a fun one: why would someone choose YOU over everyone else doing what you do?"
helperText: "What do your best customers say about you? What makes you genuinely different? Brag a little — we won't judge."
placeholder: "e.g., I've been doing this for 20 years, I actually answer the phone, my prices are fair, my work speaks for itself..."
```

---

### PAGE 4 — Websites You Love

**Page headline:** "Show us your taste."
**Page subtext:** "This is our favorite part — and one of the most useful things you can give us."

**Q11 — Inspiration URLs**
```
text: "Any websites you love? Paste the links here."
helperText: "They don't have to be in your industry — just sites that make you think 'I want something that feels like this.' Up to 5 links."
```

**Q12 — Inspiration Styles**
```
text: "What is it about those sites that you love? (Or just vibe with in general)"
helperText: "Select everything that resonates — even if you didn't add any links above."
options (rewritten):
  "Clean and uncluttered — room to breathe"
  "Professional and trust-building — serious business energy"
  "Bold and impossible to ignore"
  "Easy to navigate — I always know where I am"
  "Stunning photography and visuals"
  "Modern and fresh — not dated at all"
  "Crystal clear — I immediately get what they do"
  "Works beautifully on my phone"
  "Fast — blink and it loads"
  "Something else"
```

**Q13 — Styles to Avoid**
```
text: "Anything you definitely DON'T want? Hard nos, pet peeves, things that drive you crazy on other websites?"
helperText: "Totally optional, but super helpful. Don't hold back."
placeholder: "e.g., nothing too corporate, no cheesy stock photos, not cluttered like my competitor's site, please no dark mode..."
```

---

### PAGE 5 — Where You're Starting From

**Page headline:** "What are we working with?"
**Page subtext:** "No judgment — we just need to know where you're starting."

**Q14 — Has Website**
```
text: "Do you already have a website?"
options:
  "Yes, I have one"
  "Nope — starting from scratch"
```

**Q15 — Existing URL** *(shows only if Q14 = Yes)*
```
text: "What's the address?"
placeholder: "https://www.yoursite.com"
```

**Q16 — Existing Frustrations** *(shows only if Q14 = Yes)*
```
text: "What's not working about it? (Select everything that applies)"
helperText: "Be brutal — this helps us understand exactly what needs to change."
options (rewritten):
  "It looks like it was built in 2012"
  "Looks terrible on phones"
  "I can't update it without calling someone"
  "Google doesn't know it exists"
  "Visitors come and go without doing anything"
  "It takes forever to load"
  "Nobody can tell what I actually do"
  "I'm embarrassed to hand out my business card"
  "It's constantly broken or hacked"
  "Something else"
```

---

### PAGE 6 — Your Brand

**Page headline:** "Let's talk about your look."
**Page subtext:** "We'll work with what you have — and fill in what you don't."

**Q17 — Has Logo**
```
text: "Do you have a logo you're happy with?"
options (rewritten):
  "Yes — it's professional and I love it"
  "I have one, but honestly it could be better"
  "No logo yet — I'll need one"
  "Honestly not sure"
```

**Q18 — Has Brand Colors**
```
text: "Do you have specific colors that belong to your brand?"
options (rewritten):
  "Yes — I know my exact colors"
  "Not really — I'm open to what looks great"
  "Kind of — I have preferences but nothing locked in"
```

**Q19 — Brand Colors** *(shows only if Q18 = Yes)*
```
text: "What are they? (As specific or vague as you like)"
placeholder: "e.g., 'Navy #1a2b6b and gold', 'Same green as Starbucks', 'Deep blues and warm grays', 'I have a brand guide I can share later'"
```

**Q20 — Has Photos**
```
text: "What's your photo situation?"
options (rewritten):
  "I have professional photos ready to use"
  "I have photos, but they're more iPhone than Annie Leibovitz"
  "No photos — I'll need stock images or to hire a photographer"
```

---

### PAGE 7 — Content & Pages

**Page headline:** "What's going on the site?"
**Page subtext:** "We'll help figure out what's essential vs. nice-to-have."

**Q21 — Content Provider**
```
text: "Who's going to write the actual words on your website?"
helperText: "The about page, the services descriptions, all that copy."
options (rewritten):
  "I'll write it — just need a direction to follow"
  "I'd love help with that — can you write it for me?"
  "I already have a copywriter handling it"
```

**Q22 — Update Frequency**
```
text: "Once the site is live, how often will you need to update it?"
options (rewritten):
  "All the time — I'll want to add things regularly"
  "A few times a year — seasonal stuff, announcements"
  "Rarely — once it's up, it's mostly up"
```

**Q23 — Pages Needed**
```
text: "Which of these pages do you imagine on your site? (Grab everything that sounds right)"
options (rewritten):
  "Home page"
  "About us / Our story"
  "Services or what we offer"
  "Work samples or portfolio"
  "Products or shop"
  "Blog or news"
  "Customer reviews or testimonials"
  "Meet the team"
  "FAQ"
  "Contact page"
  "Pricing"
  "Book an appointment"
```

---

### PAGE 8 — Features & Functions

**Page headline:** "What should your website actually do?"
**Page subtext:** "Beyond just looking good — what features do you need?"

**Q24 — Key Features**
```
text: "Which of these would make your website way more useful? (Pick everything that excites you)"
helperText: "Don't filter yourself by cost yet — just tell us what you want."
options (rewritten):
  "A contact form so people can reach me"
  "Online booking — let people schedule with me 24/7"
  "A full online store with shopping cart"
  "Customer accounts so people can log in"
  "Live chat so I can talk to visitors in real time"
  "A blog or content section I can update myself"
  "Email newsletter sign-up"
  "A photo gallery or portfolio display"
  "Video integration (YouTube, Vimeo, etc.)"
  "A map showing where I'm located"
  "Pull in my Instagram or social media feed"
  "Display my Google or Yelp reviews automatically"
  "Accept payments (not a full store — just one-off payments)"
  "A quote calculator or pricing estimator"
  "Multiple languages"
```

**Q25 — E-commerce Size** *(shows only if Q24 includes ecommerce OR Q5 = ecommerce)*
```
text: "Nice — how many products are you planning to sell?"
options:
  "Small shop — under 25 products"
  "Medium catalog — 25 to 200 products"
  "Big operation — 200+ products"
```

**Q26 — Integrations**
```
text: "Are there any tools or services your website needs to connect with?"
options (rewritten):
  "Google Analytics (to track visitors)"
  "Mailchimp or another email platform"
  "A CRM like Salesforce or HubSpot"
  "Stripe (for payments)"
  "PayPal (for payments)"
  "Calendly or another scheduling tool"
  "My social media accounts"
  "QuickBooks or accounting software"
  "Nothing I can think of right now"
```

---

### PAGE 9 — Timing & Budget

**Page headline:** "Let's talk logistics."
**Page subtext:** "No surprises — we just want to make sure we're aligned."

**Q27 — Domain Status**
```
text: "Do you already have a domain name? (Like www.yourbusiness.com)"
options (rewritten):
  "Yes — I own one already"
  "No — I'll need to get one"
  "Not sure what I have"
```

**Q28 — Existing Domain** *(shows only if Q27 = have_domain)*
```
text: "What is it?"
placeholder: "www.yourbusiness.com"
```

**Q29 — Timeline**
```
text: "How soon are you hoping to launch?"
options (rewritten):
  "Yesterday — I needed this yesterday"
  "Within a month if possible"
  "2–3 months is fine"
  "I'm flexible — quality over speed"
  "I have a specific date in mind"
```

**Q30 — Budget**
```
text: "What kind of budget are you working with?"
helperText: "This helps us point you toward the right package. All options include the first year of hosting."
options (rewritten):
  "Under $2,500 — keeping it lean"
  "$2,500–$4,500 — solid professional site"
  "$4,500+ — full-featured, custom build"
  "Not sure yet — show me what makes sense"
```

---

### PAGE 10 — Last Things

**Page headline:** "Almost there — just a few more."
**Page subtext:** "These last ones help us do our homework before we get to work."

**Q31 — Competitors**
```
text: "Who are your biggest competitors? (Optional, but really useful)"
helperText: "Names, websites, or just descriptions. We do a little competitive research so your site stands out from them — not blend in."
placeholder: "e.g., Smith Roofing (smithroofing.com), that other bakery on Oak Street, the big national chain we're competing against..."
```

**Q32 — Accessibility**
```
text: "Any specific accessibility requirements?"
helperText: "Things like ADA compliance, WCAG standards, or serving users with disabilities."
options (rewritten):
  "Standard accessibility is fine — just make it usable for everyone"
  "I need full WCAG 2.1 AA compliance (government, healthcare, or education)"
  "Not sure — tell me what you'd recommend"
```

**Q33 — Anything Else**
```
text: "Last one — anything else we should know before we get to work?"
helperText: "Wild ideas, specific concerns, things that didn't fit anywhere else, questions you have for us. The floor is yours."
placeholder: "Anything at all..."
```

---

## PART 6: PHASE 4 — THE REVIEW SCREEN

Before submission, users see a complete summary of their answers and can edit anything.

### Design

Light background (same as questionnaire). Max-width 720px centered.

**Header:**
```
You're almost done.
[2xl, bold]

Take a quick look at your answers. Change anything before we send it off.
[base, muted]
```

**Answer Summary — grouped by page:**

For each page group, show a card:
```
┌─────────────────────────────────────────────────────────┐
│  Let's Meet You                              [Edit →]   │
│  ─────────────────────────────────────────────────────  │
│  Name          David Moore                              │
│  Email         david@example.com                        │
│  Phone         (302) 555-0100                           │
│  Business      Blue Ridge Consulting                    │
└─────────────────────────────────────────────────────────┘
```

Card style:
- White background
- 1px border (color-border)
- 12px border radius
- 24px padding
- Row layout: label left (muted, sm), value right (text, sm, font-medium)
- "Edit →" link top-right — navigates back to that page group (then returns to review after saving)

**Submit section (below all cards):**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Everything look right?                               │
│                                                         │
│   Hit the button below and we'll get to work           │
│   building your custom project scope.                   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐  │
│   │        Send it — let's build something  →       │  │
│   └─────────────────────────────────────────────────┘  │
│                                                         │
│   We'll send a proposal to: david@example.com           │
│   [small, muted, centered below button]                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Submit button:
- Full width
- Primary background, white text
- 20px vertical padding (generous)
- On click: button text changes to "Sending..." with spinner, then transitions to completion screen

---

## PART 7: PHASE 5 — COMPLETION SCREEN

### Route: `/introspect/complete`

This is a three-beat sequence. Never dump the user on a static "thanks for submitting" page.

### Beat 1: Processing (2–4 seconds)

Dark background returns (same as welcome screen). Centered content.

```
[Animated logo mark — subtle pulse or rotation]

Building your custom project scope...
[lg, white, 80% opacity]

[Animated progress bar — indeterminate, smooth shimmer]

[Rotating messages, 1.5s each, fade in/out:]
  "Analyzing your project..."
  "Mapping out the right approach..."
  "Calculating timelines and scope..."
  "Personalizing your proposal..."
  "Almost ready..."
```

This runs while the actual API calls happen (`/api/generate-scope` then `/api/send-emails`). If the calls finish faster than 3 seconds, hold on Beat 1 for the remainder so it never feels instant and cheap.

### Beat 2: Success (auto-transitions after 1 second on Beat 1 completion)

Same dark background. Animated transition.

```
[Checkmark icon — draws in with SVG stroke animation, 0.6s, accent color (teal)]

[0.4s pause]

It's on its way.
[2xl, white, bold, fades up]

[0.3s stagger]

Your custom proposal is headed to
[base, white 70%]

[their email address]
[base, white, font-medium, accent underline]

[0.4s stagger]

[Three points fade in, staggered 200ms each:]

  ✦  Check your inbox in the next few minutes
  ✦  Your proposal includes everything we just talked about
  ✦  We'll be in touch about next steps
```

### Beat 3: What's Next (appears 2 seconds after Beat 2)

Content fades in below the success message (no page transition — just appears below on scroll or stagger):

```
[Thin rule — accent color, 60px wide, centered]

What happens next?

[Three numbered steps, horizontal on desktop, stacked on mobile]

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│      1       │  │      2       │  │      3       │
│              │  │              │  │              │
│  Review your │  │  We'll reach │  │  We kick off │
│  proposal    │  │  out within  │  │  your build  │
│  in your     │  │  24 hours to │  │  — and you   │
│  inbox.      │  │  answer any  │  │  get a        │
│              │  │  questions.  │  │  beautiful    │
│              │  │              │  │  website.    │
└──────────────┘  └──────────────┘  └──────────────┘

[Centered, below steps]
Questions? Reach us at hello@applicreations.com
[sm, white 60%]
```

---

## PART 8: PAGE GROUP MAPPING

Map the 33 questions into these exact page groups. This replaces the "one question per screen" model.

```typescript
export const PAGE_GROUPS = [
  {
    id: 'page_1',
    headline: "First, let's get acquainted.",
    subtext: "Quick and easy — just the basics.",
    questionIds: ['q1_name', 'q2_email', 'q3_phone', 'q4_business_name']
  },
  {
    id: 'page_2',
    headline: "Tell us about what you're building.",
    subtext: "Don't overthink it — your gut answers are usually the best ones.",
    questionIds: ['q5_website_type', 'q6_industry']
  },
  {
    id: 'page_3',
    headline: "What are you actually trying to accomplish?",
    subtext: "This is the most important page. Be honest — there are no wrong answers.",
    questionIds: ['q7_primary_goal', 'q8_success_vision', 'q9_target_audience', 'q10_differentiator']
  },
  {
    id: 'page_4',
    headline: "Show us your taste.",
    subtext: "This is our favorite part — and one of the most useful things you can give us.",
    questionIds: ['q11_inspiration_urls', 'q12_inspiration_styles', 'q13_styles_to_avoid']
  },
  {
    id: 'page_5',
    headline: "What are we working with?",
    subtext: "No judgment — we just need to know where you're starting.",
    questionIds: ['q14_has_website', 'q15_existing_url', 'q16_existing_frustrations']
    // Q15 and Q16 only render if Q14 = 'yes' — conditional logic unchanged
  },
  {
    id: 'page_6',
    headline: "Let's talk about your look.",
    subtext: "We'll work with what you have — and fill in what you don't.",
    questionIds: ['q17_has_logo', 'q18_has_colors', 'q19_brand_colors', 'q20_has_photos']
    // Q19 only renders if Q18 = 'yes' — conditional logic unchanged
  },
  {
    id: 'page_7',
    headline: "What's going on the site?",
    subtext: "We'll help figure out what's essential vs. nice-to-have.",
    questionIds: ['q21_content_provider', 'q22_update_frequency', 'q23_pages_needed']
  },
  {
    id: 'page_8',
    headline: "What should your website actually do?",
    subtext: "Beyond just looking good — what features do you need?",
    questionIds: ['q24_key_features', 'q25_ecommerce_details', 'q26_integrations']
    // Q25 only renders if ecommerce selected — conditional logic unchanged
  },
  {
    id: 'page_9',
    headline: "Let's talk logistics.",
    subtext: "No surprises — we just want to make sure we're aligned.",
    questionIds: ['q27_domain_status', 'q28_existing_domain', 'q29_timeline', 'q30_budget']
    // Q28 only renders if Q27 = 'have_domain' — conditional logic unchanged
  },
  {
    id: 'page_10',
    headline: "Almost there — just a few more.",
    subtext: "These last ones help us do our homework before we get to work.",
    questionIds: ['q31_competitors', 'q32_accessibility', 'q33_anything_else']
  }
]
```

**Progress calculation:** `(completedPages / totalPages) * 100`. A page is "completed" once the user has moved past it.

**Conditional page visibility:** If ALL questions on a page are hidden by `showIf` logic, skip that page entirely.

---

## PART 9: ANIMATION CONSTANTS

Define these in `lib/animations/constants.ts` and use them everywhere. Never hardcode animation values inline.

```typescript
export const ANIMATION = {
  // Durations (ms)
  duration: {
    instant:   150,
    fast:      200,
    normal:    300,
    medium:    400,
    slow:      600,
    verySlow:  1000,
  },

  // Easing
  ease: {
    out:       [0.0, 0.0, 0.2, 1.0],
    inOut:     [0.4, 0.0, 0.2, 1.0],
    spring:    { type: 'spring', stiffness: 300, damping: 30 },
    springGentle: { type: 'spring', stiffness: 150, damping: 25 },
  },

  // Reusable variants
  variants: {
    fadeUp: {
      hidden:  { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
      exit:    { opacity: 0, y: -8 }
    },
    fadeIn: {
      hidden:  { opacity: 0 },
      visible: { opacity: 1 },
      exit:    { opacity: 0 }
    },
    slideInFromRight: {
      hidden:  { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
      exit:    { opacity: 0, x: -40 }
    },
    scaleIn: {
      hidden:  { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
      exit:    { opacity: 0, scale: 0.98 }
    },
    stagger: {
      visible: { transition: { staggerChildren: 0.12 } }
    },
    staggerFast: {
      visible: { transition: { staggerChildren: 0.06 } }
    }
  }
}
```

---

## PART 10: COMPONENT CHANGES SUMMARY

### Files to UPDATE (not replace — only change what's listed):

**`lib/questions/questionBank.ts`**
- Update all `text` and `helperText` fields with the rewritten questions above
- Update all `options[].label` values with the rewritten option text
- All IDs, types, `showIf`, and `required` fields stay the same

**`stores/intakeStore.ts`**
- Replace `currentQuestionId` with `currentPageId: string`
- Track `completedPageIds: string[]`
- Progress is now page-based, not question-based
- `submitPage(pageId)` action replaces `submitAnswer` — saves all answers from a page at once, advances to next page
- `goBack()` logic works the same but navigates by page
- Keep `answers: Record<string, Answer>` unchanged — answers still keyed by question ID

**`components/intake/QuestionShell.tsx`**
- Remove the single-question layout
- Replace with page-group layout (headline, subtext, multiple questions, continue button)
- Wrap in `AnimatePresence` with `slideInFromRight` variant
- `key={currentPageId}` on the animated container

**`components/intake/QuestionRenderer.tsx`**
- Now renders multiple questions from a page group
- Filters by `showIf` so conditional questions hide/show within the page
- Each question has its own label, helper text, and input

**`components/intake/ProgressBar.tsx`**
- Progress now based on page completion (0–10 pages)
- No other changes needed

### Files to CREATE:

**`lib/animations/constants.ts`**
- The animation constants object above

**`components/intake/WelcomeScreen.tsx`**
- Full-viewport dark welcome screen with animated entrance sequence

**`components/intake/OnboardingScreen.tsx`**
- Three-card "here's what's about to happen" screen

**`components/intake/ReviewScreen.tsx`**
- Answer summary grouped by page, with edit links

**`components/intake/ProcessingScreen.tsx`**
- Animated processing state (Beat 1 of completion)

**`components/intake/SuccessScreen.tsx`**
- Success + what's next (Beats 2 and 3 of completion)

**`lib/questions/pageGroups.ts`**
- The `PAGE_GROUPS` array defined above

### Files that DO NOT CHANGE:

- `types/questions.ts`
- `types/intelligence.ts`
- `lib/questions/conditionalLogic.ts`
- `lib/questions/industryDetection.ts`
- `lib/questions/answersToIntelligence.ts`
- `lib/scopeGeneration/generateScope.ts`
- `lib/scopeGeneration/securitySection.ts`
- `lib/scopeGeneration/clientSummary.ts`
- `lib/email/sendDocuments.ts`
- `app/api/generate-scope/route.ts`
- `app/api/send-emails/route.ts`
- All individual input components (TextInput, TextArea, SingleSelect, etc.)

---

## SUCCESS CRITERIA

The implementation is complete when:

- [ ] Welcome screen appears on `/introspect` load with full animation sequence
- [ ] Onboarding screen appears after welcome, before any questions
- [ ] Questions are grouped into 10 pages, multiple questions per page
- [ ] Page transitions animate (slide in from right, slide out to left)
- [ ] Progress bar advances page by page (no question numbers anywhere)
- [ ] Conditional questions (Q15, Q16, Q19, Q25, Q28) hide/show within their page
- [ ] Industry detection still pre-fills Q5/Q6 after Q4 is answered
- [ ] Back navigation works, reverse animation plays
- [ ] localStorage persistence works — close and resume
- [ ] Review screen shows all answers grouped by page with edit links
- [ ] Submit button on review screen triggers processing animation
- [ ] Processing screen runs minimum 3 seconds regardless of API speed
- [ ] Success screen shows checkmark animation, email confirmation, next steps
- [ ] Zero Claude API calls during the questionnaire flow
- [ ] All question text matches the rewritten copy in this document
- [ ] All option labels match the rewritten option text in this document
- [ ] No business jargon anywhere in the user-facing UI

---

*The SCOPE.md generation, security section, email delivery, and data model are unchanged from the previous implementation. This prompt covers UX, copy, animation, and page architecture only.*
