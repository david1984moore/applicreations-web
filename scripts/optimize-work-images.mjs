#!/usr/bin/env node
/**
 * Optimizes Work section images for web display.
 * Source images are mobile screenshots (~1–2.5 MB each). We display at ~200–400px width.
 * This script resizes to max 400px width (2x for retina) and compresses to ~82% quality.
 */
import sharp from "sharp";
import { readdir, stat, rename } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "public", "images", "work");
const MAX_WIDTH = 400;
const QUALITY = 82;

async function optimize() {
  const files = await readdir(SRC);
  const jpgs = files.filter((f) => f.endsWith(".jpg"));

  for (const file of jpgs) {
    const inputPath = join(SRC, file);
    const tempPath = join(SRC, `.tmp-${file}`);
    const { size: before } = await stat(inputPath);

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(tempPath);

    await rename(tempPath, inputPath);

    const { size: after } = await stat(inputPath);
    const saved = ((1 - after / before) * 100).toFixed(2);
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (${saved}% smaller)`);
  }
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
