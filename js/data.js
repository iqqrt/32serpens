/**
 * Data 33 Mahasiswa Baru (Maba) Cluster 32 - Serpens
 * Setiap objek merepresentasikan 1 titik bintang dalam rasi Serpens.
 * Mentor dapat dengan mudah mengedit nama, panggilan, prodi, pesan, dan foto/avatar di file ini.
 */

const MABA_DATA = [
  {
    id: 1,
    name: "INDRI ANINDYA",
    nickname: "Indri",
    prodi: "Animasi",
    starName: "Alpha Serpentis (Unukalhai)",
    message: "Halo Indri! Semangat terus ya di prodi Animasi. Semoga imajinasi dan karya animasimu makin luar biasa, serta sukses selalu di dunia perkuliahan dan kehidupannya!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #fbbf24)",
    icon: "🦅"
  },
  {
    id: 2,
    name: "MEDINA KAMILIA SYARIF",
    nickname: "Medina",
    prodi: "Animasi",
    starName: "Beta Serpentis",
    message: "Medina, luar biasa banget kerja keras dan kekompakanmu! Semoga di prodi Animasi kamu bisa melahirkan karya-karya hebat yang menginspirasi dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #9333ea, #e879f9)",
    icon: "🪶"
  },
  {
    id: 3,
    name: "ROICHATUL JANNAH",
    nickname: "Icha",
    prodi: "Animasi",
    starName: "Gamma Serpentis",
    message: "Icha, terima kasih sudah selalu aktif dan bawa energi positif di Cluster 32! Semoga perjalanan kuliahmu di prodi Animasi lancar, seru, dan membanggakan!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #fbbf24)",
    icon: "✨"
  },
  {
    id: 4,
    name: "VALENTINO FEBRYAN",
    nickname: "Ryan",
    prodi: "Seni Kuliner",
    starName: "Delta Serpentis",
    message: "Ryan, semangat koki masa depan! Semoga di prodi Seni Kuliner kamu bisa makin mengasah bakatmu dan sukses menciptakan kreasi-kreasi terbaik di kehidupanmu!",
    avatarBg: "linear-gradient(135deg, #a855f7, #f472b6)",
    icon: "🌟"
  },
  {
    id: 5,
    name: "KHAIRA SHAFIYA ZAHWA",
    nickname: "Zahwa",
    prodi: "Teknik Grafika",
    starName: "Epsilon Serpentis",
    message: "Zahwa, ketelitian dan semangatmu selama PKKMB bener-bener jempolan! Semoga sukses selalu di prodi Teknik Grafika dan kehidupannya kedepan ya!",
    avatarBg: "linear-gradient(135deg, #6b21a8, #c084fc)",
    icon: "🦅"
  },
  {
    id: 6,
    name: "LIFARO AGANTA",
    nickname: "Faro",
    prodi: "Teknik Grafika",
    starName: "Zeta Serpentis",
    message: "Faro, makasih ya udah selalu tanggap dan membantu teman-teman se-cluster. Semoga di prodi Teknik Grafika kamu makin bersinar dan berprestasi!",
    avatarBg: "linear-gradient(135deg, #8b5cf6, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 7,
    name: "ANGGITA SALMA KHAIRUNISA",
    nickname: "Gita",
    prodi: "Teknologi Rekayasa Pengemasan",
    starName: "Eta Serpentis",
    message: "Gita, keaktifan dan keceriaanmu bikin suasana kelompok selalu hangat. Semoga sukses di prodi TRP dan lancar selalu di perkuliahan & karirmu nanti!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #e879f9)",
    icon: "👑"
  },
  {
    id: 8,
    name: "SOFI PEBRIANTY",
    nickname: "Sofi",
    prodi: "Penerbitan",
    starName: "Theta Serpentis (Alya)",
    message: "Sofi, antusiasme dan kerja kerasmu keren banget! Semoga di prodi Penerbitan kamu bisa terus berkarya, menerbitkan hal-hal hebat, dan meraih impianmu!",
    avatarBg: "linear-gradient(135deg, #c084fc, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 9,
    name: "SALSABILA RAMADHANI",
    nickname: "Salsa",
    prodi: "Penerbitan",
    starName: "Iota Serpentis",
    message: "Salsa, pembawaan kamu yang tenang dan solutif ngebantu banget kelompok kita. Semoga sukses di prodi Penerbitan dan kehidupannya mendatang!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #e879f9)",
    icon: "💫"
  },
  {
    id: 10,
    name: "NERIA SITOMPUL",
    nickname: "Neria",
    prodi: "Desain Mode",
    starName: "Kappa Serpentis",
    message: "Neria, selera seni dan kreativitasmu luar biasa! Semoga di prodi Desain Mode kamu bisa melahirkan karya-karya fashion yang memukau dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #9333ea, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 11,
    name: "RIFALDY RIZKI RACHMAWAN",
    nickname: "Fadly",
    prodi: "Teknologi Permainan",
    starName: "Lambda Serpentis",
    message: "Fadly, keren banget logika dan passionmu! Semoga di prodi Teknologi Permainan kamu bisa sukses mendevelop game-game hebat masa depan!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #c084fc)",
    icon: "✨"
  },
  {
    id: 12,
    name: "ADAM MUSYAFFA NUR FAHRUDIN",
    nickname: "Adam",
    prodi: "Teknologi Permainan",
    starName: "Mu Serpentis",
    message: "Adam, dedikasi dan kerja kerasmu pas tugas kelompok jempolan banget. Semoga sukses selalu di prodi Teknologi Permainan dan karirmu kedepannya!",
    avatarBg: "linear-gradient(135deg, #a855f7, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 13,
    name: "RIFAT SISWANTO",
    nickname: "Rifat",
    prodi: "Film & TV",
    starName: "Nu Serpentis",
    message: "Rifat, sineas masa depan! Semoga di prodi Film & TV karya-karyamu makin spektakuler dan sukses menghiasi layar kaca serta industri perfilman!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #c084fc)",
    icon: "🦅"
  },
  {
    id: 14,
    name: "RINJANI CAHYANINGTYAS",
    nickname: "Rinjani",
    prodi: "Film & TV",
    starName: "Xi Serpentis",
    message: "Rinjani, kepekaan seni dan semangat berkaryamu bikin terpukau. Semoga perjalanan kuliah di prodi Film & TV penuh pengalaman berharga dan sukses!",
    avatarBg: "linear-gradient(135deg, #9333ea, #f472b6)",
    icon: "🪶"
  },
  {
    id: 15,
    name: "ZAHIRA PUTRI ZAINDRA",
    nickname: "Zahira",
    prodi: "Desain Grafis",
    starName: "Omicron Serpentis",
    message: "Zahira, estetika dan ketelitian visualmu keren banget! Semoga di prodi Desain Grafis kamu makin berkembang, berkarya hebat, dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #fbbf24)",
    icon: "👑"
  },
  {
    id: 16,
    name: "RAUDHAH NUR SALSABILLA",
    nickname: "Raudhah",
    prodi: "Desain Grafis",
    starName: "Pi Serpentis",
    message: "Raudhah, terima kasih sudah selalu konsisten dan rajin membantu teman-teman. Semoga sukses di prodi Desain Grafis dan kehidupannya nanti!",
    avatarBg: "linear-gradient(135deg, #a855f7, #e879f9)",
    icon: "🌟"
  },
  {
    id: 17,
    name: "NAUFAL IJLAL",
    nickname: "Naufal",
    prodi: "Desain Grafis",
    starName: "Rho Serpentis",
    message: "Naufal, jiwa kepemimpinan dan ide-ide kreatifmu luar biasa! Semoga di prodi Desain Grafis kamu makin bersinar dan terus berprestasi!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #fbbf24)",
    icon: "🦅"
  },
  {
    id: 18,
    name: "MUHAMMAD AFAN RIFADIN",
    nickname: "Afan",
    prodi: "Teknologi Rekayasa Multimedia",
    starName: "Sigma Serpentis",
    message: "Afan, wawasan dan semangat inovasimu keren banget! Semoga di prodi TRM kamu bisa menguasai teknologi multimedia terkini dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #8b5cf6, #f472b6)",
    icon: "🪶"
  },
  {
    id: 19,
    name: "RAFFI AKMAL",
    nickname: "Raffi",
    prodi: "Teknologi Rekayasa Multimedia",
    starName: "Tau Serpentis",
    message: "Raffi, energi positifmu selalu membakar semangat se-cluster! Semoga di prodi TRM kamu makin ahli di bidang multimedia dan sukses terus!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #e879f9)",
    icon: "✨"
  },
  {
    id: 20,
    name: "KAYLA SAFA ALZENA",
    nickname: "Kayla",
    prodi: "Teknologi Rekayasa Multimedia",
    starName: "Upsilon Serpentis",
    message: "Kayla, keramahan dan ketekunanmu bikin suasana kelompok sejuk. Semoga sukses selalu di prodi TRM dan kehidupannya mendatang!",
    avatarBg: "linear-gradient(135deg, #9333ea, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 21,
    name: "NAYSHILA MUSYFIKA HANDAYANI",
    nickname: "Nayshila",
    prodi: "Pengelolaan Perhotelan",
    starName: "Phi Serpentis",
    message: "Nayshila, hospitality dan keanggunan komunikasimu jempolan! Semoga di prodi Pengelolaan Perhotelan kamu sukses meraih karir terbaik!",
    avatarBg: "linear-gradient(135deg, #6b21a8, #c084fc)",
    icon: "🦅"
  },
  {
    id: 22,
    name: "SITI AISYAH ANANDA DEVANTY",
    nickname: "Siti",
    prodi: "Pengelolaan Perhotelan",
    starName: "Chi Serpentis",
    message: "Siti, kesabaran dan kebaikan hatimu bikin semua orang nyaman. Semoga sukses selalu di prodi Pengelolaan Perhotelan dan cita-citamu!",
    avatarBg: "linear-gradient(135deg, #a855f7, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 23,
    name: "AZIZAH",
    nickname: "Azizah",
    prodi: "Penyiaran",
    starName: "Psi Serpentis",
    message: "Azizah, public speaking dan kehangatan bicaramu luar biasa! Semoga di prodi Penyiaran suara dan karyamu makin mengudara dengan sukses!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #e879f9)",
    icon: "👑"
  },
  {
    id: 24,
    name: "SALVINO GAVRILLA ARNOLDIE",
    nickname: "Salvino",
    prodi: "Penyiaran",
    starName: "Omega Serpentis",
    message: "Salvino, percaya diri dan pesonamu di depan media keren banget! Semoga sukses selalu di prodi Penyiaran dan dunia broadcasting!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 25,
    name: "SYAHRA AISHA MARBUN",
    nickname: "Syahra",
    prodi: "Penyiaran",
    starName: "Serpentis 59",
    message: "Syahra, antusiasme dan komunikasi komunikatifmu selalu menyenangkan. Semoga di prodi Penyiaran kamu makin berprestasi dan sukses!",
    avatarBg: "linear-gradient(135deg, #9333ea, #c084fc)",
    icon: "🦅"
  },
  {
    id: 26,
    name: "ZENOBIA ABIMANYU",
    nickname: "Zeno",
    prodi: "Periklanan",
    starName: "Serpentis 60",
    message: "Zeno, ide-ide segar dan daya analisismu out of the box! Semoga di prodi Periklanan kamu sukses menciptakan campaign-campaign legendaris!",
    avatarBg: "linear-gradient(135deg, #8b5cf6, #e879f9)",
    icon: "🪶"
  },
  {
    id: 27,
    name: "FAYYAZA AZWA ANANDITA PUTRI",
    nickname: "Azwa",
    prodi: "Periklanan",
    starName: "Serpentis 61",
    message: "Azwa, keceriaan dan kreativitasmu bikin penugasan terasa seru. Semoga di prodi Periklanan kamu makin cemerlang dan sukses terus!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #fbbf24)",
    icon: "👑"
  },
  {
    id: 28,
    name: "NAURA SYIFA PRADINA",
    nickname: "Naura",
    prodi: "Periklanan",
    starName: "Serpentis 62",
    message: "Naura, kejelian dan kerapian kerjamu memuaskan banget. Semoga sukses selalu di prodi Periklanan dan perjalanan perkuliahanmu!",
    avatarBg: "linear-gradient(135deg, #a855f7, #c084fc)",
    icon: "✨"
  },
  {
    id: 29,
    name: "MUHAMMAD TAUFIK AWALUDIN",
    nickname: "Taufik",
    prodi: "Fotografi",
    starName: "Serpentis 64",
    message: "Taufik, jepretan visual dan sudut pandang estetikamu keren! Semoga di prodi Fotografi karya-karyamu makin diakui dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #e879f9)",
    icon: "🦅"
  },
  {
    id: 30,
    name: "ARKEY DWINUGRA HARYANTO",
    nickname: "Arkey",
    prodi: "Fotografi",
    starName: "Gliese 710 (Serpens)",
    message: "Arkey, ketelitian dan passion fotografimu luar biasa. Semoga di prodi Fotografi kamu bisa menangkap momen-momen indah terbaik!",
    avatarBg: "linear-gradient(135deg, #9333ea, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 31,
    name: "MUHAMMAD KIBAR SATRIA",
    nickname: "Satria",
    prodi: "Desain Grafis",
    starName: "NN Serpentis",
    message: "Satria, jiwa kesatria dan kreativitas desainmu keren banget! Semoga sukses selalu di prodi Desain Grafis dan terus berkarya!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #c084fc)",
    icon: "🌟"
  },
  {
    id: 32,
    name: "LULA NAZIRA ZULMA",
    nickname: "Lula",
    prodi: "Teknologi Rekayasa Multimedia",
    starName: "HD 168625 (Serpens Cauda)",
    message: "Lula, semangat dan sifat pantang menyerahmu sangat menginspirasi. Semoga di prodi TRM kamu makin sukses dan bersinar!",
    avatarBg: "linear-gradient(135deg, #a855f7, #e879f9)",
    icon: "✨"
  },
  {
    id: 33,
    name: "TYAS AYU RANIA PUTRI DIYA",
    nickname: "Tyas",
    prodi: "Penyiaran",
    starName: "HD 155974 (Serpens Tail)",
    message: "Tyas, pelengkap sempurna 33 bintang Cluster 32! Kehangatan dan semangat bicaramu bikin prodi Penyiaran & kehidupan perkuliahanmu makin cemerlang!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #fbbf24)",
    icon: "👑"
  }
];

