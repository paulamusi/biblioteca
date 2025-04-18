import type { Genero } from "~/types/types";

export const useGenero = () => {
  const client = useSupabaseClient();

  const registrarGenero = async (genero: Genero) => {
    const { error } = await client.from("genero").insert([genero]);
    if (error) throw error;
  };

  const obtenerGeneros = async () => {
    const { data, error } = await client.from("genero").select("*");
    if (error) throw error;
    return data;
  };

  return { registrarGenero, obtenerGeneros };
};