import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import { GoogleSpreadsheet } from 'google-spreadsheet';


export default function IndexPage({ emojis }) {
  const doc = new GoogleSpreadsheet('1g8oRzHoC0RKSmOUzYukvQ9qmNGaIZo8WaV16HQhmL7Q');
  useEffect(async () => {
    await doc.useServiceAccountAuth({
      client_email: "lineliff-app@liffapp-323111.iam.gserviceaccount.com",
      private_key: "240dce7eb472ceb4fa8b08cae426d14bd2c79a34",
    });
    
  })
  return (
  <div>
{JSON.stringify(doc)}
  </div>
  )
}