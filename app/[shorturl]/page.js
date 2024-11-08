import { redirect } from "next/navigation"

import { sql,db } from '@vercel/postgres';
import pool from "@/lib/db"
//const db = await pool.getConnection()  

export default async function Page({ params }) {
    const shorturl = (await params).shorturl;
    const client = await db.connect(); 
    console.log(shorturl.toLowerCase())
    const pets = await client.sql`SELECT * FROM url WHERE LOWER(shorturl) = ${shorturl.toLowerCase()};`;  
    if (pets.rows !="" && pets.rowCount>0) {
      redirect(pets.rows[0].url);
    }else{
        redirect(`${process.env.NEXT_PUBLIC_HOST}`);
    }
// Check if rows1 has any result

// if (rows1.length > 0 && rows1[0].url) {   
//     // Redirect to the found URL
//     console.log(rows1[0].url);
//     redirect(rows1[0].url);
// } else {
//     // Redirect to the home page if no result is found
//     redirect(`${process.env.NEXT_PUBLIC_HOST}`);
// }
    return <div>My Post: {url}</div>
}