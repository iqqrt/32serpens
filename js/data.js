/**
 * Data 27 Mahasiswa Baru (Maba) Cluster 32 - Serpens
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
    name: "KHAIRA SHAFIYA ZAHWA",
    nickname: "Zahwa",
    prodi: "Teknik Grafika",
    starName: "Delta Serpentis",
    message: "Zahwa, ketelitian dan semangatmu selama PKKMB bener-bener jempolan! Semoga sukses selalu di prodi Teknik Grafika dan kehidupannya kedepan ya!",
    avatarBg: "linear-gradient(135deg, #6b21a8, #c084fc)",
    icon: "🦅"
  },
  {
    id: 5,
    name: "LIFARO AGANTA",
    nickname: "Faro",
    prodi: "Teknik Grafika",
    starName: "Epsilon Serpentis",
    message: "Faro, makasih ya udah selalu tanggap dan membantu teman-teman se-cluster. Semoga di prodi Teknik Grafika kamu makin bersinar dan berprestasi!",
    avatarBg: "linear-gradient(135deg, #8b5cf6, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 6,
    name: "ANGGITA SALMA KHAIRUNISA",
    nickname: "Gita",
    prodi: "Teknologi Rekayasa Pengemasan",
    starName: "Zeta Serpentis",
    message: "Gita, keaktifan dan keceriaanmu bikin suasana kelompok selalu hangat. Semoga sukses di prodi TRP dan lancar selalu di perkuliahan & karirmu nanti!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #e879f9)",
    icon: "👑"
  },
  {
    id: 7,
    name: "SOFI PEBRIANTY",
    nickname: "Sofi",
    prodi: "Penerbitan",
    starName: "Eta Serpentis",
    message: "Sofi, antusiasme dan kerja kerasmu keren banget! Semoga di prodi Penerbitan kamu bisa terus berkarya, menerbitkan hal-hal hebat, dan meraih impianmu!",
    avatarBg: "linear-gradient(135deg, #c084fc, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 8,
    name: "NERIA SITOMPUL",
    nickname: "Neria",
    prodi: "Desain Mode",
    starName: "Theta Serpentis (Alya)",
    message: "Neria, selera seni dan kreativitasmu luar biasa! Semoga di prodi Desain Mode kamu bisa melahirkan karya-karya fashion yang memukau dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #9333ea, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 9,
    name: "RIFALDY RIZKI RACHMAWAN",
    nickname: "Fadly",
    prodi: "Teknologi Permainan",
    starName: "Iota Serpentis",
    message: "Fadly, keren banget logika dan passionmu! Semoga di prodi Teknologi Permainan kamu bisa sukses mendevelop game-game hebat masa depan!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #c084fc)",
    icon: "✨"
  },
  {
    id: 10,
    name: "ADAM MUSYAFFA NUR FAHRUDIN",
    nickname: "Adam",
    prodi: "Teknologi Permainan",
    starName: "Kappa Serpentis",
    message: "Adam, dedikasi dan kerja kerasmu pas tugas kelompok jempolan banget. Semoga sukses selalu di prodi Teknologi Permainan dan karirmu kedepannya!",
    avatarBg: "linear-gradient(135deg, #a855f7, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 11,
    name: "RIFAT SISWANTO",
    nickname: "Rifat",
    prodi: "Film & TV",
    starName: "Lambda Serpentis",
    message: "Rifat, sineas masa depan! Semoga di prodi Film & TV karya-karyamu makin spektakuler dan sukses menghiasi layar kaca serta industri perfilman!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #c084fc)",
    icon: "🦅"
  },
  {
    id: 12,
    name: "RINJANI CAHYANINGTYAS",
    nickname: "Rinjani",
    prodi: "Film & TV",
    starName: "Mu Serpentis",
    message: "Rinjani, kepekaan seni dan semangat berkaryamu bikin terpukau. Semoga perjalanan kuliah di prodi Film & TV penuh pengalaman berharga dan sukses!",
    avatarBg: "linear-gradient(135deg, #9333ea, #f472b6)",
    icon: "🪶"
  },
  {
    id: 13,
    name: "ZAHIRA PUTRI ZAINDRA",
    nickname: "Zahira",
    prodi: "Desain Grafis",
    starName: "Nu Serpentis",
    message: "Zahira, estetika dan ketelitian visualmu keren banget! Semoga di prodi Desain Grafis kamu makin berkembang, berkarya hebat, dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #fbbf24)",
    icon: "👑"
  },
  {
    id: 14,
    name: "RAUDHAH NUR SALSABILLA",
    nickname: "Raudhah",
    prodi: "Desain Grafis",
    starName: "Xi Serpentis",
    message: "Raudhah, terima kasih sudah selalu konsisten dan rajin membantu teman-teman. Semoga sukses di prodi Desain Grafis dan kehidupannya nanti!",
    avatarBg: "linear-gradient(135deg, #a855f7, #e879f9)",
    icon: "🌟"
  },
  {
    id: 15,
    name: "NAUFAL IJLAL",
    nickname: "Naufal",
    prodi: "Desain Grafis",
    starName: "Omicron Serpentis",
    message: "Naufal, jiwa kepemimpinan dan ide-ide kreatifmu luar biasa! Semoga di prodi Desain Grafis kamu makin bersinar dan terus berprestasi!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #fbbf24)",
    icon: "🦅"
  },
  {
    id: 16,
    name: "MUHAMMAD AFAN RIFADIN",
    nickname: "Afan",
    prodi: "Teknologi Rekayasa Multimedia",
    starName: "Pi Serpentis",
    message: "Afan, wawasan dan semangat inovasimu keren banget! Semoga di prodi TRM kamu bisa menguasai teknologi multimedia terkini dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #8b5cf6, #f472b6)",
    icon: "🪶"
  },
  {
    id: 17,
    name: "KAYLA SAFA ALZENA",
    nickname: "Kayla",
    prodi: "Teknologi Rekayasa Multimedia",
    starName: "Rho Serpentis",
    message: "Kayla, keramahan dan ketekunanmu bikin suasana kelompok sejuk. Semoga sukses selalu di prodi TRM dan kehidupannya mendatang!",
    avatarBg: "linear-gradient(135deg, #9333ea, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 18,
    name: "NAYSHILA MUSYFIKA HANDAYANI",
    nickname: "Nayshila",
    prodi: "Pengelolaan Perhotelan",
    starName: "Sigma Serpentis",
    message: "Nayshila, hospitality dan keanggunan komunikasimu jempolan! Semoga di prodi Pengelolaan Perhotelan kamu sukses meraih karir terbaik!",
    avatarBg: "linear-gradient(135deg, #6b21a8, #c084fc)",
    icon: "🦅"
  },
  {
    id: 19,
    name: "SITI AISYAH ANANDA DEVANTY",
    nickname: "Siti",
    prodi: "Pengelolaan Perhotelan",
    starName: "Tau Serpentis",
    message: "Siti, kesabaran dan kebaikan hatimu bikin semua orang nyaman. Semoga sukses selalu di prodi Pengelolaan Perhotelan dan cita-citamu!",
    avatarBg: "linear-gradient(135deg, #a855f7, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 20,
    name: "AZIZAH",
    nickname: "Azizah",
    prodi: "Penyiaran",
    starName: "Upsilon Serpentis",
    message: "Azizah, public speaking dan kehangatan bicaramu luar biasa! Semoga di prodi Penyiaran suara dan karyamu makin mengudara dengan sukses!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #e879f9)",
    icon: "👑"
  },
  {
    id: 21,
    name: "SALVINO GAVRILLA ARNOLDIE",
    nickname: "Salvino",
    prodi: "Penyiaran",
    starName: "Phi Serpentis",
    message: "Salvino, percaya diri dan pesonamu di depan media keren banget! Semoga sukses selalu di prodi Penyiaran dan dunia broadcasting!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #fbbf24)",
    icon: "🌟"
  },
  {
    id: 22,
    name: "SYAHRA AISHA MARBUN",
    nickname: "Syahra",
    prodi: "Penyiaran",
    starName: "Chi Serpentis",
    message: "Syahra, antusiasme dan komunikasi komunikatifmu selalu menyenangkan. Semoga di prodi Penyiaran kamu makin berprestasi dan sukses!",
    avatarBg: "linear-gradient(135deg, #9333ea, #c084fc)",
    icon: "🦅"
  },
  {
    id: 23,
    name: "ZENOBIA ABIMANYU",
    nickname: "Zeno",
    prodi: "Periklanan",
    starName: "Psi Serpentis",
    message: "Zeno, ide-ide segar dan daya analisismu out of the box! Semoga di prodi Periklanan kamu sukses menciptakan campaign-campaign legendaris!",
    avatarBg: "linear-gradient(135deg, #8b5cf6, #e879f9)",
    icon: "🪶"
  },
  {
    id: 24,
    name: "MUHAMMAD TAUFIK AWALUDIN",
    nickname: "Taufik",
    prodi: "Fotografi",
    starName: "Omega Serpentis",
    message: "Taufik, jepretan visual dan sudut pandang estetikamu keren! Semoga di prodi Fotografi karya-karyamu makin diakui dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #e879f9)",
    icon: "🦅"
  },
  {
    id: 25,
    name: "ARKEY DWINUGRA HARYANTO",
    nickname: "Arkey",
    prodi: "Fotografi",
    starName: "Serpentis 59",
    message: "Arkey, ketelitian dan passion fotografimu luar biasa. Semoga di prodi Fotografi kamu bisa menangkap momen-momen indah terbaik!",
    avatarBg: "linear-gradient(135deg, #9333ea, #fbbf24)",
    icon: "🪶"
  },
  {
    id: 26,
    name: "MUHAMMAD KIBAR SATRIA",
    nickname: "Satria",
    prodi: "Desain Grafis",
    starName: "Serpentis 60",
    message: "Satria, jiwa kesatria dan kreativitas desainmu keren banget! Semoga sukses selalu di prodi Desain Grafis dan terus berkarya!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #c084fc)",
    icon: "🌟"
  },
  {
    id: 27,
    name: "LULA NAZIRA ZULMA",
    nickname: "Lula",
    prodi: "Teknologi Rekayasa Multimedia",
    starName: "HD 168625 (Serpens Cauda)",
    message: "Lula, semangat dan sifat pantang menyerahmu sangat menginspirasi. Semoga di prodi TRM kamu makin sukses dan bersinar!",
    avatarBg: "linear-gradient(135deg, #a855f7, #e879f9)",
    icon: "✨"
  },
  {
    id: 28,
    name: "FAHRI AULIA RAHMAN",
    nickname: "Fahri",
    prodi: "Penyiaran",
    starName: "Serpentis 61",
    message: "Fahri, semangat dan aura komunikatifmu luar biasa! Semoga di prodi Penyiaran karir dan karya penyiaranmu semakin mengudara dan sukses selalu!",
    avatarBg: "linear-gradient(135deg, #7e22ce, #fbbf24)",
    icon: "🎙️"
  },
  {
    id: 29,
    name: "DAFA ZULFAN HAMMANI",
    nickname: "Dafa",
    prodi: "Teknik Grafika",
    starName: "Serpentis 62",
    message: "Dafa, ketelitian dan kerja kerasmu di kelompok bener-bener jempolan! Semoga sukses selalu di prodi Teknik Grafika dan perkuliahanmu lancar!",
    avatarBg: "linear-gradient(135deg, #9333ea, #e879f9)",
    icon: "🖨️"
  },
  {
    id: 30,
    name: "RAMADHANI ILHAM",
    nickname: "Ilham",
    prodi: "Teknik Pemeliharaan Mesin",
    starName: "Serpentis 64",
    message: "Ilham, keteguhan dan daya juangmu luar biasa! Semoga di prodi Teknik Pemeliharaan Mesin kamu makin berprestasi dan sukses meraih cita-citamu!",
    avatarBg: "linear-gradient(135deg, #5b21b6, #fbbf24)",
    icon: "⚙️"
  }
];

/**
 * Data Pesan dari Kedua Mentor & Dokumentasi PKKMB Cluster 32
 */
