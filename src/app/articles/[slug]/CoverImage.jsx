"use client";

export default function CoverImage({ src, alt }) {
  return (
    <div className="max-w-5xl mx-auto mb-6 sm:mb-8 h-64 sm:h-80 md:h-96 lg:h-[500px] relative rounded-2xl sm:rounded-[45px] overflow-hidden mt-8 sm:mt-12 md:mt-10">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-2xl sm:rounded-[45px] shadow-lg"
      />
    </div>
  );
} 