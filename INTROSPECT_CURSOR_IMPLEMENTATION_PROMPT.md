# INTROSPECT — STATIC QUESTIONNAIRE IMPLEMENTATION PROMPT
**For Cursor AI | Complete Build From Scratch**
**Version:** 2.0 | Static Smart Questionnaire (No Claude API During Form Completion)

---

## CRITICAL ARCHITECTURAL CONSTRAINTS — READ BEFORE WRITING ANY CODE

This is NOT a chatbot. This is NOT an AI-orchestrated conversation. This is a static multi-page questionnaire with deterministic conditional logic. Violating these constraints is the most common failure mode.

**Architecture is:**
```
User fills out form → Client-side conditional logic → State accumulates → SCOPE.md generated → Emails sent
```

**Architecture is NOT:**
```
User answers question → Claude API called → Claude generates next question → repeat
```

There are ZERO Claude API calls during the questionnaire flow. The only Claude API usage in this entire system is the SCOPE.md generation step at the very end, after all 33 questions are answered.

**One question per screen.** Not one page of many questions. One question, full screen, clean. User answers, presses continue, next question appears. This is the entire UX model.

**Anti-patterns to actively prevent:**
- Do not build a chat interface
- Do not build a multi-question page
- Do not call any API between questions
- Do not show question numbers (e.g., "Question 4 of 33") — show only a progress bar
- Do not use a sidebar or persistent navigation
- Do not show all questions at once as a form

---

## TECH STACK

```
Framework:     Next.js 15.x (App Router)
Language:      TypeScript 5.x (strict mode)
Styling:       Tailwind CSS v4
Fonts:         Apple system font stack (no Google Fonts)
Animations:    Framer Motion
State:         Zustand (with localStorage persistence)
Email:         Resend
UI Primitives: Radix UI
Icons:         Lucide React
```

---

## DESIGN SYSTEM

These rules are non-negotiable. Apply them everywhere.

**Typography — Perfect Fourth Scale (1.333 ratio):**
```
xs:   0.75rem   (12px)
sm:   1rem      (16px)  — body default
md:   1.333rem  (21px)
lg:   1.777rem  (28px)
xl:   2.369rem  (38px)
2xl:  3.157rem  (51px)
```

**Spacing — 8-point grid:**
All spacing values must be multiples of 8px: 8, 16, 24, 32, 40, 48, 64, 80, 96

**Colors — OKLCH system:**
```css
--color-primary:     oklch(0.45 0.18 250)    /* Deep blue */
--color-primary-hover: oklch(0.40 0.18 250)
--color-surface:     oklch(0.99 0.002 250)   /* Near white */
--color-border:      oklch(0.90 0.005 250)
--color-text:        oklch(0.15 0.01 250)    /* Near black */
--color-text-muted:  oklch(0.50 0.01 250)
--color-success:     oklch(0.55 0.15 145)
--color-error:       oklch(0.50 0.20 25)
```

**Whitespace Philosophy:** 70% of the screen should be white space. Questions should feel isolated, calm, and focused. Never crowd the UI.

**Animations:** Subtle only. Question transitions: fade + slight upward movement (y: 8px → 0, opacity: 0 → 1, duration: 0.25s ease-out). No bouncing, no sliding panels, no distracting motion.

---

## FILE STRUCTURE

Create this exact structure:

```
src/
├── app/
│   ├── page.tsx                          ← Landing/entry point, redirects to /intake
│   ├── intake/
│   │   ├── page.tsx                      ← Questionnaire shell (progress bar + question renderer)
│   │   └── complete/
│   │       └── page.tsx                  ← Completion screen
│   └── api/
│       ├── generate-scope/
│       │   └── route.ts                  ← Generates SCOPE.md using Claude API (POST)
│       └── send-emails/
│           └── route.ts                  ← Sends emails via Resend (POST)
│
├── components/
│   ├── intake/
│   │   ├── QuestionShell.tsx             ← Outer wrapper: progress bar + animation container
│   │   ├── QuestionRenderer.tsx          ← Routes question type to correct input component
│   │   ├── inputs/
│   │   │   ├── TextInput.tsx             ← Single-line text
│   │   │   ├── TextArea.tsx              ← Multi-line text
│   │   │   ├── SingleSelect.tsx          ← Radio cards (big tap targets)
│   │   │   ├── MultiSelect.tsx           ← Checkbox cards
│   │   │   ├── UrlInput.tsx              ← URL field with validation
│   │   │   ├── UrlListInput.tsx          ← Multiple URL fields (inspiration page)
│   │   │   └── PhoneInput.tsx            ← Phone with format hint
│   │   └── ProgressBar.tsx               ← Thin bar at top, no numbers
│   │
│   └── ui/
│       ├── Button.tsx
│       └── Card.tsx
│
├── lib/
│   ├── questions/
│   │   ├── index.ts                      ← Exports getNextQuestion(), getAllVisibleQuestions()
│   │   ├── questionBank.ts               ← All 33 questions defined as data
│   │   ├── conditionalLogic.ts           ← Pure functions: should question show given answers?
│   │   └── industryDetection.ts          ← Keyword → industry/type inference from business name
│   │
│   ├── scopeGeneration/
│   │   ├── generateScope.ts              ← Maps intelligence object → SCOPE.md string
│   │   ├── securitySection.ts            ← Generates Section 15 based on project profile
│   │   └── clientSummary.ts              ← Generates client-facing PDF content
│   │
│   └── email/
│       └── sendDocuments.ts              ← Orchestrates Resend email delivery
│
├── stores/
│   └── intakeStore.ts                    ← Zustand store: answers, currentQuestionId, progress
│
└── types/
    ├── questions.ts                      ← Question, Answer, QuestionType interfaces
    └── intelligence.ts                   ← Intelligence object (all gathered data)
```

