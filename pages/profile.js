import React,{useState,useEffect} from 'react'

import axios  from 'axios';
export default function Profile() {
    const [profile, setProfile] = useState({})
    const [data, setData] = useState({})

    useEffect(async () => {

         const liff = (await import('@line/liff')).default
        try {
          await liff.init({ liffId });
          const profile = await liff.getProfile()
          await setProfile(profile)
          console.log(profile)
          await getData()
        } catch (error) {
          console.error('liff init error', error.message)
        }
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      }, [profile.userId])
  

    const getData = async () => {
        const res = await axios.get(`${process.env.SHEET_USERS_API}/search?userId=*${useprofile.userIdrId}*`)
    }
      
    return (
        <div>
            {JSON.stringify(data,null,2)}
            ข้อมูลส่วนตัว
        </div>
    )
}


// export async function getServerSideProps({req,res}) {
//     let headers = {}
//     let me = {}
  
//     const session = await getSession({ req });
//     if (session) {
//       headers = {Authorization: `Bearer ${session.jwt}`};
//     }else{
//       res.writeHead(302, { Location: '/register' })
//       res.end()
//       return {}
//     }
//     let journals = [];
  
//     try {
  
//       let {data} = await axios.get(`${process.env.api}/profiles/me`, {
//         headers: headers,
//       })
  
    
//       journals = data;
//     } catch (e) {
//       console.log('caught error');
//       journals = [];
//     }
    
//     return {props: {journals:journals,session:session }}  
//   }

