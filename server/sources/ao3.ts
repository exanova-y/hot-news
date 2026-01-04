// server/sources/ao3.ts
import * as cheerio from "cheerio"

// case 2: AO3 does not have an API. 
// HTML scraping with oftech + cheerio

// to do: add tags later.
// add lang. add hits.

export default defineSource({
    "ao3": async () => {
        const baseURL = "https://archiveofourown.org/works"
        const html = await myFetch(baseURL)
        const $ = cheerio.load(html)

        const news: NewsItem[] = []
        $("li.work.blurb").each((_, el) => {
            const $work = $(el)
            const title = $work.find("h4.heading a").first().text().trim()

            const url = "https://archiveofourown.org" + $work.find("h4.heading a").first().attr("href")
            const author = $work.find("a[rel='author']").text().trim()
            const fandom = $work.find("h5.fandoms.heading a").first().text().trim()

            const kudos = $work.find("dd.kudos").text().trim()
            // const hits = $work.find("dd.hits").text().trim()
            const words = $work.find("dd.words").text().trim()


            news.push({
                id: url,
                title: title,
                url: url,
                extra: {
                    info: `${author} · ${fandom} `,
                    hover: $work.find("blockquote.summary").text().trim()
                }
            })
        })
        return news
    },
    "ao3-popular": async () => {
        // Similar implementation for popular works
    }
})