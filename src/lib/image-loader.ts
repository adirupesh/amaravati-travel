"use client";
import type { ImageLoaderProps } from "next/image";
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 75));
  return url.toString();
}
