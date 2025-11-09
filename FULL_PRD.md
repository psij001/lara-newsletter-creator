# Abstract Artist Newsletter Generator - Complete PRD

## 1. Executive Summary

**Product Name:** Newsletter Generator for Abstract Artists
**Version:** 1.0 MVP
**Target User:** Solo abstract artists managing monthly email newsletters
**Primary Use Case:** Generate full newsletter copy from brief notes using AI, with iterative refinement capability

---

## 2. Problem Statement

Abstract artists managing email newsletters face a significant time drain:
- Writing and editing monthly newsletters takes 2-4 hours
- Must maintain consistent voice, tone, and format across months
- Balancing art creation with communication responsibilities reduces time for artistic work
- Current workflow: Manual brainstorming → Writing → Multiple edit rounds → Formatting → Copy to email platform

**Specific Pain Point:** The actual writing and editing process is the bottleneck, not organization or distribution.

---

## 3. Target User & Use Case

**Primary User:** Your wife - Abstract artist with established email list
**User Goal:** Generate a complete, ready-to-send newsletter in 15 minutes instead of 2-4 hours
**User Frequency:** Once per month
**Success Definition:** Uses the app for 3 consecutive months and finds it faster than manual writing

---

## 4. Solution Overview

A single-page web application that:
1. Accepts brief notes about newsletter content
2. Generates full, formatted newsletter copy using Claude AI trained on the user's authentic voice
3. Allows iterative refinement through feedback (no limit on iterations)
4. Saves draft versions for future reference
5. Provides easy copy-to-clipboard for transfer to Flodesk email platform

**Key Differentiator:** The AI prompt is trained on the user's actual newsletters, ensuring the generated copy maintains her authentic voice, tone, cadence, signature phrases, and style.

---

## 5. Core User Journey

### Session Flow

```
1. User navigates to app
2. User enters brief content notes (what topics to cover)
3. User clicks "Generate Newsletter"
4. AI generates full newsletter (2-5 seconds)
5. User reviews generated copy
6. [LOOP OPTION A] User provides feedback if changes needed
7. [LOOP OPTION A] Clicks "Apply Feedback"
8. [LOOP OPTION A] Reviews new version, repeats as needed
9. [LOOP OPTION B] User clicks "Save Draft" when satisfied
10. User copies final newsletter to clipboard
11. User pastes into Flodesk
```

**Loop Behavior:** Conversation context is maintained. The AI remembers previous versions and feedback, so subsequent generations build on previous iterations.

---

## 6. MVP Feature Specification

### 6.1 Core Features

#### Feature 1: Input Form
**Description:** Single textarea where user enters brief notes about newsletter content
**Requirements:**
- Textarea with placeholder text: "What should be included in this month's newsletter? (e.g., upcoming exhibition, new series, workshop dates, sales, etc.)"
- Character limit: 2000 characters (soft limit, warn at 1800, but allow up to 2000)
- Clear button to reset form
- Input is preserved if user navigates away (localStorage)

**Acceptance Criteria:**
- User can enter text freely without character restrictions until 2000
- Form validates that input is not empty before generating
- User sees helpful placeholder

#### Feature 2: AI Newsletter Generation
**Description:** Claude API call that generates full newsletter based on input notes using custom system prompt
**Requirements:**
- System prompt trained on 2-3 example newsletters provided by user
- Generation takes input notes and expands to full newsletter (400-600 words typically)
- Maintains consistent sections: Intro → 3 Content Blocks → Conclusion
- Generates in user's authentic voice, tone, cadence, and style
- API call includes conversation history for iterative refinement

**Acceptance Criteria:**
- Generated newsletter is well-formatted and ready to use
- Output maintains user's voice and style based on example training
- Typical generation time is 2-5 seconds
- API calls are logged with timestamps

**Technical Details:**
- Use Anthropic Claude API (Claude 3.5 Sonnet recommended for quality)
- System prompt structure:
  ```
  You are a professional copywriter helping an abstract artist write her monthly newsletter.
  You understand her voice: [voice characteristics extracted from examples]
  Her typical structure is: Intro paragraph → 3 content blocks → Conclusion

  Generate a newsletter based on these notes: [user input]

  Important: Match her authentic tone, sentence structure, cadence, and signature phrases.
  Focus on the emotional connection to her art practice and community.
  ```
- Include conversation history in each API call to maintain context

