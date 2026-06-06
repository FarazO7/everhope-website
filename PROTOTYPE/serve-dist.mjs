// Tiny static server for the built ./dist (local preview / verification only — not used in
// deployment, where Vercel serves dist directly). Resolves dist relative to THIS file so the
// working directory doesn't matter. SPA fallback to index.html for client routing.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist");
const PORT = process.env.PORT || 5173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    let filePath = normalize(join(DIST, urlPath));
    if (!filePath.startsWith(DIST)) filePath = join(DIST, "index.html"); // traversal guard

    let body;
    try {
      body = await readFile(filePath);
    } catch {
      body = await readFile(join(DIST, "index.html")); // SPA fallback
      filePath = "index.html";
    }
    res.writeHead(200, { "Content-Type": TYPES[extname(filePath)] || "application/octet-stream" });
    res.end(body);
  } catch (e) {
    res.writeHead(500);
    res.end("server error: " + e.message);
  }
});

server.on("error", (e) => console.error("LISTEN_ERR", e.code, e.message));
server.listen(PORT, () => console.log(`Serving dist on http://localhost:${PORT}`));
