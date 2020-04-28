import { JSDOM } from 'jsdom';
import { get } from 'superagent';
import { Artist, Movie, Result } from "../model";
import { BaseCrawler } from "./base.crawler";

export class DoubanCrawler extends BaseCrawler {

  private readonly movieLink = 'https://movie.douban.com/subject/';

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

  async movie(uri: string): Promise<Movie> {
    const response = await get(this.movieLink + uri + '/').set(this.header);
    const document = new JSDOM(response.text).window.document;
    // const id = uri;
    // const images: BaseImage = {
    //   id: '',
    //   title: '封面',
    //   size: {
    //     width: (document.querySelector('.nbgnbg > img') as any)?.naturalWidth || 0,
    //     height: (document.querySelector('.nbgnbg > img') as any)?.naturalHeight || 0
    //   },
    //   url: document.querySelector('.nbgnbg > img')?.getAttribute('src') || ''
    // };
    // const title = document.querySelector('h1 > span')?.textContent || '';
    const hasYear = document.querySelector('h1 > .year')?.textContent?.match(/\((.+?)\)/);
    const year = hasYear && +hasYear[1];
    // const directors: ArtistDoc[] = [...document.querySelectorAll('.attrs')[0].querySelectorAll('a')]
    //   .map(v => ({
    //     id: '',
    //     name: v.textContent || ''
    //   }));
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
      id: uri,
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
      directors: [...document.querySelectorAll('.attrs')[0].querySelectorAll('a')]
        .map(v => ({
          id: v.getAttribute('href')!.replace('celebrity', '').replace(/\//g, ''),
          name: v.textContent!
        })),
      writers: [...document.querySelectorAll('.attrs')[1].querySelectorAll('a')]
        .map(v => ({
          id: v.getAttribute('href')!.replace('celebrity', '').replace(/\//g, ''),
          name: v.textContent!
        })),
      actors: [...document.querySelectorAll('.attrs')[2].querySelectorAll('span > a')]
        .map(v => ({
          id: v.getAttribute('href')!.replace('celebrity', '').replace(/\//g, ''),
          name: v.textContent!
        })),
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
    };
  }

  search(keyword: string): Promise<Result[]> {
    throw new Error("Method not implemented.");
  }

}
