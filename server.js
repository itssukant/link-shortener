const http = require("http");
const { shorten, resolve, stats } = require("./shortener");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "POST" && url.pathname === "/api/shorten") {
    let body = "";
    for await (const chunk of req) body += chunk;
    try {
      const { target } = JSON.parse(body || "{}");
      const code = shorten(target);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ code, shortUrl: "http://localhost:3000/" + code }));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: e.message }));
    }
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/stats/")) {
    const s = stats(url.pathname.split("/").pop());
    res.writeHead(s ? 200 : 404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(s ?? { error: "not found" }));
  }

  if (req.method === "GET" && url.pathname.length > 1) {
    const target = resolve(url.pathname.slice(1));
    if (target) {
      res.writeHead(302, { Location: target });
      return res.end();
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

if (require.main === module) {
  server.listen(3000, () => console.log("Shortener on :3000"));
}
module.exports = server;
