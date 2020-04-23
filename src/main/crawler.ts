import { JSDOM } from 'jsdom';
import { get, post } from 'superagent';

export interface SearchResult {
  title: string; // #block1 > ul > li > a [title]
  url: string; // #block1 > ul > li > a [href]
}

export interface Download {
  title: string;
  url: string;
  size: string;
}

export interface Detail {
  title: string; // #minfo > div.info > h1
  image: string; // #minfo > div.img > img
  artist: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(9) > a
  desc: string; // #movie_content_all
  type: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(7) > a
  area: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(8) > a
  date: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(10)
  rate: string; // #minfo > div.info > div:nth-child(4) > div
  download: Download[]; // #myform > ul > li:not(:first-child):not(:last-child)
}

export class Crawler {

  private base = 'http://www.y80s.com';

  private header = {
    Host: 'www.y80s.com',
    Origin: 'http://www.y80s.com',
    Referer: 'http://www.y80s.com/'
  };

  constructor() { }

  /**
   * Search by keyword, return an array.
   *
   * @param {string} keyword Search keyword.
   * @returns {SearchResult[]} Promise of search result array.
   */
  async search(keyword: string): Promise<SearchResult[]> {

    const response = await post(this.base + '/movie/search/')
      .set(this.header)
      .field('search_typeid', 1)
      .field('skey', keyword)
      .field('Input', '搜索');

    const document = new JSDOM(response.text).window.document;
    const list = [...document.querySelectorAll('#block1 > ul > li > a')];

    return list.map<SearchResult>(ele => ({
      title: ele.getAttribute('title')!,
      url: this.base + ele.getAttribute('href')!
    }));

  }

  /**
   * Get movie detail with detail page url.
   *
   * @param {string} url Url of movie detail page.
   * @returns {Detail} Promise of detail.
   */
  async getDetail(url: string): Promise<Detail> {

    const response = await get(url)
      .set(this.header);

    const document = new JSDOM(response.text).window.document;
    const detail: Detail = {
      title: document.querySelector('#minfo > div.info > h1')?.textContent?.trim()!,
      image: document.querySelector('#minfo > div.img > img')?.getAttribute('src')!,
      artist: document.querySelector('#minfo > div.info > div:nth-child(3) > span:nth-child(9) > a')?.textContent?.trim()!,
      desc: document.querySelector('#movie_content_all')?.textContent?.trim()!,
      type: document.querySelector('#minfo > div.info > div:nth-child(3) > span:nth-child(7) > a')?.textContent?.trim()!,
      area: document.querySelector('#minfo > div.info > div:nth-child(3) > span:nth-child(8) > a')?.textContent?.trim()!,
      date: document.querySelector('#minfo > div.info > div:nth-child(3) > span:nth-child(10)')?.textContent?.trim()!,
      rate: document.querySelector('#minfo > div.info > div:nth-child(8) > div')?.textContent?.trim()!,
      download: [...document.querySelectorAll('#myform > ul > li:not(:first-child):not(:last-child)')]
        .map<Download>(ele => ({
          title: ele.querySelector('.dlname')?.textContent?.trim()!,
          url: ele.querySelector('[title=本地下载]')?.getAttribute('href')!,
          size: ''
        }))
    };

    return detail;

  }

}