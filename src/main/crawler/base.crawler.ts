/**
 * 爬虫抽象类，需要实现如下方法：
 *
 * ```typescript
 * (method) BaseCrawler.artist(uri: string): Promise<any>
 * ```
 *
 * ```typescript
 * (method) BaseCrawler.movie(uri: string): Promise<any>
 * ```
 *
 * ```typescript
 * (method) BaseCrawler.search(keyword: string): Promise<any[]>
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
   * @param {string} uri Url of artist detail page.
   * @returns {Promise<any>} Promise of detail.
   */
  async abstract artist(uri: string): Promise<any>;

  /**
   * 通过详情 URL 页面解析电影信息。
   *
   * Get movie detail with detail page url.
   *
   * @param {string} uri Url of movie detail page.
   * @returns {Promise<any>} Promise of detail.
   */
  async abstract movie(uri: string): Promise<any>;

  /**
   * 通过关键字搜索，返回一个搜索结果数组。
   *
   * Search by keyword, return an array.
   *
   * @param {string} keyword Search keyword.
   * @returns {Promise<any[]>} Promise of search result array.
   */
  async abstract search(keyword: string): Promise<any[]>;

}
