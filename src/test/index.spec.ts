import { Crawler } from '../main';

describe('Test Constructor', () => {

  it('should create a new Crawler', async done => {
    const crawler = new Crawler();
    expect(crawler).toBeDefined();
    done();
  });

});
