
import { NextResponse } from "next/server";
import { sql,db } from '@vercel/postgres';
import pool from "../../../lib/db";
//const db = await pool.getConnection()    
export async function GET() {
  const client = await db.connect();
  // const url="http://google1.com"
  // const shorturl="Google1"
  // try {
  //   if (!url || !shorturl) throw new Error('Pet and owner names required');
  //   await client.sql`INSERT INTO url (url, shorturl) VALUES (${url}, ${shorturl});`;
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  // }
 try{
  const pets = await client.sql`SELECT * FROM url;`;
  return NextResponse.json({ info:pets.rows }, { status: 200 });
 }catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
}
export async function POST(request) {
  try {
    const client = await db.connect();
    const { url, shorturl } = await request.json();
    if (!url || !shorturl) {
      return NextResponse.json(
        { error: "url and shorturl are required." },
        { status: 400 }
      );
    }
    const pets = await client.sql`SELECT * FROM url where shorturl=${shorturl} or url = ${url};`;
    //console.log(pets.rows);
    if (pets.rowCount>0) {
      return NextResponse.json(
        { error: "true",message:"URL already Exist",success:"false" },
        { status: 404 }
      );
    }
    try {
        if (!url || !shorturl) throw new Error('url and shorturl names required');
        const result = await client.sql`INSERT INTO url (url, shorturl) VALUES (${url}, ${shorturl}) RETURNING id;`;
        return NextResponse.json({ id: result.rows[0].id, message: "INsert DOne",success:"true",error: "false" });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    
  } catch (error) {
    console.error("Database insertion error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//     try {        
//        // const db = await pool.getConnection()        
//         const query = 'select * from users'
//         const [rows] = await db.execute(query)
//         db.release()
//         return NextResponse.json(rows)
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }

// export async function POST(request) {
//   try {
//     const { email, password } = await request.json();
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required." },
//         { status: 400 }
//       );
//     }
//     const query = 'INSERT INTO users (email, password, createdAt) VALUES (?, ?, NOW())';
//     const [result] = await db.execute(query, [email, password]);
//     return NextResponse.json({ id: result.insertId, email });
//   } catch (error) {
//     console.error("Database insertion error:", error);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     const { url, shorturl } = await request.json();
//     if (!url || !shorturl) {
//       return NextResponse.json(
//         { error: "url and shorturl are required." },
//         { status: 400 }
//       );
//     }
//     const query1 = 'SELECT * FROM url WHERE shorturl = ?';
//     const [rows1] = await db.execute(query1, [shorturl]);
//     if ([rows1[0]] !="") {
//       return NextResponse.json(
//         { error: "true",message:"URL already Exist",success:"false" },
//         { status: 404 }
//       );
//     }
//     const query = 'INSERT INTO url (url, shortUrl) VALUES (?, ?)';
//     const [result] = await db.execute(query, [url, shorturl]);
//     return NextResponse.json({ id: result.insertId, message: url,shorturl,success:"true",error: "false" });
//   } catch (error) {
//     console.error("Database insertion error:", error);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }
// export async function PUT(request) {
//     try {
//       const { email, password,id } = await request.json();
//       if (!email || !password||!id) {
//         return NextResponse.json(
//           { error: "Email and password, and ID are required." },
//           { status: 400 }
//         );
//       }
//       const query = 'UPDATE users SET email = ?, password = ? WHERE id = ?';
//       const [result] = await db.execute(query, [email, password,id]);
//       return NextResponse.json({ message:"Succes" });
//     } catch (error) {
//       console.error("Database insertion error:", error);
//       return NextResponse.json(
//         { error: "Server error" },
//         { status: 500 }
//       );
//     }
//   }
  
  // export async function DELETE(request) {
  //   try {
  //     const {id } = await request.json();
  //     if (!id) {
  //       return NextResponse.json(
  //         { error: "ID IS required." },
  //         { status: 400 }
  //       );
  //     }
  //     const query = 'Delete from users WHERE id = ?';
  //     const [result] = await db.execute(query, [id]);
  //     return NextResponse.json({ message:"Deleted" });
  //   } catch (error) {
  //     console.error("Database insertion error:", error);
  //     return NextResponse.json(
  //       { error: "Server error" },
  //       { status: 500 }
  //     );
  //   }
  // }