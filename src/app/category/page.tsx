import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Architecture Wave",
  description: "Browse our collection of architectural categories",
};

export default function CategoryPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Category cards will be added here */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Residential</h2>
          <p className="text-sm sm:text-base text-gray-600">Explore our residential architecture projects and designs.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Commercial</h2>
          <p className="text-sm sm:text-base text-gray-600">Discover our commercial and office space designs.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Urban Planning</h2>
          <p className="text-sm sm:text-base text-gray-600">View our urban planning and development projects.</p>
        </div>
      </div>
    </main>
  );
} 