import { NextRequest, NextResponse } from 'next/server';
import { askGemini } from '@/lib/geminiClient';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { prompt } = data;
    
    console.log('API route received request with prompt:', prompt);
    
    if (!prompt || typeof prompt !== 'string') {
      console.error('Invalid prompt received:', prompt);
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' }, 
        { status: 400 }
      );
    }

    if (prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt cannot be empty' }, 
        { status: 400 }
      );
    }

    if (prompt.length > 10000) {
      return NextResponse.json(
        { error: 'Prompt is too long (max 10,000 characters)' }, 
        { status: 400 }
      );
    }
    
    const response = await askGemini(prompt.trim());
    console.log('Successfully got response from Gemini');
    
    return NextResponse.json({ 
      answer: response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('API route error:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' }, 
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}