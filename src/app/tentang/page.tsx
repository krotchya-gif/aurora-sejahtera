"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Settings {
  whatsapp: string;
  aboutImage?: string;
}

interface TeamMember {
  _id: string;
  nama: string;
  posisi: string;
  foto: string;
  bio?: string;
}

export default function TentangPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings
        const settingsRes = await fetch("/api/settings");
        const settingsData = await settingsRes.json();
        if (settingsData.success) {
          setSettings(settingsData.data);
        }

        // Fetch team members
        const teamRes = await fetch("/api/team");
        const teamData = await teamRes.json();
        if (teamData.success) {
          setTeamMembers(teamData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat Aurora Sejahtera Tour & Travel
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
      SEJAK 2019
    </span>

    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Aurora Sejahtera Tour & Travel
    </h2>

    <p className="text-gray-600 mb-4">
      Aurora Sejahtera Tour & Travel adalah perusahaan jasa perjalanan wisata yang berkomitmen
      untuk memberikan pengalaman liburan terbaik bagi setiap pelanggan.
    </p>

    <p className="text-gray-600 mb-8">
      Didukung oleh tim profesional yang berpengalaman di bidang pariwisata, kami menawarkan
      berbagai paket wisata domestik dan internasional.
    </p>

    <div className="flex justify-center gap-10">
      <div>
        <p className="text-3xl font-bold text-primary">500+</p>
        <p className="text-gray-600 text-sm">Happy Traveler</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-secondary">50+</p>
        <p className="text-gray-600 text-sm">Destinasi</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-accent">5+</p>
        <p className="text-gray-600 text-sm">Tahun Pengalaman</p>
      </div>
    </div>
  </div>
</section>


      {/* Vision Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Visi</h3>
              <p className="text-white/90">
                Menjadi perusahaan tour & travel terpercaya dan terdepan di Indonesia yang memberikan
                pengalaman perjalanan wisata yang berkesan dan berkualitas tinggi bagi setiap pelanggan.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-gradient-to-br from-secondary to-secondary-dark text-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Misi</h3>
              <ul className="text-white/90 space-y-2">
                <li>- Menyediakan paket wisata yang beragam dan berkualitas</li>
                <li>- Memberikan pelayanan prima dengan harga yang kompetitif</li>
                <li>- Memastikan keamanan dan kenyamanan perjalanan</li>
                <li>- Membangun hubungan jangka panjang dengan pelanggan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              TIM KAMI
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Kenali Tim Aurora</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tim profesional yang siap membantu mewujudkan liburan impian Anda
            </p>
          </div>

          {loadingTeam ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Tim akan segera ditambahkan</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member._id} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30" />
                    <Image
                      src={member.foto}
                      alt={member.nama}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800">{member.nama}</h4>
                  <p className="text-sm text-gray-500">{member.posisi}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Untuk Liburan Bersama Kami?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang dan konsultasikan rencana liburan impian Anda!
          </p>
          <Link
            href={settings ? `https://wa.me/${settings.whatsapp}` : "https://wa.me/6281234567890"}
            target="_blank"
            className="inline-flex items-center bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
