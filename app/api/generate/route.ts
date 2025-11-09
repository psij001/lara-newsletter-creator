import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { NEWSLETTER_SYSTEM_PROMPT } from '@/lib/prompts';
import { GenerateRequest, GenerateResponse, Message } from '@/lib/types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { inputNotes, conversationHistory = [] } = body;

    // Validate input
    if (!inputNotes || inputNotes.trim().length === 0) {
      return NextResponse.json(
        { error: 'ValidationError', message: 'Input notes are required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ConfigurationError', message: 'Anthropic API key is not configured' },
        { status: 500 }
      );
    }

    // Build messages array for conversation history
    const messages: Anthropic.Messages.MessageParam[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: inputNotes,
      },
    ];

    // Call Claude API
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: NEWSLETTER_SYSTEM_PROMPT,
      messages: messages,
    });

    // Extract the generated newsletter
    const assistantMessage = response.content[0];
    if (assistantMessage.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const newsletter = assistantMessage.text;

    // Update conversation history
    const updatedHistory: Message[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: inputNotes,
      },
      {
        role: 'assistant',
        content: newsletter,
      },
    ];

    const result: GenerateResponse = {
      newsletter,
      conversationHistory: updatedHistory,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Newsletter generation error:', error);

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        {
          error: 'APIError',
          message: error.message || 'Failed to generate newsletter',
        },
        { status: error.status || 500 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'ValidationError', message: 'Invalid request format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'InternalError',
        message: 'An unexpected error occurred while generating the newsletter',
      },
      { status: 500 }
    );
  }
}
