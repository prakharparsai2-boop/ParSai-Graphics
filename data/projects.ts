export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  videoUrl: string;
  description: string;
  aspectRatio: "16:9" | "9:16";
  client?: string;
  role?: string;
  vimeoId?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "urban-lifestyle-promo",
    title: "Urban Lifestyle Promo",
    category: "Commercial",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-urban-traffic-scene-at-night-3543-large.mp4",
    description:
      "A high-energy commercial capturing the rhythm of city life. This project required fast-paced editing and dynamic transitions to match the beat of the soundtrack. The goal was to create a visceral experience that transports the viewer into the heart of the metropolis.",
    aspectRatio: "16:9",
    client: "Urban Outfitters",
    role: "Editor & Colorist",
    vimeoId: "1158807299",
  },
  {
    id: 2,
    slug: "the-silent-peak",
    title: "The Silent Peak",
    category: "Documentary",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1490810194309-344b3661ba39?q=80&w=1148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-mountain-landscape-in-the-fog-2121-large.mp4",
    description:
      "An atmospheric documentary piece exploring the solitude of high-altitude climbing. Focus was placed on sound design and slow, deliberate pacing to mirror the thin air and isolation of the peaks.",
    aspectRatio: "16:9",
    client: "Nat Geo Wild",
    role: "Editor",
    vimeoId: "1158807299",
  },
  {
    id: 3,
    slug: "neon-nights",
    title: "Neon Nights",
    category: "Music Video",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1502209877429-d7c6df9eb3f9?q=80&w=866&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-party-4366-large.mp4",
    description:
      "A vibrant, neon-soaked music video. We utilized extensive glitch effects, datamoshing, and aggressive color grading to create a cyberpunk aesthetic that complements the synthwave track.",
    aspectRatio: "16:9",
    client: "The Midnight",
    role: "VFX & Editor",
    vimeoId: "1158807299",
  },
  {
    id: 4,
    slug: "tech-review-2024",
    title: "Tech Review 2024",
    category: "YouTube Content",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1686061592315-af9342dc8d74?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-close-up-1729-large.mp4",
    description:
      "Crisp, clean editing for a tech review channel. The focus here was on viewer retention: using engaging b-roll, kinetic typography for key specs, and tight cutting to eliminate dead air.",
    aspectRatio: "16:9",
    client: "TechDaily",
    role: "Editor",
    vimeoId: "1158807299",
  },
  {
    id: 5,
    slug: "culinary-masterclass",
    title: "Culinary Masterclass",
    category: "Education",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1526698905402-e13b880ad864?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-commercial-kitchen-4279-large.mp4",
    description:
      "A series of premium cooking lessons. Multi-cam editing was essential to ensure clarity of the food preparation process, combined with macro shots to highlight textures and colors.",
    aspectRatio: "16:9",
    client: "MasterChef Online",
    role: "Lead Editor",
    vimeoId: "1158807299",
  },
  {
    id: 6,
    slug: "future-of-ai",
    title: "Future of AI",
    category: "Explainer",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1637250051543-9fca17abf411?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-with-flying-vehicles-4369-large.mp4",
    description:
      "Vertical short-form content explaining complex AI concepts in under 60 seconds. Optimized for mobile viewing (TikTok/Reels) with center-safe graphics and rapid-fire visual storytelling.",
    aspectRatio: "9:16",
    client: "FutureThink",
    role: "Motion Graphics",
    vimeoId: "1158807299",
  },
];
