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

export async function POST(req) {
  try {
    initAdmin();
    const { idToken } = await req.json();
    console.log("sessionLogin: Received ID Token", idToken ? "(present)" : "(missing)");
    if (!idToken) return new Response(JSON.stringify({ error: "Missing idToken" }), { status: 400 });

    const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    const isSecure = process.env.NODE_ENV === "production";
    const cookie = `session=${sessionCookie}; HttpOnly; Path=/; Max-Age=${Math.floor(expiresIn / 1000)}; SameSite=Strict${isSecure ? "; Secure" : ""}`;

    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("sessionLogin error", err);
    return new Response(JSON.stringify({ error: err.message || "internal" }), { status: 500 });
  }
}

