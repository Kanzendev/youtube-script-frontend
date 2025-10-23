import { NextResponse } from 'next/server';

const AGENT_ADDRESS = 'agent1qfyjjwkks2tywvdmdlt07fv3qml252z659fcazyc0zer9kje62huu3w0s0e';
const AGENTVERSE_API_KEY = process.env.AGENTVERSE_API_KEY;

export async function POST(request: Request) {
  try {
    const { action, input } = await request.json();

    if (!AGENTVERSE_API_KEY) {
      console.error('Missing AGENTVERSE_API_KEY');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    let message = '';
    
    // Format message based on action
    switch (action) {
      case 'generate':
        message = `Create a YouTube short script about ${input}`;
        break;
      case 'analyze':
        message = `Analyze the tone of this transcript: ${input}`;
        break;
      case 'replicate':
        message = `Replicate the previous tone for a video about ${input.newTopic}`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Send message to Agentverse agent
    const response = await fetch(
      `https://agentverse.ai/v1beta1/engine/chat/sessions/${AGENT_ADDRESS}/submit`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AGENTVERSE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: message,
          session_id: `session_${Date.now()}`,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Agentverse API error:', errorText);
      throw new Error(`Agentverse API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response from agent
    let result;
    if (action === 'analyze') {
      result = { analysis: data.response || data.message || 'Analysis completed' };
    } else {
      result = { script: data.response || data.message || 'Script generated' };
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with agent: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
