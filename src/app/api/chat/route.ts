import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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
      content: `You are a helpful, efficient virtual receptionist for a plumbing service.

Your task is to book an appointment by collecting the following information from the user, in this exact order:
1. Full name
2. Email address
3. Phone number
4. Address for the visit
5. Preferred day of visit (date)
6. Preferred time of visit

Rules:
- After each user response, immediately and politely ask for the next required field. Do NOT thank the user, do NOT use pleasantries, and do NOT repeat information already given.
- If the user provides a day of the week (e.g., 'Tuesday') instead of a date, respond with the exact upcoming date (e.g., 'Tuesday, June 18, 2024') and ask the user to confirm this date before proceeding.
- If asking for email, validate that it is a valid email address format. If not, politely ask the user to provide a valid email address.
- Once all information is collected, summarize the appointment details and ask the user to confirm. Present the details in a clear bulleted list format for easy review.
- If the user confirms, respond with a friendly confirmation message and end the conversation.
- If the user wants to change any detail, allow them to update it before confirming.
- Do not proceed until each required field is collected and validated.
- Be polite, professional, and efficient throughout.`
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

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Check if the user confirmed the booking and send an email
    // Look for a confirmation message in the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0]?.content?.toLowerCase() || '';
    if (lastUserMessage.includes('confirm') || lastUserMessage.includes('yes')) {
      // Try to extract booking details and email from the conversation
      let email = '';
      let summary = '';
      for (const msg of messages) {
        if (msg.role === 'user' && msg.content.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
          email = msg.content.trim();
        }
        if (msg.role === 'assistant' && (msg.content.includes('•') || msg.content.toLowerCase().includes('appointment'))) {
          summary = msg.content;
        }
      }
      // Format summary as HTML bulleted list
      let formattedSummary = '';
      if (summary) {
        // Split by lines, look for lines starting with •
        const lines = summary.split(/\n|<br\s*\/?\s*>/).map(l => l.trim()).filter(Boolean);
        const bulletLines = lines.filter(l => l.startsWith('•'));
        if (bulletLines.length > 0) {
          formattedSummary = '<ul style="padding-left:1.2em">' + bulletLines.map(l => `<li>${l.replace(/^•\s*/, '')}</li>`).join('') + '</ul>';
        } else {
          // fallback: just join all lines as <li>
          formattedSummary = '<ul style="padding-left:1.2em">' + lines.map(l => `<li>${l}</li>`).join('') + '</ul>';
        }
      }
      if (email && formattedSummary) {
        console.log('Sending confirmation email to', email);
        try {
          await resend.emails.send({
            from: 'TradieMate <onboarding@resend.dev>',
            to: email,
            subject: 'Your Plumbing Appointment Confirmation',
            html: `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;"><h2>Booking Confirmed</h2><p>Thank you for booking with TradieMate! Here are your appointment details:</p>${formattedSummary}</div>`
          });
          console.log('Email sent successfully');
        } catch (e) {
          console.error('Error sending email:', e);
        }
      } else {
        if (!email) console.error('No email found in conversation');
        if (!formattedSummary) console.error('No summary found in conversation');
      }
    }

    return NextResponse.json({ reply: aiMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error.' }, { status: 500 });
  }
} 