import express from 'express';
import { sendOtpHandler } from './sendOtp';
import { verifyOtpHandler } from './verifyOtp';

const router = express.Router();

router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);

export default router;