---

## CORE DATA MODEL

### types/questions.ts

```typescript
export type QuestionType =
  | 'text'
  | 'email'
  | 'phone'
  | 'textarea'
  | 'single_select'
  | 'multi_select'
  | 'url'
  | 'url_list'

export interface SelectOption {
  value: string
  label: string
  helperText?: string
}

export interface Question {
  id: string                                    // e.g., 'q1_name'
  type: QuestionType
  text: string                                  // The question text shown to user
  helperText?: string                           // Subtext below question
  placeholder?: string
  options?: SelectOption[]                      // For select types
  required: boolean
  minLength?: number
  maxLength?: number
  showIf?: (answers: Record<string, Answer>) => boolean  // Conditional display
  otherOption?: boolean                         // Adds "Something else" with text input
}

export interface Answer {
  questionId: string
  value: string | string[]
  otherText?: string                            // When "Something else" is selected
}
```

### types/intelligence.ts

```typescript
export interface Intelligence {
  // Contact
  name: string
  email: string
  phone?: string
  businessName: string

  // Project
  websiteType: string
  industry: string
  primaryGoal: string
  successVision: string
  targetAudience: string
  differentiator: string

  // Inspiration
  inspirationUrls: string[]
  inspirationStyles: string[]
  stylestoAvoid?: string

  // Current situation
  hasExistingWebsite: boolean
  existingUrl?: string
  existingFrustrations?: string[]

  // Brand
  hasLogo: 'yes_professional' | 'yes_needs_work' | 'no' | 'not_sure'
  hasBrandColors: 'yes' | 'no' | 'not_sure'
  brandColors?: string
  hasPhotos: 'yes_professional' | 'yes_casual' | 'no'

  // Content
  contentProvider: 'client' | 'collaborative' | 'agency'
  updateFrequency: 'regularly' | 'occasionally' | 'rarely'

  // Features
  needsUserAccounts: boolean
  needsEcommerce: boolean
  needsCMS: boolean
  needsBooking: boolean
  needsBlog: boolean
  needsLiveChat: boolean
  additionalFeatures?: string[]

  // Technical
  domainStatus: 'have_domain' | 'need_domain' | 'not_sure'
  existingDomain?: string
  hostingPreference?: string

  // Business
  budget?: string
  timeline?: string
  competitors?: string
  additionalContext?: string

  // Computed
  selectedPackage?: 'starter' | 'professional' | 'custom'
  estimatedPrice?: number
  riskLevel?: 'low' | 'medium' | 'high' | 'critical'
}
```

---

## THE 33 QUESTIONS — COMPLETE QUESTION BANK

Define all questions in `lib/questions/questionBank.ts` as a typed array.

### Page 1 — Let's Get Started (Q1–Q4)

```typescript
{
  id: 'q1_name',
  type: 'text',
  text: "What's your name?",
  placeholder: 'First and last name',
  required: true
},
{
  id: 'q2_email',
  type: 'email',
  text: "What's your email address?",
  placeholder: 'you@example.com',
  required: true
},
{
  id: 'q3_phone',
  type: 'phone',
  text: 'Phone number (optional)',
  placeholder: '(555) 123-4567',
  helperText: "We'll only call if we need to clarify something about your project",
  required: false
},
{
  id: 'q4_business_name',
  type: 'text',
  text: "What's the name of your business or project?",
  placeholder: 'e.g., Smith & Associates, My Photography Portfolio',
  helperText: 'This is just for us — it will appear in your proposal',
  required: true
  // NOTE: After this is answered, run industryDetection() to pre-fill q5 and q6 suggestions
}
```

### Page 2 — Your Website (Q5–Q6)

