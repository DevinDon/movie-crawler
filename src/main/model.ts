/**
 * 搜索结果。
 *
 * `POST https://www.80s.tw/search keyword=电影名`
 *
 * ```javascript
 * [...
 *   document
 *     .querySelector('#block3 > ul')
 *     .querySelectorAll('li')
 * ].map(v => v.childNodes)
 * ```
 */
export interface SearchResult {
  /**
   * 标题 Title
   *
   * ```javascript
   * nodes[1]
   *   .textContent
   *   .match(/\]([\s\S]+)\(/)[1]
   *   .trim()
   * ```
   *
   * 这么多空格是要闹什么🤨。
   */
  title: string;
  /**
   * 结果类别 Type
   *
   * - 电影 Movie
   * - 音乐短片 MV
   *
   * ```javascript
   * nodes[1]
   *   .textContent
   *   .match(/\[(.*)\]/)[1]
   * ```
   */
  type: string;
  /**
  * 年份 Year
  *
  * ```javascript
  * +nodes[1]
  *   .textContent
  *   .match(/\((.*)\)/)[1]
  * ```
  */
  year: number;
  /**
   * 别名 Alias
   *
   * ```javascript
   * nodes[6]
   *   .textContent
   *   .trim()
   *   .split(' / ')
   * ```
   */
  aliases: string[];
  /**
   * 简介 Description
   *
   * ```javascript
   * nodes[9].textContent
   * ```
   */
  description: string;
  /**
   * 豆瓣评分 rating
   *
   * **评分可能为空，注意做控制判断**
   *
   * ```javascript
   * nodes[3].textContent
   *   ? +nodes[3].textContent.match(/豆瓣(.*)分/)![1]
   *   : undefined
   * ```
   */
  rating: number | undefined;
  /**
   * 详情页链接 URL
   *
   * ```javascript
   * nodes[1].getAttribute('href')
   * ```
   */
  url: string;
}

/**
 * 下载链接 Download
 *
 * 从当前页面解析到的源数组
 *
 * ```javascript
 * [...
 *   document
 *     .querySelector('#myform > ul')
 *     .querySelectorAll('.dlname.nm')
 * ].map(
 *   ele => ({
 *     title: ele.querySelector('a').textContent.trim(),
 *     uri: ele.querySelector('input').value,
 *     size: ele.querySelector('span').childNodes[4].textContent.trim(),
 *     type: ele.querySelector('span').childNodes[1].textContent.trim()
 *   })
 * )
 * ```
 */
export interface Download {
  /**
   * 标题 Title
   *
   * ```javascript
   * ele.querySelector('a').textContent.trim()
   * ```
   */
  title: string;
  /**
   * 链接 URI
   *
   * ```javascript
   * ele.querySelector('input').value
   * ```
   */
  uri: string;
  /**
   * 大小 Size
   *
   * ```javascript
   * ele.querySelector('span').childNodes[4].textContent.trim()
   * ```
   */
  size: string;
  /**
   * 类型 Type
   *
   * ```javascript
   * ele.querySelector('span').childNodes[1].textContent.trim()
   * ```
   */
  type: string;
}

/**
 * 豆瓣链接 Douban
 *
 * 直接解析豆瓣 ID
 *
 * ```javascript
 * document
 *   .querySelector('#minfo > div.info > div:nth-child(11) > span:nth-child(2) > a')
 *   .getAttribute('href')
 *   .match(/subject\/(.*)\/comments/)[1]
 * ```
 */
export interface Douban {
  /**
   * 豆瓣电影编号 Douban ID
   *
   * ```javascript
   * +id
   * ```
   */
  id: number;
  /**
   * 评论链接
   *
   * ```javascript
   * `https://movie.douban.com/subject/${id}/comments`
   * ```
   */
  commentLink: string;
  /**
   * 豆瓣电影链接 Movie Link
   *
   * ```javascript
   * `https://movie.douban.com/subject/${id}`
   * ```
   */
  MovieLink: string;
}

