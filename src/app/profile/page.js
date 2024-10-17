'use client'
import React from "react"
import "./UserProfile.css"
import Image from "next/image"
import { supabase } from "@/utils/supabase/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default async function Page() {
const{data: account} = await supabase.from("account")
.select('user_id, username, email, name, date_of_birth, bio, verified')
.limit(1)
.single();

  return (
    <>
        <section className="profilePageHolder">
            <div className='titleBox'>
                <div className = "profTitle">Hey, {account.username}! &#128075;</div>
            </div>
            <div className = "profPictureBox">
                <Image src="/images/Avatar.png" className="profPicture" width='200' height ='200'></Image>
            </div>
            <div className ='fbox'>
                <form id="pform">
                    <fieldset>
                        <label htmlFor="name">Name</label>
                        <input  id="name" type="text" name="name" placeholder="Full Name" defaultValue={account.name}/>
                        <label htmlFor="dob">Date of Birth</label>
                        <input  type="date" name="dob" id="dob" defaultValue={account.date_of_birth} />
                        <label htmlFor="biofield">Bio</label>
                        <textarea id='biofield' rows='10' cols='100' defaultValue={account.bio}  />
                        <input type="button" name="next" className="updateButton" value="Update"/>
                    </fieldset>
                </form>
            </div>
        </section>
    </>
    )
}
