# Wireframe & User Flow — SIMPUS-Mini

Sub-CPMK: Merancang UI/UX aplikasi (proyek).

Halaman yang sudah ada (Beranda, Daftar/Tambah Buku, Daftar/Tambah Anggota — Jobsheet 1-3) belum mencakup fitur Login, Dashboard Petugas, dan Peminjaman/Pengembalian. Dokumen ini merancang wireframe untuk halaman-halaman tersebut sebelum diimplementasikan mulai Jobsheet 5 dan seterusnya.

## Aktor
- **Tamu**: hanya bisa melihat katalog buku (Beranda, Daftar Buku) tanpa login.
- **Petugas**: login untuk mengakses seluruh fitur CRUD dan transaksi peminjaman.

## User Flow — Peminjaman Buku

```
[Petugas Login] -> [Dashboard] -> [Pilih menu "Peminjaman Baru"]
        -> [Pilih Anggota] -> [Pilih Buku (stok > 0)]
        -> [Simpan] -> [Stok buku berkurang 1] -> [Kembali ke Dashboard]
```

## User Flow — Pengembalian Buku

```
[Dashboard] -> [Menu "Pengembalian"] -> [Cari transaksi aktif (anggota/buku)]
        -> [Tandai "Dikembalikan"] -> [Stok buku bertambah 1]
        -> [Kembali ke Dashboard]
```

## Wireframe: Halaman Login

```
+--------------------------------------+
|              SIMPUS-Mini             |
|--------------------------------------|
|                                      |
|        [ Login Petugas ]            |
|                                      |
|   Username : [______________]       |
|   Password : [______________]       |
|                                      |
|          [   Masuk   ]              |
|                                      |
|   Belum punya akun? Daftar di sini  |
+--------------------------------------+
```

## Wireframe: Dashboard Petugas

```
+-----------------------------------------------------+
| SIMPUS-Mini      Beranda | Buku | Anggota | Peminjaman | (Nama Petugas) Logout |
|-------------------------------------------------------|
|  [Total Buku]   [Total Anggota]   [Sedang Dipinjam]    |
|                                                         |
|  Aksi Cepat:                                           |
|  [ + Peminjaman Baru ]   [ + Pengembalian ]            |
|                                                         |
|  Transaksi Terbaru                                     |
|  --------------------------------------------------    |
|  Anggota | Buku | Tgl Pinjam | Status                  |
+-----------------------------------------------------+
```

## Wireframe: Form Peminjaman

```
+--------------------------------------+
|  Form Peminjaman Buku                |
|--------------------------------------|
|  Anggota : [ dropdown pilih anggota ]|
|  Buku    : [ dropdown, hanya stok>0 ]|
|  Tanggal Pinjam : [ auto: hari ini ] |
|                                      |
|          [  Simpan Peminjaman  ]    |
+--------------------------------------+
```

## Wireframe: Form Pengembalian

```
+--------------------------------------+
|  Pengembalian Buku                   |
|--------------------------------------|
|  Cari transaksi aktif:               |
|  [ nama anggota / judul buku ______ ]|
|                                      |
|  Anggota | Buku | Tgl Pinjam | [Kembalikan] |
+--------------------------------------+
```

## Wireframe: Riwayat Peminjaman per Anggota

```
+--------------------------------------+
|  Riwayat Peminjaman — Siti Aminah    |
|--------------------------------------|
|  Buku            | Pinjam   | Kembali | Status      |
|  Laskar Pelangi   | 01/07    | 10/07   | Selesai     |
|  Bumi Manusia      | 15/07    | -       | Dipinjam    |
+--------------------------------------+
```

## Konsistensi dengan Desain yang Sudah Berjalan
- Warna aksen, tipografi navbar, dan gaya tabel/kartu mengikuti `assets/css/style.css` yang sudah dibangun sejak Jobsheet 2-3.
- Navbar akan ditambah menu **Peminjaman** dan indikator status login (nama petugas / tombol Logout) mulai implementasi di Jobsheet 10.
- Edge case yang perlu ditangani saat implementasi: buku stok habis tidak boleh dipilih di form peminjaman; anggota dengan tunggakan terlambat divalidasi di Jobsheet 12 (tugas mandiri).

# Tugas Jobsheet 4: Bagian 6.4 Latihan

Link github: https://github.com/Isya-25th/PemrogramanWeb2026/tree/main/jobsheet-04

---

### 1. Wireframe Halaman "Registrasi Anggota Baru" (Konvensi ASCII)
[[ SIMPUS-Mini ]]

## Registrasi Anggota Baru

[Nama Lengkap_____________]

[Email____________________]

[Password_________________]

[Ulangi Password__________]

[Daftar]

---

Sudah punya akun? [Login di sini]

### 2. User Flow: Petugas Mencari Anggota dengan Tunggakan Lewat Jatuh Tempo

    [Petugas Login] -> [Dashboard] -> [Pilih menu "Anggota"] 
    -> [Pilih tab/filter "Tunggakan Terlambat"] -> [Sistem menampilkan daftar anggota yang melewati batas waktu]
    -> [Pilih salah satu Anggota] -> [Tampilkan detail denda dan buku yang belum dikembalikan]

### 3. Identifikasi Edge Case Tambahan
Beberapa pengecualian lain yang mungkin terjadi namun belum tercatat di dokumen:
*   **Peminjaman Ganda:** Apa yang terjadi jika Petugas mencoba meminjamkan judul buku yang persis sama kepada anggota yang sama dalam satu waktu atau ketika anggota tersebut belum mengembalikan salinan sebelumnya? Sistem harus memblokir aksi ini atau memberikan peringatan.
*   **Batas Maksimal Peminjaman:** Apa yang terjadi jika seorang anggota mencoba meminjam buku melebihi batas kuota peminjaman yang diizinkan (misalnya maksimal 3 buku)? Sistem harus mendisable tombol pinjam atau memunculkan pesan error.
*   **Kehilangan atau Kerusakan Buku:** Bagaimana alur penanganan jika anggota melaporkan bahwa buku yang dipinjamnya hilang atau rusak parah? Perlu ada alur untuk mencatat denda ganti rugi atau penggantian status inventaris buku menjadi "Hilang".
*   **Sesi Login Habis:** Apa yang terjadi jika Petugas meninggalkan tab browser terbuka selama berjam-jam, lalu mencoba menyimpan transaksi peminjaman? Sistem harus mendeteksi sesi yang sudah kadaluarsa dan mengarahkan petugas kembali ke halaman Login.

### 4. Implementasi HTML Statis Wireframe Login
Berikut adalah implementasi wireframe login menjadi kode HTML statis menggunakan pola `<label>` dan `<input>` yang sudah dipelajari.

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Petugas - SIMPUS-Mini</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <h1>SIMPUS-Mini</h1>
    </header>

    <main>
        <section>
            <h2>Login Petugas</h2>
            <form action="#" method="POST">
                <div style="margin-bottom: 1rem;">
                    <label for="username">Username :</label>
                    <input type="text" id="username" name="username" required>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label for="password">Password :</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit">Masuk</button>
                
                <p>
                    Belum punya akun? <a href="register.html">Daftar di sini</a>
                </p>
            </form>
        </section>
    </main>
</body>
</html>
```