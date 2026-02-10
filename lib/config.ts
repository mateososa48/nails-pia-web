import { Service, GalleryImage, NavLink, Testimonial, FAQ } from "./types";

export const siteConfig = {
  name: "Nails by Pia",
  tagline: "Fun, stylish, and creative nail designs",
  description:
    "Nails by Pia — simple, cute, and trendy nail looks that help you express your personality.",
};

export const contactInfo = {
  phone: "(555) 000-0000", // TODO: Replace with real phone
  email: "hello@nailsbypia.com", // TODO: Replace with real email
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
    colors: [
      { name: "Midnight Blue", hex: "#1B1F6B" },
      { name: "Emerald Night", hex: "#0D5E3A" },
      { name: "Deep Plum", hex: "#4A0E4E" },
      { name: "Black Galaxy", hex: "#1A1A2E" },
    ],
  },
  {
    name: "Gel Polish",
    description: "Long-lasting gel polish cured under LED light for a glossy, chip-resistant finish.",
    price: "$7",
    colors: [
      { name: "Berry Beat", image: "/images/featured/gel_BerryBeat.png" },
      { name: "Cream Blush", image: "/images/featured/gel_creamBlush.png" },
      { name: "Indigo Grove", image: "/images/featured/gel_indigogrove.png" },
      { name: "Retro Red", image: "/images/featured/gel_retrored.png" },
      { name: "Snakebite", image: "/images/featured/gel_snakebite.png" },
    ],
  },
  {
    name: "Gel Polish (No LED)",
    description: "Gel-like finish without the LED lamp — easy application, beautiful results.",
    price: "$6",
    colors: [
      { name: "Coral Crush", hex: "#FF7675" },
      { name: "Lavender Haze", hex: "#A29BFE" },
    ],
  },
  {
    name: "Nail Polish",
    description: "Classic nail polish in a wide range of colors — quick, simple, and always cute.",
    price: "$5",
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
];

export const faqs: FAQ[] = [
  {
    question: "How long does an appointment take?",
    answer: "Most appointments take 45-60 minutes depending on the design complexity. Simple polish is usually quicker!",
  },
  {
    question: "Do you use safe products?",
    answer: "Yes! I only use high-quality, non-toxic products that are safe for all ages.",
  },
  {
    question: "Can you recreate designs from photos?",
    answer: "Absolutely! Just send me a reference photo with your message and I'll let you know if I can make it happen.",
  },
  {
    question: "How long do gel nails last?",
    answer: "Gel polish typically lasts 2-3 weeks with proper care. I'll give you tips to make them last even longer!",
  },
];

export const aboutText = `Hi! I'm Pia, a middle school nail artist who loves creating fun, stylish, and creative nail designs. Nails by Pia is all about simple, cute, and trendy looks that help you express your personality.

I offer basic manicures and custom nail designs using safe, high-quality products. Whether you want something minimal or something bold, I'll work with you to create a look you love.

Perfect for friends, special occasions, or just treating yourself.`;
