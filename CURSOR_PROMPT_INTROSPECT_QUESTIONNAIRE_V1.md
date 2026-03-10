# Cursor Implementation Prompt
## Introspect — Questionnaire Rebuild
**Version:** 1.0  
**Scope:** Complete questionnaire system rebuild based on Question Set V3

---

## READ THIS ENTIRE DOCUMENT BEFORE WRITING A SINGLE LINE OF CODE

This prompt is comprehensive and precise. Every constraint exists for a reason. Deviating from these instructions — even with good intentions — will produce incorrect output. When in doubt, follow the spec exactly.

---

## PART 1: WHAT THIS IS AND WHAT IT IS NOT

### What Introspect Is

Introspect is a **static questionnaire** that collects project requirements from a client, then passes the complete answer set to Claude (one API call, at the very end) to generate a SCOPE.md technical specification document. It is an orchestration engine disguised as a natural conversation.

### What Introspect Is NOT

- ❌ NOT a chatbot — Claude does not respond to individual answers
- ❌ NOT a feature selector — clients never see, choose, or price features
- ❌ NOT a multi-turn AI conversation — Claude is called exactly once, after all questions are complete
- ❌ NOT a form with dropdowns and checkboxes — it is a focused, one-question-at-a-time experience
- ❌ NOT a wizard with "Step X of Y" labels

### The Experience Model

One question appears at a time. The user answers. The next question appears. No AI responses between questions. No feature menus. No pricing shown to the client. The experience should feel like a thoughtful conversation with a person who already knows what they need to ask.

---

## PART 2: TECH STACK

These are non-negotiable. Do not substitute or upgrade without explicit instruction.

```
Framework:     Next.js 15 with App Router
Language:      TypeScript 5 strict mode
Styling:       Tailwind CSS v4
State:         Zustand with localStorage persistence
Animation:     Framer Motion
Deployment:    Vercel
Email:         Resend
ORM:           Prisma (for session persistence if needed)
Database:      PostgreSQL (Vercel Postgres)
```

**Dependencies to install:**
```bash
npm install zustand framer-motion lucide-react resend
npm install -D @types/node
```

---

## PART 3: DESIGN SYSTEM

Apply these consistently across every component in the questionnaire flow. Do not invent new values.

### Typography (Perfect Fourth Scale — 1.333 ratio)
```typescript
const typography = {
  hero:    'text-[3.157rem] leading-[1.1]',   // 50.52px
  section: 'text-[2.369rem] leading-[1.2]',   // 37.90px
  sub:     'text-[1.777rem] leading-[1.3]',   // 28.43px
  lg:      'text-[1.333rem] leading-[1.4]',   // 21.33px
  base:    'text-base leading-[1.6]',          // 16px
  sm:      'text-[0.875rem] leading-[1.5]',   // 14px
  xs:      'text-[0.75rem] leading-[1.5]',    // 12px
}
```

### Spacing (8-point grid)
Use Tailwind spacing values that correspond to multiples of 8px. Primary page padding: `px-6 py-12` on mobile, `px-12 py-16` on desktop.

### Colors (OKLCH)
```css
--color-primary:    oklch(58% 0.20 240);   /* Blue */
--color-accent:     oklch(72% 0.18 160);   /* Teal */
--color-bg:         oklch(10% 0 0);        /* Near black — dark theme */
--color-surface:    oklch(15% 0 0);        /* Card background */
--color-border:     oklch(25% 0 0);        /* Subtle border */
--color-text:       oklch(95% 0 0);        /* Near white */
--color-muted:      oklch(60% 0 0);        /* Secondary text */
```

### Font Stack (Apple system fonts)
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Dark Theme
The entire `/introspect` route uses a dark background theme. `oklch(10% 0 0)` as page background. Apply via `usePathname` detection in the root layout — do not add a dark mode toggle.

### Animation Principles
- Question transitions: fade + slight upward translate (12px), 300ms ease-out
- Option hover: subtle scale (1.02) + border color shift, 150ms
- Progress bar: smooth width transition, 400ms ease-in-out
- No bouncing, no dramatic entrances — restrained and deliberate

---

## PART 4: COMPLETE QUESTION DEFINITIONS

Implement every question exactly as specified. Do not reword, combine, or reorder.

### Core Questions (shown to everyone)

