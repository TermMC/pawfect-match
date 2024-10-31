'use client';
import { useState } from 'react';
import SignUp from '../components/login/SignUp';
import Login from '../components/login/Login';

export default function LoginPage() {
    const [signingUp, setSigningUp] = useState(false);
    return <>{signingUp ? <SignUp setSigningUp={setSigningUp} /> : <Login setSigningUp={setSigningUp} />}</>;
}
