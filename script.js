// Menunggu dokumen HTML selesai dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", () => {
    
    // Mengambil elemen tombol berdasarkan ID-nya
    const sapaTombol = document.getElementById("cta-btn");

    // Menambahkan aksi ketika tombol diklik
    sapaTombol.addEventListener("click", () => {
        alert("Halo! Terima kasih sudah mampir ke portofolio saya. Semoga harimu menyenangkan! 😊");
    });
    
});
