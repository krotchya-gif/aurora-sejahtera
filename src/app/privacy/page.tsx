export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Kebijakan Privasi</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Kami menghargai privasi Anda dan berkomitmen melindungi data pribadi Anda dengan serius.
          </p>
          <p className="text-white/80 text-sm mt-4">
            Terakhir diperbarui: 24 Januari 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-gray-700 leading-relaxed mb-4">
              Selamat datang di Aurora Sejahtera Tour & Travel. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengelola informasi pribadi Anda saat menggunakan layanan kami.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Dengan menggunakan layanan kami, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini. Jika Anda tidak setuju dengan kebijakan ini, mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          {/* 1. Informasi yang Kami Kumpulkan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              1. Informasi yang Kami Kumpulkan
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  1.1 Informasi yang Anda Berikan Langsung
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Nama lengkap dan identitas (KTP/Paspor)</li>
                  <li>Alamat email dan nomor telepon</li>
                  <li>Alamat domisili dan tempat tinggal</li>
                  <li>Tanggal lahir dan informasi keluarga (jika diperlukan)</li>
                  <li>Informasi pembayaran (nomor rekening, metode pembayaran)</li>
                  <li>Preferensi perjalanan dan kebutuhan khusus</li>
                  <li>Data kesehatan jika relevan untuk perjalanan</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  1.2 Informasi yang Dikumpulkan Secara Otomatis
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Alamat IP dan lokasi geografis</li>
                  <li>Jenis browser dan perangkat yang digunakan</li>
                  <li>Halaman yang dikunjungi dan durasi kunjungan</li>
                  <li>Sumber referral (dari mana Anda menemukan website kami)</li>
                  <li>Data cookies dan teknologi pelacakan serupa</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  1.3 Informasi dari Pihak Ketiga
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Informasi dari mitra perjalanan (maskapai, hotel, transportasi)</li>
                  <li>Data pembayaran dari payment gateway</li>
                  <li>Ulasan dan rating dari platform review</li>
                  <li>Informasi dari media sosial (jika Anda memberikan izin)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Penggunaan Informasi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              2. Penggunaan Informasi
            </h2>

            <p className="text-gray-700 mb-4">Kami menggunakan informasi Anda untuk:</p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Memproses pemesanan dan reservasi perjalanan Anda</li>
              <li>Mengirimkan konfirmasi booking dan voucher perjalanan</li>
              <li>Berkomunikasi mengenai perjalanan Anda (jadwal, perubahan, update)</li>
              <li>Memberikan customer support dan menjawab pertanyaan Anda</li>
              <li>Memproses pembayaran dan transaksi keuangan</li>
              <li>Mengirimkan penawaran promosi, newsletter, dan update layanan (dengan persetujuan Anda)</li>
              <li>Meningkatkan kualitas layanan dan pengalaman pengguna</li>
              <li>Menganalisis tren perjalanan dan preferensi pelanggan</li>
              <li>Mematuhi kewajiban hukum dan peraturan yang berlaku</li>
              <li>Mencegah penipuan dan aktivitas ilegal</li>
              <li>Mengelola program loyalitas dan reward</li>
            </ul>
          </section>

          {/* 3. Berbagi Informasi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              3. Berbagi Informasi dengan Pihak Ketiga
            </h2>

            <p className="text-gray-700 mb-4">
              Kami tidak menjual data pribadi Anda. Namun, kami dapat membagikan informasi Anda dengan pihak ketiga dalam situasi berikut:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.1 Mitra Layanan Perjalanan
                </h3>
                <p className="text-gray-700">
                  Maskapai penerbangan, hotel, operator tur, penyedia transportasi, dan mitra lainnya yang diperlukan untuk memenuhi pemesanan Anda.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.2 Payment Processor
                </h3>
                <p className="text-gray-700">
                  Bank, payment gateway, dan penyedia layanan pembayaran untuk memproses transaksi Anda dengan aman.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.3 Penyedia Layanan Teknologi
                </h3>
                <p className="text-gray-700">
                  Platform hosting, penyedia email, analytics, dan layanan cloud yang membantu operasional kami.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.4 Otoritas Hukum
                </h3>
                <p className="text-gray-700">
                  Pemerintah, kepolisian, atau lembaga hukum jika diwajibkan oleh peraturan atau untuk melindungi hak kami.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.5 Pihak Ketiga dengan Persetujuan Anda
                </h3>
                <p className="text-gray-700">
                  Mitra bisnis lainnya jika Anda telah memberikan persetujuan eksplisit.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Keamanan Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              4. Keamanan dan Perlindungan Data
            </h2>

            <p className="text-gray-700 mb-4">
              Kami berkomitmen melindungi data Anda dengan menerapkan langkah-langkah keamanan yang tepat:
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Enkripsi SSL/TLS untuk transmisi data</li>
              <li>Server yang diamankan dengan firewall dan sistem keamanan berlapis</li>
              <li>Akses terbatas ke data pribadi hanya untuk staf yang berwenang</li>
              <li>Pelatihan keamanan data untuk seluruh tim kami</li>
              <li>Regular backup dan disaster recovery plan</li>
              <li>Monitoring aktivitas mencurigakan secara berkala</li>
              <li>Kepatuhan terhadap standar keamanan industri</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Meskipun kami telah menerapkan langkah keamanan yang wajar, tidak ada sistem yang 100% aman. Kami tidak dapat menjamin keamanan absolut dari data yang Anda transmisikan ke kami.
            </p>
          </section>

          {/* 5. Cookies dan Teknologi Pelacakan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              5. Cookies dan Teknologi Pelacakan
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  5.1 Apa itu Cookies?
                </h3>
                <p className="text-gray-700">
                  Cookies adalah file kecil yang disimpan di perangkat Anda untuk meningkatkan pengalaman browsing, mengingat preferensi Anda, dan menganalisis penggunaan website.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  5.2 Jenis Cookies yang Kami Gunakan
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Essential Cookies:</strong> Diperlukan untuk fungsi dasar website (login, keranjang belanja)</li>
                  <li><strong>Performance Cookies:</strong> Membantu kami memahami bagaimana pengunjung berinteraksi dengan website</li>
                  <li><strong>Functional Cookies:</strong> Mengingat pilihan Anda (bahasa, mata uang, preferensi)</li>
                  <li><strong>Marketing Cookies:</strong> Melacak aktivitas Anda untuk menampilkan iklan yang relevan</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  5.3 Mengelola Cookies
                </h3>
                <p className="text-gray-700">
                  Anda dapat menolak atau menghapus cookies melalui pengaturan browser Anda. Namun, menonaktifkan cookies dapat mempengaruhi fungsionalitas website.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Hak Pengguna */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              6. Hak Anda sebagai Pengguna
            </h2>

            <p className="text-gray-700 mb-4">Anda memiliki hak untuk:</p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Akses:</strong> Meminta salinan data pribadi yang kami simpan tentang Anda</li>
              <li><strong>Koreksi:</strong> Memperbarui atau memperbaiki informasi yang tidak akurat</li>
              <li><strong>Penghapusan:</strong> Meminta penghapusan data Anda (dengan batasan tertentu)</li>
              <li><strong>Pembatasan:</strong> Membatasi pemrosesan data Anda dalam situasi tertentu</li>
              <li><strong>Portabilitas:</strong> Menerima data Anda dalam format yang mudah dipindahkan</li>
              <li><strong>Keberatan:</strong> Menolak pemrosesan data untuk tujuan marketing atau penelitian</li>
              <li><strong>Penarikan Persetujuan:</strong> Menarik persetujuan yang telah Anda berikan sebelumnya</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak di bawah. Kami akan merespons permintaan Anda dalam waktu 30 hari kerja.
            </p>
          </section>

          {/* 7. Penyimpanan Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              7. Penyimpanan dan Retensi Data
            </h2>

            <p className="text-gray-700 mb-4">
              Kami menyimpan data pribadi Anda selama diperlukan untuk memenuhi tujuan yang dijelaskan dalam kebijakan ini, kecuali periode retensi yang lebih lama diperlukan atau diizinkan oleh hukum.
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Data transaksi: 10 tahun (untuk keperluan perpajakan dan akuntansi)</li>
              <li>Data pelanggan aktif: Selama Anda menggunakan layanan kami</li>
              <li>Data marketing: Hingga Anda meminta opt-out atau 3 tahun tanpa aktivitas</li>
              <li>Data komunikasi: 3 tahun sejak komunikasi terakhir</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Setelah periode retensi berakhir, kami akan menghapus atau menganonimkan data Anda secara aman.
            </p>
          </section>

          {/* 8. Transfer Data Internasional */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              8. Transfer Data Internasional
            </h2>

            <p className="text-gray-700 mb-4">
              Jika Anda melakukan perjalanan internasional, data Anda mungkin akan ditransfer ke negara lain untuk keperluan booking dan pengurusan visa. Kami memastikan bahwa transfer data dilakukan sesuai dengan standar perlindungan data yang berlaku.
            </p>

            <p className="text-gray-700">
              Data Anda mungkin disimpan dan diproses di Indonesia atau negara lain di mana mitra layanan kami beroperasi. Dengan menggunakan layanan kami, Anda menyetujui transfer data ini.
            </p>
          </section>

          {/* 9. Privasi Anak-anak */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              9. Privasi Anak-anak
            </h2>

            <p className="text-gray-700">
              Layanan kami tidak ditujukan untuk anak-anak di bawah 13 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak. Jika orang tua atau wali mengetahui bahwa anak mereka telah memberikan informasi pribadi tanpa persetujuan, silakan hubungi kami untuk menghapus informasi tersebut.
            </p>
          </section>

          {/* 10. Perubahan Kebijakan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              10. Perubahan Kebijakan Privasi
            </h2>

            <p className="text-gray-700 mb-4">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan praktik kami atau karena alasan operasional, hukum, atau regulasi.
            </p>

            <p className="text-gray-700 mb-4">
              Perubahan signifikan akan diberitahukan melalui:
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Pemberitahuan yang mencolok di website kami</li>
              <li>Email ke alamat email terdaftar Anda</li>
              <li>Notifikasi melalui aplikasi mobile (jika ada)</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Tanggal "Terakhir diperbarui" di bagian atas halaman ini menunjukkan kapan kebijakan ini terakhir direvisi. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              11. Hubungi Kami
            </h2>

            <p className="text-gray-700 mb-4">
              Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait kebijakan privasi ini atau praktik data kami, silakan hubungi kami melalui:
            </p>

            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Aurora Sejahtera Tour & Travel</p>
                  <p className="text-gray-700">Jl. Contoh No. 123, Jakarta Pusat, DKI Jakarta 10110</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-700">Email: <a href="mailto:privacy@aurorasejahtera.com" className="text-primary hover:text-primary-dark font-medium">privacy@aurorasejahtera.com</a></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-700">Telepon: <a href="tel:+6281234567890" className="text-primary hover:text-primary-dark font-medium">+62 812-3456-7890</a></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="text-gray-700">WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">+62 812-3456-7890</a></p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              Kami akan berusaha merespons semua pertanyaan atau permintaan yang sah dalam waktu 30 hari kerja.
            </p>
          </section>

          {/* Footer Note */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Catatan:</strong> Kebijakan Privasi ini dibuat sesuai dengan peraturan perundang-undangan yang berlaku di Indonesia, termasuk namun tidak terbatas pada UU No. 19 Tahun 2016 tentang Perubahan atas UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (UU ITE) dan peraturan pelindung data pribadi yang berlaku.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
