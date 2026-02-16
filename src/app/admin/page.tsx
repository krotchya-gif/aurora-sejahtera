import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import { Paket, Artikel, Testimonial } from "@/models";

async function getStats() {
  try {
    await dbConnect();

    const [totalPaket, activePaket, totalArtikel, publishedArtikel, totalTestimonial, approvedTestimonial] =
      await Promise.all([
        Paket.countDocuments(),
        Paket.countDocuments({ isActive: true }),
        Artikel.countDocuments(),
        Artikel.countDocuments({ isPublished: true }),
        Testimonial.countDocuments(),
        Testimonial.countDocuments({ isApproved: true }),
      ]);

    return {
      totalPaket,
      activePaket,
      totalArtikel,
      publishedArtikel,
      totalTestimonial,
      approvedTestimonial,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalPaket: 0,
      activePaket: 0,
      totalArtikel: 0,
      publishedArtikel: 0,
      totalTestimonial: 0,
      approvedTestimonial: 0,
    };
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const stats = await getStats();

  const statCards = [
    {
      title: "Paket Wisata",
      value: stats.totalPaket,
      subtitle: `${stats.activePaket} aktif`,
      href: "/admin/paket",
      color: "bg-primary",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Artikel",
      value: stats.totalArtikel,
      subtitle: `${stats.publishedArtikel} published`,
      href: "/admin/artikel",
      color: "bg-secondary",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      title: "Testimonial",
      value: stats.totalTestimonial,
      subtitle: `${stats.approvedTestimonial} approved`,
      href: "/admin/testimonial",
      color: "bg-accent",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader
        title={`Selamat datang, ${session?.user?.name}!`}
        subtitle="Kelola website Aurora Sejahtera Tour & Travel"
      />

      <div className="p-4 md:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`${stat.color} text-white p-4 rounded-xl`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/paket/new"
              className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Tambah Paket</span>
            </Link>

            <Link
              href="/admin/artikel/new"
              className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Tambah Artikel</span>
            </Link>

            <Link
              href="/admin/pengaturan"
              className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Pengaturan</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Lihat Website</span>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-800 font-medium">Pertama kali menggunakan?</p>
              <p className="text-blue-600 text-sm">
                Pastikan database MongoDB sudah berjalan. Kunjungi{" "}
                <a href="/api/seed" target="_blank" className="underline">/api/seed</a>
                {" "}untuk mengisi data awal (paket wisata sample).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
