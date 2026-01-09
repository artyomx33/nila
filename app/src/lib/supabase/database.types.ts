export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      brutal_luna_responses: {
        Row: {
          brutality_level: number
          context_tags: string[] | null
          created_at: string
          effectiveness_score: number | null
          id: string
          response_line: string
          trigger_type: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          brutality_level?: number
          context_tags?: string[] | null
          created_at?: string
          effectiveness_score?: number | null
          id?: string
          response_line: string
          trigger_type: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          brutality_level?: number
          context_tags?: string[] | null
          created_at?: string
          effectiveness_score?: number | null
          id?: string
          response_line?: string
          trigger_type?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      contact_energy_logs: {
        Row: {
          contact_id: string
          created_at: string
          energy_cost: number
          energy_type: string
          id: string
          interaction_type: string
          message_id: string | null
          mood_after: string | null
          mood_before: string | null
          notes: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string
          energy_cost: number
          energy_type: string
          id?: string
          interaction_type: string
          message_id?: string | null
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string
          energy_cost?: number
          energy_type?: string
          id?: string
          interaction_type?: string
          message_id?: string | null
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
        }
        Relationships: []
      }
      contact_profiles: {
        Row: {
          analysis_confidence: number | null
          auto_reply_enabled: boolean | null
          avg_response_time: unknown
          behavioral_analytics: Json | null
          blackbook_data: Json | null
          communication_frequency: string | null
          contact_name: string
          contact_tier: string | null
          created_at: string | null
          creates_fog: boolean | null
          emotional_tags: Json | null
          energy_balance: number | null
          id: string
          last_interaction: string | null
          last_synced: string | null
          last_trained: string | null
          loyalty_score: number | null
          luna_brain_version: string | null
          manipulation_score: number | null
          message_count: number | null
          mirror_data: Json | null
          penalty_state_history: Json | null
          persona_flaws: Json | null
          persona_summary: string | null
          personality_version: number | null
          phone: string | null
          preferred_tone: string | null
          relationship_status: string | null
          sparks_movement: boolean | null
          threat_level: number | null
          tone_patterns: Json | null
          total_energy_cost: number | null
          training_history: Json | null
          training_sessions_count: number | null
          updated_at: string | null
        }
        Insert: {
          analysis_confidence?: number | null
          auto_reply_enabled?: boolean | null
          avg_response_time?: unknown
          behavioral_analytics?: Json | null
          blackbook_data?: Json | null
          communication_frequency?: string | null
          contact_name: string
          contact_tier?: string | null
          created_at?: string | null
          creates_fog?: boolean | null
          emotional_tags?: Json | null
          energy_balance?: number | null
          id?: string
          last_interaction?: string | null
          last_synced?: string | null
          last_trained?: string | null
          loyalty_score?: number | null
          luna_brain_version?: string | null
          manipulation_score?: number | null
          message_count?: number | null
          mirror_data?: Json | null
          penalty_state_history?: Json | null
          persona_flaws?: Json | null
          persona_summary?: string | null
          personality_version?: number | null
          phone?: string | null
          preferred_tone?: string | null
          relationship_status?: string | null
          sparks_movement?: boolean | null
          threat_level?: number | null
          tone_patterns?: Json | null
          total_energy_cost?: number | null
          training_history?: Json | null
          training_sessions_count?: number | null
          updated_at?: string | null
        }
        Update: {
          analysis_confidence?: number | null
          auto_reply_enabled?: boolean | null
          avg_response_time?: unknown
          behavioral_analytics?: Json | null
          blackbook_data?: Json | null
          communication_frequency?: string | null
          contact_name?: string
          contact_tier?: string | null
          created_at?: string | null
          creates_fog?: boolean | null
          emotional_tags?: Json | null
          energy_balance?: number | null
          id?: string
          last_interaction?: string | null
          last_synced?: string | null
          last_trained?: string | null
          loyalty_score?: number | null
          luna_brain_version?: string | null
          manipulation_score?: number | null
          message_count?: number | null
          mirror_data?: Json | null
          penalty_state_history?: Json | null
          persona_flaws?: Json | null
          persona_summary?: string | null
          personality_version?: number | null
          phone?: string | null
          preferred_tone?: string | null
          relationship_status?: string | null
          sparks_movement?: boolean | null
          threat_level?: number | null
          tone_patterns?: Json | null
          total_energy_cost?: number | null
          training_history?: Json | null
          training_sessions_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      conversation_history: {
        Row: {
          contact_id: string | null
          conversation_session_id: string
          created_at: string
          id: string
          message_metadata: Json | null
          message_sequence: number
          message_text: string
          original_timestamp: string
          sender_type: string
          updated_at: string
        }
        Insert: {
          contact_id?: string | null
          conversation_session_id: string
          created_at?: string
          id?: string
          message_metadata?: Json | null
          message_sequence: number
          message_text: string
          original_timestamp: string
          sender_type: string
          updated_at?: string
        }
        Update: {
          contact_id?: string | null
          conversation_session_id?: string
          created_at?: string
          id?: string
          message_metadata?: Json | null
          message_sequence?: number
          message_text?: string
          original_timestamp?: string
          sender_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_history_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      drafts: {
        Row: {
          ai_reply: string | null
          created_at: string | null
          edited_reply: string | null
          id: string
          message_id: string | null
          status: string | null
        }
        Insert: {
          ai_reply?: string | null
          created_at?: string | null
          edited_reply?: string | null
          id?: string
          message_id?: string | null
          status?: string | null
        }
        Update: {
          ai_reply?: string | null
          created_at?: string | null
          edited_reply?: string | null
          id?: string
          message_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drafts_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          contact_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          event_time: string | null
          event_type: string | null
          id: string
          is_confirmed: boolean | null
          location: string | null
          reminder_sent: boolean | null
          source_message_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date: string
          event_time?: string | null
          event_type?: string | null
          id?: string
          is_confirmed?: boolean | null
          location?: string | null
          reminder_sent?: boolean | null
          source_message_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          event_time?: string | null
          event_type?: string | null
          id?: string
          is_confirmed?: boolean | null
          location?: string | null
          reminder_sent?: boolean | null
          source_message_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_source_message_id_fkey"
            columns: ["source_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      health_logs: {
        Row: {
          created_at: string
          details: Json | null
          id: string
          response_time: number | null
          service: string
          status: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: string
          response_time?: number | null
          service?: string
          status: string
          timestamp?: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: string
          response_time?: number | null
          service?: string
          status?: string
          timestamp?: string
        }
        Relationships: []
      }
      health_reports: {
        Row: {
          created_at: string
          id: string
          period_end: string
          period_start: string
          report_data: Json
          status: string | null
          total_checks: number | null
          uptime_percentage: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          period_end: string
          period_start: string
          report_data: Json
          status?: string | null
          total_checks?: number | null
          uptime_percentage?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          period_end?: string
          period_start?: string
          report_data?: Json
          status?: string | null
          total_checks?: number | null
          uptime_percentage?: number | null
        }
        Relationships: []
      }
      luna_brain_versions: {
        Row: {
          changelog: string | null
          created_at: string | null
          features: Json
          id: string
          version: string
        }
        Insert: {
          changelog?: string | null
          created_at?: string | null
          features: Json
          id?: string
          version: string
        }
        Update: {
          changelog?: string | null
          created_at?: string | null
          features?: Json
          id?: string
          version?: string
        }
        Relationships: []
      }
      luna_coaching_logs: {
        Row: {
          advisory_response: string
          coaching_type: string | null
          confidence_score: number | null
          contact_id: string | null
          created_at: string | null
          id: string
          message_context: string
        }
        Insert: {
          advisory_response: string
          coaching_type?: string | null
          confidence_score?: number | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          message_context: string
        }
        Update: {
          advisory_response?: string
          coaching_type?: string | null
          confidence_score?: number | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          message_context?: string
        }
        Relationships: [
          {
            foreignKeyName: "luna_coaching_logs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      luna_feedback: {
        Row: {
          confidence: number | null
          contact_id: string | null
          created_at: string | null
          draft_id: string | null
          feedback: string | null
          feedback_type: string | null
          id: string
          message_id: string | null
          notes: string | null
        }
        Insert: {
          confidence?: number | null
          contact_id?: string | null
          created_at?: string | null
          draft_id?: string | null
          feedback?: string | null
          feedback_type?: string | null
          id?: string
          message_id?: string | null
          notes?: string | null
        }
        Update: {
          confidence?: number | null
          contact_id?: string | null
          created_at?: string | null
          draft_id?: string | null
          feedback?: string | null
          feedback_type?: string | null
          id?: string
          message_id?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "luna_feedback_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "luna_feedback_draft_id_fkey"
            columns: ["draft_id"]
            isOneToOne: false
            referencedRelation: "drafts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "luna_feedback_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      luna_memory_snapshots: {
        Row: {
          confidence_score: number | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          personality_data: Json | null
          snapshot_data: Json
          snapshot_type: string | null
          training_source: string | null
        }
        Insert: {
          confidence_score?: number | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          personality_data?: Json | null
          snapshot_data?: Json
          snapshot_type?: string | null
          training_source?: string | null
        }
        Update: {
          confidence_score?: number | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          personality_data?: Json | null
          snapshot_data?: Json
          snapshot_type?: string | null
          training_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "luna_memory_snapshots_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      luna_rules: {
        Row: {
          contact_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          priority: number | null
          rule_if: string
          rule_then: string
          updated_at: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          rule_if: string
          rule_then: string
          updated_at?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          rule_if?: string
          rule_then?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "luna_rules_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      luna_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      luna_training_logs: {
        Row: {
          confidence_avg: number | null
          contact_id: string | null
          created_at: string | null
          delta: string | null
          id: string
          messages_analyzed: number | null
          notes: string | null
          trained_at: string | null
        }
        Insert: {
          confidence_avg?: number | null
          contact_id?: string | null
          created_at?: string | null
          delta?: string | null
          id?: string
          messages_analyzed?: number | null
          notes?: string | null
          trained_at?: string | null
        }
        Update: {
          confidence_avg?: number | null
          contact_id?: string | null
          created_at?: string | null
          delta?: string | null
          id?: string
          messages_analyzed?: number | null
          notes?: string | null
          trained_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "luna_training_logs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_processing_queue: {
        Row: {
          completed_at: string | null
          contact_id: string | null
          created_at: string
          error_message: string | null
          id: string
          max_retries: number | null
          payload: Json
          priority: number
          progress_data: Json | null
          retry_count: number | null
          started_at: string | null
          status: string
          task_type: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          max_retries?: number | null
          payload?: Json
          priority?: number
          progress_data?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          task_type: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          max_retries?: number | null
          payload?: Json
          priority?: number
          progress_data?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          task_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_processing_queue_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          category: string | null
          confidence_score: number | null
          content: string
          created_at: string
          id: string
          tags: string[] | null
          title: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          confidence_score?: number | null
          content: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          confidence_score?: number | null
          content?: string
          created_at?: string
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          ai_confidence: number | null
          ai_draft: string | null
          ai_priority: string | null
          ai_reply_timestamp: string | null
          contact: string | null
          contact_id: string | null
          content: string | null
          from_phone: string | null
          from_wa_id: string | null
          id: string
          is_archived: boolean | null
          message: string | null
          message_id: string | null
          reply_final: string | null
          reply_sent: boolean | null
          timestamp: string | null
        }
        Insert: {
          ai_confidence?: number | null
          ai_draft?: string | null
          ai_priority?: string | null
          ai_reply_timestamp?: string | null
          contact?: string | null
          contact_id?: string | null
          content?: string | null
          from_phone?: string | null
          from_wa_id?: string | null
          id?: string
          is_archived?: boolean | null
          message?: string | null
          message_id?: string | null
          reply_final?: string | null
          reply_sent?: boolean | null
          timestamp?: string | null
        }
        Update: {
          ai_confidence?: number | null
          ai_draft?: string | null
          ai_priority?: string | null
          ai_reply_timestamp?: string | null
          contact?: string | null
          contact_id?: string | null
          content?: string | null
          from_phone?: string | null
          from_wa_id?: string | null
          id?: string
          is_archived?: boolean | null
          message?: string | null
          message_id?: string | null
          reply_final?: string | null
          reply_sent?: boolean | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nila_bookings: {
        Row: {
          booking_type: string | null
          check_in: string
          check_out: string
          cleaning_fee: number | null
          contract_signed_at: string | null
          contract_status: string | null
          contract_url: string | null
          created_at: string | null
          currency: string | null
          deposit_return_amount: number | null
          deposit_return_notes: string | null
          deposit_status: string | null
          electricity_included: boolean | null
          external_id: string | null
          guest_email: string | null
          guest_id_url: string | null
          guest_name: string
          guest_nationality: string | null
          guest_notes: string | null
          guest_passport_url: string | null
          guest_phone: string | null
          guests_count: number | null
          id: string
          internal_notes: string | null
          monthly_rate: number | null
          nightly_rate: number
          nights: number | null
          notes: string | null
          payment_status: string | null
          security_deposit: number | null
          source: string | null
          status: string | null
          subtotal: number
          taxes: number | null
          total: number
          unit_id: string
          updated_at: string | null
          water_fee_monthly: number | null
          wifi_included: boolean | null
        }
        Insert: {
          booking_type?: string | null
          check_in: string
          check_out: string
          cleaning_fee?: number | null
          contract_signed_at?: string | null
          contract_status?: string | null
          contract_url?: string | null
          created_at?: string | null
          currency?: string | null
          deposit_return_amount?: number | null
          deposit_return_notes?: string | null
          deposit_status?: string | null
          electricity_included?: boolean | null
          external_id?: string | null
          guest_email?: string | null
          guest_id_url?: string | null
          guest_name: string
          guest_nationality?: string | null
          guest_notes?: string | null
          guest_passport_url?: string | null
          guest_phone?: string | null
          guests_count?: number | null
          id?: string
          internal_notes?: string | null
          monthly_rate?: number | null
          nightly_rate: number
          nights?: number | null
          notes?: string | null
          payment_status?: string | null
          security_deposit?: number | null
          source?: string | null
          status?: string | null
          subtotal: number
          taxes?: number | null
          total: number
          unit_id: string
          updated_at?: string | null
          water_fee_monthly?: number | null
          wifi_included?: boolean | null
        }
        Update: {
          booking_type?: string | null
          check_in?: string
          check_out?: string
          cleaning_fee?: number | null
          contract_signed_at?: string | null
          contract_status?: string | null
          contract_url?: string | null
          created_at?: string | null
          currency?: string | null
          deposit_return_amount?: number | null
          deposit_return_notes?: string | null
          deposit_status?: string | null
          electricity_included?: boolean | null
          external_id?: string | null
          guest_email?: string | null
          guest_id_url?: string | null
          guest_name?: string
          guest_nationality?: string | null
          guest_notes?: string | null
          guest_passport_url?: string | null
          guest_phone?: string | null
          guests_count?: number | null
          id?: string
          internal_notes?: string | null
          monthly_rate?: number | null
          nightly_rate?: number
          nights?: number | null
          notes?: string | null
          payment_status?: string | null
          security_deposit?: number | null
          source?: string | null
          status?: string | null
          subtotal?: number
          taxes?: number | null
          total?: number
          unit_id?: string
          updated_at?: string | null
          water_fee_monthly?: number | null
          wifi_included?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "nila_bookings_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "nila_units"
            referencedColumns: ["id"]
          },
        ]
      }
      nila_expenses: {
        Row: {
          amount: number
          billable_to_owner: boolean | null
          category: string | null
          created_at: string | null
          currency: string | null
          description: string
          expense_date: string | null
          id: string
          notes: string | null
          property_id: string | null
          receipt_url: string | null
          unit_id: string | null
          vendor: string | null
        }
        Insert: {
          amount: number
          billable_to_owner?: boolean | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description: string
          expense_date?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          receipt_url?: string | null
          unit_id?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number
          billable_to_owner?: boolean | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string
          expense_date?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          receipt_url?: string | null
          unit_id?: string | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nila_expenses_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "nila_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nila_expenses_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "nila_units"
            referencedColumns: ["id"]
          },
        ]
      }
      nila_maintenance_reports: {
        Row: {
          created_at: string | null
          id: string
          images: Json | null
          inspection_data: Json | null
          inspector: string | null
          issues_found: Json | null
          month: string
          owner_notified_at: string | null
          summary: string | null
          unit_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          images?: Json | null
          inspection_data?: Json | null
          inspector?: string | null
          issues_found?: Json | null
          month: string
          owner_notified_at?: string | null
          summary?: string | null
          unit_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          images?: Json | null
          inspection_data?: Json | null
          inspector?: string | null
          issues_found?: Json | null
          month?: string
          owner_notified_at?: string | null
          summary?: string | null
          unit_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nila_maintenance_reports_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "nila_units"
            referencedColumns: ["id"]
          },
        ]
      }
      nila_maintenance_tasks: {
        Row: {
          assigned_to: string | null
          category: string | null
          completed_at: string | null
          cost: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          images: Json | null
          notes: string | null
          priority: string | null
          property_id: string | null
          scheduled_date: string | null
          status: string | null
          title: string
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          completed_at?: string | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          notes?: string | null
          priority?: string | null
          property_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          title: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          completed_at?: string | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          notes?: string | null
          priority?: string | null
          property_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          title?: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nila_maintenance_tasks_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "nila_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nila_maintenance_tasks_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "nila_units"
            referencedColumns: ["id"]
          },
        ]
      }
      nila_owner_payouts: {
        Row: {
          bookings_data: Json | null
          created_at: string | null
          currency: string | null
          expenses_data: Json | null
          gross_income: number
          id: string
          maintenance_fee: number | null
          management_fee: number | null
          net_payout: number
          notes: string | null
          other_expenses: number | null
          owner_id: string
          paid_at: string | null
          payment_reference: string | null
          period_end: string
          period_start: string
          platform_fees: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          bookings_data?: Json | null
          created_at?: string | null
          currency?: string | null
          expenses_data?: Json | null
          gross_income?: number
          id?: string
          maintenance_fee?: number | null
          management_fee?: number | null
          net_payout?: number
          notes?: string | null
          other_expenses?: number | null
          owner_id: string
          paid_at?: string | null
          payment_reference?: string | null
          period_end: string
          period_start: string
          platform_fees?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          bookings_data?: Json | null
          created_at?: string | null
          currency?: string | null
          expenses_data?: Json | null
          gross_income?: number
          id?: string
          maintenance_fee?: number | null
          management_fee?: number | null
          net_payout?: number
          notes?: string | null
          other_expenses?: number | null
          owner_id?: string
          paid_at?: string | null
          payment_reference?: string | null
          period_end?: string
          period_start?: string
          platform_fees?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nila_owner_payouts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "nila_owners"
            referencedColumns: ["id"]
          },
        ]
      }
      nila_owners: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          nationality: string | null
          notes: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          nationality?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          nationality?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      nila_payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          currency: string | null
          id: string
          method: string | null
          notes: string | null
          paid_at: string | null
          payment_type: string | null
          reference: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          currency?: string | null
          id?: string
          method?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_type?: string | null
          reference?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          method?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_type?: string | null
          reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nila_payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "nila_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      nila_properties: {
        Row: {
          address: string | null
          amenities: Json | null
          city: string
          country: string
          created_at: string | null
          description: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          slug: string
          state: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          amenities?: Json | null
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          slug: string
          state?: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          amenities?: Json | null
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          slug?: string
          state?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      nila_units: {
        Row: {
          amenities: Json | null
          base_nightly_rate: number | null
          bathrooms: number
          bedrooms: number
          cleaning_fee: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          floor: number | null
          id: string
          images: Json | null
          is_active: boolean | null
          is_penthouse: boolean | null
          maintenance_fee_mxn: number | null
          maintenance_tier: string | null
          management_fee_percent: number | null
          max_guests: number | null
          name: string
          owner_id: string | null
          property_id: string | null
          square_meters: number | null
          status: string | null
          unit_number: string | null
          updated_at: string | null
        }
        Insert: {
          amenities?: Json | null
          base_nightly_rate?: number | null
          bathrooms?: number
          bedrooms?: number
          cleaning_fee?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          floor?: number | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_penthouse?: boolean | null
          maintenance_fee_mxn?: number | null
          maintenance_tier?: string | null
          management_fee_percent?: number | null
          max_guests?: number | null
          name: string
          owner_id?: string | null
          property_id?: string | null
          square_meters?: number | null
          status?: string | null
          unit_number?: string | null
          updated_at?: string | null
        }
        Update: {
          amenities?: Json | null
          base_nightly_rate?: number | null
          bathrooms?: number
          bedrooms?: number
          cleaning_fee?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          floor?: number | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_penthouse?: boolean | null
          maintenance_fee_mxn?: number | null
          maintenance_tier?: string | null
          management_fee_percent?: number | null
          max_guests?: number | null
          name?: string
          owner_id?: string | null
          property_id?: string | null
          square_meters?: number | null
          status?: string | null
          unit_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nila_units_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "nila_owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nila_units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "nila_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      os_adventures: {
        Row: {
          budget: number | null
          completed_date: string | null
          country: string | null
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          notes: string | null
          photos: Json | null
          status: string | null
          target_date: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          completed_date?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          photos?: Json | null
          status?: string | null
          target_date?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          completed_date?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          photos?: Json | null
          status?: string | null
          target_date?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      os_anniversaries: {
        Row: {
          created_at: string | null
          date: string
          id: string
          notes: string | null
          recurring: boolean | null
          reminder_days: number | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          recurring?: boolean | null
          reminder_days?: number | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          recurring?: boolean | null
          reminder_days?: number | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      os_business_goals: {
        Row: {
          business_id: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "os_business_goals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "os_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      os_businesses: {
        Row: {
          color: string | null
          created_at: string | null
          emoji: string | null
          id: string
          metrics: Json | null
          mission: string | null
          name: string
          slug: string
          status: string | null
          tagline: string | null
          updated_at: string | null
          vision: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          emoji?: string | null
          id?: string
          metrics?: Json | null
          mission?: string | null
          name: string
          slug: string
          status?: string | null
          tagline?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          emoji?: string | null
          id?: string
          metrics?: Json | null
          mission?: string | null
          name?: string
          slug?: string
          status?: string | null
          tagline?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Relationships: []
      }
      os_contact_interactions: {
        Row: {
          contact_id: string | null
          created_at: string | null
          date: string
          follow_up_date: string | null
          follow_up_needed: boolean | null
          id: string
          notes: string | null
          sentiment: string | null
          summary: string | null
          type: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          date: string
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          notes?: string | null
          sentiment?: string | null
          summary?: string | null
          type: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          date?: string
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          notes?: string | null
          sentiment?: string | null
          summary?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "os_contact_interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "os_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      os_contacts: {
        Row: {
          birthday: string | null
          company: string | null
          contact_frequency: string | null
          created_at: string | null
          email: string | null
          first_met_date: string | null
          gift_ideas: string[] | null
          gifts_given: Json | null
          how_we_met: string | null
          id: string
          last_contact_date: string | null
          name: string
          next_contact_date: string | null
          notes: string | null
          phone: string | null
          photo_url: string | null
          relationship_strength: number | null
          role: string | null
          tags: string[] | null
          type: string
          updated_at: string | null
          what_they_offer: string | null
          what_we_offer: string | null
        }
        Insert: {
          birthday?: string | null
          company?: string | null
          contact_frequency?: string | null
          created_at?: string | null
          email?: string | null
          first_met_date?: string | null
          gift_ideas?: string[] | null
          gifts_given?: Json | null
          how_we_met?: string | null
          id?: string
          last_contact_date?: string | null
          name: string
          next_contact_date?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          relationship_strength?: number | null
          role?: string | null
          tags?: string[] | null
          type: string
          updated_at?: string | null
          what_they_offer?: string | null
          what_we_offer?: string | null
        }
        Update: {
          birthday?: string | null
          company?: string | null
          contact_frequency?: string | null
          created_at?: string | null
          email?: string | null
          first_met_date?: string | null
          gift_ideas?: string[] | null
          gifts_given?: Json | null
          how_we_met?: string | null
          id?: string
          last_contact_date?: string | null
          name?: string
          next_contact_date?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          relationship_strength?: number | null
          role?: string | null
          tags?: string[] | null
          type?: string
          updated_at?: string | null
          what_they_offer?: string | null
          what_we_offer?: string | null
        }
        Relationships: []
      }
      os_countries_visited: {
        Row: {
          country_code: string
          country_name: string
          created_at: string | null
          favorite_memory: string | null
          first_visit: string | null
          id: string
          photos: Json | null
          visit_count: number | null
        }
        Insert: {
          country_code: string
          country_name: string
          created_at?: string | null
          favorite_memory?: string | null
          first_visit?: string | null
          id?: string
          photos?: Json | null
          visit_count?: number | null
        }
        Update: {
          country_code?: string
          country_name?: string
          created_at?: string | null
          favorite_memory?: string | null
          first_visit?: string | null
          id?: string
          photos?: Json | null
          visit_count?: number | null
        }
        Relationships: []
      }
      os_daily_checkins: {
        Row: {
          created_at: string | null
          date: string
          energy: number | null
          friction: string | null
          gratitude: string | null
          id: string
          let_go: string | null
          mood: string | null
          notes: string | null
          tomorrow_priority: string | null
          updated_at: string | null
          win: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          energy?: number | null
          friction?: string | null
          gratitude?: string | null
          id?: string
          let_go?: string | null
          mood?: string | null
          notes?: string | null
          tomorrow_priority?: string | null
          updated_at?: string | null
          win?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          energy?: number | null
          friction?: string | null
          gratitude?: string | null
          id?: string
          let_go?: string | null
          mood?: string | null
          notes?: string | null
          tomorrow_priority?: string | null
          updated_at?: string | null
          win?: string | null
        }
        Relationships: []
      }
      os_goals: {
        Row: {
          completed_at: string | null
          created_at: string | null
          description: string | null
          id: string
          life_area_id: string | null
          month: number | null
          progress: number | null
          quarter: number | null
          status: string | null
          timeframe: string
          title: string
          updated_at: string | null
          year: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          life_area_id?: string | null
          month?: number | null
          progress?: number | null
          quarter?: number | null
          status?: string | null
          timeframe: string
          title: string
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          life_area_id?: string | null
          month?: number | null
          progress?: number | null
          quarter?: number | null
          status?: string | null
          timeframe?: string
          title?: string
          updated_at?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "os_goals_life_area_id_fkey"
            columns: ["life_area_id"]
            isOneToOne: false
            referencedRelation: "os_life_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      os_life_areas: {
        Row: {
          current_state: string | null
          emoji: string | null
          id: string
          name: string
          position: number | null
          target_state: string | null
          updated_at: string | null
        }
        Insert: {
          current_state?: string | null
          emoji?: string | null
          id?: string
          name: string
          position?: number | null
          target_state?: string | null
          updated_at?: string | null
        }
        Update: {
          current_state?: string | null
          emoji?: string | null
          id?: string
          name?: string
          position?: number | null
          target_state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      os_luna_personas: {
        Row: {
          base_personality: string
          created_at: string | null
          domain: string
          evolved_traits: Json | null
          id: string
          is_active: boolean | null
          memory_context: Json | null
          name: string
          snapshots: Json | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          base_personality: string
          created_at?: string | null
          domain: string
          evolved_traits?: Json | null
          id?: string
          is_active?: boolean | null
          memory_context?: Json | null
          name: string
          snapshots?: Json | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          base_personality?: string
          created_at?: string | null
          domain?: string
          evolved_traits?: Json | null
          id?: string
          is_active?: boolean | null
          memory_context?: Json | null
          name?: string
          snapshots?: Json | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      os_partner: {
        Row: {
          anniversary: string | null
          created_at: string | null
          favorite_activities: Json | null
          id: string
          love_languages: Json | null
          name: string
          notes: string | null
          photo_url: string | null
          relationship_start: string | null
          updated_at: string | null
        }
        Insert: {
          anniversary?: string | null
          created_at?: string | null
          favorite_activities?: Json | null
          id?: string
          love_languages?: Json | null
          name: string
          notes?: string | null
          photo_url?: string | null
          relationship_start?: string | null
          updated_at?: string | null
        }
        Update: {
          anniversary?: string | null
          created_at?: string | null
          favorite_activities?: Json | null
          id?: string
          love_languages?: Json | null
          name?: string
          notes?: string | null
          photo_url?: string | null
          relationship_start?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      os_partner_logs: {
        Row: {
          created_at: string | null
          date: string
          description: string | null
          id: string
          location: string | null
          luna_suggested: boolean | null
          mood: string | null
          photos: Json | null
          rating: number | null
          tags: Json | null
          title: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          location?: string | null
          luna_suggested?: boolean | null
          mood?: string | null
          photos?: Json | null
          rating?: number | null
          tags?: Json | null
          title?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          luna_suggested?: boolean | null
          mood?: string | null
          photos?: Json | null
          rating?: number | null
          tags?: Json | null
          title?: string | null
          type?: string
        }
        Relationships: []
      }
      os_profile: {
        Row: {
          blind_spots: string[] | null
          drainers: string[] | null
          energizers: string[] | null
          future_10year: string | null
          future_3year: string | null
          future_5year: string | null
          future_ultimate: string | null
          id: string
          strengths: string[] | null
          updated_at: string | null
          values: string[] | null
        }
        Insert: {
          blind_spots?: string[] | null
          drainers?: string[] | null
          energizers?: string[] | null
          future_10year?: string | null
          future_3year?: string | null
          future_5year?: string | null
          future_ultimate?: string | null
          id?: string
          strengths?: string[] | null
          updated_at?: string | null
          values?: string[] | null
        }
        Update: {
          blind_spots?: string[] | null
          drainers?: string[] | null
          energizers?: string[] | null
          future_10year?: string | null
          future_3year?: string | null
          future_5year?: string | null
          future_ultimate?: string | null
          id?: string
          strengths?: string[] | null
          updated_at?: string | null
          values?: string[] | null
        }
        Relationships: []
      }
      os_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      os_todos: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          done: boolean | null
          done_at: string | null
          due_date: string | null
          id: string
          position: number | null
          priority: string | null
          recurring: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          done?: boolean | null
          done_at?: string | null
          due_date?: string | null
          id?: string
          position?: number | null
          priority?: string | null
          recurring?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          done?: boolean | null
          done_at?: string | null
          due_date?: string | null
          id?: string
          position?: number | null
          priority?: string | null
          recurring?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          created_at: string
          id: string
          labels: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number | null
          timestamp: string
        }
        Insert: {
          created_at?: string
          id?: string
          labels?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value?: number | null
          timestamp?: string
        }
        Update: {
          created_at?: string
          id?: string
          labels?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number | null
          timestamp?: string
        }
        Relationships: []
      }
      scheduled_responses: {
        Row: {
          ai_reasoning: string | null
          confidence_score: number | null
          contact_id: string | null
          contact_name: string
          created_at: string | null
          created_by: string | null
          draft_response: string
          energy_impact: number | null
          id: string
          message_content: string
          notification_sent: boolean | null
          original_message: string | null
          scheduled_time: string
          scheduling_reason: string | null
          sent_at: string | null
          status: string | null
          success_probability: number | null
          timing_strategy: string | null
        }
        Insert: {
          ai_reasoning?: string | null
          confidence_score?: number | null
          contact_id?: string | null
          contact_name: string
          created_at?: string | null
          created_by?: string | null
          draft_response: string
          energy_impact?: number | null
          id?: string
          message_content: string
          notification_sent?: boolean | null
          original_message?: string | null
          scheduled_time: string
          scheduling_reason?: string | null
          sent_at?: string | null
          status?: string | null
          success_probability?: number | null
          timing_strategy?: string | null
        }
        Update: {
          ai_reasoning?: string | null
          confidence_score?: number | null
          contact_id?: string | null
          contact_name?: string
          created_at?: string | null
          created_by?: string | null
          draft_response?: string
          energy_impact?: number | null
          id?: string
          message_content?: string
          notification_sent?: boolean | null
          original_message?: string | null
          scheduled_time?: string
          scheduling_reason?: string | null
          sent_at?: string | null
          status?: string | null
          success_probability?: number | null
          timing_strategy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_responses_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_backups: {
        Row: {
          backup_data: Json
          backup_key: string
          backup_type: string | null
          checksum: string | null
          created_at: string
          expires_at: string | null
          file_size: number | null
          id: string
          source: string
        }
        Insert: {
          backup_data: Json
          backup_key: string
          backup_type?: string | null
          checksum?: string | null
          created_at?: string
          expires_at?: string | null
          file_size?: number | null
          id?: string
          source?: string
        }
        Update: {
          backup_data?: Json
          backup_key?: string
          backup_type?: string | null
          checksum?: string | null
          created_at?: string
          expires_at?: string | null
          file_size?: number | null
          id?: string
          source?: string
        }
        Relationships: []
      }
      summaries: {
        Row: {
          avg_response_time: number | null
          emotional_tags: Json | null
          id: string
          notes: string | null
          summary_date: string
          top_contacts: Json | null
          total_ai_replies: number | null
          total_messages: number | null
        }
        Insert: {
          avg_response_time?: number | null
          emotional_tags?: Json | null
          id?: string
          notes?: string | null
          summary_date: string
          top_contacts?: Json | null
          total_ai_replies?: number | null
          total_messages?: number | null
        }
        Update: {
          avg_response_time?: number | null
          emotional_tags?: Json | null
          id?: string
          notes?: string | null
          summary_date?: string
          top_contacts?: Json | null
          total_ai_replies?: number | null
          total_messages?: number | null
        }
        Relationships: []
      }
      system_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          severity: string | null
          source: string
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          severity?: string | null
          source?: string
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          severity?: string | null
          source?: string
        }
        Relationships: []
      }
      upload_sessions: {
        Row: {
          contact_id: string | null
          created_at: string | null
          file_hash: string
          file_name: string
          id: string
          messages_processed: number | null
          results: Json | null
          status: string | null
          upload_date: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          file_hash: string
          file_name: string
          id?: string
          messages_processed?: number | null
          results?: Json | null
          status?: string | null
          upload_date?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          file_hash?: string
          file_name?: string
          id?: string
          messages_processed?: number | null
          results?: Json | null
          status?: string | null
          upload_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "upload_sessions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_sessions: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_used: string | null
          linked: boolean | null
          session_data: Json
          session_key: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          linked?: boolean | null
          session_data: Json
          session_key: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          linked?: boolean | null
          session_data?: Json
          session_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_assign_contact_tier: {
        Args: { contact_id_param: string }
        Returns: string
      }
      cleanup_old_health_logs: { Args: never; Returns: undefined }
      cleanup_old_sessions: { Args: never; Returns: undefined }
      get_brain_metrics: {
        Args: never
        Returns: {
          active_memories: number
          confidence_avg: number
          mirror_profiles: number
          relationship_depth: number
          total_contacts: number
          total_messages: number
        }[]
      }
      get_luna_status_batch: { Args: never; Returns: Json }
      get_ready_responses: {
        Args: never
        Returns: {
          contact_id: string
          contact_name: string
          contact_phone: string
          draft_response: string
          energy_impact: number
          id: string
          message_content: string
          minutes_overdue: number
          scheduled_time: string
          success_probability: number
          timing_strategy: string
        }[]
      }
      get_sidebar_stats: { Args: never; Returns: Json }
      get_system_health_summary: {
        Args: { hours_back?: number }
        Returns: Json
      }
      increment_usage_count: {
        Args: { trigger_type: string }
        Returns: undefined
      }
      insert_message_with_draft: {
        Args: {
          p_content: string
          p_from_phone: string
          p_from_wa_id: string
          p_message_id?: string
          p_timestamp?: string
        }
        Returns: Json
      }
      link_messages_to_contacts: { Args: never; Returns: undefined }
      mark_response_sent: { Args: { response_id: string }; Returns: undefined }
      update_contact_energy: {
        Args: { contact_id: string; energy_cost: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
