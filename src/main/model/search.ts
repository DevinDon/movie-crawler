/**
 * 从豆瓣爬取的搜索结果。
 *
 * GET `https://search.douban.com/movie/subject_search?search_text=%E5%86%B0%E9%9B%AA%E5%A5%87%E7%BC%98&cat=1002`
 *
 * 父类
 *
 * ```javascript
 * const root = [...document.querySelectorAll('#root > div > div:nth-child(2) > div:first-child > div:first-child > div:not(:last-child)')]
 * ```
 */
export interface Result {
  /**
   * 豆瓣 ID
   *
   * ```javascript
   * root.querySelector('.title > a').getAttribute('href')
   * ```
  */
  id: string;
  /**
   * 封面
   *
   * ```javascript
   * root.querySelector('img').getAttribute('src')
   * ```
   */
  image: string;
  /**
   * 标题
   *
   * ```javascript
   * root.querySelector('.title > a').textContent
   * ```
   */
  title: string;
  /**
   * 年份
   *
   * ```javascript
   * root.querySelector('.title > a').textContent.match(/\((.*)\)/)[1]
   * ```
   */
  year: string;
  /**
   * 评分
   *
   * ```javascript
   * +root.querySelector('.rating_nums').textContent
   * ```
   */
  rating: number;
  /**
   * 热度
   *
   * ```javascript
   * +root.querySelector('.rating > .pl').textContent.match(/\((.*)人评价\)/)[1]
   * ```
   */
  hot: number;
  /**
   * 关键字
   *
   * ```javascript
   * [...root.querySelectorAll('.meta')].map(v => v.textContent.split(' / ')).flat()
   * ```
   */
  keywords: string[];
  /** 描述 */
  description?: string;
}

// 详情页面
// GET https://www.pianku.tv/mv/wNnZjYidja.html
// 下载地址请求
// GET https://www.pianku.tv/ajax/downurl/{{id}}/
// 搜索请求
// GET https://www.pianku.tv/s/ajax.php?q={{keyword}}

// document.querySelectorAll('#root > div > div:nth-child(2) > div:first-child > div:first-child > div:not(:last-child)')
