import admin from "firebase-admin";

function initAdmin() {
  if (!admin.apps.length) {
    const keyJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!keyJson) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON not set");
    }
    const credential = admin.credential.cert(JSON.parse(keyJson));
    admin.initializeApp({ credential }); // Removed storageBucket
  }
}

async function requireAdmin(req) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    console.error("FIREBASE_SERVICE_ACCOUNT_JSON not set");
    return {
      error: new Response(
        JSON.stringify({ error: "server_config", message: "Server belum dikonfigurasi. Set FIREBASE_SERVICE_ACCOUNT_JSON di .env.local." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
  initAdmin();
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith("session="));
  if (!match)
    return { error: new Response(JSON.stringify({ error: "no session" }), { status: 401 }) };
  const sessionCookie = match.split("=")[1];
  const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
  const uid = decoded.uid;
  if (!uid) {
    console.error("requireAdmin: decoded UID is missing or invalid for session", decoded);
    return { error: new Response(JSON.stringify({ error: "auth_error", message: "Invalid session data. Please log in again." }), { status: 401 }) };
  }
  const userSnap = await admin.firestore().doc(`users/${uid}`).get();
  const role = userSnap.exists ? userSnap.data().role : null;
  if (role !== "admin")
    return { error: new Response(JSON.stringify({ error: "forbidden" }), { status: 403 }) };
  return { uid };
}

export async function POST(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const { uid } = auth;

    let nis, name, title, year, content, imageData = null;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      nis = (formData.get("nis") ?? "").toString().trim();
      name = formData.get("name") ?? "";
      title = formData.get("title") ?? "";
      year = formData.get("year") ?? "";
      content = formData.get("content") ?? "";
      imageData = formData.get("imageData") ?? null;
    } else {
      const body = await req.json();
      nis = (body.nis ?? "").toString().trim();
      name = body.name ?? "";
      title = body.title ?? "";
      year = body.year ?? "";
      content = body.content ?? "";
      imageData = body.imageData ?? null;
    }

    if (!nis || !/^\d{6}$/.test(nis)) {
      return new Response(
        JSON.stringify({ error: "invalid_nis", message: "NIS is required and must be 6 digits." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const db = admin.firestore();
    const profilesRef = db.collection("profiles");
    const docRef = profilesRef.doc(String(nis));
    await docRef.set({
      name,
      title,
      year,
      content,
      imageData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ id: nis }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /api/profiles error", err);
    return new Response(
      JSON.stringify({ error: err.message || "internal" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
