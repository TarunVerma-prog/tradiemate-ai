import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
    }

    // Prepend the system prompt to the conversation
    const systemPrompt = {
      role: 'system',
      content: `You are a helpful virtual receptionist for a plumbing service.\n\nYour task is to book an appointment by collecting the following information from the user in order:\n1. Full name\n2. Phone number\n3. Address for the visit\n4. Preferred day of visit (date)\n5. Preferred time of visit\n\nAsk for one piece of information at a time. If the user’s answer is unclear or missing required info, ask again politely.\nOnce all information is collected, summarize the appointment details and ask the user to confirm.\nIf the user confirms, respond with a friendly confirmation message and end the conversation.\nIf the user wants to change any detail, allow them to update it before confirming.\nDo not proceed until each required field is collected and validated.\nBe polite, professional, and helpful throughout.`
    };
    const openaiMessages = [systemPrompt, ...messages];

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: openaiMessages,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.json();
      return NextResponse.json({ error: error.error?.message || 'OpenAI API error.' }, { status: openaiRes.status });
    }

    const data = await openaiRes.json();
    const aiMessage = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ reply: aiMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error.' }, { status: 500 });
  }
} 