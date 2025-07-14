// backend/src/services/mailerService.ts
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export const sendOtpEmail = async (email: string, otp: string) => {
  const payload = {
    from: {
      email: process.env.MAILERSEND_SENDER_EMAIL!,
      name: 'AeonRFP Auth',
    },
    to: [{ email }],
    subject: 'Your AeonRFP Login Code',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  };

  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error('Failed to send OTP email', await response.text());
    throw new Error('Failed to send OTP');
  }
};
