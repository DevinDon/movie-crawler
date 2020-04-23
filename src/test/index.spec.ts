import { Crawler } from '../main';

describe('Test keyword 肥龙过江', () => {

  beforeAll(done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
    done();
  });

  it('keyword 猛龙过江 should get 1 result', async done => {
    const crawler = new Crawler();
    const result = await crawler.search('肥龙过江');
    expect(result.length).toEqual(1);
    expect(result[0].url).toEqual('http://www.y80s.com/movie/38197');
    done();
  });

  it('movie 肥龙过江 should get 2 download links', async done => {
    const crawler = new Crawler();
    const detail = await crawler.getDetail('http://www.y80s.com/movie/38197');
    expect(detail.download.length).toEqual(2);
    done();
  });

  afterAll(done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 1000;
    done();
  });

});
