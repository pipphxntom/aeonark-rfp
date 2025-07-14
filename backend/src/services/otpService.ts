// backend/src/services/otpService.ts
import supabase from '../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
};

export const storeOtp = async (email: string, otp: string) => {
  const expiresAt = new Date(Date.now() + 5 * 60000); // 5 min from now

  const { error } = await supabase.from('auth_otps').insert([
    {
      id: uuidv4(),
      email,
      otp_code: otp,
      expires_at: expiresAt.toISOString(),
      used: false,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw new Error('Failed to store OTP');
};

export const validateOtp = async (email: string, otp: string) => {
  const { data, error } = await supabase
    .from('auth_otps')
    .select('*')
    .eq('email', email)
    .eq('otp_code', otp)
    .eq('used', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return { valid: false, reason: 'Invalid code' };

  const now = new Date();
  const expires = new Date(data.expires_at);
  if (expires < now) return { valid: false, reason: 'OTP expired' };

  // Mark as used
  await supabase
    .from('auth_otps')
    .update({ used: true })
    .eq('id', data.id);

  return { valid: true };
};
