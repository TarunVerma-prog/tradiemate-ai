import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="Polly.Joanna">Hello! You’ve reached TradieMate. Please say your full name after the beep.</Say>
      <Record maxLength="10" action="/api/twilio-voice/recording" />
    </Response>
  `;
  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' }
  });
} 