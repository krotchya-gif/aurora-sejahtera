import AdminHeader from "@/components/admin/AdminHeader";
import ArtikelForm from "@/components/admin/ArtikelForm";

export default function NewArtikelPage() {
  return (
    <div>
      <AdminHeader
        title="Tulis Artikel Baru"
        subtitle="Buat artikel untuk blog"
      />
      <div className="p-4 md:p-8">
        <ArtikelForm />
      </div>
    </div>
  );
}
