import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function profile() {

    const router = useRouter()
    const [profile, setProfile] = useState({})
    const [line, setLine] = useState({})

    const liffId = process.env.NEXT_PUBLIC_LIFF_ID


    const getMe = async () =>{
        try {
            const {data} = await axios.post(`${process.env.API}profiles/me`,{
                id:line.lineId
            })
            if(data.length==0){
                router.push('/register')
            }
            console.log(data.length)
        } catch (error) {
            console.log(error)
            
        }
    }


    useEffect(async () => {

         const liff = (await import('@line/liff')).default
        try {
          await liff.init({ liffId });
          const profile = await liff.getProfile()
          await setLine(profile)
          await getMe()
        } catch (error) {
          console.error('liff init error', error.message)
        }
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      }, [line.userId])



    

      

    return (
        <div>
            ppp
        </div>
    )
}
