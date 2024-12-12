import { NextResponse } from "next/server";
import { sql,db } from '@vercel/postgres';
import pool from "../../../lib/db";


export async function POST(request) {
    try {
      const client = await db.connect();
      const { airport_name } = await request.json();  
      
      if (!airport_name) {
        return NextResponse.json(
          { error: "airport_name is required." },
          { status: 400 }
        );
      }  
      console.log(airport_name);
      const result = await client.sql`
        SELECT * FROM airports
        WHERE airport_name LIKE ${'%' + airport_name + '%'} 
           OR city_iata_code LIKE ${'%' + airport_name + '%'}
      `;
      if (result.rowCount > 0) {
        const airport = result.rows; // Assuming you only need the first match
        return NextResponse.json({
            data: result.rows,  // Return the array of rows
            message: "Successfully Fetched",
            success: "true",
            error: "false",
            count:result.rowCount
          });
      } else {
        return NextResponse.json(
          { message: "No airports found matching the search criteria." },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Database query error:", error);
      return NextResponse.json(
        { error: "Server error" },
        { status: 500 }
      );
    }
  }
  

  export async function GET(request) {
    try {
        const client = await db.connect();        
        const result = await client.sql`SELECT 
      id,
      CONCAT(airport_name, ' (', city_iata_code, ')', ', ', country_iso2,' ',country_name) AS airport_info
  FROM airports;`;
  
        // Check if results are found
        if (result.rowCount > 0) {
          const airport = result.rows; // Assuming you only need the first match

          return NextResponse.json({
              data: result.rows,  // Return the array of rows
              message: "Successfully Fetched",
              success: "true",
              error: "false",
              count:result.rowCount
            });
        } else {
          return NextResponse.json(
            { message: "No airports found matching the search criteria." },
            { status: 404 }
          );
        }
      } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json(
          { error: "Server error" },
          { status: 500 }
        );
      }
    }