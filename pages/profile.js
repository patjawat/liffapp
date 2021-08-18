import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Spinner from 'react-spinner-material';
export default function profile() {

    const router = useRouter()
    const [profile, setProfile] = useState({})
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(true)
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
        await setLoading(false)

        if(data.length==0){
            await setStatus(false)
            // router.push('/register')
        }else{
            await setStatus(true)

        }

        } catch (error) {
          console.error('liff init error', error.message)
        }
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      }, [])



      if(loading){
          return (
              <div className="d-flex justify-content-center mt-5">
                    <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
              </div>
          )
      }
    
if(status == false){
    return(
        <div className="container">
            {/* {JSON.stringify(line)} */}

            <h1 className="text-center">ท่านยังไม่ได้ลงทะเบียน</h1>
            <button className="btn btn-primary btn-block" onClick={() =>{router.push('/register')}}>ลงทะเบียนที่นี่</button>
        </div>
    )
}
      

    return (
        <div className="container">
            {/* {JSON.stringify(line)} */}
        <h1 className="text-center">ยินดีต้อนรับ</h1>
        </div>
    )
}
