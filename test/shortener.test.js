const test = require("node:test");
const assert = require("node:assert");
const { shorten, resolve, stats, toBase62 } = require("../shortener");

test("base62 encoding", () => {
  assert.strictEqual(toBase62(0), "0");
  assert.strictEqual(toBase62(61), "Z");
  assert.strictEqual(toBase62(62), "10");
});

test("shorten + resolve + stats", () => {
  const code = shorten("https://example.com/page");
  assert.strictEqual(resolve(code), "https://example.com/page");
  assert.strictEqual(stats(code).clicks, 1);
});

test("rejects invalid URLs", () => {
  assert.throws(() => shorten("not a url"));
});
