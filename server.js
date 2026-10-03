/* ============================================================
   SikBodo — optional development server
   Serves the static site locally. Uses ONLY Node's built-in
   modules: there are no dependencies, and nothing here is needed
   to use the platform — opening index.html works on its own.

     node server.js        → http://localhost:3000
   ============================================================ */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

/** Resolve a request path to a file inside ROOT, or null if it escapes. */
function resolve(urlPath) {
  let rel;
  try {
    rel = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  } catch (e) {
    return null; // malformed percent-encoding
  }
  if (rel.endsWith("/")) rel += "index.html";
  if (rel === "") rel = "/index.html";

  // path.resolve normalises "..", so the prefix check below is the guard
  const target = path.resolve(ROOT, "." + rel);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;

  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    const index = path.join(target, "index.html");
    if (fs.existsSync(index)) return index;
  }
  if (fs.existsSync(target)) return target;

  // extension-less request: try .html, the way GitHub Pages does
  const withHtml = target + ".html";
  if (fs.existsSync(withHtml)) return withHtml;

  return null;
}

function send(res, status, file, extra) {
  const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  const body = fs.readFileSync(file);
  res.writeHead(status, Object.assign(
    {
      "Content-Type": type,
      "Content-Length": body.length,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    extra || {}
  ));
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }

  const file = resolve(req.url || "/");
  if (!file) {
    const notFound = path.join(ROOT, "404.html");
    if (fs.existsSync(notFound)) return send(res, 404, notFound);
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }

  try {
    send(res, 200, file);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`SikBodo dev server → http://${HOST}:${PORT}`);
  console.log("Static only. No dependencies. The site also works by opening index.html directly.");
});
