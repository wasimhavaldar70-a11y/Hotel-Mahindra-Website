/**
 * ============================================================================
 * NEARBY ATTRACTIONS DATASET
 * 
 * PURPOSE:
 * Centralizes the attractions details shown on the home page and nearby page.
 * 
 * NOTE:
 * - Update attraction description and maps routing URL here.
 * - Distance is kept approximate and non-committed to prevent business misinformation.
 * ============================================================================
 */

import { Attraction } from '../types/attraction';
import { IMAGES } from './images';

export const attractionsData: Attraction[] = [
  {
    id: "att-1",
    name: "Shri Ambabai Mahalaxmi Temple",
    description: "The historical and highly revered temple dedicated to Goddess Ambabai. A primary pilgrimage site featuring beautiful ancient Chalukyan stone architecture.",
    image: IMAGES.attractions.mahalaxmiTemple,
    mapsUrl: "https://maps.google.com/?q=Mahalaxmi+Temple+Kolhapur",
    distanceInfo: "A short drive from the hotel"
  },
  {
    id: "att-2",
    name: "Jyotiba Temple",
    description: "Perched on a scenic hill, this sacred shrine is dedicated to Kedarling (Jyotiba). Offers beautiful panoramic views of the surrounding valleys.",
    image: IMAGES.attractions.jyotibaTemple,
    mapsUrl: "https://maps.google.com/?q=Jyotiba+Temple+Kolhapur",
    distanceInfo: "Scenic hill-drive route"
  },
  {
    id: "att-3",
    name: "Panhala Fort",
    description: "A majestic historic hill fort linked with Shivaji Maharaj and Maratha history. Featuring grand fortifications, visual double-walled gates, and panoramic lookout points.",
    image: IMAGES.attractions.panhalaFort,
    mapsUrl: "https://maps.google.com/?q=Panhala+Fort+Kolhapur",
    distanceInfo: "Perfect day trip destination"
  },
  {
    id: "att-4",
    name: "Rankala Lake",
    description: "A calm, picturesque historic lake surrounded by stone pathways, green gardens, and sunset viewpoints. Great for relaxing family walks and boating.",
    image: IMAGES.attractions.rankalaLake,
    mapsUrl: "https://maps.google.com/?q=Rankala+Lake+Kolhapur",
    distanceInfo: "Easily accessible from hotel"
  },
  {
    id: "att-5",
    name: "Chhatrapati Shahu Museum (New Palace)",
    description: "Constructed of polished black stone, this active royal palace houses an extensive museum showcasing Kolhapur's rich royal history, armory, and memorabilia.",
    image: IMAGES.attractions.newPalace,
    mapsUrl: "https://maps.google.com/?q=New+Palace+Kolhapur",
    distanceInfo: "Conveniently located nearby"
  }
];
