import { NextResponse } from 'next/server';

const ASI1_API_KEY = process.env.ASI1_API_KEY;

export async function POST(request: Request) {
  try {
    const { action, input } = await request.json();

    if (!ASI1_API_KEY) {
      console.error('Missing ASI1_API_KEY');
      return NextResponse.json(
        { error: 'Server configuration error: Missing ASI1_API_KEY' },
        { status: 500 }
      );
    }

    let prompt = '';
    
    switch (action) {
      case 'generate':
        prompt = `Create a YouTube short script about: ${input}`;
        break;
      case 'analyze':
        prompt = `Analyze the tone of this transcript: ${input}`;
        break;
      case 'replicate':
        prompt = `Replicate the previous tone for a video about: ${input.newTopic}`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    console.log('Sending to ASI-1:', prompt);

    // Call ASI-1 API
    const response = await fetch('https://api.asi.fetch.ai/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ASI1_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: prompt,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ASI-1 API error:', response.status, errorText);
      throw new Error(`ASI-1 API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('ASI-1 response:', data);
    
    // Extract response from ASI-1
    const agentResponse = data.response || data.answer || data.message || 'No response';
    
    let result;
    if (action === 'analyze') {
      result = { analysis: agentResponse };
    } else {
      result = { script: agentResponse };
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with ASI-1: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
