import type { ImageMetadata } from "astro";
import logoimg from "../assets/r-sec_logo.jpg";

export default function getOptimizedImages(
  imgPath: string | string[],
  globedImages: Record<string, unknown>,
): Record<string, ImageMetadata> {
  if (typeof imgPath === "string") {
    if (globedImages[imgPath]) {
      const mod: any = globedImages[imgPath];
      let result: Record<string, ImageMetadata> = {};
      result[imgPath] = mod.default;
      return result;
    } else {
      let result: Record<string, ImageMetadata> = {};
      result[imgPath] = logoimg;
      return result;
    }
  } else {
    let result: Record<string, ImageMetadata> = {};
    for (let value of imgPath) {
      if (globedImages[value]) {
        const mod: any = globedImages[value];
        result[value] = mod.default;
      } else {
        result[value] = logoimg;
      }
    }
    return result;
  }
}