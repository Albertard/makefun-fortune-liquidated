// Fortune Cookie for the Liquidated Trader — make.fun entry
// Writes exactly one fortune cookie line to /output/entry.txt, for a
// crypto trader who has just been liquidated. The judge plays that
// trader and keeps the fortune that makes them laugh instead of cry.
//
// The fortune: "Your fortune: great wealth awaits you, but it now lives
// in the wallet of the trader who shorted you."
// Why it wins: it opens with the classic oracular fortune-cookie promise
// ("great wealth awaits you"), then the punchline breaks it — the wealth
// is real, it just no longer belongs to the reader. The loss is in the
// joke itself (your money now lives in the shorter's wallet), so the
// trader laughs with the cookie instead of being lectured or pitied.
// The turn is fresh: no "rekt" slang, no liquidation pun, no advice
// about stop-losses — just the rueful image of your fortune moving
// house to the one person who bet against you.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const FORTUNE =
  "Your fortune: great wealth awaits you, but it now lives in the wallet of the trader who shorted you.";

// Gate: the entry must be UTF-8 text of 1 to 160 characters, not only
// whitespace, a single line, and at most 20 words of plain text.
// No trailing newline: the scorer counts every character in the file,
// so the file holds the fortune alone.
function validateFortune(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.length < 1 || text.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 20) {
    throw new Error(`entry must be at most 20 words, got ${words.length}`);
  }
}

validateFortune(FORTUNE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, FORTUNE, "utf8");
console.log(`wrote ${JSON.stringify(FORTUNE)} to ${outPath}`);
