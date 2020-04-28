import { DoubanCrawler } from '../main/crawler/douban.crawler';
import { PiankuCrawler } from '../main/crawler/pianku.crawler';
import { Movie } from '../main';

async function main() {

  // const key = '396d9efd64fac0e111c2d634638868c4';
  // const iv = '.pianku.tv';

  // const document = new JSDOM(readFileSync('search.html')).window.document;
  // /** 在线播放页面 */
  // const list = [...
  //   document.querySelectorAll('.player.ckp > li > a')
  // ].map(v => 'https://www.pianku.tv/' + v.getAttribute('href'));

  // // document.scripts[14].textContent.match(/url: '(.*)'/)[1]

  const c = new DoubanCrawler();
  // const result = await c.result('26417164');
  // const result = await c.search('魔发奇缘');
  const result = await c.tags();
  const result2 = await c.suggest();
  const result3 = await c.suggest('热门', 100);

  // const c = new PiankuCrawler();
  // const result = await c.movieByID('25887288');
  // const result = await c.getDownloads('wNnZjYidja');
  // const result = await c.search('25887288');

  console.log(result);

}

main();
