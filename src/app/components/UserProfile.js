'use client'
import React, { useState, useEffect } from "react"
import "./UserProfile.css"
import Image from "next/image"
import { supabase } from "@/utils/supabase/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCalendar, faEnvelope, faPenToSquare, faCircleCheck } from "@fortawesome/free-solid-svg-icons"





export default function UserProfile({user_id_main}) {
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    fetchAccount()
  }, [])

  async function fetchAccount() {
    
    const { data, error } = await supabase
      .from("account")
      .select('user_id, username, email, name, date_of_birth, bio, verified')
      .eq('user_id', user_id_main)
      .single()
    
    if (error) console.error("Error fetching account:", error)
    else setAccount(data)
    setLoading(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const updatedData = Object.fromEntries(formData)

    try {
      const { data, error } = await supabase
        .from('account')
        .update({
          name: updatedData.name,
          date_of_birth: updatedData.date_of_birth,
          bio: updatedData.bio
        })
        .eq('user_id', user_id_main)
        .single()

      if (error) throw error

      setAccount({ ...account, ...updatedData })
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('An error occurred while updating the profile')
    }

    
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!account) return <div className="noAccount">No account found</div>

  const names = account.name.split(' ')
  const first_name = names[0]

  return (
    <>
      <section className="profilePageHolder">
        <div className='titleBox'>
          <div className="profTitle">Hey, {first_name}! &#128075;</div>
        </div>
        <div className="profPictureBox">
          <Image src="https://avatar.iran.liara.run/public" className="profPicture" width='200' height='200' alt="Profile Picture" />
        </div>
        <div>
          <p className="displayName">
            {account.username} 
            <FontAwesomeIcon icon={faCircleCheck} className={account.verified? 'verified' : 'unverified'} />
            </p>
        </div>
        <div className='fbox'>
          <form id="pform" onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="name">Name</label>
              <div className="input-icon-wrapper">
                <input id="name" type="text" name="name" placeholder="Full Name" defaultValue={account.name}/>
                <FontAwesomeIcon icon={faUser} className="input-icon"/>
              </div>
              <label htmlFor="username">Username</label>
              <div className="input-icon-wrapper">
                <input id="username" type="text" name="username" placeholder="Username" defaultValue={account.username}/>
                <FontAwesomeIcon icon={faUser} className="input-icon"/>
              </div>

              <label htmlFor="dob">Date of Birth</label>
              <div className="input-icon-wrapper">
              <input type="date" name="date_of_birth" id="dob" defaultValue={account.date_of_birth} />
              <FontAwesomeIcon icon={faCalendar} className="input-icon" />
              </div>

              <label htmlFor="biofield">Bio</label>
              <div className="input-icon-wrapper">
                <textarea id='biofield' name="bio" rows='10' cols='100' defaultValue={account.bio} />
                <FontAwesomeIcon icon={faPenToSquare} className="input-icon" />
              </div>

              <input type="submit" name="update" className="updateButton" value="Update"/>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  )
}
