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

    return list.map<SearchResult>(nodes => {
      const hasYear = nodes[1] && nodes[1].textContent?.match(/\((.*)\)/);
      const hasAliases = nodes[6] && nodes[6].textContent;
      const hasDescription = nodes[9] && nodes[9].textContent;
      const hasRating = nodes[3] && nodes[3].textContent;
      return {
        title: nodes[1]
          .textContent!
          .match(/\]([\s\S]+)[\(]+?/)![1]
          .trim(),
        type: nodes[1]
          .textContent!
          .match(/\[(.*)\]/)![1],
        year: hasYear ? +hasYear[1] : undefined,
        aliases: hasAliases
          ? hasAliases.trim().split(' / ')
          : undefined,
        description: hasDescription || undefined,
        rating: hasRating
          ? +hasRating.match(/豆瓣(.*)分/)![1]
          : undefined,
        url: this.base + (nodes[1] as any).getAttribute('href')
      };
    });

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

    const infoBlock = document.querySelector('#minfo > .info')!;
    const infoBlock1 = infoBlock.querySelectorAll('.clearfix')[0];
    const infoBlock2 = infoBlock.querySelectorAll('.clearfix')[1];
    const infoBlock3 = infoBlock.querySelectorAll('.clearfix')[2];

    const doubanID = infoBlock2
      .querySelector('a')!
      .getAttribute('href')!
      .match('subject\/(.+)\/comments')![1];

    const detail: Detail = {
      source: url,
      title: infoBlock
        .querySelector('h1')!
        .textContent!,
      year: +infoBlock
        .childNodes[4]
        .textContent!
        .trim()
        .match(/\((.+)\)/)![1],
      introduction: infoBlock
        .childNodes[7]
        .textContent!
        .trim(),
      aliases: infoBlock
        .querySelector(`span:nth-child(${infoBlock.querySelector('span:nth-child(10)') ? 8 : 6})`)!
        .childNodes[2]
        .textContent!
        .trim()
        .replace(/ , /g, ' / ')
        .split(' / '),
      artists: [...
        infoBlock
          .querySelectorAll(`span:nth-child(${infoBlock.querySelector('span:nth-child(10)') ? 10 : 8}) > a`)
      ].map(v => v.textContent!),
      types: [...
        infoBlock1
          .querySelector('span:nth-child(1)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      areas: [...
        infoBlock1
          .querySelector('span:nth-child(2)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      languages: [...
        infoBlock1
          .querySelector('span:nth-child(3)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      directors: [...
        infoBlock1
          .querySelector('span:nth-child(4)')!
          .querySelectorAll('a')
      ].map(v => v.textContent!),
      releaseDate: new Date(
        infoBlock1
          .querySelector('span:nth-child(5)')!
          .childNodes[1]
          .textContent!
      ).getTime(),
      updateDate: new Date(
        infoBlock1
          .querySelector('span:nth-child(7)')!
          .childNodes[1]
          .textContent!
      ).getTime(),
      duration: +infoBlock1
        .querySelector('span:nth-child(6)')!
        .childNodes[1]
        .textContent!
        .trim()
        .match(/(.+)分钟/)![1],
      rating: +infoBlock2
        .querySelector('span')!
        .childNodes[4]
        .textContent!
        .trim(),
      douban: {
        id: +doubanID,
        commentLink: `https://movie.douban.com/subject/${doubanID}/comments`,
        movieLink: `https://movie.douban.com/subject/${doubanID}`
      },
      description: infoBlock3
        .childNodes[2]
        .textContent!
        .trim(),
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
