/*
import { redirect } from "next/navigation"
import pool from "@/lib/db"
const db = await pool.getConnection()  

export default async function Page({ params }) {
    const shorturl = (await params).shorturl;
const query1 = 'SELECT * FROM url WHERE shorturl = ?';
const [rows1] = await db.execute(query1, [shorturl]);
// Check if rows1 has any result

if (rows1.length > 0 && rows1[0].url) {   
    // Redirect to the found URL
    console.log(rows1[0].url);
    redirect(rows1[0].url);
} else {
    // Redirect to the home page if no result is found
    redirect(`${process.env.NEXT_PUBLIC_HOST}`);
}
    return <div>My Post: {url}</div>
}
*/
