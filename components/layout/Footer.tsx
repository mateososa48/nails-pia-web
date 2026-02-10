import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { siteConfig, contactInfo, navLinks, socialLinks } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2">{siteConfig.name}</h3>
            <p className="text-white/60 text-sm">{siteConfig.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-pink">Pages</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-pink">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-pink transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-pink transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pink transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pink transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
