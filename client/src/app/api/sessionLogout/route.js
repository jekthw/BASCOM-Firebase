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

export async function POST() {
  try {
    initAdmin();
    const isSecure = process.env.NODE_ENV === "production";
    const cookie = `session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${isSecure ? "; Secure" : ""}`;
    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("sessionLogout error", err);
    return new Response(JSON.stringify({ error: err.message || "internal" }), { status: 500 });
  }
}

