import { NextRequest, NextResponse } from 'next/server';
import authenticator from '@/lib/otp';
import { getOTPSecret, clearOTP } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
    const { email, token } = await req.json();

    const secret = getOTPSecret(email);
    if (!secret) {
        return NextResponse.json({ success: false, message: 'OTP no enviado' }, { status: 400 });
    }

    const isValid = authenticator.check(token, secret);
    if (isValid) clearOTP(email);

    return NextResponse.json({
        success: isValid,
        message: isValid ? 'OTP válido' : 'OTP inválido',
        testValue: isValid ? process.env.TEST_VARIABLE : undefined,
    });
}