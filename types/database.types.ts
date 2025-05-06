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
          disponible: boolean
          id: number
          pais: string | null
          recomendado: boolean | null
          region: string | null
          subgenero: string | null
          titulo: string | null
        }
        Insert: {
          autor?: string | null
          created_at?: string
          disponible: boolean
          id?: number
          pais?: string | null
          recomendado?: boolean | null
          region?: string | null
          subgenero?: string | null
          titulo?: string | null
        }
        Update: {
          autor?: string | null
          created_at?: string
          disponible?: boolean
          id?: number
          pais?: string | null
          recomendado?: boolean | null
          region?: string | null
          subgenero?: string | null
          titulo?: string | null
        }
        Relationships: []
      }
      librosGeneros: {
        Row: {
          created_at: string
          genero_id: number | null
          id: number
          libro_id: number | null
        }
        Insert: {
          created_at?: string
          genero_id?: number | null
          id?: number
          libro_id?: number | null
        }
        Update: {
          created_at?: string
          genero_id?: number | null
          id?: number
          libro_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "LibrosGeneros_genero_id_fkey"
            columns: ["genero_id"]
            isOneToOne: false
            referencedRelation: "genero"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "LibrosGeneros_libro_id_fkey"
            columns: ["libro_id"]
            isOneToOne: false
            referencedRelation: "libros"
            referencedColumns: ["id"]
          },
        ]
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
          devuelto: boolean | null
          fecha_devolucion: string | null
          fecha_prestamo: string | null
          id: number
          libro_id: number
          usuario_id: number
        }
        Insert: {
          created_at?: string
          devuelto?: boolean | null
          fecha_devolucion?: string | null
          fecha_prestamo?: string | null
          id?: number
          libro_id: number
          usuario_id: number
        }
        Update: {
          created_at?: string
          devuelto?: boolean | null
          fecha_devolucion?: string | null
          fecha_prestamo?: string | null
          id?: number
          libro_id?: number
          usuario_id?: number
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
          apellido: string
          cedula: number | null
          comentarios: string | null
          created_at: string
          direccion: string | null
          id: number
          nombre: string
          telefono: number | null
        }
        Insert: {
          apellido: string
          cedula?: number | null
          comentarios?: string | null
          created_at?: string
          direccion?: string | null
          id?: number
          nombre: string
          telefono?: number | null
        }
        Update: {
          apellido?: string
          cedula?: number | null
          comentarios?: string | null
          created_at?: string
          direccion?: string | null
          id?: number
          nombre?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