/**
 * 电影详细信息。
 *
 * `GET https://www.80s.tw/movie/电影编号`
 */
export interface Detail {
  /**
   * 源地址，即爬取页面地址。
   *
   * Source url.
   */
  source: string;
  /**
   * 标题 Title
   *
   * ```javascript
   * document
   *   .querySelector('#minfo > div.info > h1')
   *   .textContent
   * ```
   */
  title: string;
  /**
   * 年份 Year
   *
   * ```javascript
   * +document
   *   .querySelector('#minfo > div.info')
   *   .childNodes[4]
   *   .textContent
   *   .trim()
   *   .match(/\((.*)\)/)[1]
   * ```
   */
  year: number;
  /**
   * 别名 Alias
   *
   * ```javascript
   * document
   *   .querySelector('#minfo > div.info > span:nth-child(6)')
   *   .childNodes[2]
   *   .textContent
   *   .trim()
   *   .replace(/ \/ /g, ' , ')
   *   .split(' , ')
   * ```
   */
  aliases: string[];
  /**
   * 演员 Artist
   *
   * ```javascript
   * [...
   *   document
   *     .querySelector('#minfo > div.info > span:nth-child(8)')
   *     .querySelectorAll('a')
   * ].map(v => v.textContent)
   * ```
   */
  artists: string[];
  /**
   * 类型 Type
   *
   * ```javascript
   * [...
   *   document
   *     .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(1)')
   *     .querySelectorAll('a')
   * ].map(v => v.textContent)
   * ```
   */
  types: string[];
  /**
   * 地区 Area
   *
   * ```javascript
   * [...
   *   document
   *     .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(2)')
   *     .querySelectorAll('a')
   * ].map(v => v.textContent)
   * ```
   */
  areas: string[];
  /**
   * 语言 Language
   *
   * ```javascript
   * [...
   *   document
   *     .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(3)')
   *     .querySelectorAll('a')
   * ].map(v => v.textContent)
   * ````
   */
  languages: string[];
  /**
   * 导演 Director
   *
   * ```javascript
   * [...
   *   document
   *     .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(4)')
   *     .querySelectorAll('a')
   * ].map(v => v.textContent)
   * ````
   */
  directors: string[];
  /**
   * 上映日期 Release Date
   *
   * JavaScript 数字时间戳
   *
   * ```javascript
   * new Date(
   *   document
   *     .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(5)')
   *     .childNodes[1]
   *     .textContent
   * ).getTime()
   * ```
   */
  releaseDate: number;
  /**
   * 页面更新日期 Update Date
   *
   * JavaScript 数字时间戳
   *
   * ```javascript
   * new Date(
   *   document
   *     .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(7)')
   *     .childNodes[1]
   *     .textContent
   * ).getTime()
   * ```
   */
  updateDate: number;
  /**
   * 片长 Duration
   *
   * 分钟 Minutes
   *
   * ```javascript
   * +document
   *   .querySelector('#minfo > div.info > div:nth-child(10) > span:nth-child(6)')
   *   .childNodes[1]
   *   .textContent
   *   .trim()
   *   .match(/(.*)分钟/)[1]
   * ```
   */
  duration: number;
  /**
   * 电影评分 Rating
   *
   * ```javascript
   * +document
   *   .querySelector('#minfo > div.info > div:nth-child(11) > span:nth-child(1)')
   *   .childNodes[4]
   *   .textContent
   *   .trim()
   * ```
   */
  rating: number;
  /**
   * 简介 Description
   *
   * ```javascript
   * document
   *   .querySelector('#movie_content')
   *   .childNodes[2]
   *   .textContent
   *   .trim()
   * ```
   */
  description: string;
  /**
   * 豆瓣信息 Douban
   *
   * 见上
   */
  douban: Douban;
  /**
   * 下载链接 Download
   *
   * 见上
   */
  downloads: Download[];
}
