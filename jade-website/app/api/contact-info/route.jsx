import { NextResponse } from "next/server";
import sql from "mssql";

// SQL Server config
const dbserver = {
  server: "localhost",
  database: "Test",
  user: "Igneciarathna",
  password: "Ignecia@123",
  trustServerCertificate: true,
  options: {
    trustedConnection: true,
  },
};

export async function POST(req) {
    console.log(process.env.RECAPTCHA_SECRET_KEY)
  try {
    const body = await req.json();
    const { name, email, phone, organization, recaptchaToken } = body;
    const safeMessage = organization?.trim() === "" ? null : organization;
    // 1. Verify reCAPTCHA
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const captchaResult = await verifyRes.json();
    if (!captchaResult.success) {
      return NextResponse.json({ success: false, error: "reCAPTCHA failed" }, { status: 400 });
    }

    // 2. Connect to DB
    const pool = await sql.connect(dbserver);

    // 3. Insert data
    await pool.request()
      .input("Name", sql.VarChar(100), name)
      .input("Email", sql.VarChar(255), email)
      .input("Phone", sql.VarChar(10), phone)
      .input("Organization", sql.VarChar(250), safeMessage)
      .query(`INSERT INTO tblContactMessages (Name, Email, Phone, Organization) 
              VALUES (@Name, @Email, @Phone, @Organization)`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (sql.connected) await sql.close();
  }
}
