import axios from "axios"
import * as cheerio from 'cheerio'

const url = 'https://www.cybersport.ru/news/from/17.06.2021/to/30.06.2021'
const origin = 'https://www.cybersport.ru'

axios(url)
    .then(response => {
        let html = response.data
        let $ = cheerio.load(html)
        let news = $('.cs-news__link')
        for (let i = 0; i < news.length; i++) {
            axios(origin + news[i].attribs.href)
                .then(response => {
                    html = response.data
                    $ = cheerio.load(html)
                    let take = $('.w-puzzle__title_take')
                    if (take.length) {
                        console.log(origin + news[i].attribs.href)
                    }
                }).catch(console.error)
        }
    })
    .catch(console.error)