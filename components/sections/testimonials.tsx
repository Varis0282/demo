"use client";

import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialItem {
    name: string;
    text: string;
    rating: number; // 1-5
}

interface TestimonialsProps {
    items: TestimonialItem[];
    themeColor: string;
}

export function Testimonials({ items, themeColor }: TestimonialsProps) {
    const textColor = themeColor.replace("bg-", "text-").split(" ")[0];

    return (
        <Section className="bg-gray-50 dark:bg-gray-950">
            <div className="text-center mb-16">
                <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", textColor, "dark:text-white")}>What People Say</h2>
                <div className={cn("h-1 w-24 mx-auto", themeColor)}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden">

                        {/* Quote icon background */}
                        <div className="absolute top-4 right-6 text-9xl leading-none text-gray-50 dark:text-gray-800 opacity-50 font-serif select-none">"</div>

                        <div className="flex gap-1 mb-6 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("w-5 h-5", i < item.rating ? "fill-current" : "text-gray-200 fill-gray-200 dark:text-gray-700 dark:fill-gray-700")} />
                            ))}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 leading-relaxed">
                            "{item.text}"
                        </p>

                        <div className="mt-auto flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-white", themeColor)}>
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{item.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Verified Client</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
