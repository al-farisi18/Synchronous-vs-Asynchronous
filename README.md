# Synchronous-vs-Asynchronous
# Synchronous vs Asynchronous di JavaScript

Catatan belajar tentang cara JavaScript menjalankan kode: berurutan (synchronous) atau tanpa menunggu (asynchronous).

## 1. Synchronous

Kode dijalankan **satu per satu, berurutan**. Baris berikutnya hanya berjalan setelah baris sebelumnya selesai. Jika ada tugas lambat, seluruh program **tertahan (blocking)**.

```js
console.log("1. Mulai");
blockingWait(1000); // program macet 1 detik
console.log("2. Selesai");
```

## 2. Asynchronous

Tugas yang lambat (request API, baca file, timer, database) dijalankan **di latar belakang**, sementara program lanjut mengerjakan baris berikutnya. Hasilnya ditangani nanti ketika sudah siap (**non-blocking**).

```js
console.log("1. Mulai");
setTimeout(() => console.log("3. Tugas lambat selesai"), 1000);
console.log("2. Selesai"); // tampil sebelum nomor 3
```

## 3. Perbedaan Synchronous vs Asynchronous

| Aspek | Synchronous | Asynchronous |
|---|---|---|
| Alur eksekusi | Berurutan, saling menunggu | Tidak saling menunggu |
| Sifat | Blocking | Non-blocking |
| Urutan output | Sesuai urutan penulisan | Bisa berbeda dari urutan penulisan |
| Performa | Lambat bila ada tugas berat | Efisien untuk tugas I/O |
| Kompleksitas | Mudah dipahami | Perlu callback / Promise / async-await |
| Contoh | Loop, kalkulasi, `fs.readFileSync` | `setTimeout`, `fetch`, `fs.readFile` |

## 4. Contoh

**Analogi:** Synchronous seperti antre di kasir, satu pelanggan selesai baru yang berikutnya dilayani. Asynchronous seperti pesan makanan di restoran: pesanan dicatat, kamu boleh mengobrol, dan makanan diantar ketika siap.

Kode lengkap ada di [`examples/sync-vs-async.js`](./examples/sync-vs-async.js).

```bash
node examples/sync-vs-async.js
```

## 5. Tiga Cara Menulis Kode Asynchronous di JavaScript

### a. Callback
Fungsi yang dikirim sebagai argumen dan dipanggil setelah tugas selesai. Kekurangan: bisa menjadi *callback hell* jika bersarang dalam.

```js
ambilData((err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

### b. Promise
Objek yang mewakili hasil di masa depan (`pending`, `fulfilled`, `rejected`). Dirangkai dengan `.then()` dan `.catch()`.

```js
ambilData()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### c. async/await
Sintaks di atas Promise yang membuat kode asynchronous terlihat seperti synchronous. Error ditangani dengan `try/catch`.

```js
async function main() {
  try {
    const data = await ambilData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

> **Tips:** Untuk tugas yang tidak saling bergantung, gunakan `Promise.all([...])` agar berjalan paralel (3 tugas @1 detik selesai ±1 detik, bukan 3 detik).

## Struktur Repo

```
.
├── README.md
└── examples/
    └── sync-vs-async.js
```