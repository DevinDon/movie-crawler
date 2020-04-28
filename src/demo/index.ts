import { DoubanCrawler } from '../main/crawler/douban.crawler';
import { PiankuCrawler } from '../main/crawler/pianku.crawler';
async function main() {

  // const key = '396d9efd64fac0e111c2d634638868c4';
  // const iv = '.pianku.tv';

  // const document = new JSDOM(readFileSync('search.html')).window.document;
  // /** 在线播放页面 */
  // const list = [...
  //   document.querySelectorAll('.player.ckp > li > a')
  // ].map(v => 'https://www.pianku.tv/' + v.getAttribute('href'));

  // // document.scripts[14].textContent.match(/url: '(.*)'/)[1]

  // const c = new DoubanCrawler();
  // const movie = await c.movie('25887288');

  const c = new PiankuCrawler();
  // const movie = await c.getDownloads('wNnZjYidja');
  const movie = await c.search('魔发奇缘');

  console.log(movie);

}

main();
