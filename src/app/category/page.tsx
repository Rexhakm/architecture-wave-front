import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Architecture Wave",
  description: "Browse our collection of architectural categories",
};

export default function CategoryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category cards will be added here */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Residential</h2>
          <p className="text-gray-600">Explore our residential architecture projects and designs.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Commercial</h2>
          <p className="text-gray-600">Discover our commercial and office space designs.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Urban Planning</h2>
          <p className="text-gray-600">View our urban planning and development projects.</p>
        </div>
      </div>
    </main>
  );
} 