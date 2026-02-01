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

    let title, summary, date, content = "", imageData = null; // Changed from imageUrl to imageData
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = formData.get("title") ?? "";
      summary = formData.get("summary") ?? "";
      date = formData.get("date") ?? "";
      content = formData.get("content") ?? "";
      imageData = formData.get("imageData") ?? null; // Expect imageData as Base64 string
    } else {
      const body = await req.json();
      title = body.title ?? "";
      summary = body.summary ?? "";
      date = body.date ?? "";
      content = body.content ?? "";
      imageData = body.imageData ?? null; // Expect imageData as Base64 string
    }

    const db = admin.firestore();
    const counterRef = db.collection("_counters").doc("news");
    const newsRef = db.collection("news");

    const newId = await db.runTransaction(async (t) => {
      const counterSnap = await t.get(counterRef);
      const nextId = counterSnap.exists && counterSnap.data().nextId != null
        ? counterSnap.data().nextId
        : 0;
      const docRef = newsRef.doc(String(nextId));
      t.set(docRef, {
        title,
        summary,
        date,
        content,
        imageData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      t.set(counterRef, { nextId: nextId + 1 }, { merge: true });
      return nextId;
    });

    return new Response(
      JSON.stringify({ id: String(newId) }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /api/news error", err);
    return new Response(
      JSON.stringify({ error: err.message || "internal" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
