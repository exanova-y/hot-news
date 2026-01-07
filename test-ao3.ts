// notes
// sometimes the stats are incomplete, e.g. having no kudos.

import * as cheerio from "cheerio"
import { $fetch } from "ofetch"

// Simple fetch wrapper (similar to myFetch in the project)
const myFetch = $fetch.create({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  },
  timeout: 10000, // 10000ms = 10s
  retry: 3,
})

async function testAO3() {
  const baseURL = "https://archiveofourown.org/works"
  const html = await myFetch(baseURL)
  const $ = cheerio.load(html)

  // Find all work items
  const works = $("li.work.blurb")
  console.log(`found ${works.length} works\n`)

  // Process each work
  const news: any[] = []
  works.each((index, el) => {
    const $work = $(el)

    // Extract data
    const title = $work.find("h4.heading a").first().text().trim()
    const href = $work.find("h4.heading a").first().attr("href")
    const url = href ? `https://archiveofourown.org${href}` : ""
    const author = $work.find("a[rel='author']").text().trim()
    const fandom = $work.find("h5.fandoms.heading a").first().text().trim()
    const summary = $work.find("blockquote.summary").text().trim()
    const kudos = $work.find("dd.kudos").text().trim()
    const hits = $work.find("dd.hits").text().trim()
    const words = $work.find("dd.words").text().trim()

    const work = {
      index: index + 1,
      title,
      url,
      author,
      fandom,
      summary: summary.substring(0, 100) + (summary.length > 100 ? "..." : ""),
      stats: {
        kudos,
        hits,
        words,
      },
    }

    // all works have title, author, fandom, url.

    news.push(work)

    // for each of the non empty stats, log the value
    for (const datapoint of [work, title, author, fandom, url, kudos, hits, words, summary]) {
      if (datapoint) {
        console.log(`   ${datapoint}: ${datapoint}`)
      }
    }
  })

  console.log(`\n\nsuccessfully scraped ${news.length} works!`)
  console.log(`\n Summary:`)
  console.log(`   Total works: ${news.length}`)
  console.log(`   Works with titles: ${news.filter(w => w.title).length}`)
  console.log(`   Works with authors: ${news.filter(w => w.author).length}`)
  console.log(`   Works with fandoms: ${news.filter(w => w.fandom).length}`)

  // Return the data in the format expected by the app
  const formattedNews = news.map(work => ({
    id: work.url,
    title: work.title,
    url: work.url,
    extra: {
      info: `${work.author} · ${work.fandom}`,
      hover: work.summary,
    },
  }))

  console.log(`\n📦 Formatted data (first 3 items):`)
  console.log(JSON.stringify(formattedNews.slice(0, 3), null, 2))
}

// Run the test
testAO3()
