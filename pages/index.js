import { useEffect, useState } from 'react'
import { getSession, signIn, signOut,useSession } from "next-auth/client";

import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'


export default function Index() {
  const [profile, setProfile] = useState({})
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID

  // useEffect(async () => {
  //   // const liff = (await import('@line/liff')).default
  //   // await liff.ready
  //   // const profile = await liff.getProfile()
  //   // setProfile(profile)
  //    const liff = (await import('@line/liff')).default
  //   try {
  //     await liff.init({ liffId });
  //     const profile = await liff.getProfile()
  //     await setProfile(profile)
  //     console.log(profile)
  //   } catch (error) {
  //     console.error('liff init error', error.message)
  //   }
  //   if (!liff.isLoggedIn()) {
  //     liff.login();
  //   }
  // }, [profile.userId])

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
      <div>
        {JSON.stringify(profile.pictureUrl)}
        {profile.pictureUrl && <Image
          src={profile.pictureUrl}
          alt={profile.displayName}
          width={500}
          height={500}
        />}
        <div>Name: {profile.displayName}</div>
      </div>
    </section>
  )
}


export async function getServerSideProps({req,res}) {
  let headers = {}
  let me = {}

  const session = await getSession({ req });
  if (session) {
    headers = {Authorization: `Bearer ${session.jwt}`};
  }else{
    res.writeHead(302, { Location: '/register' })
    res.end()
    return {}
  }
  let journals = [];

  try {

    let {data} = await axios.get(`${process.env.api}/profiles/me`, {
      headers: headers,
    })

  
    journals = data;
  } catch (e) {
    console.log('caught error');
    journals = [];
  }
  
  return {props: {journals:journals,session:session }}  
}