import Axios from 'axios';
import { JSDOM } from 'jsdom';
import { Artist, Movie } from "../model";
import { BaseCrawler } from "./base.crawler";

export interface DoubanSearchResult {
  episode: string;
  img: string;
  title: string;
  url: string;
  type: string;
  year: string;
  sub_title: string;
  id: string;
}

export interface DoubanSuggestResult {
  rate: string;
  cover_x: number;
  title: string;
  url: string;
  playable: boolean;
  cover: string;
  id: string;
  cover_y: number;
  is_new: boolean;
}

export type Tag = '热门' | '最新' | '经典' | '豆瓣高分' | '冷门佳片' | '华语' | '欧美' | '韩国' | '日本' | '动作' | '喜剧' | '爱情' | '科幻' | '悬疑' | '恐怖' | '文艺';

export class DoubanCrawler extends BaseCrawler {

  private readonly movieLink = 'https://movie.douban.com/subject/';
  private readonly searchLink = 'https://movie.douban.com/j/subject_suggest';
  private readonly suggestTagLink = 'https://movie.douban.com/j/search_tags';
  private readonly suggestLink = 'https://movie.douban.com/j/search_subjects';

  constructor() {
    super(
      'movie.douban.com',
      {
        Host: 'movie.douban.com',
        Origin: 'https://movie.douban.com',
        Referer: 'https://movie.douban.com'
      }
    );
  }

  artist(uri: string): Promise<Artist> {
    throw new Error("Method not implemented.");
  }

