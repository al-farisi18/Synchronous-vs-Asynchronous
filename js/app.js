/**
 * Synchronous vs Asynchronous di JavaScript
 * Jalankan: node examples/sync-vs-async.js
 */

// Helper: simulasi tugas lambat (mis. request API / baca database)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper: blocking (synchronous) - menahan thread selama ms milidetik
function blockingWait(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // sengaja kosong: thread tertahan di sini
  }
}

/* ------------------------------------------------------------------ */
/* 1. SYNCHRONOUS: kode dijalankan berurutan, baris berikutnya MENUNGGU */
/* ------------------------------------------------------------------ */
function contohSynchronous() {
  console.log("=== SYNCHRONOUS ===");
  console.log("1. Mulai");
  blockingWait(1000); // program "macet" 1 detik
  console.log("2. Tugas lambat selesai (setelah 1 detik)");
  console.log("3. Selesai");
}

/* ------------------------------------------------------------------ */
/* 2. ASYNCHRONOUS: tugas lambat dijalankan di latar belakang          */
/* ------------------------------------------------------------------ */
function contohAsynchronous() {
  console.log("\n=== ASYNCHRONOUS ===");
  console.log("1. Mulai");
  setTimeout(() => {
    console.log("3. Tugas lambat selesai (setelah 1 detik)");
  }, 1000);
  console.log("2. Selesai (tanpa menunggu tugas lambat)");
}

/* ------------------------------------------------------------------ */
/* 3 CARA MENULIS KODE ASYNCHRONOUS                                    */
/* ------------------------------------------------------------------ */

// Cara 1: Callback
function ambilDataCallback(callback) {
  setTimeout(() => callback(null, { id: 1, nama: "Budi" }), 500);
}

// Cara 2: Promise
function ambilDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id: 1, nama: "Budi" }), 500);
    // reject(new Error("Gagal")) jika terjadi error
  });
}

// Cara 3: async/await (dibangun di atas Promise)
async function ambilDataAsyncAwait() {
  await delay(500);
  return { id: 1, nama: "Budi" };
}

function demoTigaCara() {
  console.log("\n=== 3 CARA ASYNCHRONOUS ===");

  // 1. Callback
  ambilDataCallback((err, data) => {
    if (err) return console.error(err);
    console.log("[Callback]    ", data);
  });

  // 2. Promise
  ambilDataPromise()
    .then((data) => console.log("[Promise]     ", data))
    .catch((err) => console.error(err));

  // 3. async/await
  (async () => {
    try {
      const data = await ambilDataAsyncAwait();
      console.log("[async/await] ", data);
    } catch (err) {
      console.error(err);
    }
  })();
}

/* ------------------------------------------------------------------ */
/* 4. PERBANDINGAN WAKTU: 3 tugas @1 detik                             */
/* ------------------------------------------------------------------ */
async function bandingkanWaktu() {
  console.log("\n=== PERBANDINGAN WAKTU (3 tugas @ 1 detik) ===");

  // Sequential (menunggu satu per satu) -> ~3 detik
  let t = Date.now();
  await delay(1000);
  await delay(1000);
  await delay(1000);
  console.log(`Berurutan : ${Date.now() - t} ms`);

  // Paralel dengan Promise.all -> ~1 detik
  t = Date.now();
  await Promise.all([delay(1000), delay(1000), delay(1000)]);
  console.log(`Paralel   : ${Date.now() - t} ms`);
}

/* ------------------------------------------------------------------ */
/* Jalankan semua demo secara berurutan                                */
/* ------------------------------------------------------------------ */
async function main() {
  contohSynchronous();
  contohAsynchronous();
  await delay(1500); // beri waktu demo asynchronous selesai
  demoTigaCara();
  await delay(1000); // beri waktu 3 cara selesai
  await bandingkanWaktu();
}

main();