```typescript
{
  id: 'q5_website_type',
  type: 'single_select',
  text: 'What type of website do you need?',
  required: true,
  options: [
    { value: 'business', label: 'Business website', helperText: 'Showcase your services and attract customers' },
    { value: 'ecommerce', label: 'Online store', helperText: 'Sell products or services directly online' },
    { value: 'portfolio', label: 'Portfolio', helperText: 'Show off your work and get hired' },
    { value: 'nonprofit', label: 'Non-profit or cause', helperText: 'Drive donations, volunteers, or awareness' },
    { value: 'blog', label: 'Blog or content site', helperText: 'Publish articles, guides, or media' },
    { value: 'landing_page', label: 'Single landing page', helperText: 'One focused page for a campaign or offer' }
  ],
  otherOption: true
},
{
  id: 'q6_industry',
  type: 'single_select',
  text: 'What industry or field are you in?',
  required: true,
  // Options list changes based on q5 answer — see conditionalLogic.ts
  // Default full list shown below
  options: [
    { value: 'professional_services', label: 'Professional services', helperText: 'Law, accounting, consulting, finance' },
    { value: 'healthcare', label: 'Healthcare & medical', helperText: 'Doctors, therapists, wellness professionals' },
    { value: 'real_estate', label: 'Real estate', helperText: 'Agents, brokers, property management' },
    { value: 'construction', label: 'Construction & trades', helperText: 'Contractors, plumbers, electricians' },
    { value: 'food_beverage', label: 'Restaurants & food', helperText: 'Restaurants, catering, food products' },
    { value: 'creative', label: 'Creative services', helperText: 'Design, photography, videography, art' },
    { value: 'technology', label: 'Technology & software', helperText: 'SaaS, apps, IT services' },
    { value: 'education', label: 'Education & coaching', helperText: 'Schools, tutors, online courses, coaches' },
    { value: 'retail', label: 'Retail & products', helperText: 'Shops, boutiques, product brands' },
    { value: 'nonprofit_sector', label: 'Non-profit & community', helperText: 'Charities, foundations, community orgs' },
    { value: 'beauty_wellness', label: 'Beauty & wellness', helperText: 'Salons, spas, fitness, yoga' },
    { value: 'hospitality', label: 'Hospitality & events', helperText: 'Hotels, venues, event planning' }
  ],
  otherOption: true
}
```

### Page 3 — Your Vision (Q7–Q10)

```typescript
{
  id: 'q7_primary_goal',
  type: 'single_select',
  text: 'When someone visits your website, what\'s the ONE thing you want them to do?',
  required: true,
  options: [
    { value: 'contact_quote', label: 'Contact me or request a quote' },
    { value: 'purchase', label: 'Buy something' },
    { value: 'hire_me', label: 'Learn about my work and hire me' },
    { value: 'sign_up', label: 'Sign up or join something' },
    { value: 'build_trust', label: 'Trust me and choose my business over competitors' },
    { value: 'find_info', label: 'Find information they need' },
    { value: 'donate', label: 'Donate or support a cause' }
  ],
  otherOption: true
},
{
  id: 'q8_success_vision',
  type: 'textarea',
  text: 'Imagine your website is up and running perfectly. What does success look like 6 months from now?',
  placeholder: 'More customers calling? Online sales tripled? Better brand recognition in your area? Be as specific as you like.',
  helperText: 'The more specific you are, the better we can design toward your actual goals',
  required: true,
  minLength: 30
},
{
  id: 'q9_target_audience',
  type: 'single_select',
  text: 'Who will be visiting your website?',
  required: true,
  options: [
    { value: 'local_consumers', label: 'Local customers in my area' },
    { value: 'national_consumers', label: 'Customers anywhere in the country' },
    { value: 'businesses_b2b', label: 'Other businesses (B2B)' },
    { value: 'professionals', label: 'Professionals in my industry' },
    { value: 'community', label: 'Community members or supporters' },
    { value: 'mix', label: 'A mix of different people' }
  ],
  otherOption: true
},
{
  id: 'q10_differentiator',
  type: 'textarea',
  text: 'What makes you different from others doing what you do?',
  placeholder: 'What would your best customer say about why they chose you? What do you do that competitors don\'t?',
  required: true,
  minLength: 30
}
```

### Page 4 — Website Inspiration (Q11–Q13)

```typescript
{
  id: 'q11_inspiration_urls',
  type: 'url_list',
  text: 'Show us websites you love',
  helperText: 'Paste up to 5 website addresses of sites you really like — they don\'t have to be in your industry. Just sites that make you think "I want my site to feel like this."',
  placeholder: 'https://example.com',
  required: false
  // UI renders 5 URL input fields, each optional
},
{
  id: 'q12_inspiration_styles',
  type: 'multi_select',
  text: 'What do you love about those websites?',
  helperText: 'Select everything that resonates — even if you didn\'t add any URLs above',
  required: false,
  options: [
    { value: 'clean_simple', label: 'Clean and simple design' },
    { value: 'professional_trustworthy', label: 'Professional and trustworthy feel' },
    { value: 'bold_eyecatching', label: 'Bold and eye-catching' },
    { value: 'easy_navigation', label: 'Easy to navigate and find things' },
    { value: 'beautiful_photos', label: 'Beautiful photos and images' },
    { value: 'modern_fresh', label: 'Modern and fresh looking' },
    { value: 'clear_messaging', label: 'Clear messaging — I immediately understand what they do' },
    { value: 'mobile_first', label: 'Works great on my phone' },
    { value: 'fast_responsive', label: 'Fast and snappy' }
  ],
  otherOption: true
},
{
  id: 'q13_styles_to_avoid',
  type: 'textarea',
  text: 'Are there any styles or approaches you definitely don\'t want?',
  placeholder: 'e.g., "Nothing too corporate", "No dark backgrounds", "Not cluttered like my competitor\'s site"',
  required: false
}
```

