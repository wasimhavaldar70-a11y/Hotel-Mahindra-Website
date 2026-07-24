/**
 * ============================================================================
 * SUPABASE DATABASE TYPES & SCHEMAS
 * 
 * PURPOSE:
 * Provides strongly-typed database interfaces for Supabase tables:
 * - rooms
 * - inquiries
 * - gallery
 * - announcements
 * ============================================================================
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string;
          number: string;
          name: string;
          type: string;
          price: number;
          status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
          guest_name: string | null;
          check_out: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          number: string;
          name: string;
          type: string;
          price: number;
          status?: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
          guest_name?: string | null;
          check_out?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          number?: string;
          name?: string;
          type?: string;
          price?: number;
          status?: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
          guest_name?: string | null;
          check_out?: string | null;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          phone: string;
          room_requested: string;
          date: string;
          status: 'New Inquiry' | 'Contacted' | 'Confirmed' | 'Cancelled';
          source: 'WhatsApp' | 'Phone Call' | 'Website Form';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          room_requested: string;
          date?: string;
          status?: 'New Inquiry' | 'Contacted' | 'Confirmed' | 'Cancelled';
          source?: 'WhatsApp' | 'Phone Call' | 'Website Form';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          room_requested?: string;
          status?: 'New Inquiry' | 'Contacted' | 'Confirmed' | 'Cancelled';
          source?: 'WhatsApp' | 'Phone Call' | 'Website Form';
        };
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          url: string;
          category: 'rooms' | 'exterior' | 'lobby' | 'dining' | 'general';
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          url: string;
          category: 'rooms' | 'exterior' | 'lobby' | 'dining' | 'general';
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          url?: string;
          category?: 'rooms' | 'exterior' | 'lobby' | 'dining' | 'general';
        };
      };
      announcements: {
        Row: {
          id: string;
          message: string;
          is_active: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          message: string;
          is_active?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          message?: string;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      section_images: {
        Row: {
          id: string;
          section_key: 'hero' | 'about' | 'deluxe-ac-room' | 'family-ac-suite' | 'standard-non-ac-room' | 'attractions' | 'gallery';
          url: string;
          title: string;
          description: string | null;
          category: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          section_key: 'hero' | 'about' | 'deluxe-ac-room' | 'family-ac-suite' | 'standard-non-ac-room' | 'attractions' | 'gallery';
          url: string;
          title: string;
          description?: string | null;
          category?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          section_key?: 'hero' | 'about' | 'deluxe-ac-room' | 'family-ac-suite' | 'standard-non-ac-room' | 'attractions' | 'gallery';
          url?: string;
          title?: string;
          description?: string | null;
          category?: string | null;
          sort_order?: number;
        };
      };
    };
  };
}

