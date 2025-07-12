const produkData = [
  { id: 1, nama: "Tas Gunung 50L", harga: 1000000, deskripsi: "Cocok untuk ekspedisi panjang", foto: "images/TasCarrier.png" },
  { id: 2, nama: "Sepatu Hiking", harga: 500000, deskripsi: "Anti slip dan tahan air", foto: "images/Sepatu.png" },
  { id: 3, nama: "Tenda 4 Orang", harga: 1500000, deskripsi: "Tenda keluarga kapasitas 4 orang", foto: "images/Tenda.png" },
  { id: 4, nama: "Matras Outdoor", harga: 250000, deskripsi: "Matras ringan dan tahan air", foto: "images/Matras.png" },
  { id: 5, nama: "Jaket Gunung", harga: 750000, deskripsi: "Tahan angin dan hujan", foto: "images/Jaket.png" },
  { id: 6, nama: "Kompor Portable", harga: 300000, deskripsi: "Ringan dan mudah dibawa", foto: "images/Kompor.png" },
];

let keranjang = [];
let riwayat = [];
let user = '';
let produkBeliLangsung = null;

function showSection(id) {
  document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'produk') renderProduk();
  if (id === 'keranjang') renderKeranjang();
  if (id === 'riwayat') renderRiwayat();
  updateUserWelcome();
}

function toggleTentangKami() {
  const box = document.getElementById('tentangKamiBox');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function renderProduk() {
  const list = document.getElementById('produkList');
  list.innerHTML = '';
  produkData.forEach(p => {
    const div = document.createElement('div');
    div.className = 'produk';
    div.innerHTML = `
      <img src="${p.foto}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>${p.deskripsi}</p>
      <p>Rp ${p.harga.toLocaleString('id-ID')}</p>
      <button onclick="tambahKeranjang(${p.id})">+ Keranjang</button>
      <button onclick="beliProduk(${p.id})">Beli Sekarang</button>
    `;
    list.appendChild(div);
  });
}

function tambahKeranjang(id) {
  const produk = produkData.find(p => p.id === id);
  const item = keranjang.find(i => i.id === id);
  if (item) item.jumlah++;
  else keranjang.push({ ...produk, jumlah: 1 });
  alert("Produk ditambahkan ke keranjang.");
}

function renderKeranjang() {
  const list = document.getElementById('keranjangList');
  const totalText = document.getElementById('totalHarga');
  list.innerHTML = '';
  let total = 0;
  keranjang.forEach((p, i) => {
    total += p.harga * p.jumlah;
    const div = document.createElement('div');
    div.className = 'keranjang-item';
    div.innerHTML = `
      <strong>${p.nama}</strong><br>
      Harga: Rp ${p.harga.toLocaleString('id-ID')}<br>
      Jumlah: ${p.jumlah}
    `;
    list.appendChild(div);
  });
  totalText.innerText = `Total Harga: Rp ${total.toLocaleString('id-ID')}`;
}

function checkoutKeranjang() {
  const nama = document.getElementById('namaPenerima').value;
  const alamat = document.getElementById('alamatPengiriman').value;
  const metode = document.getElementById('metodePembayaran').value;
  const ekspedisi = document.getElementById('ekspedisiPengiriman').value;
  if (!nama || !alamat || !metode || !ekspedisi) return alert("Harap lengkapi data checkout.");
  if (keranjang.length === 0) return alert("Keranjang kosong.");
  keranjang.forEach(item => {
    riwayat.push({
      nama: `${item.nama} x${item.jumlah}`,
      harga: item.harga * item.jumlah,
      waktu: new Date().toLocaleString(),
      penerima: nama,
      alamat,
      metode,
      ekspedisi
    });
  });
  keranjang = [];
  alert("Transaksi berhasil!");
  showSection('riwayat');
}

function beliProduk(id) {
  const produk = produkData.find(p => p.id === id);
  produkBeliLangsung = produk;
  document.getElementById('checkoutDetailLangsung').innerHTML = `
    <p><strong>${produk.nama}</strong> - Rp ${produk.harga.toLocaleString('id-ID')}</p>
  `;
  showSection('checkoutLangsung');
}

function konfirmasiCheckoutLangsung() {
  const nama = document.getElementById('checkoutNama').value;
  const alamat = document.getElementById('checkoutAlamat').value;
  const metode = document.getElementById('checkoutMetode').value;
  const ekspedisi = document.getElementById('checkoutEkspedisi').value;
  if (!nama || !alamat || !metode || !ekspedisi) return alert("Mohon isi semua data.");
  riwayat.push({
    nama: produkBeliLangsung.nama,
    harga: produkBeliLangsung.harga,
    waktu: new Date().toLocaleString(),
    penerima: nama,
    alamat,
    metode,
    ekspedisi
  });
  produkBeliLangsung = null;
  alert("Transaksi berhasil!");
  showSection('riwayat');
}

function renderRiwayat() {
  const list = document.getElementById('riwayatList');
  list.innerHTML = '';
  if (riwayat.length === 0) return list.innerHTML = '<p>Belum ada transaksi.</p>';
  riwayat.forEach(r => {
    const div = document.createElement('div');
    div.className = 'keranjang-item';
    div.innerHTML = `
      <strong>${r.waktu}</strong><br>
      ${r.nama} - Rp ${r.harga.toLocaleString('id-ID')}<br>
      Penerima: ${r.penerima || '-'}<br>
      Alamat: ${r.alamat || '-'}<br>
      Metode: ${r.metode || '-'}<br>
      Ekspedisi: ${r.ekspedisi || '-'}
    `;
    list.appendChild(div);
  });
}

function updateUserWelcome() {
  const area = document.getElementById('userWelcome');
  area.innerHTML = user ? `👋 Hai, ${user}` : `<a href="#" onclick="alert('Login belum tersedia')" style="color: white;">Login</a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  showSection('beranda');
});