### Page 5 — Where You Are Now (Q14–Q16)

```typescript
{
  id: 'q14_has_website',
  type: 'single_select',
  text: 'Do you currently have a website?',
  required: true,
  options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No, this is a new project' }
  ]
},
{
  id: 'q15_existing_url',
  type: 'url',
  text: 'What\'s your current website address?',
  placeholder: 'https://www.yoursite.com',
  required: false,
  showIf: (answers) => answers['q14_has_website']?.value === 'yes'
},
{
  id: 'q16_existing_frustrations',
  type: 'multi_select',
  text: 'What\'s frustrating about your current website?',
  helperText: 'Select everything that applies',
  required: false,
  showIf: (answers) => answers['q14_has_website']?.value === 'yes',
  options: [
    { value: 'looks_outdated', label: 'It looks outdated or unprofessional' },
    { value: 'not_mobile', label: 'Doesn\'t work well on phones' },
    { value: 'cant_update', label: 'I can\'t update it myself' },
    { value: 'not_in_google', label: 'Not showing up in Google searches' },
    { value: 'not_converting', label: 'Not bringing in customers or sales' },
    { value: 'loads_slowly', label: 'It loads too slowly' },
    { value: 'confusing', label: 'It doesn\'t explain what I do clearly' },
    { value: 'embarrassing', label: 'I\'m embarrassed to share it' },
    { value: 'technical_issues', label: 'Security or technical problems' }
  ],
  otherOption: true
}
```

### Page 6 — Your Brand (Q17–Q20)

```typescript
{
  id: 'q17_has_logo',
  type: 'single_select',
  text: 'Do you have a logo?',
  required: true,
  options: [
    { value: 'yes_professional', label: 'Yes, a professional logo I\'m happy with' },
    { value: 'yes_needs_work', label: 'Yes, but it needs improvement' },
    { value: 'no', label: 'No, I\'ll need one created' },
    { value: 'not_sure', label: 'Not sure' }
  ]
},
{
  id: 'q18_has_colors',
  type: 'single_select',
  text: 'Do you have specific brand colors for your business?',
  required: true,
  options: [
    { value: 'yes', label: 'Yes, I have specific colors' },
    { value: 'no', label: 'No, I\'m open to suggestions' },
    { value: 'not_sure', label: 'Not sure — I have some preferences but nothing locked in' }
  ]
},
{
  id: 'q19_brand_colors',
  type: 'textarea',
  text: 'What are your brand colors?',
  placeholder: 'e.g., "Navy blue (#1a2b6b) and gold", "We use the same green as Starbucks", or describe the feeling: "Professional blues and grays"',
  required: false,
  showIf: (answers) => answers['q18_has_colors']?.value === 'yes'
},
{
  id: 'q20_has_photos',
  type: 'single_select',
  text: 'Do you have photos to use on the website?',
  required: true,
  options: [
    { value: 'yes_professional', label: 'Yes, professional photos ready to go' },
    { value: 'yes_casual', label: 'Yes, but they\'re casual/phone photos' },
    { value: 'no', label: 'No, I\'ll need stock photos or a photographer' }
  ]
}
```

### Page 7 — Your Content (Q21–Q23)

```typescript
{
  id: 'q21_content_provider',
  type: 'single_select',
  text: 'Who will write the content for your website?',
  helperText: 'Things like the text describing your services, your about page, etc.',
  required: true,
  options: [
    { value: 'client', label: 'I\'ll write it myself', helperText: 'You\'ll provide drafts and we\'ll polish them' },
    { value: 'collaborative', label: 'I\'d like help writing it', helperText: 'We\'ll interview you and write it for you' },
    { value: 'agency', label: 'I have a copywriter already', helperText: 'Content will come from a third party' }
  ]
},
{
  id: 'q22_update_frequency',
  type: 'single_select',
  text: 'How often will you need to update your website after it\'s live?',
  required: true,
  options: [
    { value: 'regularly', label: 'Regularly — weekly or monthly', helperText: 'Blog posts, news, product updates, events' },
    { value: 'occasionally', label: 'Occasionally — a few times a year', helperText: 'Seasonal promotions, team changes' },
    { value: 'rarely', label: 'Rarely — set it and mostly forget it', helperText: 'Only when major things change' }
  ]
},
{
  id: 'q23_pages_needed',
  type: 'multi_select',
  text: 'Which pages do you need on your website?',
  helperText: 'Select everything you\'d like — we\'ll help you decide what\'s essential vs. optional',
  required: true,
  options: [
    { value: 'home', label: 'Home page' },
    { value: 'about', label: 'About / Our story' },
    { value: 'services', label: 'Services or what we offer' },
    { value: 'portfolio', label: 'Portfolio or work samples' },
    { value: 'products', label: 'Products / Shop' },
    { value: 'blog', label: 'Blog or news' },
    { value: 'testimonials', label: 'Reviews or testimonials' },
    { value: 'team', label: 'Our team' },
    { value: 'faq', label: 'FAQ' },
    { value: 'contact', label: 'Contact page' },
    { value: 'pricing', label: 'Pricing' },
    { value: 'booking', label: 'Appointments or bookings' }
  ]
}
```

