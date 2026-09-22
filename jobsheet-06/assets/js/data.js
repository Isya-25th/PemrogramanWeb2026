// Latihan 8.4 no 1
async function muatDataGenerik(urlData, daftarKunci) {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    
    if (!tbody) return;
    
    loading.style.display = "block";
    tbody.innerHTML = "";
    
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        
        const res = await fetch(urlData);
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        
        const arrayData = await res.json();
        
        arrayData.forEach(function (item) {
            const tr = document.createElement("tr");
            let tdContent = "";
            
            daftarKunci.forEach(function (kunci) {
                tdContent += "<td>" + item[kunci] + "</td>";
            });
            
            tdContent += "<td>" +
                         "<button type=\"button\">Edit</button> " +
                         "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                         "</td>";
            
            tr.innerHTML = tdContent;
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"6\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    
    if (path.includes("buku/list.html")) {
        muatDataGenerik("../data/buku.json", ["judul", "pengarang", "tahun", "stok", "kategori"]);
    } else if (path.includes("anggota/list.html")) {
        muatDataGenerik("../data/anggota.json", ["no_anggota", "nama", "alamat", "no_hp"]);
    }
});