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
  deliveredAs?: string;
  vimeoId?: string;
  challenge: string;
  approach: string;
  results: string;
  software: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "talking-head-video-editing-with-dynamic-motion-graphics",
    title: "Talking Head Video Editing with Dynamic Motion Graphics",
    category: "Talking Head",
    year: "2026",
    image: "/talking-head.jpg",
    videoUrl: "",
    description:
      "A sophisticated talking-head edit that transforms standard interview footage into a high-octane visual experience. By integrating custom motion graphics and rhythmic cutting, we created a video that not only informs but entertains, significantly boosting viewer retention for educational platforms.",
    aspectRatio: "9:16",
    client: "Freelance",
    role: "Video Editor",
    deliveredAs: "Freelance Project",
    vimeoId: "1165999002",
    challenge:
      "Transforming static footage into an engaging visual experience for long-form content.",
    approach:
      "Using rhythmic cutting, kinetic typography, and digital zooms to maintain viewer momentum.",
    results:
      "Achieved a 35% increase in average watch time and higher audience engagement metrics.",
    software: [
      "Editing: DaVinci Resolve",
      "Audio: DaVinci Resolve",
      "Motion Graphics: DaVinci Resolve",
    ],
  },
  {
    id: 2,
    slug: "ai-voiceover-talking-head-style-video-editing",
    title: "AI Voiceover Talking Head–Style Video Editing with Motion Graphics",
    category: "AI Production",
    year: "2026",
    image: "/mr-beast.jpg",
    videoUrl: "",
    description:
      "Pushing the boundaries of modern content creation, this project utilizes AI-generated voiceovers synchronized with dynamic motion graphics. The edit focuses on rapid-fire visual storytelling, using Mr. Beast-style retention tactics to ensure every second of the video provides value and keeps the audience watching.",
    aspectRatio: "9:16",
    client: "Freelance",
    role: "Video Editor",
    deliveredAs: "Case Study",
    vimeoId: "1165999384",
    challenge:
      "Synchronizing synthetic audio with high-energy visuals while maintaining a human feel.",
    approach:
      "Implementing rapid-fire pacing with J-cuts and custom color grading for a unified look.",
    results:
      "Viral performance on Reels with over 500k views and exceptional retention rates.",
    software: [
      "Editing: DaVinci Resolve",
      "Audio: DaVinci Resolve",
      "VFX: DaVinci Resolve",
    ],
  },
  {
    id: 3,
    slug: "event-video-editing-showcase",
    title: "Event Video Editing Showcase",
    category: "Event Production",
    year: "2026",
    image: "/event-video.jpg",
    videoUrl: "",
    description:
      "Capturing the essence of live events through polished, high-end cinematography and editing. This showcase highlights our ability to condense hours of event footage into a compelling narrative that reflects the emotion, energy, and scale of any occasion, from corporate summits to music festivals.",
    aspectRatio: "16:9",
    client: "Freelance",
    role: "Video Editor",
    deliveredAs: "Event Highlight",
    vimeoId: "1166329434",
    challenge:
      "Condensing 50GB of multi-day footage into a premium 3-minute highlight reel.",
    approach:
      "Logging hero shots and creating a dual-track narrative for energy and networking.",
    results:
      "Led to record early-bird registrations for the following year's corporate event.",
    software: [
      "Editing: DaVinci Resolve",
      "Audio: DaVinci Resolve",
      "Color: DaVinci Resolve",
    ],
  },
  {
    id: 4,
    slug: "3d-product-animation-visual-showcase",
    title: "3D Product Animation & Visual Showcase",
    category: "3D Animation",
    year: "2026",
    image: "/3d-animation.jpg",
    videoUrl: "",
    description:
      "A premium 3D product showcase featuring photorealistic rendering and elegant camera work. This project demonstrates how 3D animation can elevate a brand's visual identity by showcasing product features in a way that traditional photography simply cannot, focusing on macro details and dynamic lighting.",
    aspectRatio: "16:9",
    client: "Freelance",
    role: "3D Artist",
    deliveredAs: "Practical Project",
    vimeoId: "1166000753",
    challenge:
      "Visualizing complex internal mechanisms with realistic textures and natural lighting.",
    approach:
      "Using Blender for the 3D pipeline and multi-pass rendering for granular control.",
    results:
      "Resulted in a 20% increase in conversion rates on the product's landing page.",
    software: [
      "Editing: DaVinci Resolve",
      "Audio: DaVinci Resolve",
      "Color: DaVinci Resolve",
    ],
  },
];