#### Feature 3: Generated Newsletter Display
**Description:** Formatted display of generated newsletter
**Requirements:**
- Clean, readable typography (serif font recommended)
- Proper line spacing and paragraph breaks
- Clear section delineation
- Copy-to-clipboard button
- "Regenerate with feedback" button
- "Save Draft" button when satisfied

**Acceptance Criteria:**
- Generated text is easily readable and scannable
- Copy-to-clipboard works reliably
- User can see full newsletter without scrolling excessively

#### Feature 4: Iterative Feedback & Refinement
**Description:** Feedback loop allowing user to request changes and regenerate
**Requirements:**
- Feedback input field below generated newsletter
- Placeholder: "What would you like to change? (e.g., 'Make the intro more personal', 'Add emphasis to the exhibition')"
- "Apply Feedback" button
- Character limit: 500 characters
- Feedback is sent to Claude along with conversation history
- Generated version updates in place with smooth transition

**Acceptance Criteria:**
- Feedback is applied and new version generated within 5 seconds
- Conversation context is maintained (AI remembers previous versions)
- User can provide unlimited feedback iterations
- UI clearly shows which version is current
- Previous feedback is cleared for next iteration

#### Feature 5: Draft Persistence
**Description:** Save generated newsletters to Supabase for future reference
**Requirements:**
- "Save Draft" button that saves:
  - Original input notes
  - Final generated newsletter
  - Creation timestamp
  - Optional: Draft name/title field (auto-generated with month/year if not provided)
- Each draft gets unique ID
- Drafts are retrieved on page load
- "View Past Drafts" section showing list of saved newsletters

**Acceptance Criteria:**
- Draft saves successfully to Supabase
- User can retrieve draft list on page load
- Clicking past draft loads it for viewing/copying
- Each draft shows creation date

#### Feature 6: Draft Management
**Description:** View and manage previously saved drafts
**Requirements:**
- Sidebar or section showing list of past drafts
- Each draft shows:
  - Month/Year or custom name
  - Creation date
  - Preview snippet of first 50 characters
- Click to load and view full draft
- Delete button for each draft
- No editing of past drafts (encourage generating new ones)

**Acceptance Criteria:**
- Past drafts are readily accessible
- User can load any past draft
- Drafts persist across browser sessions

#### Feature 7: Copy to Clipboard
**Description:** One-click copy of generated newsletter to clipboard
**Requirements:**
- Prominent "Copy to Clipboard" button
- Visual confirmation (toast notification or button state change) when copied
- Works reliably across browsers
- Copies only the newsletter text (not buttons or UI)

**Acceptance Criteria:**
- User can copy newsletter in one click
- Copied text can be pasted into Flodesk without formatting issues
- User receives visual confirmation of successful copy

### 6.2 Out of Scope (Explicitly)

- User authentication (single-user app for now)
- Flodesk API integration (manual copy/paste is fine)
- Email sending directly from the app
- Rich text editor or markdown support
- Template selection/customization
- Multiple voices or style templates
- Version comparison or diff view
- Collaborative editing
- Analytics or usage tracking
- Mobile app (web responsive design only)
- Custom branding options

---

## 7. User Interface Specification

### 7.1 Layout Structure

**Single-page layout with these sections:**

```
┌─────────────────────────────────────────────────────────┐
│  Newsletter Generator [Logo/Title]        [Your Voice]   │
├──────────────┬──────────────────────────────────────────┤
│              │                                            │
│ Past Drafts  │      Input & Output Panel                │
│              │                                            │
│ • Nov 2024   │  ┌──────────────────────────────────────┐ │
│ • Oct 2024   │  │ Enter your notes:                     │ │
│ • Sep 2024   │  │                                       │ │
│   [view]     │  │ [Textarea - 400 chars shown]         │ │
│   [delete]   │  │                                       │ │
│              │  │ [Generate Newsletter Button]         │ │
│              │  └──────────────────────────────────────┘ │
│              │                                            │
│              │  ┌──────────────────────────────────────┐ │
│              │  │ Generated Newsletter:                │ │
│              │  │                                       │ │
│              │  │ [Generated Copy Displays Here]       │ │
│              │  │                                       │ │
│              │  │ [Copy] [Save Draft] [Clear]          │ │
│              │  └──────────────────────────────────────┘ │
│              │                                            │
│              │  ┌──────────────────────────────────────┐ │
│              │  │ Give feedback for refinement:        │ │
│              │  │ [Textarea - 200 chars]               │ │
│              │  │ [Apply Feedback Button]              │ │
│              │  └──────────────────────────────────────┘ │
│              │                                            │
└──────────────┴──────────────────────────────────────────┘
```

