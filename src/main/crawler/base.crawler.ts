import { Movie, Result, Artist } from "../model";

/**
 * 爬虫抽象类，需要实现如下方法：
 *
 * ```typescript
 * (method) BaseCrawler.artist(url: string): Promise<Artist>
 * ```
 *
 * ```typescript
 * (method) BaseCrawler.movie(url: string): Promise<Movie>
 * ```
 *
 * ```typescript
 * (method) BaseCrawler.search(keyword: string): Promise<Result[]>
 * ```
 */
export abstract class BaseCrawler {

  constructor(
    public readonly host: string,
    public header: any
  ) { }

  /**
   * 通过详情 URL 页面解析艺术家信息。
   *
   * Get movie detail with detail page url.
   *
   * @param {string} url Url of artist detail page.
   * @returns {Promise<Artist>} Promise of detail.
   */
  async abstract artist(url: string): Promise<Artist>;

  /**
   * 通过详情 URL 页面解析电影信息。
   *
   * Get movie detail with detail page url.
   *
   * @param {string} url Url of movie detail page.
   * @returns {Promise<Movie>} Promise of detail.
   */
  async abstract movie(url: string): Promise<Movie>;

  /**
   * 通过关键字搜索，返回一个搜索结果数组。
   *
   * Search by keyword, return an array.
   *
   * @param {string} keyword Search keyword.
   * @returns {Promise<Result[]>} Promise of search result array.
   */
  async abstract search(keyword: string): Promise<Result[]>;

}
