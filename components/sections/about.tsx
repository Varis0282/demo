"use client";

import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AboutProps {
    title: string;
    bio: string;
    specialization?: string; // Doctor specific
    philosophy?: string; // Doctor specific
    methodology?: string; // Coaching specific
    results?: string; // Coaching specific
    themeColor: string;
}

export function About({ title, bio, specialization, philosophy, methodology, results, themeColor }: AboutProps) {
    const textColor = themeColor.replace("bg-", "text-").split(" ")[0];

    return (
        <Section id="about" className="bg-white dark:bg-gray-950 scroll-mt-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", textColor, "dark:text-white")}>{title}</h2>
                <div className={cn("h-1.5 w-20 mx-auto rounded-full", themeColor)}></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                    <p>{bio}</p>
                    {specialization && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-l-4 border-teal-500 rounded-r-lg">
                            <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1">Specialization</span>
                            {specialization}
                        </div>
                    )}
                    {methodology && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
                            <span className="font-semibold text-gray-900 dark:text-gray-100 block mb-1">Methodology</span>
                            {methodology}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {philosophy && (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-teal-900 dark:text-teal-100 mb-2">Our Philosophy</h3>
                            <p className="text-teal-800/80 dark:text-teal-200/80">{philosophy}</p>
                        </motion.div>
                    )}

                    {results && (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-2">Our Results</h3>
                            <p className="text-orange-800/80 dark:text-orange-200/80">{results}</p>
                        </motion.div>
                    )}

                    {/* Fallback generic box if neither present (shouldn't happen with correct data) */}
                    {!philosophy && !results && (
                        <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                            <p>Committed to excellence.</p>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}
