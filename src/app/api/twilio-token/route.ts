import { NextRequest, NextResponse } from 'next/server';
import { jwt } from 'twilio';

export async function GET() {
  const { AccessToken } = jwt;
  const { VoiceGrant } = AccessToken;

  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
  const twilioApiKey = process.env.TWILIO_API_KEY!;
  const twilioApiSecret = process.env.TWILIO_API_SECRET!;
  const twimlAppSid = process.env.TWILIO_TWIML_APP_SID!;

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: twimlAppSid,
    incomingAllow: true,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: 'user-' + Date.now() }
  );
  token.addGrant(voiceGrant);

  return NextResponse.json({ token: token.toJwt() });
} 