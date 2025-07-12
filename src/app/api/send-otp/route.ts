import { NextRequest, NextResponse } from 'next/server';
import authenticator from '@/lib/otp';
import { saveOTP } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ success: false, message: 'Email requerido' }, { status: 400 });
    }

    const secret = authenticator.generateSecret();
    saveOTP(email, secret);

    const token = authenticator.generate(secret);

    // 💡 Solo incluir el token en la respuesta (mock)
    return NextResponse.json({ success: true, token });
}