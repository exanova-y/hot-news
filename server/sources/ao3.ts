// server/sources/ao3.ts
import * as cheerio from "cheerio"

// case 2: AO3 does not have an API.
// use pattern: HTML scraping with oftech + cheerio

// to do: add tags later.
// add lang. add hits.

export default defineSource({
  "ao3": async () => {
    const baseURL = "https://archiveofourown.org/works"
    const html = await myFetch(baseURL)
    const $ = cheerio.load(html)
    let ao3stats: string[] = []

    const news: NewsItem[] = []
    $("li.work.blurb").each((_, el) => {
      const $work = $(el)
      const title = $work.find("h4.heading a").first().text().trim()

      const url = `https://archiveofourown.org${$work.find("h4.heading a").first().attr("href")}`
      const author = $work.find("a[rel='author']").text().trim()
      const fandom = $work.find("h5.fandoms.heading a").first().text().trim()

      const kudos = $work.find("dd.kudos").text().trim()
      const hits = $work.find("dd.hits").text().trim()
      const words = $work.find("dd.words").text().trim()

      // add only the non-empty stats to ao3stats
      if (kudos) ao3stats.push(`kudos: ${kudos}`)
      if (hits) ao3stats.push(`hits: ${hits}`)
      if (words) ao3stats.push(`words: ${words}`)

      news.push({
        id: url,
        title,
        url,
        extra: {
          info: `${author} · ${fandom} · ${ao3stats.join(" · ")}`,
          hover: $work.find("blockquote.summary").text().trim(),
        },
      })

      ao3stats = []
    })
    return news
  },
  "ao3-popular": async () => {
    // Similar implementation for popular works
  },
})
