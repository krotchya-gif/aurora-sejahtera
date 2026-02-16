"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // Pemesanan & Pembayaran
  {
    id: "1",
    category: "Pemesanan & Pembayaran",
    question: "Bagaimana cara melakukan pemesanan paket wisata?",
    answer: "Anda dapat melakukan pemesanan melalui website kami dengan mengisi form booking, atau hubungi kami langsung via WhatsApp, email, atau kunjungi kantor kami. Setelah mengisi data, tim kami akan menghubungi Anda untuk konfirmasi ketersediaan paket dan instruksi pembayaran."
  },
  {
    id: "2",
    category: "Pemesanan & Pembayaran",
    question: "Metode pembayaran apa saja yang diterima?",
    answer: "Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana, ShopeePay), virtual account, kartu kredit/debit, cicilan 0% untuk bank tertentu, dan PayLater (Kredivo, Akulaku). Pembayaran kartu kredit dikenakan biaya admin 2-3%."
  },
  {
    id: "3",
    category: "Pemesanan & Pembayaran",
    question: "Apakah bisa melakukan pembayaran dengan cicilan?",
    answer: "Ya, kami menyediakan opsi cicilan. Anda bisa membayar dengan skema: DP 30%, cicilan kedua 30% (H-45), dan pelunasan maksimal H-14 hingga H-30 sebelum keberangkatan. Kami juga menerima cicilan kartu kredit 0% untuk bank tertentu dan PayLater dengan approval."
  },
  {
    id: "4",
    category: "Pemesanan & Pembayaran",
    question: "Berapa minimal DP yang harus dibayarkan?",
    answer: "Down Payment (DP) minimal adalah 30% dari total biaya paket. DP ini berfungsi sebagai konfirmasi booking Anda. Setelah DP diterima dan dikonfirmasi, slot Anda akan terjamin."
  },
  {
    id: "5",
    category: "Pemesanan & Pembayaran",
    question: "Kapan batas waktu pelunasan pembayaran?",
    answer: "Pelunasan harus diselesaikan maksimal 14-30 hari sebelum keberangkatan, tergantung jenis paket. Untuk booking mendadak (H-30), pelunasan wajib dilakukan saat pendaftaran. Keterlambatan pembayaran dapat mengakibatkan pembatalan otomatis."
  },

  // Pembatalan & Reschedule
  {
    id: "6",
    category: "Pembatalan & Reschedule",
    question: "Bagaimana kebijakan pembatalan trip?",
    answer: "Biaya pembatalan: H-45 atau lebih (potongan 25%), H-30 hingga H-44 (potongan 50%), H-15 hingga H-29 (potongan 75%), H-14 atau kurang (tidak ada pengembalian dana). Perhitungan hari adalah hari kalender, bukan hari kerja."
  },
  {
    id: "7",
    category: "Pembatalan & Reschedule",
    question: "Apakah bisa reschedule ke tanggal lain?",
    answer: "Ya, reschedule dapat dilakukan maksimal H-30 dengan membayar biaya admin Rp 500.000 - Rp 1.000.000. Reschedule hanya berlaku untuk tanggal keberangkatan yang tersedia dalam 6 bulan ke depan. Jika terjadi selisih harga, peserta wajib membayar kekurangannya."
  },
  {
    id: "8",
    category: "Pembatalan & Reschedule",
    question: "Apakah bisa mengalihkan slot ke orang lain?",
    answer: "Ya, pengalihan peserta (refund name) dapat dilakukan maksimal H-14 dengan biaya admin Rp 250.000 - Rp 500.000 tergantung jenis paket. Namun, pengalihan nama tidak dapat dilakukan untuk paket yang sudah include tiket pesawat atau visa."
  },
  {
    id: "9",
    category: "Pembatalan & Reschedule",
    question: "Apa yang terjadi jika trip dibatalkan oleh penyelenggara?",
    answer: "Jika kami membatalkan trip karena kuota tidak terpenuhi atau force majeure, peserta akan mendapatkan pengembalian dana 100% atau opsi reschedule ke tanggal lain. Pengembalian dana akan diproses dalam 14 hari kerja."
  },

  // Dokumen & Visa
  {
    id: "10",
    category: "Dokumen & Visa",
    question: "Dokumen apa saja yang diperlukan untuk trip domestik?",
    answer: "Untuk trip domestik, Anda memerlukan KTP yang masih berlaku atau dokumen identitas resmi lainnya. Pastikan nama di KTP sesuai dengan data booking untuk menghindari masalah saat check-in hotel atau tiket."
  },
  {
    id: "11",
    category: "Dokumen & Visa",
    question: "Dokumen apa saja yang diperlukan untuk trip internasional?",
    answer: "Untuk trip internasional, Anda memerlukan: paspor dengan masa berlaku minimal 6 bulan dari tanggal keberangkatan, visa (jika diperlukan), tiket pesawat, dan dokumen tambahan sesuai persyaratan negara tujuan (seperti surat vaksinasi, asuransi perjalanan, dll)."
  },
  {
    id: "12",
    category: "Dokumen & Visa",
    question: "Bagaimana jika visa saya ditolak?",
    answer: "Penolakan visa oleh kedutaan merupakan kebijakan negara tujuan yang di luar kendali kami. Jika visa ditolak, biaya visa dan biaya pemrosesan tidak dapat dikembalikan. Untuk biaya paket lainnya, akan mengikuti kebijakan pembatalan yang berlaku."
  },
  {
    id: "13",
    category: "Dokumen & Visa",
    question: "Apakah pengurusan visa sudah termasuk dalam paket?",
    answer: "Tergantung paket yang Anda pilih. Beberapa paket sudah include pengurusan visa, sedangkan paket lainnya visa menjadi tanggung jawab peserta. Silakan cek detail paket atau tanyakan kepada tim kami untuk memastikan."
  },

  // Akomodasi & Fasilitas
  {
    id: "14",
    category: "Akomodasi & Fasilitas",
    question: "Tipe akomodasi apa yang disediakan?",
    answer: "Kami menyediakan berbagai tipe akomodasi sesuai paket: sharing room (2-4 orang), twin/double room, atau single room. Akomodasi yang kami pilih sudah disesuaikan dengan budget dan standar kenyamanan yang baik. Upgrade ke tipe kamar lebih tinggi dapat dilakukan dengan biaya tambahan."
  },
  {
    id: "15",
    category: "Akomodasi & Fasilitas",
    question: "Apa saja yang sudah termasuk dalam paket?",
    answer: "Fasilitas yang termasuk dalam paket biasanya: akomodasi hotel, transportasi selama trip, makan sesuai itinerary, tiket masuk objek wisata, tour leader/guide, dan dokumentasi. Detail lengkap dapat dilihat di halaman paket masing-masing."
  },
  {
    id: "16",
    category: "Akomodasi & Fasilitas",
    question: "Apakah makan sudah termasuk dalam paket?",
    answer: "Ya, sebagian besar paket sudah termasuk makan sesuai itinerary (biasanya breakfast, lunch, atau dinner). Namun, ada beberapa waktu free time di mana peserta makan sendiri untuk memberikan kebebasan memilih kuliner lokal. Detail pasti ada di halaman paket."
  },
  {
    id: "17",
    category: "Akomodasi & Fasilitas",
    question: "Apakah ada fasilitas untuk vegetarian atau dietary requirements khusus?",
    answer: "Ya, kami dapat mengakomodasi kebutuhan makanan khusus seperti vegetarian, halal, alergi makanan tertentu. Harap informasikan kepada kami saat booking agar kami dapat mengatur dengan vendor makan."
  },

  // Perjalanan & Itinerary
  {
    id: "18",
    category: "Perjalanan & Itinerary",
    question: "Apakah itinerary bisa berubah?",
    answer: "Itinerary dapat berubah karena kondisi tertentu seperti cuaca, lalu lintas, keamanan, atau force majeure. Perubahan dilakukan untuk kepentingan dan keselamatan peserta tanpa mengurangi kualitas layanan. Kami akan berusaha menginformasikan perubahan signifikan sedini mungkin."
  },
  {
    id: "19",
    category: "Perjalanan & Itinerary",
    question: "Apakah ada waktu free time?",
    answer: "Ya, sebagian besar paket kami menyediakan waktu free time untuk eksplorasi pribadi atau istirahat. Anda dapat memanfaatkan waktu ini untuk belanja, mencoba kuliner lokal, atau sekadar bersantai di hotel."
  },
  {
    id: "20",
    category: "Perjalanan & Itinerary",
    question: "Berapa orang minimal dan maksimal dalam satu grup?",
    answer: "Untuk open trip, biasanya minimal 10-15 peserta dan maksimal 25-40 peserta tergantung jenis paket. Untuk private trip, jumlah peserta sesuai request Anda. Grup yang lebih kecil akan mendapatkan pengalaman yang lebih personal."
  },
  {
    id: "21",
    category: "Perjalanan & Itinerary",
    question: "Apakah ada tour leader yang menemani?",
    answer: "Ya, setiap trip akan didampingi oleh tour leader/guide berpengalaman yang akan membantu selama perjalanan. Tour leader kami siap membantu Anda 24 jam dan memberikan informasi tentang destinasi yang dikunjungi."
  },

  // Kesehatan & Keamanan
  {
    id: "22",
    category: "Kesehatan & Keamanan",
    question: "Apakah perlu asuransi perjalanan?",
    answer: "Beberapa paket kami sudah termasuk asuransi perjalanan. Untuk paket yang belum include, kami sangat menganjurkan untuk membeli asuransi perjalanan sendiri untuk perlindungan maksimal terhadap risiko seperti kecelakaan, sakit, kehilangan bagasi, atau pembatalan penerbangan."
  },
  {
    id: "23",
    category: "Kesehatan & Keamanan",
    question: "Apa yang harus dilakukan jika sakit saat trip?",
    answer: "Segera informasikan kepada tour leader. Kami akan membantu membawa Anda ke fasilitas kesehatan terdekat. Biaya pengobatan menjadi tanggung jawab peserta, kecuali ditanggung oleh asuransi. Pastikan Anda membawa obat-obatan pribadi yang mungkin diperlukan."
  },
  {
    id: "24",
    category: "Kesehatan & Keamanan",
    question: "Apakah aman untuk perempuan traveling sendiri?",
    answer: "Ya, sangat aman. Banyak peserta kami adalah solo traveler perempuan. Kami selalu mengutamakan keamanan dan kenyamanan semua peserta. Tour leader kami akan memastikan semua peserta aman dan nyaman selama perjalanan."
  },
  {
    id: "25",
    category: "Kesehatan & Keamanan",
    question: "Apakah ibu hamil boleh ikut trip?",
    answer: "Ibu hamil boleh ikut dengan ketentuan: membawa surat keterangan dokter, usia kehamilan maksimal trimester kedua (6 bulan), kondisi kehamilan sehat, dan memahami risiko perjalanan. Kami sarankan konsultasi dengan dokter terlebih dahulu."
  },

  // Perlengkapan & Tips
  {
    id: "26",
    category: "Perlengkapan & Tips",
    question: "Apa saja yang harus dibawa saat trip?",
    answer: "Perlengkapan dasar: pakaian sesuai destinasi dan cuaca, obat-obatan pribadi, toiletries, power bank, kamera, tas daypack, dokumen penting (KTP/paspor, voucher, asuransi). Kami akan mengirimkan packing list detail 7 hari sebelum keberangkatan."
  },
  {
    id: "27",
    category: "Perlengkapan & Tips",
    question: "Berapa batas bagasi yang diperbolehkan?",
    answer: "Untuk trip dengan pesawat, ikuti aturan bagasi maskapai (biasanya 20kg bagasi tercatat dan 7kg kabin). Untuk trip darat, usahakan membawa bagasi yang tidak terlalu besar agar mudah dibawa dan disimpan. Kami sarankan 1 koper + 1 daypack."
  },
  {
    id: "28",
    category: "Perlengkapan & Tips",
    question: "Apakah perlu membawa uang tunai?",
    answer: "Ya, sebaiknya bawa uang tunai secukupnya untuk keperluan pribadi seperti belanja souvenir, makan saat free time, atau keperluan darurat. Untuk trip internasional, siapkan mata uang negara tujuan atau USD. ATM tidak selalu tersedia di semua destinasi."
  },
  {
    id: "29",
    category: "Perlengkapan & Tips",
    question: "Apakah WiFi tersedia selama trip?",
    answer: "WiFi biasanya tersedia di hotel. Untuk akses internet selama perjalanan, kami sarankan untuk membeli SIM card lokal atau mengaktifkan paket roaming. Tour leader dapat membantu informasi tempat membeli SIM card lokal."
  },

  // Lain-lain
  {
    id: "30",
    category: "Lain-lain",
    question: "Apakah ada program loyalty atau diskon member?",
    answer: "Ya! Kami memiliki program loyalty untuk repeat customer dan diskon untuk grup (minimal 4 orang). Follow media sosial kami untuk mendapatkan info promo terbaru, early bird discount, dan penawaran spesial lainnya."
  },
  {
    id: "31",
    category: "Lain-lain",
    question: "Bagaimana jika kehilangan barang saat trip?",
    answer: "Kami tidak bertanggung jawab atas kehilangan barang pribadi. Harap selalu menjaga barang bawaan Anda. Gunakan safety box di hotel untuk barang berharga. Jika kehilangan di hotel atau transportasi, tour leader akan membantu koordinasi dengan pihak terkait."
  },
  {
    id: "32",
    category: "Lain-lain",
    question: "Apakah bisa request paket private/custom?",
    answer: "Tentu! Kami melayani paket private dan custom sesuai kebutuhan Anda. Hubungi tim kami untuk konsultasi gratis dan kami akan membantu merancang itinerary impian Anda sesuai budget, waktu, dan preferensi Anda."
  },
  {
    id: "33",
    category: "Lain-lain",
    question: "Bagaimana cara memberikan review atau testimonial?",
    answer: "Kami sangat menghargai feedback Anda! Setelah trip berakhir, Anda akan menerima email untuk memberikan review. Anda juga bisa langsung memberikan testimonial melalui WhatsApp atau Google Review. Review Anda sangat membantu kami untuk terus meningkatkan kualitas layanan."
  }
];

