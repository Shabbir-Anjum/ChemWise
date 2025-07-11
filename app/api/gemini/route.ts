import { NextRequest, NextResponse } from 'next/server';
import { askGemini } from '@/lib/geminiClient';

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body from request
    const body = await request.json();
    const { prompt } = body;
    
    // Validate required fields
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' }, 
        { status: 400 }
      );
    }

    // Validate prompt length
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
    
    // Call Gemini API
    const answer = await askGemini(prompt.trim());
    
    // Return successful response
    return NextResponse.json({ 
      answer,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('API error:', error);
    
    // Handle different types of errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' }, 
        { status: 400 }
      );
    }
    
    // Generic server error
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' }, 
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
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