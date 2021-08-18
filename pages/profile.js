import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function profile() {

    const router = useRouter()
    const [profile, setProfile] = useState({})
    const [status, setStatus] = useState(true)
    const [line, setLine] = useState("")

    const liffId = process.env.NEXT_PUBLIC_LIFF_ID


    const getMe = async () =>{
        try {
            const {data} = await axios.post(`${process.env.API}profiles/me`,{
                id:line !="" ? line.userId : ""
            })
            if(data.length==0){
                await setStatus(false)
                // router.push('/register')
            }
            console.log(data.length)
        } catch (error) {
            console.log(error)
            
        }
    }


    // useEffect(async () => {
    //     await getMe()
    // },[])

    useEffect(async () => {

         const liff = (await import('@line/liff')).default
        try {
          await liff.init({ liffId });
          const profile = await liff.getProfile()
          await setLine(profile)
        //   await getMe()

        const {data} = await axios.post(`${process.env.API}profiles/me`,{
            id:profile ? profile.userId : ""
        })
        
        if(data.length==0){
            await setStatus(false)
            // router.push('/register')
        }

        } catch (error) {
          console.error('liff init error', error.message)
        }
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      }, [])



    
if(status == false){
    return(
        <div>
            {JSON.stringify(line)}

            <h1 className="text-center">ท่านยังไม่ได้ลงทะเบียน</h1>
            <button className="btn btn-primary btn-block" onClick={() =>{router.push('/register')}}>ลงทะเบียนที่นี่</button>
        </div>
    )
}
      

    return (
        <div>
            {JSON.stringify(line)}
        <h1 className="text-center">ยินดีต้อนรับ</h1>
        </div>
    )
}
