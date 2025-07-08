//Parse function to maintain text structure after translation

export const parseSRT = (text) => {
  const blocks = text.split(/\r?\n\r?\n/);
  console.log("Blocks found:", blocks.length);

  const subtitles = blocks.map((block) => {
    const lines = block.split(/\r?\n/).filter(Boolean); // splits block by line and ignores empty lines

    if (lines.length < 3) return null; //skip blocks with no caption text

    const id = parseInt(lines[0]);
    const [start, end] = lines[1].split(" --> ");
    const subtitleText = lines.slice(2).join("\n"); // handle multiline subtitles

    return {
      id,
      start,
      end,
      text: subtitleText,
    };
  }).filter(Boolean); // remove nulls from the final array if any

  console.log("Parsed subtitles:", subtitles)
}

