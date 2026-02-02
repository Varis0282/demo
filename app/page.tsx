import Link from "next/link";
import { ArrowRight, Stethoscope, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Local Business Website <span className="text-blue-600">Variants</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a demo variant to view. These templates are production-ready, SEO-friendly, and optimized for local Indian businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Doctor Card */}
          <Link href="/doctor" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-teal-500 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Stethoscope className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor / Clinic</h2>
              <p className="text-gray-500 mb-8 flex-grow">
                Clean, trust-building design with appointment booking, services grid, and patient testimonials.
              </p>
              <span className="inline-flex items-center text-teal-600 font-semibold group-hover:underline">
                View Demo <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Coaching Card */}
          <Link href="/coaching" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-blue-500 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coaching Institute</h2>
              <p className="text-gray-500 mb-8 flex-grow">
                Energetic, result-oriented layout with course catalog, faculty showcase, and success stories.
              </p>
              <span className="inline-flex items-center text-blue-600 font-semibold group-hover:underline">
                View Demo <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        <div className="pt-12 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Demo Project.
        </div>
      </div>
    </main>
  );
}