### Page 8 — Features (Q24–Q26)

```typescript
{
  id: 'q24_key_features',
  type: 'multi_select',
  text: 'Which of these features are important for your website?',
  helperText: 'Don\'t worry about cost yet — just tell us what you want',
  required: false,
  options: [
    { value: 'contact_form', label: 'Contact form' },
    { value: 'online_booking', label: 'Online appointment booking' },
    { value: 'ecommerce_store', label: 'Online store / shopping cart' },
    { value: 'user_accounts', label: 'Customer accounts / member login' },
    { value: 'live_chat', label: 'Live chat support' },
    { value: 'blog_cms', label: 'Blog / content management' },
    { value: 'email_newsletter', label: 'Email newsletter signup' },
    { value: 'photo_gallery', label: 'Photo gallery or portfolio' },
    { value: 'video_embed', label: 'Video integration' },
    { value: 'google_maps', label: 'Map and location info' },
    { value: 'social_feed', label: 'Social media feed integration' },
    { value: 'reviews_testimonials', label: 'Review display (Google, Yelp)' },
    { value: 'payment_processing', label: 'Online payments (not full store)' },
    { value: 'quote_calculator', label: 'Quote calculator or estimator' },
    { value: 'multilingual', label: 'Multiple languages' }
  ]
},
{
  id: 'q25_ecommerce_details',
  type: 'single_select',
  text: 'How many products are you planning to sell in your online store?',
  required: false,
  showIf: (answers) => {
    const features = answers['q24_key_features']?.value as string[] || []
    return features.includes('ecommerce_store') || answers['q5_website_type']?.value === 'ecommerce'
  },
  options: [
    { value: 'small', label: 'Under 25 products' },
    { value: 'medium', label: '25–200 products' },
    { value: 'large', label: '200+ products' }
  ]
},
{
  id: 'q26_integrations',
  type: 'multi_select',
  text: 'Are there any tools or services your website needs to connect with?',
  required: false,
  options: [
    { value: 'google_analytics', label: 'Google Analytics' },
    { value: 'mailchimp', label: 'Mailchimp or other email platform' },
    { value: 'crm', label: 'CRM (Salesforce, HubSpot, etc.)' },
    { value: 'payment_stripe', label: 'Stripe (payments)' },
    { value: 'payment_paypal', label: 'PayPal (payments)' },
    { value: 'calendly', label: 'Calendly or other booking tool' },
    { value: 'social_media', label: 'Social media accounts' },
    { value: 'quickbooks', label: 'QuickBooks or accounting software' },
    { value: 'none', label: 'None that I know of' }
  ]
}
```

### Page 9 — Technical & Timeline (Q27–Q30)

```typescript
{
  id: 'q27_domain_status',
  type: 'single_select',
  text: 'Do you already have a domain name (like www.yourbusiness.com)?',
  required: true,
  options: [
    { value: 'have_domain', label: 'Yes, I have one', helperText: 'e.g., GoDaddy, Namecheap, Google Domains' },
    { value: 'need_domain', label: 'No, I need to get one', helperText: 'We can help you choose and register one' },
    { value: 'not_sure', label: 'I\'m not sure' }
  ]
},
{
  id: 'q28_existing_domain',
  type: 'url',
  text: 'What\'s your domain name?',
  placeholder: 'www.yourbusiness.com',
  required: false,
  showIf: (answers) => answers['q27_domain_status']?.value === 'have_domain'
},
{
  id: 'q29_timeline',
  type: 'single_select',
  text: 'When do you need the website to be live?',
  required: true,
  options: [
    { value: 'asap', label: 'As soon as possible', helperText: 'Within 2–4 weeks' },
    { value: 'one_month', label: 'Within a month', helperText: 'Flexible on details, want it soon' },
    { value: 'two_three_months', label: '2–3 months', helperText: 'Standard timeline, no rush' },
    { value: 'flexible', label: 'I\'m flexible', helperText: 'Quality over speed' },
    { value: 'specific_date', label: 'I have a specific launch date in mind' }
  ]
},
{
  id: 'q30_budget',
  type: 'single_select',
  text: 'What\'s your budget for this project?',
  helperText: 'This helps us recommend the right package — all options include hosting for the first year',
  required: true,
  options: [
    { value: 'under_2500', label: 'Under $2,500', helperText: 'Best for simple, focused sites' },
    { value: '2500_4500', label: '$2,500 – $4,500', helperText: 'Professional sites with core features' },
    { value: '4500_plus', label: '$4,500+', helperText: 'Full-featured custom sites' },
    { value: 'not_sure', label: 'I\'m not sure yet', helperText: 'We can recommend based on your needs' }
  ]
}
```

