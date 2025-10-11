import natural from "natural";

// Daftar gelar umum (front & belakang) — kamu bisa tambah sendiri
const TITLES = [
    // Gelar kehormatan / sosial / agama / umum
    "alm", "h", "hj", "haji", "hajjah", "haji", "hj", "prof", "dr", "drs", "ir",
    "mr", "mrs", "ms", "mrs", "ms", "lord", "lady", "sir", "dame",

    // Gelar akademik / sarjana / master / doktor / profesional Indonesia
    "s", "se", "sh", "sk", "skh", "sik", "ski", "sip", "sps", "sos", "stum", "sta",
    "stm", "stra", "str", "strk", "stmj", "stmh", "stif", "staf", "s.s", "s.sc",
    "skom", "s.ked", "s.km", "ska", "skm", "sik", "si", "sib", "siu", "snum",
    "m", "m.si", "mpd", "mh", "msc", "mkom", "mt", "mm", "mba", "mhum", "m.m", "m.s",
    "dr.hc", "drhc", "drh", "dr", "drs", "drsum", "dokt", "dott", "doktor", "phd",
    "pd", "pdg", "dok", "dokh", "doktorandus", "doctor", "doct", "dipl", "diploma",
    "st", "stt", "stm", "sta", "str", "strk", "strm", "strata", "strh",

    // Gelar spesialis (umum di kedokteran, medis, klinik, profesi)
    "sp", "sp.a", "sp.p", "sp.og", "sp.jp", "sp.bp", "sp.kj", "sp.and", "sp.b", "sp.u",
    "sp.kb", "sp.m", "sp.jg", "sp.tht", "sp.rad", "sp.an", "sp.gk", "sp.psk",

    // Gelar profesional / teknis / vokasi
    "apt", "amd", "ama", "a.md", "a.ma", "ap", "a.p", "a.pd", "ak", "aks", "akt",

    // Gelar luar negeri / internasional
    "bsc", "ba", "bs", "bb", "bba", "bba", "bfa", "bbus", "bau", "bed", "beng", "bis",
    "bsc", "bsc.", "msc", "ma", "ms", "master", "mba", "mpa", "mph", "med", "md",
    "mdl", "phd", "dphil", "dphil", "dsc", "llb", "llm", "jd", "ed", "edd", "dr", "dr.", 
    "doc", "doctor",

    // Gelar kehormatan / tambahan luar negeri
    "hon", "honorary", "baron", "count", "viscount", "duke", "duchess", "khn", "k.u.k", 
    "frs", "fellow", "fca", "fcpa", "ll.d", "s.c.", "ac", "om", "kc", "qsc", "qc"
];


/**
 * Normalize nama: hapus gelar, titik, rapihkan spasi, lowercase
 */
function normalizeName(str) {
    if (!str) return "";

    let lower = str.toLowerCase();

    // hapus titik & koma
    lower = lower.replace(/[.,]/g, " ");

    // pecah jadi kata
    let parts = lower.split(/\s+/).filter(Boolean);

    // gabungkan kata yang kepisah tapi aslinya gelar (contoh: "s e" → "se")
    for (let i = 0; i < parts.length - 1; i++) {
        const combined = parts[i] + parts[i + 1];
        if (TITLES.includes(combined)) {
            parts[i] = combined;
            parts.splice(i + 1, 1);
        }
    }

    // filter: buang kalau match gelar
    const filtered = parts.filter(p => !TITLES.includes(p));

    return filtered.join(" ").trim();
}

function generateVariants(name) {
  const parts = name.split(" ").filter(Boolean);

  // 1. Full nama
  const full = parts.join(" ");

  // 3. Semua kecuali terakhir inisial
  const allButLast = parts
    .map((p, i) => (i < parts.length - 1 ? p[0] : p))
    .join(" ");

  // 4. Hanya nama depan jadi inisial
  const firstInitial = [parts[0][0], ...parts.slice(1)].join(" ");

  // 5. Nama depan inisial + nama terakhir (paling common)
  const firstAndLast =
    parts.length > 2
      ? `${parts[0][0]} ${parts[parts.length - 1]}`
      : firstInitial;
  return [full, allButLast, firstInitial, firstAndLast];
}

function isSimilar(name1, name2, strongThreshold = 0.85, weakThreshold = 0.5) {
  const variants1 = generateVariants(normalizeName(name1));
  const variants2 = generateVariants(normalizeName(name2));

  let maxSim = 0;
  for (let v1 of variants1) {
    for (let v2 of variants2) {
      const sim = natural.JaroWinklerDistance(v1, v2);
      maxSim = Math.max(maxSim, sim);
      if (sim >= strongThreshold) {
        return { status: "VERIFIED", similarity: sim }; // langsung lulus
      }
    }
  }

  if (maxSim >= weakThreshold) {
    return { status: "PENDING", similarity: maxSim }; // perlu verifikasi admin
  }

  return { status: "REJECTED", similarity: maxSim }; // langsung gagal
}

export function findSimilarName(name1, name2, strongThreshold = 0.85, weakThreshold = 0.6) {
  return isSimilar(name1, name2, strongThreshold, weakThreshold);
}

