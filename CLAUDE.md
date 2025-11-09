# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application for generating AI-powered email newsletters for abstract artist Lara Eckerman. It uses Claude Sonnet 4.5 to transform brief content notes into full newsletters that match Lara's authentic voice. The app includes iterative refinement, draft persistence, and copy-to-clipboard functionality.

**Key Problem Solved**: Newsletter creation that usually takes 2-4 hours is reduced to ~15 minutes.

## Architecture

### High-Level Structure

```
code/
├── app/
│   ├── api/generate/route.ts          # Claude API integration (server route)
│   ├── page.tsx                       # Main React component with state management
│   ├── layout.tsx                     # Root layout
│   └── globals.css                    # Global styles
├── components/
│   ├── header.tsx, sidebar.tsx        # UI shell
│   ├── input-section.tsx              # Notes textarea + generate button
│   ├── output-section.tsx             # Newsletter display + copy button
│   ├── feedback-section.tsx           # Feedback input + apply button
│   └── ui/                            # shadcn/ui components (60+)
├── lib/
│   ├── prompts.ts                     # System prompt (trained on Lara's voice)
│   ├── types.ts                       # TypeScript interfaces
│   └── utils.ts                       # Utility functions
└── hooks/
    └── use-toast.ts                   # Toast notifications

Key app file: code/app/page.tsx
```

### Data Flow

1. **User inputs content notes** → stored in React state
2. **User clicks "Generate"** → POST to `/api/generate` with notes + conversation history
3. **Server route** (`app/api/generate/route.ts`) calls Claude API with:
   - System prompt (trained on Lara's actual newsletters)
   - Conversation history (for iterative refinement)
   - User's input notes
4. **Claude responds** → newsletter text + updated conversation history
5. **Response stored** in React state + localStorage (for draft persistence)
6. **User can refine** → provide feedback → API call again with full history

### Key Technical Details

- **Conversation History**: Stored as `Message[]` (role + content) in React state and localStorage. Each generate/feedback cycle appends both user and assistant messages.
- **Draft Persistence**: Uses browser localStorage. Drafts are serialized with `createdAt` timestamp for monthly naming.
- **API Key**: Stored in `.env.local` as `ANTHROPIC_API_KEY`. Never exposed to client.
- **Model**: Currently using `claude-sonnet-4-20250514` (Sonnet 4, not 4.5—check if upgrade needed)
- **Max Tokens**: Set to 1024 (sufficient for 200-400 word newsletters)

## Common Development Commands

```bash
# From the code/ directory
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm start            # Run production build locally
npm run lint         # Run ESLint

# Single file linting (not in package.json, but works)
npx eslint app/page.tsx
```

## Important Files to Know

### System Prompt (lib/prompts.ts)
Contains `NEWSLETTER_SYSTEM_PROMPT` which is the core of the AI behavior. It includes:
- Lara's voice characteristics (warm, conversational, family-focused)
- Signature phrases ("I can't believe...", "Just popping into your inbox...")
- Real examples showing GOOD (Lara's voice) vs BAD (generic AI) outputs
- Specific patterns to avoid (corporate language, overly formal tone)

**If the generated newsletters don't sound like Lara**, this prompt needs refinement.

### API Route (app/api/generate/route.ts)
- Validates input (non-empty notes)
- Checks API key is configured
- Builds message array with conversation history
- Calls Claude with system prompt
- Returns newsletter + updated conversation history
- Error handling for missing API key, validation, and API errors

### Main Component (app/page.tsx)
Manages:
- `inputNotes` state (user's content notes)
- `generatedNewsletter` state (current output)
- `conversationHistory` state (for iterative refinement)
- `drafts` state (array of saved drafts from localStorage)
- `selectedDraft` state (which draft is being edited)
- Functions: `handleGenerate`, `handleApplyFeedback`, `handleSaveDraft`, etc.

## Environment Setup

Create `/code/.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-v7-...your-key...
```

The `.env.example` shows this format. The API key must be valid and have available credits.

## Testing & Debugging

**To test newsletter generation**:
1. Start dev server: `npm run dev`
2. Enter test notes in the input field
3. Click "Generate Newsletter"
4. Check console (browser dev tools) for API responses
5. Check localStorage (DevTools > Application > Local Storage) for draft persistence

**Common issues**:
- "API key is not configured" → Check `.env.local` and restart dev server
- "Failed to generate newsletter" → Check API key validity and account credits
- Drafts not saving → Check if localStorage is enabled in browser

## System Prompt Customization

The newsletter quality heavily depends on `lib/prompts.ts`. The current prompt is trained on Lara's actual newsletters with patterns like:
- Opening: "Hi Jason,"
- Specific mentions of dates, booth numbers, prices
- Family context ("two kiddos")
- Em dashes for natural pauses
- Short, scannable paragraphs

**To improve voice matching**:
1. Review generated newsletters against Lara's actual ones
2. Identify missing patterns or phrases
3. Add examples (GOOD vs BAD format) to the system prompt
4. Test with sample notes to validate improvements

## Model & Performance Notes

- Current model: `claude-sonnet-4-20250514` (Sonnet 4, released May 2025)
- Generation typically takes 2-5 seconds
- Max tokens set to 1024 (results are usually 200-400 words, so this is safe)
- Token usage: Each request varies based on conversation history length

**Future consideration**: The prompt mentions Sonnet 4.5 in README but code uses Sonnet 4. Verify if upgrade to 4.5 is intended.

## Design & Styling

- **Framework**: Tailwind CSS v4
- **Components**: shadcn/ui (60+ pre-built components)
- **Custom Colors**: Defined in `styles/` and `globals.css`
- **Responsive**: Mobile-first design with breakpoints
- **Theme**: Supports light/dark modes via next-themes

## Key Dependencies

- `@anthropic-ai/sdk` - Claude API integration
- `next` v16 - React framework
- `react` v19 - UI library
- `tailwindcss` v4 - Styling
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `sonner` - Toast notifications
- `lucide-react` - Icon library
- `@radix-ui/*` - Unstyled UI primitives

## Future Enhancements (From PRD)

Phase 2 planned features:
- Supabase integration for cloud storage
- Multi-device draft sync
- User accounts
- Shareable draft links
- Draft export (PDF, HTML)

## Cursor Rules & Documentation

See [`PROMPT_CUSTOMIZATION.md`](code/PROMPT_CUSTOMIZATION.md) for details on how the system prompt was trained on Lara's actual voice.

See [`README.md`](code/README.md) for user-facing documentation including deployment, troubleshooting, and API route specs.
