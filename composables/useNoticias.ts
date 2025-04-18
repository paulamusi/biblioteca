import type { Noticia } from "~/types/types";

export const usePrestamo = () => {
  const client = useSupabaseClient();

  const registrarNoticia = async (noticia: Noticia) => {
    const { error } = await client.from("prestamos").insert([noticia]);
    if (error) throw error;
  };

  const obtenerNoticia = async () => {
    const { data, error } = await client.from("noticias").select("*");
    if (error) throw error;
    return data;
  };

  return { registrarNoticia, obtenerNoticia };
};