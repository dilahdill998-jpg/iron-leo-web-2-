// ===== DATA PRODUK IRON LEO =====
// Untuk mengubah produk, cukup edit file ini lalu simpan dan muat ulang halaman.
// - whatsapp : nomor pemesanan, format 62 tanpa + atau spasi
// - price    : harga angka tanpa titik (150000 = Rp150.000)
// - category : pria, wanita, atau unisex
// - images   : foto pertama jadi sampul. Taruh file foto di folder img/
// - active   : false kalau produk ingin disembunyikan
  window.PENGATURAN = {
  "whatsapp": "6283196512099",
  "instagram": "ironleo_syrus",
  "tiktok": "ironleo_syrus",
  "alamat": "Kampung Kebon Manggis RT03/04, Kelurahan Paledang, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16122"
};

window.PRODUK = [
    {
    "id": "blue-aura",
    "name": "Blue Aura",
    "category": "pria",
    "price": 43000,
    "size": "30 ml",
    "tagline": "Rasakan kesegaran yang memancarkan ketenangan dalam setiap semprotan.",
    "story": `Blue Aura adalah Eau De Parfum dengan karakter Fresh, Aquatic, dan Citrus. Aromanya bersih dan menenangkan, memberi kesan elegan, modern, dan percaya diri.
              Nanas dan citrus membuka aromanya dengan segar. Bergamot dan lemon menjaganya tetap bersih di tengah, lalu musk dan woody menutupnya dengan hangat dan berkelas.
              Ringan namun tetap berkarakter. Cocok dipakai pria maupun wanita, dari kuliah, kerja, dan hangout sampai meeting dan acara formal.`,
    "notes": {
      "top": "Nanas, Citrus",
      "middle": "Bergamot, Lemon",
      "base": "Musk, Woody"
    },
    "images": [
      "img/blue-aura/1.webp",
      "img/blue-aura/2.webp",
      "img/blue-aura/3.webp",
      "img/blue-aura/4.webp",
      "img/blue-aura/5.webp",
      "img/blue-aura/6.webp"
    ],
    "active": true
  },
  {
    "id": "golden-eclipse",
    "name": "Golden Eclipse",
    "category": "unisex",
    "price": 43000,
    "size": "30 ml",
    "tagline": "Manis madu yang hangat, dibungkus vanila dan musk.",
    "story": "Golden Eclipse dibuat untuk orang yang suka aroma hangat dan berkarakter, tanpa memandang siapa pemakainya.\n\nMadu dan citrus membuka aromanya dengan manis yang lembut. Vanila mengisi tengahnya, dan musk menutupnya dengan kesan mewah yang bertahan lama.\n\nPas untuk malam hari, acara spesial, atau saat Anda ingin tampil lebih berkesan.",
    "notes": {
      "top": "Madu, Citrus",
      "middle": "Vanila",
      "base": "Musk"
    },
    "images": [
      "img/golden-eclipse/1.webp",
      "img/golden-eclipse/2.webp",
      "img/golden-eclipse/3.webp",
      "img/golden-eclipse/4.webp",
      "img/golden-eclipse/5.webp"
    ],
    "active": true
  },
  {
    "id": "queen-aura",
    "name": "Queen Aura",
    "category": "wanita",
    "price": 43000,
    "size": "30 ml",
    "tagline": "Mawar dan vanila yang anggun, dengan kesan kuat di baliknya.",
    "story": "Queen Aura untuk perempuan yang tahu apa yang ia mau. Anggun, tapi tidak pernah lemah.\n\nMawar dan bergamot membuka aromanya dengan segar dan feminin. Vanila membuatnya terasa lembut, lalu musk menjaga jejaknya tetap tertinggal setelah Anda pergi.\n\nNyaman dipakai seharian, dari kerja sampai kumpul bersama teman.",
    "notes": {
      "top": "Mawar, Bergamot",
      "middle": "Vanila",
      "base": "Musk"
    },
    "images": [
      "img/queen-aura/1.webp",
      "img/queen-aura/2.webp",
      "img/queen-aura/3.webp",
      "img/queen-aura/4.webp",
      "img/queen-aura/5.webp",
      "img/queen-aura/6.webp"
    ],
    "active": true
  }
];
