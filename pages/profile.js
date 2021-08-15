import React,{useState,useEffect} from 'react'

import axios  from 'axios';
export default function Profile() {
    const liffId = process.env.NEXT_PUBLIC_LIFF_PROFILE_ID

    const [profile, setProfile] = useState({})
    const [data, setData] = useState({})
    const [error, setError] = useState({})

    const getData = async () => {
        const res = await axios.get(`${process.env.SHEET_USERS_API}/search?userId=*Ua45c4dcdc6ec65b8e9fff4a2693bcf72*`)
        await setData(res.data)
        console.log(res)
    }
      

    return (
        <div>
            {JSON.stringify(data,null,2)}
            {JSON.stringify(error,null,2)}
            
            ข้อมูลส่วนตัว
        </div>
    )
}


