export interface SearchResult {
  title: string; // #block1 > ul > li > a [title]
  url: string; // #block1 > ul > li > a [href]
}

export interface Download {
  title: string;
  url: string;
  size: string;
}

export interface Detail {
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
