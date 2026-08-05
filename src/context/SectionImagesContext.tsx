"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SectionKey, SectionImageItem } from "../types/sectionImages";
import { IMAGES } from "../data/images";
import { attractionsData } from "../data/attractions";
import { galleryData } from "../data/gallery";
import { supabase } from "../lib/supabase/client";

// Default seed data for each section
const defaultSectionImages: Record<SectionKey, SectionImageItem[]> = {
  hero: [
    {
      id: "hero-1",
      sectionKey: "hero",
      url: IMAGES.hero.mainSlide1,
      title: "Mahendra Hotel Front Facade & Entrance",
      description: "Conveniently located opposite Kolhapur Central Bus Stand",
      sortOrder: 0
    },
    {
      id: "hero-2",
      sectionKey: "hero",
      url: IMAGES.hero.mainSlide2,
      title: "Welcoming Reception Lobby Counter",
      description: "Warm hospitality and 24/7 guest assistance",
      sortOrder: 1
    },
    {
      id: "hero-3",
      sectionKey: "hero",
      url: IMAGES.hero.mainSlide3,
      title: "Deluxe Guest Bedroom Suite",
      description: "Clean, air-conditioned comfortable living spaces",
      sortOrder: 2
    },
    {
      id: "hero-4",
      sectionKey: "hero",
      url: IMAGES.gallery[8] || "/images/gallery/gallery-9.jpg",
      title: "Secured Parking Facility On Premises",
      description: "Guarded safe parking space for cars and bikes",
      sortOrder: 3
    }
  ],
  about: [
    {
      id: "about-1",
      sectionKey: "about",
      url: IMAGES.about.lobbyView,
      title: "Clean Lobby & Seating Lounge",
      description: "Comfortable reception environment for arriving guests",
      sortOrder: 0
    },
    {
      id: "about-2",
      sectionKey: "about",
      url: IMAGES.about.serviceSmile,
      title: "Dedicated Reception Service Staff",
      description: "Friendly service and local Kolhapur travel advice",
      sortOrder: 1
    }
  ],
  "deluxe-ac-room": [
    {
      id: "deluxe-1",
      sectionKey: "deluxe-ac-room",
      url: IMAGES.rooms.deluxeAcMain,
      title: "Deluxe AC Room King Bed Layout",
      description: "Main view featuring luxurious king double bed",
      sortOrder: 0
    },
    {
      id: "deluxe-2",
      sectionKey: "deluxe-ac-room",
      url: IMAGES.rooms.deluxeAcDetail1,
      title: "In-Room Work Desk & Amenities",
      description: "High-speed Wi-Fi and smart LED TV setup",
      sortOrder: 1
    },
    {
      id: "deluxe-3",
      sectionKey: "deluxe-ac-room",
      url: IMAGES.rooms.deluxeAcDetail2,
      title: "Clean Attached Bathroom with 24/7 Hot Water",
      description: "Sanitized bathroom with modern fixtures",
      sortOrder: 2
    }
  ],
  "family-ac-suite": [
    {
      id: "family-1",
      sectionKey: "family-ac-suite",
      url: IMAGES.rooms.familyAcMain,
      title: "Executive Family AC Suite Double King Beds",
      description: "Spacious layout accommodating up to 4 adults",
      sortOrder: 0
    },
    {
      id: "family-2",
      sectionKey: "family-ac-suite",
      url: IMAGES.rooms.familyAcDetail1,
      title: "Family Seating Lounge & Coffee Table",
      description: "Comfortable seating area for relaxation",
      sortOrder: 1
    },
    {
      id: "family-3",
      sectionKey: "family-ac-suite",
      url: IMAGES.rooms.familyAcDetail2,
      title: "Spacious Attached Suite Bathroom",
      description: "Premium bath amenities and continuous hot water",
      sortOrder: 2
    }
  ],
  "standard-non-ac-room": [
    {
      id: "std-1",
      sectionKey: "standard-non-ac-room",
      url: IMAGES.rooms.standardNonAcMain,
      title: "Standard Non-AC Room Bedding Setup",
      description: "Clean queen size bed with high-speed ceiling fan",
      sortOrder: 0
    },
    {
      id: "std-2",
      sectionKey: "standard-non-ac-room",
      url: IMAGES.rooms.standardNonAcDetail1,
      title: "Room Desk & TV Entertainment",
      description: "Affordable and spotless accommodation for transit",
      sortOrder: 1
    },
    {
      id: "std-3",
      sectionKey: "standard-non-ac-room",
      url: IMAGES.rooms.standardNonAcDetail2,
      title: "Attached Private Bathroom",
      description: "Hygiene-first clean private toilet and shower",
      sortOrder: 2
    }
  ],
  attractions: [
    {
      id: "attr-1",
      sectionKey: "attractions",
      url: IMAGES.attractions.mahalaxmiTemple,
      title: "Shri Ambabai Mahalaxmi Temple",
      description: "Historic sacred shrine located 2.5 km from hotel",
      category: "Pilgrimage",
      sortOrder: 0
    },
    {
      id: "attr-2",
      sectionKey: "attractions",
      url: IMAGES.attractions.jyotibaTemple,
      title: "Shri Jyotiba Temple",
      description: "Revered hilltop temple destination 18 km away",
      category: "Pilgrimage",
      sortOrder: 1
    },
    {
      id: "attr-3",
      sectionKey: "attractions",
      url: IMAGES.attractions.panhalaFort,
      title: "Panhala Fort",
      description: "Historic hill fort offering panoramic views 20 km away",
      category: "Heritage",
      sortOrder: 2
    },
    {
      id: "attr-4",
      sectionKey: "attractions",
      url: IMAGES.attractions.rankalaLake,
      title: "Rankala Lake",
      description: "Scenic evening lake promenade 3.5 km away",
      category: "Leisure",
      sortOrder: 3
    },
    {
      id: "attr-5",
      sectionKey: "attractions",
      url: IMAGES.attractions.newPalace,
      title: "New Palace Museum",
      description: "Royal Chhatrapati museum showcasing historic artifacts 3 km away",
      category: "Heritage",
      sortOrder: 4
    }
  ],
  gallery: galleryData.map((g, idx) => ({
    id: g.id || `gal-${idx}`,
    sectionKey: "gallery",
    url: g.url,
    title: g.title,
    category: g.category,
    sortOrder: idx
  }))
};

