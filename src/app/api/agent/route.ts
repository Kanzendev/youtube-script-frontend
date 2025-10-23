import { NextResponse } from 'next/server';

const AGENT_ADDRESS = 'agent1qfyjjwkks2tywvdmdlt07fv3qml252z659fcazyc0zer9kje62huu3w0s0e';

export async function POST(request: Request) {
  try {
    const { action, input } = await request.json();

    let message = '';
    
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

    // Use DeltaV endpoint for agent communication
    const response = await fetch(
      `https://agentverse.ai/v1/agents/${AGENT_ADDRESS}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Agent communication error:', response.status, errorText);
      
      // Return mock data as fallback
      const mockResult = action === 'analyze' 
        ? { analysis: 'Mock analysis: Engaging, informative tone with clear structure.' }
        : { script: `[HOOK - 0:00-0:05]\n"${input} - here's what you need to know!"\n\n[MAIN CONTENT - 0:05-0:50]\n• Key point about ${input}\n• Why this matters to you\n• Practical example\n\n[CTA - 0:50-1:00]\n"Want more? Follow for daily tips!"` };
      
      return NextResponse.json({ 
        success: true, 
        data: mockResult,
        note: 'Using mock data - agent connection pending'
      });
    }

    const data = await response.json();
    console.log('Agent response:', data);
    
    let result;
    if (action === 'analyze') {
      result = { analysis: data.reply || data.response || data.message || 'Analysis completed' };
    } else {
      result = { script: data.reply || data.response || data.message || 'Script generated' };
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('API Error:', error);
    
    // Return mock data on error
    const mockResult = { 
      script: `[HOOK - 0:00-0:05]\n"Amazing facts about your topic!"\n\n[MAIN CONTENT - 0:05-0:50]\n• Key insight\n• Why it matters\n• Real example\n\n[CTA - 0:50-1:00]\n"Follow for more!"` 
    };
    
    return NextResponse.json({ 
      success: true, 
      data: mockResult,
      note: 'Using mock data - agent unavailable'
    });
  }
}
