const superAgent = require('superagent');
const cheerio = require('cheerio');

const { REGION_CONFIG, HOST } =  require('../constant');

const crawlingNews = (url, listSelector, host) => {
  return new Promise((resolve, reject) => {
    superAgent
      .get(url)
      .end((err, res) => {
        if (err) return reject({ message: '网络出错了，请稍后重试' });

        const $ = cheerio.load(res.text);
        const children = [...$(listSelector)];
        const newsList = [];
        
        children.forEach(item => {
          const $item = $(item);
          const $news = $item.children('a');
          const $date = $item.children('span');
          const title = $news.attr('title');
          const href = $news.attr('href');
          const date = $date.html();

          newsList.push({
            title,
            href: href.indexOf('http') > -1 ?  href : host + href,
            date
          });
        });
        return resolve(newsList);
      });
  })
};

const getUrl = (url, page) => {
  return `${url}${page}.html`;
}


exports.getNews = (region, page = 1) => {
  const config = REGION_CONFIG[region];
  if (!config) return Promise.reject({ message: '请求的区域暂未录入' });
  const { url, selector } = config;
  const host = HOST[region];

  console.log('url', url, selector);

  return crawlingNews(getUrl(url, page), selector, host);
}