### Page 10 — Final Details (Q31–Q33)

```typescript
{
  id: 'q31_competitors',
  type: 'textarea',
  text: 'Who are your main competitors? (optional)',
  placeholder: 'List competitor names or website addresses. This helps us understand your market and make sure you stand out.',
  required: false
},
{
  id: 'q32_accessibility',
  type: 'single_select',
  text: 'Do you have any specific accessibility requirements?',
  helperText: 'e.g., serving users with disabilities, government contracts, healthcare, or education',
  required: true,
  options: [
    { value: 'standard', label: 'Standard accessibility is fine', helperText: 'We always build keyboard-friendly, screen-reader compatible sites' },
    { value: 'wcag_aa', label: 'Full WCAG 2.1 AA compliance required', helperText: 'Required for government, healthcare, or education' },
    { value: 'not_sure', label: 'Not sure — tell me what you recommend' }
  ]
},
{
  id: 'q33_anything_else',
  type: 'textarea',
  text: 'Is there anything else we should know about your project?',
  placeholder: 'Anything unique about your situation, specific ideas you have, concerns, questions, or context that doesn\'t fit elsewhere.',
  required: false
}
```

---

## CONDITIONAL LOGIC ENGINE

### lib/questions/conditionalLogic.ts

```typescript
import { Question, Answer } from '@/types/questions'
import { QUESTIONS } from './questionBank'

/**
 * Given the current answers, returns the ordered list of question IDs 
 * that should be shown to this user.
 */
export function getVisibleQuestions(answers: Record<string, Answer>): Question[] {
  return QUESTIONS.filter(question => {
    if (!question.showIf) return true
    return question.showIf(answers)
  })
}

/**
 * Given the current question ID and all answers, returns the next 
 * question the user should see.
 */
export function getNextQuestion(
  currentQuestionId: string,
  answers: Record<string, Answer>
): Question | null {
  const visible = getVisibleQuestions(answers)
  const currentIndex = visible.findIndex(q => q.id === currentQuestionId)
  if (currentIndex === -1 || currentIndex === visible.length - 1) return null
  return visible[currentIndex + 1]
}

/**
 * Returns 0–100 progress percentage based on visible questions answered.
 */
export function getProgress(answers: Record<string, Answer>): number {
  const visible = getVisibleQuestions(answers)
  const answered = visible.filter(q => answers[q.id] !== undefined).length
  return Math.round((answered / visible.length) * 100)
}

/**
 * Returns true when all required visible questions have answers.
 */
export function isComplete(answers: Record<string, Answer>): boolean {
  const visible = getVisibleQuestions(answers)
  const required = visible.filter(q => q.required)
  return required.every(q => {
    const answer = answers[q.id]
    if (!answer) return false
    if (Array.isArray(answer.value)) return answer.value.length > 0
    return answer.value.trim().length > 0
  })
}
```

### lib/questions/industryDetection.ts

```typescript
/**
 * Infers website type and industry from a business name.
 * Used to pre-populate Q5 and Q6 as suggestions after Q4 is answered.
 * The user can always change the suggestion.
 */

const INDUSTRY_KEYWORDS: Record<string, { industry: string; websiteType: string }> = {
  // Construction & Trades
  plumb: { industry: 'construction', websiteType: 'business' },
  electric: { industry: 'construction', websiteType: 'business' },
  hvac: { industry: 'construction', websiteType: 'business' },
  roofing: { industry: 'construction', websiteType: 'business' },
  contractor: { industry: 'construction', websiteType: 'business' },
  landscap: { industry: 'construction', websiteType: 'business' },
  painting: { industry: 'construction', websiteType: 'business' },
  carpenter: { industry: 'construction', websiteType: 'business' },
  
  // Healthcare
  medical: { industry: 'healthcare', websiteType: 'business' },
  dental: { industry: 'healthcare', websiteType: 'business' },
  clinic: { industry: 'healthcare', websiteType: 'business' },
  therapy: { industry: 'healthcare', websiteType: 'business' },
  chiro: { industry: 'healthcare', websiteType: 'business' },
  wellness: { industry: 'beauty_wellness', websiteType: 'business' },
  
  // Real Estate
  realty: { industry: 'real_estate', websiteType: 'business' },
  realtor: { industry: 'real_estate', websiteType: 'business' },
  'real estate': { industry: 'real_estate', websiteType: 'business' },
  property: { industry: 'real_estate', websiteType: 'business' },
  
  // Food & Beverage
  restaurant: { industry: 'food_beverage', websiteType: 'business' },
  bistro: { industry: 'food_beverage', websiteType: 'business' },
  cafe: { industry: 'food_beverage', websiteType: 'business' },
  bakery: { industry: 'food_beverage', websiteType: 'business' },
  catering: { industry: 'food_beverage', websiteType: 'business' },
  
  // Creative / Portfolio
  photo: { industry: 'creative', websiteType: 'portfolio' },
  design: { industry: 'creative', websiteType: 'portfolio' },
  studio: { industry: 'creative', websiteType: 'portfolio' },
  art: { industry: 'creative', websiteType: 'portfolio' },
  creative: { industry: 'creative', websiteType: 'portfolio' },
  
  // Retail / E-commerce
  shop: { industry: 'retail', websiteType: 'ecommerce' },
  store: { industry: 'retail', websiteType: 'ecommerce' },
  boutique: { industry: 'retail', websiteType: 'ecommerce' },
  goods: { industry: 'retail', websiteType: 'ecommerce' },
  
  // Legal & Professional Services
  law: { industry: 'professional_services', websiteType: 'business' },
  legal: { industry: 'professional_services', websiteType: 'business' },
  attorney: { industry: 'professional_services', websiteType: 'business' },
  accounting: { industry: 'professional_services', websiteType: 'business' },
  consulting: { industry: 'professional_services', websiteType: 'business' },
  
  // Non-profit
  foundation: { industry: 'nonprofit_sector', websiteType: 'nonprofit' },
  nonprofit: { industry: 'nonprofit_sector', websiteType: 'nonprofit' },
  charity: { industry: 'nonprofit_sector', websiteType: 'nonprofit' },
}

export interface DetectionResult {
  industry: string | null
  websiteType: string | null
  confidence: 'high' | 'low'
}

export function detectFromBusinessName(businessName: string): DetectionResult {
  const lower = businessName.toLowerCase()
  
  for (const [keyword, result] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (lower.includes(keyword)) {
      return {
        industry: result.industry,
        websiteType: result.websiteType,
        confidence: 'high'
      }
    }
  }
  
  return { industry: null, websiteType: null, confidence: 'low' }
}
```

