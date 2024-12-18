"use client"
import React, { useState } from "react";
import './NavBar.css'
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";

const Navbar = () => {
    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        } else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    function deleteAllCookies() {
        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
    }
    // Logout button
    const HandleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut()

            if (error) {
                console.log('Error logging out:', error.message);
                window.alert()
            }
            else {
                deleteAllCookies()
                console.log('User logged out');
            }
        }
        catch (err) {
            console.log('Error logging out:', err);
            window.alert("Error when logging out, try again.");
        }
    }

    const HandlePageChange = () => {
        setBurgerClass("burger-bar unclicked")
        setMenuClass("menu hidden")
        setIsMenuClicked(!isMenuClicked)
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }


    return (
        <div style={{ width: '100%' }}>
            <nav>
                <div>
                    <Image className="logo" src="/images/Logo.svg" width={200} height={80} alt="Pawfect Match logo" />
                </div>
                <Link href="/" className="desktop_menu">Home</Link>
                <Link href="/profile" className="desktop_menu">Profile</Link>
                <Link href="/messages" className="desktop_menu">Messages</Link>
                <Link href="/matches" className="desktop_menu">Matches</Link>
                <Link href="/login" onClick={HandleLogout} className="desktop_menu">Logout</Link>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </nav>

            <div className={menu_class}>
                <ul className="mobile_menu">
                    <li><Link onClick={HandlePageChange} href="/">Home</Link></li>
                    <li><Link onClick={HandlePageChange} href="/profile">Profile</Link></li>
                    <li><Link onClick={HandlePageChange} href="/messages">Messages</Link></li>
                    <li><Link onClick={HandlePageChange} href="/matches">Matches</Link></li>
                    <li><Link href="/login" onClick={HandleLogout}>Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar