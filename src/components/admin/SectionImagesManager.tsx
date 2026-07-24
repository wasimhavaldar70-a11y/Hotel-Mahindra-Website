"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  MoveUp,
  MoveDown,
  Plus,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Edit2,
  Check,
  X,
  Layers,
  Building2,
  BedDouble,
  MapPin,
  ChevronRight,
  FolderOpen
} from "lucide-react";
import { useSectionImages } from "../../context/SectionImagesContext";
import { SectionKey, SectionImageItem } from "../../types/sectionImages";
import CustomImage from "../common/CustomImage";
import { supabase } from "../../lib/supabase/client";

interface SectionConfig {
  key: SectionKey;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
  recommendedAspect: string;
  liveRoute: string;
  categories?: string[];
}

const SECTIONS_CONFIG: SectionConfig[] = [
  {
    key: "hero",
    label: "Hero Slides",
    shortLabel: "Hero Slides",
    icon: Sparkles,
    description: "Homepage main visual crossfade slideshow (3s cycle speed).",
    recommendedAspect: "16:9 Landscape (1920x1080)",
    liveRoute: "/"
  },
  {
    key: "about",
    label: "About Section",
    shortLabel: "About Us",
    icon: Building2,
    description: "Featured images on homepage About block and /about page.",
    recommendedAspect: "4:5 Portrait or 3:4 Vertical",
    liveRoute: "/about"
  },
  {
    key: "deluxe-ac-room",
    label: "Deluxe AC Room",
    shortLabel: "Deluxe AC",
    icon: BedDouble,
    description: "Deluxe AC Room cards showcase & room detail page gallery.",
    recommendedAspect: "4:3 Landscape or 16:9",
    liveRoute: "/rooms/deluxe-ac-room"
  },
  {
    key: "family-ac-suite",
    label: "Family AC Room",
    shortLabel: "Family Suite",
    icon: BedDouble,
    description: "Executive Family AC Suite cards & detail page gallery.",
    recommendedAspect: "4:3 Landscape or 16:9",
    liveRoute: "/rooms/family-ac-suite"
  },
  {
    key: "standard-non-ac-room",
    label: "Standard Room",
    shortLabel: "Standard Room",
    icon: BedDouble,
    description: "Standard Non-AC budget room cards & detail page gallery.",
    recommendedAspect: "4:3 Landscape or 16:9",
    liveRoute: "/rooms/standard-non-ac-room"
  },
  {
    key: "attractions",
    label: "Attractions",
    shortLabel: "Attractions",
    icon: MapPin,
    description: "Kolhapur tourist destinations & temple cards on homepage & /nearby.",
    recommendedAspect: "16:9 Landscape",
    liveRoute: "/nearby",
    categories: ["Pilgrimage", "Heritage", "Leisure", "Shopping"]
  },
  {
    key: "gallery",
    label: "Gallery Showcase",
    shortLabel: "Gallery",
    icon: Layers,
    description: "Full hotel photo portfolio on homepage & /gallery filter page.",
    recommendedAspect: "4:3 or 1:1 Square",
    liveRoute: "/gallery",
    categories: ["rooms", "exterior", "lobby", "dining", "general"]
  }
];

