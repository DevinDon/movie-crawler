# Movie Crawler

# Usage

## Search by keyword

```typescript
const crawler = new Crawler();
const results: Result[] = await crawler.search('魔发奇缘');
```

Result type:

```typescript
export interface Result {
  title: string;
  image: string;
  url: string;
  type: string;
  year: string;
  description?: string;
}
```

## Get movie detail

```typescript
/** 豆瓣 movie.douban.com */
const crawler = new DoubanCrawler();
const detail = await crawler.getDetail('25887288');
```

```typescript
/** 片库 pianku.tv */
const crawler = new PiankuCrawler();
const detail = await crawler.getDetail('wNnZjYidja');
```

Detail type:

[See src/main/model/movie.ts for more detail.](./src/main/model/movie.ts)

```typescript
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
```

# Change Log

## 0.4.0 => 0.5.0

- refactor: 重构数据结构，包含但不限于电影、演员、导演、编剧等
- feat: 更换数据源为豆瓣，扔掉垃圾的 80s.tw
- feat: 多来源下载搜索

# [THE MIT LICENSE](https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE)

Copyright © 2018+ Devin Don

LICENSE: MIT

Click https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE to view a copy of this license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