### 7.2 Component Specifications

**Header:**
- App title: "Newsletter Generator"
- Subtitle: "Write less, focus on your art"
- Clean, modern design
- Neutral color palette (white/gray with accent color)

**Left Sidebar (Past Drafts):**
- List of saved drafts with dates
- Click to load, delete to remove
- Collapsible on mobile
- Shows "No drafts yet" when empty

**Main Panel (Input/Output):**
- Two-column layout on desktop, stacked on mobile
- Left: Input form
- Right: Generated output
- Clear visual separation between states

**Input Section:**
- Large textarea (8-10 lines visible)
- Placeholder text helpful
- "Generate Newsletter" button (primary CTA)
- Button disabled until input has content

**Output Section (Hidden until generated):**
- Displays formatted newsletter
- High contrast, readable typography
- Action buttons: "Copy", "Save Draft", "Refresh with Feedback"
- Loading state while AI generates

**Feedback Section (Appears after generation):**
- Textarea for feedback input
- "Apply Feedback" button
- Shows loading state during regeneration

### 7.3 Design System

**Colors:**
- Primary: #6366F1 (Indigo - for buttons/CTAs)
- Secondary: #F5F3FF (Light indigo - for backgrounds)
- Text: #1F2937 (Dark gray)
- Borders: #E5E7EB (Light gray)
- Success: #10B981 (Green - for copy confirmation)

**Typography:**
- Headlines: Sans-serif (Inter or similar), 24px, bold
- Body: Sans-serif (Inter or similar), 16px
- Generated Newsletter Display: Serif (Georgia or similar), 16px, line-height 1.8 for readability

**Spacing:**
- Standard padding: 16px, 24px, 32px
- Standard margin: 16px, 24px, 32px
- Gap between sections: 32px

**Buttons:**
- Primary CTA: Full width on mobile, 200px on desktop
- Secondary: Standard width
- All buttons have hover/active states
- Loading state shows spinner

---

## 8. Data Model & Database Schema

### 8.1 Supabase Tables

#### Table: `drafts`
```sql
CREATE TABLE drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Content
  input_notes TEXT NOT NULL,
  generated_newsletter TEXT NOT NULL,
  draft_name VARCHAR(255),

  -- Metadata
  iteration_count INT DEFAULT 1,
  is_published BOOLEAN DEFAULT FALSE,

  -- Future expandability
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for faster queries
CREATE INDEX idx_drafts_created_at ON drafts(created_at DESC);
```

#### Table: `generation_history` (Optional - for analytics)
```sql
CREATE TABLE generation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID REFERENCES drafts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  input_notes TEXT,
  feedback TEXT,
  output_newsletter TEXT,
  api_response_time INT -- milliseconds
);
```

### 8.2 Data Flow

```
User Input → Frontend (React) → Claude API
                              ↓
                         Generated Output
                              ↓
                      Display to User
                              ↓
User Feedback → Claude API (with conversation history)
                              ↓
                     Updated Output
                              ↓
                     Save to Supabase
```

---

## 9. Technical Architecture

### 9.1 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router) | Server components, API routes, modern DX |
| **Styling** | Tailwind CSS | Utility-first CSS, fast development |
| **AI** | Anthropic Claude API | Newsletter generation |
| **Database** | Supabase (PostgreSQL) | Draft persistence |
| **Deployment** | Vercel | Next.js native deployment |
| **Language** | TypeScript | Type safety, better DX |

### 9.2 API Endpoints

#### POST `/api/generate`
**Purpose:** Generate newsletter from input notes
**Request:**
```json
{
  "inputNotes": "string",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```
**Response:**
```json
{
  "newsletter": "string",
  "conversationHistory": [...]
}
```
**Error Handling:** Return 400 for validation errors, 500 for API errors with user-friendly message

#### POST `/api/drafts`
**Purpose:** Save generated newsletter as draft
**Request:**
```json
{
  "inputNotes": "string",
  "generatedNewsletter": "string",
  "draftName": "string (optional)"
}
```
**Response:**
```json
{
  "id": "uuid",
  "createdAt": "timestamp",
  "draftName": "November 2024"
}
```

#### GET `/api/drafts`
**Purpose:** Retrieve all saved drafts
**Response:**
```json
[
  {
    "id": "uuid",
    "draftName": "November 2024",
    "createdAt": "timestamp",
    "preview": "first 50 chars..."
  }
]
```

