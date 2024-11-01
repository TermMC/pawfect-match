'use client'
import React, { useState, useEffect } from "react"
import "./UserProfile.css"
import Image from "next/image"
import { supabase } from "@/utils/supabase/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default function Page() {
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    fetchAccount()
  }, [])

  async function fetchAccount() {
    const id = 'b28f56b5-589b-4ded-8ebe-23efc579a794'
    const { data, error } = await supabase
      .from("account")
      .select('user_id, username, email, name, date_of_birth, bio, verified')
      .eq('user_id', id)
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
        .eq('user_id', account.user_id)
        .single()

      if (error) throw error

      setAccount({ ...account, ...updatedData })
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('An error occurred while updating the profile')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!account) return <div>No account found</div>

  return (
    <>
      <section className="profilePageHolder">
        <div className='titleBox'>
          <div className="profTitle">Hey, {account.username}! &#128075;</div>
        </div>
        <div className="profPictureBox">
          <Image src="/images/Avatar.png" className="profPicture" width='200' height='200' alt="Profile Picture" />
        </div>
        <div className='fbox'>
          <form id="pform" onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" placeholder="Full Name" defaultValue={account.name}/>
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" name="date_of_birth" id="dob" defaultValue={account.date_of_birth} />
              <label htmlFor="biofield">Bio</label>
              <textarea id='biofield' name="bio" rows='10' cols='100' defaultValue={account.bio} />
              <input type="submit" name="update" className="updateButton" value="Update"/>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  )
}
