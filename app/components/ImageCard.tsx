"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import type { Photo } from "@/models/Images";

type Props = {
  photo: Photo;
};
export default function ImageCard({ photo }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href="#" className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt={photo.alt}
          src={photo.src.large}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out object-cover",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          onLoadingComplete={(img) => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{photo.photographer}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">@leeerob</p>
    </a>
  );
}
