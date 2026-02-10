export interface ServiceColor {
  name: string;
  hex?: string;
  image?: string;
}

export interface Service {
  name: string;
  description: string;
  price: string;
  colors: ServiceColor[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Testimonial {
  name: string;
  quote: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