```typescript
// Q1
{
  id: 'q1_name',
  text: "What's your name?",
  inputType: 'text',
  required: true,
  placeholder: 'Your name',
  scopeField: 'S3.fullName',
}

// Q2
{
  id: 'q2_email',
  text: 'And your email address?',
  inputType: 'text',
  inputMode: 'email',
  required: true,
  placeholder: 'your@email.com',
  scopeField: 'S3.email',
}

// Q3
{
  id: 'q3_phone',
  text: 'A phone number? (Optional)',
  inputType: 'text',
  inputMode: 'tel',
  required: false,
  skippable: true,
  placeholder: 'Your phone number',
  scopeField: 'S3.phone',
}

// Q4
{
  id: 'q4_business_name',
  text: "What's the name of your business or project?",
  inputType: 'text',
  required: true,
  placeholder: 'Business or project name',
  scopeField: ['S3.companyName', 'S1.projectName'],
}

// Q5
{
  id: 'q5_project_type',
  text: 'What are we building for you?',
  inputType: 'option_select',
  required: true,
  scopeField: ['S2.websiteType', 'S1.websiteType'],
  branchTrigger: true,
  options: [
    { value: 'service',    label: 'Service business website',         description: 'You offer a service — consulting, trades, health, beauty, legal, etc.' },
    { value: 'ecommerce',  label: 'Online store',                     description: 'You sell physical or digital products' },
    { value: 'portfolio',  label: 'Portfolio or showcase',            description: 'You want to show your work — design, photography, contracting, etc.' },
    { value: 'restaurant', label: 'Restaurant or café',               description: 'Menu, hours, reservations, ordering' },
    { value: 'nonprofit',  label: 'Nonprofit or community organization', description: 'Donations, events, volunteer coordination' },
    { value: 'blog',       label: 'Blog or content site',             description: 'Regular articles, newsletter, content publishing' },
    { value: 'app',        label: 'Web app or customer portal',       description: 'Users log in, do things, see their own data' },
    { value: 'something_else', label: 'Something else',               description: '', allowText: true },
  ],
}

// Q6
{
  id: 'q6_industry',
  text: 'What industry are you in?',
  inputType: 'option_select',
  required: true,
  scopeField: ['S2.industry', 'S15.securityInput'],
  options: [
    { value: 'health_wellness',   label: 'Health & wellness' },
    { value: 'home_services',     label: 'Home services (trades, landscaping, cleaning)' },
    { value: 'food_beverage',     label: 'Food & beverage' },
    { value: 'beauty_personal',   label: 'Beauty & personal care' },
    { value: 'legal_financial',   label: 'Legal or financial services' },
    { value: 'real_estate',       label: 'Real estate' },
    { value: 'fitness',           label: 'Fitness & sports' },
    { value: 'education',         label: 'Education or coaching' },
    { value: 'creative_services', label: 'Creative services (design, photography, video)' },
    { value: 'automotive',        label: 'Automotive (repair, detailing, sales)' },
    { value: 'retail',            label: 'Retail' },
    { value: 'nonprofit',         label: 'Nonprofit or community' },
    { value: 'tech',              label: 'Technology' },
    { value: 'something_else',    label: 'Something else', allowText: true },
  ],
}

// Q7
{
  id: 'q7_primary_goal',
  text: "When someone lands on your site, what's the ONE thing you want them to do?",
  inputType: 'option_select',
  required: true,
  scopeField: ['S1.primaryGoal', 'S4.primaryGoal'],
  options: [
    { value: 'call_contact',    label: 'Call or message me' },
    { value: 'book_appointment', label: 'Book an appointment' },
    { value: 'buy_something',   label: 'Buy something' },
    { value: 'get_a_quote',     label: 'Request a quote' },
    { value: 'find_my_location', label: 'Find my location or hours' },
    { value: 'learn_trust',     label: 'Learn about me and reach out when ready' },
    { value: 'sign_up',         label: 'Sign up or create an account' },
    { value: 'something_else',  label: 'Something else', allowText: true },
  ],
}

// Q8
{
  id: 'q8_existing_website',
  text: 'Do you already have a website?',
  inputType: 'option_select',
  required: true,
  scopeField: ['S4.companyOverview', 'S12.risks'],
  options: [
    { value: 'yes_migrate', label: 'Yes, and I want to bring content across from it' },
    { value: 'yes_replace', label: 'Yes, but I want to start completely fresh' },
    { value: 'no',          label: 'No, this is my first one' },
  ],
  branchLogic: {
    'yes_migrate': ['q8a_current_url', 'q8b_frustrations'],
    'yes_replace': ['q8a_current_url', 'q8b_frustrations'],
    'no': [],
  },
}

// Q8a — conditional
{
  id: 'q8a_current_url',
  text: "What's the address?",
  inputType: 'text',
  inputMode: 'url',
  required: false,
  condition: { questionId: 'q8_existing_website', notValue: 'no' },
  placeholder: 'https://yoursite.com',
  scopeField: 'S4.existingSiteUrl',
}

// Q8b — conditional
{
  id: 'q8b_frustrations',
  text: "What's the biggest thing that isn't working about it right now?",
  inputType: 'option_select',
  required: false,
  condition: { questionId: 'q8_existing_website', notValue: 'no' },
  scopeField: 'S4.painPoints',
  options: [
    { value: 'looks_outdated',        label: 'It looks outdated' },
    { value: 'hard_to_update',        label: "It's hard for me to update myself" },
    { value: 'not_showing_up',        label: "It's not showing up on Google" },
    { value: 'not_bringing_business', label: "It's just not bringing in business" },
    { value: 'not_mobile',            label: "It doesn't work well on phones" },
    { value: 'slow',                  label: 'It loads too slowly' },
    { value: 'something_else',        label: 'Something else', allowText: true },
  ],
}

// Q9
{
  id: 'q9_logo',
  text: "Do you have a logo you're happy with?",
  inputType: 'option_select',
  required: true,
  scopeField: ['S5.existingAssets.logo', 'S5.whatNeedsCreation'],
  options: [
    { value: 'yes',          label: 'Yes, and I have the original files' },
    { value: 'yes_no_files', label: 'Yes, but I only have a screenshot or low-res version' },
    { value: 'yes_ok',       label: 'I have one, but it could be better' },
    { value: 'no',           label: 'No, I need one' },
  ],
}

// Q10
{
  id: 'q10_brand_colors',
  text: 'Do you have specific colors that belong to your brand?',
  inputType: 'option_select',
  required: true,
  scopeField: 'S5.existingAssets.colorPalette',
  options: [
    { value: 'yes_exact',   label: 'Yes — I have exact colors (hex codes or brand guidelines)' },
    { value: 'yes_general', label: 'Sort of — I have colors I use but nothing official' },
    { value: 'no',          label: "No, I'm open to direction" },
  ],
  branchLogic: {
    'yes_exact':   ['q10a_color_entry'],
    'yes_general': ['q10a_color_entry'],
    'no': [],
  },
}

// Q10a — conditional
{
  id: 'q10a_color_entry',
  text: "What are they? Hex codes, names, or just describe them — whatever you have.",
  inputType: 'text',
  required: false,
  condition: { questionId: 'q10_brand_colors', notValue: 'no' },
  placeholder: 'e.g. #2D5BE3, or "navy blue and warm gold"',
  scopeField: ['S5.colorPaletteDetails', 'S9.colorScheme'],
}

// Q11
{
  id: 'q11_photography',
  text: 'Do you have photos ready to use?',
  inputType: 'option_select',
  required: true,
  scopeField: ['S5.existingAssets.imagery', 'S6.photographyNeeded', 'S8.galleries'],
  options: [
    { value: 'have_great',  label: 'Yes — I have professional photos ready to go' },
    { value: 'have_ok',     label: 'I have some, but they could be better' },
    { value: 'need_photos', label: 'No — I need photography arranged' },
    { value: 'stock_ok',    label: 'Stock photos are fine for now' },
  ],
}

// Q12
{
  id: 'q12_media',
  text: 'Does your site need any video or interactive features?',
  inputType: 'option_select',
  multiSelect: true,
  required: false,
  scopeField: ['S8.video', 'S8.interactiveElements'],
  options: [
    { value: 'no',               label: 'No, none of that' },
    { value: 'yes_embed',        label: 'A YouTube or Vimeo video embedded on the page' },
    { value: 'yes_background',   label: 'A background video behind the hero section' },
    { value: 'yes_interactive',  label: 'Something interactive — a calculator, quiz, or configurator' },
    { value: 'not_sure',         label: 'Not sure yet' },
  ],
}

// Q13
{
  id: 'q13_inspiration',
  text: 'Any websites you love the look of? Drop the links here.',
  inputType: 'text',
  required: false,
  skippable: true,
  placeholder: 'Paste links separated by commas or spaces',
  helpText: 'Competitors, businesses you admire, anyone — optional but helpful.',
  scopeField: 'S9.references',
}

// Q14
{
  id: 'q14_design_style',
  text: 'How would you describe the look and feel you\'re going for?',
  inputType: 'option_select',
  multiSelect: true,
  multiSelectMax: 3,
  required: true,
  scopeField: ['S9.overallStyle', 'S9.designPriorities'],
  options: [
    { value: 'clean_minimal',        label: 'Clean and minimal' },
    { value: 'bold_striking',        label: 'Bold and striking' },
    { value: 'warm_friendly',        label: 'Warm and approachable' },
    { value: 'professional_polished', label: 'Professional and polished' },
    { value: 'modern_technical',     label: 'Modern and technical' },
    { value: 'classic_traditional',  label: 'Classic and traditional' },
    { value: 'playful_fun',          label: 'Playful and fun' },
    { value: 'luxury_premium',       label: 'Luxury and high-end' },
  ],
}

// Q15
{
  id: 'q15_styles_avoid',
  text: "Anything you definitely don't want? (Optional)",
  inputType: 'text',
  required: false,
  skippable: true,
  placeholder: 'e.g. "No dark backgrounds" or "nothing too corporate"',
  scopeField: 'S9.designConstraints',
}

// Q16
{
  id: 'q16_integrations',
  text: 'Are there any tools or services your new site needs to connect with?',
  subtext: 'Think booking systems, email platforms, payment processors, or anything else your business already runs on.',
  inputType: 'option_select',
  multiSelect: true,
  required: false,
  scopeField: 'S7.integrations',
  options: [
    { value: 'booking_system',    label: 'A booking or scheduling system (Calendly, Acuity, Vagaro, etc.)', allowText: true },
    { value: 'email_marketing',   label: 'An email platform (Mailchimp, Klaviyo, etc.)', allowText: true },
    { value: 'crm',               label: 'A CRM or customer management system', allowText: true },
    { value: 'payment_processor', label: 'A payment processor you already use (Square, Stripe, PayPal)', allowText: true },
    { value: 'pos_system',        label: 'A point-of-sale system', allowText: true },
    { value: 'accounting',        label: 'Accounting software (QuickBooks, Xero, etc.)', allowText: true },
    { value: 'social_media',      label: 'Social media feeds or sharing' },
    { value: 'analytics',         label: 'Google Analytics or similar' },
    { value: 'none',              label: 'None — starting fresh' },
    { value: 'something_else',    label: 'Something else', allowText: true },
  ],
}

// Q17
{
  id: 'q17_content_writer',
  text: "Who's going to write the words on your website?",
  inputType: 'option_select',
  required: true,
  scopeField: ['S6.contentProvider', 'S6.copywritingNeeded'],
  options: [
    { value: 'me',      label: "I'll write them myself" },
    { value: 'you',     label: "I'd like help with that" },
    { value: 'mixed',   label: 'A bit of both' },
    { value: 'have_it', label: 'I already have most of it written' },
  ],
}

// Q18
{
  id: 'q18_update_frequency',
  text: 'After launch, how often will you need to update the content?',
  inputType: 'option_select',
  required: true,
  scopeField: ['S6.updateFrequency', 'S7.contentManagement', 'S11.maintenancePlan'],
  options: [
    { value: 'rarely',  label: 'Rarely',             description: 'Prices, hours, contact info — that\'s about it' },
    { value: 'monthly', label: 'Every month or so',  description: 'New photos, updated services, occasional news' },
    { value: 'weekly',  label: 'Weekly',              description: 'Blog posts, promotions, new inventory' },
    { value: 'daily',   label: 'Daily or more',       description: 'Active store, daily content, live inventory' },
  ],
}

// Q19
{
  id: 'q19_support',
  text: 'After launch, how do you want to handle updates and maintenance?',
  inputType: 'option_select',
  required: true,
  scopeField: ['S11.maintenancePlan', 'S11.hosting'],
  options: [
    { value: 'handle_it',         label: "I'll handle it myself",                          description: 'Full control — you manage updates and hosting' },
    { value: 'some_help',         label: 'Some help would be nice',                        description: 'Occasional support when you need it' },
    { value: 'handle_it_for_me',  label: "Handle it for me — I don't want to think about it", description: 'Fully managed hosting and maintenance' },
  ],
}

// Q20
{
  id: 'q20_domain',
  text: 'Do you already have a domain name?',
  inputType: 'option_select',
  required: true,
  scopeField: 'S7.domain',
  options: [
    { value: 'yes',      label: 'Yes' },
    { value: 'no',       label: 'No, I need one' },
    { value: 'not_sure', label: 'Not sure' },
  ],
  branchLogic: {
    'yes': ['q20a_domain_entry'],
    'no': [],
    'not_sure': [],
  },
}

// Q20a — conditional
{
  id: 'q20a_domain_entry',
  text: "What is it?",
  inputType: 'text',
  required: false,
  condition: { questionId: 'q20_domain', value: 'yes' },
  placeholder: 'yourdomain.com',
  scopeField: 'S7.domainName',
}

// Q21
{
  id: 'q21_timeline',
  text: 'When are you looking to launch?',
  inputType: 'option_select',
  required: true,
  scopeField: ['S12.desiredLaunchDate', 'S12.risks'],
  options: [
    { value: 'asap',          label: 'As soon as possible' },
    { value: '1_2_months',    label: 'Within 1–2 months' },
    { value: '3_months',      label: 'Around 3 months' },
    { value: 'flexible',      label: 'No hard deadline — just do it right' },
    { value: 'specific_date', label: 'I have a specific date in mind' },
  ],
  branchLogic: {
    'specific_date': ['q21a_specific_date'],
  },
}

// Q21a — conditional
{
  id: 'q21a_specific_date',
  text: "What's the date?",
  inputType: 'date',
  required: false,
  condition: { questionId: 'q21_timeline', value: 'specific_date' },
  scopeField: 'S12.launchDate',
}

// Q22
{
  id: 'q22_budget',
  text: 'To build the right plan, I need to understand your investment range.',
  subtext: "Everything we've talked about is possible — the budget just shapes the scope and timeline.",
  inputType: 'option_select',
  required: true,
  scopeField: ['S2.recommendedPackage', 'S13.basePackage'],
  options: [
    { value: 'starter',      label: 'Starter — $2,500',    description: 'Clean, focused, everything you need to launch' },
    { value: 'professional', label: 'Professional — $4,500', description: 'More pages, more features, more polish' },
    { value: 'custom',       label: 'Custom — $6,000+',    description: 'Built specifically around your vision' },
    { value: 'not_sure',     label: "I'm not sure yet",    description: "I'll recommend what makes sense based on everything you've shared" },
  ],
}

// Q23
{
  id: 'q23_competitors',
  text: 'Who are your main competitors?',
  subtext: "Seeing their sites helps us make sure yours stands out. Names or website addresses both work.",
  inputType: 'text',
  required: false,
  skippable: true,
  placeholder: 'e.g. "Smith Plumbing, acmeservices.com"',
  scopeField: ['S1.competitorContext', 'S9.competitiveLandscape'],
}

// Q24
{
  id: 'q24_anything_else',
  text: "Last one — anything else we should know before we get started?",
  inputType: 'text',
  required: false,
  skippable: true,
  placeholder: 'Anything at all...',
  scopeField: ['S14.assumptionsClarified', 'S4.additionalContext'],
}
```

