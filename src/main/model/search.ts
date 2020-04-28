/**
 * 从豆瓣爬取的搜索结果。
 *
 * GET `https://search.douban.com/movie/subject_search?search_text={{keyword}}`
 *
 * 信息列表元素
 *
 * ```javascript
 * const items = [...document.querySelectorAll('#root > div > div:nth-child(2) > div:first-child > div:first-child > div:not(:last-child)')]
 * ```
 */
export interface Result {

  /**
   * 豆瓣 ID
   *
   * ```javascript
   * item.querySelector('.title > a').getAttribute('href')
   * ```
  */
  id: string;

  /**
   * 封面
   *
   * ```javascript
   * item.querySelector('img').getAttribute('src')
   * ```
   */
  image: string;

  /**
   * 标题
   *
   * ```javascript
   * item.querySelector('.title > a').textContent
   * ```
   */
  title: string;

  /**
   * 年份
   *
   * ```javascript
   * item.querySelector('.title > a').textContent.match(/\((.*)\)/)[1]
   * ```
   */
  year: number;

  /**
   * 评分
   *
   * ```javascript
   * +item.querySelector('.rating_nums').textContent
   * ```
   */
  rating: number;

  /**
   * 热度
   *
   * ```javascript
   * +item.querySelector('.rating > .pl').textContent.match(/\((.*)人评价\)/)[1]
   * ```
   */
  hot: number;

  /**
   * 关键字
   *
   * ```javascript
   * [...item.querySelectorAll('.meta')].map(v => v.textContent.split(' / ')).flat()
   * ```
   */
  keywords: string[];

  /**
   * 描述
   *
   * 后期合并更新
   */
  description?: string;

}

// 详情页面
// GET https://www.pianku.tv/mv/wNnZjYidja.html
// 下载地址请求
// GET https://www.pianku.tv/ajax/downurl/{{id}}/
// 搜索请求
// GET https://www.pianku.tv/s/ajax.php?q={{keyword}}

// document.querySelectorAll('#root > div > div:nth-child(2) > div:first-child > div:first-child > div:not(:last-child)')
