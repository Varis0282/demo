"use client";

import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Stethoscope, Users, ShieldCheck, Microscope, Clock, Star, BookOpen, GraduationCap, Trophy } from "lucide-react";

// Icon Map
const iconMap: Record<string, any> = {
    Stethoscope,
    Users,
    ShieldCheck,
    Microscope,
    Clock,
    Star,
    BookOpen,
    GraduationCap,
    Trophy
};

interface ServiceItem {
    title: string;
    description: string;
    iconName: string; // Changed from icon component to string
    duration?: string;
}

interface ServicesProps {
    title: string;
    items: ServiceItem[];
    themeColor: string;
}

export function Services({ title, items, themeColor }: ServicesProps) {
    const textColor = themeColor.replace("bg-", "text-").split(" ")[0];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <Section id="services" className="bg-gray-50 dark:bg-gray-950 scroll-mt-20">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", textColor, "dark:text-white")}>{title}</h2>
                <p className="text-gray-500 dark:text-gray-400">We provide top-notch services tailored to your needs.</p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {items.map((item, idx) => {
                    const Icon = iconMap[item.iconName] || Star; // Fallback

                    return (
                        <motion.div
                            key={idx}
                            variants={itemAnim}
                            className="group bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-transparent"
                        >
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-opacity-100 bg-opacity-10", themeColor, themeColor.replace('bg-', 'text-'))}>
                                <Icon className={cn("w-6 h-6", themeColor.replace('bg-', 'text-'), "group-hover:text-white transition-colors")} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>

                            {item.duration && (
                                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300">
                                    {item.duration}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </Section>
    );
}
