import React from "react";
import { Metadata } from "next";
import { hotelConfig } from "../../config/hotel";
import AdminPortalClient from "../../components/admin/AdminPortalClient";

/**
 * ============================================================================
 * ADMIN PORTAL LOGIN PAGE
 * 
 * ROUTE: /admin (http://localhost:3000/admin)
 * 
 * PURPOSE:
 * Provides secure admin authentication and live reception control panel
 * for room inventory, tariff updates, and guest lead inquiries.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: `Admin Portal Login | ${hotelConfig.name}`,
  description: `Management and reception control portal for ${hotelConfig.name} Kolhapur.`
};

export default function AdminPage() {
  return <AdminPortalClient />;
}
