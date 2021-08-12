import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'


export default function Index() {
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

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
      <div>
        {JSON.stringify(profile)}
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