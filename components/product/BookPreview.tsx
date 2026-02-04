"use client";

import dynamic from "next/dynamic";

// Dynamically import Book3D with no SSR to avoid Canvas issues during build/server render
const Book3D = dynamic(() => import("./Book3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-navy-deep/5 rounded-lg">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
});

interface BookPreviewProps {
  coverImage: string;
  backImage?: string;
  title?: string;
  author?: string;
}

export function BookPreview({ coverImage, backImage, title, author }: BookPreviewProps) {
  return (
    <div className="relative w-[300px] h-[450px] mx-auto">
      <Book3D
        coverImage={coverImage}
        backImage={backImage}
        className="w-full h-full"
      />

      {/* Optional: Add instructions or overlay if needed, 
          though OrbitControls usually makes it intuitive */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-60">
        <p className="text-xs text-muted-foreground">Drag to rotate</p>
      </div>
    </div>
  );
}
