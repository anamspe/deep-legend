//Parse function to maintain text structure after translation

export const parseSRT = (text) => {
  const blocks = text.split(/\r?\n\r?\n/);
  console.log("Blocks found:", blocks.length);
}

