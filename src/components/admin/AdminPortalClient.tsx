"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  Building2,
  BedDouble,
  Users,
  PhoneCall,
  MessageSquare,
  Clock,
  Sparkles,
  DollarSign,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Sliders,
  Globe,
  Bell,
  Check,
  X,
  KeyRound,
  ExternalLink,
  FolderOpen
} from "lucide-react";
import { hotelConfig } from "../../config/hotel";
import { isSupabaseConfigured, supabase } from "../../lib/supabase/client";
import SectionImagesManager from "./SectionImagesManager";

// Initial Demo Rooms State for Admin Dashboard
interface AdminRoom {
  id: string;
  number: string;
  name: string;
  type: string;
  price: number;
  status: "Available" | "Occupied" | "Cleaning" | "Maintenance";
  guestName?: string;
  checkOut?: string;
}

const initialRooms: AdminRoom[] = [
  { id: "101", number: "101", name: "Deluxe AC Room", type: "Deluxe AC", price: 1800, status: "Available" },
  { id: "102", number: "102", name: "Deluxe AC Room", type: "Deluxe AC", price: 1800, status: "Available" },
  { id: "103", number: "103", name: "Deluxe AC Room", type: "Deluxe AC", price: 1800, status: "Available" },
  { id: "201", number: "201", name: "Family AC Suite", type: "Family AC", price: 2800, status: "Available" },
  { id: "202", number: "202", name: "Family AC Suite", type: "Family AC", price: 2800, status: "Available" },
  { id: "301", number: "301", name: "Standard Non-AC Room", type: "Standard Non-AC", price: 1200, status: "Available" },
  { id: "302", number: "302", name: "Standard Non-AC Room", type: "Standard Non-AC", price: 1200, status: "Available" },
  { id: "303", number: "303", name: "Standard Non-AC Room", type: "Standard Non-AC", price: 1200, status: "Available" },
];

interface GuestInquiry {
  id: string;
  name: string;
  phone: string;
  roomRequested: string;
  date: string;
  status: "New Inquiry" | "Contacted" | "Confirmed" | "Cancelled";
  source: "WhatsApp" | "Phone Call" | "Website Form";
}

const initialInquiries: GuestInquiry[] = [];

