const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const links = new Map();
let counter = 1000;

function toBase62(n) {
  let out = "";
  while (n > 0) {
    out = ALPHABET[n % 62] + out;
    n = Math.floor(n / 62);
  }
  return out || "0";
}

function shorten(target) {
  try {
    new URL(target);
  } catch {
    throw new Error("invalid URL");
  }
  const code = toBase62(counter++);
  links.set(code, { target, clicks: 0, createdAt: new Date().toISOString() });
  return code;
}

function resolve(code) {
  const link = links.get(code);
  if (!link) return null;
  link.clicks++;
  return link.target;
}

function stats(code) {
  const link = links.get(code);
  return link ? { code, ...link } : null;
}

module.exports = { shorten, resolve, stats, toBase62 };