#### GET `/api/drafts/:id`
**Purpose:** Retrieve specific draft
**Response:**
```json
{
  "id": "uuid",
  "inputNotes": "string",
  "generatedNewsletter": "string",
  "draftName": "string",
  "createdAt": "timestamp"
}
```

#### DELETE `/api/drafts/:id`
**Purpose:** Delete a draft
**Response:**
```json
{ "success": true }
```

### 9.3 Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
```

---

## 10. AI Integration - System Prompt Design

### 10.1 Dynamic Prompt Structure

The system prompt will be customized based on example newsletters provided. Structure:

```
You are an expert copywriter specializing in helping abstract artists communicate with their audiences. You write monthly newsletters that capture the essence of artistic practice and build community.

Your client's voice:
- Tone: [extracted from examples]
- Cadence: [sentence length patterns]
- Signature phrases: [list of phrases used]
- Topics: [typical subjects covered]
- Emotional resonance: [how she connects with audience]

Example of her style (from recent newsletter):
"[Paste example paragraph here]"

Your task: Write a complete monthly newsletter for an abstract artist based on these brief notes:
[USER INPUT]

Requirements:
1. Structure: Opening paragraph → 3 content blocks → Closing reflection
2. Match her authentic voice and cadence
3. 400-600 words total
4. Use signature phrases naturally
5. Create emotional connection with her art and audience
6. Format with clear paragraph breaks
7. Be authentic and avoid generic language

Generate the newsletter now:
```

### 10.2 Conversation History Management

Each API call includes conversation history to maintain context:
```json
[
  {
    "role": "user",
    "content": "Initial notes about newsletter content..."
  },
  {
    "role": "assistant",
    "content": "[Generated newsletter v1]"
  },
  {
    "role": "user",
    "content": "Make the opening more personal and add more excitement about the exhibition"
  },
  {
    "role": "assistant",
    "content": "[Generated newsletter v2 - refined]"
  }
]
```

---

## 11. Implementation Roadmap

### Phase 1: Core Generation (Days 1-2)
- [ ] Set up Next.js 14 project
- [ ] Create UI layout and components
- [ ] Integrate Claude API
- [ ] Test generation flow with hardcoded example

### Phase 2: Iterative Refinement (Days 3-4)
- [ ] Add feedback input and refinement flow
- [ ] Implement conversation history management
- [ ] Test multiple iterations

### Phase 3: Persistence (Days 4-5)
- [ ] Set up Supabase project
- [ ] Implement draft save functionality
- [ ] Build draft management UI
- [ ] Test load/delete operations

### Phase 4: Polish & Deploy (Days 5-7)
- [ ] Add copy-to-clipboard
- [ ] Error handling and edge cases
- [ ] Loading states and feedback
- [ ] Mobile responsiveness
- [ ] Deploy to Vercel
- [ ] User testing with your wife

---

## 12. Success Criteria & Metrics

### Primary Success Metric
**Your wife uses the app to generate her next 3 monthly newsletters (3 months) and reports it saves her significant time vs. manual writing.**

### Secondary Metrics
- Average generation time: < 5 seconds
- User satisfaction: Can generate newsletter in < 15 minutes total
- No errors or failures during actual use
- Generated copy requires minimal edits

### Technical Metrics
- Page load time: < 3 seconds
- API response time: < 5 seconds
- 99.9% uptime
- No console errors or warnings

---

## 13. Future Roadmap (Post-MVP)

These are explicitly OUT OF SCOPE for v1, but may be valuable later:
- User authentication (if scaling to multiple artists)
- Flodesk API integration for direct sending
- Email preview with styling
- Scheduling/scheduling calendar
- Analytics dashboard
- Multiple voice templates
- Bulk generation for multiple lists
- Social media version generation
- Newsletter templates with custom sections

---

## 14. Assumptions & Dependencies

**Assumptions:**
- User has Anthropic API key and budget for API calls
- User has Supabase account
- User has Vercel account
- User will provide 2-3 example newsletters for voice training
- No multi-user support needed initially
- No complex formatting required (plain text acceptable)

**Dependencies:**
- Anthropic Claude API availability
- Supabase service availability
- Vercel deployment service

---

## 15. Launch Checklist

- [ ] Example newsletters collected from user
- [ ] System prompt customized with user's voice
- [ ] All features implemented and tested
- [ ] Mobile responsive design verified
- [ ] Error messages are helpful
- [ ] API keys secured in environment variables
- [ ] Supabase tables created
- [ ] Vercel deployment configured
- [ ] User does test run with actual use case
- [ ] Documentation created (if needed)

---

# Appendix A: Claude Code Starter Prompt

```
I need help building a Newsletter Generator for an abstract artist.

