import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function profile() {

    const [profile, setProfile] = useState({})

    const liffId = process.env.NEXT_PUBLIC_LIFF_ID


    const getMe = async () =>{
        try {
            const res = await axios.post(`${process.env.API}profiles/add-me`,{
                id:"Ua45c4dcdc6ec65b8e9fff4a2693bcf72"
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        await getMe();
    })
    // useEffect(async () => {
    //     await reset({line_id:profile.userId,displayName:profile.displayName,pictureUrl:profile.pictureUrl})
      
    //      const liff = (await import('@line/liff')).default
    //     try {
    //       await liff.init({ liffId });
    //       const profile = await liff.getProfile()
    //       await setProfile(profile)
    //       await getMe()
    //     } catch (error) {
    //       console.error('liff init error', error.message)
    //     }
    //     if (!liff.isLoggedIn()) {
    //       liff.login();
    //     }
    //   }, [profile.userId])



    

      

    return (
        <div>
            ppp
        </div>
    )
}
