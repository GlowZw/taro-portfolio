import fs from "node:fs";
import path from "node:path";

// Checks whether a file exists under /public at build/render time, so
// optional assets (resume, headshot) degrade gracefully when not yet supplied.
export function publicFileExists(publicPath: string): boolean {
  try {
    const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}
