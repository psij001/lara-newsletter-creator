# Newsletter System Prompt - Customized for Lara Eckerman

## What Changed

The system prompt in `lib/prompts.ts` has been completely rewritten to capture Lara's authentic voice based on analysis of her actual newsletters.

## Key Features of the New Prompt

### 1. **Real Examples (Not Abstract Rules)**
The prompt includes 5 side-by-side comparisons of:
- ✅ **GOOD**: Direct quotes from Lara's actual newsletters
- ❌ **BAD**: Generic AI-written alternatives

This trains Claude to recognize and avoid corporate/AI-sounding language.

### 2. **Signature Phrases**
The prompt includes Lara's actual phrases that appear throughout her newsletters:
- "I can't believe..."
- "I have exciting news!"
- "Just popping into your inbox..."
- "If you're local, I would love to see you there!"
- "Thank you for being here"

### 3. **Voice Characteristics**
Documented patterns specific to Lara:
- Warm, conversational tone (not formal or corporate)
- Family-focused perspective ("two kiddos," studio schedules)
- Short paragraphs with white space
- Specific details (dates, booth numbers, prices)
- Em dashes for natural pauses
- Minimal punctuation flourishes

### 4. **Content Balance**
- 30% personal/family context
- 60% specific event info and offers
- 10% gratitude and community connection

### 5. **Anti-AI Pattern Detection**
The prompt explicitly teaches Claude what to AVOID:
- ❌ Overly formal language
- ❌ Generic marketing phrases ("thrilled," "delighted")
- ❌ Long, complex sentences
- ❌ Perfect corporate grammar
- ❌ Excessive emoji/exclamation points

## How It Works

When Lara types content notes and clicks "Generate Newsletter":

1. Claude reads the new system prompt
2. Claude studies the 5 real examples of her voice
3. Claude compares "good" examples (hers) vs. "bad" examples (AI-generic)
4. Claude generates a newsletter that matches her actual voice, not AI-voice
5. The result sounds like Lara wrote it, not an algorithm

## Testing the New Prompt

### Try generating a newsletter with notes like:
- "We just won a new art fair, happening Sept 15-17, booth #45. Excited to showcase new mini paintings. Also, family trip coming up."
- "Holiday collection ready. 24-hour early access for subscribers. Limited edition pieces. Free shipping Nov 1-7."
- "First month in new studio at Northrup King. Art Attack event was amazing. Met other artists, sold pieces, excited for community."

### What to Look For:
✅ Opens with "Hi Jason," naturally
✅ Includes specific dates, booth numbers, prices
✅ Uses her actual phrases ("I can't believe," "if you're local")
✅ Short paragraphs with white space
✅ Mentions of family, studio, creative process
✅ Warm, genuine tone (not corporate)
✅ Feels like Lara wrote it, not ChatGPT

## The Files

- `lib/prompts.ts` - Contains the new system prompt with Lara's examples
- This file - Documentation of what was changed and why

## Next Steps

The system is now trained on Lara's real voice. Each time she:
1. Adds content notes
2. Clicks "Generate Newsletter"
3. Gets back a newsletter that sounds authentically like her

No further customization needed unless Lara's voice/style changes significantly.

---

**Note**: The prompt is trained on 14 of Lara's actual newsletters. If you notice patterns Claude is missing, you can add more examples to the prompt in `lib/prompts.ts` following the same "GOOD vs BAD" format.
