# Mahendra Hotel Website (Production Quality)

This is a premium, handcrafted, high-performance marketing website for **Mahendra Hotel** (Kolhapur, Maharashtra). It is designed to represent a "Premium Budget Hotel" using Next.js 15, React 19, TypeScript, TailwindCSS v4, and Framer Motion. 

---

## 📂 Project Architecture

The directory layout is organized as follows:
```
src/
├── app/                  # Routing pages (Home, About, Rooms, Gallery, Attractions, Contact, Legal)
├── components/           # Reusable UI Blocks
│   ├── layout/           # Shared structures (Navbar, Footer)
│   ├── sections/         # Homepage visual grids
│   ├── cards/            # Standard list units (RoomCard, AttractionCard, ReviewCard)
│   └── common/           # Helpers (CTAStrip, CustomImage, Lightbox)
├── config/               # Single-source-of-truth configuration files (hotel details, amenities)
├── data/                 # Static datasets (mock reviews, Unsplash placeholders, rooms, attractions)
├── lib/                  # Helper utilities (cn tailwind-merge helper)
└── types/                # Core TypeScript shapes
```

---

## ⚙️ Maintenance & Configuration Guide

To customize the website copy or coordinates, edit the files listed below:

### 1. Updating General Hotel Details
File: [`src/config/hotel.ts`](file:///c:/Users/JAYASH%20KOLEKAR/OneDrive/Desktop/mahendra%20hotel/src/config/hotel.ts)
*   **Phone & WhatsApp Details**: Adjust `phoneDisplay` and `whatsappDisplay` for visual components. Update `phoneDial` and `whatsappDial` with country-code numbers (without spaces or symbols) to activate link click dialing.
*   **Email & Address**: Modify `email` and `address` parameters.
*   **Location Link**: Replace `googleMapsUrl` with your Google Maps Share/Direction target URL.

### 2. Swapping Images (Production Ready)
File: [`src/data/images.ts`](file:///c:/Users/JAYASH%20KOLEKAR/OneDrive/Desktop/mahendra%20hotel/src/data/images.ts)
*   By default, this site uses curated, high-quality stock photo assets.
*   **PLACEHOLDERS - REPLACE BEFORE PRODUCTION**: Replace the Unsplash URLs inside the `IMAGES` dictionary with your public CDN paths.
*   *Note*: The `next.config.ts` file is pre-configured to allow remote loading of images stored in **Supabase Storage** (`*.supabase.co`).

### 3. Adding or Modifying Rooms
File: [`src/data/rooms.ts`](file:///c:/Users/JAYASH%20KOLEKAR/OneDrive/Desktop/mahendra%20hotel/src/data/rooms.ts)
*   Adding a room creates card slots on the `/rooms` list automatically and pre-compiles individual details routes `/rooms/[slug]`.
*   Maintain the structure: slug, price, size, bed configuration, occupancy, and features list.

### 4. Updating Local Sightseeing Guide
File: [`src/data/attractions.ts`](file:///c:/Users/JAYASH%20KOLEKAR/OneDrive/Desktop/mahendra%20hotel/src/data/attractions.ts)
*   Edit names, descriptions, and Google Maps destination coordinates here.

### 5. Managing Core Services List
File: [`src/config/amenities.ts`](file:///c:/Users/JAYASH%20KOLEKAR/OneDrive/Desktop/mahendra%20hotel/src/config/amenities.ts)
*   Amenities list (Wi-Fi, AC, Parking, CCTV) maps dynamically.
*   The `iconName` parameters correspond to **Lucide Icons**. Simply enter a standard Lucide Icon name (e.g. `Car`, `Wifi`, `Snowflake`) to automatically swap the icon graphic on the UI.

---

## 🛠️ Development & Deployment

### Dependencies Installation
Run the following script inside the root directory to initialize modules:
```powershell
npm install
```

### Local Dev Server
Fire up the local development engine to preview the site locally:
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### Production Compile & Verification
To test build integrity, verify types, and optimize pages before deployment:
```powershell
npm run build
```

---

## 🔒 ERP Routing Boundaries (`/app/*`)
*   **IMPORTANT REQUIREMENT**: The hotel ERP application operates under `/app`.
*   The marketing website is built completely independent of the ERP.
*   **DO NOT** create a folder named `app` inside the Next.js `src/app` directory (the root `app` folder itself holds our marketing routes). This ensures that any route requests matching `/app/*` are bypassed cleanly and delegated to the ERP application namespace.
*   `src/app/robots.ts` has been preconfigured to disallow crawlers from indexing `/app/` URLs to prevent search engine confusion.
