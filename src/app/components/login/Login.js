'use client';
import { login } from './actions';
import './login.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default function Login({ setSigningUp }) {
    return (
        <form className='loginPage'>
            <Image className='loginLogo' src='./images/Logo.svg' alt='Pawfect Match logo' width={200} height={200} />
            <div className='loginContainer'>
                <div className='loginDetailsContainer'>
                    <div className='emailContainer'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' name='email' type='email' required />
                    </div>
                    <div className='passwordContainer'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' name='password' type='password' required />
                    </div>
                    <button className='loginButton' formAction={login}>
                        Log in
                    </button>
                    <button className='signupButton' onClick={() => setSigningUp(true)}>
                        Sign up
                    </button>
                </div>
                <FontAwesomeIcon icon={faPaw} size='8x' style={{ color: '#002846', position: 'absolute', bottom: 0, right: 0, transform: 'rotate(-45deg)' }} />
            </div>
        </form>
    );
}
