'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');

    const sendOtp = async () => {
        const res = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.success && data.token) {
            alert(`Tu OTP (mock): ${data.token}`);
            setStep('otp');
        }
    };

    const verifyOtp = async () => {
        const res = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token: otp }),
        });
        const data = await res.json();
        alert(data.success ? 'Login correcto' : 'OTP inválido');
    };

    return (
        <main style={{ padding: 40 }}>
            {step === 'email' ? (
                <>
                    <input
                        placeholder="Tu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button onClick={sendOtp}>Enviar OTP</button>
                </>
            ) : (
                <>
                    <input
                        placeholder="Código OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verificar</button>
                </>
            )}
        </main>
    );
}