
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/cta-contact";
import { coachingData } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Excel Institute - Best JEE/NEET Coaching in Indore",
    description: "Premier coaching institute for JEE, NEET, and Foundation courses with expert faculty and proven results.",
};

export default function CoachingPage() {
    const d = coachingData;
    const theme = d.colors.primary; // "bg-blue-600 hover:..."

    return (
        <div className="min-h-screen font-sans">
            <Navbar
                title="Excel Institute"
                links={[
                    { name: "Home", href: "#home" },
                    { name: "About", href: "#about" },
                    { name: "Courses", href: "#services" },
                    { name: "Results", href: "#contact" }, // Directing to bottom for now
                ]}
                ctaLabel={d.hero.cta}
                themeColor="text-blue-600"
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
                    methodology={d.about.methodology}
                    results={d.about.results}
                    themeColor={theme}
                />

                <Services
                    title="Our Courses"
                    items={d.courses}
                    themeColor={theme}
                />

                <Features
                    title="Why Choose Excel?"
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
                    email={d.info.email}
                    themeColor={theme}
                />
            </main>

            <Footer
                title="Excel Institute"
                address={d.info.address}
                phone={d.info.phone}
                email={d.info.email}
                mapEmbedUrl={d.info.mapEmbed}
                themeColor={theme}
            />
        </div>
    );
}
