import type { Metadata } from "next";
import { HiPhone, HiEnvelope } from "react-icons/hi2";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactInfo, faqs } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nails by Pia — book your appointment or ask about custom designs.",
};

export default function ContactPage() {
  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            title="Get in Touch"
            subtitle="Ready for your new look? Send me a message!"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-pink/10 flex items-center justify-center group-hover:bg-pink/20 transition-colors">
                      <HiPhone className="w-5 h-5 text-pink" />
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Phone / Text</p>
                      <p className="font-medium">{contactInfo.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-lavender/10 flex items-center justify-center group-hover:bg-lavender/20 transition-colors">
                      <HiEnvelope className="w-5 h-5 text-lavender" />
                    </div>
                    <div>
                      <p className="text-sm text-black/50">Email</p>
                      <p className="font-medium">{contactInfo.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink/10 to-lavender/10 rounded-2xl p-6">
                <h4 className="font-bold mb-2">Quick Tip</h4>
                <p className="text-sm text-black/60">
                  Have a design in mind? Send a reference photo with your
                  message and I&apos;ll let you know if I can make it happen!
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        <AnimatedSection className="mt-20 pt-16 border-t border-pink/[0.12]">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Got questions? I've got answers!"
          />
          <FAQAccordion faqs={faqs} />
        </AnimatedSection>
      </div>
    </div>
  );
}