---

### Branch: E-Commerce
*Injected after Q7 when Q5 = `ecommerce`*

```typescript
// QE1
{
  id: 'qe1_product_count',
  text: 'How many products are you planning to sell?',
  inputType: 'option_select',
  required: true,
  branch: 'ecommerce',
  scopeField: 'S7.productCatalog.size',
  options: [
    { value: 'under_20',  label: 'Under 20' },
    { value: '20_100',    label: '20–100' },
    { value: '100_500',   label: '100–500' },
    { value: '500_plus',  label: '500+' },
    { value: 'not_sure',  label: 'Not sure yet' },
  ],
}

// QE2
{
  id: 'qe2_variants',
  text: 'Do your products come in variations — like sizes, colors, or styles?',
  inputType: 'option_select',
  required: true,
  branch: 'ecommerce',
  scopeField: 'S7.productCatalog.variants',
  options: [
    { value: 'yes',  label: 'Yes' },
    { value: 'no',   label: 'No, each product is one thing' },
    { value: 'some', label: 'Some do, some don\'t' },
  ],
}

// QE3
{
  id: 'qe3_inventory',
  text: 'Do you need to track stock levels — so things automatically show as out of stock?',
  inputType: 'option_select',
  required: true,
  branch: 'ecommerce',
  scopeField: 'S7.productCatalog.inventory',
  options: [
    { value: 'yes',      label: 'Yes, definitely' },
    { value: 'no',       label: "No, I'll manage that manually" },
    { value: 'not_sure', label: 'Not sure yet' },
  ],
}

// QE4
{
  id: 'qe4_payment_methods',
  text: 'How do you want customers to pay?',
  inputType: 'option_select',
  multiSelect: true,
  required: true,
  branch: 'ecommerce',
  scopeField: 'S7.payments.methods',
  options: [
    { value: 'card',               label: 'Credit / debit card' },
    { value: 'apple_google_pay',   label: 'Apple Pay / Google Pay' },
    { value: 'buy_now_pay_later',  label: 'Buy now, pay later (Afterpay, Klarna)' },
    { value: 'invoice',            label: 'Invoice / pay later' },
  ],
}
```

