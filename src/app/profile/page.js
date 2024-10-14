import "./UserProfile.css"
import Image from "next/image"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  return (
        <>
        <section className="profilePageHolder">
        <div className='titleBox'>
            <div className = "profTitle">Hey, Username! &#128075;</div>
        </div>
        <div className = "profPictureBox">
            <Image src="/images/Avatar.png" className="profPicture" width='200' height ='200'></Image>
        </div>
        <div className ='fbox'>
         <form id="pform">
            <fieldset>
            <input type="text" name="fname" placeholder="First Name" />
            <input type="text" name="sname" placeholder="Surname" />
            <input type="text" name="age" placeholder="Age" />
            <textarea id='biofield' rows='10' cols='100' placeholder="Tell us more about you..."  />
            <input type="button" name="next" className="updateButton" value="Update"/>
            </fieldset>
            </form>
        </div>
        </section>
        
        

        
        </>
    )
}
