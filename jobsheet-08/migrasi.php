<?php
require __DIR__ . '/includes/koneksi.php';

$json_data = file_get_contents(__DIR__ . '/data/buku.json');
$buku_array = json_decode($json_data, true);

if (!$buku_array) {
    die("Gagal membaca file JSON atau file kosong.");
}

$stmt = $pdo->prepare(
    "INSERT INTO buku (judul, pengarang, tahun, stok, kategori) 
     VALUES (:judul, :pengarang, :tahun, :stok, :kategori)"
);

$berhasil = 0;

foreach ($buku_array as $buku) {
    try {
        $stmt->execute([
            'judul'     => $buku['judul'],
            'pengarang' => $buku['pengarang'],
            'tahun'     => (int)$buku['tahun'],
            'stok'      => (int)$buku['stok'],
            'kategori'  => $buku['kategori'] ?? 'Umum'
        ]);
        $berhasil++;
    } catch (PDOException $e) {
        echo "Gagal memigrasi buku: " . $buku['judul'] . " - Error: " . $e->getMessage() . "<br>";
    }
}

echo "<h3>Migrasi selesai! Berhasil memindahkan $berhasil buku ke database PostgreSQL.</h3>";
echo "<a href='buku/list.php'>Lihat Daftar Buku</a>";
?>