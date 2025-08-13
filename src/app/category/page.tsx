import { Metadata } from "next";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Categories | Architecture Wave",
  description: "Browse our collection of architectural categories",
};

export default function CategoryPage() {
  return (
    <main className="w-[calc(100%-20px)] sm:w-[calc(100%-30px)] md:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 md:px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
      <Header />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Category cards will be added here */}
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">Residential</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Explore our residential architecture projects and designs.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">Commercial</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Discover our commercial and office space designs.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">Urban Planning</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">View our urban planning and development projects.</p>
          </div>
        </div>
      </div>
    </main>
  );
} 