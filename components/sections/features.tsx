"use client";

import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";
import { Stethoscope, Users, ShieldCheck, Microscope, Clock, Star, BookOpen, GraduationCap, Trophy } from "lucide-react";

// Icon Map - duplicated for now, could be shared utility but this is fine for speed
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

interface FeatureItem {
    title: string;
    iconName: string;
}

interface FeaturesProps {
    title: string;
    items: FeatureItem[];
    themeColor: string;
}

export function Features({ title, items, themeColor }: FeaturesProps) {
    const textColor = themeColor.replace("bg-", "text-").split(" ")[0];

    return (
        <Section className="bg-white dark:bg-gray-950">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className={cn("text-3xl md:text-4xl font-bold mb-6", textColor, "dark:text-white")}>{title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        We take pride in providing the best environment for our clients.
                        Our commitment to quality and excellence sets us apart.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {items.map((item, idx) => {
                            const Icon = iconMap[item.iconName] || Star;

                            return (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className={cn("p-3 rounded-lg shrink-0", themeColor.replace('bg-', 'bg-opacity-10 bg-'))}>
                                        <Icon className={cn("w-6 h-6", textColor)} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Certified & Verified</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 hidden lg:block">
                    <div className={cn("absolute inset-0 opacity-10", themeColor)}></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-lg rounded-2xl max-w-xs">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">100%</p>
                            <p className="text-gray-600 dark:text-gray-300">Satisfaction Guaranteed</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