/**
 * Data Pesan dari Kedua Mentor & Dokumentasi PKKMB Cluster 32
 */
const MENTOR_DATA = [
  {
    id: 1,
    name: "Mentor 1 (Nama Kakak Mentor)",
    role: "Mentor Cluster 32 - Serpens",
    message: "Untuk 33 adik-adikku yang luar biasa di Cluster 32, terima kasih sudah berjuang keras dan saling merangkul selama hari-hari PKKMB. Melihat kalian berkembang dan kompak adalah kebanggaan terbesar buat kakak. Jangan pernah ragu untuk mengejar mimpi kalian di kampus ini. Kakak selalu ada untuk kalian!",
    avatarBg: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    icon: "👑",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Mentor 2 (Nama Kakak Co-Mentor)",
    role: "Mentor Cluster 32 - Serpens",
    message: "Selamat telah menyelesaikan hari PKKMB dengan senyuman dan kekompakan yang membanggakan! Cluster 32 Serpens ini bukan cuma sekadar kelompok PKKMB, tapi keluarga pertama kalian di kampus. Tetap jaga tali silaturahmi ini sampai kita wisuda nanti ya!",
    avatarBg: "linear-gradient(135deg, #a855f7, #ec4899)",
    icon: "✨",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
  }
];

const DOCUMENTATION_PHOTOS = [
  {
    caption: "Keseruan Hari Pertama PKKMB Cluster 32",
    url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80"
  },
  {
    caption: "Kekompakan & Senyum Bahagia Cluster 32 Serpens",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80"
  },
  {
    caption: "Pengerjaan Tugas Kelompok Bersama",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
  },
  {
    caption: "Momen Inagurasi Penutupan PKKMB",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80"
  },
  {
    caption: "Kenangan Manis Cluster 32 — Sampai Jumpa!",
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80"
  }
];
