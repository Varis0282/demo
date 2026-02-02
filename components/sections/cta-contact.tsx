"use client";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

interface ContactProps {
    phone: string;
    address: string;
    email?: string;
    themeColor: string;
}

export function ContactSection({ phone, address, email, themeColor }: ContactProps) {
    return (
        <Section id="contact" className="bg-white dark:bg-gray-950">
            <div className={cn("rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden", themeColor)}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold">Ready to get started?</h2>
                    <p className="text-lg md:text-xl opacity-90">
                        Contact us today to schedule your appointment or learn more about our services.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 h-14 px-8 text-lg w-full sm:w-auto">
                            <a href={`tel:${phone}`} className="flex items-center">
                                <Phone className="w-5 h-5 mr-2 inline" />
                                Call {phone}
                            </a>
                        </Button>
                        <Button size="lg" className="bg-green-500 text-white hover:bg-green-600 h-14 px-8 text-lg w-full sm:w-auto border-transparent">
                            <a
                                href={`https://api.whatsapp.com/send?phone=${phone}&text=Hello%2C%20I%20am%20interested%20in%20your%20services.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                WhatsApp
                            </a>
                        </Button>
                    </div>

                    <div className="pt-8 border-t border-white/20 grid md:grid-cols-2 gap-4 text-left">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 mt-1 opacity-80" />
                            <p className="opacity-90">{address}</p>
                        </div>

                        {email && (
                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 opacity-80" />
                                <p className="opacity-90">{email}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}