const categories = [
  "Semua",
  "Pemesanan & Pembayaran",
  "Pembatalan & Reschedule",
  "Dokumen & Visa",
  "Akomodasi & Fasilitas",
  "Perjalanan & Itinerary",
  "Kesehatan & Keamanan",
  "Perlengkapan & Tips",
  "Lain-lain"
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqData.filter((faq) => {
    const matchCategory = activeCategory === "Semua" || faq.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions (FAQ)</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Temukan jawaban untuk pertanyaan yang sering diajukan seputar layanan Aurora Sejahtera Tour & Travel.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Box */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 shadow-sm"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchQuery("");
                }}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {filteredFAQs.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredFAQs.map((faq, index) => (
                <div key={faq.id} className="transition-colors hover:bg-gray-50">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 md:px-8 py-6 text-left flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-1">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 pt-0.5">
                          {faq.question}
                        </h3>
                      </div>
                      {activeCategory === "Semua" && (
                        <span className="ml-11 inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {faq.category}
                        </span>
                      )}
                    </div>
                    <svg
                      className={`flex-shrink-0 w-6 h-6 text-gray-400 transition-transform duration-300 ${
                        openId === faq.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {openId === faq.id && (
                    <div className="px-6 md:px-8 pb-6">
                      <div className="ml-11 pl-3 border-l-4 border-primary/20">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak ada pertanyaan ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kategori atau kata kunci pencarian Anda
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami. Tim customer service kami siap membantu Anda 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg inline-flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat via WhatsApp
            </a>
            <a
              href="mailto:info@aurorasejahtera.com"
              className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg inline-flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Kami
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 812-3456-7890</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Senin - Minggu, 08:00 - 21:00 WIB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