const STORAGE_KEY = "mahendra_section_images_v1";

interface SectionImagesContextType {
  imagesMap: Record<SectionKey, SectionImageItem[]>;
  getSectionImages: (sectionKey: SectionKey) => SectionImageItem[];
  addSectionImage: (
    sectionKey: SectionKey,
    item: { url: string; title: string; description?: string; category?: string }
  ) => Promise<void>;
  deleteSectionImage: (sectionKey: SectionKey, id: string) => Promise<void>;
  updateSectionImage: (
    sectionKey: SectionKey,
    id: string,
    updates: Partial<Omit<SectionImageItem, "id" | "sectionKey">>
  ) => Promise<void>;
  reorderSectionImages: (sectionKey: SectionKey, newOrderedItems: SectionImageItem[]) => Promise<void>;
  resetSectionToDefaults: (sectionKey: SectionKey) => void;
}

const SectionImagesContext = createContext<SectionImagesContextType | undefined>(undefined);

export function SectionImagesProvider({ children }: { children: React.ReactNode }) {
  const [imagesMap, setImagesMap] = useState<Record<SectionKey, SectionImageItem[]>>(defaultSectionImages);

  // Initialize from LocalStorage and Supabase DB
  useEffect(() => {
    // 1. Try loading from LocalStorage first for instant offline state
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          // Ensure attractions is capped strictly to 5 photos
          if (parsed?.attractions && Array.isArray(parsed.attractions)) {
            parsed.attractions = parsed.attractions.slice(0, 5);
          }
          // Filter out deprecated resort pool image from about section if cached in localStorage
          if (parsed?.about && Array.isArray(parsed.about)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            parsed.about = parsed.about.map((item: any) => {
              if (item.url && item.url.includes("1571896349842-33c89424de2d")) {
                return { ...item, url: IMAGES.about.serviceSmile };
              }
              return item;
            });
          }
          // Merge with defaults in case new keys were added
          setImagesMap((prev) => ({
            ...prev,
            ...parsed
          }));
        }
      } catch (err) {
        console.error("Failed to load section images from localStorage", err);
      }
    }

    // 2. Fetch from Supabase section_images table if available
    const client = supabase;
    if (!client) return;

    async function fetchFromSupabase() {
      if (!client) return;
      try {
        const fetchedMap: Partial<Record<SectionKey, SectionImageItem[]>> = {};

        // 1. Fetch from DB table 'section_images'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: dbItems, error } = await (client as any)
          .from("section_images")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && dbItems && Array.isArray(dbItems) && dbItems.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dbItems.forEach((row: any) => {
            const secKey = row.section_key as SectionKey;
            if (!fetchedMap[secKey]) {
              fetchedMap[secKey] = [];
            }
            fetchedMap[secKey]!.push({
              id: String(row.id),
              sectionKey: secKey,
              url: String(row.url),
              title: String(row.title),
              description: row.description || undefined,
              category: row.category || undefined,
              sortOrder: Number(row.sort_order || 0),
              createdAt: row.created_at
            });
          });
        }

        // 2. Fetch directly from Supabase Storage bucket 'attractions'
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: attractionStorageFiles } = await (client as any).storage
            .from("attractions")
            .list("", { limit: 50 });

          if (attractionStorageFiles && Array.isArray(attractionStorageFiles)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const validFiles = attractionStorageFiles.filter((f: any) => f.name && !f.name.startsWith("."));
            if (validFiles.length > 0) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const storageItems: SectionImageItem[] = validFiles.map((file: any, idx: number) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const publicUrlData = (client as any).storage.from("attractions").getPublicUrl(file.name);
                const publicUrl = publicUrlData?.data?.publicUrl || 
                  `https://nmkjmoqtkpfmseswiqpq.supabase.co/storage/v1/object/public/attractions/${file.name}`;
                
                const fallback = attractionsData[idx] || attractionsData[0];
                const fileCleanTitle = file.name
                  .replace(/\.[^/.]+$/, "")
                  .replace(/[-_]/g, " ")
                  .replace(/\b\w/g, (l: string) => l.toUpperCase());

                return {
                  id: `storage-att-${idx}`,
                  sectionKey: "attractions",
                  url: publicUrl,
                  title: fileCleanTitle || fallback.name,
                  description: fallback.description,
                  category: "Pilgrimage",
                  sortOrder: idx
                };
              });

              if (!fetchedMap["attractions"] || fetchedMap["attractions"].length === 0) {
                fetchedMap["attractions"] = storageItems;
              }
            }
          }
        } catch (storageEx) {
          console.log("Attractions bucket check:", storageEx);
        }

        // 3. Fetch directly from Supabase Storage bucket 'hotel-images' -> 'attractions' folder
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: hotelImageStorageFiles } = await (client as any).storage
            .from("hotel-images")
            .list("attractions", { limit: 50 });

          if (hotelImageStorageFiles && Array.isArray(hotelImageStorageFiles)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const validFiles = hotelImageStorageFiles.filter((f: any) => f.name && !f.name.startsWith("."));
            if (validFiles.length > 0) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const storageItems: SectionImageItem[] = validFiles.map((file: any, idx: number) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const publicUrlData = (client as any).storage.from("hotel-images").getPublicUrl(`attractions/${file.name}`);
                const publicUrl = publicUrlData?.data?.publicUrl || 
                  `https://nmkjmoqtkpfmseswiqpq.supabase.co/storage/v1/object/public/hotel-images/attractions/${file.name}`;
                
                let attractionIndex = idx;
                if (file.name.includes("1785908800102")) attractionIndex = 0;
                else if (file.name.includes("1785908804431")) attractionIndex = 1;
                else if (file.name.includes("1785908811429")) attractionIndex = 2;
                else if (file.name.includes("1785908814767")) attractionIndex = 3;
                else if (file.name.includes("1785908817964")) attractionIndex = 4;

                const matchedAttraction = attractionsData[attractionIndex] || attractionsData[0];

                return {
                  id: `storage-hotel-att-${attractionIndex}`,
                  sectionKey: "attractions",
                  url: publicUrl,
                  title: matchedAttraction.name,
                  description: matchedAttraction.description,
                  category: attractionIndex < 2 ? "Pilgrimage" : (attractionIndex === 3 ? "Leisure" : "Heritage"),
                  sortOrder: attractionIndex
                };
              });

              if (!fetchedMap["attractions"] || fetchedMap["attractions"].length === 0) {
                fetchedMap["attractions"] = storageItems;
              }
            }
          }
        } catch (storageEx2) {
          console.log("Hotel images attractions folder check:", storageEx2);
        }

        if (fetchedMap["attractions"]) {
          fetchedMap["attractions"] = fetchedMap["attractions"].slice(0, 5);
        }

        if (Object.keys(fetchedMap).length > 0) {
          setImagesMap((prev) => {
            const updated = { ...prev };
            (Object.keys(fetchedMap) as SectionKey[]).forEach((k) => {
              if (fetchedMap[k] && fetchedMap[k]!.length > 0) {
                updated[k] = k === "attractions" ? fetchedMap[k]!.slice(0, 5) : fetchedMap[k]!;
              }
            });
            if (typeof window !== "undefined") {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            }
            return updated;
          });
        }
      } catch (err) {
        console.log("Supabase fetch completed:", err);
      }
    }

    fetchFromSupabase();
  }, []);

  // Save changes to localStorage helper
  const saveToLocalStorage = (newMap: Record<SectionKey, SectionImageItem[]>) => {
    if (typeof window !== "undefined") {
      try {
        const toSave = { ...newMap };
        if (toSave.attractions) {
          toSave.attractions = toSave.attractions.slice(0, 5);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (err) {
        console.error("LocalStorage write error:", err);
      }
    }
  };

  const getSectionImages = (sectionKey: SectionKey): SectionImageItem[] => {
    const raw = imagesMap[sectionKey] || defaultSectionImages[sectionKey] || [];
    if (sectionKey === "attractions") {
      return raw.slice(0, 5);
    }
    return raw;
  };

  const addSectionImage = async (
    sectionKey: SectionKey,
    item: { url: string; title: string; description?: string; category?: string }
  ) => {
    const currentList = getSectionImages(sectionKey);
    const newId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem: SectionImageItem = {
      id: newId,
      sectionKey,
      url: item.url,
      title: item.title,
      description: item.description,
      category: item.category,
      sortOrder: currentList.length,
      createdAt: new Date().toISOString()
    };

    const updatedList = [...currentList, newItem];
    const newMap = { ...imagesMap, [sectionKey]: updatedList };

    setImagesMap(newMap);
    saveToLocalStorage(newMap);

    // Sync to Supabase if table exists
    const client = supabase;
    if (client) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (client as any).from("section_images").insert({
          id: newItem.id,
          section_key: sectionKey,
          url: newItem.url,
          title: newItem.title,
          description: newItem.description || null,
          category: newItem.category || null,
          sort_order: newItem.sortOrder
        });
      } catch (e) {
        console.log("Supabase insert skipped or failed:", e);
      }
    }
  };

  const deleteSectionImage = async (sectionKey: SectionKey, id: string) => {
    const currentList = getSectionImages(sectionKey);
    const updatedList = currentList
      .filter((img) => img.id !== id)
      .map((img, idx) => ({ ...img, sortOrder: idx }));

    const newMap = { ...imagesMap, [sectionKey]: updatedList };
    setImagesMap(newMap);
    saveToLocalStorage(newMap);

    const client = supabase;
    if (client) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (client as any).from("section_images").delete().eq("id", id);
      } catch (e) {
        console.log("Supabase delete skipped or failed:", e);
      }
    }
  };

  const updateSectionImage = async (
    sectionKey: SectionKey,
    id: string,
    updates: Partial<Omit<SectionImageItem, "id" | "sectionKey">>
  ) => {
    const currentList = getSectionImages(sectionKey);
    const updatedList = currentList.map((img) => {
      if (img.id === id) {
        return { ...img, ...updates };
      }
      return img;
    });

    const newMap = { ...imagesMap, [sectionKey]: updatedList };
    setImagesMap(newMap);
    saveToLocalStorage(newMap);

    const client = supabase;
    if (client) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (client as any)
          .from("section_images")
          .update({
            title: updates.title,
            url: updates.url,
            description: updates.description,
            category: updates.category,
            sort_order: updates.sortOrder
          })
          .eq("id", id);
      } catch (e) {
        console.log("Supabase update skipped or failed:", e);
      }
    }
  };

  const reorderSectionImages = async (sectionKey: SectionKey, newOrderedItems: SectionImageItem[]) => {
    const reordered = newOrderedItems.map((item, index) => ({
      ...item,
      sortOrder: index
    }));

    const newMap = { ...imagesMap, [sectionKey]: reordered };
    setImagesMap(newMap);
    saveToLocalStorage(newMap);

    const client = supabase;
    if (client) {
      try {
        for (const item of reordered) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (client as any)
            .from("section_images")
            .update({ sort_order: item.sortOrder })
            .eq("id", item.id);
        }
      } catch (e) {
        console.log("Supabase reorder skipped or failed:", e);
      }
    }
  };

  const resetSectionToDefaults = (sectionKey: SectionKey) => {
    const defaultList = defaultSectionImages[sectionKey] || [];
    const newMap = { ...imagesMap, [sectionKey]: defaultList };
    setImagesMap(newMap);
    saveToLocalStorage(newMap);
  };

  return (
    <SectionImagesContext.Provider
      value={{
        imagesMap,
        getSectionImages,
        addSectionImage,
        deleteSectionImage,
        updateSectionImage,
        reorderSectionImages,
        resetSectionToDefaults
      }}
    >
      {children}
    </SectionImagesContext.Provider>
  );
}