---

## ZUSTAND STORE

### stores/intakeStore.ts

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Answer } from '@/types/questions'
import { getNextQuestion, getProgress, isComplete } from '@/lib/questions/conditionalLogic'
import { QUESTIONS } from '@/lib/questions/questionBank'

interface IntakeStore {
  // State
  answers: Record<string, Answer>
  currentQuestionId: string
  isSubmitting: boolean
  isComplete: boolean
  sessionId: string

  // Actions
  submitAnswer: (answer: Answer) => void
  goBack: () => void
  reset: () => void

  // Computed
  progress: number
}

export const useIntakeStore = create<IntakeStore>()(
  persist(
    (set, get) => ({
      answers: {},
      currentQuestionId: QUESTIONS[0].id,
      isSubmitting: false,
      isComplete: false,
      sessionId: crypto.randomUUID(),
      progress: 0,

      submitAnswer: (answer: Answer) => {
        const newAnswers = { ...get().answers, [answer.questionId]: answer }
        const next = getNextQuestion(answer.questionId, newAnswers)
        const complete = isComplete(newAnswers)
        const progress = getProgress(newAnswers)

        set({
          answers: newAnswers,
          currentQuestionId: next ? next.id : get().currentQuestionId,
          isComplete: complete,
          progress
        })
      },

      goBack: () => {
        const { answers, currentQuestionId } = get()
        const { getVisibleQuestions } = require('@/lib/questions/conditionalLogic')
        const visible = getVisibleQuestions(answers)
        const currentIndex = visible.findIndex((q: any) => q.id === currentQuestionId)
        if (currentIndex > 0) {
          set({ currentQuestionId: visible[currentIndex - 1].id })
        }
      },

      reset: () => set({
        answers: {},
        currentQuestionId: QUESTIONS[0].id,
        isSubmitting: false,
        isComplete: false,
        sessionId: crypto.randomUUID(),
        progress: 0
      })
    }),
    {
      name: 'introspect-intake',
      partialize: (state) => ({
        answers: state.answers,
        currentQuestionId: state.currentQuestionId,
        sessionId: state.sessionId,
        progress: state.progress
      })
    }
  )
)
```

---

## KEY COMPONENTS

### components/intake/QuestionShell.tsx

The outer wrapper that every question renders inside. Handles:
- Progress bar at top (thin, no numbers, color fill based on `progress` from store)
- Framer Motion `AnimatePresence` wrapping question content
- Back button (subtle, top-left, only shows after Q1)
- "Continue" button at bottom (disabled until current question has a valid answer)

Animation spec for question transitions:
```typescript
const variants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
}
// duration: 0.25s, ease: 'easeOut'
// Use key={currentQuestionId} on the animated div to trigger re-animation
```

### components/intake/inputs/SingleSelect.tsx

Renders options as large tap-target cards, not radio buttons. Each card:
- Full width
- 16px padding
- Subtle border (1px, color-border)
- On hover: border color shifts to primary, slight background tint
- On selected: primary border (2px), light primary background tint, checkmark icon top-right
- If `otherOption` is true: renders a final card labeled "Something else" that, when selected, expands to reveal a text input

### components/intake/inputs/UrlListInput.tsx

Renders 5 URL input fields stacked vertically. Each field:
- Shows field number (1–5) as a subtle label
- URL validation on blur (must start with http:// or https://, or be empty)
- Only field 1 has placeholder text; rest are visually quieter

---

## SCOPE.md GENERATION

After the questionnaire is complete, the answers are mapped to an `Intelligence` object, then `generateScope()` is called server-side.

### lib/scopeGeneration/generateScope.ts

This function takes the full `Intelligence` object and returns a complete SCOPE.md string. It must populate all 15 sections.

**Section 15 — Security (Internal Only):**

Section 15 is generated by `securitySection.ts` and appended to SCOPE.md. It is NEVER included in the client PDF. It is dynamically tailored by this risk classification logic:

```typescript
function classifyRisk(intelligence: Intelligence): 'low' | 'medium' | 'high' | 'critical' {
  if (intelligence.industry === 'healthcare') return 'critical'
  if (intelligence.needsEcommerce) return 'high'
  if (intelligence.needsUserAccounts) return 'high'
  if (intelligence.needsBooking && intelligence.industry === 'healthcare') return 'critical'
  if (intelligence.needsPaymentProcessing) return 'high'
  if (['legal', 'financial'].includes(intelligence.industry)) return 'high'
  if (intelligence.needsBooking || intelligence.primaryGoal === 'sign_up') return 'medium'
  return 'low'
}
```

Security sections by risk level:
- **Low:** Security headers, form spam protection (reCAPTCHA v3), honeypot fields, rate limiting on forms
- **Medium:** All of low + GDPR basics, secure session management, CSRF protection, email security
- **High:** All of medium + authentication (NextAuth.js), RBAC, secure password requirements, 2FA for admins, PCI-DSS if e-commerce
- **Critical:** All of high + HIPAA compliance, PHI encryption, audit logging, BAA documentation, mandatory 2FA all users

---

## EMAIL DELIVERY

### Two emails sent on completion:

**Email 1 — To david1984moore@gmail.com:**
- Subject: `New Project SCOPE.md — [Business Name]`
- Attachment: Full SCOPE.md including Section 15 (security)
- Plain text body with project summary

**Email 2 — To the client (their email from Q2):**
- Subject: `Your Custom Website Proposal — [Business Name]`
- Attachment: Client-facing PDF (Sections 1–14 only, no Section 15)
- Warm, professional body text

Use Resend for delivery. API key from environment variable `RESEND_API_KEY`.

---

## THE COMPLETION FLOW

When `isComplete` becomes true in the store:

1. Navigate to `/intake/complete`
2. Show processing state: "Building your custom project scope..."
3. POST to `/api/generate-scope` with full answers
4. Server maps answers → Intelligence → generates SCOPE.md string
5. POST to `/api/send-emails` with SCOPE.md + Intelligence
6. Show success screen: "Your proposal is on its way to [email]"

The completion screen should feel like a resolution — calm, confident, no confetti or excessive celebration. A simple checkmark, the business name, and a clear next-steps message.

---

## ENVIRONMENT VARIABLES REQUIRED

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx   # Only used for SCOPE.md generation, not during questionnaire
```

