import admin from "firebase-admin";

function initAdmin() {
  if (!admin.apps.length) {
    const keyJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!keyJson) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON not set");
    }
    const credential = admin.credential.cert(JSON.parse(keyJson));
    admin.initializeApp({ credential });
  }
}

export async function GET(req) {
  try {
    initAdmin();
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.split(";").map(s=>s.trim()).find(s=>s.startsWith("session="));
    if (!match) return new Response(JSON.stringify({ error: "no session" }), { status: 401 });
    const sessionCookie = match.split("=")[1];
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    console.log("sessionUser: Decoded session cookie", decoded);
    return new Response(JSON.stringify({ uid: decoded.uid, email: decoded.email }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("sessionUser error", err);
    return new Response(JSON.stringify({ error: err.message || "internal" }), { status: 401 });
  }
}