---

### Branch: App
*Injected after Q7 when Q5 = `app`*

```typescript
// QA1
{
  id: 'qa1_who_logs_in',
  text: 'Who needs to log in to your app?',
  inputType: 'option_select',
  required: true,
  branch: 'app',
  scopeField: ['S7.authentication', 'S7.userRoles'],
  options: [
    { value: 'just_me',    label: 'Just me — it\'s an admin tool' },
    { value: 'customers',  label: 'My customers' },
    { value: 'both',       label: 'Both me and my customers, with different access' },
    { value: 'team',       label: 'My team or staff' },
    { value: 'all_three',  label: 'Me, my team, and my customers' },
  ],
}

// QA2
{
  id: 'qa2_account_actions',
  text: 'What can a logged-in customer actually do?',
  inputType: 'option_select',
  multiSelect: true,
  required: true,
  branch: 'app',
  scopeField: ['S7.userRoles.permissions', 'S7.websiteTypeFeatures'],
  options: [
    { value: 'view_history',        label: 'View their order or appointment history' },
    { value: 'manage_bookings',     label: 'Manage their own bookings' },
    { value: 'download_files',      label: 'Download files or documents' },
    { value: 'message_you',         label: 'Message you directly' },
    { value: 'manage_subscription', label: 'Manage their subscription' },
    { value: 'update_profile',      label: 'Update their own profile or information' },
    { value: 'something_else',      label: 'Something else', allowText: true },
  ],
}

// QA3
{
  id: 'qa3_business_logic',
  text: 'Walk me through how a typical transaction works — from a customer\'s perspective, step by step.',
  inputType: 'textarea',
  required: true,
  branch: 'app',
  scopeField: ['S7.businessLogic', 'S4.companyOverview'],
  placeholder: 'e.g. "A customer browses services → picks a time → pays a deposit → gets a confirmation email → shows up for their appointment."',
  helpText: 'Write it exactly like that — plain steps, in order. This is the most important question for your app.',
}

// QA4
{
  id: 'qa4_data_sensitivity',
  text: 'Does your app handle any sensitive information?',
  inputType: 'option_select',
  multiSelect: true,
  required: true,
  branch: 'app',
  scopeField: ['S7.compliance', 'S15.securityClassification'],
  options: [
    { value: 'health_records',   label: 'Health or medical records' },
    { value: 'payment_data',     label: 'Payment or financial data' },
    { value: 'personal_ids',     label: 'Personal IDs or government documents' },
    { value: 'private_messages', label: 'Private messages between users' },
    { value: 'none',             label: 'Nothing particularly sensitive' },
  ],
}
```

---

### Branch: Content
*Injected after Q18 when Q5 = `blog` OR Q18 = `weekly` / `daily`*

```typescript
// QC1
{
  id: 'qc1_content_types',
  text: 'What kind of content will you be publishing?',
  inputType: 'option_select',
  multiSelect: true,
  required: true,
  branch: 'content',
  scopeField: ['S6.contentTypes', 'S7.websiteTypeFeatures'],
  options: [
    { value: 'articles',        label: 'Articles or blog posts' },
    { value: 'newsletters',     label: 'Email newsletters' },
    { value: 'podcasts',        label: 'Podcast episodes' },
    { value: 'videos',          label: 'Video content' },
    { value: 'case_studies',    label: 'Case studies or project write-ups' },
    { value: 'product_updates', label: 'Product or service updates' },
  ],
}

// QC2
{
  id: 'qc2_multiple_authors',
  text: 'Will more than one person be publishing content?',
  inputType: 'option_select',
  required: true,
  branch: 'content',
  scopeField: ['S7.contentManagement.editors', 'S6.editorialWorkflow'],
  options: [
    { value: 'just_me',     label: 'Just me' },
    { value: 'small_team',  label: 'A small team (2–5 people)' },
    { value: 'larger_team', label: 'A larger team or contributors' },
  ],
}
```

---

## PART 5: STATE MANAGEMENT

### File: `stores/questionnaireStore.ts`

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Answer {
  questionId: string
  value: string | string[]        // string for single, string[] for multiSelect
  textValue?: string              // for allowText options
  answeredAt: string              // ISO timestamp
}

export interface QuestionnaireState {
  // Session
  sessionId: string
  startedAt: string

  // Progress
  answers: Record<string, Answer>
  currentQuestionId: string
  activeBranches: ('ecommerce' | 'app' | 'content')[]
  questionSequence: string[]      // ordered list of question IDs to show
  completedAt: string | null

  // Actions
  setAnswer: (questionId: string, value: string | string[], textValue?: string) => void
  setCurrentQuestion: (questionId: string) => void
  activateBranch: (branch: 'ecommerce' | 'app' | 'content') => void
  buildSequence: () => string[]
  getAnswerValue: (questionId: string) => string | string[] | undefined
  reset: () => void
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      sessionId: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
      answers: {},
      currentQuestionId: 'q1_name',
      activeBranches: [],
      questionSequence: [],
      completedAt: null,

