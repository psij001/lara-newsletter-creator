# Newsletter Generator for Abstract Artists

A beautifully designed Next.js application that uses Claude AI to generate high-quality monthly newsletters from brief content notes. Designed specifically for abstract artists to reduce newsletter creation time from 2-4 hours to 15 minutes.

## Features

- ✨ **AI-Powered Generation** - Uses Claude 3.5 Sonnet to generate compelling newsletters
- 🔄 **Iterative Refinement** - Provide feedback to refine newsletters with full conversation history
- 💾 **Local Draft Persistence** - Automatically save and manage drafts using localStorage
- 📋 **Smart Input Validation** - Character limits with helpful warnings
- 🎨 **Beautiful UI** - Artist-inspired color palette with responsive design
- ⚡ **Fast & Efficient** - Get professionally written newsletters in seconds

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **AI**: Anthropic Claude API
- **Storage**: localStorage (no account required)
- **Deployment**: Vercel-ready

## Quick Start

### 1. Get Your API Key

You'll need an Anthropic API key to use this app:

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key (you'll use it in step 3)

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root and add your API key:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

Or copy from the example:

```bash
cp .env.example .env.local
# Then edit .env.local and add your API key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### Generate a Newsletter

1. **Add Content Notes** - Write brief notes about what you want to share (max 2000 characters)
   - Your exhibitions
   - New techniques or materials you're exploring
   - Thoughts on your artistic practice
   - Updates on current projects

2. **Generate** - Click the "Generate Newsletter" button
   - Claude will create a 400-600 word newsletter
   - The newsletter maintains your authentic voice and style
   - It includes a warm intro, 3 content blocks, and a thoughtful conclusion

3. **Review & Refine**
   - Read the generated newsletter
   - Use the Feedback section to request changes
   - Provide specific feedback like "make it more emotional" or "emphasize the exhibition more"
   - Click "Apply Feedback" to refine

4. **Save & Manage**
   - Click "Save Draft" to save your newsletter
   - Access past drafts from the left sidebar
   - Drafts are automatically named by month and year
   - Click on a draft to load it, or delete it when done

5. **Copy to Newsletter Platform**
   - Click "Copy" on the final newsletter
   - Paste directly into your email platform (like Flodesk)
   - Ready to send!

## Customizing the AI Voice

The system prompt can be customized to match your exact voice and style. To personalize:

### Step 1: Gather Examples
Collect 2-3 of your best past newsletters that capture your voice.

### Step 2: Analyze Your Style
Look for patterns in your writing:
- Favorite phrases or expressions
- How you structure paragraphs
- Topics you frequently discuss
- Your emotional tone

### Step 3: Update the Prompt
Edit `lib/prompts.ts` and add your observations to the `NEWSLETTER_SYSTEM_PROMPT`. For example:

```typescript
// Add after the existing guidelines:
- The artist frequently opens newsletters with a philosophical question
- Uses phrases like "in my practice" and "exploring the relationship between..."
- Often discusses color theory and its emotional impact
- Signature closing: "Creating with intention"
```

### Step 4: Test & Iterate
Try generating a newsletter with your notes. If the tone isn't quite right, refine the prompt further.

## Project Structure

```
code/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Claude API integration
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main app logic
│   └── globals.css               # Global styles & custom colors
├── components/
│   ├── header.tsx                # App header
│   ├── sidebar.tsx               # Draft management
│   ├── input-section.tsx         # Content notes input
│   ├── output-section.tsx        # Newsletter display
│   ├── feedback-section.tsx      # Feedback input
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── prompts.ts                # System prompt for Claude
│   ├── types.ts                  # TypeScript definitions
│   └── utils.ts                  # Utility functions
├── hooks/
│   └── use-toast.ts              # Toast notifications
├── .env.example                  # Environment template
├── .env.local                    # Local environment (git-ignored)
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── tailwind.config.js            # Tailwind CSS config
```

## Environment Variables

### Required
- `ANTHROPIC_API_KEY` - Your Anthropic API key for Claude access

### Example (.env.local)
```
ANTHROPIC_API_KEY=sk-ant-v7-...your-key-here...
```

## Storage & Privacy

- **Drafts** - Stored locally in your browser using localStorage
- **Conversation History** - Stored locally with each draft
- **API Keys** - Never sent to any server except Anthropic
- **Content** - Only sent to Anthropic's API when you click Generate

Your data never leaves your browser unless it's sent to Claude for generation.

## Future Enhancements

### Phase 2 (Coming Soon)
- Supabase integration for cloud storage
- Multi-device draft sync
- User accounts
- Shareable draft links
- Draft export (PDF, HTML)

## Troubleshooting

### "API key is not configured" Error
- Check that `ANTHROPIC_API_KEY` is in `.env.local`
- Restart the development server
- Verify your API key is valid at console.anthropic.com

### "Failed to generate newsletter"
- Ensure your Anthropic API key has valid credits
- Check that you have network connectivity
- Try again - sometimes API calls timeout

### Drafts Not Saving
- Check browser's localStorage is enabled
- Clear browser cache and reload
- Try a different browser

### Newsletter Too Short/Long
- The system prompt targets 400-600 words
- More detailed input notes tend to produce longer newsletters
- You can always use feedback to request length adjustments

## API Routes

### POST `/api/generate`
Generates a newsletter from input notes with optional conversation history.

**Request:**
```json
{
  "inputNotes": "Your content notes here",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "newsletter": "Generated newsletter text...",
  "conversationHistory": [...]
}
```

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Linting
```bash
npm run lint
```

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your repository
4. Add environment variable: `ANTHROPIC_API_KEY`
5. Deploy!

**Important**: Vercel will have access to the environment variable on the server side. Client-side code cannot access `ANTHROPIC_API_KEY`.

## License

This project is provided as-is for personal use.

## Support

For issues with:
- **The App** - Check the troubleshooting section above
- **Anthropic API** - Visit [console.anthropic.com](https://console.anthropic.com)
- **Next.js** - See [Next.js Documentation](https://nextjs.org/docs)

## Tips for Best Results

1. **Be Specific in Notes** - More detailed input = better newsletters
2. **Use Feedback Liberally** - The refine feature is powerful
3. **Maintain Consistency** - Let the system learn your voice
4. **Copy, Don't Retype** - Always copy-paste from the app
5. **Save Regularly** - Use Save Draft after each generation

---

**Built with ❤️ for abstract artists everywhere**
