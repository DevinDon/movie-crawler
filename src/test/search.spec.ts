import { Crawler, SearchResult } from '../main';

describe('Test Search Method', () => {

  let crawler: Crawler;
  let result1: SearchResult[];
  const keyword1 = '魔发奇缘';
  const defined1 = [
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

  let result2: SearchResult[];
  const keyword2 = 'abc';
  const defined2 = [{ "title": "26种死法2.5：M号档案", "type": "电影", "year": 2016, "aliases": ["ABC's of Death 3: Teach Harder", "26种死法3", "ABCs of Death 2.5"], "rating": 5, "url": "https://www.80s.tw/movie/21432" }, { "title": "澳大利亚ABC台：迷失的MH370", "type": "公开课", "url": "https://www.80s.tw/movie/12886" }];

  const results: SearchResult[][] = [];
  const defineds: SearchResult[][] = [defined1, defined2];

  beforeAll(async done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
    crawler = new Crawler();
    done();
  });

  it(`should get 2 result`, async done => {
    result1 = await crawler.search(keyword1);
    result2 = await crawler.search(keyword2);
    results.push(result1, result2);
    for (const result of results) {
      expect(result.length).toEqual(2);
    }
    done();
  });

  it(`should get right aliases`, done => {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const defined = defineds[i];
      for (let j = 0; j < result.length; j++) {
        expect(result[j].aliases).toEqual(defined[j].aliases);
      }
    }
    done();
  });

  it(`should get right rating`, done => {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const defined = defineds[i];
      for (let i = 0; i < result.length; i++) {
        expect(result[i].rating).toEqual(defined[i].rating);
      }
    }
    done();
  });

  it(`should get right title`, done => {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const defined = defineds[i];
      for (let i = 0; i < result.length; i++) {
        expect(result[i].title).toEqual(defined[i].title);
      }
    }
    done();
  });

  it(`should get right type`, done => {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const defined = defineds[i];
      for (let i = 0; i < result.length; i++) {
        expect(result[i].type).toEqual(defined[i].type);
      }
    }
    done();
  });

  it(`should get right url`, done => {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const defined = defineds[i];
      for (let i = 0; i < result.length; i++) {
        expect(result[i].url).toEqual(defined[i].url);
      }
    }
    done();
  });

  it(`should get right year`, done => {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const defined = defineds[i];
      for (let i = 0; i < result.length; i++) {
        expect(result[i].year).toEqual(defined[i].year);
      }
    }
    done();
  });

  afterAll(done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 1000;
    done();
  });

});
