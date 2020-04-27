import { Crawler, SearchResult } from '../main';

describe('Test Search Method', () => {

  let crawler: Crawler;
  let result: SearchResult[];
  const keyword = '魔发奇缘';
  const defined = [
    {
      "title": "魔发奇缘",
      "type": "电影",
      "year": 2010,
      "aliases": ["魔发奇缘", "长发姑娘", "莴苣公主", "缠结", "Rapunzel", "长发公主", "Tangled"],
      "description": "迪斯尼公司第50部动画长片",
      "rating": 8.1,
      "url": "https://www.80s.tw/movie/6587"
    },
    {
      "title": "魔发奇缘：幸福前奏",
      "type": "电影",
      "year": 2017,
      "aliases": ["Tangled: Before Ever After"],
      "description": "讲述乐佩回国之后的冒险故事",
      "rating": 6,
      "url": "https://www.80s.tw/movie/20147"
    }
  ];

  beforeAll(async done => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
    crawler = new Crawler();
    result = await crawler.search(keyword);
    done();
  });

  it(`keyword ${keyword} should get 2 result`, done => {
    expect(result.length).toEqual(2);
    done();
  });

  it(`keyword ${keyword} should get right aliases`, done => {
    for (let i = 0; i < result.length; i++) {
      expect(result[i].aliases).toEqual(defined[i].aliases);
    }
    done();
  });

  it(`keyword ${keyword} should get right rating`, done => {
    for (let i = 0; i < result.length; i++) {
      expect(result[i].rating).toEqual(defined[i].rating);
    }
    done();
  });

  it(`keyword ${keyword} should get right title`, done => {
    for (let i = 0; i < result.length; i++) {
      expect(result[i].title).toEqual(defined[i].title);
    }
    done();
  });

  it(`keyword ${keyword} should get right type`, done => {
    for (let i = 0; i < result.length; i++) {
      expect(result[i].type).toEqual(defined[i].type);
    }
    done();
  });

  it(`keyword ${keyword} should get right url`, done => {
    for (let i = 0; i < result.length; i++) {
      expect(result[i].url).toEqual(defined[i].url);
    }
    done();
  });

  it(`keyword ${keyword} should get right year`, done => {
    for (let i = 0; i < result.length; i++) {
      expect(result[i].year).toEqual(defined[i].year);
    }
    done();
  });

});
