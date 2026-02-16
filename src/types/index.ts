export interface PaketWisata {
  id: string;
  slug: string;
  nama: string;
  destinasi: string;
  kategori: 'domestik' | 'internasional' | 'umroh';
  tipe: 'open-trip' | 'private-trip';
  harga: number;
  hargaCoret?: number;
  durasi: string;
  tanggalKeberangkatan: string[];
  kuota: number;
  sisaKuota: number;
  gambar: string;
  gambarGaleri: string[];
  deskripsi: string;
  itinerary: ItineraryItem[];
  fasilitas: string[];
  tidakTermasuk: string[];
  kotaKeberangkatan: KotaHarga[];
  rating: number;
  jumlahReview: number;
  isPromo: boolean;
  season: 'normal' | 'high';
}

export interface ItineraryItem {
  hari: number;
  judul: string;
  aktivitas: string[];
}

export interface KotaHarga {
  kota: string;
  harga: number;
}

export interface Testimonial {
  id: string;
  nama: string;
  foto: string;
  destinasi: string;
  rating: number;
  komentar: string;
  tanggal: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  judul: string;
  excerpt: string;
  konten: string;
  gambar: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  tags: string[];
}

export interface GaleriItem {
  id: string;
  judul: string;
  gambar: string;
  destinasi: string;
  kategori: string;
}

export interface Destinasi {
  id: string;
  nama: string;
  negara: string;
  gambar: string;
  jumlahPaket: number;
}