  async movie(id: string): Promise<Movie | undefined> {

    const response = await Axios.get(this.movieLink + id + '/', { headers: this.header })
      .catch(e => console.error(e));
    // 404 之类的错误，直接返回 undefined
    if (!response) { return; }
    const document = new JSDOM(response.data).window.document;

    const hasYear = document.querySelector('h1 > .year')?.textContent?.match(/\((.+?)\)/);
    const year = hasYear && +hasYear[1];
    const hasDirectors = document.querySelectorAll('.attrs')[0];
    const hasWriters = document.querySelectorAll('.attrs')[1];
    const hasActors = document.querySelectorAll('.attrs')[2];
    const hasAreas = document.getElementById('info')?.textContent?.match(/制片国家\/地区: (.*)/);
    const areas = hasAreas && hasAreas[1].split(' / ');
    const hasLanguages = document.getElementById('info')?.textContent?.match(/语言: (.*)/);
    const languages = hasLanguages && hasLanguages[1].split(' / ');
    const hasDuration = document.querySelector('[property="v:runtime"]')?.textContent?.replace('分钟', '');
    const duration = hasDuration && +hasDuration;
    const hasAliases = document.getElementById('info')?.textContent?.match(/又名: (.*)/);
    const aliases = hasAliases && hasAliases[1].split(' / ');
    const hasIMDb = document.getElementById('info')?.textContent?.match(/IMDb链接: (.*)/);
    const imdb = hasIMDb && hasIMDb[1];
    const hasStar = document.querySelector('[property="v:average"]')?.textContent;
    const star = hasStar && +hasStar;
    const hasTotal = document.querySelector('[property="v:votes"]')?.textContent;
    const total = hasTotal && +hasTotal;
    const hasStar1 = document.querySelector('.ratings-on-weight > .item:nth-child(5) > .rating_per')?.textContent?.replace('%', '');
    const hasStar2 = document.querySelector('.ratings-on-weight > .item:nth-child(4) > .rating_per')?.textContent?.replace('%', '');
    const hasStar3 = document.querySelector('.ratings-on-weight > .item:nth-child(3) > .rating_per')?.textContent?.replace('%', '');
    const hasStar4 = document.querySelector('.ratings-on-weight > .item:nth-child(2) > .rating_per')?.textContent?.replace('%', '');
    const hasStar5 = document.querySelector('.ratings-on-weight > .item:nth-child(1) > .rating_per')?.textContent?.replace('%', '');

    return {
      id: id,
      images: [{
        title: '封面',
        size: {
          width: (document.querySelector('.nbgnbg > img') as any)?.width,
          height: (document.querySelector('.nbgnbg > img') as any)?.height
        },
        url: document.querySelector('.nbgnbg > img')?.getAttribute('src')!,
        type: 'poster'
      }],
      title: document.querySelector('h1 > span')?.textContent!,
      year: year || 0,
      directors: hasDirectors ? [...hasDirectors.querySelectorAll('a')]
        .map(v => ({
          id: v.getAttribute('href')?.replace('celebrity', '').replace(/\//g, ''),
          name: v.textContent!
        })) : [],
      writers: hasWriters ? [...hasWriters.querySelectorAll('a')]
        .map(v => ({
          id: v.getAttribute('href')?.replace('celebrity', '').replace(/\//g, ''),
          name: v.textContent!
        })) : [],
      actors: hasActors ? [...hasActors.querySelectorAll('span > a')]
        .map(v => ({
          id: v.getAttribute('href')?.replace('celebrity', '').replace(/\//g, ''),
          name: v.textContent!
        })) : [],
      types: [...document.querySelectorAll('[property="v:genre"]')].map(v => v.textContent!),
      areas: areas || [],
      languages: languages || [],
      releaseDate: [...document.querySelectorAll('[property="v:initialReleaseDate"]')]
        .map(v => v.textContent!)
        .map(v => ({
          area: /\((.*)\)/.test(v) ? v.match(/\((.*)\)/)![1] : '',
          date: new Date(v).getTime()
        })),
      updateDate: Date.now(),
      duration: duration ? +duration : 0,
      aliases: aliases || [],
      imdb: imdb || '',
      rating: {
        star: star || 0,
        total: total || 0,
        star1: hasStar1 ? +hasStar1 / 100 : 0,
        star2: hasStar2 ? +hasStar2 / 100 : 0,
        star3: hasStar3 ? +hasStar3 / 100 : 0,
        star4: hasStar4 ? +hasStar4 / 100 : 0,
        star5: hasStar5 ? +hasStar5 / 100 : 0,
      },
      description: document.querySelector('[property="v:summary"]')?.textContent?.trim() || '暂无简介',
      downloads: [],
      links: []
    }

  }

  /**
   * 有接口，那我解析个屁啊。
   *
   * `https://movie.douban.com/j/subject_suggest?q={{keyword}}`
   *
   * @param keyword 关键词
   */
  async search(keyword: string): Promise<DoubanSearchResult[]> {

    const response = await Axios.get(this.searchLink, {
      params: { q: keyword },
      headers: this.header
    });

    const results: DoubanSearchResult[] = response.data;

    return results;

  }

  /**
   * 获取推荐电影的分类标签
   */
  async tags() {
    const tags: string[] = await Axios.get(this.suggestTagLink, {
      params: { type: 'movie' },
      headers: this.header
    })
      .then(v => v.data.tags)
      .catch(e => (console.error('Tag get failed', e), []));
    return tags;
  }

  /**
   * 获取推荐电影。
   *
   * 1. 获取分类
   *
   * `https://movie.douban.com/j/search_tags?type=movie`
   *
   * `https://movie.douban.com/j/search_subjects?type=movie&tag=%E5%96%9C%E5%89%A7&sort=recommend&page_limit=20&page_start=0`
   */
  async suggest(tag: Tag = '热门', start: number = 0, limit: number = 10) {
    const suggestResult: DoubanSuggestResult[] = await Axios.get(this.suggestLink, {
      params: {
        type: 'movie',
        tag,
        sort: 'recommend',
        page_start: start,
        page_limit: limit
      },
      headers: this.header
    })
      .then(v => v.data.subjects)
      .catch(e => (console.error('Suggest failed: ', e), []));
    return suggestResult;
  }

}
