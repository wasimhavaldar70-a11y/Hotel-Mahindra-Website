const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const urlMatch = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
const keyMatch = envFile.match(/SUPABASE_SECRET_KEY=(.+)/) || envFile.match(/SUPABASE_PUBLISHABLE_KEY=(.+)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseKey = keyMatch ? keyMatch[1].trim() : '';

console.log("Testing Supabase JS Client at:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  const { data: rooms, error: roomsErr } = await supabase.from('rooms').select('*');
  console.log("Rooms count:", rooms ? rooms.length : 0, "Error:", roomsErr);

  const { data: gallery, error: galleryErr } = await supabase.from('gallery').select('*');
  console.log("Gallery count:", gallery ? gallery.length : 0, "Error:", galleryErr);

  const { data: sectionImages, error: sectionErr } = await supabase.from('section_images').select('*');
  console.log("Section Images count:", sectionImages ? sectionImages.length : 0, "Error:", sectionErr);

  const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
  console.log("Storage Buckets:", buckets ? buckets.map(b => b.name) : [], "Error:", bucketErr);
}

verify();
