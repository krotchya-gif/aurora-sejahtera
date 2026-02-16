import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import PaketForm from "@/components/admin/PaketForm";
import dbConnect from "@/lib/mongodb";
import Paket from "@/models/Paket";

async function getPaket(id: string) {
  try {
    await dbConnect();
    const paket = await Paket.findById(id).lean();
    if (!paket) return null;
    return JSON.parse(JSON.stringify(paket));
  } catch {
    return null;
  }
}

export default async function EditPaketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paket = await getPaket(id);

  if (!paket) {
    notFound();
  }

  return (
    <div>
      <AdminHeader
        title="Edit Paket Wisata"
        subtitle={paket.nama}
      />
      <div className="p-4 md:p-8">
        <PaketForm initialData={paket} isEdit />
      </div>
    </div>
  );
}
