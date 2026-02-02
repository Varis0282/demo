"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
    title: string;
    links: { name: string; href: string }[];
    ctaLabel: string;
    ctaHref?: string; // Anchor link or page
    themeColor?: string; // Tailwind class like "text-teal-600"
    phone?: string;
}

export function Navbar({ title, links, ctaLabel, ctaHref = "#contact", themeColor = "text-blue-600", phone }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent dark:border-border",
                scrolled
                    ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-gray-100 dark:border-gray-800"
                    : "bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className={cn("text-xl md:text-2xl font-bold tracking-tight", themeColor)}>
                        {title}
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {phone && (
                            <a href={`tel:${phone}`} className="flex items-center text-gray-600 dark:text-gray-400 gap-2 mr-2 text-sm font-semibold"><Phone className="w-4 h-4" /> {phone}</a>
                        )}

                        <ModeToggle />

                        <Button className={cn("rounded-full px-6", themeColor.replace('text-', 'bg-').replace('600', '600 hover:bg-opacity-90 text-white'))}>
                            <Link href={ctaHref} onClick={(e) => { e.preventDefault(); document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' }) }}>
                                {ctaLabel}
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button - And Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <ModeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 absolute w-full shadow-lg">
                    <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button className="w-full mt-4" size="lg">
                            {ctaLabel}
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
