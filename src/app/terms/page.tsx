export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Syarat & Ketentuan</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Harap membaca syarat dan ketentuan ini dengan seksama sebelum menggunakan layanan kami.
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
              Selamat datang di Aurora Sejahtera Tour & Travel. Dengan mengakses dan menggunakan layanan kami, Anda setuju untuk terikat dan mematuhi syarat dan ketentuan berikut. Jika Anda tidak setuju dengan syarat dan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-800 text-sm">
                <strong>Penting:</strong> Dengan melakukan pendaftaran, pembayaran, atau menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.
              </p>
            </div>
          </section>

          {/* 1. Ketentuan Umum */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              1. Ketentuan Umum
            </h2>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Aurora Sejahtera Tour & Travel adalah perusahaan jasa perjalanan wisata yang terdaftar dan beroperasi sesuai hukum yang berlaku di Indonesia.</li>
              <li>Layanan kami mencakup paket wisata domestik dan internasional, baik untuk open trip maupun private trip.</li>
              <li>Semua informasi dalam website, brosur, atau material marketing kami dibuat sebaik mungkin, namun dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.</li>
              <li>Harga paket dapat berubah sewaktu-waktu hingga konfirmasi pembayaran pertama diterima.</li>
              <li>Kami berhak menolak atau membatalkan pemesanan yang dianggap tidak memenuhi syarat atau melanggar ketentuan yang berlaku.</li>
            </ul>
          </section>

          {/* 2. Pemesanan dan Pendaftaran */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              2. Pemesanan dan Pendaftaran
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  2.1 Prosedur Pemesanan
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Pemesanan dapat dilakukan melalui website, WhatsApp, email, atau kunjungan langsung ke kantor kami.</li>
                  <li>Peserta wajib memberikan data diri yang lengkap dan akurat sesuai identitas resmi (KTP/Paspor).</li>
                  <li>Data yang tidak lengkap atau tidak sesuai dapat mengakibatkan pembatalan keikutsertaan tanpa pengembalian dana.</li>
                  <li>Pemesanan dianggap sah setelah pembayaran down payment (DP) diterima dan dikonfirmasi oleh kami.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  2.2 Konfirmasi Keberangkatan
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Konfirmasi keberangkatan akan diberikan maksimal 7 hari sebelum tanggal keberangkatan.</li>
                  <li>Untuk open trip, keberangkatan akan dikonfirmasi setelah mencapai minimum kuota peserta (biasanya 10-15 orang).</li>
                  <li>Jika kuota minimum tidak tercapai, kami berhak membatalkan atau mengubah jadwal keberangkatan dengan memberikan alternatif tanggal lain atau pengembalian dana penuh.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  2.3 Dokumen Perjalanan
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Peserta wajib memiliki dokumen perjalanan yang valid (KTP untuk domestik, Paspor untuk internasional).</li>
                  <li>Untuk perjalanan internasional, paspor harus memiliki masa berlaku minimal 6 bulan dari tanggal keberangkatan.</li>
                  <li>Visa (jika diperlukan) menjadi tanggung jawab peserta, kecuali termasuk dalam paket.</li>
                  <li>Kesalahan pengejaan nama atau data diri yang tidak sesuai dengan dokumen resmi dapat menyebabkan biaya tambahan atau pembatalan.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Pembayaran */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              3. Ketentuan Pembayaran
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.1 Metode Pembayaran
                </h3>
                <p className="text-gray-700 mb-2">Kami menerima pembayaran melalui:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Transfer bank (BCA, Mandiri, BNI, BRI)</li>
                  <li>E-wallet (GoPay, OVO, Dana, ShopeePay)</li>
                  <li>Virtual account</li>
                  <li>Kartu kredit/debit (dengan biaya admin 2-3%)</li>
                  <li>Cicilan 0% (untuk bank tertentu, syarat dan ketentuan berlaku)</li>
                  <li>PayLater (Kredivo, Akulaku, dengan approval)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.2 Skema Pembayaran
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Down Payment (DP):</strong> Minimal 30% dari total biaya untuk konfirmasi booking.</li>
                  <li><strong>Cicilan Kedua:</strong> 30% dari total biaya, maksimal 45 hari sebelum keberangkatan.</li>
                  <li><strong>Pelunasan:</strong> Harus diselesaikan maksimal 14-30 hari sebelum keberangkatan (tergantung jenis paket).</li>
                  <li>Untuk booking mendadak (H-30), pelunasan wajib dilakukan saat pendaftaran.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.3 Keterlambatan Pembayaran
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Keterlambatan pembayaran dapat mengakibatkan pembatalan otomatis tanpa pemberitahuan.</li>
                  <li>DP yang sudah dibayarkan tidak dapat dikembalikan jika peserta membatalkan atau gagal melunasi.</li>
                  <li>Denda keterlambatan 5% per minggu dapat dikenakan untuk pembayaran yang melewati deadline.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3.4 Bukti Pembayaran
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Setiap pembayaran wajib dikonfirmasi dengan mengirimkan bukti transfer.</li>
                  <li>Konfirmasi pembayaran akan diproses dalam 1x24 jam pada hari kerja.</li>
                  <li>Invoice resmi akan dikirimkan setelah pembayaran terverifikasi.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Pembatalan dan Pengembalian Dana */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              4. Kebijakan Pembatalan dan Pengembalian Dana
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.1 Pembatalan oleh Peserta
                </h3>
                <p className="text-gray-700 mb-2">Biaya pembatalan yang berlaku:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>H-45 atau lebih:</strong> Potongan 25% dari total pembayaran</li>
                  <li><strong>H-30 hingga H-44:</strong> Potongan 50% dari total pembayaran</li>
                  <li><strong>H-15 hingga H-29:</strong> Potongan 75% dari total pembayaran</li>
                  <li><strong>H-14 atau kurang:</strong> Tidak ada pengembalian dana (100% hangus)</li>
                  <li><strong>No-show/tidak hadir:</strong> Tidak ada pengembalian dana</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <em>Catatan: Perhitungan hari (H) adalah hari kalender, bukan hari kerja.</em>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.2 Pembatalan oleh Penyelenggara
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Jika kami membatalkan trip karena kuota tidak terpenuhi atau force majeure, peserta akan mendapatkan pengembalian dana 100% atau opsi reschedule.</li>
                  <li>Pengembalian dana akan diproses dalam 14 hari kerja sejak pembatalan dikonfirmasi.</li>
                  <li>Kami tidak bertanggung jawab atas kerugian lain yang timbul akibat pembatalan (tiket pesawat pribadi, cuti kerja, dll).</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.3 Pengalihan Peserta (Refund Name)
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Peserta dapat mengalihkan slot kepada orang lain maksimal H-14 dengan pemberitahuan tertulis.</li>
                  <li>Biaya admin untuk refund name adalah Rp 250.000 - Rp 500.000 tergantung jenis paket.</li>
                  <li>Pengalihan nama tidak dapat dilakukan untuk paket yang sudah include tiket pesawat atau visa.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.4 Reschedule Keberangkatan
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Reschedule dapat dilakukan maksimal H-30 dengan membayar biaya admin Rp 500.000 - Rp 1.000.000.</li>
                  <li>Reschedule hanya berlaku untuk tanggal keberangkatan yang tersedia dalam 6 bulan ke depan.</li>
                  <li>Jika terjadi selisih harga, peserta wajib membayar kekurangannya.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Perubahan Itinerary */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              5. Perubahan Itinerary dan Layanan
            </h2>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Kami berhak mengubah itinerary, akomodasi, atau transportasi jika diperlukan karena kondisi tertentu (cuaca, keamanan, force majeure, dll).</li>
              <li>Perubahan dilakukan untuk kepentingan dan keselamatan peserta tanpa mengurangi kualitas layanan.</li>
              <li>Peserta tidak berhak menuntut kompensasi atau pengembalian dana atas perubahan yang dilakukan karena force majeure.</li>
              <li>Jika ada perubahan signifikan yang dapat diantisipasi, kami akan memberitahukan kepada peserta maksimal H-7.</li>
              <li>Waktu kunjungan di setiap destinasi dapat berubah menyesuaikan kondisi traffic, cuaca, atau situasi lokal.</li>
            </ul>
          </section>

          {/* 6. Tanggung Jawab dan Kewajiban */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              6. Tanggung Jawab dan Kewajiban
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  6.1 Tanggung Jawab Kami
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Menyediakan layanan sesuai paket yang telah dibayarkan.</li>
                  <li>Memberikan tour leader/guide yang berpengalaman.</li>
                  <li>Memastikan akomodasi dan transportasi sesuai standar yang dijanjikan.</li>
                  <li>Memberikan bantuan darurat 24 jam selama perjalanan.</li>
                  <li>Mengurus dokumen grup (tiket, voucher, dll) sesuai paket.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  6.2 Tanggung Jawab Peserta
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Memastikan kondisi kesehatan fit untuk mengikuti perjalanan.</li>
                  <li>Membawa dokumen perjalanan yang valid (KTP/Paspor/Visa).</li>
                  <li>Mengikuti aturan dan jadwal yang telah ditetapkan.</li>
                  <li>Menjaga barang bawaan pribadi (kami tidak bertanggung jawab atas kehilangan).</li>
                  <li>Menghormati budaya lokal dan sesama peserta.</li>
                  <li>Mentaati hukum dan peraturan negara tujuan.</li>
                  <li>Mengikuti instruksi tour leader untuk keselamatan bersama.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  6.3 Batasan Tanggung Jawab
                </h3>
                <p className="text-gray-700 mb-2">Kami tidak bertanggung jawab atas:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Kehilangan, kerusakan, atau keterlambatan bagasi yang ditangani oleh maskapai atau pihak ketiga.</li>
                  <li>Kecelakaan, sakit, atau cedera yang dialami peserta selama perjalanan.</li>
                  <li>Biaya tambahan akibat keterlambatan atau pembatalan yang disebabkan oleh maskapai, cuaca, bencana alam, atau force majeure.</li>
                  <li>Penolakan visa atau deportasi oleh imigrasi negara tujuan.</li>
                  <li>Barang pribadi yang tertinggal di hotel, kendaraan, atau lokasi wisata.</li>
                  <li>Kerugian akibat kelalaian atau kesalahan peserta sendiri.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Force Majeure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              7. Force Majeure (Keadaan Kahar)
            </h2>

            <p className="text-gray-700 mb-3">
              Force majeure adalah kejadian di luar kendali kami yang dapat mempengaruhi pelaksanaan perjalanan, termasuk namun tidak terbatas pada:
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Bencana alam (gempa bumi, tsunami, banjir, gunung meletus, dll)</li>
              <li>Wabah penyakit atau pandemi</li>
              <li>Kerusuhan, perang, atau konflik politik</li>
              <li>Terorisme atau ancaman keamanan</li>
              <li>Kebijakan pemerintah yang membatasi perjalanan</li>
              <li>Pembatalan atau perubahan jadwal maskapai</li>
              <li>Cuaca ekstrem yang membahayakan keselamatan</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mt-4">
              <p className="text-red-800 text-sm">
                <strong>Catatan Penting:</strong> Dalam kondisi force majeure, kami tidak wajib mengembalikan dana yang telah dibayarkan. Kami akan berusaha memberikan solusi terbaik seperti reschedule atau voucher untuk trip berikutnya. Keputusan final berada di tangan manajemen dengan pertimbangan terbaik untuk semua pihak.
              </p>
            </div>
          </section>

          {/* 8. Asuransi Perjalanan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              8. Asuransi Perjalanan
            </h2>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Beberapa paket kami sudah termasuk asuransi perjalanan. Silakan cek detail paket untuk informasi lebih lanjut.</li>
              <li>Untuk paket yang belum termasuk asuransi, kami sangat menganjurkan peserta untuk membeli asuransi perjalanan sendiri.</li>
              <li>Asuransi mencakup: kecelakaan, sakit, kehilangan bagasi, keterlambatan/pembatalan penerbangan (sesuai polis).</li>
              <li>Klaim asuransi menjadi tanggung jawab peserta langsung kepada perusahaan asuransi.</li>
              <li>Kami dapat membantu memfasilitasi dokumen yang diperlukan untuk klaim asuransi.</li>
            </ul>
          </section>

          {/* 9. Kesehatan dan Kondisi Khusus */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              9. Kesehatan dan Kondisi Khusus
            </h2>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Peserta wajib menginformasikan kondisi kesehatan khusus (penyakit kronis, alergi, disabilitas, kehamilan, dll) saat pendaftaran.</li>
              <li>Untuk ibu hamil, keikutsertaan hanya diperbolehkan dengan surat keterangan dokter dan usia kehamilan maksimal trimester kedua.</li>
              <li>Peserta dengan kondisi kesehatan khusus disarankan membawa obat-obatan pribadi yang cukup.</li>
              <li>Jika terjadi keadaan darurat medis, biaya pengobatan menjadi tanggung jawab peserta (kecuali ditanggung asuransi).</li>
              <li>Tour leader berhak meminta peserta untuk tidak melanjutkan aktivitas tertentu jika membahayakan keselamatan.</li>
              <li>Peserta yang kedapatan menggunakan narkoba atau zat terlarang akan langsung dikeluarkan dari trip tanpa pengembalian dana.</li>
            </ul>
          </section>

          {/* 10. Aturan Selama Perjalanan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              10. Aturan dan Etika Selama Perjalanan
            </h2>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Peserta wajib berkumpul tepat waktu sesuai jadwal yang ditentukan.</li>
              <li>Keterlambatan yang mengakibatkan tertinggal dari grup menjadi tanggung jawab peserta.</li>
              <li>Dilarang membawa barang terlarang (narkoba, senjata, dll).</li>
              <li>Dilarang berkelahi, meminum alkohol berlebihan, atau membuat keributan.</li>
              <li>Hormati privasi dan kenyamanan peserta lain.</li>
              <li>Ikuti aturan dan norma budaya setempat.</li>
              <li>Jaga kebersihan dan kelestarian lingkungan.</li>
              <li>Tidak melakukan tindakan yang merugikan atau mencoreng nama baik perusahaan.</li>
              <li>Tour leader berhak mengeluarkan peserta yang melanggar aturan tanpa pengembalian dana.</li>
            </ul>
          </section>

          {/* 11. Dokumentasi dan Privasi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              11. Dokumentasi dan Penggunaan Konten
            </h2>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Kami berhak mengambil foto dan video selama perjalanan untuk keperluan dokumentasi dan promosi.</li>
              <li>Dengan mengikuti trip, peserta memberikan izin untuk penggunaan foto/video tersebut di media sosial, website, dan material marketing kami.</li>
              <li>Jika peserta tidak ingin difoto/divideo, harap informasikan kepada tour leader.</li>
              <li>Data pribadi peserta akan dijaga kerahasiaannya sesuai kebijakan privasi kami.</li>
              <li>Peserta tidak diperbolehkan menggunakan foto/video trip untuk keperluan komersial tanpa izin tertulis.</li>
            </ul>
          </section>

          {/* 12. Komplain dan Penyelesaian Sengketa */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              12. Komplain dan Penyelesaian Sengketa
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  12.1 Penyampaian Komplain
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Komplain terkait layanan dapat disampaikan kepada tour leader selama perjalanan.</li>
                  <li>Komplain setelah trip harus disampaikan maksimal 7 hari setelah berakhirnya perjalanan.</li>
                  <li>Komplain harus disertai dengan bukti (foto, video, saksi) jika memungkinkan.</li>
                  <li>Kami akan merespons komplain dalam waktu 3-7 hari kerja.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  12.2 Penyelesaian Sengketa
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Setiap perselisihan akan diselesaikan terlebih dahulu melalui musyawarah dan mediasi.</li>
                  <li>Jika tidak tercapai kesepakatan, sengketa akan diselesaikan melalui jalur hukum yang berlaku di Indonesia.</li>
                  <li>Yurisdiksi hukum adalah Pengadilan Negeri Jakarta Pusat.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 13. Perubahan Syarat & Ketentuan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              13. Perubahan Syarat & Ketentuan
            </h2>

            <p className="text-gray-700">
              Kami berhak mengubah, menambah, atau mengurangi syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Perubahan akan efektif segera setelah dipublikasikan di website kami. Peserta yang melakukan booking setelah perubahan dianggap telah menyetujui syarat dan ketentuan yang baru. Untuk booking yang telah dikonfirmasi sebelum perubahan, tetap berlaku syarat dan ketentuan pada saat booking dilakukan.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary/20">
              14. Informasi Kontak
            </h2>

            <p className="text-gray-700 mb-4">
              Jika Anda memiliki pertanyaan terkait syarat dan ketentuan ini, silakan hubungi kami:
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
                  <p className="text-gray-700">Email: <a href="mailto:info@aurorasejahtera.com" className="text-primary hover:text-primary-dark font-medium">info@aurorasejahtera.com</a></p>
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
          </section>

          {/* Acceptance */}
          <div className="bg-primary/5 rounded-xl p-6 border-2 border-primary/20">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Pernyataan Persetujuan</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Dengan melakukan pemesanan, pembayaran, atau menggunakan layanan Aurora Sejahtera Tour & Travel, Anda dengan ini menyatakan telah <strong>membaca, memahami, dan menyetujui</strong> seluruh syarat dan ketentuan yang tercantum dalam dokumen ini. Ketidaktahuan terhadap syarat dan ketentuan ini tidak dapat dijadikan alasan untuk pembatalan atau pengembalian dana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
