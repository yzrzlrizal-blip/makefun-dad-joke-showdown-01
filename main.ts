// Dad Joke Showdown — make.fun entry (program/v1).
//
// The program writes one original dad joke to /output/entry.txt:
// a single line, at most 200 characters, told the way a father would
// tell it across the dinner table — setup short, punchline at the end.
// The joke is fixed and deterministic, so every run writes exactly
// the same text.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. A door that loses it laughing: "unhinged" does double
// duty — a door coming off its hinges, and a person cracking up.
// Clean, fresh, and it lands on the first read out loud. At 57
// characters it sits well inside the gate's 200-character cap, with
// the punchline ("unhinged") as the very last word.
const JOKE =
  "I told my front door a joke. It came completely unhinged.";

const MAX_CHARS = 200;

// The grader sets MAKEFUN_OUTPUT_DIR; OUTPUT_DIR is the local-test
// override, and /output is the default the rules name.
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";

function main(): void {
  if (JOKE.length < 1 || JOKE.length > MAX_CHARS) {
    throw new Error(`joke must be 1-${MAX_CHARS} characters, got ${JOKE.length}`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, "entry.txt");
  writeFileSync(outPath, JOKE, "utf8");
  console.log(`wrote ${outPath} (${JOKE.length} chars)`);
  console.log(JOKE);
}

main();
