import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
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
            <p>
              This sample site is ready for your agency’s verified phone, email,
              address, and opening hours.
            </p>
            <p className="form-note">
              Use the form to prepare a downloadable enquiry draft. Live enquiry
              delivery can be connected when your contact details are ready.
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
