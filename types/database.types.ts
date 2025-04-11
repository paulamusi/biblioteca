export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      genero: {
        Row: {
          created_at: string
          genero: string | null
          id: number
        }
        Insert: {
          created_at?: string
          genero?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          genero?: string | null
          id?: number
        }
        Relationships: []
      }
      libros: {
        Row: {
          autor: string | null
          created_at: string
          disponible: boolean | null
          genero: string | null
          id: number
          pais: string | null
          region: string | null
          subgenero: string | null
          titulo: string | null
        }
        Insert: {
          autor?: string | null
          created_at?: string
          disponible?: boolean | null
          genero?: string | null
          id?: number
          pais?: string | null
          region?: string | null
          subgenero?: string | null
          titulo?: string | null
        }
        Update: {
          autor?: string | null
          created_at?: string
          disponible?: boolean | null
          genero?: string | null
          id?: number
          pais?: string | null
          region?: string | null
          subgenero?: string | null
          titulo?: string | null
        }
        Relationships: []
      }
      noticias: {
        Row: {
          contenido: string | null
          created_at: string
          id: number
          titulo: string | null
        }
        Insert: {
          contenido?: string | null
          created_at?: string
          id?: number
          titulo?: string | null
        }
        Update: {
          contenido?: string | null
          created_at?: string
          id?: number
          titulo?: string | null
        }
        Relationships: []
      }
      prestamos: {
        Row: {
          created_at: string
          fecha_devolucion: string | null
          fecha_prestamo: string | null
          id: number
          libro_id: number | null
          usuario_id: number | null
        }
        Insert: {
          created_at?: string
          fecha_devolucion?: string | null
          fecha_prestamo?: string | null
          id?: number
          libro_id?: number | null
          usuario_id?: number | null
        }
        Update: {
          created_at?: string
          fecha_devolucion?: string | null
          fecha_prestamo?: string | null
          id?: number
          libro_id?: number | null
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prestamos_libro_id_fkey"
            columns: ["libro_id"]
            isOneToOne: false
            referencedRelation: "libros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prestamos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          apellido: string | null
          cedula: number | null
          comentarios: string | null
          created_at: string
          direccion: string | null
          id: number
          nombre: string | null
          telefono: number | null
        }
        Insert: {
          apellido?: string | null
          cedula?: number | null
          comentarios?: string | null
          created_at?: string
          direccion?: string | null
          id?: number
          nombre?: string | null
          telefono?: number | null
        }
        Update: {
          apellido?: string | null
          cedula?: number | null
          comentarios?: string | null
          created_at?: string
          direccion?: string | null
          id?: number
          nombre?: string | null
          telefono?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
