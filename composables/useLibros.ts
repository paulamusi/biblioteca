import type { Libro } from "~/types/types";

function debounce(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>;  
  return function (...args: any[]) {
    clearTimeout(timer); 
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const useLibros = () => {
  const client = useSupabaseClient();
  const libros = ref<Libro[]>([]);
  const resultados = ref<Libro[]>([]);
  const busquedaLibro = ref<string>("");

  const agregarLibro = async (libro: Libro) => {
    const { error } = await client.from("libros").insert([libro]);
    if (error) throw error;
  };

  const obtenerLibros = async () => {
    const { data, error } = await client.from("libros").select("*");
    if (error) throw error;
    return data;
  };

  const obtenerLibroPorId = async (id: number): Promise<Libro> => {
    const { data, error } = await client.from("libros").select("*").eq("id", id).single();
    if (error || !data) {
      console.error(`Error al obtener el libro con ID ${id}:`, error?.message);
      throw new Error("Libro no encontrado");
    }
    return data;
  };

  const buscarLibros = debounce(async () => {
    if (busquedaLibro.value.trim()) {
      const { data, error } = await client
        .from("libros")
        .select("*")
        .ilike("titulo", `%${busquedaLibro.value}%`);
      if (error) {
        console.error("Error al buscar libros:", error);
        return;
      }
      resultados.value = data || [];
    } else {
      resultados.value = [];
    }
  }, 500);

  const seleccionarLibro = (libro: Libro) => {
    busquedaLibro.value = libro.titulo || ""; 
    resultados.value = [libro];  
  };

  const actualizarLibro = async (libro: Libro) => {
    const { id, created_at, ...libroParaActualizar } = libro;
    if (id === undefined) {
      throw new Error("El ID del libro es requerido para actualizarlo.");
    }
    const { data, error: fetchError } = await client
      .from("libros")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchError || !data) {
      throw new Error("El libro con el ID proporcionado no existe.");
    }
    const { error } = await client
      .from("libros")
      .update(libroParaActualizar)
      .eq("id", id);
  
    if (error) throw error;
  };

  return { agregarLibro, obtenerLibros, obtenerLibroPorId, actualizarLibro, resultados, busquedaLibro, buscarLibros,  seleccionarLibro};
};