export function useSectionImages(): SectionImagesContextType;
export function useSectionImages(sectionKey: SectionKey): {
  images: SectionImageItem[];
  addImage: (item: { url: string; title: string; description?: string; category?: string }) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  updateImage: (id: string, updates: Partial<Omit<SectionImageItem, "id" | "sectionKey">>) => Promise<void>;
  reorderImages: (newOrderedItems: SectionImageItem[]) => Promise<void>;
  resetToDefaults: () => void;
};
export function useSectionImages(sectionKey?: SectionKey) {
  const context = useContext(SectionImagesContext);
  if (!context) {
    throw new Error("useSectionImages must be used within a SectionImagesProvider");
  }
  if (sectionKey) {
    return {
      images: context.getSectionImages(sectionKey),
      addImage: (item: { url: string; title: string; description?: string; category?: string }) =>
        context.addSectionImage(sectionKey, item),
      deleteImage: (id: string) => context.deleteSectionImage(sectionKey, id),
      updateImage: (id: string, updates: Partial<Omit<SectionImageItem, "id" | "sectionKey">>) =>
        context.updateSectionImage(sectionKey, id, updates),
      reorderImages: (newOrderedItems: SectionImageItem[]) =>
        context.reorderSectionImages(sectionKey, newOrderedItems),
      resetToDefaults: () => context.resetSectionToDefaults(sectionKey)
    };
  }
  return context;
}
