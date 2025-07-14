// backend/src/api/auth/sendOtp.ts
import { Request, Response } from 'express';
import { generateOtp, storeOtp } from '../../services/otpService';
import { sendOtpEmail } from '../../services/mailerService';

export const sendOtpHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendOtpEmail(email, otp);

    return res.status(200).json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error('Send OTP Error:', err);
    return res.status(500).json({ error: 'Could not send OTP' });
  }
};
