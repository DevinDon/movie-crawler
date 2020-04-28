import { JSDOM } from 'jsdom';
import { get } from 'superagent';
import { Artist, Download, Movie, Result } from '../model';
import { BaseCrawler } from "./base.crawler";

interface PiankuResult {
  title: string;
  url: string;
  img: string;
  year: string;
  type: string;
  /** 英文名称 */
  ename: string;
}

/**
 * 片库爬虫
 *
 * `www.pianku.tv`
 */
export class PiankuCrawler extends BaseCrawler {

  private searchLink = 'https://www.pianku.tv/s/ajax.php';
  private movieLink = 'https://www.pianku.tv/mv/';
  private downloadLink = 'https://www.pianku.tv/ajax/downurl/';

  constructor() {
    super(
      'www.pianku.tv',
      {
        Host: 'www.pianku.tv',
        Origin: 'https://www.pianku.tv',
        Referer: 'https://www.pianku.tv'
      }
    );
  }

  artist(uri: string): Promise<Artist> {
    throw new Error("Method not implemented.");
  }

  async movie(uri: string): Promise<Movie> {
    return {
      id: await this.getDoubanID(uri),
      links: [this.movieLink + uri + '.html'],
      downloads: await this.getDownloads(uri)
    } as any;
  }

  /**
   * 搜索电影
   *
   * `GET https://www.pianku.tv/s/ajax.php?q={{keyword}}`
   */
  async search(keyword: string): Promise<Result[]> {
    const response = await get(this.searchLink + '?q=' + encodeURIComponent(keyword))
    const results: PiankuResult[] = JSON.parse(response.text).data;
    return results.map(result => ({
      title: result.title,
      image: result.img,
      url: this.header.Origin + result.url,
      type: result.type,
      year: result.year
    }));
  }

  /**
   * 解析出豆瓣 ID。
   */
  private async getDoubanID(uri: string): Promise<string | undefined> {
    const response = await get(this.movieLink + uri + '.html').set(this.header);
    const document = new JSDOM(response.text).window.document;
    const link: string | undefined = document.querySelector('.douban0 > a')?.getAttribute('href') || undefined;
    const id = link && link[link.length - 1] === '/'
      ? /subject\/(.+)\//.test(link) && link.match(/subject\/(.+)\//)![1]
      : link?.replace('https://movie.douban.com/subject/', '');
    return id || undefined;
  }

  /**
   * 解析视频地址。
   *
   * @param uri uri
   */
  public async getDownloads(uri: string): Promise<Download[]> {
    const response = await get(this.downloadLink + uri + '_mv/').set(this.header);
    const document = new JSDOM(response.text).window.document;
    /** 直接解析在线播放地址，缓存 m3u8 文件列表 */
    const list = [...document.querySelectorAll('.player.ckp > li > a')]
      .map(v => ({
        title: v.textContent || '未知',
        url: 'https://www.pianku.tv/' + v.getAttribute('href')
      }));
    const results: Download[] = [];
    const header = {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36 Edg/81.0.416.64'
    }
    // 解析整个列表
    for (const item of list) {
      const resp1 = await get(item.url).set(this.header);
      try {
        const m3u8link1 = resp1.text.match(/url: '(.*)'/)![1]; // index.m3u8
        const resp2 = await get(m3u8link1);
        const m3u8link2 = m3u8link1.slice(0, m3u8link1.length - 10) + resp2.body.toString().split(/\n/)[2]; // 1000k/index.m3u8
        const resp3 = await get(m3u8link2);
        const m3u8list: string = resp3.body.toString();
        const prefix = m3u8link2.slice(0, m3u8link2.length - 10);
        results.push({
          title: item.title,
          uris: m3u8list.split(/\n/).filter(v => v[0] !== '#').map(v => prefix + v),
          size: '0',
          type: '电影'
        });
      } catch (error) {
        console.error(error);
      }
    }
    return results;
  }

}
