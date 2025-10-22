import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { action, input } = await request.json();

    const AGENT_ADDRESS = 'agent1qfyjjwkks2tywvdmdlt07fv3qml252z659fcazyc0zer9kje62huu3w0s0e';
    
    let response;
    
    switch (action) {
      case 'generate':
        response = await generateScript(input);
        break;
      case 'analyze':
        response = await analyzeTone(input);
        break;
      case 'replicate':
        response = await replicateTone(input);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

async function generateScript(topic: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    script: `Hook A:\n(0–3s) Ever wondered why 80% of your results come from just 20% of your work? [Zoom on timer]\n\nHook B:\n(0–3s) Stop doing everything. Start doing what matters. [Bold text on screen]\n\n(3–8s) The Pareto Principle says most of us waste time on tasks that barely move the needle. [B-roll of busy person]\n\n(8–15s) But what if you could identify that golden 20%? [Cut to analytics]\n\n(15–22s) Track everything for one week. Then ruthlessly cut the rest. [Close-up]\n\n(22–28s) Your competition is doing everything. You're about to do only what matters. [Final frame]\n\nEstimated Duration: 28 seconds`
  };
}

async function analyzeTone(transcript: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    analysis: `🎯 Tone Analysis\n\nPrimary Tone: Casual/Energetic (90% confidence)\n\nDescription: Fast-paced, conversational delivery with high energy.\n\nPacing: Very Fast | Emotion Level: High | Formality: Casual\n\nStyle Tips:\n1. Use conversational language and rhetorical questions\n2. Keep sentences short and punchy (8-12 words)\n3. Add personal anecdotes or relatable examples\n4. Use emphasis words and caps for impact\n5. Break the fourth wall with direct address`
  };
}

async function replicateTone(input: { previousTone: string; newTopic: string }) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    script: `Hook A:\n(0–3s) Yo so here's the thing about ${input.newTopic}... nobody talks about THIS part. [Dramatic pause]\n\nHook B:\n(0–3s) What if I told you ${input.newTopic} could change EVERYTHING? [Zoom]\n\n(3–10s) Alright so basically, this is gonna sound crazy but trust me on this. [Quick cuts]\n\n(10–20s) I tried this for like 3 weeks straight and the results were INSANE. No cap. [B-roll]\n\n(20–28s) Just try it for one week. ONE week. You'll see what I mean. [Point at camera]\n\nEstimated Duration: 28 seconds`
  };
}
