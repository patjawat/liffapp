import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios  from 'axios';

export default function Register() {
    const [profile, setProfile] = useState({})

    const liffId = process.env.NEXT_PUBLIC_LIFF_ID

  useEffect(async () => {
    // const liff = (await import('@line/liff')).default
    // await liff.ready
    // const profile = await liff.getProfile()
    // setProfile(profile)
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


    const onSubmit = data => {
        try {
            const res = axios.post(`${process.env.SHEET_USERS_API}`,{
                userId:profile.userId,
                displayName:profile.displayName,
                pictureUrl:profile.pictureUrl,
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    };
   
    return (
        <div className="container">
           <button onClick={async ()=>{
               await onSubmit();
           }}>ตกลง</button>
      </div>
    );
}
