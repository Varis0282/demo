import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
    title: string;
    address: string;
    phone: string;
    email?: string;
    mapEmbedUrl: string; // url source
    themeColor?: string; // Tailwind class
}

export function Footer({ title, address, phone, mapEmbedUrl, themeColor = "bg-gray-900" }: FooterProps) {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">

                    {/* Brand & Contact */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                        <div className="space-y-4 text-gray-600">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-1 shrink-0 text-gray-400" />
                                <p className="max-w-xs leading-relaxed">{address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 shrink-0 text-gray-400" />
                                <p>{phone}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2 rounded-full w-full md:w-auto">
                                <MessageCircle className="w-5 h-5" />
                                Chat on WhatsApp
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links (Optional, maybe just generic) */}
                    <div className="hidden lg:block space-y-6">
                        <h4 className="font-semibold text-gray-900">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="#home" className="hover:text-gray-900">Home</Link></li>
                            <li><Link href="#about" className="hover:text-gray-900">About Us</Link></li>
                            <li><Link href="#services" className="hover:text-gray-900">Services</Link></li>
                            <li><Link href="#contact" className="hover:text-gray-900">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="space-y-6 h-64 rounded-xl overflow-hidden bg-gray-200 border border-gray-100 shadow-sm">
                        <iframe
                            src={mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Map Location"
                        />
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {title}. All rights reserved.</p>
                    <p>Designed for Local Business.</p>
                </div>
            </div>
        </footer>
    );
}
