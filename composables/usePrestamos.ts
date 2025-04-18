import type { Prestamo } from "~/types/types";

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

  return { registrarPrestamo, obtenerPrestamos };
};