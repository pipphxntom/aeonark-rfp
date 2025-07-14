// backend/src/api/auth/verifyOtp.ts
import { Request, Response } from 'express';
import { validateOtp } from '../../services/otpService';
import { createToken } from '../../utils/token';
import supabase from '../../utils/supabaseClient';

export const verifyOtpHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Missing email or OTP' });
  }

  const { valid, reason } = await validateOtp(email, otp);

  if (!valid) {
    return res.status(401).json({ error: reason || 'OTP invalid' });
  }

  // Ensure user exists
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    await supabase.from('users').insert([
      {
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }

  const token = createToken(email);
  return res.status(200).json({ token });
};
