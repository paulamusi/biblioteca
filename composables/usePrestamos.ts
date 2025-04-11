
import type { Prestamo } from "~/types/types";

export const usePrestamo = () => {
  const client = useSupabaseClient();

  const registrarPrestamo = async (prestamo: Prestamo) => {
    const { error } = await client.from("prestamos").insert([prestamo]);
    if (error) throw error;
  };

  const obtenerPrestamos = async () => {
    const { data, error } = await client.from("prestamos").select("*");
    if (error) throw error;
    return data;
  };

  return { registrarPrestamo, obtenerPrestamos };
};