import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
import { whatsappLink, whatsappDisplayNumber } from "@/lib/whatsapp";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start planning a personalised travel journey with Amaravati Tours & Travel.",
  alternates: { canonical: "/contact/" },
};
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="LET’S TALK TRAVEL"
        title="Every journey starts with an idea."
        description="A place you’ve always wanted to see. A family trip. A few days away. Tell us what you have in mind."
      />
      <section className="section container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">TELL US YOUR PLANS</p>
          <h2>
            We’re here for
            <br />
            your next adventure.
          </h2>
          <p>
            Share your destination, travel dates, and the kind of experiences
            you enjoy. A little detail helps shape a better journey.
          </p>
          <div className="contact-note">
            <p>
              <MapPin size={18} /> <strong>Amaravati, Andhra Pradesh</strong>
              <br />
              India & international journeys
            </p>
            <p>WhatsApp: {whatsappDisplayNumber}</p>
            <a
              className="button"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="form-note">
              Chat directly on WhatsApp, or use the form to prepare a
              downloadable enquiry draft.
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
