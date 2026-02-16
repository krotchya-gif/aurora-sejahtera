import AdminHeader from "@/components/admin/AdminHeader";
import PaketForm from "@/components/admin/PaketForm";

export default function NewPaketPage() {
  return (
    <div>
      <AdminHeader
        title="Tambah Paket Wisata"
        subtitle="Buat paket wisata baru"
      />
      <div className="p-4 md:p-8">
        <PaketForm />
      </div>
    </div>
  );
}
