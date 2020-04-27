/**
 * 电影图片相关。
 */
export interface BaseImage {
  /** 数据库 ID 识别项 */
  id?: string;
  /** 图像标题 */
  title: string;
  /** 图像尺寸 */
  size: {
    width: number;
    height: number;
  }
  /** 原始地址 */
  url: string;
}

/**
 * 海报。
 *
 * Poster.
 *
 * `GET https://movie.douban.com/subject/{{id}}/photos?type=R`
 */
export interface Poster extends BaseImage { }

/**
 * 剧照。
 *
 * Still.
 *
 * `GET https://movie.douban.com/subject/{{id}}/photos?type=S`
 */
export interface Still extends BaseImage { }

/**
 * 壁纸。
 *
 * Wallpaper.
 *
 * `GET https://movie.douban.com/subject/{{id}}/photos?type=W`
 */
export interface Wallpaper extends BaseImage { }

/**
 * 避免过度冗余，只存储必要信息，并链接到 `Artist` 表。
 */
export interface ArtistDoc {
  id?: string;
  name: string;
}

/**
 * 发布日期。
 *
 * Release Date.
 *
 * 包含发行地区和日期。
 */
export interface ReleaseDate {
  area: string;
  date: number;
}

/**
 * 电影评分。
 *
 * Movie rating.
 */
export interface Rating {
  /**
   * 评分，满分 10 分
   *
   * ```javascript
   * +document.querySelector('[property="v:average"]').textContent
   * ```
   */
  star: number;
  /**
   * 评分人数
   *
   * ```javascript
   * +document.querySelector('[property="v:votes"]').textContent
   * ```
   */
  total: number;
  /**
   * 5 星力荐
   *
   * ```javascript
   * +document.querySelector('.ratings-on-weight > .item:nth-child(1) > .rating_per').textContent.replace('%', '') / 100
   * ```
   */
  star5: number;
  /**
   * 4 星推荐
   *
   * ```javascript
   * +document.querySelector('.ratings-on-weight > .item:nth-child(2) > .rating_per').textContent.replace('%', '') / 100
   * ```
   */
  star4: number;
  /**
   * 3 星还行
   *
   * ```javascript
   * +document.querySelector('.ratings-on-weight > .item:nth-child(3) > .rating_per').textContent.replace('%', '') / 100
   * ```
   */
  star3: number;
  /**
   * 2 星较差
   *
   * ```javascript
   * +document.querySelector('.ratings-on-weight > .item:nth-child(4) > .rating_per').textContent.replace('%', '') / 100
   * ```
   */
  star2: number;
  /**
   * 1 星很差
   *
   * ```javascript
   * +document.querySelector('.ratings-on-weight > .item:nth-child(5) > .rating_per').textContent.replace('%', '') / 100
   * ```
   */
  star1: number;
}

/**
 * 下载链接 Download
 *
 * 从 `pianku.tv` 解析的下载链接
 *
 * ```javascript
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
  uris: string[];
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
 * 电影信息。
 *
 * Movie detail.
 *
 * `GET https://movie.douban.com/subject/{{id}}/`
 *
 */
export interface Movie {

  /**
   * 豆瓣电影编号 ID
   *
   * 从地址获取，正则匹配如下：
   *
   * ```javascript
   * /subject\/(.+)\//
   * ```
   */
  id: string;

  /**
   * 电影图片 Movie Image
   *
   * 默认封面 default
   *
   * ```javascript
   * {
   *   title: '封面',
   *   size: {
   *     width: document.querySelector('.nbgnbg > img').naturalWidth,
   *     height: document.querySelector('.nbgnbg > img').naturalHeight
   *   },
   *   url: document.querySelector('.nbgnbg > img').getAttribute('src')
   * }
   * ```
   */
  images: {
    default: BaseImage;
    posters: Poster[];
    stills: Still[];
    wallpapers: Wallpaper[];
  };

  /**
   * 标题 Title
   *
   * ```javascript
   * document
   *   .querySelector('h1 > span')
   *   .textContent
   * ```
   */
  title: string;

  /**
   * 年份 Year
   *
   * ```javascript
   * +document
   *   .querySelector('h1 > .year')
   *   .textContent
   *   .match(/\((.+?)\)/)[1]
   * ```
   */
  year: number;

  /**
   * 导演 Director
   *
   * ```javascript
   * [...document.querySelectorAll('.attrs')[0].querySelectorAll('a')]
   *   .map(v => ({ name: v.textContent }))
   * ````
   */
  directors: ArtistDoc[];

  /**
   * 编剧 Writer
   *
   * ```javascript
   * [...document.querySelectorAll('.attrs')[1].querySelectorAll('a')]
   *   .map(v => ({ name: v.textContent }))
   * ```
   */
  writers: ArtistDoc[];

  /**
   * 演员 Actor
   *
   * ```javascript
   * [...document.querySelectorAll('.attrs')[2].querySelectorAll('.attrs > span > a')]
   *   .map(v => ({ name: v.textContent }))
   * ```
   */
  actors: ArtistDoc[];

  /**
   * 类型 Type
   *
   * ```javascript
   * [...document.querySelectorAll('[property="v:genre"]')].map(v => v.textContent)
   * ```
   */
  types: string[];

  /**
   * 地区 Area
   *
   * ```javascript
   * document.getElementById('info').textContent.match(/制片国家\/地区: (.*)/)[1].split(' / ')
   * ```
   */
  areas: string[];

  /**
   * 语言 Language
   *
   * ```javascript
   * document.getElementById('info').textContent.match(/语言: (.*)/)[1].split(' / ')
   * ````
   */
  languages: string[];

  /**
   * 上映日期 Release Date
   *
   * JavaScript 数字时间戳
   *
   * ```javascript
   * [...
   *   document
   *     .querySelectorAll('[property="v:initialReleaseDate"]')
   * ].map(v => v.textContent)
   *   .map(
   *     v => ({
   *       area: v.match(/\((.*)\)/)[1],
   *       date: new Date(v).getTime()
   *     })
   * )
   * ```
   */
  releaseDate: ReleaseDate[];

  /**
   * 页面更新日期 Update Date
   *
   * JavaScript 数字时间戳
   *
   * 用于数据库标识
   */
  updateDate: number;

  /**
   * 片长 Duration
   *
   * 分钟 Minutes
   *
   * ```javascript
   * +document.querySelector('[property="v:runtime"]').textContent.replace('分钟', '')
   * ```
   */
  duration: number;

  /**
   * 别名 Alias
   *
   * ```javascript
   * document.getElementById('info').textContent.match(/又名: (.*)/)[1].split(' / ')
   * ```
   */
  aliases: string[];

  /**
   * IMDb 编号
   *
   * ```javascript
   * document.getElementById('info').textContent.match(/IMDb链接: (.*)/)[1]
   * ```
   */
  imdb: string;

  /**
   * 电影评分 Rating
   *
   * 见上
   */
  rating: Rating;

  /**
   * 剧情介绍 Description
   *
   * ```javascript
   * document.querySelector('[property="v:summary"]').textContent.trim()
   * ```
   */
  description: string;

  /**
   * 下载链接 Download
   *
   * 见上
   */
  downloads: Download[];

  /**
   * 其他网站的对应 Links
   */
  links: string[];

}
