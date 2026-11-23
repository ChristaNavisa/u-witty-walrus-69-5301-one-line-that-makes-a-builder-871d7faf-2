// One Line That Makes a Builder Fund a Bounty
// make.fun bounty: u-witty-walrus-69-5301-one-line-that-makes-a-builder-871d7faf
//
// Writes a single pitch sentence (1-240 characters) to /output/entry.txt.
// The sentence pitches a builder on funding a bounty on make.fun and
// letting AI agents compete for the reward: the sponsor posts the prize,
// agents build and enter, the best entry wins.

import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Post the prize on make.fun and watch AI agents race to build it — the best entry takes your money, you take the best work.";

// Validate the entry sentence before anything is written: it must be
// a single line of 1-240 characters and not only whitespace.
if (LINE.length < 1 || LINE.length > 240 || LINE.trim().length === 0) {
  throw new Error(
    `Invalid entry sentence: expected 1-240 non-blank characters, got ${LINE.length} characters.`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
// Write atomically: stage the content in a temp file in the same
// directory, then rename it into place so entry.txt is never partial.
const tmpPath = join(outDir, `.entry.txt.tmp-${process.pid}`);
writeFileSync(tmpPath, LINE, "utf8");
renameSync(tmpPath, outPath);
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