---

## WHAT TO BUILD FIRST — IMPLEMENTATION ORDER

1. **Types** — `types/questions.ts` and `types/intelligence.ts`
2. **Question bank** — `lib/questions/questionBank.ts` with all 33 questions
3. **Conditional logic** — `lib/questions/conditionalLogic.ts`
4. **Industry detection** — `lib/questions/industryDetection.ts`
5. **Zustand store** — `stores/intakeStore.ts`
6. **Input components** — TextInput, TextArea, SingleSelect, MultiSelect, UrlListInput
7. **QuestionRenderer** — routes question type → correct input component
8. **QuestionShell** — progress bar, animations, back/continue buttons
9. **Intake page** — `/app/intake/page.tsx` wires store → shell → renderer
10. **SCOPE.md generation** — `lib/scopeGeneration/generateScope.ts` with all 15 sections
11. **Security section** — `lib/scopeGeneration/securitySection.ts`
12. **Email delivery** — `lib/email/sendDocuments.ts` + API routes
13. **Completion screen** — `/app/intake/complete/page.tsx`

---

## SUCCESS CRITERIA

The implementation is complete when:

- [ ] All 33 questions appear one at a time, full screen
- [ ] Conditional questions (Q15, Q16, Q19, Q25, Q28) only appear when their condition is met
- [ ] Industry detection pre-fills Q5 and Q6 suggestions after Q4 is answered
- [ ] Progress bar advances smoothly with each answer
- [ ] Back navigation works correctly
- [ ] Store persists to localStorage so users can resume if they close the tab
- [ ] On completion, SCOPE.md is generated with all 15 sections populated
- [ ] Section 15 (security) adapts correctly based on project type
- [ ] david1984moore@gmail.com receives SCOPE.md with Section 15
- [ ] Client receives PDF without Section 15
- [ ] Zero Claude API calls occur during the questionnaire flow
- [ ] Questionnaire works correctly on mobile (44px min touch targets)
- [ ] Animations are smooth and subtle — never distracting

---

*This document is the single source of truth for the Introspect static questionnaire implementation. Do not deviate from the architectural constraints in the opening section. The absence of Claude API calls during the form flow is intentional and must be preserved.*
