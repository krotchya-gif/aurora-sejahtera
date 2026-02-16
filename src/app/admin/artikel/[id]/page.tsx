import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ArtikelForm from "@/components/admin/ArtikelForm";
import dbConnect from "@/lib/mongodb";
import Artikel from "@/models/Artikel";

async function getArtikel(id: string) {
  try {
    await dbConnect();
    const artikel = await Artikel.findById(id).lean();
    if (!artikel) return null;
    return JSON.parse(JSON.stringify(artikel));
  } catch {
    return null;
  }
}

export default async function EditArtikelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artikel = await getArtikel(id);

  if (!artikel) {
    notFound();
  }

  return (
    <div>
      <AdminHeader
        title="Edit Artikel"
        subtitle={artikel.judul}
      />
      <div className="p-4 md:p-8">
        <ArtikelForm initialData={artikel} isEdit />
      </div>
    </div>
  );
}
