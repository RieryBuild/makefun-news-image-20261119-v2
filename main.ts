// main.ts — make.fun news-image-20261119 v2 entry
// "One day, one line" — 50 stories from Thursday 19 November 2026,
// 13 illustrated moments on a single UTC timeline, a numbered-pin world
// map, a day-in-numbers strip and a date-check footer.
//
// Node 22, stdlib only, no network, no randomness. The image itself is
// pre-rendered (see NEWS.md for the research and the build notes); this
// program only verifies it and writes it to MAKEFUN_OUTPUT_DIR/entry.png.
// Two runs write byte-identical output.
import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "entry.png");
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
// sha256 of entry.png as rendered by the v2 build (compose.py).
const EXPECTED_SHA256 =
  "1605b4a3f5a60cf797ee15bf8db6392dbfd8ef6fb322473febb0440b11521dd5";
const PNG_MAGIC = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function sha256Hex(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

// Verify the PNG magic bytes and the IHDR width/height (bytes 16-23).
function verifyPng(buf: Buffer): void {
  if (buf.length < 33) {
    fail(`entry.png is ${buf.length} bytes, too short to be a PNG`);
  }
  if (!buf.subarray(0, 8).equals(PNG_MAGIC)) {
    fail("entry.png does not start with the PNG magic bytes");
  }
  if (buf.toString("ascii", 12, 16) !== "IHDR") {
    fail("entry.png has no IHDR chunk where one is expected");
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    fail(
      `entry.png is ${width}x${height}, expected ` +
        `${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
    );
  }
}

// Remove everything inside a directory, never the directory itself:
// the grader may bind-mount the output dir, so rmSync(outDir) would fail.
// One stubborn entry must not leave the rest behind: warn and continue.
function wipeDirContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    try {
      rmSync(join(dir, name), { recursive: true, force: true });
    } catch (err) {
      console.error(`warning: could not remove ${name}: ${err}`);
    }
  }
}

function main(): void {
  const outDirRaw = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDirRaw) {
    fail("MAKEFUN_OUTPUT_DIR is not set");
  }
  const outDir = resolve(outDirRaw);

  let png: Buffer;
  try {
    if (!statSync(SRC).isFile()) {
      fail(`entry.png at ${SRC} is not a regular file`);
    }
    png = readFileSync(SRC);
  } catch (err) {
    fail(`cannot read entry.png: ${err}`);
  }
  verifyPng(png);
  const hash = sha256Hex(png);
  if (hash !== EXPECTED_SHA256) {
    fail(
      `entry.png sha256 mismatch: got ${hash}, ` +
        `expected ${EXPECTED_SHA256}`,
    );
  }

  try {
    mkdirSync(outDir, { recursive: true });
  } catch (err) {
    fail(`cannot create output directory ${outDir}: ${err}`);
  }
  if (!statSync(outDir).isDirectory()) {
    fail(`${outDir} exists but is not a directory`);
  }
  try {
    wipeDirContents(outDir);
  } catch (err) {
    fail(`cannot clear output directory ${outDir}: ${err}`);
  }
  const outPath = join(outDir, "entry.png");
  // Write to a temp file in the same directory, then rename atomically,
  // so a killed run never leaves a truncated entry.png behind.
  const tmpPath = join(outDir, `.entry.png.${process.pid}.tmp`);
  try {
    writeFileSync(tmpPath, png);
    renameSync(tmpPath, outPath);
  } catch (err) {
    try {
      rmSync(tmpPath, { force: true });
    } catch {
      // best effort; the fail below is what matters
    }
    fail(`cannot write ${outPath}: ${err}`);
  }

  let written: Buffer;
  try {
    written = readFileSync(outPath);
  } catch (err) {
    fail(`cannot re-read ${outPath}: ${err}`);
  }
  if (sha256Hex(written) !== EXPECTED_SHA256) {
    fail("written entry.png failed its post-write sha256 check");
  }
  console.log(`wrote ${outPath} (${png.length} bytes, sha256=${hash})`);
}

main();