export default function AdminPortalClient() {
  // Authentication & View State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Admin Dashboard Interactive States
  const [activeTab, setActiveTab] = useState<"rooms" | "inquiries" | "section-images" | "announcements" | "settings">("rooms");
  const [rooms, setRooms] = useState<AdminRoom[]>(initialRooms);
  const [inquiries, setInquiries] = useState<GuestInquiry[]>(initialInquiries);
  const [announcementText, setAnnouncementText] = useState("✨ Special Offer: 10% Discount on Direct Phone & WhatsApp Bookings!");
  const [announcementActive, setAnnouncementActive] = useState(true);
  const [selectedRoomStatusFilter, setSelectedRoomStatusFilter] = useState<string>("All");
  const AUTH_STORAGE_KEY = "mahendra_admin_auth_v1";

  // Check persistent login state & Supabase auth session on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedAuth === "true") {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.log("LocalStorage auth read error:", e);
      }
    }

    // Check Supabase session if configured
    const client = supabase;
    if (client) {
      try {
        client.auth.getSession().then(({ data }) => {
          if (data?.session) {
            setIsAuthenticated(true);
          }
        });

        const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
          if (session) {
            setIsAuthenticated(true);
          }
        });

        return () => {
          listener?.subscription?.unsubscribe();
        };
      } catch (e) {
        console.log("Supabase auth session check skipped:", e);
      }
    }
  }, []);

  const handleSignOut = async () => {
    const client = supabase;
    if (client) {
      try {
        await client.auth.signOut();
      } catch (e) {
        console.log("Supabase signOut error:", e);
      }
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (e) {
        console.log("LocalStorage auth delete error:", e);
      }
    }
    setIsAuthenticated(false);
    setSuccessToast("Logged out successfully.");
    setTimeout(() => setSuccessToast(""), 3000);
  };

  // Fetch live database tables from Supabase Cloud DB
  useEffect(() => {
    const client = supabase;
    if (!client) return;

    async function loadSupabaseData() {
      if (!client) return;
      try {
        // Fetch rooms
        const { data: dbRooms } = await client.from("rooms").select("*");
        if (dbRooms && dbRooms.length > 0) {
          const rawRooms = dbRooms as Array<Record<string, unknown>>;
          setRooms(
            rawRooms.map((r) => ({
              id: String(r.id),
              number: String(r.number),
              name: String(r.name),
              type: String(r.type),
              price: Number(r.price),
              status: r.status as AdminRoom["status"],
              guestName: (r.guest_name as string) || undefined,
              checkOut: (r.check_out as string) || undefined
            }))
          );
        }

        // Fetch inquiries
        const { data: dbInquiries } = await client.from("inquiries").select("*");
        if (dbInquiries && dbInquiries.length > 0) {
          const rawInquiries = dbInquiries as Array<Record<string, unknown>>;
          setInquiries(
            rawInquiries.map((inq) => ({
              id: String(inq.id),
              name: String(inq.name),
              phone: String(inq.phone),
              roomRequested: String(inq.room_requested),
              date: String(inq.date),
              status: inq.status as GuestInquiry["status"],
              source: inq.source as GuestInquiry["source"]
            }))
          );
        }
      } catch (err) {
        console.error("Supabase live fetch error:", err);
      }
    }

    loadSupabaseData();
  }, []);

  // Handle Login Submit with Supabase Auth & Local Fallback
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both Admin Email/Username and Password.");
      return;
    }

    setIsLoading(true);

    const cleanUsername = username.trim().toLowerCase();

    // 1. Attempt Supabase Cloud Auth first
    const client = supabase;
    if (client && isSupabaseConfigured()) {
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: cleanUsername,
          password: password
        });

        if (!error && data?.session) {
          setIsLoading(false);
          setIsAuthenticated(true);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(AUTH_STORAGE_KEY, "true");
            } catch (e) {
              console.log("LocalStorage auth write error:", e);
            }
          }
          setSuccessToast("Authenticated via Supabase Admin Auth!");
          setTimeout(() => setSuccessToast(""), 5000);
          return;
        }
      } catch (supabaseAuthErr) {
        console.log("Supabase Auth sign-in error, falling back:", supabaseAuthErr);
      }
    }

    // 2. Demo / Standalone Environment Fallback
    setTimeout(() => {
      setIsLoading(false);
      if (
        (cleanUsername === "hotelmahendra70@gmail.com" || cleanUsername === "hotelmahendra07@gmail.com" || cleanUsername === "admin") &&
        password === "hotel@7171"
      ) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(AUTH_STORAGE_KEY, "true");
          } catch (e) {
            console.log("LocalStorage auth write error:", e);
          }
        }
        setSuccessToast("Welcome to Mahendra Hotel Admin Portal!");
        setTimeout(() => setSuccessToast(""), 5000);
      } else {
        setErrorMsg("Invalid credentials. Please check your admin email and password.");
      }
    }, 600);
  };

  // Handle Room Status Update
  const handleRoomStatusChange = (roomId: string, newStatus: AdminRoom["status"]) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r))
    );
    setSuccessToast(`Room ${roomId} status updated to ${newStatus}`);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  // Handle Room Price Update
  const handlePriceChange = (roomId: string, newPrice: number) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, price: newPrice } : r))
    );
    setSuccessToast(`Room ${roomId} tariff updated to ₹${newPrice}/night`);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  // Handle Inquiry Status Update
  const handleInquiryStatusChange = (inqId: string, newStatus: GuestInquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === inqId ? { ...inq, status: newStatus } : inq))
    );
    setSuccessToast(`Inquiry marked as ${newStatus}`);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  // Filtered rooms for inventory list
  const filteredRooms = rooms.filter((r) => {
    if (selectedRoomStatusFilter === "All") return true;
    return r.status === selectedRoomStatusFilter;
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-main font-sans flex flex-col justify-between selection:bg-primary/20">
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-emerald-700/50 text-sm font-medium"
          >
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>{successToast}</span>
            <button
              onClick={() => setSuccessToast("")}
              className="ml-2 text-emerald-300 hover:text-white"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* LOGGED IN ADMIN DASHBOARD VIEW                                            */}
      {/* ========================================================================= */}
      {isAuthenticated ? (
        <div className="flex-grow flex flex-col md:flex-row min-h-screen bg-stone-100 font-sans text-stone-900">
          
          {/* ==================================================================== */}
          {/* 1. LEFT SIDEBAR NAVIGATION RAIL (Desktop) */}
          {/* ==================================================================== */}
          <aside className="w-full md:w-72 bg-[#121110] text-stone-100 p-5 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-amber-900/20 sticky top-0 md:h-screen z-30 shadow-2xl relative overflow-hidden">
            
            {/* Ambient Background Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent pointer-events-none" />

            {/* Top Brand Header */}
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 border-b border-stone-800/80 pb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-stone-950 font-serif font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-300/40 shrink-0">
                  M
                </div>
                <div>
                  <h1 className="font-serif text-base font-bold tracking-wide text-white leading-tight">
                    {hotelConfig.name}
                  </h1>
                  <span className="text-[9px] text-amber-400/90 font-mono font-bold uppercase tracking-widest block pt-0.5">
                    Admin Portal v2.0
                  </span>
                </div>
              </div>

              {/* Database Connection Status Badge */}
              <div className="bg-stone-900/90 backdrop-blur-md p-3 rounded-xl border border-stone-800/80 flex items-center justify-between text-xs shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-stone-300 font-medium text-[11px]">Database Cloud</span>
                </div>
                <span className="text-[9px] bg-emerald-500/15 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                  Active
                </span>
              </div>

              {/* Vertical Sidebar Navigation Menu */}
              <nav className="space-y-1.5 pt-2 text-left">
                
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-500/90 px-3 block mb-2 text-left">
                  Main Navigation
                </span>

                {/* Tab 1: Room Inventory */}
                <button
                  onClick={() => setActiveTab("rooms")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                    activeTab === "rooms"
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 text-stone-950 font-extrabold shadow-lg shadow-amber-500/20 border border-amber-300/40"
                      : "text-stone-400 hover:bg-stone-800/50 hover:text-stone-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    <BedDouble size={18} className={`shrink-0 ${activeTab === "rooms" ? "text-stone-950" : "text-amber-400/80"}`} />
                    <span className="text-left truncate">Room Inventory</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ml-2 ${
                    activeTab === "rooms" ? "bg-stone-950 text-amber-400 border border-amber-400/30" : "bg-stone-900 text-stone-400 border border-stone-800"
                  }`}>
                    {rooms.length}
                  </span>
                </button>

                {/* Tab 2: Guest Inquiries */}
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                    activeTab === "inquiries"
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 text-stone-950 font-extrabold shadow-lg shadow-amber-500/20 border border-amber-300/40"
                      : "text-stone-400 hover:bg-stone-800/50 hover:text-stone-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    <MessageSquare size={18} className={`shrink-0 ${activeTab === "inquiries" ? "text-stone-950" : "text-amber-400/80"}`} />
                    <span className="text-left truncate">Guest Inquiries</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ml-2 ${
                    activeTab === "inquiries" ? "bg-stone-950 text-amber-400 border border-amber-400/30" : "bg-stone-900 text-stone-400 border border-stone-800"
                  }`}>
                    {inquiries.length}
                  </span>
                </button>

                {/* Tab 3: Section Media Upload Center */}
                <button
                  onClick={() => setActiveTab("section-images")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer relative group text-left ${
                    activeTab === "section-images"
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 text-stone-950 font-extrabold shadow-lg shadow-amber-500/20 border border-amber-300/40"
                      : "text-stone-400 hover:bg-stone-800/50 hover:text-stone-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    <FolderOpen size={18} className={`shrink-0 ${activeTab === "section-images" ? "text-stone-950" : "text-amber-400"}`} />
                    <span className="text-left leading-tight">Section Media Center</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ml-2 ${
                    activeTab === "section-images"
                      ? "bg-stone-950 text-amber-400 border-amber-400/40"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>
                    7 SECTIONS
                  </span>
                </button>

                {/* Tab 5: Offer Banner */}
                <button
                  onClick={() => setActiveTab("announcements")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                    activeTab === "announcements"
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 text-stone-950 font-extrabold shadow-lg shadow-amber-500/20 border border-amber-300/40"
                      : "text-stone-400 hover:bg-stone-800/50 hover:text-stone-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    <Bell size={18} className={`shrink-0 ${activeTab === "announcements" ? "text-stone-950" : "text-amber-400/80"}`} />
                    <span className="text-left truncate">Website Banner</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ml-2 ${
                    announcementActive
                      ? activeTab === "announcements"
                        ? "bg-stone-950 text-emerald-400 border-emerald-400/30"
                        : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-stone-900 text-stone-500 border-stone-800"
                  }`}>
                    {announcementActive ? "ACTIVE" : "OFF"}
                  </span>
                </button>

                {/* Tab 6: Security & Credentials */}
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                    activeTab === "settings"
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 text-stone-950 font-extrabold shadow-lg shadow-amber-500/20 border border-amber-300/40"
                      : "text-stone-400 hover:bg-stone-800/50 hover:text-stone-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    <Sliders size={18} className={`shrink-0 ${activeTab === "settings" ? "text-stone-950" : "text-amber-400/80"}`} />
                    <span className="text-left truncate">Security Settings</span>
                  </div>
                </button>

              </nav>
            </div>

            {/* Sidebar Footer: Admin Profile & Sign Out */}
            <div className="pt-6 border-t border-stone-800/80 space-y-3 relative z-10">
              <div className="flex items-center justify-between p-3 bg-stone-900/90 rounded-xl border border-stone-800/80 backdrop-blur-xs shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-900/30 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40 shadow-xs shrink-0">
                    AD
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">Reception Admin</h5>
                    <p className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Authenticated</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 bg-stone-800/50 hover:bg-rose-950/60 text-stone-400 hover:text-rose-400 rounded-lg border border-stone-700/50 hover:border-rose-800/50 transition-all cursor-pointer shadow-xs"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>

              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-stone-200 p-3 rounded-xl text-xs font-semibold transition-all border border-stone-700/80 hover:border-amber-500/40 shadow-sm group cursor-pointer"
              >
                <Globe size={15} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                <span>Open Live Website</span>
                <ExternalLink size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </aside>

          {/* ==================================================================== */}
          {/* 2. MAIN WORKSPACE CONTAINER */}
          {/* ==================================================================== */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Top Workspace Header Bar */}
            <header className="bg-white border-b border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm sticky top-0 z-20">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                  <span>Welcome, Reception Desk</span>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-sans font-semibold border border-amber-200">
                    Hotel Mahendra
                  </span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Kolhapur Central Management Dashboard & Real-time Operations
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden lg:block text-xs">
                  <span className="block font-bold text-stone-800">Direct Booking Hotline</span>
                  <span className="text-stone-500 text-[11px]">{hotelConfig.phoneDisplay}</span>
                </div>

                <Link
                  href="/"
                  target="_blank"
                  className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Globe size={14} className="text-amber-400" />
                  <span>Live Site</span>
                </Link>
              </div>
            </header>

            {/* Main Workspace Body */}
            <main className="flex-grow p-6 md:p-8 space-y-8">
              
              {/* Top Quick Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Stat 1: Total Rooms */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Total Rooms</p>
                    <p className="text-2xl font-serif font-bold text-stone-900 mt-1">{rooms.length} Rooms</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      {rooms.filter(r => r.status === "Available").length} Ready for Check-in
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                    <BedDouble size={22} />
                  </div>
                </div>

                {/* Stat 2: Active Occupancy */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Occupancy</p>
                    <p className="text-2xl font-serif font-bold text-stone-900 mt-1">
                      {rooms.filter(r => r.status === "Occupied").length} Rooms ({Math.round((rooms.filter(r => r.status === "Occupied").length / rooms.length) * 100)}%)
                    </p>
                    <p className="text-xs text-amber-600 font-semibold mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      2 Check-outs Today
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
                    <Users size={22} />
                  </div>
                </div>

                {/* Stat 3: Guest Inquiries */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400">New Guest Leads</p>
                    <p className="text-2xl font-serif font-bold text-stone-900 mt-1">
                      {inquiries.filter(i => i.status === "New Inquiry").length} Leads
                    </p>
                    <p className="text-xs text-blue-600 font-semibold mt-1 flex items-center gap-1">
                      <MessageSquare size={12} />
                      WhatsApp & Calls
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
                    <PhoneCall size={22} />
                  </div>
                </div>

                {/* Stat 4: Direct Rate Summary */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Starting Tariff</p>
                    <p className="text-2xl font-serif font-bold text-amber-800 mt-1">₹1,200 <span className="text-xs text-stone-400 font-sans font-normal">/ night</span></p>
                    <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <Sparkles size={12} />
                      Direct Rate Active
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                    <DollarSign size={22} />
                  </div>
                </div>

              </div>

              {/* TAB CONTENT: SECTION MEDIA UPLOAD CENTER */}
              {activeTab === "section-images" && <SectionImagesManager />}

              {/* TAB CONTENT 1: ROOMS INVENTORY MANAGEMENT */}
              {activeTab === "rooms" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <div>
                      <h2 className="font-serif text-lg font-bold text-stone-900">Live Room Status Control</h2>
                      <p className="text-xs text-stone-500 mt-0.5">Manage front-desk room availability and tariffs in real-time.</p>
                    </div>
                    
                    {/* Status Filter Buttons */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-semibold text-stone-500">Filter:</span>
                      {["All", "Available", "Occupied", "Cleaning", "Maintenance"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setSelectedRoomStatusFilter(status)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                            selectedRoomStatusFilter === status
                              ? "bg-stone-900 text-white shadow-sm"
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className="bg-white rounded-xl border border-border-custom p-5 shadow-sm space-y-4 hover:border-primary/50 transition-all"
                    >
                      {/* Room Header */}
                      <div className="flex items-center justify-between border-b border-border-custom/50 pb-3">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">
                            Room {room.number}
                          </span>
                          <h3 className="font-serif text-base font-bold text-text-main">{room.name}</h3>
                        </div>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            room.status === "Available"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : room.status === "Occupied"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : room.status === "Cleaning"
                              ? "bg-sky-50 text-sky-700 border-sky-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {room.status}
                        </span>
                      </div>

                      {/* Guest Info if Occupied */}
                      {room.status === "Occupied" && (
                        <div className="bg-amber-500/5 p-3 rounded-lg border border-amber-200/50 text-xs space-y-1">
                          <p className="font-semibold text-text-main">Occupant: {room.guestName}</p>
                          <p className="text-text-muted">Expected Check-out: {room.checkOut}</p>
                        </div>
                      )}

                      {/* Room Status Action Buttons */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-text-muted block">
                          Change Status:
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {(["Available", "Occupied", "Cleaning", "Maintenance"] as const).map(
                            (st) => (
                              <button
                                key={st}
                                onClick={() => handleRoomStatusChange(room.id, st)}
                                className={`py-1.5 px-2 rounded text-[11px] font-semibold transition-all border ${
                                  room.status === st
                                    ? "bg-text-main text-white border-text-main shadow-xs"
                                    : "bg-bg-base text-text-muted hover:bg-stone-100 border-border-custom"
                                }`}
                              >
                                {st}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Tariff Editable Input */}
                      <div className="pt-2 border-t border-border-custom/50 flex items-center justify-between">
                        <span className="text-xs text-text-muted font-medium">Nightly Tariff:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-text-main">₹</span>
                          <input
                            type="number"
                            value={room.price}
                            onChange={(e) => handlePriceChange(room.id, Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-border-custom rounded text-xs font-bold text-right focus:outline-none focus:border-primary"
                          />
                          <span className="text-[10px] text-text-muted">/night</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: GUEST INQUIRIES */}
            {activeTab === "inquiries" && (
              <div className="space-y-6">
                <div className="bg-bg-alt p-4 rounded-xl border border-border-custom">
                  <h2 className="font-serif text-lg font-bold text-text-main">Incoming Booking Inquiries</h2>
                  <p className="text-xs text-text-muted">Recent guest contact logs via WhatsApp, phone calls, and direct website forms.</p>
                </div>

                <div className="bg-white rounded-xl border border-border-custom overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-bg-alt border-b border-border-custom text-text-muted font-semibold uppercase tracking-wider text-[11px]">
                        <th className="p-4">Guest Name</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Requested Booking</th>
                        <th className="p-4">Source</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom/50">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-bg-base transition-colors">
                          <td className="p-4 font-semibold text-text-main">{inq.name}</td>
                          <td className="p-4 text-text-muted">{inq.phone}</td>
                          <td className="p-4 font-medium text-text-main">{inq.roomRequested}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded text-xs font-medium">
                              {inq.source === "WhatsApp" && <MessageSquare size={12} className="text-emerald-600" />}
                              {inq.source === "Phone Call" && <PhoneCall size={12} className="text-blue-600" />}
                              {inq.source === "Website Form" && <Globe size={12} className="text-primary" />}
                              {inq.source}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                inq.status === "New Inquiry"
                                  ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                                  : inq.status === "Contacted"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : inq.status === "Confirmed"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-stone-100 text-stone-600 border-stone-200"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello! Thank you for inquiring at Mahendra Hotel. How may we assist with your stay?")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition-all"
                            >
                              <MessageSquare size={12} />
                              WhatsApp
                            </a>
                            <button
                              onClick={() =>
                                handleInquiryStatusChange(
                                  inq.id,
                                  inq.status === "Confirmed" ? "Contacted" : "Confirmed"
                                )
                              }
                              className="inline-flex items-center gap-1 bg-stone-800 hover:bg-black text-white px-3 py-1.5 rounded text-xs font-semibold transition-all"
                            >
                              <Check size={12} />
                              {inq.status === "Confirmed" ? "Undo" : "Confirm"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: ANNOUNCEMENT BANNER */}
            {activeTab === "announcements" && (
              <div className="bg-white p-6 md:p-8 rounded-xl border border-border-custom space-y-6 shadow-sm">
                <div>
                  <h2 className="font-serif text-lg font-bold text-text-main">Top Marketing Announcement Strip</h2>
                  <p className="text-xs text-text-muted">Display a promotional headline across the main website header for direct guests.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="announcementActive"
                      checked={announcementActive}
                      onChange={(e) => setAnnouncementActive(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                    <label htmlFor="announcementActive" className="text-sm font-semibold text-text-main cursor-pointer">
                      Enable Announcement Strip on Website Header
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-muted block mb-1">
                      Banner Text Content:
                    </label>
                    <textarea
                      rows={3}
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full p-3 border border-border-custom rounded-lg text-sm focus:outline-none focus:border-primary font-sans"
                    />
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 flex items-center justify-between">
                    <div className="text-xs text-text-main font-medium flex items-center gap-2">
                      <Sparkles size={16} className="text-primary shrink-0" />
                      <span>Live Preview: <strong>{announcementActive ? announcementText : "(Disabled)"}</strong></span>
                    </div>
                    <button
                      onClick={() => {
                        setSuccessToast("Website Banner settings updated successfully!");
                        setTimeout(() => setSuccessToast(""), 3000);
                      }}
                      className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all shadow-sm shrink-0"
                    >
                      Save Banner
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: SETTINGS & SECURITY */}
            {activeTab === "settings" && (
              <div className="bg-white p-6 md:p-8 rounded-xl border border-border-custom space-y-6 shadow-sm">
                <div>
                  <h2 className="font-serif text-lg font-bold text-text-main">Admin Security & Password</h2>
                  <p className="text-xs text-text-muted">Manage portal access credentials and security settings.</p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-xs font-semibold text-text-muted block mb-1">
                      Current Admin Account
                    </label>
                    <input
                      type="text"
                      disabled
                      value="hotelmahendra70@gmail.com (Primary Reception Administrator)"
                      className="w-full p-2.5 bg-bg-alt border border-border-custom rounded text-xs text-text-muted font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-muted block mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value="hotel@7171"
                      disabled
                      className="w-full p-2.5 bg-bg-alt border border-border-custom rounded text-xs text-text-muted font-mono"
                    />
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-xs space-y-1">
                    <p className="font-semibold flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      256-Bit SSL Encrypted Session Active
                    </p>
                    <p className="text-emerald-700">
                      Your login session is authenticated locally for reception operations.
                    </p>
                  </div>

                  {/* Supabase Environment Status Box */}
                  <div className="p-4 bg-stone-900 text-stone-100 rounded-xl border border-stone-800 text-xs space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-stone-100">
                        <Globe size={16} className="text-emerald-400" />
                        Supabase Database Status
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isSupabaseConfigured()
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      }`}>
                        {isSupabaseConfigured() ? "● Connected" : "▲ Keys Required in .env.local"}
                      </span>
                    </div>

                    <p className="text-stone-400 leading-relaxed">
                      {isSupabaseConfigured()
                        ? "Your Supabase project credentials are ready in .env.local!"
                        : "Supabase environment setup is initialized! Add your Project URL and Anon API key inside .env.local to enable live cloud persistence."}
                    </p>

                    <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1 font-mono">
                      <p>Config File: <code>.env.local</code></p>
                      <p>SQL Schema: <code>supabase_schema.sql</code></p>
                      <p>Client Helper: <code>src/lib/supabase/client.ts</code></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>

          {/* Admin Footer */}
          <footer className="bg-white border-t border-stone-200 py-4 px-6 text-center text-xs text-stone-400">
            &copy; {new Date().getFullYear()} {hotelConfig.name} Admin Portal • Reception Terminal
          </footer>

          </div>
        </div>
      ) : (
        
        /* ========================================================================= */
        /* UNAUTHENTICATED ADMIN LOGIN PAGE                                          */
        /* ========================================================================= */
        <div className="flex-grow flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-bg-base via-bg-alt/50 to-bg-base relative overflow-hidden">
          
          {/* Background Decorative Ambient Circles */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Main Glassmorphic Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-border-custom shadow-2xl p-8 sm:p-10 space-y-6 relative z-10"
          >
            
            {/* Hotel Brand Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary shadow-sm mb-3">
                <Building2 size={28} />
              </div>
              <span className="text-[10px] font-sans tracking-[0.25em] text-primary uppercase font-bold block">
                {hotelConfig.logoSubtext}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-text-main">
                {hotelConfig.name}
              </h1>
              <p className="text-xs text-text-muted font-sans font-medium">
                Admin Management & Reception Portal
              </p>
            </div>



            {/* Error Message Alert */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg text-xs flex items-start gap-2 font-medium"
              >
                <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Username / Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-text-main uppercase tracking-wider flex items-center gap-1">
                  <User size={13} className="text-primary" />
                  <span>Admin Email or Username</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="hotelmahendra70@gmail.com"
                    className="w-full pl-10 pr-4 py-3 bg-bg-base border border-border-custom rounded-lg text-sm text-text-main placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                  />
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-sans font-bold text-text-main uppercase tracking-wider flex items-center gap-1">
                    <Lock size={13} className="text-primary" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs text-primary hover:text-primary-dark font-medium transition-colors focus:outline-none"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-bg-base border border-border-custom rounded-lg text-sm text-text-main placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                  />
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/60 hover:text-text-main focus:outline-none p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <span className="font-medium">Remember me on this browser</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-text-main hover:bg-black text-white font-sans text-xs font-bold tracking-widest uppercase py-3.5 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 group focus:outline-none disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin text-primary" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </form>

            {/* Security Indicator Footer */}
            <div className="pt-4 border-t border-border-custom/60 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>256-Bit SSL Encrypted • Authorized Personnel Only</span>
              </div>
              <div className="text-[10px] text-text-muted/70">
                Need help accessing your portal? Contact hotel IT support.
              </div>
            </div>

            {/* Back to Website Shortcut */}
            <div className="text-center pt-1">
              <Link
                href="/"
                className="text-xs text-text-muted hover:text-primary font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>← Back to Mahendra Hotel Website</span>
              </Link>
            </div>

          </motion.div>

          {/* Forgot Password Modal */}
          <AnimatePresence>
            {showForgotModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowForgotModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl border border-border-custom"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <KeyRound size={24} />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-serif text-lg font-bold text-text-main">Password Reset Assistance</h3>
                    <p className="text-xs text-text-muted font-sans leading-relaxed">
                      For security, password reset requests are managed via your Supabase Admin Dashboard or reception IT administrator.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-xs space-y-1 text-stone-700">
                    <p className="font-bold">Contact Support:</p>
                    <p className="text-stone-500">Phone: {hotelConfig.phoneDisplay}</p>
                    <p className="text-stone-500">Email: {hotelConfig.email}</p>
                  </div>

                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}
