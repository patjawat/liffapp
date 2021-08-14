import React,{useState,useEffect} from 'react'

import axios  from 'axios';
export default function Profile() {
    const [profile, setProfile] = useState({})

    useEffect(async () => {

         const liff = (await import('@line/liff')).default
        try {
          await liff.init({ liffId });
          const profile = await liff.getProfile()
          await setProfile(profile)
          console.log(profile)
        } catch (error) {
          console.error('liff init error', error.message)
        }
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      }, [profile.userId])
  
      
    return (
        <div>
            ข้อมูลส่วนตัว
        </div>
    )
}
