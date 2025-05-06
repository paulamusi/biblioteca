import type { Prestamo } from "~/types/types";
import type { PrestamoVencidoConUsuario } from "~/types/types";

export const usePrestamo = () => {
  const client = useSupabaseClient();

  const registrarPrestamo = async (prestamo: Prestamo) => {
    const { data: libro, error: fetchError } = await client
      .from("libros")
      .select("disponible")
      .eq("id", prestamo.libro_id!)
      .single();

    if (fetchError) throw fetchError;
    if (!libro?.disponible) {
      throw new Error("El libro ya está prestado.");
    }

    const { error: insertError } = await client.from("prestamos").insert([prestamo]);
    if (insertError) throw insertError;

    const { error: updateError } = await client
      .from("libros")
      .update({ disponible: false })
      .eq("id", prestamo.libro_id!);
    if (updateError) throw updateError;
  };

  const obtenerPrestamos = async () => {
    const { data, error } = await client.from("prestamos").select("*");
    if (error) throw error;
    return data;
  };

  const obtenerPrestamosPorUsuario = async (usuarioId: number) => {
    const { data, error } = await client
      .from("prestamos")
      .select("id, fecha_prestamo, fecha_devolucion, devuelto, libros(titulo)")
      .eq("usuario_id", usuarioId)
      .order("fecha_prestamo", { ascending: false });
  
    if (error) throw error;
  
    return data.map((prestamo) => ({
      id: prestamo.id,
      fecha: prestamo.fecha_prestamo ?? 'Sin fecha',
      tituloLibro: prestamo.libros?.titulo ?? 'Título no disponible',
      devuelto: prestamo.devuelto ?? false,
      fechaDevolucion: prestamo.fecha_devolucion ?? null
    }));
  };

  const obtenerPrestamosVencidos = async (): Promise<PrestamoVencidoConUsuario[]> => {
    const { data, error } = await client
      .from("prestamos")
      .select("id, fecha_prestamo, fecha_devolucion, devuelto, libro_id, libros(titulo), usuario_id, usuarios(apellido)")
      .eq("devuelto", false)
      .lt("fecha_devolucion", new Date().toISOString());
  
    if (error) {
      console.error("Error al obtener préstamos vencidos:", error.message);
      return [];
    }
  
    return (data ?? []).map((p) => ({
      id: p.id,
      fecha: p.fecha_prestamo ?? "",
      tituloLibro: p.libros?.titulo ?? "Sin título",
      devuelto: false,
      fechaDevolucion: p.fecha_devolucion,
      nombreUsuario: p.usuarios?.apellido ?? "Desconocido",
    }));
  };

  const marcarComoDevuelto = async (prestamoId: number) => {
    const hoy = new Date().toISOString();
  
    const { data: prestamo, error: errorPrestamo } = await client
      .from("prestamos")
      .select("libro_id")
      .eq("id", prestamoId)
      .single();
  
    if (errorPrestamo || !prestamo) throw errorPrestamo ?? new Error("Préstamo no encontrado");
  
    const libroId = prestamo.libro_id;

    const { error: errorUpdatePrestamo } = await client
      .from("prestamos")
      .update({ devuelto: true, fecha_devolucion: hoy })
      .eq("id", prestamoId);
  
    if (errorUpdatePrestamo) throw errorUpdatePrestamo;
  
    const { error: errorUpdateLibro } = await client
      .from("libros")
      .update({ disponible: true })
      .eq("id", libroId);
  
    if (errorUpdateLibro) throw errorUpdateLibro;
  };

  return { registrarPrestamo, obtenerPrestamos, obtenerPrestamosPorUsuario, obtenerPrestamosVencidos, marcarComoDevuelto };
};