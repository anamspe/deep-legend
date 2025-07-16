export const buildSRT = (text) => {
  return text
  .map(({id, start, end, translation}) => {
    return `${id}\n${start} --> ${end}\n${translation}\n`
  })
  .join("\n");
}
