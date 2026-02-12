import { Service, GalleryImage, NavLink, Testimonial, FAQ } from "./types";

export const siteConfig = {
  name: "Nails by Pia",
  tagline: "Fun, stylish, and creative nail designs",
  description:
    "Nails by Pia — simple, cute, and trendy nail looks that help you express your personality.",
};

export const contactInfo = {
  phone: "(669) 302-5191",
  email: "pia_sosa@icloud.com",
};

export const socialLinks = {
  instagram: "https://instagram.com/nailsbypia", // TODO: Replace with real URL
  tiktok: "https://tiktok.com/@nailsbypia", // TODO: Replace with real URL
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  {
    name: "Cat-Eye Gel Polish",
    description: "Magnetic gel polish that creates a mesmerizing, light-shifting stripe across the nail — like the slit of a cat's eye.",
    price: "$9",
    frenchTipPrice: "$8",
    colors: [
      { name: "Pink", image: "/images/featured/cateye_pink_final.png" },
    ],
  },
  {
    name: "Gel Polish",
    description: "Long-lasting gel polish in LED-cured and no-LED options.",
    price: "$6–$7",
    frenchTipPrice: "$5–$6",
    colors: [
      { name: "Berry Beat", image: "/images/featured/gel_BerryBeat.png" },
      { name: "Cream Blush", image: "/images/featured/gel_creamBlush.png" },
      { name: "Indigo Grove", image: "/images/featured/gel_indigogrove.png" },
      { name: "Retro Red", image: "/images/featured/gel_retrored.png" },
      { name: "Snakebite", image: "/images/featured/gel_snakebite.png" },
      { name: "Coral Crush", hex: "#FF7675" },
      { name: "Blue Glitter", hex: "#3B5EC9" },
    ],
    colorGroups: [
      {
        label: "Gel Polish",
        price: "$7",
        frenchTipPrice: "$6",
        colors: [
          { name: "Berry Beat", image: "/images/featured/gel_BerryBeat.png" },
          { name: "Cream Blush", image: "/images/featured/gel_creamBlush.png" },
          { name: "Indigo Grove", image: "/images/featured/gel_indigogrove.png" },
          { name: "Retro Red", image: "/images/featured/gel_retrored.png" },
          { name: "Snakebite", image: "/images/featured/gel_snakebite.png" },
        ],
      },
      {
        label: "No LED",
        price: "$6",
        frenchTipPrice: "$5",
        colors: [
          { name: "Coral Crush", hex: "#FF7675" },
          { name: "Blue Glitter", hex: "#3B5EC9" },
        ],
      },
    ],
  },
  {
    name: "Nail Polish",
    description: "Classic nail polish in a wide range of colors — quick, simple, and always cute.",
    price: "$5",
    frenchTipPrice: "$4",
    colors: [
      { name: "Gold Amber", hex: "#E0C438" },
      { name: "Mustard Yellow", hex: "#B8921C" },
      { name: "Red Orange", hex: "#D67231" },
      { name: "Rusty Red", hex: "#D52525" },
      { name: "Magenta Rose", hex: "#AE2757" },
      { name: "Magenta Pink", hex: "#D3208C" },
      { name: "Deep Purple", hex: "#662A6E" },
      { name: "Intense Purple", hex: "#773BCC" },
      { name: "Electric Blue", hex: "#4357D4" },
      { name: "Green Teal", hex: "#2C9FA3" },
      { name: "Cyan", hex: "#48CED3" },
      { name: "Mint Green", hex: "#3DD597" },
      { name: "Light Green", hex: "#93DC93" },
      { name: "Sea Mint", hex: "#38A12F" },
      { name: "Shimmer", image: "/images/featured/nail_polish_skin_shiny.png" },
    ],
  },
  {
    name: "Repair Treatment",
    description: "Nail repair treatment to restore and maintain healthy nails — includes cuticle removal and nail care.",
    price: "$5",
    features: [
      "Cuticle removal",
      "Nail shape",
      "Shaping",
      "Filing",
      "Nail care & conditioning",
    ],
  },
];

export const galleryCategories = [
  { id: "all", label: "All Designs" },
  { id: "gel", label: "Gel Polish" },
  { id: "polish", label: "Classic Polish" },
  { id: "custom", label: "Custom Art" },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/nails-01.jpeg", alt: "Nail design", category: "gel" },
  { src: "/images/gallery/nails-02.jpeg", alt: "Nail design", category: "custom" },
  { src: "/images/gallery/nails-03.jpeg", alt: "Nail design", category: "polish" },
  { src: "/images/gallery/nails-04.jpeg", alt: "Nail design", category: "gel" },
  { src: "/images/gallery/nails-05.jpeg", alt: "Nail design", category: "custom" },
  { src: "/images/gallery/nails-06.jpeg", alt: "Nail design", category: "polish" },
  { src: "/images/gallery/nails-07.jpeg", alt: "Nail design", category: "gel" },
  { src: "/images/gallery/fullsize-render-1.jpeg", alt: "Nail design", category: "custom" },
  { src: "/images/gallery/fullsize-render-2.jpeg", alt: "Nail design", category: "polish" },
  { src: "/images/gallery/fullsize-render-3.jpeg", alt: "Nail design", category: "gel" },
  { src: "/images/gallery/nails-01b.jpeg", alt: "Nail design", category: "custom" },
  { src: "/images/gallery/nails-02b.jpeg", alt: "Nail design", category: "polish" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    quote: "Pia's nail designs are always so cute and creative! She really listens to what you want and makes it happen.",
  },
  {
    name: "Emily R.",
    quote: "Super fun experience and my nails look amazing every single time. Definitely my go-to nail artist!",
  },
  {
    name: "Jasmine L.",
    quote: "Best nail art I've ever gotten. Pia is so talented and always makes sure you leave happy!",
  },
  {
    name: "Olivia K.",
    quote: "Pia did the cutest design for my birthday! Everyone kept asking where I got my nails done.",
  },
  {
    name: "Maya T.",
    quote: "Love how gentle and careful Pia is. My nails always come out perfect and last so long!",
  },
];

export const faqs: FAQ[] = [
  {
    question: "How long does an appointment take?",
    answer: "Most appointments take 45-60 minutes depending on the design complexity. Simple polish is usually quicker!",
  },
  {
    question: "Do you use safe products?",
    answer: "Yes! I only use high-quality, non-toxic products from Le mini macaron — a brand known for their great-quality nail polish, gel kits, and nail care equipment. Everything is safe for all ages.",
  },
  {
    question: "How long do gel nails last?",
    answer: "Gel polish typically lasts 1-2 weeks with proper care. I'll give you tips to make them last even longer!",
  },
];

export const aboutText = `Hi! I'm Pia, and I'm 11 years old. I love doing nails and everything about nail art. Whether it's for a special occasion or just because, I'm here to make your nails look amazing.

I offer different treatments from basic manicures to gel polish and custom designs, all using high-quality products from Le Mini Macaron. I already have lots of experience with different nail types and techniques, and I'm always learning new ones!`;
