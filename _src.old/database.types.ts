export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          chat_name: string
          created_at: string | null
          id: string
          persona_id: number
          public: boolean | null
          user_id: string | null
        }
        Insert: {
          chat_name: string
          created_at?: string | null
          id?: string
          persona_id: number
          public?: boolean | null
          user_id?: string | null
        }
        Update: {
          chat_name?: string
          created_at?: string | null
          id?: string
          persona_id?: number
          public?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string | null
          id: number
          role: string
          user_id: string | null
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string | null
          id?: never
          role: string
          user_id?: string | null
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string | null
          id?: never
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      personas: {
        Row: {
          ai_model: string
          avatar: string
          created_at: string | null
          description: string | null
          id: number
          initial_message: string | null
          model_config: Json
          name: string
          public: boolean | null
          system_prompt: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          ai_model: string
          avatar: string
          created_at?: string | null
          description?: string | null
          id?: number
          initial_message?: string | null
          model_config: Json
          name: string
          public?: boolean | null
          system_prompt?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          ai_model?: string
          avatar?: string
          created_at?: string | null
          description?: string | null
          id?: number
          initial_message?: string | null
          model_config?: Json
          name?: string
          public?: boolean | null
          system_prompt?: string | null
          tags?: string[] | null
          user_id?: string | null
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
