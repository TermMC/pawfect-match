"use client"
import React, {useState} from "react";
import './styles.css'
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <div style={{width: '100%'}}>
            <nav>
              <div className="title"><Image src="/images/Logo.svg" width={200} height={80} alt="Pawfect Math logo" /></div>
              <Link href="/profile" className="desktop_menu">Profile</Link>
              <Link href="/messages" className="desktop_menu">Messages</Link>
              <Link href="/matches" className="desktop_menu">Matches</Link>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
            </nav>

            <div className={menu_class}>
                <ul className="mobile_menu">
                    <li><Link href="/profile">Profile</Link></li>
                    <li><Link href="/messages">Messages</Link></li>
                    <li><Link href="/matches">Matches</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar