import { JSDOM } from 'jsdom';
import { get, post } from 'superagent';
import { Detail, SearchResult } from './model';

export class Crawler {

  private host = 'www.80s.tw';
  private base = 'https://www.80s.tw';

  private header: any;

  constructor() {
    this.header = {
      Host: this.host,
      Origin: this.base,
      Referer: this.base
    };
  }

  /**
   * 通过关键字搜索，返回一个搜索结果数组。
   *
   * Search by keyword, return an array.
   *
   * @param {string} keyword Search keyword.
   * @returns {SearchResult[]} Promise of search result array.
   */
  async search(keyword: string): Promise<SearchResult[]> {

    const response = await post(this.base + '/search')
      .set(this.header)
      .field('keyword', keyword);

    const document = new JSDOM(response.text).window.document;
    const list = [...
      document
        .querySelector('#block3 > ul')!
        .querySelectorAll('li')
    ].map(v => v.childNodes);

    return list.map<SearchResult>(nodes => ({
      title: nodes[1]
        .textContent!
        .match(/\]([\s\S]+)\(/)![1]
        .trim(),
      type: nodes[1]
        .textContent!
        .match(/\[(.*)\]/)![1],
      year: +nodes[1]
        .textContent!
        .match(/\((.*)\)/)![1],
      aliases: nodes[6]
        .textContent!
        .trim()
        .split(' / '),
      description: nodes[9].textContent!,
      rating: nodes[3].textContent
        ? +nodes[3].textContent.match(/豆瓣(.*)分/)![1]
        : undefined
    }));

  }

  /**
   * 通过详情 URL 页面解析电影信息。
   *
   * Get movie detail with detail page url.
   *
   * @param {string} url Url of movie detail page.
   * @returns {Detail} Promise of detail.
   */
  async getDetail(url: string): Promise<Detail> {

    const response = await get(url)
      .set(this.header);

    const document = new JSDOM(response.text).window.document;

    const doubanID = document
      .querySelector('#minfo > div.info > div:nth-child(11) > span:nth-child(2) > a')!
      .getAttribute('href')!
      .match(/subject\/(.*)\/comments/)![1];

    const detail: Detail = {
      source: url,
      title: document
        .querySelector('#minfo > div.info > h1')!
        .textContent!,
      year: +document
        .querySelector('#minfo > div.info')!
        .childNodes[4]
        .textContent!
        .trim()
        .match(/\((.*)\)/)![1],
      aliases: document
        .querySelector('#minfo > div.info > span:nth-child(6)')!
        .childNodes[2]
        .textContent!
        .trim()
        .replace(/ \/ /g, ' , ')
        .split(' , '),
      artists: [...
        document
          .querySelector('#minfo > div.info > span:nth-child(8)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      types: [...
        document
          .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(1)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      areas: [...
        document
          .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(2)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      languages: [...
        document
          .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(3)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      directors: [...
        document
          .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(4)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      releaseDate: new Date(
        document
          .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(5)')!
          .childNodes[1]
          .textContent!
      ).getTime(),
      updateDate: new Date(
        document
          .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(7)')!
          .childNodes[1]
          .textContent!
      ).getTime(),
      duration: +document
        .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(6)')!
        .childNodes[1]
        .textContent!
        .trim()
        .match(/(.*)分钟/)![1],
      rating: +document
        .querySelector('#minfo > div.info > div:nth-child(11) > span:nth-child(1)')!
        .childNodes[4]
        .textContent!
        .trim(),
      description: document
        .querySelector('#movie_content')!
        .childNodes[2]
        .textContent!
        .trim(),
      douban: {
        id: +doubanID,
        commentLink: `https://movie.douban.com/subject/${doubanID}/comments`,
        MovieLink: `https://movie.douban.com/subject/${doubanID}`
      },
      downloads: [...
        document
          .querySelector('#myform > ul')!
          .querySelectorAll('.dlname.nm')
      ].map(
        ele => ({
          title: ele.querySelector('a')!.textContent!.trim(),
          uri: ele.querySelector('input')!.value,
          size: ele.querySelector('span')!.childNodes[4].textContent!.trim(),
          type: ele.querySelector('span')!.childNodes[1].textContent!.trim()
        })
      )
    };

    return detail;

  }

}
