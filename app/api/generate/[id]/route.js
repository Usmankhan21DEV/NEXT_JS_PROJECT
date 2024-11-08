/*import { NextResponse } from "next/server";
import  pool  from "../../../../lib/db";
const db = await pool.getConnection()    

export async function GET(request, { params }) {
  const { id } = await params; 

  try {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params; 

  try {
    const query = 'delete FROM users WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({message:"USER DELETED"});
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
