// hackaday: also has an RSS feed
// fast-xml-parser is used under the hood.
// xml file has been validated...
// the issue was that ofetch is returning a blob not a text, which could not be parsed by fast-xml-parser and results were empty

const hackaday = defineRSSSource("https://hackaday.com/blog/feed/")

export default defineSource({
  hackaday,
})
