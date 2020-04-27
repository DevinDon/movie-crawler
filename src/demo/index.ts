import { Crawler } from '../main';

async function main() {

  const crawler = new Crawler();

  const result = await crawler.search('魔发奇缘');
  const detail = await crawler.getDetail('https://www.80s.tw/movie/6587');
  const detail2 = await crawler.getDetail('https://www.80s.tw/movie/24978');
  const detail3 = await crawler.getDetail('https://www.80s.tw/movie/7417');

  // console.table(result);
  console.table(detail);

}

main();
