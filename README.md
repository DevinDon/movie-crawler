# Movie Crawler

# Usage

## Search by keyword

```typescript
const crawler = new Crawler();
const result: SearchResult[] = await crawler.search('肥龙过江');
```

Result type:

```typescript
interface SearchResult {
  title: string; // #block1 > ul > li > a [title]
  url: string; // #block1 > ul > li > a [href]
}
```

## Get movie detail

```typescript
const crawler = new Crawler();
const detail = await crawler.getDetail('http://www.y80s.com/movie/38197');
```

Detail type:

```typescript
interface Download {
  title: string;
  url: string;
  size: string;
}

interface Detail {
  title: string; // #minfo > div.info > h1
  image: string; // #minfo > div.img > img
  artist: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(9) > a
  desc: string; // #movie_content_all
  type: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(7) > a
  area: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(8) > a
  date: string; // #minfo > div.info > div:nth-child(3) > span:nth-child(10)
  rate: string; // #minfo > div.info > div:nth-child(4) > div
  download: Download[]; // #myform > ul > li:not(:first-child):not(:last-child)
}
```

# Change Log

## 0.2.0 => 0.2.1

- fix(crawler): 添加空值判断与错误控制

## 0.1.2 => 0.2.0

- feat(source): 更新源为 <https://www.80s.tw>
- perf(model): 优化数据结构并更新注释
- test(unit): 完善单元测试

# [THE MIT LICENSE](https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE)

Copyright © 2018+ Devin Don

LICENSE: MIT

Click https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE to view a copy of this license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
