import React,{useState,useEffect} from 'react'
import Register from '@/components/register'
import axios  from 'axios';
export default function Profile() {
    const liffId = process.env.NEXT_PUBLIC_LIFF_PROFILE_ID

    const [profile, setProfile] = useState({})
    const [data, setData] = useState({})
    const [error, setError] = useState({})

    const getData = async () => {
        // const res = await axios.get(`${process.env.SHEET_USERS_API}/search?userId='Ua45c4dcdc6ec65b8e9fff4a2693bcf72'`, {
        const res = await axios.get(`https://sheet.best/api/sheets/92e7d702-2e60-4c2a-8b33-1d4dacc5c5bc`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': 'eX_XmXh!QuwvPYdHJqobQ8e0ahCGuhTe5CSjZ8D_v82U5!89sqmEbZsIdh_dHbAn'
            }
          })
          await console.log(res)
        // await setData(res.data)
        // if(res.data.length > 0){
        //     console.log(res.data)

        // }else{
        //     console.log('No data')
        // }
    }

    useEffect(async () => {
        await getData()
        //  const liff = (await import('@line/liff')).default
        // try {
        //   await liff.init({ liffId });
        //   const profile = await liff.getProfile()
        //   await setProfile(profile)
        //   console.log(profile)
        // } catch (error) {
        //   console.error('liff init error', error.message)
        // }
        // if (!liff.isLoggedIn()) {
        // //   liff.login();
        // }
      }, [profile.userId])
    

    // if(data.length = 0) return <Register />
      

    return (
        <div>
           {JSON.stringify(data,null,2)}
            {JSON.stringify(error,null,2)}
            {JSON.stringify(data.length)}
    
            
            ข้อมูลส่วนตัว
        </div>
    )
}


