import { Crawler, Detail } from '../main';

describe('Test Detail Method', () => {

  /**
   * 哈哈哈哈中文变量，会不会报错哈哈哈哈哈哈哈哈哈哈哈😂。
   *
   * 哦艹，没办法智能提示了😑。
   */
  const 魔发奇缘 = { "source": "https://www.80s.tw/movie/6587", "image": "//t.dyxz.la/upload/img/201312/6587.jpg", "title": "魔发奇缘", "year": 2010, "introduction": "迪斯尼公司第50部动画长片", "aliases": ["魔发奇缘", "长发姑娘", "莴苣公主", "缠结", "Rapunzel", "长发公主", "Tangled"], "artists": ["朗·普尔曼", "杰弗里·塔伯", "曼迪·摩尔", "布拉德·加内特", "理查德·基尔", "唐纳·墨菲", "扎克瑞·莱维", "德莱尼·罗斯·斯坦", "迈克·康纳·盖尼", "保罗·F·汤普金斯"], "types": ["喜剧", "爱情", "奇幻", "动画", "歌舞"], "areas": ["美国"], "languages": ["英语"], "directors": ["内森·格雷诺", "拜伦·霍华德"], "releaseDate": 1290528000000, "updateDate": 1385856000000, "duration": 100, "rating": 8.1, "douban": { "id": 1863766, "commentLink": "https://movie.douban.com/subject/1863766/comments", "movieLink": "https://movie.douban.com/subject/1863766" }, "description": "女巫Gothel（唐纳·墨菲 Donna Murphy 配音）靠着一朵神奇的金色花朵保持青春。王后重病，国王派人找到了这朵金花给王后治病，王后病愈，生下了一个一头金发的小女孩Rapunzel（曼迪·摩尔 Mandy Moore 配音）。女巫失去金花，却发现小公主的金发有着同样的魔力，因此她偷走Rapunzel，把她关到森林中的一座没有楼梯高塔之上。\n　　十八年后，Rapunzel在女巫的抚养下长成一个拥有长长金发的美人，她越发渴望外面的世界，女巫为了自己青春永驻，想方设法把Rapunzel留在身边。一天，窃贼Flynn（扎克瑞·莱维 Zachary Levi 配音）盗取公主王冠后逃入森林，在好奇心趋势下登上了这座神秘的高塔，误打误撞见到了塔中的长发公主。在Flynn的陪伴下，Rapunzel走下高塔，开始了人生和爱情的大冒险。\n　　本片为迪斯尼公司第50部动画长片，改变自经典格林童话《长发公主》，由迪士尼元老级画师格兰·基恩首次担任动画片导演。", "downloads": [{ "title": "魔发奇缘", "uri": "http://dl82.80s.la:920/1312/魔发奇缘/魔发奇缘_bd.mp4", "size": "536.5 M", "type": "平板" }] };
  const 阴曹使者 = { "source": "https://www.80s.tw/movie/24978", "image": "//t.dyxz.la/upload/img/201909/poster_20190907143711_94511.jpg", "title": "阴曹使者", "year": 2019, "introduction": "正义永远都会有人去伸张，因为有很多善良有爱的爸爸！", "aliases": ["驱魔使者(台)", "使者", "The Divine Fury", "사자"], "artists": ["安圣基", "朴叙俊", "沈熙燮", "崔宇植", "朴智炫", "禹棹焕", "郑志薰", "李胜熙"], "types": ["动作", "恐怖"], "areas": ["韩国"], "languages": ["韩语"], "directors": ["金周焕"], "releaseDate": 1564531200000, "updateDate": 1567814400000, "duration": 129, "rating": 6.3, "douban": { "id": 30181079, "commentLink": "https://movie.douban.com/subject/30181079/comments", "movieLink": "https://movie.douban.com/subject/30181079" }, "description": "《阴曹使者》讲述死神来到阳间发生的故事，同时是一部带有超自然元素的惊悚动作片。失去父亲的格斗选手勇厚（朴叙俊 饰）在遇到祭司安神父（安胜基 饰）后，与扰乱世界的邪恶死神展开了决斗。", "downloads": [{ "title": "阴曹使者", "uri": "http://dl636.80s.im:920/1909/阴曹使者/阴曹使者.mp4", "size": "1.7 G", "type": "电视" }] };
  const 人在囧途之泰囧 = { "source": "https://www.80s.tw/movie/7417", "image": "//t.dyxz.la/upload/img/201509/poster_20150928_2091366.jpg", "title": "人再囧途之泰囧", "year": 2012, "introduction": "就怕猪一样的队友。。", "aliases": ["泰囧", "人在囧途2", "Lost in Thailand"], "artists": ["黄渤 ", "陶虹", "范冰冰", "徐峥", "王宝强", "谢楠"], "types": ["喜剧"], "areas": ["大陆"], "languages": ["国语", "粤语"], "directors": ["徐峥"], "releaseDate": 1355270400000, "updateDate": 1443398400000, "duration": 105, "rating": 7.5, "douban": { "id": 10574622, "commentLink": "https://movie.douban.com/subject/10574622/comments", "movieLink": "https://movie.douban.com/subject/10574622" }, "description": "《人再囧途之泰囧》讲述了商业成功人士徐朗（徐峥 饰）用了五年时间发明了一种叫“油霸”的神奇产品——每次汽车加油只需加到三分之二，再滴入2滴“油霸”，油箱的汽油就会变成满满一箱。徐朗的同学，兼商业竞争对手高博（黄渤 饰）想把这个发明一次性卖给法国人。但徐朗坚决不同意，他希望深入开发研究， 把“油霸”发扬光大，得到更远的收益。两个人各抒己见，争论不休，一直无果。由于两人股份相同，唯有得到公司最大股东周扬的授权书，方可达到各自目的。当得知周扬在泰国后，徐朗立刻启程寻找。而高博获悉后将一枚跟踪器放在徐朗身上一起去了泰国。飞机上，徐朗遇到了王宝（王宝强 饰），别有心机地想利用他来摆脱对手高博的追赶，可他不仅没甩掉王宝，还成了他的“贴身保姆”……\n　　究竟徐朗和高博谁会最终拿到周扬的授权书？而三个各怀目的的人，又将带来一段如何爆笑的泰国神奇之旅？", "downloads": [{ "title": "人再囧途之泰囧.国粤双语.720P [4.36G]", "uri": "magnet:?xt=urn:btih:F4020E6C5B8D6BE5ED58D76075284F8A0BDAC336", "size": "", "type": "电视" }] };

  let crawler: Crawler;
  let detail1: Detail;
  let detail2: Detail;
  let detail3: Detail;

  const details: Detail[] = [];
  const defineds: Detail[] = [魔发奇缘, 阴曹使者, 人在囧途之泰囧];

  beforeAll(async done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
    crawler = new Crawler();
    done();
  });

  it(`should get detail`, async done => {
    detail1 = await crawler.getDetail('https://www.80s.tw/movie/6587');
    detail2 = await crawler.getDetail('https://www.80s.tw/movie/24978');
    detail3 = await crawler.getDetail('https://www.80s.tw/movie/7417');
    details.push(detail1, detail2, detail3);
    for (const detail of details) {
      expect(detail).toBeDefined();
    }
    done();
  });

  for (const key in 魔发奇缘) {
    if (魔发奇缘.hasOwnProperty(key)) {
      it(`should get right value of key ${key}`, done => {
        for (let i = 0; i < details.length; i++) {
          const detail = details[i];
          const defined = defineds[i];
          expect(detail[key]).toEqual(defined[key]);
        }
        done();
      });
    }
  }

  afterAll(done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 1000;
    done();
  });

});