      setAnswer: (questionId, value, textValue) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              questionId,
              value,
              textValue,
              answeredAt: new Date().toISOString(),
            },
          },
        }))

        // Trigger branch activation based on answer
        const { activateBranch } = get()
        if (questionId === 'q5_project_type') {
          if (value === 'ecommerce') activateBranch('ecommerce')
          if (value === 'app') activateBranch('app')
          if (value === 'blog') activateBranch('content')
        }
        if (questionId === 'q7_primary_goal' && value === 'buy_something') {
          activateBranch('ecommerce')
        }
        if (questionId === 'q18_update_frequency') {
          if (value === 'weekly' || value === 'daily') activateBranch('content')
        }
      },

      setCurrentQuestion: (questionId) => set({ currentQuestionId: questionId }),

      activateBranch: (branch) => set((state) => ({
        activeBranches: state.activeBranches.includes(branch)
          ? state.activeBranches
          : [...state.activeBranches, branch],
      })),

      getAnswerValue: (questionId) => {
        return get().answers[questionId]?.value
      },

      buildSequence: () => {
        // Returns the ordered array of question IDs to present
        // based on core questions + active branches + conditional logic
        // Implementation in Part 6 below
        return []
      },

      reset: () => set({
        sessionId: crypto.randomUUID(),
        startedAt: new Date().toISOString(),
        answers: {},
        currentQuestionId: 'q1_name',
        activeBranches: [],
        questionSequence: [],
        completedAt: null,
      }),
    }),
    {
      name: 'introspect-session',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

---

## PART 6: QUESTION SEQUENCE BUILDER

### File: `lib/questionnaire/buildSequence.ts`

This function takes the current answers and active branches and returns the correct ordered array of question IDs. It is the routing logic of the entire questionnaire.

```typescript
import type { Answer } from '@/stores/questionnaireStore'

export function buildSequence(
  answers: Record<string, Answer>,
  activeBranches: string[]
): string[] {
  const sequence: string[] = []
  const getVal = (id: string) => answers[id]?.value

  // Always: Q1–Q7
  sequence.push('q1_name', 'q2_email', 'q3_phone', 'q4_business_name',
    'q5_project_type', 'q6_industry', 'q7_primary_goal')

  // Inject e-commerce branch after Q7 if active
  if (activeBranches.includes('ecommerce')) {
    sequence.push('qe1_product_count', 'qe2_variants', 'qe3_inventory', 'qe4_payment_methods')
  }

  // Inject app branch after Q7 if active
  if (activeBranches.includes('app')) {
    sequence.push('qa1_who_logs_in', 'qa2_account_actions', 'qa3_business_logic', 'qa4_data_sensitivity')
  }

  // Always: Q8 (existing site)
  sequence.push('q8_existing_website')

  // Conditional: Q8a and Q8b if site exists
  const q8 = getVal('q8_existing_website')
  if (q8 === 'yes_migrate' || q8 === 'yes_replace') {
    sequence.push('q8a_current_url', 'q8b_frustrations')
  }

  // Always: Q9–Q16
  sequence.push('q9_logo', 'q10_brand_colors')

  // Conditional: Q10a if has colors
  const q10 = getVal('q10_brand_colors')
  if (q10 === 'yes_exact' || q10 === 'yes_general') {
    sequence.push('q10a_color_entry')
  }

  sequence.push('q11_photography', 'q12_media', 'q13_inspiration',
    'q14_design_style', 'q15_styles_avoid', 'q16_integrations',
    'q17_content_writer', 'q18_update_frequency')

  // Inject content branch after Q18 if active
  if (activeBranches.includes('content')) {
    sequence.push('qc1_content_types', 'qc2_multiple_authors')
  }

  // Always: Q19–Q21
  sequence.push('q19_support', 'q20_domain')

  // Conditional: Q20a if has domain
  if (getVal('q20_domain') === 'yes') {
    sequence.push('q20a_domain_entry')
  }

  sequence.push('q21_timeline')

  // Conditional: Q21a if specific date
  if (getVal('q21_timeline') === 'specific_date') {
    sequence.push('q21a_specific_date')
  }

  // Always: Q22–Q24
  sequence.push('q22_budget', 'q23_competitors', 'q24_anything_else')

  return sequence
}
```

---

## PART 7: UI COMPONENTS

### File Structure
```
src/
  app/
    introspect/
      page.tsx                  ← Entry point, renders QuestionnaireFlow
      layout.tsx                ← Dark theme layout wrapper
  components/
    questionnaire/
      QuestionnaireFlow.tsx     ← Orchestrates question progression
      QuestionCard.tsx          ← Single question display + answer capture
      OptionSelect.tsx          ← Single-select option cards
      MultiSelect.tsx           ← Multi-select option cards
      TextInput.tsx             ← Text / email / tel / url / textarea inputs
      DateInput.tsx             ← Date picker for Q21a
      ProgressBar.tsx           ← Top progress indicator
      NavigationControls.tsx    ← Back / Next / Skip buttons
  stores/
    questionnaireStore.ts
  lib/
    questionnaire/
      buildSequence.ts
      questions.ts              ← All question definitions (from Part 4)
    scope/
      generateScope.ts          ← Claude API call + SCOPE.md assembly
      inferFeatures.ts          ← Feature inference logic
      inferSecurityClassification.ts
  types/
    questionnaire.ts
    scope.ts
```

### QuestionnaireFlow.tsx — Core Orchestrator

```typescript
'use client'

import { useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useQuestionnaireStore } from '@/stores/questionnaireStore'
import { buildSequence } from '@/lib/questionnaire/buildSequence'
import { questions } from '@/lib/questionnaire/questions'
import { QuestionCard } from './QuestionCard'
import { ProgressBar } from './ProgressBar'

export function QuestionnaireFlow() {
  const {
    answers,
    activeBranches,
    currentQuestionId,
    setCurrentQuestion,
    completedAt,
  } = useQuestionnaireStore()

  // Recompute sequence whenever answers or branches change
  const sequence = useMemo(
    () => buildSequence(answers, activeBranches),
    [answers, activeBranches]
  )

  const currentIndex = sequence.indexOf(currentQuestionId)
  const currentQuestion = questions[currentQuestionId]
  const progress = sequence.length > 0 ? (currentIndex / sequence.length) * 100 : 0

  const handleNext = () => {
    const nextId = sequence[currentIndex + 1]
    if (nextId) {
      setCurrentQuestion(nextId)
    } else {
      // All questions answered — trigger SCOPE generation
      handleComplete()
    }
  }

  const handleBack = () => {
    const prevId = sequence[currentIndex - 1]
    if (prevId) setCurrentQuestion(prevId)
  }

  const handleComplete = async () => {
    // Trigger SCOPE generation — single Claude API call
    // Implementation in Part 8
  }

  if (completedAt) {
    return <CompletionScreen />
  }

  return (
    <div className="min-h-screen bg-[oklch(10%_0_0)] flex flex-col">
      <ProgressBar progress={progress} />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  onNext={handleNext}
                  onBack={currentIndex > 0 ? handleBack : undefined}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
```

### QuestionCard.tsx

```typescript
'use client'

import { useState } from 'react'
import { useQuestionnaireStore } from '@/stores/questionnaireStore'
import { OptionSelect } from './OptionSelect'
import { MultiSelect } from './MultiSelect'
import { TextInput } from './TextInput'
import type { Question } from '@/types/questionnaire'

interface QuestionCardProps {
  question: Question
  onNext: () => void
  onBack?: () => void
}

export function QuestionCard({ question, onNext, onBack }: QuestionCardProps) {
  const { answers, setAnswer } = useQuestionnaireStore()
  const currentAnswer = answers[question.id]

  const canProceed = question.required
    ? !!currentAnswer?.value
    : true  // Optional/skippable questions always allow proceed

  const handleAnswer = (value: string | string[], textValue?: string) => {
    setAnswer(question.id, value, textValue)
  }

  return (
    <div className="space-y-8">
      {/* Question text */}
      <div className="space-y-2">
        <h2 className="text-[1.777rem] leading-[1.3] text-[oklch(95%_0_0)] font-medium">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="text-[oklch(60%_0_0)] text-base leading-[1.6]">
            {question.subtext}
          </p>
        )}
      </div>

      {/* Input */}
      <div>
        {question.inputType === 'option_select' && !question.multiSelect && (
          <OptionSelect
            options={question.options ?? []}
            value={currentAnswer?.value as string}
            textValue={currentAnswer?.textValue}
            onChange={handleAnswer}
          />
        )}
        {question.inputType === 'option_select' && question.multiSelect && (
          <MultiSelect
            options={question.options ?? []}
            value={(currentAnswer?.value as string[]) ?? []}
            max={question.multiSelectMax}
            onChange={handleAnswer}
          />
        )}
        {(question.inputType === 'text' || question.inputType === 'textarea') && (
          <TextInput
            inputType={question.inputType}
            inputMode={question.inputMode}
            value={(currentAnswer?.value as string) ?? ''}
            placeholder={question.placeholder}
            helpText={question.helpText}
            onChange={(val) => handleAnswer(val)}
          />
        )}
        {question.inputType === 'date' && (
          <DateInput
            value={(currentAnswer?.value as string) ?? ''}
            onChange={(val) => handleAnswer(val)}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 pt-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-[oklch(60%_0_0)] text-sm hover:text-[oklch(95%_0_0)] transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="flex-1" />
        {question.skippable && (
          <button
            onClick={onNext}
            className="text-[oklch(60%_0_0)] text-sm hover:text-[oklch(95%_0_0)] transition-colors"
          >
            Skip
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            px-6 py-3 rounded-lg text-sm font-medium transition-all duration-150
            ${canProceed
              ? 'bg-[oklch(58%_0.20_240)] text-white hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-[oklch(25%_0_0)] text-[oklch(50%_0_0)] cursor-not-allowed'
            }
          `}
        >
          {question.inputType === 'option_select' ? 'Continue' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
```

### OptionSelect.tsx

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Option } from '@/types/questionnaire'

interface OptionSelectProps {
  options: Option[]
  value?: string
  textValue?: string
  onChange: (value: string, textValue?: string) => void
}

export function OptionSelect({ options, value, textValue, onChange }: OptionSelectProps) {
  const [localText, setLocalText] = useState(textValue ?? '')

  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isSelected = value === option.value
        return (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value, option.allowText ? localText : undefined)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              w-full text-left px-5 py-4 rounded-xl border transition-all duration-150
              ${isSelected
                ? 'border-[oklch(58%_0.20_240)] bg-[oklch(58%_0.20_240)]/10 text-[oklch(95%_0_0)]'
                : 'border-[oklch(25%_0_0)] bg-[oklch(15%_0_0)] text-[oklch(80%_0_0)] hover:border-[oklch(40%_0_0)] hover:text-[oklch(95%_0_0)]'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                ${isSelected
                  ? 'border-[oklch(58%_0.20_240)] bg-[oklch(58%_0.20_240)]'
                  : 'border-[oklch(40%_0_0)]'
                }
              `}>
                {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{option.label}</div>
                {option.description && (
                  <div className="text-[oklch(60%_0_0)] text-xs mt-0.5 leading-relaxed">
                    {option.description}
                  </div>
                )}
                {/* Text input for "Something else" or named integrations */}
                {isSelected && option.allowText && (
                  <input
                    type="text"
                    value={localText}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      setLocalText(e.target.value)
                      onChange(option.value, e.target.value)
                    }}
                    placeholder="Tell us more..."
                    className="mt-2 w-full bg-transparent border-b border-[oklch(40%_0_0)] text-[oklch(95%_0_0)] text-sm pb-1 outline-none placeholder:text-[oklch(50%_0_0)] focus:border-[oklch(58%_0.20_240)]"
                  />
                )}
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
```

---

## PART 8: SCOPE GENERATION

### File: `lib/scope/generateScope.ts`

This is the single Claude API call. It fires after Q24 is answered. It receives the complete answers object and returns the SCOPE.md markdown string.

```typescript
import { buildScopePrompt } from './buildScopePrompt'
import { inferFeatures } from './inferFeatures'
import { inferSecurityClassification } from './inferSecurityClassification'
import type { Answer } from '@/stores/questionnaireStore'

