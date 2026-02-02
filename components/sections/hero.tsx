"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
    title: string;
    subtitle: string;
    stats?: string;
    ctaText: string;
    imageSrc: string;
    themeColor: string; // e.g. "bg-teal-600"
}

export function Hero({ title, subtitle, stats, ctaText, imageSrc, themeColor }: HeroProps) {
    // Parsing theme color to get text color variant
    const textColor = themeColor.replace("bg-", "text-").split(" ")[0];

    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        {stats && (
                            <div className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white dark:bg-gray-900 shadow-sm border border-gray-100/50 dark:border-gray-800 backdrop-blur-sm", textColor)}>
                                <span className="flex h-2 w-2 rounded-full bg-current mr-2 animate-pulse"></span>
                                {stats}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                            {title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className={cn("rounded-full px-8 text-lg h-12", themeColor)}>
                                {ctaText}
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-12 bg-white hover:bg-gray-50 text-gray-900 border-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
                                Learn More
                            </Button>
                        </div>
                    </motion.div>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative lg:ml-auto"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 aspect-[4/3] lg:aspect-square max-w-md lg:max-w-lg mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src={imageSrc}
                                alt="Hero Image"
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Decorative Elements */}
                            <div className={cn("absolute inset-0 opacity-10 mix-blend-overlay", themeColor)}></div>
                        </div>

                        {/* Floating Badge (Decorative) */}
                        <div className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-12 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className={cn("p-2 rounded-full bg-opacity-10", themeColor.replace('bg-', 'bg-opacity-10 bg-'))}>
                                <div className={cn("w-6 h-6 rounded-full", themeColor)}></div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Trusted by</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">1000+ Locals</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Background patterns */}
            <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-gray-100/50 dark:from-gray-900/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-50/50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        </section>
    );
}
