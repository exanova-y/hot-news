// Slashdot RSS feed, with a User-Agent header in attempt to avoid 403

import type { NewsItem } from "@shared/types"

async function fetchSlashdotRSS(url: string): Promise<NewsItem[]> {
  // Fetch RSS with explicit headers to avoid 403
  await myFetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      "Accept": "application/rss+xml, application/xml, text/xml, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://slashdot.org/",
    },
  })

  // Parse RSS (rss2json will use myFetch internally)
  const data = await rss2json(url)
  if (!data?.items.length) throw new Error("Cannot fetch Slashdot RSS")

  return data.items.map(item => ({
    title: item.title,
    url: item.link,
    id: item.link,
    pubDate: item.created,
  }))
}

const main = defineSource(async () => {
  return await fetchSlashdotRSS("https://rss.slashdot.org/Slashdot/slashdotMain")
})

const science = defineSource(async () => {
  return await fetchSlashdotRSS("https://rss.slashdot.org/Slashdot/slashdotScience")
})

export default defineSource({
  "slashdot": main,
  "slashdot-science": science,
})