export async function generateScope(
  answers: Record<string, Answer>,
  activeBranches: string[]
): Promise<{ scopeMd: string; clientSummary: string }> {

  const features = inferFeatures(answers, activeBranches)
  const security = inferSecurityClassification(answers)

  const prompt = buildScopePrompt(answers, features, security)

  const response = await fetch('/api/generate-scope', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) throw new Error('Scope generation failed')
  return response.json()
}
```

### File: `app/api/generate-scope/route.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(request: Request) {
  const { prompt } = await request.json()

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  // Parse the two documents from Claude's response
  // Claude is instructed to return JSON with { scopeMd, clientSummary }
  const parsed = JSON.parse(content.text)

  return NextResponse.json(parsed)
}
```

### File: `lib/scope/buildScopePrompt.ts`

```typescript
import type { Answer } from '@/stores/questionnaireStore'

export function buildScopePrompt(
  answers: Record<string, Answer>,
  inferredFeatures: string[],
  securityClassification: 'low' | 'medium' | 'high' | 'critical'
): string {
  const get = (id: string) => {
    const answer = answers[id]
    if (!answer) return 'Not provided'
    if (Array.isArray(answer.value)) {
      const vals = answer.value.join(', ')
      return answer.textValue ? `${vals} (${answer.textValue})` : vals
    }
    return answer.textValue
      ? `${answer.value} (${answer.textValue})`
      : answer.value
  }

  return `You are generating a complete technical specification document (SCOPE.md) for a web development project.

Return your response as a JSON object with exactly two keys:
- "scopeMd": the complete internal SCOPE.md markdown document (for the developer)  
- "clientSummary": a professional client-facing summary (for the client PDF, no technical details, no pricing breakdowns, no feature lists)

## CLIENT INTAKE DATA

**Contact Information:**
- Name: ${get('q1_name')}
- Email: ${get('q2_email')}
- Phone: ${get('q3_phone')}
- Business: ${get('q4_business_name')}

**Project:**
- Type: ${get('q5_project_type')}
- Industry: ${get('q6_industry')}
- Primary Goal: ${get('q7_primary_goal')}

**Existing Site:**
- Has site: ${get('q8_existing_website')}
- URL: ${get('q8a_current_url')}
- Frustrations: ${get('q8b_frustrations')}

**Brand Assets:**
- Logo: ${get('q9_logo')}
- Colors: ${get('q10_brand_colors')} — ${get('q10a_color_entry')}
- Photography: ${get('q11_photography')}

**Media & Design:**
- Video/Interactive: ${get('q12_media')}
- Inspiration sites: ${get('q13_inspiration')}
- Design style: ${get('q14_design_style')}
- Styles to avoid: ${get('q15_styles_avoid')}

**Technical:**
- Existing integrations: ${get('q16_integrations')}
- Domain: ${get('q20_domain')} — ${get('q20a_domain_entry')}

**Content:**
- Who writes content: ${get('q17_content_writer')}
- Update frequency: ${get('q18_update_frequency')}

**Support & Timeline:**
- Post-launch support: ${get('q19_support')}
- Timeline: ${get('q21_timeline')} — ${get('q21a_specific_date')}

**Budget:**
- Selected range: ${get('q22_budget')}

**Context:**
- Competitors: ${get('q23_competitors')}
- Additional notes: ${get('q24_anything_else')}

${answers['qe1_product_count'] ? `
**E-Commerce:**
- Product count: ${get('qe1_product_count')}
- Variants: ${get('qe2_variants')}
- Inventory tracking: ${get('qe3_inventory')}
- Payment methods: ${get('qe4_payment_methods')}
` : ''}

${answers['qa1_who_logs_in'] ? `
**App / Portal:**
- Who logs in: ${get('qa1_who_logs_in')}
- Customer actions: ${get('qa2_account_actions')}
- Business logic: ${get('qa3_business_logic')}
- Data sensitivity: ${get('qa4_data_sensitivity')}
` : ''}

${answers['qc1_content_types'] ? `
**Content Publishing:**
- Content types: ${get('qc1_content_types')}
- Multiple authors: ${get('qc2_multiple_authors')}
` : ''}

## INFERRED FEATURES (Do not expose to client — internal use only)
${inferredFeatures.join('\n')}

## SECURITY CLASSIFICATION: ${securityClassification.toUpperCase()}

## SCOPE.md REQUIREMENTS

Generate all 15 sections. No placeholder text. No "TBD". Every section must be complete and developer-ready.

Sections:
1. Executive Summary
2. Project Classification (include recommended package with rationale)
3. Client Information
4. Business Context (synthesize target audience from industry + type + goal — do not ask what wasn't asked)
5. Brand Assets & Identity
6. Content Strategy
7. Technical Specifications (include auth, CMS, integrations, compliance, performance)
8. Media & Interactive Elements
9. Design Direction
10. Features & Functionality (based ONLY on inferred features — list each with implementation rationale)
11. Post-Launch Support Plan
12. Project Timeline (realistic milestones with client responsibilities)
13. Investment Summary (package price + any complexity adjustments — no line-item feature pricing)
14. Validation Outcomes
15. Security Classification (internal only — never appears in clientSummary)

## CLIENT SUMMARY REQUIREMENTS

The clientSummary is a warm, professional document the client receives via email. It must:
- Explain the project vision in plain language
- Confirm what was understood about their goals
- Describe what will be built (without technical implementation details)
- State the investment and timeline clearly
- Outline next steps
- Never mention specific features with individual prices
- Never mention security classification
- Never use technical jargon`
}
```

### File: `lib/scope/inferFeatures.ts`

```typescript
import type { Answer } from '@/stores/questionnaireStore'

