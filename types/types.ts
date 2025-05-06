import type { Database } from "~/types/database.types";

export type Libro = Omit<
  Database["public"]["Tables"]["libros"]["Row"],
  "id" | "created_at"
> & {
  id?: number;
  created_at?: string;
};

export type Usuario = Omit<
  Database["public"]["Tables"]["usuarios"]["Row"],
  "id" | "created_at"
> & {
  id?: number;
  created_at?: string;
  nombre: string;
  apellido: string;
  cedula?: number | null;
  comentarios?: string | null;
  direccion?: string | null;
  telefono?: number | null;
};

export type Prestamo = Omit<
  Database["public"]["Tables"]["prestamos"]["Row"],
  "id" | "created_at"
> & {
  id?: number;
  created_at?: string;
};

export type PrestamoConLibro = {
  id: number;
  fecha: string;
  tituloLibro: string;
  devuelto: boolean;
  fechaDevolucion: string | null;
};

export type PrestamoVencidoConUsuario = PrestamoConLibro & {
  nombreUsuario: string; 
};

export type Genero = Omit<
  Database["public"]["Tables"]["genero"]["Row"],
  "id" | "created_at"
> & {
  id?: number;
  created_at?: string;
};

export type Noticia = Omit<
  Database["public"]["Tables"]["noticias"]["Row"],
  "id" | "created_at"
> & {
  id?: number;
  created_at?: string;
};