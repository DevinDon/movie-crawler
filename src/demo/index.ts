import { Crawler } from '../main';

async function main() {

  const crawler = new Crawler();

  // const result = await crawler.search('abc');
  const detail = await crawler.getDetail('https://www.80s.tw/movie/6635');

  // console.table(result);
  console.table(detail);

}

main();
