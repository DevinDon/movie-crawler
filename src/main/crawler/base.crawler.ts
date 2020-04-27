/**
 * 爬虫抽象类，需要实现如下两个方法：
 *
 * ```typescript
 * (method) BaseCrawler.search<T>(keyword: string): Promise<T[]>
 * ```
 *
 * ```typescript
 * (method) BaseCrawler.detail<T>(url: string): Promise<T>
 * ```
 */
export abstract class BaseCrawler {

  constructor(
    public readonly host: string,
    public header: string
  ) { }

  /**
   * 通过关键字搜索，返回一个搜索结果数组。
   *
   * Search by keyword, return an array.
   *
   * @param {string} keyword Search keyword.
   * @returns {Promise<T[]>} Promise of search result array.
   */
  async abstract search<T>(keyword: string): Promise<T[]>;

  /**
   * 通过详情 URL 页面解析电影信息。
   *
   * Get movie detail with detail page url.
   *
   * @param {string} url Url of movie detail page.
   * @returns {Promise<T>} Promise of detail.
   */
  async abstract detail<T>(url: string): Promise<T>;

}
