import type { Usuario } from "~/types/types";

export const useUsuarios = () => {
  const client = useSupabaseClient();
  const usuario = ref<Usuario>({
    id: 0,
    nombre: "",
    apellido: "",
    cedula: null,
    comentarios: null,
    created_at: new Date().toISOString(),
    direccion: null,
    telefono: null,
  });

  const agregarUsuario = async (usuario: Usuario) => {
    const { error } = await client.from("usuarios").insert([usuario]);
    if (error) throw error;
  };

  const obtenerUsuarios = async () => {
    const { data, error } = await client.from("usuarios").select("*");
    if (error) throw error;
    return data;
  };

  const buscarUsuarioPorNombreApellido = async (nombre: string, apellido: string) => {
    if (!nombre || !apellido) {
      console.error("El nombre y apellido son obligatorios para la búsqueda");
      return null;
    }
    const { data, error } = await client
      .from("usuarios")
      .select("*") 
      .eq("nombre", nombre)
      .eq("apellido", apellido)
      .maybeSingle();
    if (error) {
      console.error("Error al buscar usuario:", error.message);
      return null;
    }
    if (!data) {
      console.warn("No se encontró el usuario");
      return null;
    }
    return data; 
  };

  const buscarUsuarioPorId = async (id: number) => {
    const { data, error } = await client
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single()
  
    if (error) {
      console.error("Error al buscar por ID:", error.message)
      return null
    }
    return data
  }
  
  const actualizarUsuario = async (usuario: Usuario) => {
    const { id, created_at, ...usuarioParaActualizar } = usuario;
    if (id === undefined) {
      throw new Error("El ID del usuario es requerido para actualizarlo.");
    }
    const { data, error: fetchError } = await client
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchError || !data) {
      throw new Error("El usuario con el ID proporcionado no existe.");
    }
    const { error } = await client
      .from("usuarios")
      .update(usuarioParaActualizar)
      .eq("id", id);
  
    if (error) throw error;
  };

  return { agregarUsuario, obtenerUsuarios, usuario, actualizarUsuario, buscarUsuarioPorNombreApellido, buscarUsuarioPorId };
};