## What I'm Building
My wife is an abstract artist who writes a monthly newsletter to her email list. Writing and editing currently takes 2-4 hours. This web app will let her enter brief notes about what to include, and AI will generate the full newsletter in her authentic voice using Claude. She can provide feedback to refine it iteratively, save drafts, and copy to her email platform (Flodesk).

## Core User Loop
1. User enters brief notes about newsletter content (topics, events, offers, etc.)
2. System generates full 400-600 word newsletter using Claude API
3. User reviews output
4. User can provide feedback like "make the intro more personal" or "add more about the exhibition"
5. System applies feedback and regenerates with updated version
6. User can iterate unlimited times
7. When satisfied, user saves draft and copies to clipboard for pasting into Flodesk

## MVP Scope (Exactly what needs to be built)

### Features
- Single-page form with textarea for entering brief content notes
- Claude API integration to generate full newsletter (system prompt trained on example emails)
- Display generated newsletter with proper formatting
- Feedback input field and "Apply Feedback" button for iterative refinement
- Maintain conversation history during editing session for context
- Save drafts to Supabase with input notes, generated copy, and timestamp
- View list of past drafts with dates
- Load/view saved drafts
- Delete drafts
- Copy-to-clipboard button for easy transfer to Flodesk

### Out of Scope
- Authentication (single user, no login needed)
- Flodesk integration (manual copy/paste is fine)
- Email sending
- Rich text editing
- Template customization
- Version comparison

## Data & Voice Training
You'll need to create a system prompt trained on the user's authentic voice. I'll provide 2-3 example newsletters that you should analyze for:
- Tone and personality
- Sentence structure and cadence
- Signature phrases or recurring language
- How she connects with her audience
- Typical topics and structure

The system prompt should ensure all generated newsletters sound like they're written by her, not generic AI.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Anthropic Claude API
- Supabase (PostgreSQL) for draft storage
- Vercel for deployment

## UI/UX
- Clean, modern single-page design
- Left sidebar with past drafts list
- Main panel with input form at top, generated output below
- Feedback input appears after generation
- Responsive design (mobile-friendly)
- Color palette: Indigo primary, neutral backgrounds
- Generated newsletters in readable serif font

## Success Criteria
1. App successfully generates newsletters from brief notes
2. Generated copy maintains user's authentic voice based on examples
3. User can iterate with feedback until satisfied
4. Drafts persist in Supabase
5. Copy-to-clipboard works reliably
6. User can complete workflow in < 15 minutes vs 2-4 hours manually

## Development Approach
- Start with UI layout and Claude API integration (validate generation works)
- Add iterative feedback loop
- Then add Supabase for persistence
- Deploy to Vercel
- Keep things simple; no unnecessary features

Can you help me:
1. Set up the Next.js 14 project with Tailwind, TypeScript, and necessary dependencies
2. Build the single-page UI with all components
3. Integrate Claude API with system prompt based on example newsletters
4. Implement the iterative feedback flow with conversation history
5. Set up Supabase and implement draft persistence
6. Add copy-to-clipboard functionality
7. Deploy to Vercel

[I will provide example newsletters once project is set up]
```

---

# Appendix B: v0 Component Specifications

Use this when building with v0:

```
Create a single-page newsletter generator app with these components:

Layout:
- Left sidebar (25% width): Past drafts list, collapsible on mobile
- Main content area (75% width): Input form and output display

Components:
1. Header: Title "Newsletter Generator", subtitle
2. Sidebar: List of past drafts with dates, click to load, delete buttons
3. InputSection: Textarea for content notes, Generate button
4. OutputSection: Display generated newsletter, Copy button, Save Draft button
5. FeedbackSection: Textarea for feedback input, Apply Feedback button
6. DraftPreview: Modal or section to view selected draft
7. Toast notifications: For copy confirmation and success messages

Colors: Indigo primary (#6366F1), light backgrounds
Typography: Clean sans-serif headers, serif for generated content
Mobile: Stack sections vertically, hide/collapse sidebar
```

---

This PRD is complete and ready for either v0 or Claude Code to start building immediately. All information needed for implementation is provided.