export function inferFeatures(
  answers: Record<string, Answer>,
  activeBranches: string[]
): string[] {
  const features: string[] = []
  const get = (id: string) => answers[id]?.value
  const has = (id: string, val: string) => {
    const v = get(id)
    return Array.isArray(v) ? v.includes(val) : v === val
  }

  // Always included
  features.push('Responsive design (mobile, tablet, desktop)')
  features.push('SSL certificate')
  features.push('Basic SEO (meta tags, sitemap, robots.txt)')
  features.push('Contact form')
  features.push('Google Analytics integration')
  features.push('Performance optimization')

  // Goal-based
  if (has('q7_primary_goal', 'book_appointment')) features.push('Appointment scheduling system with calendar sync and automated reminders')
  if (has('q7_primary_goal', 'call_contact')) features.push('Click-to-call button', 'Contact form with email notification')
  if (has('q7_primary_goal', 'get_a_quote')) features.push('Multi-step quote request form')
  if (has('q7_primary_goal', 'find_my_location')) features.push('Google Maps embed', 'Business hours display')
  if (has('q7_primary_goal', 'sign_up')) features.push('User authentication system', 'Account creation flow')

  // Type-based
  const type = get('q5_project_type')
  if (type === 'restaurant') features.push('Menu display system', 'Hours and location page', 'Online reservation or booking')
  if (type === 'portfolio') features.push('Project gallery with filtering', 'Case study layout')
  if (type === 'nonprofit') features.push('Donation system', 'Event calendar', 'Volunteer signup form')
  if (type === 'blog') features.push('Blog system with categories and tags', 'RSS feed')

  // Industry-based
  const industry = get('q6_industry')
  if (industry === 'health_wellness' || industry === 'beauty_personal' || industry === 'fitness') {
    features.push('Appointment scheduling system', 'SMS appointment reminders')
  }
  if (industry === 'home_services' || industry === 'automotive') {
    features.push('Service area map or description', 'Quote request form')
  }
  if (industry === 'legal_financial') {
    features.push('Secure contact form', 'Privacy policy compliance page')
  }

  // Photography / media
  if (has('q11_photography', 'have_great')) features.push('Professional photo gallery')
  if (has('q12_media', 'yes_embed')) features.push('Embedded video component')
  if (has('q12_media', 'yes_background')) features.push('Hero background video with performance optimization')
  if (has('q12_media', 'yes_interactive')) features.push('Custom interactive component (calculator, quiz, or configurator)')

  // Content management
  const updateFreq = get('q18_update_frequency')
  if (updateFreq === 'weekly' || updateFreq === 'daily') features.push('Content Management System (CMS) with visual editor')
  if (updateFreq === 'daily') features.push('Advanced caching strategy for high-frequency updates')

  // Support tier
  if (has('q19_support', 'handle_it_for_me')) features.push('Managed hosting with monitoring and automated backups')
  if (has('q19_support', 'some_help')) features.push('Managed hosting with standard monitoring')

  // Integrations
  const integrations = get('q16_integrations') as string[] | undefined
  if (integrations) {
    if (integrations.includes('email_marketing')) features.push('Email marketing platform integration')
    if (integrations.includes('booking_system')) features.push('Existing booking system integration or migration')
    if (integrations.includes('crm')) features.push('CRM integration')
    if (integrations.includes('payment_processor')) features.push('Existing payment processor integration')
    if (integrations.includes('pos_system')) features.push('POS system integration')
    if (integrations.includes('accounting')) features.push('Accounting software integration')
    if (integrations.includes('social_media')) features.push('Social media feed integration')
  }

  // E-commerce branch
  if (activeBranches.includes('ecommerce')) {
    features.push('E-commerce storefront with product catalog')
    features.push('Shopping cart and secure checkout')
    if (has('qe2_variants', 'yes') || has('qe2_variants', 'some')) features.push('Product variant system (sizes, colors, styles)')
    if (has('qe3_inventory', 'yes')) features.push('Real-time inventory tracking with out-of-stock automation')
    const payMethods = get('qe4_payment_methods') as string[] | undefined
    if (payMethods?.includes('apple_google_pay')) features.push('Apple Pay / Google Pay')
    if (payMethods?.includes('buy_now_pay_later')) features.push('Buy now, pay later (Afterpay / Klarna)')
    const productCount = get('qe1_product_count')
    if (productCount === '500_plus') features.push('Advanced inventory management system', 'Bulk product import/export')
  }

  // App branch
  if (activeBranches.includes('app')) {
    features.push('User authentication system')
    const whoLogsIn = get('qa1_who_logs_in')
    if (whoLogsIn === 'both' || whoLogsIn === 'all_three') features.push('Role-based access control (admin, staff, customer roles)')
    const actions = get('qa2_account_actions') as string[] | undefined
    if (actions?.includes('manage_bookings')) features.push('Customer booking management portal')
    if (actions?.includes('download_files')) features.push('Secure file storage and download system')
    if (actions?.includes('manage_subscription')) features.push('Subscription management with recurring billing')
    if (actions?.includes('message_you')) features.push('Internal messaging system')
    features.push('Admin dashboard')
  }

  // Content branch
  if (activeBranches.includes('content')) {
    const contentTypes = get('qc1_content_types') as string[] | undefined
    if (contentTypes?.includes('newsletters')) features.push('Newsletter system with subscriber management')
    if (contentTypes?.includes('podcasts')) features.push('Podcast player and episode management')
    if (contentTypes?.includes('videos')) features.push('Video content management')
    const authors = get('qc2_multiple_authors')
    if (authors === 'small_team' || authors === 'larger_team') features.push('Multi-author CMS with editorial roles and approval workflow')
  }

  // Deduplicate
  return [...new Set(features)]
}
```

### File: `lib/scope/inferSecurityClassification.ts`

```typescript
import type { Answer } from '@/stores/questionnaireStore'

