
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/cta-contact";
import { doctorData } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dr. Sharma - General Physician | Best Care in Jaipur",
    description: "Experienced General Physician in Jaipur offering comprehensive health checkups and chronic disease management.",
};

export default function DoctorPage() {
    const d = doctorData;
    const theme = d.colors.primary; // "bg-teal-600 hover:..."

    return (
        <div className="min-h-screen font-sans">
            <Navbar
                title="Dr. Sharma Clinic"
                links={[
                    { name: "Home", href: "#home" },
                    { name: "About", href: "#about" },
                    { name: "Services", href: "#services" },
                    { name: "Contact", href: "#contact" },
                ]}
                ctaLabel={d.hero.cta}
                themeColor="text-teal-600"
                phone={d.info.phone}
            />

            <main>
                <Hero
                    title={d.hero.title}
                    subtitle={d.hero.subtitle}
                    stats={d.hero.stats}
                    ctaText={d.hero.cta}
                    imageSrc={d.hero.image}
                    themeColor={theme}
                />

                <About
                    title={d.about.title}
                    bio={d.about.bio}
                    specialization={d.about.specialization}
                    philosophy={d.about.philosophy}
                    themeColor={theme}
                />

                <Services
                    title="Our Medical Services"
                    items={d.services}
                    themeColor={theme}
                />

                <Features
                    title="Why Patients Trust Us"
                    items={d.features}
                    themeColor={theme}
                />

                <Testimonials
                    items={d.testimonials}
                    themeColor={theme}
                />

                <ContactSection
                    phone={d.info.phone}
                    address={d.info.address}
                    themeColor={theme}
                />
            </main>

            <Footer
                title="Dr. Sharma Clinic"
                address={d.info.address}
                phone={d.info.phone}
                mapEmbedUrl={d.info.mapEmbed}
                themeColor={theme}
            />
        </div>
    );
}
