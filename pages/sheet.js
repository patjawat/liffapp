import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import useGoogleSheets from 'use-google-sheets';


export default function IndexPage({ emojis }) {
  const [sheet,setSheet] = useState([])
  const { data, loading, error,refetch } = useGoogleSheets({
    apiKey: "AIzaSyDoyFxyKebkcvlOSRQe-CJlWDlZeiCBtGw",
    sheetId: "1g8oRzHoC0RKSmOUzYukvQ9qmNGaIZo8WaV16HQhmL7Q",
    sheetsNames: ['ชีต1'],
  });
  useEffect(async () => {
await setSheet(data)
// const larryRow = await addRow({ name: 'Larry Page', email: 'larry@google.com' });

  },[])
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div>
      <p>{JSON.stringify(sheet)}</p>
      <div>{JSON.stringify(data)}</div>

      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

// export async function getStaticProps(context) {
//   // const emojis = await getEmojiList();
//   // return {
//   //   props: {
//   //     emojis: emojis.slice(1, emojis.length), // remove sheet header
//   //   },
//   //   revalidate: 1, // In seconds
//   // };
//   return [];
// }