const MENTOR_DATA = [
  {
    id: 1,
    name: "Riski Raditiya (iqi)",
    role: "Mentor Cluster 32 - Serpens",
    message: "Untuk adik-adikku yang luar biasa di Cluster 32, terima kasih sudah berjuang keras dan saling merangkul selama hari-hari PKKMB. Melihat kalian berkembang dan kompak adalah kebanggaan terbesar buat kakak. Jangan pernah ragu untuk mengejar mimpi kalian di kampus ini. Kakak selalu ada untuk kalian!",
    avatarBg: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    icon: "👑",
    photo: "img/mentor1.jpeg"
  },
  {
    id: 2,
    name: "Anggita Puspa Royanita (Gita)",
    role: "Mentor Cluster 32 - Serpens",
    message: "Selamat telah menyelesaikan hari PKKMB dengan senyuman dan kekompakan yang membanggakan! Cluster 32 Serpens ini bukan cuma sekadar kelompok PKKMB, tapi keluarga pertama kalian di kampus. Tetap jaga tali silaturahmi ini sampai kita wisuda nanti ya!",
    avatarBg: "linear-gradient(135deg, #a855f7, #ec4899)",
    icon: "✨",
    photo: "img/mentor2.jpeg"
  }
];

const DOCUMENTATION_PHOTOS = [
  {
    type: "photo",
    title: "Foto Kerkom Day 1",
    items: [
      { type: "image", url: "dokumentasi/foto/day 1/desain awal  day 1.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 1/foto bersama day 1.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 1/foto bersama1 day 1.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 1/foto bersama2 day 1.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 1/lapor kerkom day 1.jpeg" }
    ]
  },
  {
    type: "video",
    title: "Video Kerkom Day 1",
    items: [
      { type: "video", url: "dokumentasi/video/day 1/awal Lukis day 1 .mp4" },
      { type: "video", url: "dokumentasi/video/day 1/nopal santai day 1.mp4" },
      { type: "video", url: "dokumentasi/video/day 1/parodi dilan day 1.mp4" },
      { type: "video", url: "dokumentasi/video/day 1/yel yel day 1.mp4" }
    ]
  },
  {
    type: "photo",
    title: "Foto Kerkom Day 2",
    items: [
      { type: "image", url: "dokumentasi/foto/day 2/awal daday day 2.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 2/cat abis woi day 2.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 2/all base abiss day 2.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 2/fotobersama day 2.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 2/WhatsApp Image 2026-08-16 at 8.53.37 PM.jpeg" },
      { type: "image", url: "dokumentasi/foto/day 2/WhatsApp Image 2026-08-16 at 8.55.58 PM.jpeg" }
    ]
  },
  {
    type: "video",
    title: "Video Kerkom Day 2",
    items: [
      { type: "video", url: "dokumentasi/video/day 2/mulqi mulai day 2.mp4" },
      { type: "video", url: "dokumentasi/video/day 2/before pegal day 2.mp4" },
      { type: "video", url: "dokumentasi/video/day 2/pegel day 2.mp4" },
      { type: "video", url: "dokumentasi/video/day 2/tambah sedikit day 2.mp4" },
      { type: "video", url: "dokumentasi/video/day 2/logistik pulang day 2.mp4" }
    ]
  },
  {
    type: "gallery",
    title: "SEE YOUU GUYS",
    isPortrait: true,
    items: [
      { type: "image", url: "dokumentasi/foto/SEE YOU GUYS/fotobersama 3.jpeg" },
      { type: "image", url: "dokumentasi/foto/SEE YOU GUYS/fotobersama sama 3.jpeg" },
      { type: "image", url: "dokumentasi/foto/SEE YOU GUYS/fotobersamaa 3.jpeg" },
      { type: "video", url: "dokumentasi/video/SEE YOU GUYS/welove day 2 3.mp4" },
      { type: "video", url: "dokumentasi/video/SEE YOU GUYS/bersama tagline day 2 3.mp4" },
      { type: "video", url: "dokumentasi/video/SEE YOU GUYS/ipal yolo day  2 3.mp4" }
    ]
  }
];
