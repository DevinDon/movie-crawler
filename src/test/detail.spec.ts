import { Crawler, Detail } from '../main';

describe('Test Detail Method', () => {

  /**
   * 哈哈哈哈中文变量，会不会报错哈哈哈哈哈哈哈哈哈哈哈😂。
   *
   * 哦艹，没办法智能提示了😑。
   */
  const 魔发奇缘 = { "source": "https://www.80s.tw/movie/6587", "title": "魔发奇缘", "year": 2010, "introduction": "迪斯尼公司第50部动画长片", "aliases": ["魔发奇缘", "长发姑娘", "莴苣公主", "缠结", "Rapunzel", "长发公主", "Tangled"], "artists": ["朗·普尔曼", "杰弗里·塔伯", "曼迪·摩尔", "布拉德·加内特", "理查德·基尔", "唐纳·墨菲", "扎克瑞·莱维", "德莱尼·罗斯·斯坦", "迈克·康纳·盖尼", "保罗·F·汤普金斯"], "types": ["喜剧", "爱情", "奇幻", "动画", "歌舞"], "areas": ["美国"], "languages": ["英语"], "directors": ["内森·格雷诺", "拜伦·霍华德"], "releaseDate": 1290528000000, "updateDate": 1385856000000, "duration": 100, "rating": 8.1, "douban": { "id": 1863766, "commentLink": "https://movie.douban.com/subject/1863766/comments", "movieLink": "https://movie.douban.com/subject/1863766" }, "description": "女巫Gothel（唐纳·墨菲 Donna Murphy 配音）靠着一朵神奇的金色花朵保持青春。王后重病，国王派人找到了这朵金花给王后治病，王后病愈，生下了一个一头金发的小女孩Rapunzel（曼迪·摩尔 Mandy Moore 配音）。女巫失去金花，却发现小公主的金发有着同样的魔力，因此她偷走Rapunzel，把她关到森林中的一座没有楼梯高塔之上。\n　　十八年后，Rapunzel在女巫的抚养下长成一个拥有长长金发的美人，她越发渴望外面的世界，女巫为了自己青春永驻，想方设法把Rapunzel留在身边。一天，窃贼Flynn（扎克瑞·莱维 Zachary Levi 配音）盗取公主王冠后逃入森林，在好奇心趋势下登上了这座神秘的高塔，误打误撞见到了塔中的长发公主。在Flynn的陪伴下，Rapunzel走下高塔，开始了人生和爱情的大冒险。\n　　本片为迪斯尼公司第50部动画长片，改变自经典格林童话《长发公主》，由迪士尼元老级画师格兰·基恩首次担任动画片导演。", "downloads": [{ "title": "魔发奇缘", "uri": "http://dl82.80s.la:920/1312/魔发奇缘/魔发奇缘_bd.mp4", "size": "536.5 M", "type": "平板" }] };
  const 阴曹使者 = { "source": "https://www.80s.tw/movie/24978", "title": "阴曹使者", "year": 2019, "introduction": "正义永远都会有人去伸张，因为有很多善良有爱的爸爸！", "aliases": ["驱魔使者(台)", "使者", "The Divine Fury", "사자"], "artists": ["安圣基", "朴叙俊", "沈熙燮", "崔宇植", "朴智炫", "禹棹焕", "郑志薰", "李胜熙"], "types": ["动作", "恐怖"], "areas": ["韩国"], "languages": ["韩语"], "directors": ["金周焕"], "releaseDate": 1564531200000, "updateDate": 1567814400000, "duration": 129, "rating": 6.3, "douban": { "id": 30181079, "commentLink": "https://movie.douban.com/subject/30181079/comments", "movieLink": "https://movie.douban.com/subject/30181079" }, "description": "《阴曹使者》讲述死神来到阳间发生的故事，同时是一部带有超自然元素的惊悚动作片。失去父亲的格斗选手勇厚（朴叙俊 饰）在遇到祭司安神父（安胜基 饰）后，与扰乱世界的邪恶死神展开了决斗。", "downloads": [{ "title": "阴曹使者", "uri": "http://dl636.80s.im:920/1909/阴曹使者/阴曹使者.mp4", "size": "1.7 G", "type": "电视" }] };

  let crawler: Crawler;
  let detail: Detail;
  let detail2: Detail;

  beforeAll(async done => {
    crawler = new Crawler();
    detail = await crawler.getDetail('https://www.80s.tw/movie/6587');

    detail2 = await crawler.getDetail('https://www.80s.tw/movie/24978');
    done();
  });

  it(`Detail should get right aliases`, done => {
    expect(detail.aliases).toEqual(魔发奇缘.aliases);
    expect(detail2.aliases).toEqual(阴曹使者.aliases);
    done();
  });

  it(`Detail should get right areas`, done => {
    expect(detail.areas).toEqual(魔发奇缘.areas);
    expect(detail2.areas).toEqual(阴曹使者.areas);
    done();
  });

  it(`Detail should get right artists`, done => {
    expect(detail.artists).toEqual(魔发奇缘.artists);
    expect(detail2.artists).toEqual(阴曹使者.artists);
    done();
  });

  it(`Detail should get right description`, done => {
    expect(detail.description).toEqual(魔发奇缘.description);
    expect(detail2.description).toEqual(阴曹使者.description);
    done();
  });

  it(`Detail should get right directors`, done => {
    expect(detail.directors).toEqual(魔发奇缘.directors);
    expect(detail2.directors).toEqual(阴曹使者.directors);
    done();
  });

  it(`Detail should get right douban`, done => {
    expect(detail.douban).toEqual(魔发奇缘.douban);
    expect(detail2.douban).toEqual(阴曹使者.douban);
    done();
  });

  it(`Detail should get right downloads`, done => {
    expect(detail.downloads).toEqual(魔发奇缘.downloads);
    expect(detail2.downloads).toEqual(阴曹使者.downloads);
    done();
  });

  it(`Detail should get right duration`, done => {
    expect(detail.duration).toEqual(魔发奇缘.duration);
    expect(detail2.duration).toEqual(阴曹使者.duration);
    done();
  });

  it(`Detail should get right introduction`, done => {
    expect(detail.introduction).toEqual(魔发奇缘.introduction);
    expect(detail2.introduction).toEqual(阴曹使者.introduction);
    done();
  });

  it(`Detail should get right languages`, done => {
    expect(detail.languages).toEqual(魔发奇缘.languages);
    expect(detail2.languages).toEqual(阴曹使者.languages);
    done();
  });

  it(`Detail should get right rating`, done => {
    expect(detail.rating).toEqual(魔发奇缘.rating);
    expect(detail2.rating).toEqual(阴曹使者.rating);
    done();
  });

  it(`Detail should get right releaseDate`, done => {
    expect(detail.releaseDate).toEqual(魔发奇缘.releaseDate);
    expect(detail2.releaseDate).toEqual(阴曹使者.releaseDate);
    done();
  });

  it(`Detail should get right source`, done => {
    expect(detail.source).toEqual(魔发奇缘.source);
    expect(detail2.source).toEqual(阴曹使者.source);
    done();
  });

  it(`Detail should get right title`, done => {
    expect(detail.title).toEqual(魔发奇缘.title);
    expect(detail2.title).toEqual(阴曹使者.title);
    done();
  });

  it(`Detail should get right types`, done => {
    expect(detail.types).toEqual(魔发奇缘.types);
    expect(detail2.types).toEqual(阴曹使者.types);
    done();
  });

  it(`Detail should get right updateDate`, done => {
    expect(detail.updateDate).toEqual(魔发奇缘.updateDate);
    expect(detail2.updateDate).toEqual(阴曹使者.updateDate);
    done();
  });

  it(`Detail should get right year`, done => {
    expect(detail.year).toEqual(魔发奇缘.year);
    expect(detail2.year).toEqual(阴曹使者.year);
    done();
  });

});