export default function SectionImagesManager() {
  const [activeSectionKey, setActiveSectionKey] = useState<SectionKey>("hero");
  const {
    imagesMap,
    getSectionImages,
    addSectionImage,
    deleteSectionImage,
    updateSectionImage,
    reorderSectionImages,
    resetSectionToDefaults
  } = useSectionImages();

  // Form State
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Inline State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const currentConfig = SECTIONS_CONFIG.find((s) => s.key === activeSectionKey)!;
  const currentImages = getSectionImages(activeSectionKey);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image size should be under 5MB.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
        setUrlInput(result);
        if (!titleInput) {
          setTitleInput(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
        }
      };
      reader.readAsDataURL(file);
      setUploadError("");
    }
  };

  // Submit New Image
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    setUploadSuccess("");

    let finalUrl = previewUrl || urlInput.trim();
    if (!finalUrl) {
      setUploadError("Please select an image file or enter an image URL.");
      return;
    }
    if (!titleInput.trim()) {
      setUploadError("Please provide a title for this image.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Try uploading binary file directly to Supabase Storage Bucket 'hotel-images' if client & file are available
      const client = supabase;
      if (client && selectedFile) {
        try {
          const fileExt = selectedFile.name.split(".").pop();
          const fileName = `${activeSectionKey}/${Date.now()}-${Math.random().toString(36).substr(2, 4)}.${fileExt}`;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: storageData, error: storageErr } = await (client as any).storage
            .from("hotel-images")
            .upload(fileName, selectedFile);

          if (!storageErr && storageData) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: publicUrlData } = (client as any).storage
              .from("hotel-images")
              .getPublicUrl(fileName);
            if (publicUrlData?.publicUrl) {
              finalUrl = publicUrlData.publicUrl;
            }
          }
        } catch (storageEx) {
          console.log("Supabase storage upload fallback to Data URL:", storageEx);
        }
      }

      await addSectionImage(activeSectionKey, {
        url: finalUrl,
        title: titleInput.trim(),
        description: descInput.trim() || undefined,
        category: categoryInput.trim() || currentConfig.categories?.[0] || undefined
      });

      setUploadSuccess(`Successfully added image to ${currentConfig.label}!`);
      // Reset form
      setTitleInput("");
      setDescInput("");
      setUrlInput("");
      setPreviewUrl("");
      setSelectedFile(null);
      setCategoryInput("");
      setTimeout(() => setUploadSuccess(""), 4000);
    } catch {
      setUploadError("An error occurred while uploading. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reordering helpers
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const newItems = [...currentImages];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    reorderSectionImages(activeSectionKey, newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index >= currentImages.length - 1) return;
    const newItems = [...currentImages];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    reorderSectionImages(activeSectionKey, newItems);
  };

  // Start Inline Editing
  const startEdit = (item: SectionImageItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDesc(item.description || "");
    setEditCategory(item.category || "");
  };

  // Save Inline Editing
  const saveEdit = async (id: string) => {
    await updateSectionImage(activeSectionKey, id, {
      title: editTitle.trim(),
      description: editDesc.trim() || undefined,
      category: editCategory.trim() || undefined
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#201c18] to-[#151413] text-white p-6 md:p-8 rounded-2xl border border-amber-900/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary border border-primary/30 p-2 rounded-xl">
              <FolderOpen size={22} />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-white">
              Section Media & Image Center
            </h2>
          </div>
          <p className="text-white/70 text-xs md:text-sm pt-1">
            Upload, manage, and re-order photos for each section. Changes reflect live on the website.
          </p>
        </div>

        <Link
          href={currentConfig.liveRoute}
          target="_blank"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
        >
          <span>Preview {currentConfig.shortLabel}</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* Main Grid: Left Vertical Sidebar + Right Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Vertical Section Navigation Rail */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-4">
          
          <div className="px-3 pt-2 pb-1 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Marketing Sections (7)
            </span>
            <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
              Live Sync
            </span>
          </div>

          {/* Vertical Section Buttons */}
          <div className="space-y-1.5">
            {SECTIONS_CONFIG.map((section) => {
              const Icon = section.icon;
              const isActive = section.key === activeSectionKey;
              const count = (imagesMap[section.key] || []).length;

              return (
                <button
                  key={section.key}
                  onClick={() => {
                    setActiveSectionKey(section.key);
                    setEditingId(null);
                    setUploadError("");
                    setUploadSuccess("");
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all text-left cursor-pointer group relative ${
                    isActive
                      ? "bg-stone-900 text-white shadow-md font-bold"
                      : "bg-stone-50/70 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  {/* Left Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSectionIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1.5 bg-primary rounded-r-full"
                    />
                  )}

                  <div className="flex items-center gap-3 pl-2 flex-1 min-w-0 text-left">
                    <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                      isActive ? "bg-white/10 text-primary" : "bg-white text-stone-500 group-hover:text-stone-900 border border-stone-200/80"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <h4 className="text-xs font-bold leading-tight text-left truncate">{section.label}</h4>
                      <p className={`text-[10px] line-clamp-1 mt-0.5 text-left ${
                        isActive ? "text-white/70" : "text-stone-400"
                      }`}>
                        {section.recommendedAspect.split(" ")[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isActive
                        ? "bg-white/20 text-white border-white/20"
                        : "bg-white text-stone-600 border-stone-200"
                    }`}>
                      {count}
                    </span>
                    <ChevronRight size={14} className={isActive ? "text-primary" : "text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity"} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Section Info Card */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-3 pt-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Recommended Aspect Ratio
              </span>
              <p className="text-xs font-semibold text-stone-800">
                {currentConfig.recommendedAspect}
              </p>
            </div>
            
            <button
              onClick={() => {
                if (confirm(`Reset ${currentConfig.label} photos back to original default presets?`)) {
                  resetSectionToDefaults(activeSectionKey);
                }
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-medium text-stone-600 hover:text-red-600 bg-white hover:bg-red-50 border border-stone-200/80 p-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset Section Defaults</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Workspace Area (Upload Form + Photo Cards) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Section Headline Banner */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                  {currentConfig.label}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {currentImages.length} Active Photos
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                {currentConfig.description}
              </p>
            </div>
          </div>

          {/* Upload New Image Form Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <UploadCloud size={20} className="text-primary" />
                <span>Upload New Image for {currentConfig.shortLabel}</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Drop an image file or paste a CDN URL below to add it directly.
              </p>
            </div>

            <form onSubmit={handleAddImage} className="space-y-5 text-xs">
              
              {/* File Upload Dropzone */}
              <div className="space-y-2">
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  Option 1: Drag & Drop Local Image File
                </label>
                <label className="border-2 border-dashed border-stone-300 hover:border-primary bg-stone-50/70 hover:bg-amber-50/30 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all text-center group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-stone-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} className="text-primary" />
                  </div>
                  <span className="font-bold text-stone-900 text-xs">Click to browse or drop file here</span>
                  <span className="text-[10px] text-stone-400 mt-1">Supports PNG, JPG, WEBP (Max 5MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* OR URL Input */}
              <div className="space-y-2">
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  Option 2: Or Paste Direct Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or cloud image URL"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              {/* Image Preview Box */}
              {previewUrl && (
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold text-stone-500 uppercase">Selected Photo Preview</span>
                  <div className="relative h-48 w-full border border-stone-200 rounded-xl overflow-hidden bg-stone-900/5">
                    <CustomImage
                      src={previewUrl}
                      alt="Preview"
                      fill
                      sizes="600px"
                    />
                  </div>
                </div>
              )}

              {/* Title & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                    Photo Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deluxe Room Bedding Layout"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    required
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                    Subtitle / Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Air-conditioned suite with king double bed"
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                {currentConfig.categories && currentConfig.categories.length > 0 && (
                  <div className="space-y-1 sm:col-span-2">
                    <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                      Category Tag
                    </label>
                    <select
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-primary focus:bg-white capitalize"
                    >
                      <option value="">Select Category Tag</option>
                      {currentConfig.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Toast Alerts */}
              {uploadError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {uploadSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 px-4 rounded-xl tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Plus size={16} />
                <span>{isSubmitting ? "Uploading to Cloud..." : `Save to ${currentConfig.shortLabel}`}</span>
              </button>

            </form>
          </div>

          {/* Manage & Reorder Card Grid */}
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Active Photos in {currentConfig.label} ({currentImages.length})
              </h3>
              <span className="text-xs text-stone-500">
                Use <MoveUp size={12} className="inline" /> <MoveDown size={12} className="inline" /> to reorder slide sequence
              </span>
            </div>

            {currentImages.length === 0 ? (
              <div className="bg-white border border-dashed border-stone-300 p-12 text-center text-stone-500 rounded-2xl space-y-3">
                <ImageIcon size={44} className="mx-auto text-stone-300" />
                <p className="text-sm font-semibold">No images uploaded for {currentConfig.label} yet.</p>
                <p className="text-xs text-stone-400">Use the upload box above to add your first photo.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentImages.map((item, index) => {
                  const isEditing = editingId === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 relative group hover:border-amber-900/30 transition-all"
                    >
                      {/* Index Order Badge */}
                      <div className="absolute top-3 left-3 z-20 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow">
                        #{index + 1}
                      </div>

                      {/* Image Thumbnail */}
                      <div className="relative w-full sm:w-40 aspect-[16/10] shrink-0 bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                        <CustomImage
                          src={item.url}
                          alt={item.title}
                          fill
                          sizes="200px"
                        />
                      </div>

                      {/* Details / Inline Form */}
                      <div className="flex-1 space-y-1.5 w-full">
                        {isEditing ? (
                          <div className="space-y-2 py-1">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Title"
                              className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-lg text-xs font-bold text-stone-900"
                            />
                            <input
                              type="text"
                              value={editDesc}
                              onChange={(e) => setEditDesc(e.target.value)}
                              placeholder="Description"
                              className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-lg text-xs text-stone-600"
                            />
                            {currentConfig.categories && (
                              <input
                                type="text"
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value)}
                                placeholder="Category Tag"
                                className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-lg text-xs text-stone-600"
                              />
                            )}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => saveEdit(item.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Check size={12} />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                              >
                                <X size={12} />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">
                                {item.title}
                              </h4>
                              {item.category && (
                                <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                                  {item.category}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-stone-500 text-xs leading-normal">
                                {item.description}
                              </p>
                            )}
                            <p className="text-[10px] text-stone-400 font-mono truncate max-w-md pt-0.5">
                              URL: {item.url}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Action Buttons Column */}
                      {!isEditing && (
                        <div className="flex sm:flex-col items-center justify-end gap-1.5 w-full sm:w-auto border-t sm:border-t-0 border-stone-100 pt-2 sm:pt-0 shrink-0">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0}
                              className="p-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-lg disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              <MoveUp size={14} />
                            </button>
                            <button
                              onClick={() => handleMoveDown(index)}
                              disabled={index === currentImages.length - 1}
                              className="p-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-lg disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              <MoveDown size={14} />
                            </button>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEdit(item)}
                              className="p-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 hover:text-primary rounded-lg cursor-pointer"
                              title="Edit Info"
                            >
                              <Edit2 size={14} />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Remove "${item.title}" from ${currentConfig.label}?`)) {
                                  deleteSectionImage(activeSectionKey, item.id);
                                }
                              }}
                              className="p-2 bg-stone-50 hover:bg-red-50 border border-stone-200 text-stone-500 hover:text-red-600 rounded-lg cursor-pointer"
                              title="Delete Image"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )}

                    </motion.div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