export function inferSecurityClassification(
  answers: Record<string, Answer>
): 'low' | 'medium' | 'high' | 'critical' {
  const get = (id: string) => answers[id]?.value
  const has = (id: string, val: string) => {
    const v = get(id)
    return Array.isArray(v) ? v.includes(val) : v === val
  }

  // Critical signals
  if (has('qa4_data_sensitivity', 'health_records')) return 'critical'
  if (has('qa4_data_sensitivity', 'personal_ids')) return 'critical'
  if (get('q6_industry') === 'legal_financial') return 'critical'

  // High signals
  if (has('qa4_data_sensitivity', 'payment_data')) return 'high'
  if (has('qa4_data_sensitivity', 'private_messages')) return 'high'
  if (get('q6_industry') === 'health_wellness') return 'high'
  if (get('q5_project_type') === 'ecommerce') return 'high'
  if (get('q5_project_type') === 'app') return 'high'
  if (has('q7_primary_goal', 'sign_up')) return 'high'

  // Medium signals
  if (has('q7_primary_goal', 'book_appointment')) return 'medium'
  if (has('q7_primary_goal', 'buy_something')) return 'medium'
  if (has('q16_integrations', 'payment_processor')) return 'medium'

  return 'low'
}
```

---

## PART 9: EMAIL DELIVERY

### File: `app/api/send-scope/route.ts`

```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { scopeMd, clientSummary, clientName, clientEmail } = await request.json()

  // Send SCOPE.md to David
  await resend.emails.send({
    from: 'Introspect <introspect@applicreations.com>',
    to: 'david1984moore@gmail.com',
    subject: `New Project Scope: ${clientName}`,
    text: scopeMd,
    attachments: [{
      filename: `SCOPE_${clientName.replace(/\s+/g, '_')}_${Date.now()}.md`,
      content: Buffer.from(scopeMd).toString('base64'),
    }],
  })

  // Send client summary to client
  await resend.emails.send({
    from: 'David Moore <david@applicreations.com>',
    to: clientEmail,
    subject: `Your Project Summary — ${clientName}`,
    html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${clientSummary}</pre>`,
  })

  return NextResponse.json({ success: true })
}
```

---

## PART 10: ENVIRONMENT VARIABLES

```env
ANTHROPIC_API_KEY=sk-...
RESEND_API_KEY=re_...
```

---

## PART 11: ANTI-PATTERNS — DO NOT DO THESE

Read this section carefully. These are the most common mistakes.

❌ **Do not create a chat interface.** There is no message thread. No assistant bubble. No user bubble. One question at a time, full stop.

❌ **Do not show features to the client.** No chip selector. No pricing breakdown in the UI. No feature menu of any kind. Features are inferred by the generator after all questions are answered.

❌ **Do not call the Claude API between questions.** The API is called exactly once — after Q24. Any API call triggered by individual question answers is wrong.

❌ **Do not add a feature flag or toggle for dark mode.** The entire `/introspect` route is dark. Always. Detect with `usePathname` and apply globally.

❌ **Do not use `align-items: stretch` on the option grid.** Cards must be `h-auto` with `items-start` on the container to prevent all cards expanding to match the tallest one.

❌ **Do not put "Step X of Y" anywhere in the UI.** Use the progress bar only. No numeric step indicators.

❌ **Do not make Q3 (phone) or Q13 (inspiration links) or Q15 (styles to avoid) or Q23 (competitors) or Q24 (anything else) required.** These are explicitly skippable.

❌ **Do not reorder the questions.** The sequence defined in `buildSequence.ts` is the sequence. Do not reinterpret it.

❌ **Do not use `localStorage` in Server Components.** All store access happens in Client Components only.

---

## PART 12: SUCCESS CRITERIA

The implementation is correct when:

✅ All 24 core questions appear in the correct order  
✅ E-commerce branch (QE1–QE4) injects after Q7 when Q5 = `ecommerce`  
✅ App branch (QA1–QA4) injects after Q7 when Q5 = `app`  
✅ Content branch (QC1–QC2) injects after Q18 when Q5 = `blog` OR Q18 = `weekly`/`daily`  
✅ Conditional questions (Q8a, Q8b, Q10a, Q20a, Q21a) appear only when their condition is met  
✅ Multi-select questions (Q12, Q14, Q16, QE4, QA2, QA4, QC1) allow multiple selections  
✅ Q14 enforces max 3 selections  
✅ Skippable questions (Q3, Q13, Q15, Q23, Q24) show a Skip button and allow progression without an answer  
✅ Claude API called exactly once, after Q24  
✅ `inferFeatures.ts` produces the correct feature list without any client input  
✅ `inferSecurityClassification.ts` correctly elevates classification based on industry and data sensitivity  
✅ SCOPE.md email delivered to david1984moore@gmail.com  
✅ Client summary email delivered to the email address from Q2  
✅ Zustand store persists to localStorage — refreshing mid-questionnaire resumes from the same question  
✅ Framer Motion transitions are present on question changes — no jarring cuts  
✅ Dark theme applied consistently across all `/introspect` routes  
✅ No `<form>` HTML elements anywhere — all interactions via React event handlers  
